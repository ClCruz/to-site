<template>
<div class="a">
  <div>    
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
        case "search_bycity_without_search":
          type = "Busca por Cidade";
          break;
        case "search_bystate":
          type = "Busca por Estado";
          break;
        case "search_bylocal":
        case "search_bylocal_without_search":
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
