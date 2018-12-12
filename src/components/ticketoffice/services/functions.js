import config from '@/config';
import Vue from 'vue';
import VueResource from "vue-resource";
import { func } from '@/functions';
import { bookingService } from '../../common/services/booking';
import { shoppingCartService } from '../../ticketoffice/services/shoppingcart';
import { cashregisterService } from '../../ticketoffice/services/cashregister';

Vue.use(VueResource);

export const funcOperation = {
    mixins: [func],
    data() {
        return {
        }
    },
    methods: {
        isCashRegisterOpenAndOk(execMe) {
            if (this.getLoggedId() == null || this.getLoggedId() == "")
                return false;

            if (this.get_id_base() == null || this.get_id_base() == "") {
                this.$swal({
                    type: 'error',
                    text: "Escolha uma base.",
                    showConfirmButton: true,
                  }).then((result) => {
                      this.gotoHome();
                  });
                return false;
            }

            if (this.getLoggedId() && this.get_id_base()) {
                this.showWaitAboveAll();
                cashregisterService.isok(this.get_id_base(), this.getLoggedId()).then(
                    response => {
                        this.hideWaitAboveAll();
                        if (this.validateJSON(response)) {
                            if (response.isok)
                            {
                                if (execMe!=null)
                                    execMe();
                                
                                return true;
                            }
                            else {
                                let msg = response.isopen && response.needClose ? `Necessário fechar o caixa (Aberto há ${response.hoursOpened}hrs)` : `Caixa está fechado.`;
                                this.$swal({
                                    type: 'error',
                                    text: msg,
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
        cashRegisterStatus(execMe) {
            if (this.getLoggedId() == null || this.getLoggedId() == "")
                return execMe('');

            if (this.get_id_base() == null || this.get_id_base() == "") {
                return execMe('');
            }

            if (this.getLoggedId() && this.get_id_base()) {
                cashregisterService.isok(this.get_id_base(), this.getLoggedId()).then(
                    response => {
                        if (this.validateJSON(response)) {
                            if (response.isok)
                            {                   
                                return execMe("Caixa está aberto.");
                            }
                            else {
                                let msg = response.isopen && response.needClose ? `Necessário fechar o caixa (Aberto há ${response.hoursOpened}hrs)` : `Caixa está fechado.`;
                                return execMe(msg);
                            }
                        }
                    },
                    error => {
                        return execMe('');
                    }
                );
              }            
        },
        clearPurchase(all) {
            this.clearOperation();
            this.ls_remove("purchaseProcessing");
            this.ls_remove("showCancel");

            if (this.getLoggedId()==null || this.getLoggedId() == "" || this.get_id_base() == null || this.get_id_base() == "") {
                return;
            }
            
            bookingService.clear(this.get_id_base(), this.getLoggedId(), all).then(response=> {
                    if (this.validateJSON(response))
                    {
                    }
                }
                ,error=> {
                    this.toastError("Falha na execução.");
            });
            shoppingCartService.clear(this.getLoggedId()).then(response=> {
                    if (this.validateJSON(response))
                    {
                    }
                }
                ,error=> {
                    this.toastError("Falha na execução.");
            });
        },
        get_id_base() {
            let ret = null;
            if (this.ls_get("base")) {
                let helper = JSON.parse(this.ls_get("base"));
                ret = helper.id;
            }
            return ret;
        },
        isAuthenticated () {
            return this.$store.getters.isAuthenticated;
        },
        createObject() {
            return { 
                codPeca: null,
                step1: {
                    executed: false,
                    datePresentation: null,
                    id_apresentacao: null,
                    hourPresentation: null,
                    roomName: null,
                    type: null,
                },
                step2: {
                    executed: false,
                },
                step3: {
                    executed: false,
                    totalAmount: null,
                    payment: [],
                }
            }
        },
        createObjectPayment() {
            return {
                type: null,
                amount: null,
                itens: [],
            }
        },
        createObjectItem() {
            return {
                seat: { 
                    indice: null,
                    name: null
                },                
                ticketType: null,
                amount: null,
            }
        },
        backToSquareOne() {
            let op = this.retrieve();
            let codPeca = op.codPeca;
            let datePresentation = op.step1.datePresentation;
            let id_apresentacao = op.step1.id_apresentacao;
            let hourPresentation = op.step1.hourPresentation
            let roomName = op.step1.roomName;
            let type = op.step1.type;

            this.clearOperation();
            this.ls_remove("purchaseProcessing");
            this.ls_remove("showCancel");

            this.addStep1(codPeca, datePresentation, id_apresentacao, hourPresentation, roomName, type);
            this.$router.push(`/ticketoffice/operation/sell/seat`);
        },
        backToBases() {
            this.clearOperation();
            this.ls_remove("purchaseProcessing");
            this.ls_remove("showCancel");
            this.$router.push(`/ticketoffice/operation/sell`);
        },
        retrieve() {
            if (!this.ls_get("operation"))
                this.ls_add("operation", JSON.stringify(this.createObject()));

            let obj = JSON.parse(this.ls_get("operation"));
            return obj;
        },
        clearOperation() {
            //localStorage.setItem("operation", JSON.stringify(this.createObject()));
            this.ls_remove("operation");
        },
        addStep1(codPeca, datePresentation, id_apresentacao, hourPresentation, roomName, type) {
            if (!this.ls_get("operation"))
                this.ls_add("operation", JSON.stringify(this.createObject()));

            let obj = JSON.parse(this.ls_get("operation"));
            obj.codPeca = codPeca;
            obj.step1.executed = true;
            obj.step1.id_apresentacao = id_apresentacao;
            obj.step1.datePresentation = datePresentation;
            obj.step1.hourPresentation = hourPresentation;
            obj.step1.roomName = roomName;
            obj.step1.type = type;

            this.ls_add("operation", JSON.stringify(obj));
        },
        addStep2() {
            if (!this.ls_get("operation")){
                this.toastError("Falha para recuperar informações.");
                this.$router.push("/ticketoffice");
                return;
            }
            let obj = JSON.parse(this.ls_get("operation"));
            
            obj.step2.executed = true;
            
            this.ls_add("operation", JSON.stringify(obj));
        },
        addStep3() {
            if (!this.ls_get("operation")){
                this.toastError("Falha para recuperar informações.");
                this.$router.push("/ticketoffice");
                return;
            }
            let obj = JSON.parse(this.ls_get("operation"));
            
            //
            
            this.ls_add("operation", JSON.stringify(obj));
        },
        purchase() {
            if (!this.ls_get("operation")){
                this.toastError("Falha para recuperar informações.");
                this.$router.push("/ticketoffice");
                return;
            }
            let obj = JSON.parse(this.ls_get("operation"));
            
            //
            
            localStorage.removeItem("operation");
        },
    }
}