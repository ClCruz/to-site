<template>
    <!-- tixs.me -->
    <app-slider v-if="!isNewTemplate"></app-slider>
    <!-- Template 2 -->
    <ticket-hub-events v-else-if="!isNewTemplate"></ticket-hub-events>
    <!-- Template 3 (Fred) -->
    <ticket-hub-video-background v-else></ticket-hub-video-background>
    <!-- Template 4 (Header com busca) -->
</template>


<script>
// @ is an alias to /src
import Vue from "vue";
import VueHead from 'vue-head';
import AppSlider from "@/components/App-slider.vue";
import TicketHubEvents from "@/views/templates/ticketHub/Events.vue";
import TicketHubVideoBackground from "@/views/templates/ticketHubVideoBackground/Events.vue";
import VueGeolocation from "vue-browser-geolocation";
import VueResource from "vue-resource";
import config from "@/config";
import { func } from "@/functions";
import Slick from "vue-slick";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(VueHead);
Vue.use(VueResource);
Vue.use(VueGeolocation);

export default {
  name: "home",
  mixins: [func],
  components: {
    AppSlider,
    TicketHubEvents,
    TicketHubVideoBackground
  },
  head: {
    title: function () {
      return { 
        inner: ``,
        separator: "",
        complement: config.info.title,
      }
    },
    meta: function () { 
      return [
        { name: 'application-name', id: 'application-name', content: this.metaObj.appName },
        { name: 'description', id: 'description', content: this.metaObj.description },
        { name: 'keywords', id: 'keywords', content: this.metaObj.keywords },
        { itemprop: 'name', id: 'name', content: this.metaObj.name },
        { itemprop: 'description', id: 'itempropdescription', content: this.metaObj.description },
        { name: 'twitter:card', id: 'twitter_card', content: this.metaObj.twitter.card },
        { name: 'twitter:title', id: 'twitter_title', content: this.metaObj.twitter.title },
        { name: 'twitter:description', id: 'twitter_description', content: this.metaObj.twitter.description },
        { name: 'twitter:image', id: 'twitter_image', content: this.metaObj.twitter.image.root },
        { name: 'twitter:image:alt', id: 'twitter_imagealt', content: this.metaObj.twitter.image.alt },
        { property: 'og:title', id: 'og_title', content: this.metaObj.og.title },
        { property: 'og:type', id: 'og_type', content: this.metaObj.og.type },
        { property: 'og:url', id: 'og_url', content: this.metaObj.og.url },
        { property: 'og:description', id: 'og_description', content: this.metaObj.og.description },
        { property: 'og:site_name', id: 'og_site_name', content: this.metaObj.og.site_name },
        { property: 'og:image', id: 'og_image', content: this.metaObj.og.image.root },
        { property: 'og:image:secure_url', id: 'og_image_secure_url', content: this.metaObj.og.image.secure_url },
        { property: 'og:image:type', id: 'og_image_type', content: this.metaObj.og.image.type },
        { property: 'og:image:alt', id: 'og_image_alt', content: this.metaObj.og.image.alt },
      ]
    },
    link: function () {
      return [ 
        { rel: 'icon', href: `${config.info.favicoPath}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
        { rel: 'icon', href: `${config.info.favicoPath}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
       ]
    }
  },
  data() {
    return { 
      itau: false,
      metaObj: this.metatag_getObj(),
    };
  },
  mounted() {
    this.createMetaObj();
    this.getLocation();
  },
  computed: {
  },
  methods: {
    createMetaObj() {
        this.metaObj.appName = config.info.siteName;
        this.metaObj.description = config.info.meta_description;
        this.metaObj.keywords = config.info.meta_keywords;
        this.metaObj.name = config.info.siteName;
        this.metaObj.twitter.card = 'summary_large_image';
        this.metaObj.twitter.title = config.info.siteName;
        this.metaObj.twitter.description = config.info.meta_description;
        this.metaObj.twitter.image.root = config.info.logo;
        this.metaObj.twitter.image.alt = config.info.siteName;
        this.metaObj.og.title = config.info.siteName;
        this.metaObj.og.type = 'website';
        this.metaObj.og.url = config.host;
        this.metaObj.og.description = config.info.meta_description;
        this.metaObj.og.site_name = config.info.siteName;
        this.metaObj.og.image.root = config.info.logo;
        this.metaObj.og.image.secure_url = config.info.logo;
        this.metaObj.og.image.type = 'image/jpeg';
        this.metaObj.og.image.alt = config.info.siteName;
        this.$emit('updateHead');

    }
  },
  created() {
  }
};
</script>


<style lang="scss">
  body {
    max-height: none!important;
    overflow: unset!important;
  }
</style>

