<template>
        <b-container>
            <b-col>
                <b-row class="my-1">
                    <b-input-group size="sm">
                        <b-input-group-prepend is-text class="firstLabel">
                            Data:
                        </b-input-group-prepend>
                        <datetime v-model="form.date"
                            id="date"
                            value-zone="America/Sao_Paulo"
                            zone="America/Sao_Paulo"
                            format="dd/MM/yyyy"
                            input-class="form-control fakebs"
                            @close="dateChange"
                        ></datetime>
                    </b-input-group>
                </b-row>
                <b-row class="my-1">
                    <b-input-group size="sm">
                        <b-input-group-prepend is-text class="firstLabel">
                            Movimentações:
                        </b-input-group-prepend>
                        <b-form-select id="mov" v-model="form.codMovimentacao" :options="movsDay" @change="movChange">
                            <template slot="first">
                                <option :value="null" disabled>-- Selecione --</option>
                            </template>
                        </b-form-select>
                        <b-button size="sm" @click="print" variant="secondary" v-if="false">
                            Imprimir
                        </b-button>
                    </b-input-group>
                </b-row>
                <br />
                <b-form-row>
                    <table class="table table-sm table-bordered table-hover" style="background-color: #fff;" v-if="grids.movs.items.length>0">
                        <thead>
                            <tr>
                                <th scope="col">Operação</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Detalhe</th>
                                <th scope="col">Qtde.</th>
                                <th scope="col">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in sells" v-bind:key="item.id">
                                <td v-if="index==0" :rowspan="sells.length">{{item.Operacao}}</td>
                                <td v-if="!isEqualLastName(index, sells)" :rowspan="howManyNomPeca(item.NomPeca, sells)">{{item.NomPeca}}</td>
                                <td>{{item.Tipo}}</td>
                                <td>{{item.Qtde}}</td>
                                <td>{{item.ValorInt | money}}</td>
                            </tr>
                            <tr v-if="sells.length > 0">
                                <td colspan="3">Total Parcial</td>
                                <td>{{sumQtde(sells)}}</td>
                                <td :class="sumValor(sells)<0 ? 'red' : 'green'">{{sumValor(sells) | money}}</td>
                            </tr>
                            <tr v-for="(item, index) in sells_reservation" v-bind:key="item.id">
                                <td v-if="index==0" :rowspan="sells_reservation.length">{{item.Operacao}}</td>
                                <td v-if="!isEqualLastName(index, sells_reservation)" :rowspan="howManyNomPeca(item.NomPeca, sells_reservation)">{{item.NomPeca}}</td>
                                <td>{{item.Tipo}}</td>
                                <td>{{item.Qtde}}</td>
                                <td>{{item.ValorInt | money}}</td>
                            </tr>
                            <tr v-if="sells_reservation.length > 0">
                                <td colspan="3">Total Parcial</td>
                                <td>{{sumQtde(sells_reservation)}}</td>
                                <td :class="sumValor(sells_reservation)<0 ? 'red' : 'green'">{{sumValor(sells_reservation) | money}}</td>
                            </tr>
                            <tr v-for="(item, index) in sells_halfComplement" v-bind:key="item.id">
                                <td v-if="index==0" :rowspan="sells_halfComplement.length">{{item.Operacao}}</td>
                                <td v-if="!isEqualLastName(index, sells_halfComplement)" :rowspan="howManyNomPeca(item.NomPeca, sells_halfComplement)">{{item.NomPeca}}</td>
                                <td>{{item.Tipo}}</td>
                                <td>{{item.Qtde}}</td>
                                <td>{{item.ValorInt | money}}</td>
                            </tr>
                            <tr v-if="sells_halfComplement.length > 0">
                                <td colspan="3">Total Parcial</td>
                                <td>{{sumQtde(sells_halfComplement)}}</td>
                                <td :class="sumValor(sells_halfComplement)<0 ? 'red' : 'green'">{{sumValor(sells_halfComplement) | money}}</td>
                            </tr>
                            <tr v-for="(item, index) in sells_refund" v-bind:key="item.id">
                                <td v-if="index==0" :rowspan="sells_refund.length">{{item.Operacao}}</td>
                                <td v-if="!isEqualLastName(index, sells_refund)" :rowspan="howManyNomPeca(item.NomPeca, sells_refund)">{{item.NomPeca}}</td>
                                <td>{{item.Tipo}}</td>
                                <td>{{item.Qtde}}</td>
                                <td>{{item.ValorInt | money}}</td>
                            </tr>
                            <tr v-if="sells_refund.length > 0">
                                <td colspan="3">Total Parcial</td>
                                <td>{{sumQtde(sells_refund)}}</td>
                                <td :class="sumValor(sells_refund)<0 ? 'red' : 'green'">{{sumValor(sells_refund) | money}}</td>
                            </tr>
                            <tr v-for="(item, index) in withdraw" v-bind:key="item.id">
                                <td v-if="index==0" :rowspan="withdraw.length">{{item.Operacao}}</td>
                                <td v-if="index==0" :rowspan="withdraw.length"></td>
                                <td>{{item.Tipo}}</td>
                                <td>{{item.Qtde}}</td>
                                <td>{{item.ValorInt | money}}</td>
                            </tr>
                            <tr v-if="withdraw.length > 0">
                                <td colspan="3">Total Parcial</td>
                                <td>{{sumQtde(withdraw)}}</td>
                                <td :class="sumValor(withdraw)<0 ? 'red' : 'green'">{{sumValor(withdraw) | money}}</td>
                            </tr>
                            <tr v-for="(item, index) in crClose" v-bind:key="item.id">
                                <td v-if="index==0" :rowspan="crClose.length">{{item.Operacao}}</td>
                                <td v-if="index==0" :rowspan="crClose.length"></td>
                                <td>{{item.Tipo}}</td>
                                <td>{{item.Qtde}}</td>
                                <td>{{item.ValorInt | money}}</td>
                            </tr>
                            <tr v-if="crClose.length > 0">
                                <td colspan="3">Total Parcial</td>
                                <td>{{sumQtde(crClose)}}</td>
                                <td :class="sumValor(crClose)<0 ? 'red' : 'green'">{{sumValor(crClose) | money}}</td>
                            </tr>
                            <tr v-for="(item, index) in diff" v-bind:key="item.id">
                                <td v-if="index==0" :rowspan="diff.length">{{item.Operacao}}</td>
                                <td v-if="index==0" :rowspan="diff.length"></td>
                                <td>{{item.Tipo}}</td>
                                <td>{{item.Qtde}}</td>
                                <td>{{item.ValorInt | money}}</td>
                            </tr>
                            <tr v-if="diff.length > 0">
                                <td colspan="3">Total Parcial</td>
                                <td>{{sumQtde(diff)}}</td>
                                <td :class="sumValor(diff)<0 ? 'red' : 'green'">{{sumValor(diff) | money}}</td>
                            </tr>
                            <tr v-if="grids.movs.items.length > 0">
                                <td colspan="3">Total Geral</td>
                                <td>{{sumQtde(grids.movs.items)}}</td>
                                <td :class="sumValor(grids.movs.items)<0 ? 'red' : 'green'">{{sumValor(grids.movs.items) | money}}</td>
                            </tr>
                        </tbody>
                    </table>
                </b-form-row>
            </b-col>
        </b-container>
</template>

<script>
import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';
import { func } from '@/functions';
import { funcOperation } from '../../components/ticketoffice/services/functions';
import { cashregisterService } from "../../components/ticketoffice/services/cashregister";
import { printService } from '../../components/ticketoffice/services/print';

import {mask} from 'vue-the-mask';
import { Datetime } from 'vue-datetime';

import moment from 'moment';

Vue.use(moment);

import 'vue-datetime/dist/vue-datetime.css';


Vue.filter('money', function (value) {
    let v = parseFloat(value)/100;
    return `R$ ${v.toFixed(2)}`;
});
Vue.filter('truefalse', function (value) {
    return value == 1 || value == "1" || value == true ? "Sim" : "Não";
});

export default {
    name: 'movs',
    mixins: [func, funcOperation],
    directives: {mask},
    components: { Datetime },
    data () {
        return {
            processing: false,
            loading: false,
            result: null,
            movsDay: [],
            form: {
                date: null,
                codMovimentacao: '',
            },
            grids: {
                helper: {
                    movs: {
                        lastNomPeca: null,
                    }
                },
                movs : {
                    loaded: false,
                    items: [],
                    fields: {
                        Operacao: { label: 'Operação', sortable: false },
                        NomPeca: { label: 'Nome', sortable: false },
                        Tipo: { label: 'Detalhe', sortable: false },
                        Qtde: { label: 'Qtde.', sortable: false },
                        Valor: { label: 'Valor', sortable: false },
                    },
                }
            }
        }
    },
    created() {
        //this.search();
    },
    computed: {
        sells () {
            return this.grids.movs.items.filter(o => o.Operacao == 'Venda');
        },
        sells_reservation () {
            return this.grids.movs.items.filter(o => o.Operacao == 'Reserva');
        },
        sells_halfComplement () {
            return this.grids.movs.items.filter(o => o.Operacao == 'Complemento de Meia');
        },
        sells_refund () {
            return this.grids.movs.items.filter(o => o.Operacao == 'Estorno');
        },
        withdraw () {
            return this.grids.movs.items.filter(o => o.Operacao == 'Saque');
        },
        crClose () {
            return this.grids.movs.items.filter(o => o.Operacao == 'Fechamento');
        },
        diff () {
            return this.grids.movs.items.filter(o => o.Operacao == 'Diferença');
        },
    },
    methods: {
        sumQtde(loop) {
            return loop.reduce( function(a, b){ return a + b["Qtde"]; }, 0);
        },
        sumValor(loop) {
            return loop.reduce( function(a, b){ return a + b["ValorInt"]; }, 0);
        },
        howManyNomPeca(name, loop) {
            let ret = 0;

            for (let x in loop) {
                if (loop[x].NomPeca == name) {
                    ret = ret+1;
                }
            }
            ret = ret == 0 ? 1 : ret;
            //console.log("howManyNomPeca: " + name + " --- " + ret);
            return ret;
        },
        isEqualLastName(index, loop) {
            let ret = true;

            let currentName = loop[index].NomPeca;
            let lastName = index == 0 ? "" : loop[index-1].NomPeca;
            
            ret = currentName == lastName ? true : false;
            //this.grids.helper.movs.lastNomPeca = name;
            //console.log("lastNomPeca: " + currentName + " --- " + ret);
            return ret;
        },
        dateChange() {
            Vue.nextTick().then(response => {
                let ok = moment(this.form.date).format("YYYY-MM-DD");
                if (ok != "Invalid date")
                {
                    this.form.date = ok;
                    this.loadMovsInDay();
                }
            });
        },
        movChange() {
            Vue.nextTick().then(response => {
                this.search();
            });
        },
        loadMovsInDay() {
            this.processing = true;
            this.showWaitAboveAll();
            cashregisterService.movimentsInDay(this.getLoggedId(), this.get_id_base(), this.form.date).then(
                    response => {
                        this.hideWaitAboveAll();
                        this.processing = false;
                        if (this.validateJSON(response)) {
                            this.movsDay = response;
                        }
                },
                error => {
                    this.processing = false;
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");        
                }
            );
        },
        print() {
            printService.moviment(this.get_id_base(),this.getLoggedId(), this.form.date, this.form.codMovimentacao);
        },
        search() {
            this.processing = true;
            this.showWaitAboveAll();
            cashregisterService.list(this.get_id_base(),this.getLoggedId(), this.form.date, this.form.codMovimentacao).then(
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
        }
    }
}
</script>

<style>
    .green {
        color: green;
    }
    .red {
        color: red;
    }
    .fakebs {
        height: calc(1.8125rem + 2px);
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 0.2rem;
    }
</style>
