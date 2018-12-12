<template>
    <div v-if="isAuthenticated" style="padding-left: 35px; position:relative">
        <client-add :key="idClient" ref="clientadd" v-if="showClientAdd" v-bind:code="form.clientCode" v-bind:needCPF="event.validations.needCPF" v-bind:needRG="event.validations.needRG" v-bind:needPhone="event.validations.needPhone" v-bind:needName="event.validations.needName" v-bind:needCardBin="event.validations.needCardBin" showCardBin="true"></client-add>
        <span v-if="!showClientAdd">
            <b-form>
                <b-row>
                    <b-col>
                        <b-alert variant="success" show v-if="event.loaded">Evento: {{event.name}} | {{operation.step1.roomName}} - {{operation.step1.datePresentation}} - {{operation.step1.hourPresentation}}</b-alert>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-container fluid>
                            <b-row class="my-1">
                                <b-input-group size="sm">
                                    <b-input-group-prepend is-text class="firstLabel">
                                        Forma de Pagamento:
                                    </b-input-group-prepend>
                                    <b-form-select id="payment_type" v-model="form.payment" :options="payments" @change="paymentChange">
                                        <template slot="first">
                                            <option :value="null" disabled>-- Selecione --</option>
                                        </template>
                                    </b-form-select>
                                </b-input-group>
                            </b-row>
                            <b-row class="my-1">
                                <b-input-group size="sm">
                                    <b-input-group-prepend is-text class="firstLabel">
                                        Bilhete:
                                    </b-input-group-prepend>
                                    <b-form-select id="ticket_type" v-model="form.ticket_type" :options="tickets">
                                        <template slot="first">
                                            <option :value="null" disabled>-- Selecione --</option>
                                        </template>
                                    </b-form-select>
                                </b-input-group>
                            </b-row>
                        </b-container>
                    </b-col>
                    <b-col>
                        <b-container fluid>
                            <b-row class="my-1">
                                <b-input-group size="sm">
                                    <b-input-group-prepend is-text class="firstLabel">
                                        Total a pagar:
                                    </b-input-group-prepend>
                                    <b-input-group-prepend is-text>
                                        R$
                                    </b-input-group-prepend>
                                    <b-form-input id="amountTotal" type="text" v-money="money" readonly :value="amountTotal">                                            
                                    </b-form-input>
                                </b-input-group>
                            </b-row>
                            <b-row class="my-1">
                                <b-input-group size="sm">
                                    <b-input-group-prepend is-text class="firstLabel">
                                        Valor:
                                    </b-input-group-prepend>
                                    <b-input-group-prepend is-text>
                                        R$
                                    </b-input-group-prepend>
                                    <b-form-input ref="amountPaid" prepend="R$" id="amountPaid" type="text" 
                                                    v-model.lazy="form.amountPaid" v-money="money"
                                                    @change="amountPaidChange">
                                    </b-form-input>
                                    <b-input-group-append>
                                        <b-btn variant="info" @click="equalize">=</b-btn>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-row>
                            <b-row class="my-1">
                                <b-input-group size="sm">
                                    <b-input-group-prepend is-text class="firstLabel">
                                        Troco:
                                    </b-input-group-prepend>
                                    <b-input-group-prepend is-text>
                                        R$
                                    </b-input-group-prepend>
                                    <b-form-input prepend="R$" id="amountChange" type="text" readonly v-money="money" :value="amountChange"></b-form-input>
                                </b-input-group>
                            </b-row>
                        </b-container>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-table striped="striped"
                                outlined="outlined"
                                small="small"
                                hover="hover"
                                class="bg-white"
                                v-if="grids.purchases.loaded"
                                :items="grids.purchases.items"
                                :fields="grids.purchases.fields">

                            <template slot="valid" slot-scope="data">
                                <b-badge variant="success" v-if="data.item.valid">&nbsp;&nbsp;</b-badge>
                                <b-badge v-b-tooltip.hover title="Por favor escolha o tipo de bilhete" variant="warning" v-if="!data.item.valid">&nbsp;&nbsp;</b-badge>
                            </template>

                            <template slot="TipBilhete" slot-scope="data">
                                <b-button v-b-tooltip.hover title="Clique para colocar o tipo de bilhete" size="sm" variant="secondary" @click="choose(data, 'add')" v-if="!data.item.valid && (form.ticket_type)">
                                    Escolher
                                </b-button>
                                <b-button v-b-tooltip.hover title="Escolha o tipo de bilhete" size="sm" variant="secondary" @click="choose(data, 'add')" v-if="!data.item.valid && !(form.ticket_type)">
                                    &nbsp;
                                </b-button>
                                <b-button v-b-tooltip.hover title="Clique para remover" size="sm" variant="secondary" @click="choose(data, 'delete')" v-if="data.item.valid && !(form.ticket_type)">
                                    {{data.item.TipBilhete}}
                                </b-button>
                                <b-button v-b-tooltip.hover title="Clique para alterar" size="sm" variant="secondary" @click="choose(data, 'update')" v-if="data.item.valid && (form.ticket_type)">
                                    {{data.item.TipBilhete}}
                                </b-button>
                            </template>

                            <template slot="amount" slot-scope="data">
                                <span>{{data.item.amount | money}}</span>
                            </template>

                            <template slot="amountSubTotalSector" slot-scope="data">
                                {{data.item.amount | subTotalSector(data) }}
                            </template>

                            <template slot="amount_topay" slot-scope="data">
                                {{data.item.amount | subTotal(data) }}
                            </template>

                            <template slot="PerDesconto" slot-scope="data">
                                {{data.item.PerDesconto | percentage }}
                            </template>

                            <template slot="PerDescontoTipBilhete" slot-scope="data">
                                {{data.item.PerDescontoTipBilhete | percentage }}
                            </template>

                        </b-table>
                    </b-col>
                </b-row>
            </b-form>
        </span>
    </div>
</template>

<script>
import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';
import { func } from '@/functions';
import { funcOperation } from '../../../components/ticketoffice/services/functions';
import { eventService } from '../../../components/ticketoffice/services/event';
import { bookingService } from '../../../components/common/services/booking';
import { shoppingCartService } from '../../../components/ticketoffice/services/shoppingcart';
import { paymentService } from '../../../components/common/services/payment';
import { ticketService } from '../../../components/common/services/ticket';
import { cashregisterService } from '../../../components/ticketoffice/services/cashregister';
import { pinpadService } from '../../../components/ticketoffice/services/pinpad';
import { purchaseService } from '../../../components/common/services/purchase';
import { printService } from '../../../components/ticketoffice/services/print';
import clientAdd from '../Client';
import { VMoney } from 'v-money'

Vue.filter('money', function (value) {
    if (!value) return ''
    let help = parseFloat(value)/parseFloat(100);
    let ret = help.toFixed(2);
    return `R$ ${ret}`;
});

Vue.filter('percentage', function (value) {
    if (!value) return ''
    //let ret = value.toFixed(2);
    return `${value}%`;
});
Vue.filter('subTotalSector', function (value, data) {
    if (!data.item.PerDesconto) return "-";
    let valueAux = parseFloat(value)/parseFloat(100);
    let per = data.item.PerDesconto/100;
    let amountPer = valueAux*per;
    let ret = (valueAux-amountPer).toFixed(2);
    return `R$ ${ret}`;
});
Vue.filter('subTotal', function (value, data) {
    let amount = parseFloat(value)/parseFloat(100);

    if (data.item.PerDesconto)
    {
        let perS = data.item.PerDesconto/100;
        let amountPerS = amount*perS;
        amount = amount-amountPerS;
    }

    if (data.item.PerDescontoTipBilhete)
    {
        let perTB = data.item.PerDescontoTipBilhete/100;
        let amountPerTB = amount*perTB;
        amount = amount-amountPerTB;
    }

    let ret = amount.toFixed(2);
    return `R$ ${ret}`;
});


export default {
    name: 'cashRegister',
    mixins: [func, funcOperation],
    components: {
        clientAdd: clientAdd
    },
    directives: {money: VMoney},
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
            idClient: 0,
            showClientAdd: false,
            isCashRegister: true,
            nextURI: "sellmyitem",
            processing: false,
            loading: false,
            payments: [],
            tickets: [],
            timers: {
                pinpad: null,
            },
            messagePinpad: null,
            form: {
                clientCode: null,
                cardBin: "",
                payment: null,
                ticket_type: null,
                amountPaid: 0,
                pinpadKey: null,
                currentPinpadMessageIndex: 0,
                codVenda: null,
                id_pedido_venda: null,
            },
            grids: {
                purchases: {
                    loaded: false,
                    items: [],
                    fields: {
                        valid: {label: '', sortable: false},
                        NomSetor: { label: 'Setor', sortable: false },
                        NomObjeto: { label: 'Cadeira', sortable: false },
                        TipBilhete: { label: 'Tipo de Ingresso', sortable: false },
                        amount: { label: 'Valor', sortable: false },
                        PerDesconto: { label: '% Setor', sortable: false },
                        amountSubTotalSector: { label: 'Sub Total', sortable: false },
                        PerDescontoTipBilhete: { label: '% Ingresso', sortable: false },
                        amount_topay: { label: 'Total', sortable: false },
                    },
                }
            },
            event: {
                validations: {
                    needClient: false,
                    needCPF: false,
                    needRG: false,
                    needPhone: false,
                    needName: false,
                    needCardBin: false,
                },  
                loaded: false,
                image: "",
                name: null,
                cost: null,
                sellWeb: false,
                days: null,
                duration: null,
                genre: null,
                room: {
                    loaded: false,
                    isNumbered: false,
                }                
            },
        }
    },
    methods: {
        equalize() {
            this.$refs.amountPaid.$el.value = this.amountTotal;
            this.form.amountPaid = this.amountTotal;
        },
        showClient() {
            this.idClient++;
            this.showClientAdd = true;
        },
        hideClient() {
            this.showClientAdd = false;
        },
        setPinpadTimer() {
            this.timers.pinpad = setInterval(this.pinpadStatus, 500);
        },
        clearPinpadTimer() {
            clearInterval(this.timers.pinpad);
        },
        pinpadCall() {
            Vue.nextTick().then(response=> {
                pinpadService.purchase(this.form.pinpadKey).then(response=> {
                        if (this.validateJSON(response))
                        {
                            if (response.success) {
                                this.form.codVenda = response.codVenda;
                            }
                            else {
                                let msg = 'Ocorreu um problema de comunicação com o pinpad, deseja tentar novamente?';
                                if (response.canceled) {
                                    msg = "Cancelado pelo usuário. Deseja tentar novamente?";
                                }
                                else if (response.logicalFail) {
                                    msg = response.message;
                                    msg += " Deseja tentar novamente?";
                                }
                                this.$swal.insertQueueStep({
                                    title: 'Comunicação com pinpad',
                                    type:'error',
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    allowEnterKey: false,
                                    showCancelButton: true,
                                    showConfirmButton: true,
                                    confirmButtonText: 'Sim',
                                    cancelButtonText: 'Não',
                                    text: msg,
                                    progressSteps: ['1', '2', '3', '4'],
                                    currentProgressStep: 2,
                                    preConfirm: () => {
                                        this.$swal.insertQueueStep({
                                            title: 'Comunicação com pinpad',
                                            showCancelButton: false,
                                            showConfirmButton: false,
                                            text: "Iniciando comunicação com o pinpad.",
                                            progressSteps: ['1', '2', '3', '4'],
                                            currentProgressStep: 2,
                                            onOpen: () => {
                                                this.pinpadSave();
                                            },
                                        });
                                        this.$swal.clickConfirm();
                                    },
                                });
                                this.$swal.clickConfirm();
                            }
                            this.pinpadStatus(false);                            
                        }
                    }
                    ,error=> {
                        //console.log(JSON.stringify(response));
                        //this.processing=false;
                        //this.$wait.end("inprocess");
                        //this.toastError("Falha na execução.");
                });
            });
        },
        pinpadStatus(continuous) {
            if (continuous == undefined || continuous == null) {
                continuous = true;
            }
            this.clearPinpadTimer();
            pinpadService.status(this.form.pinpadKey).then(response=> {
                    if (this.validateJSON(response))
                    {                        
                        let resetTimer = continuous;
                        if (response.all.length != this.form.currentPinpadMessageIndex) {
                            //console.log(response);
                            //debugger;
                            this.form.currentPinpadMessageIndex = response.all.length;

                            let message = "";
                            let showConfirmButton = false;
                        
                            for (let x in response.all) {
                                if (response.all[x].error) {
                                    resetTimer = false;
                                    message+="<span style='color:#ff0000'>"+response.all[x].strace + "</span><br />";
                                }
                                else {
                                    message+=response.all[x].strace + "<br />";
                                }
                                showConfirmButton = response.all[x].canClose;
                                this.messagePinpad = message;
                            }
                            this.$swal.insertQueueStep({
                                title: 'Comunicação com pinpad',
                                allowEscapeKey: false,
                                allowOutsideClick: false,
                                allowEnterKey: false,
                                showCancelButton: false,
                                showConfirmButton: showConfirmButton,
                                confirmButtonText: 'OK',
                                html: message,
                                progressSteps: ['1', '2', '3', '4'],
                                currentProgressStep: showConfirmButton ? 3 : 2,
                            });
                            this.$swal.clickConfirm();
                        }
                        if (resetTimer)
                            this.setPinpadTimer();
                    }
                    
                }
                ,error=> {
                    //console.log(JSON.stringify(response));
                    //this.processing=false;
                    //this.$wait.end("inprocess");
                    //this.toastError("Falha na execução.");
            });
        },
        pinpadSave() {
            pinpadService.add(this.getLoggedId(), this.get_id_base(),this.operation.codPeca,this.operation.step1.id_apresentacao, this.form.payment, this.form.clientCode).then(response=> {
                    if (this.validateJSON(response))
                    {
                        this.form.pinpadKey = response.key;
                        this.pinpadCall();
                        this.setPinpadTimer();
                    }
                }
                ,error=> {
                    //console.log(JSON.stringify(response));
                    //this.processing=false;
                    //this.$wait.end("inprocess");
                    //this.toastError("Falha na execução.");
            });
        },
        sellConfirm() {
            purchaseService.whatshouldido(this.get_id_base(), this.getLoggedId(), this.form.payment).then(response=> {
//                alert("response.nextStep: " + response.nextStep);
                    //return;
                    if (this.validateJSON(response))
                    {
                        switch (response.nextStep) {
                            case "pinpad":
                                this.$swal.insertQueueStep({
                                    title: 'Comunicação com pinpad',
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    allowEnterKey: false,
                                    showCancelButton: false,
                                    showConfirmButton: false,
                                    html: "Iniciando comunicação com o pinpad.",
                                    progressSteps: ['1', '2', '3', '4'],
                                    onOpen: () => {
                                        this.pinpadSave();
                                    },
                                });
                                this.$swal.clickConfirm();
                            break;
                            case "direct":
                                purchaseService.create(this.get_id_base(), this.getLoggedId(), this.form.payment,"",this.form.clientCode).then(response=> {
                                                    if (this.validateJSON(response))
                                                    {
                                                        switch (response.nextStep) {
                                                            case "charge":
                                                                //direct from pinpad
                                                            break;
                                                            case "close":
                                                                this.form.codVenda = response.codVenda;
                                                                this.form.id_pedido_venda = response.id_pedido_venda;
                                                                this.$swal.insertQueueStep({
                                                                    title: 'Processo de venda',
                                                                    type: 'success',
                                                                    allowEscapeKey: false,
                                                                    allowOutsideClick: false,
                                                                    allowEnterKey: false,
                                                                    showCancelButton: false,
                                                                    showConfirmButton: true,
                                                                    confirmButtonText: 'OK',
                                                                    html: "Venda realizada com sucesso.<br />Código: " + this.form.codVenda,
                                                                    progressSteps: ['1', '2'],
                                                                });
                                                                this.$swal.clickConfirm();
                                                            break;
                                                        }
                                                    }
                                                }
                                                ,error=> {
                                                    //console.log(JSON.stringify(response));
                                                    //this.processing=false;
                                                    //this.$wait.end("inprocess");
                                                    //this.toastError("Falha na execução.");
                                            });

                            break;
                        }
                    }
                }
                ,error=> {
                    //console.log(JSON.stringify(response));
                    //this.processing=false;
                    //this.$wait.end("inprocess");
                    //this.toastError("Falha na execução.");
            });            
        },
        askAfter() {
            printService.ticket(this.get_id_base(), this.form.codVenda, '');
            this.$swal({
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                title: 'Nova venda',
                text: "Deseja realizar uma nova venda para essa mesma sala/evento?",
            }).then((result) => {
                //debugger;
                if (result.value) {
                    this.backToSquareOne();
                }
                else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    this.backToBases();
                }
            });
        },
        sell() {
            this.$swal.queue([{
                title: 'Processo de venda',
                showCancelButton: true,
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                text: 'Iniciando processo de finalização da venda, deseja continuar?',
                progressSteps: ['1', '2', '3', '4'],
            },
            {
                title: 'Processo de venda',
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
                text: 'Realizando venda...',
                progressSteps: ['1', '2', '3', '4'],
                onOpen: () => {
                    this.sellConfirm();
                },
            } 
            ]).then((result) => {
                if (result.value) {
                    this.clearPinpadTimer();
                    this.askAfter();
                }
                else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    this.clearPinpadTimer();
                    this.toffice_buttonNext(true, this.nextURI);
                    //this.backToBases();

                    //if (this.form.codVenda!=null) {
                    //    purchaseService.refund(this.get_id_base(), this.getLoggedId(), this.form.codVenda, 1,"",0).then(response=> {
                    //            if (this.validateJSON(response))
                    //            {
                                    //this.$router.push(`/ticketoffice/operation/sell`);
                    //            }
                    //        }
                    //        ,error=> {
                    //            this.toastError("Falha na execução.");
                    //    });
                    //}
                }
            });
        },
        paymentChange() {
            Vue.nextTick().then(response=> {
                this.checkIfCanSell();
            });
        },
        amountPaidChange() {
            Vue.nextTick().then(response=> {
                this.checkIfCanSell();
            });
        },
        setTotalToPay(){
            this.$refs.amountPaid.$el.value = this.amountTotal;
            this.form.amountPaid = this.amountTotal;
        },
        choose(data, type) {
            if (this.form.ticket_type == null || this.form.ticket_type == "") {
                this.toastError("Escolha o tipo de bilhete.");
                return;
            }
            shoppingCartService.update(this.get_id_base(), this.getLoggedId(), data.item.indice, this.form.ticket_type).then(response=> {
                    if (this.validateJSON(response))
                    {
                        switch (type) {
                            case "add":
                                this.toastSuccess(`Tipo do Bilhete definido com suceso.`);
                            break;
                            case "update":
                                this.toastSuccess(`Tipo do Bilhete alterado com suceso.`);
                            break;
                            case "delete":
                                this.toastSuccess(`Tipo do Bilhete removido com suceso.`);
                            break;
                        }
                        this.loadShoppingCart();
                    }
                }
                ,error=> {
                    //console.log(JSON.stringify(response));
                    //this.processing=false;
                    //this.$wait.end("inprocess");
                    //this.toastError("Falha na execução.");
            });

        },
        checkIfCanSell() {
            //debugger;
            let allvalidCheck = false;
            let paymentCheck = false;
            let valueCheck = false;
            let clientCheck = false;
            
            for (let x in this.grids.purchases.items) {
                if (!this.grids.purchases.items[x].valid) {
                    allvalidCheck = false;
                    break;
                }
                else {
                    allvalidCheck = true;
                }
            }
            
            if (this.form.payment)
                paymentCheck = true;

            if (parseFloat(this.form.amountPaid) >= parseFloat(this.amountTotal))
                valueCheck = true;

            if (this.event.validations.needClient && (this.form.clientCode != null && this.form.clientCode != ""))
                clientCheck = true

            if (!this.event.validations.needClient)
                clientCheck = true;

            if (allvalidCheck && paymentCheck && valueCheck && clientCheck)
                this.toffice_buttonNext(true, this.nextURI);
            else
                this.toffice_buttonNext(false);
        },
        loadShoppingCart() {
            this.showWaitAboveAll();

            cashregisterService.shoppingCart(this.getLoggedId(), this.get_id_base()).then(response=> {
                    this.hideWaitAboveAll();
                    if (this.validateJSON(response))
                    {
                        this.grids.purchases.loaded = true;
                        this.grids.purchases.items = response;
                        this.setTotalToPay();
                        this.checkIfCanSell();
                    }
                }
                ,error=> {
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");
            });
        },
        loadTickets() {
            this.showWaitAboveAll();

            ticketService.types(this.get_id_base(), this.operation.codPeca, this.operation.step1.id_apresentacao).then(response=> {
                    this.hideWaitAboveAll();
                    if (this.validateJSON(response))
                    {
                        this.tickets = response;
                    }
                }
                ,error=> {
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");
            });
        },
        loadPayments() {
            this.showWaitAboveAll();

            paymentService.list(this.get_id_base()).then(response=> {
                    this.hideWaitAboveAll();
                    if (this.validateJSON(response))
                    {
                        this.payments = response;
                    }
                }
                ,error=> {
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");
            });
        },
        loadEvent() {
            this.showWaitAboveAll();

            eventService.get(this.get_id_base(), this.operation.codPeca).then(response=> {
                    this.hideWaitAboveAll();
                    if (this.validateJSON(response))
                    {
                        this.event.loaded = true;

                        this.event.name = response.NomPeca;
                        this.event.cost = response.ValIngresso;
                        this.event.sellWeb = response.in_vende_site == "1";
                        this.event.days = response.days;
                        this.event.duration = response.TemDurPeca;
                        this.event.genre = response.TipPeca;
                        
                        this.event.validations.needClient = response.needClient == "1";
                        this.event.validations.needCPF = response.needCPF == "1";
                        this.event.validations.needRG = response.needRG == "1";
                        this.event.validations.needPhone = response.needPhone == "1";
                        this.event.validations.needName = response.needName == "1";
                    }
                }
                ,error=> {
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");
            });
        },
    },
    created() {
        //if (!this.$store.getters.isAuthenticated) return;

        this.getHeader().initiatingSalesProcess();

        this.loadEvent();
        this.loadPayments();
        this.loadTickets();
        this.loadShoppingCart();
    },
    computed: {
        amountTotal() {
            let total = 0;
            for (let x in this.grids.purchases.items) {
                total+=this.grids.purchases.items[x].amount_topay;
            }

            let ret = parseFloat(total)/100;
            return ret.toFixed(2);
        },
        amountChange() {
            let total = this.amountTotal;
            let paid = this.form.amountPaid;
            let count = total-paid;
            let ret = 0;
            if (count<0) {
                ret = count*-1;
            }
            return ret;
        },
        operation() {
            return this.retrieve();
        }

    }
}
</script>

<style lang="scss">
.card {
    color: #000 !important;
}
.card-title {
    margin-bottom: 0.75rem;
    color: #fff;
}
.firstLabel div {
    min-width: 106px;
}
.list-group-item {
    padding: 3px 10px;
    font-size: 13px;
    text-align: left;
    background-color:#0000
}
</style>
