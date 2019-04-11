<template>
<div>
<section class="fdb-block team-6" data-block-type="teams" data-id="3" draggable="true">
  <div class="container">

    <div class="row text-center mt-5 p-0 m-0">
      <div class="col-4 p-0 m-0 card_destaques">
        <img alt="image" class="img-fluid rounded" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//people/9.jpg">
       
      </div>

      <div class="col-4 p-0 m-0 card_destaques">
        <img alt="image" class="img-fluid rounded" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//people/1.jpg">
        
      </div>

      <div class="col-4 p-0 m-0 card_destaques">
        <img alt="image" class="img-fluid rounded" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//people/3.jpg">
        
      </div>
    </div>
  </div>
</section>
<section class="fdb-block team-4" data-block-type="teams" data-id="4" draggable="true">
  <div class="container">
    <div class="row text-center justify-content-center">
      <div class="col-8">
        <h1>Team</h1>
      </div>
    </div>

    <div class="row text-center mt-5">
      <div class="col-3">
        <img alt="image" class="img-fluid rounded" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//people/5.jpg">
        <h3><strong>John Smith</strong></h3>
        <p>Position</p>
        <p>A wonderful serenity has taken possession of my entire soul.</p>
      </div>

      <div class="col-3">
        <img alt="image" class="img-fluid rounded" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//people/6.jpg">
        <h3><strong>John Smith</strong></h3>
        <p>Position</p>
        <p>Pityful a rethoric question ran over her cheek.</p>
      </div>

      <div class="col-3">
        <img alt="image" class="img-fluid rounded" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//people/3.jpg">
        <h3><strong>John Smith</strong></h3>
        <p>Position</p>
        <p>And if she hasn’t been rewritten, then they are still using her.</p>
      </div>

      <div class="col-3">
        <img alt="image" class="img-fluid rounded" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//people/2.jpg">
        <h3><strong>John Smith</strong></h3>
        <p>Position</p>
        <p>Wild Question Marks, but the Little Blind Text didn’t listen.</p>
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

      console.log(this.localsList);
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
