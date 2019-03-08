<template>
<div class="a">
  <section class="to-block to-viewport bg-dark bg__main" style="" data-block-type="call_to_action" data-id="2">
    <div class="container justify-content-center align-items-center d-flex p-4  pt-5 container__search--tickethub">
      <div class="col-10 justify-content-center text-center">
        <div class="d-none d-sm-block" style="">
          <h1>O quê deseja encontrar ?</h1>
        </div>
        <div class="d-none d-sm-block input-group mt-3 mb-3 p-3 w-100">
          <app-search></app-search>
        </div>
        <div class="mr-0 ml-0 mt-4 mb-0 p-0 w-100 justify-content-center row">
          <div class="col-12 col-sm-2  d-none d-sm-block" v-for="(item, index) in nextEvents" :key='index'>
            <p class="next__events p-2" @click="goto('event', item)">
              {{item.ds_evento}}
            </p>
          </div>
        </div>
      </div>
    </div>

  </section>

  <section class="pt-4" id="section__slider">
    <div class="container">
      <!-- swiper -->
      <div v-if="!slideLoaded">
        <div class="item__slide">
          <div class="row">
            <div class="col-md-8 col-xs-12 nopadding slide__image" style="">
              <CarrouselLoader class="nopadding" style="padding: 0!important; border-top-left-radius: 5px; margin-right: -5px" :speed="2" :animate="true" v-if="!slideLoaded"></CarrouselLoader>
            </div>
            <div class="col-md-4 d-none d-sm-block visible-md visible-lg to__slide nopadding" style="height:350px;padding:30px; margin-left: -15px;border-top-right-radius: 5px; border-bottom-right-radius: 5px; background-color: white">
              <CarrouselTextLoader class="col-12 nopadding" style="padding: 0!important; height: 320px; border-top-left-radius: 5px" :speed="2" :animate="true" v-if="!slideLoaded"></CarrouselTextLoader>

            </div>
          </div>
        </div>
      </div>
      <banner-slide v-else :bannerEvents="bannerEvents" :swiperOption="swiperOption"></banner-slide>
    </div>
  </section>
  <card-city-list title="Cidades em Destaque" :cityList="cityList"></card-city-list>
  <card-genre-list title="Gêneros em Destaque" :genreList="genreList"></card-genre-list>
  <section class="to-block team-1">
    <div class="container">
      <div class="row row__events">
        <div class="col-12 col-sm-12 text-left mt-2 mb-4">
          <h3 class="">Eventos</h3>
        </div>
        <card-event v-for="(item, index) in slideData" :key='index' :item="item"></card-event>
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
import AppSearch from "@/components/App-search.vue";
import config from '@/config';
import CarrouselLoader from '@/components/loaders/CarrouselLoader.vue';
import CarrouselTextLoader from '@/components/loaders/CarrouselTextLoader.vue';

import CardEvent from "@/components/Card-event.vue";
import CardGenreList from "@/components/Card-genreList.vue";
import CardCityList from "@/components/Card-cityList.vue";
import BannerSlide from "@/components/Banner-slide.vue";
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import {
  eventService
} from "@/components/common/services/event";

export default {
  name: "Events",
  mixins: [func],
  data() {
    return {
      slideLoaded: false,
      slideData: [],
      cityList: [],
      localsList: [],
      genreList: [],
      nextEvents: [],
      bannerEvents: [],

      swiperOption: {
        loop: true,
        autoplay: true,
        speed: 1000,
        loopedSlides: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 5000
        },

        breakpoints: {},
        on: {
          slideChangeTransitionEnd: function () {
            let me = this;
            if (this.isEnd) {
              if (this.autoplay.running) {
                setTimeout(function () {
                  me.slideToLoop(0, me.params.speed);
                  me.autoplay.stop();
                  me.autoplay.start();
                }, this.params.autoplay.delay);
              }
            }
          }
        }
      }

    }
  },
  components: {
    AppSearch,
    CarrouselLoader,
    CarrouselTextLoader,
    CardEvent,
    BannerSlide,
    CardGenreList,
    CardCityList
  },
  methods: {
    next() {
      //this.$refs.slick.slick("slickSetOption", 'speed', 1, true)
      //this.$refs.slick.next();
      //this.$refs.slick.slick("slickSetOption", 'speed', 5000, true)

    },

    prev() {
      //this.$refs.slick.prev();
    },

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
      }
    },
    getListResultAgain() {
      eventService.list(this.locale.city.name, this.locale.state.name).then(
        response => {
          this.slideData = response;
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
      this.genreList = this.removeDuplicatesBy(x => x.genreName, this.slideData);
    },
    getLocalsList() {
      this.localsList = this.removeDuplicatesBy(x => x.ds_nome_teatro, this.slideData);
    },
    getNextEvents() {
      this.nextEvents = this.slideData.slice(1, 5);
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
    getListResults() {

      this.getLocation(this.getListResultAgain);

      eventService.list(this.locale.city.name, this.locale.state.name).then(
        response => {
          this.slideData = response;
          this.hideWaitAboveAll();
          this.isLoaded = true;

          this.getCityList();
          this.getGenreList();
          this.getLocalsList();
          this.getNextEvents();
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },

    // Events listeners
    /*handleAfterChange(event, slick, currentSlide) {},
    handleBeforeChange(event, slick, currentSlide, nextSlide) {},
    handleBreakpoint(event, slick, breakpoint) {},
    handleDestroy(event, slick) {},
    handleEdge(event, slick, direction) {},
    handleInit(event, slick) {},
    handleReInit(event, slick) {},
    handleSetPosition(event, slick) {},
    handleSwipe(event, slick, direction) {},
    handleLazyLoaded(event, slick, image, imageSource) {},
    handleLazeLoadError(event, slick, image, imageSource) {},*/

  },
  computed: {},
  created() {
    this.getListResults();
    this.getBanner();
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

<style lang="scss" scoped>
</style>
