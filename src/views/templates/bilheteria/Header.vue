<template>
  <div class="a" :class="{ eventHeader: ['event'].indexOf($route.name) > -1 }">
    <div class="header">
      <!-- header das paginas (menos evento) -->
      <header id="navbar" class="bg-dark" data-block-type="headers" data-id="2">
        <div class="container">
          <nav class="navbar navbar-expand-md no-gutters">
            <div class="header__logo col-2 text-left">
              <router-link to="/">
                <div class="img"></div>
              </router-link>
            </div>

            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav12"
              aria-controls="navbarNav12"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse col-md-8 light">
              <div class="nav__links navbar-nav ml-auto">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/sac/empresa/sobre">Ajuda</router-link>
                  </li>
                </ul>
              </div>
              <app-search class="header__search"></app-search>
            </div>

            <ul class="navbar-nav col-2 justify-content-end d-none d-md-flex">
              <span
                v-if="!isLogged "
                class="btn btn-light to-btn hidden-xs hidden-sm"
                style="color: black"
                @click="login"
              >Entrar</span>
              <span v-if="!isLogged" class="header__signin-mobile" @click="login">
                <img src alt />
              </span>

              <b-dropdown v-if="isLogged" class="m-md-2" id="ddown1" :text="clientName">
                <b-dropdown-item @click="goto('legacy:my_account')">Meus pedidos</b-dropdown-item>
                <b-dropdown-item @click="modifyme">Meu cadastro</b-dropdown-item>
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
          <b-link href="#" @click="loadSACPage('company','sobre')">Sobre a empresa</b-link>
          <b-link href="#" @click="loadSACPage('policy','venda')">Politica de Venda</b-link>
          <b-link href="#" @click="loadSACPage('policy','desconto')">Política de Meia Entrada</b-link>
          <b-link href="#" @click="loadSACPage('policy','privacidade')">Politica de Privacidade</b-link>
          <b-link href="#" @click="loadSACPage('partner','sejaParceiro')">Seja nosso Parceiro</b-link>
        </div>
      </div>
      <div class="col-4 nav__mobile">
        <div
          id="nav-icon3"
          class="toggle nav__hamburger"
          @click="toggleNavMobile()"
          @keyup.esc="toggleNavMobile()"
        >
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
        <span
          v-if="!isLogged"
          class="btn btn-light to-btn hidden-xs hidden-sm"
          @click="login"
        >Entrar</span>
        <span v-if="!isLogged" class="header__signin-mobile" @click="login">
          <img src alt />
        </span>
        <b-dropdown v-if="isLogged" class="m-md-2" id="ddown1" :text="clientName" no-caret>
          <template slot="button-content">
            <img src alt />
            <span class="sr-only">Search</span>
          </template>
          <b-dropdown-item @click="goto('legacy:my_account')">Meus pedidos</b-dropdown-item>
          <b-dropdown-item @click="modifyme">Meu cadastro</b-dropdown-item>
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

    <!-- teste -->

    <!-- <b-modal
      v-if="!isLogged "
      ref="modalCadastro"
      size="sm"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-header
      hide-footer
    >
      <div class="d-block text-center">
        <p style="font-size: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <strong>Bem-vindo ao novo site corporativo dos parceiros Bilheteria.com!</strong>
        </p>
        <p>Para acessar os produtos com descontos exclusivos é necessário fazer login com sua conta clicando em "Entrar". Caso não tenha uma conta cadastrada, clique em "Entrar" e em "Cadastre-se". Se for necessário refazer sua conta clique em "Entrar" e em seguida "Esqueceu sua senha?".</p>
        <h4>Equipe Bilheteria.com!</h4>
        <b-button
          @click="login"
          style="background: #ff9000; border: none; border-radius: 100px; width: 150px"
        >
          <strong>Entrar</strong>
        </b-button>
      </div>
    </b-modal>-->

    <!-- teste -->
  </div>
</template>

<script>
import Vue from "vue";
import VueResource from "vue-resource";
import VeeValidate from "vee-validate";
import config from "@/config";
import { func } from "@/functions";

import AppSearch from "@/components/App-search.vue";
import CityListHeader from "@/components/City-list-header.vue";
import $ from "jquery";

export default {
  name: "HeaderTicketHub",
  components: {
    AppSearch,
    CityListHeader
  },
  mixins: [func],
  data: function() {
    return {
      menuOpen: false,
      form: {
        login: null,
        pass: null
      },
      siteName: config.info.siteName
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
    }
  },
  mounted() {
    // this.showModal();
  },

  methods: {
    // showModal() {
    //   let logged = JSON.parse(this.ls_get("client"));
    //   if (logged) return true;
    //   this.$refs["modalCadastro"].show();
    // },

    login() {
      this.$route.matched[0].instances.default.$parent.login();
      // this.$refs["modalCadastro"].hide();
    },
    modifyme() {
      this.$route.matched[0].instances.default.$parent.modifyme();
    },
    loadSACPage: function(categoria, pagina) {
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
    goto(to, item = null) {
      switch (to) {
        case "legacy:my_account":
          this.gotoLegacy(null, "myaccount");
          break;
        case "system:logout":
          this.$store.dispatch("logout");
          break;
      }
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
