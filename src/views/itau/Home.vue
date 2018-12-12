<template>
  <app-slider></app-slider>
</template>


<script>
// @ is an alias to /src
import Vue from "vue";
import AppSlider from "@/components/itau/App-slider.vue";
import VueGeolocation from "vue-browser-geolocation";
import VueResource from "vue-resource";
import config from "@/config";
import { func } from "@/functions";
import Slick from "vue-slick";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

Vue.use(VueResource);
Vue.use(VueGeolocation);

export default {
  name: "home",
  mixins: [func],
  components: {
    AppSlider
  },
  data() {
    return {};
  },
  mounted() {
    this.getLocation();
  },
  methods: {},
  created() {
     
  }
};
</script>

<style lang="scss">
</style>

