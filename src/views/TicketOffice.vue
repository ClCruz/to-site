<template>
  <div class="home">
    <v-wait for="loadingAboveAll">
        <template slot="waiting">
            <div id="aboveAll">
            </div>
            <div class="bar_loading">
              <div class="circle_loading"></div>
              <p class="p_loading">Aguarde...</p>
            </div>
        </template>
    </v-wait>
    <app-header :key="idHeader" class="container"></app-header>
    <router-view name="routerView_ticketoffice" :key="$route.fullPath" class="container"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import VueHead from 'vue-head';
import VueResource from "vue-resource";
import header from "../components/ticketoffice/Header.vue";
import config from "@/config";
import { func } from "@/functions";
import { funcOperation } from '../components/ticketoffice/services/functions';
import { mapMutations } from "vuex";

Vue.use(VueHead);
Vue.use(VueResource);

export default {
  name: "ticketoffice",
  mixins: [func, funcOperation],
  components: {
    appHeader: header
    //    HelloWorld
  },
  head: {
    title: function () {
      return { 
        inner: ``,
        separator: "",
        complement: "TicketOffice",
      }
    },
  },
  data() {
    return {
      idHeader:0,
      bases: []
    };
  },
  created() {
    this.tryLoginTicketOffice(this.reloadHeader);
    if (this.$store.getters.isAuthenticated)
      this.logged();
    this.reloadHeader();

    if (!this.isPurchasePages())
    {
      this.clearPurchase(true);
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  mounted() {
  },
  methods: {
    reloadHeader() {
      this.idHeader++;
    },
    logged() {
      this.idHeader++;      
    }
    //...mapMutations(['storeUser' ])
  }
};
</script>
<style>
  #aboveAll {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index:6000;
      background-color: rgb(0, 0, 0, 0.5)
  }
</style>
