<template>
<div class="a">
  <section id="" class="bg__main">
    <div class="container-fluid">
      <!-- swiper -->
      <div v-if="!slideLoaded" id="loader">
        <div class="item__slide">
          <div class="row">
            <div class="col-md-8 col-xs-12 nopadding slide__image" style="">
              <CarrouselLoader class="nopadding" style="padding: 0!important; border-top-left-radius: 5px" :speed="2" :animate="true" v-if="!slideLoaded"></CarrouselLoader>
            </div>
            <div class="col-md-4 d-none d-sm-block visible-md visible-lg to__slide nopadding" style="height:423px;padding:30px; margin-left: -15px;border-top-right-radius: 5px; border-bottom-right-radius: 5px; background-color: white">
              <CarrouselTextLoader class="col-12 nopadding" style="padding: 0!important; height: 275px; border-top-left-radius: 5px" :speed="2" :animate="true" v-if="!slideLoaded"></CarrouselTextLoader>

            </div>
          </div>
        </div>
      </div>
      <span v-else>
        <span v-if="siteName == 'teatro.compreingressos.com'">
          <swiper>
            <swiper-slide>
              <div class="p-0" style="width: 100%">
                <div class="row">
                  <div class="col-md-12 col-xs-12 nopadding">
                    <span style="cursor: pointer">
                      <img  src="https://media.tixs.me/ci/visor.jpg?1541728042" class="" alt="" style="width:100%;">
                    </span>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </span>
        <span v-else>
          <banner-slide :bannerEvents="bannerEvents" :swiperOption="swiperOption"></banner-slide>
        </span>

      </span>
    </div>
  </section>
  <!-- <card-city-list title="Cidades em Destaque" :cityList="cityList"></card-city-list> -->
  <card-genre-list title="Gêneros em Destaque" :genreList="genreList"></card-genre-list>
  <section class="to-block team-1">
    <div class="container" v-if="siteName == 'teatro.compreingressos.com'">
          <card-event-itau :slideData='slideData'></card-event-itau>
    </div>
    <div class="container" v-else>

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
import CardEvent from "@/components/Card-event.vue";
import CardEventItau from "@/components/Card-event-itau.vue";
import CardGenreList from "@/components/Card-genreList.vue";
import CardCityList from "@/components/Card-cityList.vue";
import BannerSlide from "@/components/Banner-slide.vue";
import config from '@/config';
import CarrouselLoader from '@/components/loaders/CarrouselLoader.vue';
import CarrouselTextLoader from '@/components/loaders/CarrouselTextLoader.vue';

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
      discovery: [],
      slideData: [],
      cityList: [],
      localsList: [],
      genreList: [],
      nextEvents: [],
      bannerEvents: [],
        siteName: config.info.siteName,

      swiperOption: {
        loop: true,
        autoplay: true,
        speed: 800,
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
    CardEventItau,
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
      this.genreList = this.removeDuplicatesBy(x => x.genreName, this.slideData);
      this.genreList = this.genreList.slice(0, 6);
    },
    getLocalsList() {
      this.localsList = this.removeDuplicatesBy(x => x.ds_nome_teatro, this.slideData);
    },
    getNextEvents() {
      this.nextEvents = this.slideData.slice(0, 4);
    },
    getBanner() {
      eventService.banner(this.locale.city.name, this.locale.state.name).then(
        response => {
          this.bannerEvents = response;
          setTimeout(() => {
            this.slideLoaded = true;
          }, 1000)

        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
    getDiscovery() {
      discoveryService.list().then(
        response => {
          this.discovery = response;
        },
        error => {
          this.toastError("Falha na execução.");
        }
      );
    },
    getListResults() {

      this.getLocation(this.getListResultAgain);

      eventService.list(this.locale.city.name, this.locale.state.name).then(
        response => {
          this.slideData = response.filter(x => x.id_genre !== undefined && x.id_genre !== null);
          
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
};
</script>

<style lang="scss" scoped>
</style>
