<template>
<div class="a">
  <div class="content" v-if="template == 'tixs'">
    <div class="row">
      <Logo></Logo>
      <div class="col-md-10 col-xs-12">
        <div class="row search__title">
          <div class="col-md-6">
            <p class="result__container" v-if="siteName !== 'Tixs.ME'">Resultados encontrados para:
              <span class="result__description">"{{ searchValue }}"</span>
              <br>
              <span class="result__count">{{ countEvents }} {{textForCount}}</span>
            </p>
            <div class="result__button-group pl-0 ">
              <button type="button" class="btn btn-dark btn-sm btn__search" v-on:click="toggleFilter('card')" v-bind:class="{ active: !filterCards }">Cartões</button>
              <button type="button" class="btn btn-dark btn-sm btn__search" v-on:click="toggleFilter('lists')" v-bind:class="{ active: !filterLists }">Listas</button>
            </div>
          </div>
        </div>

        <div class="col-md-10 p-0 col-12" v-if="!isLoaded">
          <div class="row container__search">
            <div class="col-6 col-lg-3 col-md-3 col-xs-12">
              <SearchItemLoader :speed="2" :animate="true" style="height: 245px; padding-top: 15px"></SearchItemLoader>
            </div>
          </div>
        </div>
        <div class="col-md-10 p-0 col-12" v-else>
          <div class="row container__search" v-if="!filterCards">
            <div class="" v-for="(item, index) in searchResults" :key="index">
              <div class="search__card" style="margin-left: 15px; margin-right: 5px">

                <div class="rootLink"></div>
                <article class="cardexp">
                  <div class="thumb" :style="{ backgroundImage: 'url(\'' + item.cardimage + '\')' }"></div>
                  <div class="infos">
                    <!-- <span class="flag">
                        <img v-for="(ibadge, index) in item.badge" :key="'badge'+index" :src="ibadge.img" :title="ibadge.tag" :alt="ibadge.tag">
                        <img v-for="(ipromo, index) in item.promo" :key="'promo'+index" :src="ipromo.img" :title="ipromo.tag" :alt="ipromo.tag">
                      </span> -->
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
          </div>
        </div>
        <div class="row container__search-list" v-if="!filterLists">
          <div class="search__list-item col-md-12 col-lg-12 col-xl-10 p-0">
            <div class="card col-12 col-md-11 col-lg-10 col-xs-10" v-for="(item, index) in searchResults" :key="index">
              <div class="card-body row">
                <div class="col-2 col-md-1 card__date">
                  <img :src=item.cardimage alt="">
                </div>
                <div class="col-8 col-md-8 card__description">
                  {{ item.ds_evento }}
                  <br> {{item.datas}} - {{ item.ds_local_evento }} - {{ item.ds_municipio }}
                  <br>
                  <span class="flag">
                      <img v-for="(ibadge, index) in item.badge" :key="index" :src="ibadge.img" :alt="ibadge.tag">
                    </span>
                </div>
                <div class="col-md-3 text-center card__btn">
                  <button type="button" class="btn btn-outline-light btn-sm" @click="goto(item)">
                      Comprar
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="template == 'ingressaria' || template == 'ticketHubVideo'">
    <section class="to-block to-viewport bg-dark bg__main" style="" data-block-type="call_to_action" data-id="2">
      <div class="container justify-content-center align-items-center d-flex pt-5 pb-0 mb-0 h-25">
        <div class="col-10 justify-content-center text-center">
          <div class="d-none d-sm-block" style="">
            <h2>Deseja encontrar outro evento ?</h2>
          </div>
          <div class="d-none d-sm-block input-group mt-4 mb-0 p-1 w-100">
            <app-search></app-search>
          </div>
        </div>
      </div>

    </section>
    <section class="to-block fdb_result">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 pb-1 text-left mt-4">
            <h3 class="result__container mb-1">Resultados encontrados para:
              <span class="result__description">"{{ searchValue }}"</span>
              <br>
            </h3>
              <p><span class="mt-3 pt-3">{{ countEvents }} {{textForCount}}</span></p>
          </div>
        </div>
        <div class="row">
          
          <card-event v-for="(item, index) in searchResults" :key='index' :item="item"></card-event>

        </div>
      </div>
    </section>
  </div>
  <div v-else-if="template == 'tixsme'">
    
    <section class="to-block fdb_result" id="block_search">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 pb-1 text-left mt-0">
            <h3 class="result__container mb-1">Quantidade de eventos: {{ countEvents }}
            </h3>
          </div>
        </div>
        <div class="row">
         
          <div class="col-12 col-md-4 card__eventos-container" v-for="(item, index) in searchResults" :key='index' :item="item" @click="goto(item)">
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
  </div>
  <div v-else >
    <section class="to-block to-viewport bg-dark bg__main" style="" data-block-type="call_to_action" data-id="2"  v-if="template == 'ticketHub'">
      <div class="container justify-content-center align-items-center d-flex pt-5 pb-0 mb-0 h-25">
        <div class="col-10 justify-content-center text-center">
          <div class="d-none d-sm-block" style="">
            <h2>Deseja encontrar outro evento ?</h2>
          </div>
          <div class="d-none d-sm-block input-group mt-4 mb-0 p-1 w-100">
            <app-search></app-search>
          </div>
        </div>
      </div>

    </section>
    <section class="to-block fdb_result">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 pb-4 text-left mt-4">
            <h3 class="result__container">Resultados encontrados para:
              <span class="result__description">"{{ searchValue }}"</span>
              <br>
            </h3>
              <p><span class="">{{ countEvents }} {{textForCount}}</span></p>
          </div>
        </div>
        <div class="row">
          
          <card-event v-for="(item, index) in searchResults" :key='index' :item="item"></card-event>

        </div>
      </div>
    </section>
  </div>
</div>
</template>

<script>
import Vue from "vue";
import VueHead from 'vue-head';
import Logo from "@/components/App-logo.vue";
import config from "@/config";
import {
  func
} from '@/functions';
import {
  searchService
} from "@/components/common/services/search";
import SearchItemLoader from '@/components/loaders/SearchItemLoader.vue';
import AppSearch from "@/components/App-search.vue";
import CardEvent from "@/components/Card-event.vue";

Vue.use(VueHead);

export default {
  name: "search",
  components: {
    SearchItemLoader,
    Logo,
    AppSearch,
    CardEvent
  },
  head: {
    title: function () {
      return {
        inner: `${this.readableRoute.name} / ${this.readableRoute.type}`,
        separator: " - ",
        complement: config.info.title,
      }
    },
    meta: function () {
      return [{
          name: 'application-name',
          id: 'application-name',
          content: this.metaObj.appName
        },
        {
          name: 'description',
          id: 'description',
          content: this.metaObj.description
        },
        {
          name: 'keywords',
          id: 'keywords',
          content: this.metaObj.keywords
        },
        {
          itemprop: 'name',
          id: 'name',
          content: this.metaObj.name
        },
        {
          itemprop: 'description',
          id: 'itempropdescription',
          content: this.metaObj.description
        },
        {
          name: 'twitter:card',
          id: 'twitter_card',
          content: this.metaObj.twitter.card
        },
        {
          name: 'twitter:title',
          id: 'twitter_title',
          content: this.metaObj.twitter.title
        },
        {
          name: 'twitter:description',
          id: 'twitter_description',
          content: this.metaObj.twitter.description
        },
        {
          name: 'twitter:image',
          id: 'twitter_image',
          content: this.metaObj.twitter.image.root
        },
        {
          name: 'twitter:image:alt',
          id: 'twitter_imagealt',
          content: this.metaObj.twitter.image.alt
        },
        {
          property: 'og:title',
          id: 'og_title',
          content: this.metaObj.og.title
        },
        {
          property: 'og:type',
          id: 'og_type',
          content: this.metaObj.og.type
        },
        {
          property: 'og:url',
          id: 'og_url',
          content: this.metaObj.og.url
        },
        {
          property: 'og:description',
          id: 'og_description',
          content: this.metaObj.og.description
        },
        {
          property: 'og:site_name',
          id: 'og_site_name',
          content: this.metaObj.og.site_name
        },
        {
          property: 'og:image',
          id: 'og_image',
          content: this.metaObj.og.image.root
        },
        {
          property: 'og:image:secure_url',
          id: 'og_image_secure_url',
          content: this.metaObj.og.image.secure_url
        },
        {
          property: 'og:image:type',
          id: 'og_image_type',
          content: this.metaObj.og.image.type
        },
        {
          property: 'og:image:alt',
          id: 'og_image_alt',
          content: this.metaObj.og.image.alt
        },
      ]
    },
    link: function () {
      return [{
          rel: 'icon',
          href: `${config.info.favicoPath}/favicon-32x32.png`,
          sizes: '32x32',
          type: 'image/png'
        },
        {
          rel: 'icon',
          href: `${config.info.favicoPath}/favicon-16x16.png`,
          sizes: '16x16',
          type: 'image/png'
        },
      ]
    }
  },
  data() {
    return {
      metaObj: this.metatag_getObj(),
      filterCards: false,
      filterLists: true,
      searchResults: [],
      searchValue: this.$route.params.input,
      isLoaded: false,
      itau: false
    };
  },
  mixins: [func],
  computed: {
    textForCount() {
      return this.countEvents == 1 ? "resultado encontrado" : "resultados encontrados";
    },
    countEvents() {
      return this.searchResults.length;
    },
    readableRoute() {
      let type = "";
      let name = this.searchValue;
      switch (this.$router.currentRoute.name) {
        case "search":
          type = "Busca";
          break;
        case "search_bycity":
          type = "Busca por Cidade";
          break;
        case "search_bystate":
          type = "Busca por Estado";
          break;
        case "search_bylocal":
          type = "Busca por Local"
          break;
        case "search_bygenre":
          type = "Busca por Gênero";
          break;
      }
      return {
        name,
        type,
      }
    },
  },
  methods: {
    toggleFilter: function (type) {
      if (type === "lists") {
        this.filterCards = true;
        this.filterLists = false;
      } else {
        this.filterLists = true;
        this.filterCards = false;
      }
    },
    goto(item) {
      this.$router.push(item.uri);
    },
    getSearchResults(type, input) {
      if (input == '') return;
      searchService.searchPage(type, input).then(
        response => {
          this.searchResults = response;
          this.searchResults.map(x => x.img = x.cardimage);
          //console.log(response);
          this.isLoaded = true;
        },
        error => {
          this.toastError("Falha na execução.");
        }
      );
    },
    createMetaObj() {
      this.metaObj.appName = config.info.siteName;
      this.metaObj.description = config.info.meta_description;
      this.metaObj.keywords = config.info.meta_keywords;
      this.metaObj.name = config.info.siteName;
      this.metaObj.twitter.card = 'summary_large_image';
      this.metaObj.twitter.title = config.info.siteName;
      this.metaObj.twitter.description = config.info.meta_description;
      this.metaObj.twitter.image.root = config.info.logo;
      this.metaObj.twitter.image.alt = config.info.siteName;
      this.metaObj.og.title = config.info.siteName;
      this.metaObj.og.type = 'website';
      this.metaObj.og.url = config.host;
      this.metaObj.og.description = config.info.meta_description;
      this.metaObj.og.site_name = config.info.siteName;
      this.metaObj.og.image.root = config.info.logo;
      this.metaObj.og.image.secure_url = config.info.logo;
      this.metaObj.og.image.type = 'image/jpeg';
      this.metaObj.og.image.alt = config.info.siteName;
      this.$emit('updateHead');
    },
  },
  created() {
    //console.log(this.$route.params.input);
    this.createMetaObj();
    this.getSearchResults(this.$router.currentRoute.name, this.searchValue);
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
