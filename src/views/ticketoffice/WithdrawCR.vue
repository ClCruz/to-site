<template>
        <b-container>
            <b-form-row>
                <b-col>
                    <b-input-group size="sm" :prepend="form.payment">
                        <b-input-group-prepend is-text>
                            <span>R$</span>
                        </b-input-group-prepend>
                        <b-form-input prepend="R$" :disabled="form.payment==''" id="amount" type="text" 
                                        @keyup.enter="withdraw"
                                        v-model.lazy="form.amountInput" v-money="money">
                        </b-form-input>
                        <b-input-group-append>
                            <b-btn variant="success" :disabled="form.payment==''" @click="withdraw">
                                <v-wait for="inprocess">
                                    <template slot="waiting">
                                    Realizando o saque...
                                    </template>
                                </v-wait>
                                <span v-if="!processing">Sacar</span>
                            </b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-form-row>
            <b-form-row>
                    <b-table striped="striped"
                            outlined="outlined"
                            small="small"
                            hover="hover"
                            responsive
                            show-empty
                            foot-clone 
                            empty-text="Não foram encontrados registros."
                            @row-clicked="rowClick"
                            v-if="grids.movs.loaded"
                            :items="grids.movs.items"
                            :fields="grids.movs.fields">

                        <template slot="opened" slot-scope="data">
                            <span>{{data.item.opened | truefalse}}</span>
                        </template>

                        <template slot="amount" slot-scope="data">
                            <span>{{data.item.amount | money}}</span>
                        </template>

                        <template slot="FOOT_TipForPagto" slot-scope="data">
                        </template>
                        <template slot="FOOT_amount" slot-scope="data">
                            <strong>{{sum(data.column) | money}}</strong>
                        </template>
                    </b-table>
            </b-form-row>
        </b-container>
</template>

<script>
import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';
import { func } from '@/functions';
import { funcOperation } from '../../components/ticketoffice/services/functions';
import { cashregisterService } from "../../components/ticketoffice/services/cashregister";
import { VMoney } from 'v-money';
import {mask} from 'vue-the-mask';

Vue.filter('money', function (value) {
    //if (!value) return ''
    return `R$ ${value}`;
});
Vue.filter('truefalse', function (value) {
    return value == 1 || value == "1" || value == true ? "Sim" : "Não";
});

export default {
    name: 'withdrawCR',
    mixins: [func, funcOperation],
    directives: {mask,money: VMoney},
    data () {
        return {
            money: {
                decimal: '.',
                thousands: '',
                //prefix: 'R$ ',
                //suffix: ' #',
                precision: 2,
                masked: false /* doesn't work with directive */
            },
            processing: false,
            loading: false,
            result: null,
            form: {
                justificative:null,
                payment:'',
                code: null,
                currentAmount: null,
                amountInput: null,
            },
            grids: {
                movs : {
                    loaded: false,
                    items: [],
                    fields: {
                        TipForPagto: { label: 'Forma de Pagamento', sortable: false },
                        amount: { label: 'Valor Recebido', sortable: false },
                    },
                }
            }
        }
    },
    created() {
        this.showWaitAboveAll();
        cashregisterService.current(this.get_id_base(), this.getLoggedId()).then(
                response => {
                    this.hideWaitAboveAll();
                    this.processing = false;
                    if (this.validateJSON(response)) {
                        if (!response.opened) {
                            this.$swal({
                                type: 'error',
                                title: 'Fechamento de Caixa',
                                text: 'O caixa não está aberto.',
                            });
                            this.gotoHome();
                        }
                        else {
                            if (parseFloat(response.Saldo)==0){
                                this.$swal({
                                    type: 'error',
                                    title: 'Fechamento de Caixa',
                                    text: 'Não há saldo disponível para realizar saque.',
                                });
                                this.gotoHome();
                            }
                            else {
                                this.search();
                            }
                        }
                    }
            },
            error => {
                this.processing = false;
                this.hideWaitAboveAll();
                this.toastError("Falha na execução.");        
            }
        );
    },
    methods: {
        calc(amount, input) {
            //debugger;
            return parseFloat(input)-parseFloat(amount);
        },
        sum(what) {
            let ret = 0;
            for (let x in this.grids.movs.items) {
                switch (what) {
                    case "amount":
                        ret+=parseFloat(this.grids.movs.items[x].amount);
                    break;
                    case "amountInput":
                        ret+=parseFloat(this.grids.movs.items[x].amountInput);
                    break;
                    case "diff":
                        ret+=parseFloat(this.calc(this.grids.movs.items[x].amount,this.grids.movs.items[x].amountInput));
                    break;
                }
            }
            return ret;
        },
        withdraw() {
            if (this.form.amountInput == null || parseFloat(this.form.amountInput) <= 0) {
                this.popupError("Valor de saque tem que ser acima de zero");
                return;
            }
            if (parseFloat(this.form.amountInput) >= parseFloat(this.form.currentAmount)) {
                this.popupError("Valor de saque tem que ser abaixo do valor que tem em caixa para o tipo especifico de pagamento.");
                return;
            }

            this.processing = true;
            this.$wait.start("inprocess");

            let msg = "Continuar com o saque?";

            this.$swal({
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                title: 'Processo de saque',
                text: msg,
            }).then((result) => {
                if (result.value) {
                    this.withdrawIntern();
                }
                else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    this.processing = false;
                    this.$wait.end("inprocess");
                }
            });
        },
        rowClick(record, index) {
            this.form.payment = record.TipForPagto;
            this.form.code = record.CodTipForPagto;
            this.form.currentAmount = record.amount;
        },
        search() {
            this.processing = true;
            this.showWaitAboveAll();
            cashregisterService.listToClose(this.getLoggedId(), this.get_id_base()).then(
                    response => {
                        this.hideWaitAboveAll();
                        this.processing = false;
                        if (this.validateJSON(response)) {
                            this.grids.movs.items = response;
                            this.grids.movs.loaded = true;
                        }
                },
                error => {
                    this.processing = false;
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");        
                }
            );
        },
        withdrawIntern() {
            this.showWaitAboveAll();
            cashregisterService.withdraw(this.get_id_base(), this.getLoggedId(), this.form.code,this.form.amountInput, this.form.justificative).then(
                    response => {
                        this.hideWaitAboveAll();
                        this.processing = false;
                        this.$wait.end("inprocess");
                        if (this.validateJSON(response)) {
                            if (response.success) {
                                this.$swal({
                                    type: 'success',
                                    title: 'Processo de saque',
                                    text: 'Saque realizado com sucesso.',
                                });
                                this.search();
                                this.form.payment="";
                                this.form.code = null;
                                this.form.amountInput = 0;
                            }
                            else {
                                this.$swal({
                                    type: 'error',
                                    title: 'Processo de saque',
                                    text: 'Ocorreu uma falha para realizar o saque.',
                                });
                            }
                        }
                },
                error => {
                    this.processing = false;
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");        
                }
            );
        },
    }
}
</script>

<style>

</style>
