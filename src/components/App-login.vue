<template>
    <div>
        <div id="logreg-forms">
            <form class="form-signin">
                <div v-if="showwatch == 'login'">
                    <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> Entrar</h1>
                    <div class="social-login">
                        <button type="button" class="fblogin" @click="fblogin">Continue com o Facebook</button>
                    </div>
                    <input type="email" id="inputEmail" v-on:keyup.enter="signin" v-model="form.login" placeholder="E-mail" required="" autofocus="" v-bind:class="{ errorinputuser: (!validateinfo.login), 'form-control': true }">
                    <input type="password" id="inputPassword" v-model="form.pass" v-on:keyup.enter="signin" placeholder="Senha" required="" v-bind:class="{ errorinputuser: (!validateinfo.pass), 'form-control': true }">
                    
                    <button class="btn btn-success btn-block" type="button" @click="signin"><i class="fas fa-sign-in-alt"></i> 
                        <span v-if="processing">Aguarde...</span>
                        <span v-if="!processing">Entrar</span>
                    </button>
                        <a href="#" id="forgot_pswd" @click="showwatch='reset'">Esqueceu sua senha?</a>
                    <hr>
                    <button class="btn btn-primary btn-block" type="button" id="btn-signup" @click="signup"><i class="fas fa-user-plus"></i> Não tem cadastro ainda?</button>
                </div>
                <div v-if="showwatch == 'reset'">
                    <input type="email" id="resetEmail" class="form-control" v-model="form.login" placeholder="Email address" required="" autofocus="">
                    <button class="btn btn-primary btn-block" type="button" @click='resetmypassplease'>
                        <span v-if="processing">Aguarde...</span>
                        <span v-if="!processing">Resetar senha</span>
                    </button>
                    <a href="#" id="cancel_reset" @click="showwatch='login'"><i class="fas fa-angle-left"></i> Voltar</a>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import VModal from 'vue-js-modal';
import config from "@/config";
import { func } from "@/functions";
import { authService } from "@/components/common/services/auth";
import { usersiteService } from "@/components/common/services/user";

// import { fblogin } from "@/components/directive/fblogin";

Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true
});

export default {
    mixins: [func],
    name: 'login',
    components: { },
    directives: { },
    computed: { },
    methods: {
        fblogin() {
            let ctx = this;
            this.ls_remove("loginfail");

            FB.login(function(response) {
                if (response.authResponse) {
                    if (response.authResponse.grantedScopes.split(",").filter(s=>s=="email").length == 0) {
                        ctx.ls_add("loginfail", { success: false });
                        ctx.toastError("Facebook: Necessário ter a permissão para recuperar o e-mail do usuário, por favor clique em entrar novamente e dê a permissão correta.");
                        ctx.form.auth_type = "rerequest";
                        //ctx.fblogin("rerequest");
                        return;
                    }
                    else {
                        ctx.form.auth_type = "";
                        ctx.getFB();
                    }
                } else {
                    ctx.ls_add("loginfail", { success: false });
                    ctx.toastError("Não foi possível conectar no facebook");
                }
            },{
                scope: 'email', 
                return_scopes: true,
                auth_type: this.form.auth_type
            });
        },
        resetmypassplease() {
            if (this.processing) return;
            if (this.form.login == '') {
                this.toastError("Preencha o e-mail.");
                return;
            }
            this.showWaitAboveAll();
            this.processing = true;
            usersiteService.reset(this.form.login).then(
                response => {
                    this.processing = false;
                    this.hideWaitAboveAll();
                    if (this.validateJSON(response)) {
                        this.toastSuccess(response.msg);
                        this.closeloginfather();
                    }
                },
                error => {
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");
                    this.processing = false;
                }
            );

        },
        makeLoginbyFB(id) {
            authService.loginbyfb(id).then(
                response => {
                    if (this.validateJSON(response)) {
                        if (response.logged) {
                            this.ls_remove("fb_connect");
                            this.setClient(response);
                            this.closeloginfather();
                        }
                        else {
                            this.closeloginfather();
                            this.ls_add("fb_connect", JSON.stringify({ id, success: true }));
                        }
                    }
                },
                error => {
                    this.toastError("Falha na execução.");
                }
            );
        },
        getFB() {
            FB.api('/me', { fields: 'id' }, user => {
                this.makeLoginbyFB(user.id);
            });
        },
        loginfb(obj) {
            if (obj.status == "connected") {
                this.getFB();
            }
            else {
                this.toastError("Não foi possivel logar no Facebook.");
            }
        },
        logoutfb() {
            this.$store.dispatch('logout');
        },
        connectfb() {
            this.getFB();
        },
        setClient(obj) {
            if (obj.logged) {
                    this.ls_add("client", JSON.stringify({
                    name: obj.name,
                    token: obj.token,
                    login: obj.login,
                }));
                this.closeloginfather();
                this.toastSuccess(`Seja bem vindo ${obj.name}.`);
            } else {
                this.toastError(obj.msg);
            }
        },
        signin() {
            this.makeLogin();
        },
        makeLogin() {
            this.validateinfo.login = true;
            this.validateinfo.pass = true;

            if (this.processing) return;

            if (this.form.login == '' || this.form.pass == '') {
                this.toastError("Preencha os campos obrigatórios.");
                if (this.form.login == '')
                    this.validateinfo.login = false;
                if (this.form.pass == '')
                    this.validateinfo.pass = false;

                return;
            }
            this.processing = true;
            authService.login(this.form.login, this.form.pass).then(
                response => {
                    this.processing = false;
                    this.validateinfo.login = true;
                    this.validateinfo.pass = true;
                    if (this.validateJSON(response)) {
                        if (response.logged) {
                            this.setClient(response);
                        }
                        else {
                            this.toastError(response.msg);
                        }
                        // console.log(this.$parent);
                        this.closeloginfather();
                    }
                },
                error => {
                    this.processing = false;
                    this.toastError("Falha na execução.");
                }
            );
            
        },
        closeloginfather() {
            this.$route.matched[0].instances.default.$parent.modal_close_login();
        },
        signup() {
            this.ls_add("add_user", 1);
            this.closeloginfather();
        }
    },
    data () {
        return {
            processing: false,
            showwatch: 'login',
            token: "",
            validateinfo: {
                login: true,
                pass: true,
            },
            form: {
                auth_type: '',
                login: '',
                pass: ''
            },
        }
    },
    mounted () {
    },
    created () {
        this.ls_remove("fb_connect");
        FB.init({
            appId      : '1346180728855488',
            cookie     : true,  // enable cookies to allow the server to access 
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v3.2' // The Graph API version to use for the call
        });
        // this.getWindow.fbAsyncInit = function() {
        // }
    },
}
</script>

<style>

/* sign in FORM */
#logreg-forms{
    width:312px;
    margin:10vh auto;
    background-color:#f3f3f3;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
#logreg-forms form {
    width: 100%;
    max-width: 310px;
    padding: 15px;
    margin: auto;
}
#logreg-forms .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
#logreg-forms .form-control:focus { z-index: 2; }
#logreg-forms .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
#logreg-forms .form-signin input[type="password"] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

#logreg-forms .social-login{
    width:240px;
        margin:0 auto;
        margin-bottom: 10px;
}
#logreg-forms .social-btn{
    font-weight: 100;
    color:white;
    width:190px;
    font-size: 0.9rem;
}

#logreg-forms a{
    display: block;
    padding-top:10px;
    color:lightseagreen;
}

#logreg-form .lines{
    width:200px;
    border:1px solid red;
}

.notimplemented {
    display:none !important;
}    


#logreg-forms button[type="submit"]{ margin-top:10px; }

#logreg-forms .facebook-btn{  background-color:#3C589C; }

#logreg-forms .google-btn{ background-color: #DF4B3B; }

#logreg-forms .form-reset, #logreg-forms .form-signup{ display: none; }

#logreg-forms .form-signup .social-btn{ width:210px; }

#logreg-forms .form-signup input { margin-bottom: 2px;}

.form-signup .social-login{
    width:210px !important;
    margin: 0 auto;
}

.fblogin {
  color: white;
  background-color: #3b5998;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.errorinputuser {
  border-color: #EB0000;
  border-style: solid solid solid solid;
}

/* Mobile */

@media screen and (max-width:500px){
    #logreg-forms{
        width:300px;
    }
    
    #logreg-forms  .social-login{
        width:200px;
        margin:0 auto;
        margin-bottom: 10px;
    }
    #logreg-forms  .social-btn{
        font-size: 1.3rem;
        font-weight: 100;
        color:white;
        width:200px;
        height: 56px;
        
    }
    #logreg-forms .social-btn:nth-child(1){
        margin-bottom: 5px;
    }
    #logreg-forms .social-btn span{
        display: none;
    }
    #logreg-forms  .facebook-btn:after{
        content:'Facebook';
    }
  
    #logreg-forms  .google-btn:after{
        content:'Google+';
    }
}
</style>
