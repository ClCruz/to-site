<template>
<div class="container-fluid" v-if="template == 'tixs'">
  <section class="main main__itau" v-if="$route.path.includes('/itau')">
    <app-header :key="idappheader" v-if="!isTicketOffice"></app-header>
    <div style="">
      <transition name="component-fade" mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
      </transition>
    </div>

  </section>
  <section class="main main__tixsme" :style='{ vItau: itau }' v-else>
    <v-wait for="loadingAboveAll" v-if="!isTicketOffice">
        <template slot="waiting">
            <div id="aboveAll">
              <!-- <img src="../assets/loading.gif" alt=""> -->
            </div>
        </template>
    </v-wait>
    <app-header :key="idappheader" v-if="!isTicketOffice"></app-header>
    <div style="">
      <transition name="component-fade" mode="out-in">
        <router-view :key="$route.path"></router-view>
      </transition>
    </div>

  </section>
  <app-footer></app-footer>

</div>
<div v-else-if="template == 'ticketHub'">
  <div class="blankme" v-if="blankme"></div>
  <header-ticket-hub :key="idappheader"></header-ticket-hub>
  <transition name="component-fade" mode="out-in">
    <router-view ref="rvroot" :key="$route.fullPath"></router-view>
  </transition>
  <footer-ticket-hub></footer-ticket-hub>
</div>
<div v-else-if="template == 'ticketHubVideo'">
  <div class="blankme" v-if="blankme"></div>
  <header-ticket-hub-video-background :key="idappheader"></header-ticket-hub-video-background>
  <transition name="component-fade" mode="out-in">
    <router-view ref="rvroot" :key="$route.fullPath"></router-view>
  </transition>
  <footer-ticket-hub-video-background></footer-ticket-hub-video-background>
</div>
<div v-else>
  <div class="blankme" v-if="blankme"></div>
  <header-ticket-hub-search-header :key="idappheader"></header-ticket-hub-search-header>
  <transition name="component-fade" mode="out-in">
    <router-view ref="rvroot" :key="$route.fullPath"></router-view>
  </transition>
  <footer-ticket-hub-search-header></footer-ticket-hub-search-header>
</div>
</template>

<script>
import Vue from "vue";
import AppHeader from "@/components/App-header";
import AppFooter from "@/components/App-footer";
import HeaderTicketHub from "@/views/templates/ticketHub/Header"
import FooterTicketHub from "@/views/templates/ticketHub/Footer"
import HeaderTicketHubSearchHeader from "@/views/templates/ticketHubSearchHeader/Header"
import FooterTicketHubSearchHeader from "@/views/templates/ticketHubSearchHeader/Footer"
import HeaderTicketHubVideoBackground from "@/views/templates/ticketHubVideoBackground/Header"
import FooterTicketHubVideoBackground from "@/views/templates/ticketHubVideoBackground/Footer"
import { func } from '@/functions';
import config from '@/config';

import VModal from 'vue-js-modal';

import appresetpass from "@/components/App-resetpass.vue";
import applogin from "@/components/App-login.vue";
import appnewuser from "@/components/App-newuser.vue";

Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true
});

export default {
  name: "DefaultLayout",
  mixins: [func],
  data() {
    return {
      itau: false,
      blankme: false,
      idappheader: 1,
      gotoafterlogin: 'none',
      modals: {
        login: {
          name: 'login',
        },
        add: {
          name: 'newuser'
        }
      },
    }
  },
  components: {
    AppHeader,
    AppFooter,
    HeaderTicketHub,
    FooterTicketHub,
    HeaderTicketHubSearchHeader,
    FooterTicketHubSearchHeader,
    HeaderTicketHubVideoBackground,
    FooterTicketHubVideoBackground
  },
  methods: {
    modalloginclosed() {
      if (this.ls_get("fb_connect") != "" && this.ls_get("fb_connect") != undefined && this.ls_get("fb_connect") != null) {
        let obj = JSON.parse(this.ls_get("fb_connect"));
        if (!obj.logged) {
          //alert("id: " + obj.id);
          this.adduser();
        }
        return;
      }

      if (this.ls_get("add_user") != "" && this.ls_get("add_user") != undefined && this.ls_get("add_user") != null) {
        this.ls_remove("add_user");
        this.adduser();
        return;
      }

      this.idappheader = this.idappheader + 1;

      switch (this.gotoafterlogin) {
          case "cardafter":
            this.blankme=true;
            this.gotoLegacy(null,'cardnow');
          break;
      }
    },
    modalnewuserclosed() {
      this.idappheader = this.idappheader + 1;

      Vue.nextTick().then(response => {
        if (!this.isLogged()) {
          this.login();
          return;
        }
        switch (this.gotoafterlogin) {
            case "cardafter":
              this.blankme=true;
              this.gotoLegacy(null,'cardnow');
            break;
        }
      });
    },
    modal_close_login() {
      console.log("modal_close_login");
      this.$modal.hide(this.modals.login.name);
    }, 
    //this.$parent.$refs.rvroot.modal_close_newuser();
    //this.$parent.$refs.rvroot.modal_close_login();
    modal_close_newuser() {
      console.log("modal_close_newuser");
      this.$modal.hide(this.modals.add.name);
    },
    adduser() {
      let clickToClose = true;
      if (this.isLogged()) return;

      switch (this.gotoafterlogin) {
          case "cardafter":
            clickToClose = false;
            this.modals.add.name = "newuser_ns";
          break;
      }

      this.$modal.show(appnewuser, { }, 
        {
          draggable: false,
          name: this.modals.add.name,//'newuser',
          classes: 'addusermodal',
          resizable: false,
          width: 800,
          adaptive: false,
          height: "auto",
          scrollable: true,
          clickToClose: clickToClose,
        },
        {
          'closed': this.modalnewuserclosed,
        }
      );
    },
    login() {
      let clickToClose = true;
      this.modals.login.name = "login";
      switch (this.gotoafterlogin) {
          case "cardafter":
            clickToClose = false;
            this.modals.login.name = "login_ns";
          break;
      }

      if (this.isLogged()) {
        switch (this.gotoafterlogin) {
            case "cardafter":
              this.gotoLegacy(null,'cardnow');
              clickToClose = false;
            break;
        }
        return;
      }
      this.$modal.show(applogin, { }, 
        {
          draggable: false,
          name: this.modals.login.name,//'login',
          resizable: true,
          adaptive: true,
          height: "auto",
          scrollable: true,
          classes: '',
          clickToClose: clickToClose,
        },
        {
          'closed': this.modalloginclosed,
        }
      );
    },
    modalresetpassclosed() {
      window.location = "/";
    },
    openresetpass() {
      this.$modal.show(appresetpass, { code: window.location.pathname.replace("/resetpass/","") }, 
        {
          draggable: false,
          name: 'resetpass',
          classes: 'resetpass',
          resizable: false,
          width: 400,
          adaptive: false,
          height: "auto",
          scrollable: true,
        },
        {
          'closed': this.modalresetpassclosed,
        }
      );
    },
    checkroute() {
      switch (window.location.pathname) {
        case "/dologin":
          this.login();
        break;
        case "/loginandshopping/cardafter":
          this.gotoafterlogin = "cardafter";
          this.login();
        break;
        case "/createaccount":
          this.adduser();
        break;
        default:
          if (window.location.pathname.startsWith("/resetpass/")) {
            this.openresetpass();
          }
        break;
      }
    },
    isLogged() {
      if (!this.ls_get("client")) return false;

      let logged = JSON.parse(this.ls_get("client"));
      if (!logged) return false;

      return true;
    }
  },
  mounted() {
    this.checkroute();
  },
  created() {
    console.log(this.template);
    if (this.queryString("logout")) {
      this.$store.dispatch('logout');
    }
    if (this.queryString("new")) {
      this.toastSuccess("Seu cadastro foi realizado com sucesso.");
    }
  },
  computed: {
    isItau() {
      return this.$route.path === '/itau';
    },
  },
  watch: {
    '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
};
</script>

<style lang="scss">
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
<style>
  #aboveAll {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index:6000;
  }
  .blankme {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index:5999;
      background: white;
  }
  .v--modal-overlay[data-modal="login_ns"] {
    background: white;
  }
  .v--modal-overlay[data-modal="newuser_ns"] {
    background: white;
  }
  

</style>
