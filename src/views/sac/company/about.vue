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
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12">

                <div class="content__description">
                  <div class="card event__card sac__card">
                    <h3 class="title__page">Sobre a {{siteName}}</h3>
                    <p>
                      Somos uma empresa feita por gente apaixonada por entretenimento. Por isso,
                      queremos compartilhar esse amor com outras pessoas que também sabem se divertir.
                    </p>
                    <p>
                      Nossa história vem com alguns colaboradores que através dos anos foram pioneiros
                      em venda de ingressos para teatros, shows, partidas de futebol e que agora se encontram em
                      um lugar novo e diferenciado, com muita tecnologia e inovação para oferecer o melhor do
                      entretenimento para você.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="content" v-else>
      <section class="fdb-block fdb-viewport bg-dark bg__main" style="" data-block-type="call_to_action" data-id="2" v-if="newTemplate">
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
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12">

                <div class="content__description">
                  <div class="card event__card sac__card">
                    <h3 class="title__page">Sobre a {{siteName}}</h3>
                    <p>
                      Somos uma empresa feita por gente apaixonada por entretenimento. Por isso,
                      queremos compartilhar esse amor com outras pessoas que também sabem se divertir.
                    </p>
                    <p>
                      Nossa história vem com alguns colaboradores que através dos anos foram pioneiros
                      em venda de ingressos para teatros, shows, partidas de futebol e que agora se encontram em
                      um lugar novo e diferenciado, com muita tecnologia e inovação para oferecer o melhor do
                      entretenimento para você.
                    </p>
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

Vue.use(BootstrapVue);
Vue.use(VueHead);
Vue.use(VueResource);

export default {
  name: "companyAbout",
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
    };
  },
  mounted() {
    this.createMetaObj();
  },
  methods: {
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
  created() {}
};
</script>

<style lang="scss">
  .container__sac {
    margin-top: -150px;
    margin-bottom: 100px;
  }
</style>
