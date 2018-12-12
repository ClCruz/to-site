<template>
<div class="content">
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
                  <h3 class="title__page">Política de Meia Entrada</h3>
                 
<p>
Durante o segundo semestre de 2013 foram aprovadas as leis 12.852 e 12.933, que
regulam a meia-entrada no Brasil. São leis que tratam do direito ao estudante, idosos,
jovens de baixa renda e deficientes de pagar metade do valor em shows, filmes, peças de
teatro, e qualquer evento de natureza cultural ou esportiva.
Segundo o texto, que regulamenta a lei aprovada em dezembro de 2013, o benefício
prevê a reserva de pelo menos 40% dos ingressos de meia-entrada em espetáculos
artísticos, culturais e esportivos.
</p><p>
Estudantes
<br>
A partir de agora, só serão aceitas carteiras estudantis emitidas pela União Nacional do
Estudantes (UNE), União Brasileira dos Estudantes (Ubes), escolas estaduais e
municipais filiadas às duas entidades, Diretórios Centrais dos Estudantes (DCEs) e
instituições de ensino médio e superior. O objetivo é padronizar o documento, aumentar a
fiscalização e evitar possíveis fraudes. Conter nome completo, data de nascimento, grau
de escolaridade, foto atual, nome da instituição, matrícula ativa, data de validade ao dia
31 de Março do ano subsequente ao de expedição.
</p><p>
JOVENS DE BAIXA RENDA
<br>
Os jovens de baixa renda também terão direito à meia-entrada com a apresentação da
chamada Identidade Jovem, documento que será emitido pela Secretaria Nacional da
Juventude.
</p><p>
IDOSOS OU NECESSIDADES ESPECIAIS
<br>
O texto concede às pessoas com 60 (sessenta) anos ou mais também o benefício da
meia-entrada. Já as pessoas com deficiência, podem apresentar o cartão de Benefício de
Prestação Continuada da assistência Social ou documento emitido pelo Instituto Nacional
de Seguro Social (INSS). Quando a pessoa com deficiência precisar de acompanhante,
este também terá direito ao ingresso com a metade do preço.
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
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import VueHead from 'vue-head';
import VueResource from "vue-resource";
import Logo from "@/components/App-logo.vue";
import SacInfo from "@/views/sac/sac-info.vue";

import config from "@/config";
import {
  func
} from "@/functions";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(VueHead);
Vue.use(VueResource);

export default {
  name: "policyDiscount",
  mixins: [func],
  components: {
    Logo,
    SacInfo
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

</style>
