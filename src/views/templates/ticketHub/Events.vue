<template>
<div class="a">
  <section class="fdb-block fdb-viewport bg-dark bg__main" style="" data-block-type="call_to_action" data-id="2">
    <div class="container justify-content-center align-items-center d-flex p-5">
      <div class="col-10 justify-content-center text-center">
        <div class="d-none d-sm-block" style="">
          <h2>O quê deseja encontrar ?</h2>
        </div>
        <div class="d-none d-sm-block input-group mt-4 mb-4 p-3 w-100">
          <app-search></app-search>
        </div>
        <div class="mr-0 ml-0 mt-4 mb-0 p-0 w-100 justify-content-center row">
          <div class="col-12 col-sm-2 d-none d-sm-block" v-for="(item, index) in nextEvents" :key='index'>
            <p class="next__events  p-2" @click="goto('event', item)">
              {{item.ds_evento}}
            </p>
          </div>
        </div>
      </div>
    </div>

  </section>

  <section id="section__slider">
    <div class="container pt-4">
      <!-- swiper -->
      <swiper :options="swiperOption">

        <swiper-slide v-for="(item, index) in bannerEvents" :key='index'>
          <div class="item__slide">
            <div class="row">
              <div class="col-md-8  col-xs-12 nopadding">
                  <span style="cursor: pointer" @click="goto('event',{ uri: item.uri})">
                    <img :src="item.img" alt="" style="width:100%;">
                  </span>
              </div>
              <div class="col-md-4 visible-md visible-lg" style="height:320px;padding:30px;">
                <h3 class="">{{item.ds_evento}}</h3>
                <div class="">
                  <div class="event-name pull-left">
                    <p> {{item.bannerDescription}} </p>
                    <div class="event-location-city">
                      <i class="fa fa-map-marker color-grey"></i>
                      {{item.ds_municipio}}, {{item.sg_estado}} </div>
                  </div>
                </div>
                <div class="button-event pt-4 w-100">
                  <button class="btn btn-sm btn-outline-dark w-70 mx-auto mx-0" @click="goto('event',{ uri: item.uri})" type="button">Comprar ingressos</button>

                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </section>

  <section class="features" data-block-type="features" data-id="3">
    <div class="container">
      <div class="row text-left pt-3 pb-1">
        <div class="col-12 col-sm-12 text-left">
          <h3>Gêneros em destaque</h3>
        </div>
        <div @click="goto('genre',item.genreName)" class="col-6 col-sm-2 card__container" style="" v-for="(item, index) in genreList" :key='index'>
          <p>
            <div alt="image" class="img-fluid rounded card__home" :class="['card__home-' + index]">
              <div alt="image" class="img-fluid rounded card__home card__home-0 img__inside" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }"></div>
            </div>
            <span class="genre">{{ item.genreName }}</span>
          </p>
        </div>
        <div @click="goto('genre','+')" class="col-6 col-sm-2 card__container  card__see-more" v-if="false">
          <p>
            <div alt="image" class="img-fluid rounded card__home">
            </div>
            <span class="genre">Ver mais</span>
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="fdb-block team-1">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12 text-left mt-2 mb-4">
          <h3 class="font-weight-bold">Eventos</h3>
        </div>

        <div class="col-10 col-md-3 pb-4 pl-1 pr-1 text-left" v-for="(item, index) in slideData" :key='index' @click="goto('event', item)">
          <div class="fdb-box p-0">
            <div class="img-fluid rounded-0" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }" style="background-size: cover;"></div>

            <div class="content p-1">
              <h4>
                <strong>{{ item.ds_evento }}</strong>
              </h4>
              <p class="p-0 m-0 h-200">{{ item.ds_nome_teatro }} </p>
              <p class="p-0 m-0 h-200 fa-xs "> {{ item.ds_municipio }}, {{ item.sg_estado }}</p>
            </div>
          </div>
        </div>
  
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
      slideData: [],
      cityList: [],
      localsList: [],
      genreList: [],
      nextEvents: [],
      bannerEvents: [],

      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: true,
        speed: 700,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 5000
        },
        breakpoints: {}
      }

    }
  },
  components: {
    AppSearch,
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
          //console.log(response);
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
        var key = keyFn(x),
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
          //console.log(response);
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
  }
};
</script>

<style lang="scss">
</style>
