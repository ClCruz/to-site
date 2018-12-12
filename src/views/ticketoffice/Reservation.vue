<template>
    <b-container fluid>
        <b-col>
            <b-row class="my-1">
                <b-col>
                    <b-row>
                        <b-input-group size="sm">
                            <b-input-group-prepend is-text class="firstLabel">
                                Código da Reserva:
                            </b-input-group-prepend>
                            <b-form-input id="codReserva"
                                        type="text"
                                        name="codReserva"
                                        maxlength="10"
                                        v-model="form.codReserva"
                                        placeholder="Código da Reserva">
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
                                        v-model="form.cpf"
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
                        empty-text="Não foram encontrados registros com esse Codigo de Reserva."
                        v-if="grids.reservations.loaded"
                        :items="grids.reservations.items"
                        :fields="grids.reservations.fields">

                    <template slot="DatApresentacao" slot-scope="data">
                        <span>{{data.item.DatApresentacao}} {{data.item.HorSessao}}</span>
                    </template>

                    <template slot="print" slot-scope="data">
                        <b-button-group size="sm">
                            <b-button v-b-tooltip.hover title="Imprimir apenas esse bilhete." @click.stop="printOne(data.item,$event.target)">Bilhete</b-button>
                            <b-button v-b-tooltip.hover title="Imprimir todos bilhetes do código de venda." @click.stop="printAll(data.item,$event.target)">Código de Reserva</b-button>
                        </b-button-group>
                    </template>
                    <template slot="cancel" slot-scope="data">
                        <b-button-group size="sm">
                            <b-button v-b-tooltip.hover title="Cancelar o assento desse Código de Reserva." @click.stop="cancelOne(data.item,$event.target)">Cancelar Assento</b-button>
                            <b-button v-b-tooltip.hover title="Cancelar a reserva de todos os assentos desse Código de Reserva." @click.stop="cancelAll(data.item,$event.target)">Cancelar Reserva</b-button>
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
import { bookingService } from "../../components/common/services/booking";
import { eventService } from "../../components/ticketoffice/services/event";
import { printService } from '../../components/ticketoffice/services/print';

import {mask} from 'vue-the-mask'

export default {
    name: 'reservations',
    mixins: [func, funcOperation],
    directives: {mask},
    data () {
        return {
            processing: false,
            loading: false,
            result: null,
            canCancel: false,
            loads: {
                event: false,
                days: false,
                hours: false,
            },
            events: [],
            days: [],
            hours: [],
            form: {
                cancelAll: false,
                reservaSearch: false,
                codReserva: '',
                nin: '',
                codPeca: null,
                datePresentation: null,
                id_apresentacao: ''
            },
            action: {
                codReserva: '',
                indice: '',
                data: null,
            },
            grids: {
                reservations : {
                    loaded: false,
                    items: [],
                    fields: {
                        selected: {label: '', sortable: false},
                        CodReserva: { label: 'Código da Reserva', sortable: false },
                        NomPeca: { label: 'Evento', sortable: false },
                        NomSala: { label: 'Sala/Setor', sortable: false },
                        day: { label: 'Data Evento', sortable: false },
                        HorSessao: { label: 'Hora Evento', sortable: false },
                        Indice: { label: 'Indice', sortable: false },
                        NomObjeto: { label: 'Assento', sortable: false },
                        Nome: { label: 'Nome', sortable: false },
                        CPF: { label: 'CPF', sortable: false },
                        EMail: { label: 'e-mail', sortable: false },
                        Telefone: { label: 'Telefone', sortable: false },
                        print: { label: 'Impressão' },
                        cancel: { label: 'Cancelar' }
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
            printService.booking(this.get_id_base(), data.CodReserva, data.Indice);
        },
        printAll(data) {
            printService.booking(this.get_id_base(), data.CodReserva, '');
        },
        cancelIntern() {
            bookingService.cancel(this.get_id_base(), this.getLoggedId(), this.action.codReserva, this.action.indice).then(response=> {
                    if (this.validateJSON(response))
                    {
                        this.$swal.insertQueueStep({
                            title: 'Processo de cancelamento',
                            type: 'success',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            allowEnterKey: false,
                            showCancelButton: false,
                            showConfirmButton: true,
                            confirmButtonText: 'OK',
                            text: "Cancelamento realizado com sucesso.",
                            progressSteps: ['1', '2', '3'],
                        });
                        this.$swal.clickConfirm();
                    }
                }
                ,error=> {
                    this.toastError("Falha na execução.");
            });
        },
        cancelAll(data) {
            this.action.data = data;
            this.action.codReserva = data.CodReserva;
            this.action.indice = '';
            this.cancel();
        },
        cancelOne(data) {
            this.action.data = data;
            this.action.codReserva = data.CodReserva;
            this.action.indice = data.Indice;
            this.cancel();
        },
        cancel() {
            this.$swal.queue([{
                title: 'Processo de cancelamento',
                showCancelButton: true,
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                text: 'Iniciando processo de cancelamento de reserva, deseja continuar?',
                progressSteps: ['1', '2', '3'],
            },
            {
                title: 'Processo de cancelamento',
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
                text: 'Realizando o cancelamento...',
                progressSteps: ['1', '2', '3'],
                onOpen: () => {
                    this.cancelIntern();
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
            this.form.cancelAll = false;
            this.form.selected = [];
            if (this.form.nin == "" && this.form.codReserva == "" && this.form.id_apresentacao == '') {
                this.toastError("Preencha o CPF, código da reserva ou uma sala para consultar");
                return;
            }
            if ((this.form.codPeca != '' && this.form.codPeca != null) && (this.form.id_apresentacao == '' || this.form.id_apresentacao == null)) {
                this.toastError("Escolha uma sala para pesquisar por evento.");
                return;
            }


            this.processing = true;
            this.showWaitAboveAll();

            bookingService.list(this.get_id_base(), this.form.nin, this.form.codReserva, this.form.id_apresentacao).then(
                    response => {
                        this.hideWaitAboveAll();
                        this.processing = false;
                        if (this.validateJSON(response)) {
                            this.grids.reservations.items = response;
                            this.grids.reservations.loaded = true;
                            this.form.reservaSearch = this.form.codReserva != '' && response.length>0;
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
.fontSize {
    font-size: 11px;
}
.tableClicked tr {
    cursor: pointer;
}

</style>
