<template>
<div class="content">
  <div class="row">
    <Logo></Logo>
    <div class="col-12 col-md-9">
      <SlideItemLoader class="container__placeholder" v-if="!isLoaded" :speed="2" :animate="true" style="height: 245px; padding-top: 15px"></SlideItemLoader>
      <!-- <SlideItemLoader v-if="!isLoaded" :speed="2" :animate="true" style="height: 250px; width: 100%"></SlideItemLoader> -->
      <div v-else class=" container__carousel">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in slideData" :key='index'>
                  <div  class="container__cards slide">
                    <div class="cards">
                      <div class="rootLink"></div>
                      <article class="cardexp">
                        <div class="thumb" :style="{ backgroundImage: 'url(http://teatroitalia.com.br/wp-content/uploads/2018/10/natalcomasestrelas.jpg)' }"></div>
                        <div class="infos">
                         
                          <h2 class="title"> {{ item.ds_evento }}</h2>
                          <h3 class="date"> {{item.datas}} </h3>
                          <h3 class="date">
                            {{ item.ds_nome_teatro }}
                            <br> {{ item.ds_municipio }}, {{ item.sg_estado }}
                          </h3>
                          <h3 class="details">
                            <button type="button" class="btn btn-light btn-sm" @click="goto(item)">
                              Comprar
                            </button>
                          </h3>
                        </div>
                      </article>
                    </div>
                  </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxOCAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMy4yMzcgMTcuMjM3di0yLjQ3NGwxNCAxNGMuNjg0LjY4My42ODQgMS43OSAwIDIuNDc0LS42ODMuNjg0LTEuNzkuNjg0LTIuNDc0IDBsLTE0LTE0Yy0uNjg0LS42ODMtLjY4NC0xLjc5IDAtMi40NzRsMTQtMTRjLjY4My0uNjg0IDEuNzktLjY4NCAyLjQ3NCAwIC42ODQuNjgzLjY4NCAxLjc5IDAgMi40NzRsLTE0IDE0eiIgZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSIjRUZGMUYxIi8+PC9zdmc+" alt="">
          </div>
          <div class="swiper-button-next" slot="button-next">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxOCAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQuNzYzIDE3LjIzN3YtMi40NzRsLTE0IDE0Yy0uNjg0LjY4My0uNjg0IDEuNzkgMCAyLjQ3NC42ODMuNjg0IDEuNzkuNjg0IDIuNDc0IDBsMTQtMTRjLjY4NC0uNjgzLjY4NC0xLjc5IDAtMi40NzRsLTE0LTE0QzIuNTU0LjA4IDEuNDQ3LjA4Ljc2My43NjNjLS42ODQuNjgzLS42ODQgMS43OSAwIDIuNDc0bDE0IDE0eiIgZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSIjRUZGMUYxIi8+PC9zdmc+" alt="">
          </div>
        </swiper>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
//import Slick from "vue-slick";
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";
//import json from "@/assets/testJson.json";
import Logo from "@/components/App-logo.vue";
import { func } from '@/functions';
import SlideItemLoader from '@/components/loaders/SlideItemLoader.vue';

import {
  eventService
} from "@/components/common/services/event";

Vue.use(VueAwesomeSwiper, /* { default global options } */);


// require styles
export default {
  name: "AppSlider",
  mixins:[func],
  components: {
    //Slick,
    Logo,
    SlideItemLoader
  },
  data() {
    return {
      slideData: [],
      isLoaded: false,
      swiperOption: {
        speed: 3000,
        infinite: true,
        spaceBetween: 1,
        mousewheel: true,
        freeMode: false,
        centeredMode: false,
        lazy: true,
          waitForTransition: false,
                  mousewheel: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        //autoplay: {
        //  delay: 400,
        //  disableOnInteraction: true
        //},
        breakpoints: {
          3000: {
            slidesPerView: 6.5,
            slidesPerColumn: 3,
            spaceBetween: 5
          },
          2400: {
            slidesPerView: 6.5,
            slidesPerColumn: 3,
            spaceBetween: 5
          },
          2000: {
            slidesPerView: 4.3,
            slidesPerColumn: 3,
            spaceBetween: 8
          },
          1600: {
            slidesPerView: 4,
            slidesPerColumn: 3,
            spaceBetween: 8
          },
          1500: {
            slidesPerView:3.5,
            slidesPerColumn: 3,
            spaceBetween: 8
          },
          1400: {
            slidesPerView: 3,
            slidesPerColumn: 3,
            spaceBetween: 10,
          },
          1300: {
            slidesPerView: 3,
            slidesPerColumn: 3,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 2.5,
            slidesPerColumn: 3,
            spaceBetween: 10
          },
          1100: {
            slidesPerView: 2.5,
            slidesPerColumn: 3,
            spaceBetween: 10
          },
          980: {
            slidesPerView: 2.2,
            slidesPerColumn: 2,
            spaceBetween: 5
          },
          900: {
            slidesPerView: 2,
            slidesPerColumn: 2,
            spaceBetween: 5
          },
          800: {
            slidesPerView: 1,
            slidesPerColumn: 2,
            speed: 50,
            spaceBetween: 5,
            mousewheel: false,
          },
        }
      }

    };
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
    goto(item) {
      this.$router.push(item.uri);
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
    getListResults() {

      this.getLocation(this.getListResultAgain);
  
      eventService.list(this.locale.city.name, this.locale.state.name).then(
        response => {
          this.slideData = response;
          this.hideWaitAboveAll();
          //console.log(response);
          this.isLoaded = true;
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
}
</script>

<style lang="scss" scoped>
.slick-created {
  transition: transform 0.3s linear;
  transition-delay: 0.5s;
}

ul li:not(.slick-current) .content {
  transform: scale(0.9);
  transition-delay: 0s;
}
.swiper-container {

}
.swiper-wrapper {
  float: left!important;
  padding-bottom: 3ex;
  padding-left: 1px;  
  -webkit-transition-timing-function: linear !important;
  -o-transition-timing-function: linear !important;
  transition-timing-function: linear !important;
}
.swiper-button-prev, .swiper-button-next {
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

.swiper-button-prev, .swiper-container-rtl, .swiper-button-next {
  background-image: none!important;
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

</style>
