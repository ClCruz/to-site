<template>
    <b-container fluid>
        <b-col>
            <b-row class="my-1">
                <b-col>
                    <b-row>
                        <b-input-group size="sm">
                            <b-input-group-prepend is-text class="firstLabel">
                                Código da Venda:
                            </b-input-group-prepend>
                            <b-form-input id="codVenda"
                                        type="text"
                                        name="codVenda"
                                        maxlength="10"
                                        v-model="form.codVenda"
                                        placeholder="Código da Venda">
                            </b-form-input>
                        </b-input-group>
                    </b-row>
                </b-col>
                <b-col>
                    <b-row>
                        <b-input-group size="sm">
                            <b-input-group-prepend is-text class="firstLabel">
                                CPF:
                            </b-input-group-prepend>
                            <b-form-input id="cpf"
                                        type="text"
                                        name="cpf"
                                        v-mask="['###.###.###-##']"
                                        maxlength="14"
                                        v-model="form.nin"
                                        placeholder="CPF">
                            </b-form-input>
                        </b-input-group>

                    </b-row>
                </b-col>
            </b-row>
            <b-row class="my-1">
                <b-input-group size="sm">
                    <b-input-group-prepend is-text class="firstLabel">
                        Evento:
                    </b-input-group-prepend>
                    <b-form-select id="event" v-on:change="selectedEvent" v-model="form.codPeca" :options="events">
                        <template slot="first">
                            <option :value="null">-- Selecione --</option>
                        </template>
                    </b-form-select>
                </b-input-group>
            </b-row>
            <b-row class="my-1">
                <b-col>
                    <b-row>
                        <b-input-group size="sm">
                            <b-input-group-prepend is-text class="firstLabel">
                                Dias:
                            </b-input-group-prepend>
                            <b-form-select id="days"
                                            :options="days"
                                            v-on:change="populateHours"
                                            :disabled="!loads.days"
                                            v-model="form.datePresentation">
                                <template slot="first">
                                    <option :value="null">-- Selecione --</option>
                                </template>
                            </b-form-select>
                        </b-input-group>
                    </b-row>
                </b-col>
                <b-col>
                    <b-row>
                        <b-input-group size="sm">
                            <b-input-group-prepend is-text class="firstLabel">
                                Sala:
                            </b-input-group-prepend>
                            <b-form-select id="hours"
                                            :options="hours"
                                            :disabled="!loads.hours"
                                            v-model="form.id_apresentacao">
                                <template slot="first">
                                    <option :value="null">-- Selecione --</option>
                                </template>
                            </b-form-select>
                        </b-input-group>
                    </b-row>
                </b-col>
            </b-row>
            <b-row align-v="end">
                <b-col align-v="end">
                    <b-row align-v="end">
                        <b-button type="button" variant="primary" @click="search">
                            <span>Consultar</span>
                        </b-button>
                        <b-button type="button" variant="secondary" @click="lastsells">
                            <span>Últimas vendas</span>
                        </b-button>
                        <b-button type="button" :disabled="!canRefund" variant="success" @click="refund">
                            <span>Estornar</span>
                        </b-button>
                    </b-row>
                </b-col>
            </b-row>
        </b-col>
        <br />
        <b-form-row>
                <b-table striped="striped"
                        outlined="outlined"
                        class="fontSize tableClicked bg-white"
                        small="small"
                        hover="hover"
                        responsive
                        show-empty
                        empty-text="Não foram encontrados registros com esse Codigo de Venda."
                        @row-dblclicked="rowSelected"
                        v-if="grids.purchases.loaded"
                        :items="grids.purchases.items"
                        :fields="grids.purchases.fields">


                    <template slot="ValPagto" slot-scope="data">
                        <span>{{data.item.ValPagto | money}}</span>
                    </template>
                    <template slot="DatApresentacao" slot-scope="data">
                        <span>{{data.item.DatApresentacao}} {{data.item.HorSessao}}</span>
                    </template>

                    <template slot="print" slot-scope="data">
                        <b-button-group size="sm">
                            <b-button v-b-tooltip.hover title="Imprimir apenas esse bilhete." @click.stop="printOne(data.item,$event.target)">Bilhete</b-button>
                            <b-button v-b-tooltip.hover title="Imprimir todos bilhetes do código de venda." @click.stop="printAll(data.item,$event.target)">Código de Venda</b-button>
                        </b-button-group>
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
import { printService } from '../../components/ticketoffice/services/print';
import { purchaseService } from "../../components/common/services/purchase";
import { eventService } from "../../components/ticketoffice/services/event";

import {mask} from 'vue-the-mask'

Vue.filter('money', function (value) {
    if (!value) return ''
    //let help = parseFloat(value)/parseFloat(100);
    //let ret = help.toFixed(2);
    return `R$ ${value}`;
});

export default {
    name: 'purchases',
    mixins: [func, funcOperation],
    directives: {mask},
    data () {
        return {
            processing: false,
            loading: false,
            result: null,
            canRefund: false,
            loads: {
                event: false,
                days: false,
                hours: false,
            },
            events: [],
            days: [],
            hours: [],
            form: {
                codVenda: '',
                codVendaToRefund: '',
                id_pedido_venda: null,
                nin: null,
                selected: [],
                inGatewayTo: false,
                codPeca: null,
                datePresentation: null,
                id_apresentacao: ''
            },
            grids: {
                purchases : {
                    loaded: false,
                    items: [],
                    fields: {
                        selected: {label: '', sortable: false},
                        created: { label: 'Data', sortable: false },
                        NomPeca: { label: 'Evento', sortable: false },
                        NomSala: { label: 'Sala/Setor', sortable: false },
                        DatApresentacao: { label: 'Data Evento', sortable: false },
                        Indice: { label: 'Indice', sortable: false },
                        NomObjeto: { label: 'Assento', sortable: false },
                        CodVenda: { label: 'Código Venda', sortable: false },
                        Nome: { label: 'Nome', sortable: false },
                        CPF: { label: 'CPF', sortable: false },
                        ValPagto: { label: 'Valor', sortable: false },
                        purchaseType: { label: 'Venda em', sortable: false },
                        print: { label: 'Impressão' }
                    },
                }
            }
        }
    },
    created() {
        if (this.get_id_base() == "") return;
        this.showWaitAboveAll();
        eventService.list(this.get_id_base()).then(
            response => {
                this.loads.event = true;
                this.events = response;
                this.hideWaitAboveAll();
            },
            error => {
                this.hideWaitAboveAll();
                this.toastError("Falha na execução.");        
            }
        );
    },
    methods: {
        selectedEvent() {
            this.$nextTick(() => {
                this.populateDays();
            });
        },
        populateDays() {
            if (this.form.codPeca == null) return;
            this.days = [];
            this.hours = [];
            this.form.datePresentation = null;
            this.form.id_apresentacao = null;

            this.showWaitAboveAll();

            Vue.nextTick().then(response => {
                this.loads.days = false;
                eventService.listEventDays(this.get_id_base(), this.form.codPeca).then(
                    response => {
                        this.hideWaitAboveAll();
                        if (this.validateJSON(response)) {
                            this.loads.days = true;
                            this.days = response;

                            if (this.days.length == 0) {
                                this.toastError("Não há nenhum dia disponível para esse evento.");
                            }
                        }
                    },
                    error => {
                        this.hideWaitAboveAll();
                        this.toastError("Falha na execução.");        
                    }
                );
            });
        },
        populateHours() {
            if (this.form.codPeca == null || this.form.datePresentation) return;
            this.hours = [];
            this.form.id_apresentacao = null;

            this.showWaitAboveAll();

            Vue.nextTick().then(response => {
            this.loads.hours = false;
            eventService.listEventDayHours(this.get_id_base(),this.form.codPeca,this.form.datePresentation).then(
                response => {
                    if (this.validateJSON(response)) {
                    this.loads.hours = true;
                    this.hours = response;
                    this.hideWaitAboveAll();
                    }
                },
                error => {
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");        
                }
                );
            });
        },
        printOne(data) {
            printService.ticket(this.get_id_base(), data.CodVenda, data.Indice);
        },
        printAll(data) {
            printService.ticket(this.get_id_base(), data.CodVenda, '');
        },
        refundIntern() {
            purchaseService.refund(this.get_id_base(), this.getLoggedId(), this.form.codVendaToRefund, 0,this.form.selected.join(),this.form.inGatewayTo ? 1 : 0).then(response=> {
                    if (this.validateJSON(response))
                    {
                        this.$swal.insertQueueStep({
                            title: 'Processo de estorno',
                            type: 'success',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            allowEnterKey: false,
                            showCancelButton: false,
                            showConfirmButton: true,
                            confirmButtonText: 'OK',
                            text: "Estorno realizado com sucesso.",
                            progressSteps: ['1', '2', '3'],
                        });
                        this.$swal.clickConfirm();
                    }
                }
                ,error=> {
                    this.toastError("Falha na execução.");
            });
        },
        refund() {
            this.$swal.queue([{
                title: 'Processo de estorno',
                showCancelButton: true,
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                text: 'Iniciando processo de estorno de um venda, deseja continuar?',
                progressSteps: ['1', '2', '3'],
            },
            {
                title: 'Processo de estorno',
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
                text: 'Realizando o estorno...',
                progressSteps: ['1', '2', '3'],
                onOpen: () => {
                    this.refundIntern();
                },
            } 
            ]).then((result) => {
                if (result.value) {
                    this.search();
                }
                else if (result.dismiss === this.$swal.DismissReason.cancel) {

                }
            });
        },
        search() {
            if ((this.form.codPeca != '' && this.form.codPeca != null) && (this.form.id_apresentacao == '' || this.form.id_apresentacao == null)) {
                this.toastError("Escolha uma sala para pesquisar por evento.");
                return;
            }
            this.processing = true;
            this.showWaitAboveAll();

            purchaseService.get(this.get_id_base(), this.form.codVenda, this.form.nin, this.form.id_apresentacao).then(
                    response => {
                        this.hideWaitAboveAll();
                        this.processing = false;
                        if (this.validateJSON(response)) {
                            this.grids.purchases.items = response;
                            this.grids.purchases.loaded = true;
                        }
                },
                error => {
                    this.processing = false;
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");        
                }
            );

        },
        lastsells() {
            this.processing = true;
            this.showWaitAboveAll();

            purchaseService.lastsells(this.get_id_base(), this.getLoggedId()).then(
                    response => {
                        this.hideWaitAboveAll();
                        this.processing = false;
                        if (this.validateJSON(response)) {
                            this.grids.purchases.items = response;
                            this.grids.purchases.loaded = true;
                        }
                },
                error => {
                    this.processing = false;
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");        
                }
            );

        },
        rowSelected(record, index) {
            if (this.form.codVendaToRefund == '')
                this.form.codVendaToRefund = record.CodVenda;
            else {
                if (this.form.codVendaToRefund != record.CodVenda) {
                    this.toastError("Só é possível escolher cadeiras do mesmo código venda.");        
                    return;
                }
            }

            record._rowVariant = record._rowVariant == 'info' ? '' : 'info';

            let indice = record.Indice;
            let purchaseType = record.purchaseType;
            this.form.inGatewayTo = record.refundInGateway || record.refundInGateway == "1" || record.refundInGateway == 1;


            let found = this.form.selected.map(function(e) { return e; }).indexOf(indice);
            if (found!=-1)
            {
                if (this.form.selected.length == 1) {
                    this.form.selected = [];
                }
                else {
                    this.form.selected.splice(found, 1);
                }                    
            }
            else {
                this.form.selected.push(indice);
            }

            if (this.form.selected.length <= 0) {
                this.canRefund = false;
            }
            else {
                if (purchaseType == "web") {
                    this.canRefund = false;
                }
                else {
                    this.canRefund = true;
                }
            }
        },
    }
}
</script>

<style>
.fontSize {
    font-size: 11px;
}
.tableClicked tr {
    cursor: pointer;
}
</style>
