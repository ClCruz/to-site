<template>
<div>

  <section id="header_home" class="fdb-block p-5 container" style="" data-block-type="features" data-id="2" draggable="true">
    <div class="container">
      <div class="row text-lg-right align-items-center">
        <div class="col-12 col-sm-12 order-1 order-sm-3 order-md-3 order-lg-1 col-lg-5 text-left pt-sm-0">
          <div class="row" id="share">
            <span style="" class="social-text">Rede Social</span>
            <!-- facebook -->
            <a class="facebook" target="blank"><i class="fab fa-facebook-f"></i></a>

            <!-- twitter -->
            <a class="twitter" target="blank"><i class="fab fa-twitter"></i></a>

            <!-- linkedin -->
            <!-- <a class="linkedin" :href="linkLinkedin" target="blank"><i class="fab fa-linkedin-in"></i></a> -->

            <!-- pinterest -->
            <a class="pinterest" target="blank"><i class="fab fa-pinterest-p"></i></a>

          </div>
        </div>
        <div class="col-5 col-sm-12 col-md-3 order-2 order-sm-2 order-md-2 order-lg-2 col-lg-2 m-auto pt-lg-0 text-center">
          <img alt="image" class="img-fluid col-12 col-md-12" src="https://www.tixs.me/assets/tixs (1).png">
        </div>

          <div class="col-12 order-3 order-md-1 order-lg-3 order-sm-0 mt-md-2 mt-sm-2 pb-md-4 pt-md-0 pb-sm-4 col-sm-12 mt-sm-2 col-lg-5">
            <app-search></app-search>
          </div>

        </div>
      </div>
  </section>
  <header id="header" class="bg-dark align-items-center container" data-block-type="headers" data-id="1" style="padding: 10px">
    <div class="container">
      <nav class="navbar navbar-expand-md no-gutters text-right col-12">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav12" aria-controls="navbarNav12" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

        <div class="collapse navbar-collapse justify-content-center col-md-12" id="navbarNav12">
          <!-- <img alt="image" class="img-fluid" src="https://www.tixs.me/assets/tixs (1).png" style="height: 50px; "> -->
          <ul class="navbar-nav justify-content-center">
            <li class="nav-item active">
              <a class="nav-link" href="">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Teatro</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Música</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Diversão</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Outros</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
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
