<template>
    <div class="bodyreset">
        <form>
            <h1 class="bodyresettitle">Por favor preencha sua nova senha</h1>
            <div style="padding-left: 51px;">
              <div v-bind:class="{ formgroup: true }" title="E-mail">
                  <span class="icon-case" title="E-mail"><i class="fa fa fa-envelope"></i></span>
                  <input type="email" data-rule="required" :disabled="true" maxlength="100" v-model="form.login" />
              </div> 
              <div v-bind:class="{ errorinputuser: (!validateinfo.pass), formgroup: true }">
                  <div class="input-group">
                  <span class="icon-case" title="Senha"><i class="fa fa fa-lock"></i></span>
                  <input :type="inputpasswordtype" data-rule="required" maxlength="30" v-model="form.pass" placeholder="Senha *" data-errormsg="A senha deve ser preenchido."/>
                  <span class="input-group-btn ignoreme">
                      <span id='eye_hidden' class="fa fa-lg fa-eye-slash" v-if="!form.showpass" @click="form.showpass=true" ></span>
                      <span id='eye_show' class="fa fa-lg fa-eye" v-if="form.showpass" @click="form.showpass=false"></span>
                  </span>
                  </div>
              </div> 

            </div>
          <button type="button" @click="save" title="Clique para alterar senha" class="bouton-contact">
              <span v-if="processing">Aguarde</span>
              <span v-if="!processing">Alterar senha</span>
          </button>		    
        </form>	
    </div>
</template>

<script>
import Vue from "vue";
import VModal from 'vue-js-modal';
import config from "@/config";
import VueMask from 'v-mask';
import PrettyInput from 'pretty-checkbox-vue/input';
import PrettyCheck from 'pretty-checkbox-vue/check';

import { func } from "@/functions";
import { authService } from "@/components/common/services/auth";

import { externalService } from "@/components/common/services/external";
import { usersiteService } from "@/components/common/services/user";

Vue.component('p-input', PrettyInput);
Vue.component('p-check', PrettyCheck);
Vue.use(VueMask);
Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true
});

export default {
    mixins: [func],
    name: 'login',
    props: ['code'],
    components: {
        
    },
    computed: {
      inputpasswordtype() {
        return this.form.showpass ? "text" : "password";
      },
    },
    mounted() {
      // console.log("oi");
      // console.log(this.code);
      this.get();
    },
    methods: {
      validate() {
        this.validateinfo.pass = true;
        let ret = true;

        if (this.form.pass.trim().length == 0 || this.form.pass.trim().length < 6) {
          ret = false;
          this.validateinfo.pass = false;
        }
        return ret;
      },
      get() {
        if (this.processing) return false;

        this.processing = true;
        this.$wait.start("inprocess");

        usersiteService.resetvalidatecode(this.code).then(
            response => {
              this.processing = false;
              this.hideWaitAboveAll();
              this.$wait.end("inprocess");

              if (this.validateJSON(response))
              {
                if (response.success) {
                  this.form.login = response.login;
                }
              }
            },
            error => {
              this.processing = false;
              this.hideWaitAboveAll();
              this.$wait.end("inprocess");
              this.toastError("Falha na execução.");
            }
          );      
      },
      save() {
        if (this.processing) return false;

        if (!this.validate()) {
          this.toastError("Preencha os campos obrigatórios ou verifique se estão com informações validas.");
          return false;
        }

        this.processing = true;
        this.$wait.start("inprocess");

        usersiteService.newpass(this.code, this.form.pass).then(
            response => {
              this.processing = false;
              this.hideWaitAboveAll();
              this.$wait.end("inprocess");

              if (this.validateJSON(response))
              {
                if (response.success) {
                  this.toastSuccess("Alterado com sucesso.");
                  if (response.logged) {
                    this.ls_add("client", JSON.stringify({
                      name: response.name,
                      token: response.token,
                      login: response.login,
                    }));
                  }
                  this.$modal.hide('resetpass');
                }
                else {
                  this.toastError(response.msg);
                }
              }
            },
            error => {
              this.processing = false;
              this.hideWaitAboveAll();
              this.$wait.end("inprocess");
              this.toastError("Falha na execução.");
            }
          );      
      }
    },
    data () {
        return {
            processing: false,
            token: "",
            selects: {
              documenttype: [],
            },
            validateinfo: {
                pass: true,
            },
            form: {
                login: '',
                showpass: false,
                pass: '',
            },
        }
    }
}
</script>

<style scoped>
.bodyreset {
  margin: auto;
  background: #eaeaea;  
  font-family: 'Open Sans', sans-serif;
}
.bodyresettitle {
    margin-bottom: 20px;
}
.info p {
  text-align:center;
  color: #999;
  text-transform:none;
  font-weight:600;
  font-size:15px;
  margin-top:2px
}

.info i {
  color:#F6AA93;
}
form h1 {
  font-size: 18px;
  background: #000 none repeat scroll 0% 0%;
  color: rgb(255, 255, 255);
  padding: 5px 5px;
  border-radius: 1px 1px 0px 0px;
  margin: auto;
  text-shadow: none; 
  text-align:left
}

form {
  border-radius: 5px;
  width:100%;
  margin: 5% auto;
  background-color: #FFFFFF;
  overflow: hidden;
}

p span {
  color: #F00;
}

p {
  margin: 0px;
  font-weight: 500;
  line-height: 2;
  color:#333;
}

h1 {
  text-align:center; 
  color: #666;
  text-shadow: 1px 1px 0px #FFF;
  margin:50px 0px 0px 0px
}

input:not([type='checkbox']) {
  border-radius: 0px 5px 5px 0px;
  border: 1px solid #eee;
  width: 75%;
  height: 40px;
  float: left;
  padding: 0px 15px;
}

a {
  text-decoration:inherit
}

textarea {
  border-radius: 0px 5px 5px 0px;
  border: 1px solid #EEE;
  margin: 0;
  width: 75%;
  height: 130px; 
  float: left;
  padding: 0px 15px;
}

.formgroup {
  overflow: hidden;
  clear: both;
  margin-bottom: 5px;
}

.icon-case {
  width: 35px;
  float: left;
  border-radius: 5px 0px 0px 5px;
  background:#eeeeee;
  height:40px;
  position: relative;
  text-align: center;
  line-height:40px;
}

i {
  color:#555;
}

.contentform {
  padding: 40px 30px;
}

.bouton-contact{
  background-color: #81BDA4;
  color: #FFF;
  text-align: center;
  width: 100%;
  border:0;
  padding: 17px 25px;
  border-radius: 0px 0px 5px 5px;
  cursor: pointer;
  margin-top: 40px;
  font-size: 18px;
}

.leftcontact {
  width:49.5%; 
  float:left;
  border-right: 1px dotted #CCC;
  box-sizing: border-box;
  padding: 0px 15px 0px 0px;
}

.rightcontact {
  width:49.5%;
  float:right;
  box-sizing: border-box;
  padding: 0px 0px 0px 15px;
}

.validation {
  display:none;
  margin: 0 0 10px;
  font-weight:400;
  font-size:13px;
  color: #DE5959;
}

#sendmessage {
  border:1px solid #fff;
  display:none;
  text-align:center;
  margin:10px 0;
  font-weight:600;
  margin-bottom:30px;
  background-color: #EBF6E0;
  color: #5F9025;
  border: 1px solid #B3DC82;
  padding: 13px 40px 13px 18px;
  border-radius: 3px;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.03);
}

#eye_hidden {
  top: 9px;
  position: relative;
  right: 23px;
  font-size: 15px;
  cursor: pointer;
  border-style: none none none none;
  border-width: 0px;
}
#eye_show {
  top: 9px;
  position: relative;
  right: 23px;
  font-size: 15px;
  cursor: pointer;
  border-style: none none none none;
  border-width: 0px;
}
.ignoreme {
  border-style: none none none none !important;
  border-width: 0px !important;
}

#sendmessage.show,.show  {
  display:block;
}

.errorcheckboxuser div label {
  color: #EB0000;
  border-style: none none solid none;
}

.errorinputuser input {
  border-color: #EB0000;
  border-style: solid solid solid none;
}
.errorinputuser .dddinput {
  border-color: #EB0000;
  border-style: solid none solid none;
}

.errorinputuser select {
  border-color: #EB0000;
  border-style: solid solid solid none;
}
.errorinputuser select .firstoption {
  color: #EB0000;
  font-size: 15px;
}
.errorinputuser ::placeholder {
  color: #EB0000;
  font-size: 15px;
}
.errorinputuser span {
  border-style: solid none solid solid;
  border-width: 1px;
  border-color: #EB0000;
  color: #EB0000;
}
.errorinputuser span i {
  color: #EB0000;
}
</style>
