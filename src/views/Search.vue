<template>
  <div class="a">

    <ticket-hub-search v-if="template == 'ticketHub'"></ticket-hub-search>
    <ticket-hub-search-header-search v-else-if="template == 'ticketHubSearchHeader'"></ticket-hub-search-header-search>
    <ticket-hub-video-background-search v-else-if="template == 'ticketHubVideo'"></ticket-hub-video-background-search>
    <ingressaria-search v-else-if="template == 'ingressaria'"></ingressaria-search>
    <compreingressos-search v-else-if="template == 'compreingressos'"></compreingressos-search>
    <tixsme-search v-else-if="template == 'tixsme'"></tixsme-search>
    
  </div>
</template>

<script>
import Vue from "vue";
import VueHead from 'vue-head';
import Logo from "@/components/App-logo.vue";
import config from "@/config";
import { func } from '@/functions';

import TicketHubSearch from "@/views/templates/ticketHub/Search.vue";
import TicketHubSearchHeaderSearch from "@/views/templates/ticketHubSearchHeader/Search.vue";
import TicketHubVideoBackgroundSearch from "@/views/templates/ticketHubVideoBackground/Search.vue";
import ingressariaSearch from "@/views/templates/ingressaria/Search.vue";
import compreingressosSearch from "@/views/templates/compreingressos/Search.vue";
import tixsmeSearch from "@/views/templates/tixsme/Search.vue";


Vue.use(VueHead);

export default {
  name: "search",
  components: {
    TicketHubSearch,
    TicketHubSearchHeaderSearch,
    TicketHubVideoBackgroundSearch,
    ingressariaSearch,
    compreingressosSearch,
    tixsmeSearch,
  },
  mixins: [func],
  computed: {    
  },
  methods: {
  },
  created() {
  },
  filters: {
  }
};
</script>

<style lang="scss" scoped>

</style>
