<template>
<div class="a">
  <section class="to-block to-viewport bg-dark bg__main pb-0" style="" data-block-type="call_to_action" data-id="2">
    <div class="container justify-content-center align-items-center d-flex p-4  pt-5 container__search--tickethub">
      <div class="col-10 justify-content-center text-center">
        <div class="d-none d-sm-block" style="">
          <h1>Procure experiências</h1>
        </div>
        <div class="d-none d-sm-block input-group mt-0 mb-3 p-2 w-100">
          <app-search></app-search>
        </div>
        <!-- <div class="mr-0 ml-0 mt-2 mb-0 p-0 justify-content-center row">
          <div class="col-12 col-sm-2 pb-0 mb-0 p-1 m-0 d-none d-sm-block" v-for="(item, index) in nextEvents" :key='index'>
            <p class="next__events p-1 pt-2 pb-2 mb-0" @click="goto('event', item)">
              {{item.ds_evento}}
            </p>
          </div>
        </div> -->
      </div>
    </div>

  </section>
  <!-- <card-city-list title="Cidades em Destaque" :cityList="cityList"></card-city-list> -->
  <div class="container-fluid container__select p-3 pb-0" style="border-bottom: 1px solid #e3e3e3">
    <div class="row pb-0">
      <div class="col-6 text-right select__city" style="border-right: 1px solid #e3e3e3;">
        <model-select :options="options" v-model="item" placeholder="Selecionar Cidade" @input="handleOnInput">
        </model-select>
      </div>
      <!-- <div class="col-12" style="margin:0 auto; display: flex; justify-content: center;"> -->
      <div class="col-6">
        <datepicker @selected="selectDate" placeholder="Escolher data" format="dd MM" :bootstrap-styling=true></datepicker>

      </div>
    </div>
  </div>
  <div class="container__select to-block">
    <div class="container p-0">
      <div class="row">
        <!-- <div class="col-12 col-xl-4 col-md-4 p-0 p-2 pt-3 text-left">
          <div class="to-box p-0">
            <div class="img-fluid rounded-0" style="background-size: cover; 		background: linear-gradient(135deg, #3d84db 50%, #01a1e7);height: 220px !important">
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-4 col-md-4 p-0 p-2 pt-3 text-left">
          <div class="to-box p-0">
            <div class="img-fluid rounded-0" style="background-size: cover; 		background: linear-gradient(135deg, #3d84db 50%, #01a1e7);height: 220px !important">
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-4 col-md-4 p-2 p-0 pt-3 text-left">
          <div class="to-box p-0">
            <div class="img-fluid rounded-0" style="background-size: cover; 		background: linear-gradient(135deg, #3d84db 50%, #01a1e7);height: 220px !important">
            </div>
          </div>
        </div> -->

        <div class="col-12 col-xl-12 text-left">
          <div class="p-3">
            <div class="img-fluid rounded-0 ad" style="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="features" style="background: white" data-block-type="features" data-id="3">
    <div class="container">
      <div class="row text-left pt-1 pb-1">
        <div class="col-12 col-sm-12 text-left mt-2 mb-2">
          <h3 class="">Explore nossos eventos</h3>
        </div>

        <div @click="goto('genre',item.genreName)" class="col-6 col-sm-2 p-0 card__container" style="" v-for="(item, index) in genreList" :key='index'>
          <p>
            <div alt="image" class="img-fluid rounded card__home" :class="['card__home-' + index]">
              <span class="genre__ingressaria" style="text-transform: uppercase">{{ item.genreName }}</span>
            </div>
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="to-block team-1 mt-2">
    <div class="container">
      <div class="row row__events">
        <div class="col-12 col-sm-12 text-left mt-2 mb-2">
          <h3 class="">Eventos em destaque <span style="font-size: 18.5px; color: #777;">{{searchTerm !== "" ? "(" + searchTerm + ")" : ""}}</span></h3>
          <p class="mt-3 mb-0 pb-0">Uma seleção de eventos {{searchTerm !== "" ? "em " + searchTerm : "próximos a você"}}</p>
        </div>
        <card-event v-for="(item, index) in filteredData" :key='index' :item="item"></card-event>
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
import Datepicker from 'vuejs-datepicker';

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
      filteredData: [],
      searchTerm: '',
      options: [],
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
    ModelSelect,
    AppSearch,
    CarrouselLoader,
    CarrouselTextLoader,
    CardEvent,
    BannerSlide,
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
    handleOnInput($event) {
      this.item = $event;

      if (this.item.value == "all") {
        this.filteredData = this.slideData;
        this.searchTerm = "";
        return;
      }

      this.filteredData = this.slideData.filter(x => x.ds_municipio == this.item.value);
      this.searchTerm = this.item.text;
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
      }
    },

    selectDate(data) {

      if (data == 'all') {
        this.filteredData = this.slideData;
        return;
      }

      var date = new Date(data);
      var slideData2 = [];
      var dates = [];

      var dataFormatada = ((date.getDate()) + '/' + ("0" + (date.getMonth() + 1)).slice(-2));

      // this.slideData.map(x => slideData2.push(x.datas.split(" - ")));

      // for (var i = 0; i < slideData2.length; i++) {
      //   for (var j = 0; j < slideData2[i].length; j++) {
      //     dates.push(slideData2[i][j]);
      //   }
      // }

      // dates = this.removeDuplicatesBy(x => x, dates);

      this.filteredData = this.slideData.filter(x => x.data == this.item.value);
      this.searchTerm = this.item.text;

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

      // // console.log(this.slideData);
      // var slideData2 = [];
      // this.slideData.map(x => slideData2.push(x.datas.split(" - ")));
      // var dates = [];

      // for (var i = 0; i < slideData2.length; i++) {
      //   for (var j = 0; j < slideData2[i].length; j++) {
      //       dates.push(slideData2[i][j]);
      //     }
      // }

      // console.log(this.removeDuplicatesBy(x => x, dates));

      // this.optionsDate = dates;
      // this.optionsDate.push({
      //   value: slideData2[i][j],
      //   text: slideData2[i][j]
      // })
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

          this.filteredData = this.slideData;
          this.populateCityPicker();

          console.log(this.slideData);
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
