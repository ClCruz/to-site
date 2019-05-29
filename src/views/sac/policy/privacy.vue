<template>
<div>
  <div class="content" v-if="!newTemplate">
    <div class="row">
      <Logo></Logo>
      <div class="col-12 col-md-10 content__show">
        <div class="row">
          <!-- SAC Index -->
          <sacInfo></sacInfo>

          <!-- Show SAC content -->
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-12">

                <div class="content__description">
                  <div class="card event__card sac__card">
               <h3 class="title__page">{{pageData.title}}</h3>
                    <span v-html="pageData.content">
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   <div class="content" v-else-if="template == 'ingressaria' || template == 'ticketHubVideo' || template == 'compreingressos'">
    <section class="to-block to-viewport bg-dark bg__main" style="">
      <div class="container justify-content-center align-items-center d-flex p-5">
        <div class="col-10 justify-content-center text-center">
          <div class="d-none d-sm-block" style="">
            <h2>Deseja encontrar outro evento ?</h2>
          </div>
          <div class="d-none d-sm-block input-group mt-4 mb-2 p-1 w-100">
            <app-search></app-search>
          </div>
        </div>
      </div>

    </section>

    <section class="to-block" style="background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFk%0D%0Ab2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246%0D%0AIDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzciIHhtbG5z%0D%0APSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMu%0D%0Ab3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMjE2LjkgODIy%0D%0ALjEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyMTYuOSA4MjIuMTsiIHhtbDpz%0D%0AcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGNEY3%0D%0ARkU7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMCwwaDEyMTYuOXY3MzguNGMwLDAt%0D%0ANTg4LjgsMjAwLTYxMi44LTE4czM4OS44LTQ3NC4yLTExMS01MjlDMTAwLjEsMTQ4LjQsMCwwLDAs%0D%0AMHoiLz4KPC9zdmc+Cg=='); padding: 120px 0 !important">
      <div class="container">
        <div class="row">
          <!-- SAC Index -->
          <sacInfo></sacInfo>

          <div class="col-12 col-md-7 col-lg-7 offset-lg-1 pt-4 pt-lg-0">
            <h3 class="title__page">{{pageData.title}}</h3>
                    <span v-html="pageData.content">
                    </span>
          </div>
        </div>
      </div>
    </section>

  </div>
  <div class="content" v-else>
      <section class="to-block to-viewport bg-dark bg__main" style="" data-block-type="call_to_action" data-id="2" v-if="template == 'ticketHub'">
    <div class="container justify-content-center align-items-center d-flex p-5">
      <div class="col-10 justify-content-center text-center">
        <div class="d-none d-sm-block" style="">
          <h2>Deseja encontrar outro evento ?</h2>
        </div>
        <div class="d-none d-sm-block input-group mt-4 mb-2 p-1 w-100">
          <app-search></app-search>
        </div>
      </div>
    </div>

  </section>
    <div class="container container__sac">
      <div class="">
        
        <div class="row">
          <!-- SAC Index -->
          <sacInfo></sacInfo>

          <!-- Show SAC content -->
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-12">

                <div class="content__description">
                  <div class="card event__card sac__card">
               <h3 class="title__page">{{pageData.title}}</h3>
                    <span v-html="pageData.content">
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import VueHead from 'vue-head';
import VueResource from "vue-resource";
import Logo from "@/components/App-logo.vue";
import SacInfo from "@/views/sac/sac-info.vue";
import AppSearch from "@/components/App-search.vue";
import config from "@/config";
import {
  func
} from "@/functions";
import BootstrapVue from "bootstrap-vue";
import {
  staticPageService
} from "@/components/common/services/static_page.js";
Vue.use(BootstrapVue);
Vue.use(VueHead);
Vue.use(VueResource);

export default {
  name: "privacy",
  mixins: [func],
  components: {
    Logo,
    SacInfo,
    AppSearch
  },
  head: {
    title: function () {
      return {
        inner: ``,
        separator: "",
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
  },
  data() {
    return {
      newTemplate: true,
      metaObj: this.metatag_getObj(),
      siteName: config.info.siteName,
      pageData: [],
    };
  },
  mounted() {
    this.createMetaObj();
  },
  methods: {

    getSACContent() {
        staticPageService.get(3).then(
      
          response => {
            this.pageData = response;
            console.log(this.pageData);
          },
          error => {
            this.hideWaitAboveAll();
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
    this.getSACContent();
  },
};
</script>

<style lang="scss">
  .container__sac {
    margin-top: -150px;
    margin-bottom: 100px;
  }
</style>
