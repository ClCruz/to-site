<template>
<div>
  <eventcompreingressos v-if="template == 'compreingressos'"></eventcompreingressos>
  <eventingressaria v-if="template == 'ingressaria'"></eventingressaria>
  <eventticketHub v-if="template == 'ticketHub'"></eventticketHub>
  <eventticketHubSearchHeader v-if="template == 'ticketHubSearchHeader'"></eventticketHubSearchHeader>
  <eventticketHubVideoBackground v-if="template == 'ticketHubVideo'"></eventticketHubVideoBackground>
  <eventtixsme v-if="template == 'tixsme'"></eventtixsme>
</div>
</template>

<script>
import Vue from 'vue';
import config from '@/config';
import { func } from '@/functions';
import eventcompreingressos from './templates/compreingressos/Event';
import eventingressaria from './templates/ingressaria/Event';
import eventticketHub from './templates/ticketHub/Event';
import eventticketHubSearchHeader from './templates/ticketHubSearchHeader/Event';
import eventticketHubVideoBackground from './templates/ticketHubVideoBackground/Event';
import eventtixsme from './templates/tixsme/Event';


export default {
  name: "event",
  mixins: [func],
  components: { 
    eventcompreingressos
    ,eventingressaria
    ,eventticketHub
    ,eventticketHubSearchHeader
    ,eventticketHubVideoBackground
    ,eventtixsme
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  },
  mounted() {
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
</style>
