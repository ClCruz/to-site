<template>
<div>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <section class="to-block bg__ingressaria to-block-mobile" style="">
            <div class="container">
              <div class="row">
                <div class="col-12 col-md-8 col-lg-6">
                  <img class="event__card-img img__mobile" :src="event.img" alt="" style="">
                  <EventTitleLoader v-if="!imageLoaded && !roomLoaded && !timeLoaded" :speed="2" :animate="true"></EventTitleLoader>
                  <div v-else>
                    <h1 class="title mb-2 mt-0">{{event.NomPeca}}</h1>
                    <span class="event__badges">
                        <a href="#" class="badge badge__icon badge__genre badge-danger noClick" id="badge__gender" @click="gotoSearch(event.TipPeca, 'genre')">{{event.TipPeca}}</a>
                        <a href="#" :class="parentalrating(event)" id="badge__age">{{event.CenPeca}}</a>
                        <a href="#" class="badge badge__icon badge__state badge-light" id="badge__address" @click="gotoSearch(event.ds_local_evento, 'local')">{{event.ds_local_evento}}</a>
                        <a href="#" class="badge badge__icon badge__city badge-secondary" id="badge__city" @click="gotoSearch(event.city, 'city')">{{event.cityBadgeText}}</a>
                        <a href="#" class="badge badge__icon badge__money badge-success noClick" id="badge__price">{{event.valores}}</a>
                        <a href="#" class="badge badge__icon badge__money badge-success noClick" id="badge__price">{{event.dates}}</a>
                        <a href="#" class="badge badge__icon badge__partner badge-info noClick" v-if="event.showPartnerInfo === 1" id="badge__price">Vendido por {{event.nameSite}}</a>
                        <!-- <a href="#" v-if="imageLoaded" class="badge badge__icon badge__local badge-info" id="badge__map" @click="map($event)">Ver no mapa</a> -->
                        <span class="flag" id="">
                          <img v-for="(item) in event.badge" v-bind:key="item.tag" :id="item.tag" :title="item.tag" :src="item.img" alt="">
                          <img v-for="(ipromo, index) in event.promo" :key="index" :src="ipromo.img" :title="ipromo.tag" :alt="ipromo.tag">
                        </span>
                    </span>
                    <a href="#" @click="map($event)" class="btn to-btn dark"><i class="fa fa-sm mr-2 fa-running"></i>Ir para a loja</a>

                    <h3 class="mt-3">Detalhes do evento</h3>

                    <p id='read-more-p' v-if="event.loaded" class="lead mt-0 pt-0" v-bind:class="{ 'read-more-p-limited': showreadmore }" ref="eventdesc"><span class="event__description mt-0 p-0" v-html="event.description"></span></p>
                    <div id='read-more' @click="showreadmoreclick" v-if="showreadandless && showreadmore">
                      <div class="btn to-btn dark">
                        LER MAIS
                      </div>
                    </div>
                    <div id='read-less' @click="showreadmoreclick" v-if="showreadandless && !showreadmore">
                      <div class="btn to-btn dark">
                        LER MENOS
                      </div>
                    </div>
                  </div>

                </div>
                <div class="col-12 col-sm-6 mx-auto col-md-4 col-lg-6">
                  <EventImageIngressariaLoader class="event__card-img" v-if="!imageLoaded && !roomLoaded && !timeLoaded" :speed="2" :animate="true" style="height: 240px; border-radius: 5px; box-shadow: none!important"></EventImageIngressariaLoader>
                  <img class="event__card-img" :src="event.img" alt="" style="" v-else>
                  <!-- Share -->
                  <hr data-content="Compartilhar" class="divider mb-0 mt-2" style="max-width: 460px">
                  <div class="row" id="share">

                    <!-- facebook -->
                    <a class="facebook" :href="linkFacebook" target="blank"><i class="fab fa-facebook-f"></i></a>

                    <!-- twitter -->
                    <a class="twitter" :href="linkTwitter" target="blank"><i class="fab fa-twitter"></i></a>

                    <!-- linkedin -->
                    <!-- <a class="linkedin" :href="linkLinkedin" target="blank"><i class="fab fa-linkedin-in"></i></a> -->

                    <!-- pinterest -->
                    <a class="pinterest" :href="linkPinterest" target="blank"><i class="fab fa-pinterest-p"></i></a>

                  </div>
                  <!-- Produtor -->
                  <!-- <div class="col-md-12 col-10 m-sm-auto p-0" style="max-width: 460px;">
                    <h3 class="mt-3">Sobre o parceiro</h3>
                    <div class="row align-items-center ">
                      <div class="col-4 ">
                      </div>

                      <div class="col-12">
                        <h4>Cia de Ingressos</h4>
                        <p class="lead">A cia de ingressos fornece aos nossos clientes uma prestação de serviço diferenciada e específica para controle de venda de ingressos para todo o tipo de evento</p>
                        <a href="#" class="btn to-btn dark"><i class="fa fa-sm mr-2 fa-link"></i>Ir para o site do parceiro</a>
                      </div>
                    </div>
                  </div> -->
                  <!-- Local do evento -->
                  <div class="col-md-12 col-10 m-sm-auto p-0 pt-3 mb-0" style="max-width: 460px;">
                    <LineLoader v-if="!imageLoaded && !roomLoaded && !timeLoaded" :speed="2" :animate="true"></LineLoader>
                    <span v-else>
                    <h3 class="mt-3">Local do evento</h3>
                    <div class="row align-items-center ">
                      <div class="col-4 ">
                      </div>

                      <div class="col-12">
                        
                        <p class="lead">{{this.event.address}}</p>
                        <a href="#" @click="map($event)" class="btn to-btn dark"><i class="fa fa-sm mr-2 fa-map"></i>Ver mapa</a>
                      </div>
                    </div>
                      </span>
                  </div>

                  <!-- Horários -->
                  <!-- <div class="col-md-12 col-10 m-sm-auto p-0" style="max-width: 460px;" v-if="imageLoaded && roomLoaded && timeLoaded">
                      <iframe class="map" :src="returnMap()"
          width="100%" height="300" frameborder="0" style="border:0" allowfullscreen=""></iframe>

                  </div> -->
                </div>
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

import {
  eventService
} from "@/components/common/services/event";

Vue.use(VueHead);

Vue.filter("money", function (value) {
  let helper = parseFloat(value);
  let ret = "0.00";
  if (helper > 0) {
    ret = helper.toFixed(2);
  }
  return `R$ ${ret}`;
});
Vue.filter("moneyIngressaria", function (value) {
  let helper = parseFloat(value);
  let ret = "0.00";
  if (helper > 0) {
    ret = helper.toFixed(2);
  }
  return `${ret}`;
});

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
    AppSearch
  },
  head: {
    title: function () {
      return {
        inner: (this.event.loaded ? `${this.event.NomPeca} - ${this.event.ds_local_evento} - ${this.event.TipPeca}` : "Carregando..."),
        separator: " - ",
        complement: this.event.loaded ? config.info.title : "",
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
    link: function () {
      return [{
          rel: 'icon',
          href: `${config.info.favicoPath}/favicon-32x32.png`,
          sizes: '32x32',
          type: 'image/png'
        },
        {
          rel: 'icon',
          href: `${config.info.favicoPath}/favicon-16x16.png`,
          sizes: '16x16',
          type: 'image/png'
        },
      ]
    }
  },

  data() {
    return {
      siteName: config.info.siteName,
      linkFacebook: '',
      linkTwitter: '',
      linkLinkedin: '',
      linkPinterest: '',
      processing: true,
      filterBy: 0,
      filterByDate: '',
      filterByRoom: 'Todas as opções',
      metaObj: this.metatag_getObj(),
      selected: undefined,
      showreadandless: false,
      showreadmore: false,
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
        ontixsme: false,
        dates: '',
      },
      listOfHours: [],
      selectedDay: [],
      dates: [],
      salasDisponiveis: [],
      presentantion: [],
      timeLoaded: false,
      roomLoaded: false,
      dateLoaded: false,
      imageLoaded: false,
      swiperOption: {
        // loop: true,
        // autoplay: true,
        // speed: 1000,
        // loopedSlides: 1,
        slidesPerView: "7",
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          800: {
            slidesPerView: "3",
          }
        }
      }
    }
  },
  created() {
    // Fixa navbar ao ultrapassa-lo
    var navbar = $('#navbar'),
      distance = navbar.offset().top,
      $window = $(window);

    $window.scroll(function () {
      if ($window.scrollTop() >= 140) {
        navbar.removeClass('navbar-fixed-top').addClass('navbar-fixed-top');
      } else {
        navbar.removeClass('navbar-fixed-top');
      }

      if ($window.scrollTop() >= 500) {
        $('#btn__comprar').css("opacity", 1 - $(window).scrollTop() / 250);
      } else {
        $('#btn__comprar').css("opacity", 1 + $(window).scrollTop() / 250);
      }
    });
  },
  methods: {
    escapeHtml(text) {
      var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };

      return text.replace(/[&<>"']/g, function (m) {
        return map[m];
      });
    },
    generateSocialLinks() {

      let url = window.location;
      let title = escape(this.event.NomPeca);
      let media = this.event.img;

      this.linkFacebook = "https://www.facebook.com/share.php?u=" + url + "&title=" + title;
      this.linkLinkedin = "https://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + title + "&source=source";
      this.linkTwitter = "https://twitter.com/intent/tweet?text=" + title + "&url=" + url;
      this.linkPinterest = "https://pinterest.com/pin/create/bookmarklet/?media=" + media + "&url=" + url + "&is_video=false&description=";
    },
    showreadmoreclick() {
      if (this.showreadmore) {
        this.showreadmore = false;
      } else {
        this.showreadmore = true;
      }
    },
    setdescription() {
      Vue.nextTick().then(response => {
        this.showreadandless = this.$refs.eventdesc.clientHeight > 400;
        this.showreadmore = this.showreadandless;
      });
    },
    scrollTo() {
      var element = document.getElementById("horario");
      var top = element.offsetTop;
      window.scrollTo(0, top - 100);
    },
    parentalrating(event) {
      let ret = "badge noClick ";
      switch (event.CenPeca) {
        case "L":
          ret += "badge-prL";
          break;
        case "10":
          ret += "badge-pr10";
          break;
        case "12":
          ret += "badge-pr12";
          break;
        case "14":
          ret += "badge-pr14";
          break;
        case "16":
          ret += "badge-pr16";
          break;
        case "18":
          ret += "badge-pr18";
          break;
      }
      return ret;
    },
    selectedDate(item) {
      this.filterByDate = item.date;
    },
    selectedRoom(item) {
      this.filterBy = item.CodSala;
      this.filterByRoom = item.NomSala;
    },
    toggleFilter(code) {
      this.filterBy = code;
    },
    gotostore() {
      console.log(changetotixsme);

    },
    buy(id_apresentacao, changetotixsme) {
      this.gotoLegacy(id_apresentacao, "shopping", changetotixsme);
    },
    map(event) {
      if (event) event.preventDefault();

      window.open("http://maps.google.com/?q=" + (this.event.address == null || this.event.address == "" ? this.event.ds_local_evento : this.event.address));
    },
    returnMap() {
      //  debugger

      var map = "https://www.google.com/maps/embed?q=" + encodeURIComponent(this.event.address)
      return map;
    },
    gotoSearch(item, type) {
      switch (type) {
        case "city":
          this.$router.push("/busca/cidade/" + item);
          break;
        case "local":
          this.$router.push("/busca/local/" + item);
          break;
        case "genre":
          this.$router.push("/busca/genero/" + item);
          break;
      }
      //this.$router.push("/busca/" + item);
    },
    getRooms() {
      Vue.nextTick().then(response => {
        eventService.rooms(this.event.id_base, this.event.CodPeca).then(
          response => {
            this.hideWaitAboveAll();
            if (this.validateJSON(response)) {
              this.salasDisponiveis = response;

              // console.log("Salas: ");
              // console.log(this.salasDisponiveis);
              this.roomLoaded = true;
            }
          },
          error => {
            this.processing = false;
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");
          }
        );

      });
    },
    getDates() {
      Vue.nextTick().then(response => {
        eventService.dates(this.event.id_base, this.event.CodPeca).then(
          response => {
            this.hideWaitAboveAll();
            if (this.validateJSON(response)) {
              // console.log(response);
              this.dates = response;
              this.dateLoaded = true;
              this.filterByDate = "Datas";

              // console.log('TCL: getDates -> response', response)
              //if (this.dates.length > 0) {
              //  this.filterByDate = this.dates[0].date;
              // }
              //else {
              //  this.filterByDate = "";
              // }
            }
          },
          error => {
            this.processing = false;
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");
          }
        );

      });
    },
    getPresentation(callback) {
      this.showWaitAboveAll();
      Vue.nextTick().then(response => {
        eventService.presentation(this.event.id_base, this.event.CodPeca).then(
          response => {
            this.hideWaitAboveAll();
            if (this.validateJSON(response)) {
              this.presentantion = response;
              this.timeLoaded = true;

              if (callback !== null && callback !== undefined) {
                callback();
              }
            }
          },
          error => {
            this.processing = false;
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");
          }
        );
      });
    },
    checkIfCompre() {
      // console.log(this.$route);
      return (this.siteName == 'www.compreingressos.com' && this.$route.name == 'espetaculos');
    },
    trimKeyForId(key) {
      return key.split('-')[0];
    },
    getEvent() {
      this.showWaitAboveAll();
      this.processing = true;
      let isCI = false;
      let eventKey = this.key;

      if (this.checkIfCompre()) {
        isCI = true;
        eventKey = this.trimKeyForId(this.key);
      }

      eventService.description(eventKey, isCI).then(
        response => {

          this.hideWaitAboveAll();
          this.processing = false;

          if (response.error) {
            this.toastError(response.msg);
            // console.log(response.msg);
            if (response.goto == "home")
                window.location = "/";
            return;
          }
          if (this.validateJSON(response)) {
            this.event.loaded = true;
            this.event.NomPeca = response.NomPeca;
            this.event.CodPeca = response.CodPeca;
            this.event.TipPeca = response.TipPeca;
            this.event.CenPeca = response.CenPeca;
            this.event.ds_local_evento = response.ds_local_evento;
            this.event.address = response.address;
            this.event.id_base = response.id_base;
            this.event.valores = response.valores;
            this.event.description = response.description;
            this.event.img = response.img;
            this.event.badge = response.badge;
            this.event.promo = response.promo;
            this.event.meta_keyword = response.meta_keyword;
            this.event.meta_description = response.meta_description;
            this.event.city = response.ds_municipio;
            this.event.state = response.sg_estado;
            this.event.cityBadgeText = response.badge_city_text;
            this.event.nameSite = response.name_site;
            this.event.dates = response.dates;
            this.event.showPartnerInfo = response.show_partner_info;
            this.event.ontixsme = response.ontixsme;
            // this.getRooms();
            // this.getPresentation(this.fillFirstHour);

            // this.getDates();
            this.setdescription();

            this.generateSocialLinks();
            this.metaObj.appName = config.info.siteName;
            this.metaObj.description = this.event.meta_description;
            this.metaObj.keywords = this.event.meta_keyword;
            this.metaObj.name = this.event.NomPeca;
            this.metaObj.twitter.card = 'summary_large_image';
            this.metaObj.twitter.title = this.event.NomPeca;
            this.metaObj.twitter.description = this.event.meta_description;
            this.metaObj.twitter.image.root = this.event.img;
            this.metaObj.twitter.image.alt = this.event.NomPeca;
            this.metaObj.og.title = this.event.NomPeca;
            this.metaObj.og.type = 'website';
            this.metaObj.og.url = config.host.endsWith("/") ? config.host : (config.host + "/") + response.key;
            this.metaObj.og.description = this.event.meta_description;
            this.metaObj.og.site_name = config.info.siteName;
            this.metaObj.og.image.root = this.event.img;
            this.metaObj.og.image.secure_url = this.event.img;
            this.metaObj.og.image.type = 'image/jpeg';
            this.metaObj.og.image.alt = this.event.NomPeca;

            this.$emit('updateHead');

            this.imageLoaded = true;
          }
        },
        error => {
          this.processing = false;
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
    filteredHours(day) {
      // debugger
      // let ret2 = this.presentantion;
      let hours = this.presentantion.filter(x => x.day == day);

      //document.querySelector('.container__available-times').style.opacity = 0;
      // console.log(hours);
      this.listOfHours = this.removeDuplicatesBy(x => x.HorSessao, hours);

      setTimeout(function () {
        //document.querySelector('.container__available-times').style.opacity = 1;

      }, 200);

    },
    fillFirstHour() {
      let selectedDate = this.presentantion[0];
      // console.log(this.presentantion);
      this.filteredHours(selectedDate.day);
    },
    removeDuplicatesBy(keyFn, array) {
      var mySet = new Set();
      return array.filter(function (x) {
        var key = keyFn(x).toUpperCase(),
          isNew = !mySet.has(key);
        if (isNew) mySet.add(key);
        return isNew;
      });
    },
    toggleActiveCard(target) {
      // var a = document.getElementsByClassName('card__time');
      // Array.from(a).map(x => x.classList.remove('card__time-active'));

      // console.log(target)
      // element.target.classList.add('card__time-active');
      return;
    }
  },
  mounted() {
    this.getEvent();
    this.keepalive();

    // console.log(this.event)

  },
  computed: {
    key() {
      return this.$route.params.key;
    },
    filtered() {
      let ret = this.presentantion;
      if (this.filterBy != 0) {
        ret = this.presentantion.filter(x => x.CodSala == this.filterBy);
      }

      if (this.filterByDate != '' && this.filterByDate != 'Datas') {
        let splited = this.filterByDate.split('/');
        let day = `${splited[0]}/${splited[1]}`;
        let year = splited[2];
        ret = ret.filter(x => x.day == day && x.year == year);
      }

      // console.log("TCL: filtered -> ret", ret)
      return ret;
    },
    filteredDays() {
      // debugger
      let ret = this.presentantion;

      // console.log("TCL: filteredDays -> ret", ret)

      return this.removeDuplicatesBy(x => x.day, ret);
    },

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
