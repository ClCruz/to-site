<template>
    <div>
        <b-button-toolbar key-nav  aria-label="Toolbar with button groups" class="menuticketoffice">
            <b-button-group class="mx-1">
                <b-button v-if="!isAuth && !isLogin" variant="success" v-on:click="goto('system:login')">Entrar</b-button>
                <b-button v-if="isAuth && !purchaseProcessing" variant="danger" v-on:click="goto('system:logout')">Sair</b-button>
            </b-button-group>
            <b-button-group class="mx-1">
                <b-dropdown id="ddbase" ref="ddbase" v-if="isAuth && !purchaseProcessing" variant="warning" right :text="base">
                    <b-dropdown-item v-on:click="goto('base', { id_base: null, ds_nome_teatro: 'Escolha'})">Escolha</b-dropdown-item>
                    <b-dropdown-item v-for="item in bases"  :key="item.id_base" v-on:click="goto('base',item)">{{item.ds_nome_teatro}}</b-dropdown-item>                    
                </b-dropdown>
                <b-button id="header_next" v-if="isAuth" :disabled="!toNext" variant="success" v-on:click="goto('operation:next')">Prosseguir</b-button>
                <b-button id="header_client" v-if="showClient" variant="light" v-on:click="cashregister_client()">Cliente</b-button>
                <b-button id="header_cancel" v-if="showCancel" variant="danger" v-on:click="cancelPurchase">Cancelar</b-button>
            </b-button-group>
            <b-button-group class="mx-1">
                <b-dropdown v-if="isAuth && !purchaseProcessing" right text="Caixa">
                    <b-dropdown-item v-on:click="statusCaixa">Qual o status?</b-dropdown-item>
                    <b-dropdown-item v-on:click="goto('cashregister:open')">Abrir</b-dropdown-item>
                    <b-dropdown-item v-on:click="goto('cashregister:close')">Fechar</b-dropdown-item>
                    <b-dropdown-item v-on:click="goto('cashregister:moviment')">Movimentação</b-dropdown-item>
                    <b-dropdown-item v-on:click="goto('cashregister:withdraw')">Saque</b-dropdown-item>
                </b-dropdown>
                <b-button-group class="mx-1">
                    <b-dropdown v-if="isAuth && !purchaseProcessing" right text="Operação">
                        <b-dropdown-item v-on:click="goto('operation:sell')">Vender</b-dropdown-item>
                        <b-dropdown-item v-on:click="goto('operation:reservation')">Reservar</b-dropdown-item>
                        <b-dropdown-item v-on:click="goto('operation:search:purchase')">Buscar Venda</b-dropdown-item>
                        <b-dropdown-item v-on:click="goto('operation:search:reservation')">Buscar Reserva</b-dropdown-item>
                    </b-dropdown>
                </b-button-group>
            </b-button-group>
            <b-button-group class="mx-1">
                <b-dropdown v-if="isAuth && !purchaseProcessing" right text="Configurações">
                    <b-dropdown-item v-on:click="goto('config:pinpad')">Pinpad</b-dropdown-item>
                </b-dropdown>
            </b-button-group>
        </b-button-toolbar>
        <br />
        <b-breadcrumb :items="breadcrumb.items"/>
    </div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import { func } from '@/functions';
import { funcOperation } from '../ticketoffice/services/functions';
import { baseService } from './services/base';
import { cashregisterService } from './services/cashregister';

Vue.use(BootstrapVue);

export default {
    name: "ticketoffice_header",
    mixins: [func, funcOperation],
    data () {
        return {
            breadcrumb: {
                items: []
            },
            isHeader: true,
            processing: false,
            toNext: false,
            toNextRoute: '',
            base: 'Escolha',
            id_base: null,
            crStatus: '',
            bases: [],
        }
    },
    mounted () {
    },
    created () {
        //if (!this.$store.getters.isAuthenticated) return;
        this.breadcrumbMount();

        if (this.isAuth)
        {
            this.populateBases();
        }
    },
    computed: {
        isAuth () {
            return this.$store.getters.isAuthenticated;
        },
        isLogin() {
            return this.$router.currentRoute.path=="/ticketoffice/login"
        },
        purchaseProcessing() {
            if (!this.ls_get("purchaseProcessing"))
                return false;

            return this.ls_get("purchaseProcessing") == "true" || this.ls_get("purchaseProcessing") == true;
        },
        showCancel() {
            if (!this.ls_get("showCancel"))
                return false;

            return this.ls_get("showCancel") == "true" || this.ls_get("showCancel") == true;
        },
        showClient() {
            return this.$route.path.startsWith("/ticketoffice/sell");
        }
    },
    methods: {
        statusCaixa() {
            this.cashRegisterStatus(this.statusCaixaCallBack);
        },
        statusCaixaCallBack(msg) {
            this.toastSuccess(msg);
        },
        breadcrumbMount() {
            if (this.$router.currentRoute.path.startsWith('/ticketoffice/login')) {
                this.breadcrumb_feed(true, "ticketoffice");
                return;
            }

            if (this.$router.currentRoute.path.startsWith('/ticketoffice/pinpadconf')) {
                this.breadcrumb_feed(true, "ticketoffice");
                return;
            }

            if (this.$router.currentRoute.path.startsWith('/ticketoffice/operation/sell/seat')) {
                this.breadcrumb_feed(true, "operation:sell:seats");
                return;
            }

            if (this.$router.currentRoute.path.startsWith('/ticketoffice/operation/sell')) {
                this.breadcrumb_feed(true, "operation:sell");
                return;
            }

            if (this.$router.currentRoute.path.startsWith('/ticketoffice/operation/reservation/seat')) {
                this.breadcrumb_feed(true, "operation:reservation:seats");
                return;
            }

            if (this.$router.currentRoute.path.startsWith('/ticketoffice/operation/reservation')) {
                this.breadcrumb_feed(true, "operation:reservation");
                return;
            }

            if (this.$router.currentRoute.path.startsWith('/ticketoffice/sell')) {
                this.breadcrumb_feed(true, "operation:sell");
                return;
            }

            if (this.$router.currentRoute.path.startsWith('/ticketoffice/purchase/search')) {
                this.breadcrumb_feed(true, "operation:refund");
                return;
            }

            if (this.$router.currentRoute.path.startsWith('/ticketoffice/reservation/search')) {
                this.breadcrumb_feed(true, "operation:cancelReservation");
                return;
            }

            if (this.$router.currentRoute.path.startsWith('/ticketoffice/cashregister/moviments')) {
                this.breadcrumb_feed(true, "cashregister:moviments");
                return;
            }

            if (this.$router.currentRoute.path.startsWith('/ticketoffice/cashregister/close')) {
                this.breadcrumb_feed(true, "cashregister:close");
                return;
            }

            if (this.$router.currentRoute.path.startsWith('/ticketoffice/cashregister/withdraw')) {
                this.breadcrumb_feed(true, "cashregister:withdraw");
                return;
            }

            if (this.$router.currentRoute.path.startsWith("/ticketoffice")) {
                this.breadcrumb_feed(true, "ticketoffice");
            }

        },
        breadcrumb_feed(clear) {
            if (clear) { this.breadcrumb.items = [] }
            for (let x in arguments) {
                if (x == 0) continue;
                this.breadcrumb_helper(arguments[x]);
            }
        },
        breadcrumb_helper(type) {
            console.log("breadcrumb_helper: " + type);
            switch(type) {
                case "ticketoffice":
                    this.breadcrumb.items.push({ text: "Ticket Office", active: true, to: "/ticketoffice", disabled: false });
                break;
                case "cashregister:close":
                    this.breadcrumb.items.push({ text: "Ticket Office", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Caixa", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Fechar", active: true, to: "/ticketoffice/cashregister/close", disabled: false });
                break;
                case "cashregister:moviments":
                    this.breadcrumb.items.push({ text: "Ticket Office", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Caixa", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Movimentação", active: true, to: "/ticketoffice/cashregister/moviments", disabled: false });
                break;
                case "cashregister:withdraw":
                    this.breadcrumb.items.push({ text: "Ticket Office", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Caixa", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Sacar", active: true, to: "/ticketoffice/cashregister/withdraw", disabled: false });
                break;
                case "operation:sell":
                    this.breadcrumb.items.push({ text: "Ticket Office", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Operação", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Venda", active: true, to: "/ticketoffice/operation/sell", disabled: false });
                break;
                case "operation:reservation":
                    this.breadcrumb.items.push({ text: "Ticket Office", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Operação", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Reserva", active: true, to: "/ticketoffice/operation/reservation", disabled: false });
                break;
                case "operation:sell:seats":
                    this.breadcrumb.items.push({ text: "Ticket Office", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Operação", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Venda", active: true, to: "/ticketoffice/operation/sell", disabled: false });
                    this.breadcrumb.items.push({ text: "Assento", active: true, to: "/ticketoffice/seat", disabled: false });
                break;
                case "operation:reservation:seats":
                    this.breadcrumb.items.push({ text: "Ticket Office", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Operação", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Reserva", active: true, to: "/ticketoffice/operation/reservation", disabled: false });
                    this.breadcrumb.items.push({ text: "Assento", active: true, to: "/ticketoffice/seat", disabled: false });
                break;
                case "operation:reservation:client":
                    this.breadcrumb.items.push({ text: "Ticket Office", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Operação", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Reserva", active: true, to: "/ticketoffice/operation/reservation", disabled: false });
                    this.breadcrumb.items.push({ text: "Cliente", active: true, to: "/ticketoffice/seat", disabled: false });
                break;
                case "operation:refund":
                    this.breadcrumb.items.push({ text: "Ticket Office", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Operação", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Pós-Venda", active: true, to: "/ticketoffice/purchase/search", disabled: false });
                break;
                case "operation:cancelReservation":
                    this.breadcrumb.items.push({ text: "Ticket Office", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Operação", active: true, to: "/ticketoffice", disabled: false });
                    this.breadcrumb.items.push({ text: "Reserva", active: true, to: "/ticketoffice/reservation/search", disabled: false });
                    this.breadcrumb.items.push({ text: "Cancelar", active: true, to: "/ticketoffice/reservation/search", disabled: false });
                break;
            }
        },
        cashregister_client() {
            this.getCashRegister().showClient();
        },
        selectCurrentBaseOnLS() {
            if (this.ls_get("base")) {
                let helper = JSON.parse(this.ls_get("base"));
                this.id_base = helper.id;
                this.base = helper.name;
            }
        },
        populateBases() {            
            
            if (this.bases.length>0) 
            {
                this.selectCurrentBaseOnLS();
                return;
            }

            if (this.$parent.bases.length>0) {
                this.bases = this.$parent.bases;
                this.selectCurrentBaseOnLS();
            }                

            if (this.bases.length>0) 
            {
                this.selectCurrentBaseOnLS();
                return;
            }

            this.showWaitAboveAll();
            baseService.listBase(this.getLoggedId()).then(response=> {
                    this.hideWaitAboveAll();
                    if (this.validateJSON(response))
                    {
                        this.bases = response;
                        this.$parent.bases = response;
                    }
                    this.selectCurrentBaseOnLS();
                }
                ,error=> {
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");
            });
        },
        cancelPurchase() {
            let type = "";
            
            if (this.operation!=null && this.operation.step1!=null)
                type = this.operation.step1.type;

            switch (type)
            {
                case "sell":
                    this.clearPurchase(true);
                    this.cancelingSalesProcess();
                break;
                case "reservation":
                    this.clearPurchase(true);
                    this.cancelingReservationProcess();
                break;
                default:
                    this.clearPurchase(true);
                    this.cancelingSalesProcess();
                break;
            }
        },
        initiatingSalesProcess() {
            this.ls_add("purchaseProcessing", true);
            this.ls_add("showCancel", true);
        },
        initiatingReservationProcess() {
            this.ls_add("purchaseProcessing", true);
            this.ls_add("showCancel", false);
        },
        cancelingSalesProcess() {
            this.toNext = false;
            this.toNextRoute = '';
            this.ls_add("purchaseProcessing", false);
            this.ls_add("showCancel", false);
            this.gotoHome();
        },
        cancelingReservationProcess() {
            this.toNext = false;
            this.toNextRoute = '';
            this.ls_add("purchaseProcessing", false);
            this.ls_add("showCancel", false);
            this.gotoHome();
        },
        goto(to, item = null) {
            if (this.processing) return;

            switch (to) {
                case "operation:next":
                    if (this.get_id_base() == "" || this.get_id_base() == null) {
                        this.toastError("Escolha uma base.");
                        return;
                    }

                    if (this.toNextRoute)
                    {
                        switch (this.toNextRoute) {
                            case "sellmyitem":
                                this.getCashRegister().sell();
                            break;
                            case "finishReservation":
                                this.getMap().finishReservation();
                            break;
                            default:
                                this.$router.push(this.toNextRoute);
                            break;
                        }
                    }
                    this.toNext = false;
                    this.toNextRoute = '';
                break;
                case "base":
                    this.id_base = item.id_base;
                    this.base = item.ds_nome_teatro;
                    this.ls_add("base", JSON.stringify({id: item.id_base, name: item.ds_nome_teatro}));
                    this.statusCaixa();
                break;
                case "system:login":
                    this.$router.push("/ticketoffice/login");
                break;
                case "system:logout":
                    this.$store.dispatch('logout');
                break;
                case "cashregister:open":
                    if (this.get_id_base() == "" || this.get_id_base() == null) {
                        this.toastError("Escolha uma base.");
                        return;
                    }

                    if (!this.ls_get('id')) return;
                    
                    this.processing=true;

                    this.showWaitAboveAll();

                    cashregisterService.open(this.ls_get('id'), this.get_id_base()).then(response=> {
                            this.hideWaitAboveAll();
                            if (this.validateJSON(response))
                            {
                                if (response.success) {
                                    if (response.alreadyOpen) {
                                        this.toastInfo("Caixa já está aberto.");
                                    }
                                    else {
                                        this.toastSuccess("Caixa aberto com sucesso.");
                                    }
                                }
                                else {
                                    if (response.error) {
                                        this.toastError(response.message);
                                    }
                                }
                            }
                            this.processing=false;
                            //this.$wait.end("inprocess");
                        }
                        ,error=> {
                            this.hideWaitAboveAll();
                            this.toastError("Falha na execução.");
                            this.processing=false;
                    });
                break;
                case "cashregister:close":
                    if (this.get_id_base() == "" || this.get_id_base() == null) {
                        this.toastError("Escolha uma base.");
                        return;
                    }

                    if (!this.ls_get('id')) return;

                    this.$router.push("/ticketoffice/cashregister/close");
                break;
                case "operation:sell":
                    if (this.get_id_base() == "" || this.get_id_base() == null) {
                        this.toastError("Escolha uma base.");
                        return;
                    }

                    this.$router.push("/ticketoffice/operation/sell");
                break;
                case "operation:reservation":
                    if (this.get_id_base() == "" || this.get_id_base() == null) {
                        this.toastError("Escolha uma base.");
                        return;
                    }

                    this.$router.push("/ticketoffice/operation/reservation");
                break;
                case "operation:search:purchase":
                    if (this.get_id_base() == "" || this.get_id_base() == null) {
                        this.toastError("Escolha uma base.");
                        return;
                    }

                    this.$router.push("/ticketoffice/purchase/search");
                break;
                case "operation:search:reservation":
                    if (this.get_id_base() == "" || this.get_id_base() == null) {
                        this.toastError("Escolha uma base.");
                        return;
                    }

                    this.$router.push("/ticketoffice/reservation/search");
                break;
                case "cashregister:moviment":
                    if (this.get_id_base() == "" || this.get_id_base() == null) {
                        this.toastError("Escolha uma base.");
                        return;
                    }

                    this.$router.push("/ticketoffice/cashregister/moviments");
                break;
                case "config:print":
                    if (this.get_id_base() == "" || this.get_id_base() == null) {
                        this.toastError("Escolha uma base.");
                        return;
                    }

                    this.toastError("Ainda não implementado.");
                break;
                case "config:pinpad":
                    if (this.get_id_base() == "" || this.get_id_base() == null) {
                        this.toastError("Escolha uma base.");
                        return;
                    }
                    this.$router.push("/ticketoffice/pinpadconf");
                break;
                case "cashregister:withdraw":
                    if (this.get_id_base() == "" || this.get_id_base() == null) {
                        this.toastError("Escolha uma base.");
                        return;
                    }

                    this.$router.push("/ticketoffice/cashregister/withdraw");
                break;
            }
            ///ticketoffice/login
            ///ticketoffice/cashregister

            //alert(authService);
            //this.$wait.end("loading");
        }
    }
}
</script>

<style>
    .menuticketoffice {
        padding-top: 16px;
    }
</style>
