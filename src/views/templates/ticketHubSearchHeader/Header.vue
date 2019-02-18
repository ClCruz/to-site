<template>
<div class="a">
  <div class="header">
    <!-- header das paginas (menos evento) -->
    <header class="bg-dark" data-block-type="headers" data-id="2">
      <div class="container">
        <nav class="navbar navbar-expand-md no-gutters">
          <div class="header__logo col-2 text-left">
            <router-link to="/">
              <div class="img"></div>
            </router-link>
          </div>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav12" aria-controls="navbarNav12"
          aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse justify-content-center col-md-8" id="navbarNav12">
            <app-search></app-search>
          </div>

          <ul class="navbar-nav col-2 justify-content-end d-none d-md-flex">
            <span v-if="!isLogged" class="btn   btn-light to-btn hidden-xs hidden-sm" @click="login">Entrar</span>
            <span v-if="!isLogged" class="" @click="login"><img src="" alt=""></span>

            <b-dropdown v-if="isLogged" class="m-md-2" id="ddown1" :text="clientName">
              <b-dropdown-item @click="goto('legacy:my_account')">Minha Conta</b-dropdown-item>
              <b-dropdown-item @click="goto('system:logout')">Sair</b-dropdown-item>
            </b-dropdown>

          </ul>
        </nav>
      </div>
    </header>

  </div>
  <b-navbar class="header__mobile" type="dark" variant="dark">

    <div id="myNavMobile" class="overlay">

      <!-- Overlay content -->
      <div class="overlay-content">
        <b-link href="#" @click="loadSACPage('company','sobre')">
          Sobre a empresa
        </b-link>
        <b-link href="#" @click="loadSACPage('policy','venda')">
          Politica de Venda
        </b-link>
        <b-link href="#" @click="loadSACPage('policy','desconto')">
          Política de Meia Entrada
        </b-link>
        <b-link href="#" @click="loadSACPage('policy','privacidade')">
          Politica de Privacidade
        </b-link>
        <b-link href="#" @click="loadSACPage('partner','sejaParceiro')">
          Seja nosso Parceiro
        </b-link>
      </div>

    </div>
    <div class="col-4 nav__mobile text-right">
      <div id="nav-icon3" class="toggle nav__hamburger" @click="toggleNavMobile()" @keyup.esc="toggleNavMobile()">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="col-4 text-center mx-0 mx-auto">
      <div class="footer__logo text-left">
        <router-link to="/">
          <div class="img"></div>
        </router-link>
      </div>
    </div>
    <div class="col-4">
      <div class="icon"></div>
      <span v-if="!isLogged" class="btn    btn-light to-btn hidden-xs hidden-sm" @click="login">Entrar</span>
      <span v-if="!isLogged" class="" @click="login"><img src="" alt=""></span>
      <b-dropdown v-if="isLogged" class="m-md-2" id="ddown1" :text="clientName" no-caret>
        <template slot="button-content">
          <img src="" alt=""><span class="sr-only">Search</span>
        </template>
        <b-dropdown-item @click="goto('legacy:my_account')">Minha Conta</b-dropdown-item>
        <b-dropdown-item @click="goto('system:logout')">Sair</b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="col-12">
      <app-search></app-search>
    </div>
    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

</div>
</template>

<script>
import Vue from 'vue';
import VueResource from "vue-resource";
import VeeValidate from 'vee-validate';
import config from '@/config';
import {
  func
} from '@/functions';
import {
  authService
} from "@/components/common/services/auth";

import AppSearch from "@/components/App-search.vue";
import $ from "jquery";

export default {
  name: "HeaderTicketHub",
  components: {
    AppSearch
  },
  mixins: [func],
  data: function () {
    return {
      menuOpen: false,
      form: {
        login: null,
        pass: null,
      },
      siteName: config.info.siteName,
    };
  },
  computed: {
    isLogged() {
      if (!this.ls_get("client")) return false;

      let logged = JSON.parse(this.ls_get("client"));
      if (!logged) return false;

      return true;
    },
    clientName() {
      if (!this.ls_get("client")) return "";

      let logged = JSON.parse(this.ls_get("client"));
      if (!logged) return "";

      return logged.name;
    },
    token() {
      if (!this.ls_get("client")) return "";

      let logged = JSON.parse(this.ls_get("client"));
      if (!logged) return "";

      return logged.token;
    },
  },
  mounted() {},
  methods: {
    loadSACPage: function (categoria, pagina) {
      switch (categoria) {
        case "company":
          this.$router.push("/sac/empresa/" + pagina);
          break;
        case "policy":
          this.$router.push("/sac/politica/" + pagina);
          break;
        case "partner":
          this.$router.push("/sac/parceiros/" + pagina);
          break;
      }
    },
    setClient(obj) {
      if (obj.logged) {
        this.ls_add("client", JSON.stringify({
          name: obj.name,
          token: obj.token,
          login: obj.login,
        }));
        this.$parent.idappheader = this.$parent.idappheader + 1;
        this.toastSuccess(`Seja bem vindo ${obj.name}.`);
      } else {
        this.toastError(obj.msg);
      }
    },
    makeLogin() {
      this.$swal.insertQueueStep({
        position: 'center',
        type: 'info',
        allowEscapeKey: false,
        allowOutsideClick: false,
        allowEnterKey: false,
        showConfirmButton: false,
        customClass: 'swal-theme',
        text: 'Efetuando o login.',
      });
      authService.login(this.form.login, this.form.pass).then(
        response => {
          if (this.validateJSON(response)) {
            this.form.login = null;
            this.form.pass = null;
            this.setClient(response);
          }
        },
        error => {
          this.toastError("Falha na execução.");
        }
      );
    },

    goto(to, item = null) {
      switch (to) {
        case "legacy:my_account":
          this.gotoLegacy(null, "myaccount");
          break;
        case "system:logout":
          this.$store.dispatch('logout');
          break;
      }
    },

    login() {
      this.$swal.queue([{
          showCancelButton: false,
          allowEscapeKey: true,
          allowOutsideClick: () => !this.$swal.isLoading(),
          allowEnterKey: false,
          confirmButtonText: 'Continuar',
          position: 'center',
          input: 'email',
          showCloseButton: true,
          customClass: 'swal-theme',
          inputPlaceholder: 'Digite seu e-mail',
          text: 'Já tem cadastro?',
          footer: `<a href="${config.legacy}/comprar/querocadastrar.php">Não tenho conta? Clique aqui.</a>`,
          progressSteps: ['1', '2', '3'],
          preConfirm: (login) => {
            this.form.login = login;
            authService.check(login).then(
              response => {
                if (this.validateJSON(response)) {
                  if (response.exist == 1) {
                    this.$swal.insertQueueStep({
                      position: 'center',
                      allowEscapeKey: true,
                      allowOutsideClick: true,
                      showCloseButton: true,
                      allowEnterKey: true,
                      input: 'password',
                      inputPlaceholder: 'Digite sua senha',
                      footer: `<a href="${config.legacy}/comprar/minha_conta.php">Esqueceu sua senha? Clique aqui.</a>`,
                      inputAttributes: {
                        maxlength: 100,
                        autocapitalize: 'off',
                        autocorrect: 'off'
                      },
                      progressSteps: ['1', '2', '3', '4'],
                      preConfirm: (pass) => {
                        this.form.pass = pass;
                        this.makeLogin();
                      }
                    });
                    this.$swal.clickConfirm();
                  } else {
                    this.$swal.insertQueueStep({
                      position: 'center',
                      type: 'error',
                      showCloseButton: true,
                      allowEscapeKey: true,
                      allowOutsideClick: true,
                      allowEnterKey: true,
                      text: 'E-mail não existe.',
                      progressSteps: ['1', '2', '3'],
                    });
                    this.$swal.clickConfirm();
                  }
                }
              },
              error => {
                this.toastError("Falha na execução.");
              }
            );
          },
        },
        {
          title: 'Verificando',
          position: 'center',
          showConfirmButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          allowEnterKey: false,
          progressSteps: ['1', '2', '3'],
        }
      ]).then((result) => {
        if (result.value) {} else if (result.dismiss === this.$swal.DismissReason.cancel) {

        }
      });
    },
    toggleNav() {
      document.getElementById("myNav").style.width = "0%";
      $(".toggle").removeClass("open");

      if (!this.menuOpen) {
        document.getElementById("myNav").style.width = "100%";
        $(".toggle").addClass("open");
      } else {
        document.getElementById("myNav").style.width = "0%";
        $(".toggle").removeClass("open");
      }
      this.menuOpen = !this.menuOpen;
    },
    toggleNavMobile() {
      document.getElementById("myNavMobile").style.width = "0%";
      $(".toggle").removeClass("open");

      if (!this.menuOpen) {
        document.getElementById("myNavMobile").style.width = "100%";
        $(".toggle").addClass("open");
      } else {
        document.getElementById("myNavMobile").style.width = "0%";
        $(".toggle").removeClass("open");
      }
      this.menuOpen = !this.menuOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
