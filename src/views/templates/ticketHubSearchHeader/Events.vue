<template>
<div class="a">
  <section id="" class="bg__main pt-4 pb-4">
    <div class="container">
      <!-- swiper -->
      <div v-if="!slideLoaded">
        <div class="item__slide">
          <div class="row">
            <div class="col-md-8 col-xs-12 nopadding slide__image" style="">
              <CarrouselLoader class="nopadding" style="padding: 0!important; border-top-left-radius: 5px" :speed="2" :animate="true" v-if="!slideLoaded"></CarrouselLoader>
            </div>
            <div class="col-md-4 d-none d-sm-block visible-md visible-lg to__slide nopadding" style="height:350px;padding:30px; margin-left: -15px;border-top-right-radius: 5px; border-bottom-right-radius: 5px; background-color: white">
              <CarrouselTextLoader class="col-12 nopadding" style="padding: 0!important; height: 320px; border-top-left-radius: 5px" :speed="2" :animate="true" v-if="!slideLoaded"></CarrouselTextLoader>

            </div>
          </div>
        </div>
      </div>
      <swiper :options="swiperOption" v-else>

        <swiper-slide v-for="(item, index) in bannerEvents" :key='index'>
          <div class="item__slide" style="">
            <div class="row">
              <div class="col-md-8  col-xs-12 nopadding">
                <span style="cursor: pointer" @click="goto('event',{ uri: item.uri})">
                    <img :src="item.img" class="slide__image" alt="" style="width:100%;">
                  </span>
              </div>
              <div class="col-md-4 d-none d-sm-block visible-md visible-lg to__slide" style="height:320px;padding:30px;">
                <h3 class="" style="font-size: 24px">{{item.ds_evento}}</h3>
                <div class="">
                  <div class="event-name pull-left">
                    <p v-html="item.bannerDescription"></p>
                    <div class="event-location-city">
                    </div>
                    <div class="event-location-city">
                      <i class="fa fa-map-marker color-grey"></i>
                      {{item.ds_nome_teatro}} -
                      {{item.ds_municipio}}, {{item.sg_estado}} </div>
                  </div>
                </div>
                <div class="button-event pt-4 w-100 to__slide-button" style="">
                  <button class="btn btn-sm btn-outline-dark w-70 mx-auto mx-0" @click="goto('event',{ uri: item.uri})" type="button">Comprar</button>
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
  <!-- <section class="features" style="background: white" data-block-type="features" data-id="3" v-if="siteName !== 'www.marketplay.club'">
    <div class="container">
      <div class="row text-left pt-3 pb-1">
        <div class="col-12 col-sm-12 text-left">
          <h3>Cidades em destaque</h3>
        </div>
        <div @click="goto('genre',item.ds_municipio)" class="col-6 col-sm-2 card__container" style="" v-for="(item, index) in cityList" :key='index'>
          <p>
            <div alt="image" class="img-fluid rounded card__home" :class="['card__home-' + index]">
            </div>
            <span class="genre">{{ item.ds_municipio }}</span>
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
  </section> -->
  <section class="features" style="background: white" data-block-type="features" data-id="3">
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
            <span class="genre" style="text-transform: uppercase">{{ item.genreName }}</span>
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
  <section class="to-block team-1">
    <div class="container">
      <div class="row row__events">
        <div class="col-12 col-sm-12 text-left mt-2 mb-4">
          <h3 class="font-weight-bold">Eventos</h3>
        </div>

        <div class="col-10 col-xl-4 col-md-6 pb-4 pl-2 pr-2 text-left" v-for="(item, index) in slideData" :key='index' @click="goto('event', item)">
          <div class="to-box p-0">
            <!-- <div class="event__date">
                <span class="day">12</span>
                <span class="month">AGO</span>
              </div> -->
            <div class="img-fluid rounded-0" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }" style="background-size: cover;"></div>

            <div class="content to-box p-2 pt-0 pb-2" style="position: relative">
              <h4 class="event__title pb-1">
                <strong>{{ item.ds_evento |  truncate(35, ' ...') }}</strong>
              </h4>
              <p class="p-0 m-0 event__item event__item-date"><span class="bold">{{item.datas |  replace('-', 'á')}}</span></p>
              <p class="p-0 pt-1 m-0 h-200 event__item event__item-local"><span class="bold" style="text-transform: capitalize !important">{{ item.ds_nome_teatro | capitalize() }} - {{ item.ds_municipio | capitalize() }},</span> {{ item.sg_estado }} </p>

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
      slideData: [],
      cityList: [],
      localsList: [],
      genreList: [],
      nextEvents: [],
      bannerEvents: [],

      swiperOption: {
        loop: true,
        autoplay: true,
        speed: 300,
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
    CarrouselTextLoader
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
        var key = keyFn(x).toUpperCase(),
          isNew = !mySet.has(key);
        if (isNew) mySet.add(key);
        return isNew;
      });
    },
    getCityList() {
      this.cityList = this.removeDuplicatesBy(x => x.ds_municipio, this.slideData);
      console.log(this.cityList);
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
