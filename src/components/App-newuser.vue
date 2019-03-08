<template>
    <div class="bodynewuser">
  <form>
	    <h1>Por favor <span @click="fakeme">p</span>reencha os campos abaixo</h1>
	    
    <div class="contentform">
    	<div class="leftcontact">
        <div v-bind:class="{ errorinputuser: (!validateinfo.firstname), formgroup: true }">
          <span class="icon-case" title="Nome"><i class="fa fa-male"></i></span>
          <input type="text" data-rule="required" maxlength="50" v-model="form.firstname" placeholder="Nome *" data-errormsg="O nome deve ser preenchido."/>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.lastname), formgroup: true }">
          <span class="icon-case" title="Sobrenome"><i class="fa fa-male"></i></span>
          <input type="text" data-rule="required" maxlength="50" v-model="form.lastname" placeholder="Sobrenome *" data-errormsg="O sobrenome deve ser preenchido."/>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.birthdate), formgroup: true }">
          <span class="icon-case" title="Data de Nascimento"><i class="fa fa-birthday-cake"></i></span>
          <input type="text" v-mask="'##/##/####'" data-rule="required" v-model="form.birthdate" placeholder="Data de nascimento *" />
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.gender), formgroup: true }">
          <span class="icon-case" title="Sexo"><i class="fa fa-transgender"></i></span>
          <select class="form-control" v-model='form.gender' style="max-width:262px">
            <option value="" selected class="firstoption"></option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.login), formgroup: true }" :title="!form.canchangeemail ? 'Cadastro por Facebook' : ''">
          <span class="icon-case" title="E-mail"><i class="fa fa fa-envelope"></i></span>
          <input type="email" data-rule="required" :disabled="!form.canchangeemail" maxlength="100" v-on:keyup="setemailconfirm" v-model="form.login" placeholder="E-mail *" data-errormsg="O e-mail deve ser preenchido."/>
        </div> 
        <div v-bind:class="{ errorinputuser: notsameemail, formgroup: true }" v-if="form.confirmemail">
          <span class="icon-case" title="Confirmar e-mail"><i class="fa fa fa-envelope"></i></span>
          <input type="text" data-rule="required" maxlength="100" v-model="form.login_confirm" placeholder="Confirmar" data-errormsg="O e-mail deve ser preenchido."/>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.pass), formgroup: true }" v-if="form.askforpass">
          <div class="input-group">
            <span class="icon-case" title="Senha"><i class="fa fa fa-lock"></i></span>
            <input :type="inputpasswordtype" data-rule="required" maxlength="30" v-model="form.pass" placeholder="Senha *" data-errormsg="A senha deve ser preenchido."/>
            <span class="input-group-btn ignoreme">
                <span id='eye_hidden' class="fa fa-lg fa-eye-slash" v-if="!form.showpass" @click="form.showpass=true" ></span>
                <span id='eye_show' class="fa fa-lg fa-eye" v-if="form.showpass" @click="form.showpass=false"></span>
            </span>
          </div>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.documenttype), formgroup: true }">
          <span class="icon-case" title="Tipo do documento"><i class="fa fa fa-info"></i></span>
          <select class="form-control" v-model='form.documenttype' style="max-width:262px">
              <option v-for="item in selects.documenttype" :value="item.value" v-bind:key="item.value">
                {{ item.text }}
              </option>
          </select>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.document), formgroup: true }">
          <span class="icon-case" :title="labeldocument"><i class="fa fa fa-id-card"></i></span>
          <input type="text" v-mask="getmask" data-rule="required" v-model="form.document" :placeholder="placeholderdocument+' *'" :data-errormsg="validationdocument"/>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.brazilian_rg), formgroup: true }" v-if="!isforeign">
          <span class="icon-case" title="RG"><i class="fa fa fa-id-card"></i></span>
          <input type="text" maxlength="22" data-rule="required" v-model="form.brazilian_rg" placeholder="Digite seu RG *'" data-errormsg="O RG deve ser preenchido."/>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.phone_ddd || !validateinfo.phone_number), formgroup: true }">
          <span class="icon-case" title="Celular"><i class="fa fa fa-phone"></i></span>
          <input type="text" class="dddinput" data-rule="required" v-model="form.phone_ddd" v-mask="'##'" style="width: 68px;" title="DDD" placeholder="DDD *" data-errormsg="O DDD deve ser preenchido."/>
          <input type="text" data-rule="required" v-model="form.phone_number" v-mask="'#########'" style="width: 195px;" placeholder="Celular *" data-errormsg="O Celular deve ser preenchido."/>
        </div> 
	</div>

	<div class="rightcontact">	
        <div v-bind:class="{ errorinputuser: (!validateinfo.zipcode), formgroup: true }">
          <span class="icon-case" title="CEP"><i class="fa fa-map-marker"></i></span>
          <input type="text" data-rule="required" v-on:keyup="getbyzipcode" v-model="form.zipcode" v-mask="'#####-###'" placeholder="CEP *" data-errormsg="O CEP deve ser preenchido."/>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.city_state), formgroup: true }">
          <span class="icon-case" title="Estado"><i class="fa fa-location-arrow"></i></span>
          <select class="form-control" v-model='form.city_state' style="max-width:262px">
            <option value="" selected></option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espirito Santo</option>
            <option value="EX">Exterior</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.city), formgroup: true }">
          <span class="icon-case" title="Cidade"><i class="fa fa-building"></i></span>
          <input type="text" data-rule="required" maxlength="50" v-model="form.city" placeholder="Cidade *" data-errormsg="A cidade deve ser preenchida."/>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.neighborhood), formgroup: true }">
          <span class="icon-case" title="Bairro"><i class="fa fa-bullseye"></i></span>
          <input type="text" data-rule="required" maxlength="70" v-model="form.neighborhood" placeholder="Bairro *" data-errormsg="O bairro deve ser preenchido."/>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.address), formgroup: true }">
          <span class="icon-case" title="Endereço"><i class="fa fa-home"></i></span>
          <input type="text" data-rule="required" maxlength="150" v-model="form.address" placeholder="Endereço *" data-errormsg="O endereço deve ser preenchido."/>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.address_number), formgroup: true }">
          <span class="icon-case" title="Número do endereço"><i class="fa fa-home"></i></span>
          <input type="text" data-rule="required" maxlength="15" :title="form.address_number" v-model="form.address_number" placeholder="Número do endereço *" data-errormsg="O número do endereço deve ser preenchido."/>
        </div> 
        <div v-bind:class="{ errorinputuser: (!validateinfo.address_more), formgroup: true }">
          <span class="icon-case" title="Complemento do endereço"><i class="fa fa-info"></i></span>
          <input type="text" data-rule="required" maxlength="50" v-model="form.address_more" placeholder="Complemento do endereço" />
        </div> 
        <div class="pretty p-default">
          <input type="checkbox" v-model="form.newsletter" />
          <div class="state p-success">
            <label>Aceito receber propaganda e promoções.</label>
          </div>
        </div>
        <div class="pretty p-default" v-bind:class="{ errorcheckboxuser: (!validateinfo.agree) }">
          <input type="checkbox" v-model="form.agree" />
          <div class="state p-success">
            <label>Concordo com os termos do site.</label>
          </div>
        </div>
	</div>
	</div>
  <button type="button" @click="save" title="Clique para salvar" class="bouton-contact">
    <v-wait for="inprocess">
        <template slot="waiting">
            Aguarde...
        </template>
    </v-wait>
    <span v-if="!processing">Salvar</span>
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
    components: {
        
    },
    computed: {
      getmask() {
        return this.form.documenttype == 0 ? "###.###.###-##" : "";
      },
      notsameemail() {
        return this.form.login != this.form.login_confirm;
      },
      inputpasswordtype() {
        return this.form.showpass ? "text" : "password";
      },
      labeldocument() {
        let ret = "";
        switch (this.form.documenttype) {
          case 0:
          case "0":
            ret = "CPF";
          break;
          default:
            ret = "Número do documento"
          break;
        }

        return ret;
      },
      placeholderdocument() { 
        let ret = "";
        switch (this.form.documenttype) {
          case "0":
          case 0:
            ret = "Digite o CPF";
          break;
          default:
            ret = "Digite o documento"
          break;
        }

        return ret;
      },
      isforeign() {
        return this.form.documenttype != 0 && this.form.documenttype != "0";
      },
      validationdocument() {
        let ret = "";
        switch (this.form.documenttype) {
          case 0:
          case "0":
            ret = "O CPF é obrigatório";
          break;
          default:
            ret = "O documento é obrigatório"
          break;
        }

        return ret;
      }
    },
    mounted() {
      this.populatedocumenttype();
      if (!this.ls_get("fb_connect")) return false;

      let fbinfo = JSON.parse(this.ls_get("fb_connect"));
      this.getFB();
      //var this.ls_get("fb_connect");
    },
    methods: {
      fakeme() {

        this.form.firstname = 'Matt';
        this.form.lastname = 'Murdock';
        this.form.gender = 'M';
        this.form.birthdate = '01/12/1982';
        this.form.document = '39413206457';
        this.form.documenttype = '0';
        this.form.brazilian_rg = '32154847';
        this.form.phone_ddd = '13';
        this.form.phone_number = '996340934';
        this.form.zipcode = '11070061';
        this.getbyzipcode();
        //this.form.city_state = 'SP';
        //this.form.city = '';
        //this.form.neighborhood = '';
        //this.form.address = '';
        this.form.address_number = '125';
        //this.form.address_number_title = '';
        this.form.address_more = 'Ap.66';
        this.form.login = 'email@email.com';
        this.form.login_confirm = 'email@email.com';
        this.form.pass = '123456789';
        //this.form.pass_confirm = '';
        this.form.newsletter = false;
        this.form.agree = true;

      },
      getFB() {
          FB.api('/me', { fields: 'id,name,email' }, user => {
              //console.log(user);
              this.form.firstname = user.name.split(" ").length>0 ? user.name.split(" ")[0]: user.name;
              this.form.lastname = user.name.split(" ").length>0 ? user.name.split(' ').splice(1,user.name.split(' ').length).join(' '): '';
              this.form.login = user.email;
              this.form.login_confirm = user.email;
              this.form.fb = user.id;
              this.form.askforpass = false;
              this.form.canchangeemail = false;
          });
      },
      setemailconfirm() {
        Vue.nextTick().then(response => {
          if (!this.form.canchangeemail)
            return;


          if (this.form.login.length == 0) {
            this.form.confirmemail = false;
          }
          else {
            this.form.confirmemail = true;
          }
        });
      },
      setpassconfirm() {
        Vue.nextTick().then(response => {
          if (this.form.pass.length == 0) {
            this.form.confirmpass = false;
          }
          else {
            this.form.confirmpass = true;
          }
        });
      },
      getbyzipcode() {
        Vue.nextTick().then(response => {
          if (this.form.zipcode.length >= 9) {
            this.showWaitAboveAll();
            externalService.cep(this.form.zipcode).then(
              response => {
                this.hideWaitAboveAll();
                this.form.city_state = response.estado;
                this.form.neighborhood = response.bairro;
                this.form.address = response.logradouro;
                this.form.city = response.cidade;
                this.form.address_number_title = response.complemento;
              },
              error => {
                this.hideWaitAboveAll();
                this.toastError("Não foi possível achar o CEP informado.");
              }
            );      
          }
        });
      },
      validate() {
        this.validateinfo.firstname = true;
        this.validateinfo.lastname = true;
        this.validateinfo.gender = true;
        this.validateinfo.birthdate = true;
        this.validateinfo.document = true;
        this.validateinfo.documenttype = true;
        this.validateinfo.brazilian_rg = true;
        this.validateinfo.phone_ddd = true;
        this.validateinfo.phone_number = true;
        this.validateinfo.zipcode = true;
        this.validateinfo.city_state = true;
        this.validateinfo.city = true;
        this.validateinfo.neighborhood = true;
        this.validateinfo.address = true;
        this.validateinfo.address_number = true;
        this.validateinfo.address_more = true;
        this.validateinfo.login = true;
        this.validateinfo.pass = true;
        this.validateinfo.newsletter = true;
        this.validateinfo.agree = true;

        let ret = true;

        if (this.form.firstname.trim().length ==0) {
          ret = false;
          this.validateinfo.firstname = false;
        }

        if (this.form.lastname.trim().length ==0) {
          ret = false;
          this.validateinfo.lastname = false;
        }

        if (this.form.gender.trim().length ==0) {
          ret = false;
          this.validateinfo.gender = false;
        }

        if (this.form.birthdate.trim().length ==0) {
          ret = false;
          this.validateinfo.birthdate = false;
        }

        if (this.form.document.trim().length ==0) {
          ret = false;
          this.validateinfo.document = false;
        }

        if (this.form.document.trim().length > 0 && !this.isforeign) {
          if (!this.validateCPF(this.form.document)) {
            ret = false;
            this.validateinfo.document = false;
          }
        }

        if (this.form.brazilian_rg.trim().length ==0 && !this.isforeign) {
          ret = false;
          this.validateinfo.brazilian_rg = false;
        }

        if (this.form.phone_ddd.trim().length ==0) {
          ret = false;
          this.validateinfo.phone_ddd = false;
        }

        if (this.form.phone_number.trim().length ==0) {
          ret = false;
          this.validateinfo.phone_number = false;
        }

        if (this.form.zipcode.trim().length ==0) {
          ret = false;
          this.validateinfo.zipcode = false;
        }

        if (this.form.city_state.trim().length ==0) {
          ret = false;
          this.validateinfo.city_state = false;
        }

        if (this.form.city.trim().length ==0) {
          ret = false;
          this.validateinfo.city = false;
        }

        if (this.form.neighborhood.trim().length ==0) {
          ret = false;
          this.validateinfo.neighborhood = false;
        }

        if (this.form.address.trim().length ==0) {
          ret = false;
          this.validateinfo.address = false;
        }

        if (this.form.address_number.trim().length ==0) {
          ret = false;
          this.validateinfo.address_number = false;
        }

        if (this.form.login.trim().length ==0) {
          ret = false;
          this.validateinfo.login = false;
        }

        if (this.form.pass.trim().length == 0 && this.form.fb == '') {
          ret = false;
          this.validateinfo.pass = false;
        }

        if (!this.form.agree) {
          ret = false;
          this.validateinfo.agree = false;
        }

        // console.log(this.validateinfo);

        return ret;
      },
      populatedocumenttype() {
        this.showWaitAboveAll();
        usersiteService.documenttype().then(
          response => {
            this.hideWaitAboveAll();

            if (this.validateJSON(response)) {
              this.selects.documenttype = response;
            }
          },
          error => {
            this.hideWaitAboveAll();
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

        usersiteService.add(this.form.firstname, this.form.lastname, this.form.gender, this.form.birthdate, this.form.document
                            , this.form.documenttype, this.form.brazilian_rg, this.form.phone_ddd, this.form.phone_number, this.form.zipcode
                            , this.form.city_state, this.form.city, this.form.neighborhood, this.form.address, this.form.address_number
                            , this.form.address_more, this.form.login, this.form.pass, this.form.newsletter, this.form.agree, this.form.fb, this.isforeign).then(
            response => {
              this.processing = false;
              this.hideWaitAboveAll();
              this.$wait.end("inprocess");

              if (this.validateJSON(response))
              {
                if (response.success) {
                  this.toastSuccess("Salvo com sucesso.");
                  if (response.dologin) {
                    this.ls_add("client", JSON.stringify({
                      name: response.name,
                      token: response.token,
                      login: response.login,
                    }));
                  }
                  this.$modal.hide('newuser');
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
                firstname: true,
                lastname: true,
                gender: true,
                birthdate: true,
                document: true,
                documenttype: true,
                brazilian_rg: true,
                phone_ddd: true,
                phone_number: true,
                zipcode: true,
                city_state: true,
                city: true,
                neighborhood: true,
                address: true,
                address_number: true,
                address_number_title: true,
                address_more: true,
                login: true,
                login_confirm: true,
                pass: true,
                newsletter: true,
                agree: true,
            },
            form: {
                confirmemail: false,
                askforpass: true,
                showpass: false,
                canchangeemail: true,
                // firstname, lastname, gender, birthdate, document, documenttype, brazilian_rg, phone_ddd, phone_number, zipcode, city_state, city, 
                // neighborhood, address, address_number, address_more, login, pass, newsletter, agree, fb, isforeign
                firstname: '',
                lastname: '',
                gender: '',
                birthdate: '',
                document: '',
                documenttype: 0,
                brazilian_rg: '',
                phone_ddd: '',
                phone_number: '',
                zipcode: '',
                city_state: '',
                city: '',
                neighborhood: '',
                address: '',
                address_number: '',
                address_number_title: '',
                address_more: '',
                login: '',
                login_confirm: '',
                pass: '',
                pass_confirm: '',
                newsletter: false,
                agree: false,
                fb: '',
            },
            facebook: {
                FB: {},
                model: {},
                appId: '1346180728855488'
            },
        }
    }
}
</script>

<style scoped>
.bodynewuser {
  margin: auto;
  background: #eaeaea;  
  font-family: 'Open Sans', sans-serif;
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
