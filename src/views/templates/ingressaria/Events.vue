<template>
<div class="a">
  <section class="to-block to-viewport bg-dark bg__main" style="" data-block-type="call_to_action" data-id="2">
    <div class="container justify-content-center align-items-center d-flex container__search--tickethub pt-5 pb-4" v-if="siteName == 'ingressoparatodos.com.br'">
      <div class="col-12 col-md-10 justify-content-center text-center" style="height: 380px;" id="fundo_ingressaria">
        <div>
        </div>
      </div>
      <div class="col-12 col-md-10 justify-content-center text-center" v-if="siteName != 'ingressoparatodos.com.br'">
        <div class="" style="">
          <h1>Pesquise experiências</h1>
        </div>
        <div class="input-group mt-0 mb-3 p-2 w-100">
          <app-search></app-search>
        </div>
      </div>
    </div>
    <div class="container justify-content-center align-items-center d-flex p-4  pt-5 container__search--tickethub" v-else>
      <div class="col-12 col-md-10 justify-content-center text-center" v-if="siteName != 'ingressoparatodos.com.br'">
        <div class="" style="">
          <h1>Pesquise experiências</h1>
        </div>
        <div class="input-group mt-0 mb-3 p-2 w-100">
          <app-search></app-search>
        </div>
      </div>
    </div>
  </section>
  <div class="container-fluid container__select pb-0" style="border-bottom: 1px solid #e3e3e3" v-if="cityList.length > 1">
    <div class="row pb-0">
      <div class="col-6 text-right select__city" style="border-right: 1px solid #e3e3e3;">
        <model-select :options="options" v-model="item" placeholder="Selecionar Cidade" @input="handleOnInput">
        </model-select>
      </div>
      <div class="col-6">
        <datepicker :clear-button=true :language="ptBR" @selected="selectDate" @cleared="resetEvents" placeholder="Data" :bootstrap-styling=true clear-button-icon="fa fa-sm fa-times-circle"></datepicker>
      </div>
    </div>
  </div>
  <div class="p-2 container-fluid container__select" v-else></div>
  <!-- Propaganda -->
  <div class="container-fluid container__select" v-if="discoveryBanner.length > 0">
    <div class="container p-0">
      <div class="row">
        <div class="col-12 col-xl-12 text-left">
          <div class="p-3">
            <img class="img-fluid rounded-0 discovery" v-bind:src="discoveryBanner[0].imageURI" :alt="discoveryBanner[0].title" @click="goto('discovery', discoveryBanner[0].link)">
          </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Destaque generos -->
    <section class="features" style="background: white" data-block-type="features" data-id="3" id="features" v-if="siteName == 'ingressoparatodos.com.br'">
      <div class="container">
        <div class="row text-left pt-1 pb-1">
          <div class="col-12 col-sm-12 text-left mt-2 mb-2">
            <h3 class="">Nossos teatros <span style="font-size: 18.5px; color: #777;">{{searchTerm !== "" ? "(" + searchTerm + ")" : ""}}</span></h3>
            <p class="mt-3 mb-0 pb-0">Descubra eventos específicos de cada teatro</p>
          </div>
          <div class="col-12 p-0 mt-2 pt-3" style="" v-if="!genreListLoaded">
            <GenreFeaturesLoader :speed="2" :animate="true"></GenreFeaturesLoader>
          </div>
          <div @click="goto('local',item.ds_nome_teatro)" class="col-6 col-md-2 col-sm-2 p-0 card__container mt-0" style="" v-for="(item, index) in localsList" :key='index' v-else>
            <p>
              <div alt="image" class="img-fluid rounded card__home" :class="['card__home-' + index]">
                <span class="genre__ingressaria" style="text-transform: uppercase">{{ item.ds_nome_teatro }}</span>
              </div>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="features" style="background: white" data-block-type="features" data-id="3" id="features" v-if="siteName !== 'ingressoparatodos.com.br'">
      <div class="container">
        <div class="row text-left pt-1 pb-1">
          <div class="col-12 col-sm-12 text-left mt-2 mb-2">
            <h3 class="">Explore nossos eventos <span style="font-size: 18.5px; color: #777;">{{searchTerm !== "" ? "(" + searchTerm + ")" : ""}}</span></h3>
            <p class="mt-3 mb-0 pb-0">Descubra eventos através das categorias mais procuradas</p>
          </div>

          <div class="col-12 p-0 mt-2 pt-3" style="" v-if="!genreListLoaded">
            <GenreFeaturesLoader :speed="2" :animate="true"></GenreFeaturesLoader>
          </div>
          <div @click="goto('genre',item.genreName)" class="col-6 col-md-2 col-sm-2 p-0 card__container mt-0" style="" v-for="(item, index) in genreList" :key='index' v-else>
            <p>
              <div alt="image" class="img-fluid rounded card__home" :class="['card__home-' + index]">
                <span class="genre__ingressaria" style="text-transform: uppercase">{{ item.genreName }}</span>
              </div>
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- Banner -->
    <div class="container__select to-block container__features" id="banner">
      <div class="container pt-2 pb-0 text-left">
        <h3 class="">Experiências em destaque</h3>
        <p class="mt-3 mb-0 pb-0" v-if="filteredData.length > 0">Uma seleção de eventos para você</p>
        <div class="container__arrows">
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
        <div class="row p-3">
          <swiper :options="swiperOption" class="col-12 pb-0 mb-0">
            <swiper-slide v-for="(item, index) in bannerEvents" :key='index' class="col-12 col-xl-6 col-md-6 p-0 pb-0 pt-0 text-left">
              <div class="pr-1">
                <div class="to-box p-0 ">
                  <div @click="goto('event',{ uri: item.uri})" class="img-fluid rounded-0" style="background-size: cover;height: 300px !important" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }">
                  </div>
                  <!-- <div class="partner__badge"><i class="fa fa-lg fa-handshake"></i>Compreingressos</div> -->
                </div>
              </div>
            </swiper-slide>

          </swiper>
        </div>
      </div>
    </div>
    <section class="features" style="background: white" data-block-type="features" data-id="3" id="features" v-if="siteName == 'ingressoparatodos.com.br'">
      <div class="container">
        <div class="row text-left pt-1 pb-1">
          <div class="col-12 col-sm-12 text-left mt-2 mb-2">
            <h3 class="">Explore nossos eventos <span style="font-size: 18.5px; color: #777;">{{searchTerm !== "" ? "(" + searchTerm + ")" : ""}}</span></h3>
            <p class="mt-3 mb-0 pb-0">Descubra eventos através das categorias mais procuradas</p>
          </div>

          <div class="col-12 p-0 mt-2 pt-3" style="" v-if="!genreListLoaded">
            <GenreFeaturesLoader :speed="2" :animate="true"></GenreFeaturesLoader>
          </div>
          <div @click="goto('genre',item.genreName)" class="col-6 col-md-2 col-sm-2 p-0 card__container mt-0" style="" v-for="(item, index) in genreList" :key='index' v-else>
            <p>
              <div alt="image" class="img-fluid rounded card__home" :class="['card__home-' + index]">
                <span class="genre__ingressaria" style="text-transform: uppercase">{{ item.genreName }}</span>
              </div>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="to-block team-1 mt-0 pt-0" id="events">
      <div class="container">
        <div class="row row__events">
          <div class="col-12 col-sm-12 text-left mt-2 mb-2">
            <h3 class="">Próximos eventos <span style="font-size: 18.5px; color: #777;">{{searchTerm !== "" ? "(" + searchTerm + ")" : ""}}</span></h3>
            <p class="mt-3 mb-0 pb-0" v-if="filteredData.length > 0">Encontre um evento com toda a facilidade que você precisa</p>
          </div>
          <p style="font-size: 16px; font-weight: bold" class="mt-3" v-if="filteredData.length == 0">{{filteredData.length == 0 ? 'Nenhum evento encontrado' : ''}}</p>

          <card-event v-for="(item, index) in computedFilteredData" :key='index' :item="item"></card-event>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from "jquery";
import Logo from "@/components/App-logo.vue";
import {
  func
} from '@/functions';
import {
  ModelSelect
} from 'vue-search-select'

import AppSearch from "@/components/App-search.vue";
import config from '@/config';
// import CarrouselLoader from '@/components/loaders/CarrouselLoader.vue';
import GenreFeaturesLoader from '@/components/loaders/GenreFeaturesLoader.vue';
// import CarrouselTextLoader from '@/components/loaders/CarrouselTextLoader.vue';

import CardEvent from "@/components/Card-event.vue";
import CardGenreList from "@/components/Card-genreList.vue";
import CardCityList from "@/components/Card-cityList.vue";
import BannerSlide from "@/components/Banner-slide.vue";
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import {
  eventService
} from "@/components/common/services/event";
import {
  discoveryService
} from "@/components/common/services/discovery";
import Datepicker from 'vuejs-datepicker';
import {
  ptBR
} from 'vuejs-datepicker/dist/locale'

export default {
  name: "Events",
  mixins: [func],
  data() {
    return {
      siteName: config.info.siteName,
      discoveryBanner: '',
      slideLoaded: false,
      genreListLoaded: false,
      discovery: [],
      slideData: [],
      ptBR: ptBR,
      format: "yyyy MM dd",
      cityList: [],
      localsList: [],
      genreList: [],
      date: '',
      nextEvents: [],
      bannerEvents: [],
      filteredData: [],
      searchTerm: '',
      options: [],
      dateValue: '',
      optionsDate: [],
      item: {
        value: '',
        text: ''
      },
      itemDate: {
        value: '',
        text: ''
      },

      swiperOption: {
        // loop: true,
        // autoplay: true,
        // speed: 1000,
        // loopedSlides: 1,
        slidesPerView: 2,
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
            slidesPerView: 1
          }
        },
      }
    }
  },
  components: {
    ModelSelect,
    AppSearch,
    // CarrouselLoader,
    // CarrouselTextLoader,
    CardEvent,
    BannerSlide,
    GenreFeaturesLoader,
    CardGenreList,
    CardCityList,
    Datepicker
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    reset() {
      this.item = {}
    },
    selectFromParentComponent1() {
      // select option from parent component
      this.item = this.options[0]
    },
    clearDate() {
      // console.log(this.dateValue);

    },

    next() {},
    prev() {},
    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        //this.$refs.slick.reSlick();
      });
    },
    search(type, item) {
      this.$router.push('/busca/' + type + '/' + item);
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

    selectDate(data) {

      // console.log(data);
      if (data == "1970-01-01") return;
      if (data == null) return;

      this.date = new Date(data).toISOString().split('T')[0];

      this.refreshEffect();

      this.getListResultsFiltered();

    },
    refreshEffect() {
      var banner = document.getElementById('banner');
      var features = document.getElementById('features');
      var events = document.getElementById('events');

      $('#banner').fadeOut();
      $('#features').fadeOut();
      $('#events').fadeOut();

      $('#banner').fadeIn();
      $('#features').fadeIn();
      $('#events').fadeIn();
    },
    handleOnInput($event) {
      this.item = $event;

      if (this.item.value == "all") {
        // this.filteredData = this.slideData;
        this.searchTerm = "";
        // return;
      } else {
        this.searchTerm = this.item.text;
      }

      this.refreshEffect();

      // console.log(this.searchTerm);
      this.getListResultsFiltered();

    },
    resetEvents() {
      this.date = "";

      this.getListResultsFiltered();
    },
    getListResultsFiltered() {
      eventService.list(this.searchTerm, this.locale.state.name, this.date).then(
        response => {
          this.filteredData = response;
          this.hideWaitAboveAll();
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
    getListResultAgain() {
      eventService.list(this.locale.city.name, this.locale.state.name).then(
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
    removeDuplicatesBy(keyFn, array) {
      var mySet = new Set();
      return array.filter(function (x) {
        var key = keyFn(x).toUpperCase(),
          isNew = !mySet.has(key);
        if (isNew) mySet.add(key);
        return isNew;
      });
    },
    getCityList() {
      this.cityList = this.removeDuplicatesBy(x => x.ds_municipio, this.slideData);

    },
    getGenreList() {
      this.genreList = this.removeDuplicatesBy(x => x.genreName, this.filteredData).slice(0, 6);

      this.genreListLoaded = true;
    },
    getLocalsList() {
      this.localsList = this.removeDuplicatesBy(x => x.ds_nome_teatro, this.filteredData).slice(0, 6);

      // console.log(this.localsList);
    },
    getNextEvents() {
      this.nextEvents = this.slideData.slice(1, 5);
    },
    populateCityPicker() {
      this.options.push({
        value: "all",
        text: "Todas as Cidades"
      })
      this.cityList.map(x => {
        this.options.push({
          value: x.ds_municipio,
          text: x.ds_municipio.toLowerCase().replace(/^\w/, x => {
            return x.toUpperCase();
          })
        })
      });
    },
    getBanner() {
      eventService.banner(this.locale.city.name, this.locale.state.name).then(
        response => {
          this.bannerEvents = response;
          this.slideLoaded = true;
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
    getDiscovery() {
      // console.log(this.key);
      discoveryService.list(this.key).then(
        response => {
          // console.log(response);
          this.discovery = response.filter(x => x.type !== 'banner');
          this.discoveryBanner = response.filter(x => x.type == 'banner');

          console.log(this.discoveryBanner);
        },
        error => {
          this.toastError("Falha na execução.");
        }
      );
    },
    getListResults(callback) {

      this.getLocation(this.getListResultAgain);

      eventService.list(this.locale.city.name, this.locale.state.name).then(
        response => {
          this.slideData = response.filter(x => x.id_genre !== undefined && x.id_genre !== null);

          this.filteredData = this.slideData

          this.hideWaitAboveAll();
          this.isLoaded = true;

          this.getCityList();
          this.getGenreList();
          this.getLocalsList();
          this.getNextEvents();

          this.populateCityPicker();

          // console.log(this.slideData);

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
  },
  computed: {
    computedFilteredData() {
      let ret = this.filteredData;

      this.discovery.map(x => {
        if (x.index == 0) {
          const j = Math.floor(Math.random() * (ret.length));
          ret.splice(j, 0, x);
        } else {
          if (x.index > ret.length) {
            ret.push(x);
          } else {
            ret.splice(x.index, 0, x);
          }
        }
      });

      // console.log(ret);

      return ret;
    },
  },
  created() {
    this.getListResults(this.getDiscovery);
    this.getBanner();

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
    });

  },
  beforeUpdate() {
    //if (this.$refs.slick) {
    //this.$refs.slick.destroy();
    //}
  },
  updated() {
    //if (this.$refs.slick && !this.$refs.slick.$el.classList.contains('slick-initialized')) {
    //this.$refs.slick.create();
    //}
  },
  filters: {
    truncate: function (text, length, clamp) {
      clamp = clamp || '...';
      var node = document.createElement('div');
      node.innerHTML = text;
      var content = node.textContent;
      return content.length > length ? content.slice(0, length) + clamp : content;
    },
    replace: function (message, toReplace, replacement) {
      return message.replace(toReplace, replacement);
    },
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      value = value.toLowerCase();
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }

}
</script>

<style lang="scss">
.select__city {
  .dropdown {
    width: 140px;
    float: right;
  }
}
</style>
