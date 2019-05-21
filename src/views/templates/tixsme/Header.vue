<template>
<div>

  <section id="header_home" class="fdb-block p-1 container" style="	background-image: black;padding-bottom: 20px !important" data-block-type="features" data-id="2" draggable="true" >
  <header id="header" class="bg-dark align-items-center container-fluid" data-block-type="headers" data-id="1" style="">
    <div class="container-fluid">
      <nav class="navbar navbar-expand-md no-gutters text-right col-12">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav12" aria-controls="navbarNav12" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

        <div class="collapse navbar-collapse justify-content-center col-md-12" id="navbar-header">
          <div class="row">
            <!-- <img alt="image" class="img-fluid" src="https://www.tixs.me/assets/tixs (1).png" style="height: 50px; "> -->
            <div class="col-3 p-0">
              <img class="header__logo" @click="goto('home')" alt="image" src="/assets/texture/logo-vertical.png">
          </div>
              <ul class="col-6 navbar-nav justify-content-center">
                <!-- <li class="nav-item active">
                  <a class="nav-link nav-link-active" href="">Home <span class="sr-only">(current)</span></a>
                </li> -->
                <li class="nav-item">
                  <span class="nav-link" @click="gotoMenu('genre', 'Teatro')">Teatro</span>
                </li>
                <li class="nav-item">
                  <span class="nav-link" @click="gotoMenu('genre', 'Shows')">Shows</span>
                </li>
                <li class="nav-item">
                  <span class="nav-link" @click="gotoMenu('genre', 'Diversão')">Diversão</span>
                  </li>
                  <li class="nav-item">
        <span v-if="!isLogged" class="nav-link hidden-xs hidden-sm" @click="login" style="float: right; ">Entrar</span>
                  </li>
        <!-- <span v-if="!isLogged" class="header__signin-mobile" @click="login"><img src="" alt=""></span> -->
        <b-dropdown v-if="isLogged" class="m-md-2" id="ddown1" :text="clientName" no-caret :variant="dark">
          <b-dropdown-item @click="goto('legacy:my_account')">Meus pedidos</b-dropdown-item>
          <b-dropdown-item @click="modifyme">Meu cadastro</b-dropdown-item>
          <b-dropdown-item @click="goto('system:logout')">Sair</b-dropdown-item>
        </b-dropdown>
                <!-- <li class="nav-item">
                  <span class="nav-link" @click="gotoMenu">Outros</span>
                </li> -->
              </ul>
              <app-search class="col-3 p-0 w-100"></app-search>
            </div>
          </div>

      </nav>
    </div>
  </header>
  </section>
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
    login() {
      this.$route.matched[0].instances.default.$parent.login();
    },
    modifyme() {
      this.$route.matched[0].instances.default.$parent.modifyme();
    },
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

    gotoMenu(type, item) {
      if (item.notselectable != undefined && item.notselectable == 1) return;

      let where = item.type != undefined ? item.type : type;

      switch (where) {
        case "local":
          this.$router.push("/busca/local/" + item);
          break;
        case "genre":
          this.$router.push("/busca/genero/" + item);
          break;
        case "city":
          this.$router.push("/busca/cidade/" + item);
          break;
        case "state":
          this.$router.push("/busca/estado/" + item);
          break;
        case "event":
          this.$router.push(item.uri);
          break;
        case "search":
          this.$router.push("/busca/evento/" + item)
          break;
      }
    },
    goto(to, item = null) {
      switch (to) {
        case "legacy:my_account":
          this.gotoLegacy(null, "myaccount");
          break;
        case "system:logout":
          this.$store.dispatch('logout');
          break;
        case "home":
          this.$router.push("/");
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
