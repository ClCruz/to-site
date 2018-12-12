<template>
    <div>
        <b-input-group prepend="Usuário">
            <b-form-input v-model="login" @keyup.enter.native="doLogin" maxlength="100"></b-form-input>
            <b-input-group-append>
                <b-input-group prepend="Senha">
                    <b-form-input @keyup.enter.native="doLogin" v-model="password" :type="passwordType"  maxlength="50"></b-form-input>
                </b-input-group>
            <b-btn variant="success" @click="doLogin">
                <v-wait for="inprocess">
                    <template slot="waiting">
                        Entrando...
                    </template>
                </v-wait>
                <span v-if="!processing">Entrar</span>
            </b-btn>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
import Vue from "vue";
import VueResource from "vue-resource";
import config from "@/config";
import { func } from "@/functions";
import { authTicketOffice } from "../../components/ticketoffice/services/auth";

export default {
  mixins: [func],
  data() {
    return {
      processing: false,
      login: null,
      password: null,
      showPassword: false
    };
  },
  methods: {
    doLogin() {
      if (this.processing) return;

      if (!this.login || !this.password) {
        this.toastError("Preencha os campos corretamente.");
        return;
      }

      this.processing = true;
      this.$wait.start("inprocess");
      authTicketOffice.login(this.login, this.password).then(
        response => {
          if (this.validateJSON(response)) {
            if (response.logged) {
              this.toastSuccess("Login efetuado com sucesso.");
              this.$store.dispatch("login", response);
              this.login = "";
              this.password = "";
              this.$parent.logged();
              this.$router.push("/ticketoffice");
            } else {
              this.toastError(response.msg);
            }
          }
          //console.log(JSON.stringify(response));
          this.processing = false;
          this.$wait.end("inprocess");
        },
        error => {
          //console.log(JSON.stringify(response));
          this.processing = false;
          this.$wait.end("inprocess");
          this.toastError("Falha na execução.");
        }
      );
    }
  },
  computed: {
    passwordType: function() {
      if (this.showPassword) {
        return "text";
      } else {
        return "password";
      }
    }
  }
};
</script>

<style>
</style>
