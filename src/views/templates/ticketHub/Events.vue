<template>
<div class="a">
  <section class="fdb-block fdb-viewport bg-dark bg__purple" style="" data-block-type="call_to_action" data-id="2">
    <div class="container justify-content-center align-items-center d-flex p-5">
      <div class="col-10 justify-content-center text-center">
        <div class="d-none d-sm-block" style="">
          <h2>O quê deseja encontrar ?</h2>
        </div>
        <div class="d-none d-sm-block input-group mt-4 mb-4 p-3 w-100">
          <app-search></app-search>
        </div>
        <div class="mr-0 ml-0 mt-4 mb-0 p-0 w-100 justify-content-center row">
          <div class="col-12 col-sm-2" v-for="(item, index) in nextEvents" :key='index'>
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
                <a href="" target="_blank">
                    <img :src="item.img" alt="" style="width:100%;">
                  </a>
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
  <section class="features" data-block-type="features" data-id="3">
    <div class="container">
      <div class="row text-left pt-3 pb-1">
        <div class="col-12 col-sm-12 text-left">
          <h3>Locais em destaque</h3>
        </div>
        <div @click="goto('local',item.ds_nome_teatro)" class="col-6 col-sm-2 card__container" style="" v-for="(item, index) in localsList" :key='index'>
          <p>
            <div alt="image" class="img-fluid rounded card__home" :class="['card__home-' + index]">
              <div alt="image" class="img-fluid rounded card__home card__home-0 img__inside" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }"></div>
            </div>
            <span class="genre">{{ item.ds_nome_teatro }}</span>
          </p>
        </div>

        <div @click="goto('local','+')" class="col-6 col-sm-2 card__container  card__see-more" v-if="false">
          <p>
            <div alt="image" class="img-fluid rounded card__home">
            </div>
            <span class="genre">Ver mais</span>
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="features" data-block-type="features" data-id="3">
    <div class="container">
      <div class="row text-left pt-3 pb-5">
        <div class="col-12 col-sm-12 text-left">
          <h3>Cidades em destaque</h3>
        </div>
        <div @click="goto('city',item.ds_municipio)" class="col-6 col-sm-2 card__container" style="" v-for="(item, index) in cityList" :key='index'>
          <p>
            <div class="img-fluid rounded card__home" :class="['card__home-' + index]">
              <div alt="image" class="img-fluid rounded card__home card__home-0 img__inside" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }"></div>
            </div>
            <span class="genre">{{ item.ds_municipio }}</span>
          </p>
        </div>

        <div @click="goto('city','+')" class="col-6 col-sm-2 card__container card__see-more" v-if="false">
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

        <div class="col-sm-3 pb-4 text-left" v-for="(item, index) in slideData" :key='index' @click="goto('event', item)">
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
        speed: 900,
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
.fdb-box {
  cursor: pointer;
}

svg:not(:root).svg-inline--fa {
  overflow: visible
}

.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -.125em
}

.svg-inline--fa.fa-lg {
  vertical-align: -.225em
}

.svg-inline--fa.fa-w-1 {
  width: .0625em
}

.svg-inline--fa.fa-w-2 {
  width: .125em
}

.svg-inline--fa.fa-w-3 {
  width: .1875em
}

.svg-inline--fa.fa-w-4 {
  width: .25em
}

.svg-inline--fa.fa-w-5 {
  width: .3125em
}

.svg-inline--fa.fa-w-6 {
  width: .375em
}

.svg-inline--fa.fa-w-7 {
  width: .4375em
}

.svg-inline--fa.fa-w-8 {
  width: .5em
}

.svg-inline--fa.fa-w-9 {
  width: .5625em
}

.svg-inline--fa.fa-w-10 {
  width: .625em
}

.svg-inline--fa.fa-w-11 {
  width: .6875em
}

.svg-inline--fa.fa-w-12 {
  width: .75em
}

.svg-inline--fa.fa-w-13 {
  width: .8125em
}

.svg-inline--fa.fa-w-14 {
  width: .875em
}

.svg-inline--fa.fa-w-15 {
  width: .9375em
}

.svg-inline--fa.fa-w-16 {
  width: 1em
}

.svg-inline--fa.fa-w-17 {
  width: 1.0625em
}

.svg-inline--fa.fa-w-18 {
  width: 1.125em
}

.svg-inline--fa.fa-w-19 {
  width: 1.1875em
}

.svg-inline--fa.fa-w-20 {
  width: 1.25em
}

.svg-inline--fa.fa-pull-left {
  margin-right: .3em;
  width: auto
}

.svg-inline--fa.fa-pull-right {
  margin-left: .3em;
  width: auto
}

.svg-inline--fa.fa-border {
  height: 1.5em
}

.svg-inline--fa.fa-li {
  width: 2em
}

.svg-inline--fa.fa-fw {
  width: 1.25em
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -.125em;
  width: 1em
}

.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
  transform-origin: center center
}

.fa-layers-counter,
.fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
  transform-origin: center center
}

.fa-layers-counter {
  background-color: #ff253a;
  border-radius: 1em;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  height: 1.5em;
  line-height: 1;
  max-width: 5em;
  min-width: 1.5em;
  overflow: hidden;
  padding: .25em;
  right: 0;
  text-overflow: ellipsis;
  top: 0;
  -webkit-transform: scale(.25);
  transform: scale(.25);
  -webkit-transform-origin: top right;
  transform-origin: top right
}

.fa-layers-bottom-right {
  bottom: 0;
  right: 0;
  top: auto;
  -webkit-transform: scale(.25);
  transform: scale(.25);
  -webkit-transform-origin: bottom right;
  transform-origin: bottom right
}

.fa-layers-bottom-left {
  bottom: 0;
  left: 0;
  right: auto;
  top: auto;
  -webkit-transform: scale(.25);
  transform: scale(.25);
  -webkit-transform-origin: bottom left;
  transform-origin: bottom left
}

.fa-layers-top-right {
  right: 0;
  top: 0;
  -webkit-transform: scale(.25);
  transform: scale(.25);
  -webkit-transform-origin: top right;
  transform-origin: top right
}

.fa-layers-top-left {
  left: 0;
  right: auto;
  top: 0;
  -webkit-transform: scale(.25);
  transform: scale(.25);
  -webkit-transform-origin: top left;
  transform-origin: top left
}

.fa-lg {
  font-size: 1.33333em;
  line-height: .75em;
  vertical-align: -.0667em
}

.fa-xs {
  font-size: .75em
}

.fa-sm {
  font-size: .875em
}

.fa-1x {
  font-size: 1em
}

.fa-2x {
  font-size: 2em
}

.fa-3x {
  font-size: 3em
}

.fa-4x {
  font-size: 4em
}

.fa-5x {
  font-size: 5em
}

.fa-6x {
  font-size: 6em
}

.fa-7x {
  font-size: 7em
}

.fa-8x {
  font-size: 8em
}

.fa-9x {
  font-size: 9em
}

.fa-10x {
  font-size: 10em
}

.fa-fw {
  text-align: center;
  width: 1.25em
}

.fa-ul {
  list-style-type: none;
  margin-left: 2.5em;
  padding-left: 0
}

.fa-ul>li {
  position: relative
}

.fa-li {
  left: -2em;
  position: absolute;
  text-align: center;
  width: 2em;
  line-height: inherit
}

.fa-border {
  border: solid .08em #eee;
  border-radius: .1em;
  padding: .2em .25em .15em
}

.fa-pull-left {
  float: left
}

.fa-pull-right {
  float: right
}

.fa.fa-pull-left,
.fab.fa-pull-left,
.fal.fa-pull-left,
.far.fa-pull-left,
.fas.fa-pull-left {
  margin-right: .3em
}

.fa.fa-pull-right,
.fab.fa-pull-right,
.fal.fa-pull-right,
.far.fa-pull-right,
.fas.fa-pull-right {
  margin-left: .3em
}

.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear
}

.fa-pulse {
  -webkit-animation: fa-spin 1s infinite steps(8);
  animation: fa-spin 1s infinite steps(8)
}

@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0)
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg)
  }
}

@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0)
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg)
  }
}

.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg)
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg)
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg)
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
  transform: scale(-1, 1)
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
  transform: scale(1, -1)
}

.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
  transform: scale(-1, -1)
}

:root .fa-flip-horizontal,
:root .fa-flip-vertical,
:root .fa-rotate-180,
:root .fa-rotate-270,
:root .fa-rotate-90 {
  -webkit-filter: none;
  filter: none
}

.fa-stack {
  display: inline-block;
  height: 2em;
  position: relative;
  width: 2.5em
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em
}

.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em
}

.fa-inverse {
  color: #fff
}

.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px
}

.sr-only-focusable:active,
.sr-only-focusable:focus {
  clip: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  position: static;
  width: auto
}

.fdb-block {
  overflow: unset !important;
  padding: 0 !important;
  padding-bottom: 30px !important;
  margin: 0 !important;
}

.genre {
  position: absolute;
  /* top: 0; */
  left: 20px;
  top: 20px;
  color: white;
  font-weight: bold;
  /* background: white; */
  font-size: 14px;
}

.logo {
  width: 100px;
}

.header {
  padding-top: 0 !important;
}


.fdb-block .fdb-box {
  height: 100%;
  transition: 0.5s;

  .img-fluid {
    height: 170px;
    background-position: center;
  }

  h4 {
    font-size: 0.8rem;
    padding-top: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  &:hover {
    transform: translateY(-2px);
  }

  p {
    font-size: 0.7rem;
    justify-self: bottom;
  }
}

.bg__purple {
  background-image: url('../../../assets/bg.svg')
}

.card__home {
  cursor: pointer;

  background-size: cover !important;
  height: 80px;
  width: 100%;
  transition: 0.5s;

  &:hover {
    box-shadow: 0px 4.32762px 4.32762px rgba(0, 0, 0, 0.25) !important;
  }
}

.item__slide {
  border-radius: 10px;
  background: #f8f8f8;
  box-shadow: 0px 4.32762px 4.32762px rgba(0, 0, 0, 0.12) !important;
  width: 97%;
  margin: 0 auto;

  img {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    max-height: 350px;

  }

  h3 {
    font-size: 2rem;
  }
}

.card__home-0 {
  background: url('https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//hero/yellow.svg');
}

.card__home-1 {
  background: url('https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//hero/red.svg');
}

.card__home-2 {
  background: url('https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//hero/blue.svg');
}

.card__home-3 {
  background: url('https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//hero/red.svg');
}

.card__home-4 {
  background: url('https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//hero/purple.svg');
}

.v-suggestions input[type=text] {
  width: 95%;
  background: white url(/assets/icons/search.svg) no-repeat 10px center;
  height: 35px;
  color: black;
}

.v-suggestions {
  box-sizing: border-box;
}

.v-suggestions input[type=text]:focus {
  width: calc(100% - 41px);
  padding-right: 0 !important;
  padding-left: 30px !important;
}

.v-suggestions .items {
  max-height: 400px;
  color: #555;
}

p.next__events {
  font-size: 10px;
  color: white;
  font-weight: bold;
  border: 1px solid white;
  border-radius: 5px;
  transition: 0.7s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    background: white;
    color: #222;
  }
}

.img__inside {
  margin-right: -13px;
  width: 60px;
  height: 60px;
  background: black;
  float: right;
  margin-top: 28px;
  transform: rotateY(360deg) rotate(40deg);
  box-shadow: 0px 4.32762px 4.32762px rgba(0, 0, 0, 0.25) !important;
  transition: 0.5s;

  &:hover {
    transform: rotateY(360deg) rotate(30deg);
  }
}

.img-fluid.rounded-0::before,
.img-fluid.rounded-0::after {
  content: "";
  background-repeat: repeat;
  filter: blur(3px);
  z-index: 1;
}

input:-moz-placeholder {
  color: #333;
}

input::-webkit-input-placeholder {
  color: #333;
}

.swiper-container {}

.swiper-wrapper {
  float: left !important;
  padding-bottom: 3ex;
  padding-left: 1px;
  -webkit-transition-timing-function: linear !important;
  -o-transition-timing-function: linear !important;
  transition-timing-function: linear !important;
}

.swiper-button-prev,
.swiper-button-next {
  right: 0;
  background-color: transparent;
  transition: 0.5s;

  &:focus {
    outline: none;
  }

  img {
    height: 40px;
    transition: 0.4s;

    &:hover {
      opacity: 0.9;
    }
  }
}

.swiper-button-prev,
.swiper-container-rtl,
.swiper-button-next {
  background-image: none !important;
}

.swiper-button-next {

  img {
    &:focus {
      transform: translateX(3px);
      opacity: 0.7;
    }

    &:hover {
      transform: translateX(2px);
    }
  }
}

.swiper-button-prev {

  img {
    &:focus {
      transform: translateX(-2px);
      opacity: 0.7;
    }

    &:hover {
      transform: translateX(-2px);
    }
  }
}

.swiper-button-disabled {
  display: none;
}

.swiper-pagination-bullet {
  margin: -10px 8px !important;
  height: 10px !important;
  width: 10px !important;

  &:hover {}
}

.swiper-pagination-bullet-active {
  background: #444;
}

.fdb-viewport {
  padding-bottom: 150px !important;
}

#section__slider {
  margin-top: -150px;
}

.card__see-more {
  .card__home {
    background: url('https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//hero/blue.svg');
    filter: grayscale(5);
  }

}

h3 {
  font-size: 1.8rem;
  font-weight: 18px;

}

body {
  background: #f8f8f8;
}

</style>
