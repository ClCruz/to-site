<template>
<div v-if="loaded" class="container__login">
  <section class="to-block">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-12 col-lg-12 text-center">
          <div class="to-box to-touch pt-4">
            <form class="form-signin">
              <div v-if="showwatch == 'login'">
                <div class="row mb-4">
                  <div class="col">
                    <h2 style="font-size: 24px">Entrar</h2>
                  </div>
                </div>
                <div class="row social-login" v-if="hasfb">
                  <div class="col mb-4">
                    <button type="button" v-if="hasfb" class="fblogin btn-sm" @click="fblogin">Continuar com o Facebook
                    <span class="icon-form" title="Nome"><i class="fab fa-facebook"></i></span>

                    </button>
                  </div>
                </div>
                <hr data-content="ou" v-if="hasfb" class="divider">
                <hr data-content="" v-if="!hasfb" class="divider">
                <div class="row wrapper_login">
                  <div class="col mt-3">
                    <span class="icon-case" title="CEP"><i class="far fa-envelope"></i></span>          
                    <input type="email" id="inputEmail" v-on:keyup.enter="signin" v-model="form.login" placeholder="E-mail" required="" autofocus="" v-bind:class="{ errorinputuser: (!validateinfo.login), 'form-control': true }">
                    </div>
                  </div>
                  <div class="row wrapper_login">
                    <div class="col mt-2">
                      <span class="icon-case" title="CEP"><i class="fas fa-key"></i></span>          
                      <input type="password" id="inputPassword" v-model="form.pass" v-on:keyup.enter="signin" placeholder="Senha" required="" v-bind:class="{ errorinputuser: (!validateinfo.pass), 'form-control': true }">
                    </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col mt-4">
                        <button class="btn mb-2 btn-success" type="button" @click="signin"><i class=""></i> 
                        <span v-if="processing">Aguarde...</span>
                        <span v-if="!processing">Entrar</span>
                    </button>
                        <p class="mt-3" style="font-size: 14px"><a href="#" id="forgot_pswd" @click="showwatch='reset'">Esqueceu sua senha?</a></p>

                        <hr>

                        <div class="row" v-if="iscreatedvisible">
                          <div class="col-12" style="font-size: 14px;">
                            Você ainda não tem uma conta?
                            <a href="#" id="forgot_pswd"  @click="signup" style="font-weight: bold">Cadastre-se</a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div v-if="showwatch == 'reset'">
                    <input type="email" id="resetEmail" class="form-control mb-2 mt-4" v-model="form.login" placeholder="Endereço de E-mail" required="" autofocus="">
                    <button class="btn btn-success mb-4 btn-block" type="button" @click='resetmypassplease'>
                        <span v-if="processing">Aguarde...</span>
                        <span v-if="!processing">Resetar senha</span>
                    </button>
                    <a href="#" id="cancel_reset" class=" text-left" style="display: block" @click="showwatch='login'"><i class="fas fa-angle-left"></i> Voltar</a>
                  </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import Vue from "vue";
import VModal from 'vue-js-modal';
import config from "@/config";
import {
  func
} from "@/functions";
import {
  authService
} from "@/components/common/services/auth";
import {
  usersiteService
} from "@/components/common/services/user";
import {
  partnerService
} from "@/components/common/services/partner";

// import { fblogin } from "@/components/directive/fblogin";

Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true
});

export default {
  mixins: [func],
  name: 'login',
  components: {},
  directives: {},
  computed: {},
  methods: {
    fblogin() {
      let ctx = this;
      this.ls_remove("loginfail");

      FB.login(function (response) {
        if (response.authResponse) {
          if (response.authResponse.grantedScopes.split(",").filter(s => s == "email").length == 0) {
            ctx.ls_add("loginfail", {
              success: false
            });
            ctx.toastError("Facebook: Necessário ter a permissão para recuperar o e-mail do usuário, por favor clique em entrar novamente e dê a permissão correta.");
            ctx.form.auth_type = "rerequest";
            //ctx.fblogin("rerequest");
            return;
          } else {
            ctx.form.auth_type = "";
            ctx.getFB();
          }
        } else {
          ctx.ls_add("loginfail", {
            success: false
          });
          ctx.toastError("Não foi possível conectar no facebook");
        }
      }, {
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
    makeLoginbyFB(id, email) {
      authService.loginbyfb(id, email).then(
        response => {
          if (this.validateJSON(response)) {
            if (response.logged) {
              this.ls_remove("fb_connect");
              this.setClient(response);
              this.closeloginfather();
            } else {
              // this.closeloginfather();
              this.ls_add("fb_connect", JSON.stringify({
                id,
                success: true
              }));
            }
          }
        },
        error => {
          this.toastError("Falha na execução.");
        }
      );
    },
    getFB() {
      FB.api('/me', {
        fields: 'id,email'
      }, user => {
        this.makeLoginbyFB(user.id,user.email);
      });
    },
    loginfb(obj) {
      if (obj.status == "connected") {
        this.getFB();
      } else {
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
            } else {
              this.toastError(response.msg);
            }
            // console.log(this.$parent);
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
    },
    initfb(has, id) {
      this.hasfb = has == 1;
      if (has == 0 || has == false) {
        return;
      }
      FB.init({
        appId: id,
        cookie: true,
        xfbml: true,
        version: 'v3.2'
      });
    },
    getinfo() {
      this.processing = true;
      partnerService.getinfo().then(
        response => {
          this.loaded = true;
          this.processing = false;
          if (this.validateJSON(response)) {
            //console.log(response);
            this.initfb(response.hasfb, response.fb_appid);
          }
        },
        error => {
          this.loaded = true;
          this.processing = false;
        }
      );
    }
  },
  data() {
    return {
      processing: false,
      loaded: false,
      showwatch: 'login',
      iscreatedvisible: true,
      hasfb: false,
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
  mounted() {},
  created() {
    this.ls_remove("fb_connect");
    this.getinfo();

    switch (window.location.pathname) {
      case "/loginandshopping/printafter":
        this.iscreatedvisible = false;
      break;
    }


    // this.getWindow.fbAsyncInit = function() {
    // }
  },
}
</script>

<style lang="scss">
.container__login {
  
/* sign in FORM */
#logreg-forms {
  width: 312px;
  margin: 10vh auto;
  background-color: #f3f3f3;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
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

#logreg-forms .form-control:focus {
  z-index: 2;
}

#logreg-forms .form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

#logreg-forms .form-signin input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

#logreg-forms .social-login {
  width: 240px;
  margin: 0 auto;
  margin-bottom: 10px;

  &:hover {
    cursor: default;
  }
}

#logreg-forms .social-btn {
  font-weight: 100;
  color: white;
  width: 190px;
  font-size: 0.9rem;
}

#logreg-forms a {
  display: block;
  padding-top: 10px;
  color: lightseagreen;
}

#logreg-form .lines {
  width: 200px;
  border: 1px solid red;
}

.notimplemented {
  display: none !important;
}

#logreg-forms button[type="submit"] {
  margin-top: 10px;
}

#logreg-forms .facebook-btn {
  background-color: #3C589C;
}

#logreg-forms .google-btn {
  background-color: #DF4B3B;
}

#logreg-forms .form-reset,
#logreg-forms .form-signup {
  display: none;
}

#logreg-forms .form-signup .social-btn {
  width: 210px;
}

#logreg-forms .form-signup input {
  margin-bottom: 2px;
}

.form-signup .social-login {
  width: 210px !important;
  margin: 0 auto;
}

.fblogin {
  /* color: white;
  background-color: #3b5998;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}

.fblogin {
  color: #fff;
  background-color: #3b5998;
  border-color: rgba(0, 0, 0, 0.2);
  position: relative;
  padding-left: 35px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 0.3s;
  height: 40px;
  min-width: 60%;
  font-size: 16px;
  text-align: center;

  &:hover {
    cursor: pointer;
    transform: translateY(-0.8px);
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .2);
  }
}

.icon-form {
  position: absolute;
  left: 0;
  margin-left: 13px;

}

.errorinputuser {
  border-color: #EB0000;
  border-style: solid solid solid solid;
}

/* Mobile */

@media screen and (max-width:500px) {
  #logreg-forms {
    width: 300px;
  }

  #logreg-forms .social-login {
    width: 200px;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  #logreg-forms .social-btn {
    font-size: 1.3rem;
    font-weight: 100;
    color: white;
    width: 200px;
    height: 56px;

  }

  #logreg-forms .social-btn:nth-child(1) {
    margin-bottom: 5px;
  }

  #logreg-forms .social-btn span {
    display: none;
  }

  #logreg-forms .facebook-btn:after {
    content: 'Facebook';
  }

  #logreg-forms .google-btn:after {
    content: 'Google+';
  }
}

.to-block {
  background: none;
  padding-bottom: 0!important;
}

.to-box {
  cursor: default !important;
}

a,
a:hover {
  color: #008489;
}

.divider {
  margin-top: 20px;
  margin-bottom: 20px;
  font-style: italic;
  font-size: 13px;
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  text-align: center;
  height: 1.5em;
}

.divider:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background: #D6DADE;
}

.divider:after {
  font-size: 13px;
  color: #B2B9C1;
  content: attr(data-content);
  position: relative;
  display: inline-block;
  padding: 0 .5em;
  line-height: 1.5em;
  background-color: #ffffff;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(2.25rem + .25rem);
  padding: .375rem .75rem;
  font-size: 0.85em;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 0.5px solid #eee;
  border-radius: .1rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;

  &:focus {
    box-shadow: none;
  }
}

#cancel_reset {
    &:hover {
        color: #027175;
        text-decoration: none;
    }
}

.wrapper_login {
  .icon-case {
    background: none !important;
    position: absolute;
    right: 0;
    margin-right: 30px;
    margin-top: 8px;
    font-size: 16px;
    color: #d3d3d3;
    i {
     font-size: 0.9em !important;
    }
  }
}

#app {
  overflow: hidden!important;
}

.to-block .to-box {
  height: 98%;
}

}
</style>
