<template>
        <b-container>
            <b-form-row>
                    <b-alert variant="success" show v-if="date!=''">Data de abertura do caixa: {{date}}</b-alert>
                    <b-table striped="striped"
                            outlined="outlined"
                            small="small"
                            hover="hover"
                            responsive
                            show-empty
                            foot-clone 
                            empty-text="Não foram encontrados registros."
                            v-if="grids.movs.loaded"
                            :items="grids.movs.items"
                            :fields="grids.movs.fields">

                        <template slot="opened" slot-scope="data">
                            <span>{{data.item.opened | truefalse}}</span>
                        </template>

                        <template slot="amount" slot-scope="data">
                            <span>{{data.item.amount | money}}</span>
                        </template>

                        <template slot="amountInput" slot-scope="data">
                            <b-input-group size="sm" prepend="R$"><b-form-input prepend="R$" type="text" v-model.lazy="data.item.amountInput" v-money="money"></b-form-input></b-input-group>
                        </template>

                        <template slot="diff" slot-scope="data">
                            <span>{{calc(data.item.amount, data.item.amountInput) | money}}</span>
                        </template>

                        <template slot="FOOT_amount" slot-scope="data">
                            <strong>{{sum(data.column) | money}}</strong>
                        </template>
                        <template slot="FOOT_amountInput" slot-scope="data">
                            <strong>{{sum(data.column) | money}}</strong>
                        </template>
                        <template slot="FOOT_diff" slot-scope="data">
                            <strong>{{sum(data.column) | money}}</strong>
                        </template>

                    </b-table>
            </b-form-row>
            <b-form-row>
                <b-button type="button" variant="primary" @click="save">
                    <v-wait for="inprocess">
                        <template slot="waiting">
                        Fechando caixa...
                        </template>
                    </v-wait>
                    <span v-if="!processing">Fechar Caixa</span>
                </b-button>
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
    name: 'closeCR',
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
            date: '',
            form: {
                justificative:null,
            },
            grids: {
                movs : {
                    loaded: false,
                    items: [],
                    fields: {
                        TipForPagto: { label: 'Forma de Pagamento', sortable: false },
                        amount: { label: 'Valor Recebido', sortable: false },
                        amountInput: { label: 'Valor em Caixa', sortable: false },
                        diff: { label: 'Diferença', sortable: false },
                    },
                }
            }
        }
    },
    created() {
        if (this.getLoggedId() && this.get_id_base()) {
            this.showWaitAboveAll();
            cashregisterService.isok(this.get_id_base(), this.getLoggedId()).then(
                response => {
                    this.hideWaitAboveAll();
                    if (this.validateJSON(response)) {
                        if (response.isopen)
                        {
                            this.search();
                        }
                        else {
                            this.$swal({
                                type: 'error',
                                text: "Caixa não encontra-se aberto.",
                                showConfirmButton: true,
                            }).then((result) => {
                                this.gotoHome();
                            });
                            return false;
                        }
                    }
                },
                error => {
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");        
                }
            );
        }
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
        getInput() {
            let ret = "";
            for (let x in this.grids.movs.items) {
                let currentLine = "" + this.grids.movs.items[x].CodTipForPagto + "#";
                currentLine += parseInt(parseFloat(this.grids.movs.items[x].amountInput)*100);
                ret+= (ret == "" ? "" : "|") + currentLine;
            }
            return ret;
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
                            if (response.length > 0) {
                                this.date = response[0].date;
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
        closeCashRegister() {
            this.showWaitAboveAll();
            cashregisterService.close(this.get_id_base(), this.getLoggedId(), this.getInput(), this.form.justificative).then(
                    response => {
                        this.hideWaitAboveAll();
                        this.processing = false;
                        this.$wait.end("inprocess");
                        if (this.validateJSON(response)) {
                            if (response.success) {
                                this.$swal({
                                    type: 'success',
                                    title: 'Processo de fechamento de caixa',
                                    text: 'Caixa fechado com sucesso.',
                                });
                                this.gotoHome();
                            }
                            else {
                                this.$swal({
                                    type: 'error',
                                    title: 'Processo de fechamento de caixa',
                                    text: 'Ocorreu uma falha para fechar o caixa.',
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
        save() {
            this.processing = true;
            this.$wait.start("inprocess");
            let diff = this.sum("diff");

            let msg = "Continuar com o fechamento do caixa?";

            if (diff!=0) {
                msg = "Continuar com o fechamento do caixa mesmo com diferença?";
            }

            this.$swal({
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                title: 'Processo de fechamento de caixa',
                text: msg,
            }).then((result) => {
                if (result.value) {
                    if (diff!=0) {
                        this.$swal({
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            allowEnterKey: false,
                            showCancelButton: true,
                            confirmButtonText: 'Fechar',
                            cancelButtonText: 'Cancelar',
                            title: 'Processo de fechamento de caixa',
                            text: "Escreva a justificativa.",
                            input: 'text',
                            inputValidator: (value) => {
                                return !value && 'Escreva a justificativa!'
                            }
                        }).then((result) => {
                            if (result.value) {
                                this.form.justificative = result.value;
                                this.closeCashRegister();
                            }
                            else if (result.dismiss === this.$swal.DismissReason.cancel) {
                                this.processing = false;
                                this.$wait.end("inprocess");
                            }
                        });
                    }
                    else {
                        this.closeCashRegister();
                    }
                }
                else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    this.processing = false;
                    this.$wait.end("inprocess");
                }
            });
        },
    }
}
</script>

<style>

</style>
