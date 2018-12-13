<template>
<div class="container-fluid" v-if="!isNewTemplate">
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
<div v-else>
  <header-ticket-hub></header-ticket-hub>
  <transition name="component-fade" mode="out-in">
    <router-view :key="$route.fullPath"></router-view>
  </transition>
  <footer-ticket-hub></footer-ticket-hub>
</div>
</template>

<script>
import AppHeader from "@/components/App-header";
import AppFooter from "@/components/App-footer";
import HeaderTicketHub from "@/views/templates/ticketHub/Header"
import FooterTicketHub from "@/views/templates/ticketHub/Footer"
import { func } from '@/functions';
import config from '@/config';

export default {
  name: "DefaultLayout",
  mixins: [func],
  data() {
    return {
      itau: false,
      idappheader: 1,
    }
  },
  components: {
    AppHeader,
    AppFooter,
    HeaderTicketHub,
    FooterTicketHub
  },
  methods: {
  },
  created() {
    if (this.queryString("logout")) {
      this.$store.dispatch('logout');
    }
    if (this.queryString("new")) {
      this.toastSuccess("Seu cadastro foi realizado com sucesso.");
    }
  },
  computed: {
    isTicketOffice() {
      return this.$route.path.startsWith("/ticketoffice");
    },
    isItau() {
      return this.$route.path === '/itau';
    }
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
</style>
