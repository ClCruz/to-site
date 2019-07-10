<template>
<div>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <section class="to-block bg__ingressaria to-block-mobile" style="">
            <div class="container">
              <div class="row pb-5 pt-0 mt-0">
              </div>
              <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-12 col-md-12 col-lg-8 text-center">
                  <div>
                    <h1 class="title mb-2 mt-0">{{this.venue.ds_local_evento}}</h1>
                    <p class="mt-3 pb-0 lead">{{this.venue.ds_googlemaps}}</p>
                    <p class="mt-3 pb-4 pt-0 lead">{{this.venue.ds_municipio}} - {{this.venue.sg_estado}} - {{this.venue.ds_estado}}</p>

                    <a v-if="this.venue.url!=''" :href="this.venue.url" class="btn to-btn dark" style="background: #ca1835 !important; border: none !important; font-weight: bold"><i class="fa fa-sm mr-2 fa-running"></i>Site do teatro</a>

                    <h3 class="mt-3 pb-4"></h3>
                    <div class="row">
                      <div class="col-6">
                        <p class="lead mt-0 pt-0">
                          <span class="event__description mt-0 p-0 text-left mt-2 pt-2">
                            Bilheteria:
                            <br>
                            {{this.venue.ticketbox_info}}
                        </span>
                        </p>
                      </div>
                      <div class="col-6">
                        <p class="lead mt-0 pt-0">
                          <span class="event__description mt-0 p-0 text-left mt-2 pt-2">
                          Lotação: 
                          <br>
                          {{this.venue.occupation_info}}
                        </span>
                        </p>
                      </div>
                    </div>

                    <h3 class="mt-3 pb-4">Espetáculos em cartaz</h3>


                  </div>
                  <div class="row">
                    <div v-if="this.venue.events.length == 0">
                    <p>Nenhum espetáculo encontrado</p></div>
                    <div class="col-12 col-xl-4 col-md-4 p-2 text-left" v-for="(item, index) in this.venue.events" :key='index' :item="item">
                      <div class="to-box p-0" style="height: 260px;" @click="goto('event', item)">
                        <div class="img-fluid rounded-0" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }" style="background-size: cover ; background-position: center!important;height: 130px !important;">
                        </div>

                        <div class="content to-box p-2 pt-0 pb-1" style="position: relative; border-top-left-radius: 0 !important; border-top-right-radius: 0 !important;">
                          <h4 class="event__title pb-1">
                            <strong>{{ item.ds_evento |  truncate(35, ' ...') }}</strong>
                          </h4>

                          <p class="p-0 m-0 event__item event__item-date">
                            <span class="bold">{{item.datas |  replace('-', 'á')}} </span>
                            <span class="ml-1 mr-2" v-if="item.showPartnerInfo == 1">-</span>
                            <span class="" v-if="item.showPartnerInfo == 1"><i class="far fa-handshake" style="padding-right: 6px;"></i>{{item.partner}}</span>
                          </p>
                          <p class="p-0 pt-1 m-0 h-200 event__item event__item-local"><span class="bold" style="text-transform: capitalize !important">{{ item.ds_nome_teatro | capitalize() }} - {{ item.ds_municipio | capitalize() }},</span> {{ item.sg_estado }} </p>

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 pb-1 text-left mt-4">

                  <h3 style="font-size: 17px" class="result__container mb-1">Outros eventos na sua região:
                  </h3>
                </div>
              </div>
              <div class="row">
                <card-recommended v-for="(item, index) in slideData.slice(0,9)" :key='index' :item="item"></card-recommended>
              </div>
            </div>
          </section>
        </div>

        <!-- <div class="col-3">
          a
        </div> -->

      </div>
    </div>

  </div>
</div>
</template>

<script>
import Vue from 'vue';
import VueResource from "vue-resource";
import VueHead from 'vue-head';
import config from '@/config';
import {
  func
} from '@/functions';
import $ from "jquery";
import EventTimeLoader from '@/components/loaders/EventTimeLoader.vue';
import EventTitleLoader from '@/components/loaders/EventTitleLoader.vue';
import EventRoomLoader from '@/components/loaders/EventRoomLoader.vue';
import LineLoader from '@/components/loaders/LineLoader.vue';
import EventImageLoader from '@/components/loaders/EventImageLoader.vue';
import EventImageIngressariaLoader from '@/components/loaders/EventImageIngressariaLoader.vue';
import AppSearch from "@/components/App-search.vue";

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import CardRecommended from "@/components/Card-recommended.vue";

import {
  eventService
} from "@/components/common/services/event";
import {
  venueService
} from "@/components/common/services/venue";
import CardEvent from "@/components/Card-event.vue";

Vue.use(VueHead);

export default {
  name: "event",
  mixins: [func],
  components: {
    EventTimeLoader,
    EventTitleLoader,
    EventRoomLoader,
    EventImageLoader,
    EventImageIngressariaLoader,
    LineLoader,
    AppSearch,
    CardEvent,
    CardRecommended

  },
  head: {
    title: function () {
      return {
        inner: (this.venue.loaded == true ? `${this.venue.ds_local_evento} - ${this.venue.ds_municipio}/${this.venue.sg_estado}` : "Carregando..."),
        separator: " ",
        complement: " ",
      }
    },
    meta: function () {
      return [{
          name: 'application-name',
          id: 'application-name',
          content: this.metaObj.appName
        },
        {
          name: 'description',
          id: 'description',
          content: this.metaObj.description
        },
        {
          name: 'keywords',
          id: 'keywords',
          content: this.metaObj.keywords
        },
        {
          itemprop: 'name',
          id: 'name',
          content: this.metaObj.name
        },
        {
          itemprop: 'description',
          id: 'itempropdescription',
          content: this.metaObj.description
        },
        {
          name: 'twitter:card',
          id: 'twitter_card',
          content: this.metaObj.twitter.card
        },
        {
          name: 'twitter:title',
          id: 'twitter_title',
          content: this.metaObj.twitter.title
        },
        {
          name: 'twitter:description',
          id: 'twitter_description',
          content: this.metaObj.twitter.description
        },
        {
          name: 'twitter:image',
          id: 'twitter_image',
          content: this.metaObj.twitter.image.root
        },
        {
          name: 'twitter:image:alt',
          id: 'twitter_imagealt',
          content: this.metaObj.twitter.image.alt
        },
        {
          property: 'og:title',
          id: 'og_title',
          content: this.metaObj.og.title
        },
        {
          property: 'og:type',
          id: 'og_type',
          content: this.metaObj.og.type
        },
        {
          property: 'og:url',
          id: 'og_url',
          content: this.metaObj.og.url
        },
        {
          property: 'og:description',
          id: 'og_description',
          content: this.metaObj.og.description
        },
        {
          property: 'og:site_name',
          id: 'og_site_name',
          content: this.metaObj.og.site_name
        },
        {
          property: 'og:image',
          id: 'og_image',
          content: this.metaObj.og.image.root
        },
        {
          property: 'og:image:secure_url',
          id: 'og_image_secure_url',
          content: this.metaObj.og.image.secure_url
        },
        {
          property: 'og:image:type',
          id: 'og_image_type',
          content: this.metaObj.og.image.type
        },
        {
          property: 'og:image:alt',
          id: 'og_image_alt',
          content: this.metaObj.og.image.alt
        },
      ]
    },

  },

  data() {
    return {
      siteName: config.info.siteName,
      metaObj: this.metatag_getObj(),
      venue: {
        loaded: false,
        id: '',
        ds_local_evento: '',
        id_tipo_local: null,
        id_municipio: null,
        ds_googlemaps: null,
        ds_municipio: null,
        url: null,
        sg_estado: null,
        ds_estado: null,
        ds_tipo_local: null,
        ticketbox_info: null,
        occupation_info: null,
        meta_description: null,
        meta_keywords: null,
        events: []
      },
      event: {
        loaded: false,
        NomPeca: null,
        CodPeca: null,
        TipPeca: null,
        CenPeca: null,
        ds_local_evento: null,
        id_base: null,
        address: null,
        valores: null,
        description: '',
        img: null,
        badge: [],
        promo: [],
        city: null,
        state: null,
        cityBadgeText: null,
        dates: '',
      },
      slideData: []

    }
  },
  created() {
    // console.log('oi');
    this.getVenue();
  },
  methods: {

    getListResultAgain() {
      eventService.list(this.venue.city, this.locale.state.name).then(
        response => {
          this.slideData = response.filter(x => x.id_genre !== undefined && x.id_genre !== null);
          this.hideWaitAboveAll();
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
    getListResults(callback) {

      this.getLocation(this.getListResultAgain);

      // console.log(this.venue.city);
      eventService.list(this.venue.city, this.venue.state).then(
        response => {
          // console.log(this.venue.ds_evento);
          this.slideData = response.filter(x => x.id_genre !== undefined && x.id_genre !== null && x.ds_evento !== this.venue.NomPeca);

          this.hideWaitAboveAll();
          this.isLoaded = true;

          if (callback !== null && callback !== undefined) {
            callback();
          }
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
    goto(type, item) {
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
        case "discovery":
          window.location.href = item;
          break;
      }
    },
    prepareNameForVenue(name) {
      let split = name.replace('c', '_');

      split = split.split("-");
      let tosearch = "";
      let stringToSearch = "";
      for (var i = 0; i < split.length; i++) {
        if (i == split.length - 1) {
          tosearch += split[i]
        } else if (i > 0) {
          tosearch += split[i] + "_";
        }
      }

      return tosearch;
    },
    getVenue() {

      this.showWaitAboveAll();
      this.processing = true;
      let isCI = false;
      let venueName = this.prepareNameForVenue(this.key);

      venueService.get(venueName).then(
        response => {

          this.hideWaitAboveAll();
          this.processing = false;

          if (response.error) {
            this.toastError(response.msg);
          }
          if (this.validateJSON(response)) {
            this.venue.loaded = true;
            this.venue.id = response.id_local_evento;
            this.venue.ds_local_evento = response.ds_local_evento;
            this.venue.id_tipo_local = response.id_tipo_local;
            this.venue.id_municipio = response.id_municipio;
            this.venue.ds_googlemaps = response.ds_googlemaps;
            this.venue.ds_municipio = response.ds_municipio;
            this.venue.url = response.url;
            this.venue.sg_estado = response.sg_estado;
            this.venue.ds_estado = response.ds_estado;
            this.venue.ds_tipo_local = response.ds_tipo_local;
            this.venue.ticketbox_info = response.ticketbox_info;
            this.venue.occupation_info = response.occupation_info;
            this.venue.meta_description = response.meta_description;
            this.venue.meta_keywords = response.meta_keywords;
            this.venue.events = response.events;

            this.metaObj.description = this.venue.meta_description;
            this.metaObj.keywords = this.venue.meta_keywords;

            this.$emit('updateHead');
            // console.log('here');
            this.getListResults();

          }
        },
        error => {
          this.processing = false;
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    }
  },
  mounted() {
    this.keepalive();

    // console.log(this.venue)

  },
  computed: {
    key() {
      return this.$route.params.key;
    }
  }
};

$(document).ready(function () {
  // console.log( "ready!" );
  // debugger

});
</script>

<style lang="scss" scoped>
.card {
  background: #333;
}

.noClick {
  cursor: default;
}

.result__button-group {
  padding-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active em versões anteriores a 2.1.8 */
  {
  opacity: 0;
}

.badge-prL {
  color: #fff;
  background-color: #28a745;
}

.badge-prL[href]:hover,
.badge-prL[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #1e7e34;
}

.badge-pr10 {
  color: #fff;
  background-color: #007bff;
}

.badge-pr10[href]:hover,
.badge-pr10[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #0062cc;
}

.badge-pr12 {
  color: #212529;
  background-color: #ffc107;
}

.badge-pr12[href]:hover,
.badge-pr12[href]:focus {
  color: #212529;
  text-decoration: none;
  background-color: #d39e00;
}

.badge-pr14 {
  color: #fff;
  background-color: #ed7300;
}

.badge-pr14[href]:hover,
.badge-pr14[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #e5760e;
}

.badge-pr16 {
  color: #fff;
  background-color: #dc3545;
}

.badge-pr16[href]:hover,
.badge-pr16[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #bd2130;
}

.badge-pr18 {
  color: #fff;
  background-color: #343a40;
}

.badge-pr18[href]:hover,
.badge-pr18[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #1d2124;
}
</style>
