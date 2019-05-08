<template>
<div>
  <section class="fdb-block team-6" data-block-type="teams" data-id="3" draggable="true" id="block_features">
    <div class="container">
      <h2 class="justify-content-center text-center pb-0 mb-0">Destaque</h2>
      <div class="row text-center p-0">
        <div class="col-12 col-md-4 p-3" v-for="(item, index) in bannerEvents" :key='index'>
          <div class="col-12 card_destaques" @click="goto('event',{ uri: item.uri})" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }" style="">
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--
    <div class="container-fluid" id="ad_container">
      <div class="container p-0">
        <div class="row">
          <div class="col-6 pr-0 col-lg-6 text-left">
            <div class="p-1 pr-0 mt-0 mb-0 pb-0">
            
              <img class="img-fluid rounded-0 discovery" src="/assets/texture/ad-1.jpg">
            </div>
          </div>
          <div class="col-6 pl-0 col-lg-6 text-left">
            <div class="p-1 pl-0 mt-0 mb-0 pb-0">
              
              <img class="img-fluid rounded-0 discovery" src="/assets/texture/ad-1.jpg">
            </div>
          </div>
        </div>
      </div>
    </div>
    -->
  <!-- <section class="fdb-block" data-block-type="teams" data-id="3" draggable="false" id="block_calendar">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="row justify-content-center">
              <h2 class="text-center">
                Calendário de eventos
              </h2>
      
            </div>
      
          </div>
          <div class="col-3 row p-0">
          </div>
        </div>
        <div class="row p-0">
          <div class="col-1 col_calendar_date">
            <div class="calendar_date text-center active" @click="changeSelectedCalendar(filteredCalendar[0])">{{filteredCalendar[0].datas}}</div>
            <div class="calendar_date text-center" @click="changeSelectedCalendar(filteredCalendar[1])">{{filteredCalendar[1].datas}}</div>
            <div class="calendar_date text-center" @click="changeSelectedCalendar(filteredCalendar[2])">{{filteredCalendar[2].datas}}</div>
            <div class="calendar_date text-center">ver <br> mais</div>
            </div>
            <div class="col-11">
              <div class="row p-0">
                <div class="col-6 calendar_img" :style="{ background: 'rgba(0, 0, 0, .65) url(\'' + selectedCalendar.img + '\')' }">
      
                </div>
                <div class="col-6 calendar_features">
                  <div class="calendar_features-title">{{selectedCalendar.ds_evento}}</div>
                  <div class="calendar_features-text" v-html="selectedCalendar.bannerDescription"></div>
                  <div class="calendar_features-social">
                    <p>Compartilhar</p>
                    <div class="row text-left" id="share">
                      <a class="facebook" :href="linkFacebook" target="blank"><i class="fab fa-facebook-f"></i></a>
                      <a class="twitter" :href="linkTwitter" target="blank"><i class="fab fa-twitter"></i></a>
                      <a class="pinterest" :href="linkPinterest" target="blank"><i class="fab fa-pinterest-p"></i></a>
      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
        </div>
      </section> -->
  <div class="container-fluid pt-0 mt-0" id="ad_container">
    <div class="container p-0">
      <div class="row">
        <div class="col-12 col-xl-12 text-left">
          <div class="p-1 pt-0 mt-0 mb-0 pb-0">
            <!-- <img class="img-fluid rounded-0 discovery" v-bind:src="discoveryBanner[0].imageURI" :alt="discoveryBanner[0].title"> -->
            <img class="img-fluid rounded-0 discovery" src="/assets/texture/ad-1.jpg">
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="fdb-block team-4" id="block_events">
      <div class="container pt-3">
        <div class="row text-center mt-0">
          <div class="col-4 block_events-categories" @click="getListNext"><span :class="[{active: activeCategory == 1}]"  >Próximos eventos</span></div>
          <div class="col-4 block_events-categories"  @click="getListCreated"><span :class="[{active: activeCategory == 2}]">Lançamentos</span></div>
          <div class="col-4 block_events-categories" @click="getLastChance"><span :class="[{active: activeCategory == 3}]" >Ultimas chances</span></div>

          <div class="col-12 col-md-4 card__eventos-container" v-for="(item, index) in featuredData" :key='index' :item="item" v-if="item.isdiscovery == 0" @click="goto('event', item)">
            <div class="p-0 card__eventos" :style="{ background: 'rgba(0, 0, 0, .65) url(\'' + item.img + '\')' }">
              <div class="card__eventos-btn">
                <i class="fa fa-cart-plus"></i>
              </div>
              <div class="card__eventos-nome">
                {{item.ds_evento}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="fdb-block team-4" id="block_events">
      <div class="container pt-3">
        
      <h2 class="justify-content-center text-center pb-0 mb-2 white--text" style="color: white">Todos os eventos</h2>
        <div class="row text-center mt-0">
        
          <div class="col-12 col-md-4 card__eventos-container" v-for="(item, index) in computedFilteredData" :key='index' :item="item" v-if="item.isdiscovery == 0" @click="goto('event', item)">
            <div class="p-0 card__eventos" :style="{ background: 'rgba(0, 0, 0, .65) url(\'' + item.img + '\')' }">
              <div class="card__eventos-btn">
                <i class="fa fa-cart-plus"></i>
              </div>
              <div class="card__eventos-nome">
                {{item.ds_evento}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container-fluid" id="ad_container">
      <div class="container p-0">
        <div class="row">
          <div class="col-12 col-xl-12 text-left p-0">
            <div class="p-1 mt-3 mb-0 pb-0">
              <!-- <img class="img-fluid rounded-0 discovery" v-bind:src="discoveryBanner[0].imageURI" :alt="discoveryBanner[0].title"> -->
              <img class="img-fluid rounded-0 discovery" src="/assets/texture/ad-1.jpg">
            </div>
            </div>
          </div>
        </div>
      </div>
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
      featuredData: [],
      linkFacebook: '',
      linkTwitter: '',
      linkLinkedin: '',
      linkPinterest: '',
      siteName: config.info.siteName,
      discoveryBanner: '',
      slideLoaded: false,
      genreListLoaded: false,
      discovery: [],
      activeCategory: 1,
      slideData: [],
      selectedCalendar: [],
      filteredCalendar: [],
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
    generateSocialLinks() {

      let url = window.location;
      // let title = escape(this.event.NomPeca);
      let title = 'teste';
      // let media = this.event.img;
      let media = 'teste';

      this.linkFacebook = "https://www.facebook.com/share.php?u=" + url + "&title=" + title;
      this.linkLinkedin = "https://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + title + "&source=source";
      this.linkTwitter = "https://twitter.com/intent/tweet?text=" + title + "&url=" + url;
      this.linkPinterest = "https://pinterest.com/pin/create/bookmarklet/?media=" + media + "&url=" + url + "&is_video=false&description=";
    },
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
        case "search":
          this.$router.push("/busca/evento/" + item)
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
    filterEventsCalendar() {

    },
    getListResultAgain() {
      eventService.list(this.locale.city.name, this.locale.state.name).then(
        response => {
          this.slideData = response.filter(x => x.id_genre !== undefined && x.id_genre !== null);
          this.hideWaitAboveAll();

          this.activeCategory = 1;
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
    changeSelectedCalendar(event) {
      this.selectedCalendar = event;
    },
    getBanner() {
      eventService.banner(this.locale.city.name, this.locale.state.name).then(
        response => {
          this.bannerEvents = response.slice(0, 6);
          this.slideLoaded = true;

          this.filteredCalendar = this.bannerEvents.slice(0, 3);
          // debugge
          this.filteredCalendar.map(x => {
            x.datas = x.datas.split(' - ')[0];
          });

          // console.log(this.filteredCalendar);

          this.selectedCalendar = this.filteredCalendar[0];

          // console.log("banner v");
          // console.log(this.bannerEkvents);

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
          // console.log(this.discovery);
        },
        error => {
          this.toastError("Falha na execução.");
        }
      );
    },
    getLastChance() {
      eventService.list(null, null, null, 'created').then(
        response => {
          this.isLoaded = false;

          this.slideData = response.filter(x => x.id_genre !== undefined && x.id_genre !== null && x.datas.split(' - ')[1] == undefined);

          this.featuredData = this.slideData.slice(0,9);

          this.hideWaitAboveAll();
          this.isLoaded = true;

          console.log(this.slideData);
          this.activeCategory = 3;
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
    getFeaturedEvents() {
      eventService.list().then(
        response => {
          this.isLoaded = false;

          this.slideData = response.filter(x => x.id_genre !== undefined && x.id_genre !== null);

          this.featuredData = this.slideData.slice(0,9);

          this.hideWaitAboveAll();
          this.isLoaded = true;

          // console.log(this.slideData);
          this.activeCategory = 1;
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
    getListCreated() {

      eventService.list(null, null, null, 'created').then(
        response => {
          this.isLoaded = false;

          this.slideData = response.filter(x => x.id_genre !== undefined && x.id_genre !== null);

          this.featuredData = this.slideData.slice(0,9);

          this.hideWaitAboveAll();
          this.isLoaded = true;

          this.activeCategory = 2;
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
    getListNext() {

      eventService.list(null, null, null, 'next').then(
        response => {
          this.isLoaded = false;

          this.slideData = response.filter(x => x.id_genre !== undefined && x.id_genre !== null);

          this.featuredData = this.slideData.slice(0,9);

          this.hideWaitAboveAll();
          this.isLoaded = true;

          this.activeCategory = 1;
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
    
    getListResults(callback) {

      this.getLocation(this.getListResultAgain);

      eventService.list(this.locale.city.name, this.locale.state.name).then(
        response => {
          this.slideData = response.filter(x => x.id_genre !== undefined && x.id_genre !== null);

          this.filteredData = this.slideData;
          this.featuredData = this.slideData.slice(0,9);

          this.hideWaitAboveAll();
          this.isLoaded = true;

          this.getCityList();
          this.getGenreList();
          this.getLocalsList();
          this.getNextEvents();

          this.populateCityPicker();
this.getListNext();
          // this.filterEventsCalendar();

          this.activeCategory = 1;

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
    // var navbar = $('#navbar'),
    //   distance = navbar.offset().top,
    //   $window = $(window);

    // $window.scroll(function () {
    //   if ($window.scrollTop() >= 140) {
    //     navbar.removeClass('navbar-fixed-top').addClass('navbar-fixed-top');
    //   } else {
    //     navbar.removeClass('navbar-fixed-top');
    //   }
    // });

    this.generateSocialLinks();
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
    },
    filterFirstDate: function (value) {
      debugger
      if (!value) return ''
      value = value.split(' - ').join('');
      return value[0];
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
