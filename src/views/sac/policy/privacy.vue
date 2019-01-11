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
                <h3 class="title__page">Politica de privacidade</h3>
                    <p>
                    Nós respeitamos a sua privacidade A  {{siteName}} sabe que a sua privacidade é muito
                    importante. Por favor, tome um minuto do seu tempo para ler e entender a nossa &quot;Política
                    de Privacidade&quot;, para que você entenda como tratamos a sua informação pessoal. Se
                    você tiver alguma pergunta sobre esta política, sobre as práticas deste site ou a sua
                    relação com a  {{siteName}}, envie um e-mail para sac@{{siteName}}.
                    </p><p>
                    Padrão mundial
                    <br>
                    Devido à importância que o assunto privacidade exige, a  {{siteName}} preparou o seu manual
                    baseado nos princípios utilizados pelos maiores e mais importantes sites de todo o
                    mundo, usando como base o TRUSTe.org , organização que tem como objetivo promover
                    as normas de confidencialidade de dados e privacidade no mundo digital.
                    </p><p>
                    Livre navegação
                    <br>
                    Em geral, você poderá navegar por este endereço Web &quot;http://www. {{siteName}}&quot; sem ter de
                    declarar quem você é ou revelar qualquer informação a seu respeito. Haverá ocasiões, no
                    entanto, em que poderá ser necessário uma identificação e a obtenção de seus dados
                    pessoais, tais como seu nome, CPF, endereço, telefone, etc. Nossa intenção é lhe
                    comunicar antes de coletar informações a seu respeito na Internet.
                    </p><p>
                    Pesquisas e enquetes
                    <br>
                    Ao se cadastrar e/ou participar de uma pesquisa na  {{siteName}}, você responde algumas
                    informações pessoais e sobre seus interesses. Nós usamos essas informações para
                    entender melhor o seu gosto e adaptar o site da melhor forma possível para você. Além
                    do que estipula esta &quot;Política de Privacidade&quot;, nós não revelamos, alugamos ou
                    vendemos sua informação pessoal para outros, sem sua aprovação ou conhecimento.
                    Nós podemos utilizar alguns serviços provindos de outras companhias para nossos
                    usuários. Em alguns casos, você terá que cadastrar-se conjuntamente com este parceiro
                    para poder receber seus serviços. Através do cadastro conjunto, você estará dando sua
                    informação pessoal também para esta outra empresa. Você, então, poderá receber
                    informações sobre serviços e atualizações deste parceiro.
                    </p><p>
                    E-mail de atualizações e notícias
                    <br>
                    Algumas vezes, a  {{siteName}} envia e-mails de atualização com as novidades e outros
                    serviços que o nosso site oferece para os usuários. Nós também poderemos enviar e-
                    mails sobre novos produtos, companhias ou eventos que possam ser do seu interesse.
                    Você poderá cancelar este serviço simplesmente seguindo as instruções contidas no e-
                    mail. Em promoções nós poderemos solicitar, entre outras ocasiões, alguns dados
                    pessoais identificáveis, para que você possa participar de sorteios, concursos ou
                    promoções realizadas pela  {{siteName}} ou por parceiros. Salas de Bate-Papo e Fóruns
                    Embora a  {{siteName}} tenha o direito de monitorar as salas de Bate Papo e os Fóruns, não
                    será possível fazê-lo permanentemente. Lembre-se de que, se você divulgar alguma
                    informação pessoal nas salas de Bate Papo ou nos fóruns, esta poderá ser usada por
                    outras pessoas.
                    </p><p>
                    Direito autoral e autoridades legais
                    <br>
                    Aviso: as imagens contidas neste site são protegidas pela lei de direito autoral. nº 5988 de
                    14/02/73. A cópia indevida ou a duplicação parcial ou total destas peças sofrerá pena de
                    acordo com a lei que rege os direitos do autor. Nós poderemos compartilhar as
                    informações dos nossos usuários com as autoridades do governo, quando tivermos
                    alguma razão para acreditar que alguém está causando danos ou interferindo com nossos
                    direitos ou propriedade intelectual, com outros usuários da  {{siteName}} ou com qualquer outra
                    pessoa que possa sair prejudicado por estas atividades.
                    </p><p>
                    Cookies
                    <br>
                    Tentamos oferecer para você serviços e produtos de acordo com seus interesses. Para
                    isso, utilizamos os &quot;cookies&quot; para guardar ou traçar informação sobre você. Um &quot;cookie&quot; é
                    uma pequena quantidade de dados enviado ao seu browser pelo servidor Web, que é
                    guardado no &quot;hard disk&quot; do seu computador. Nós utilizamos os &quot;cookies&quot; para: acessar
                    sua informação na  {{siteName}} (que está na base de dados dos nossos computadores),
                    oferecer um serviço personalizado; estimar o tamanho da nossa audiência para os nossos
                    anunciantes; saber o número de visitas em nossas promoções, sorteios e concursos; e
                    identificar quais áreas do nosso site você visitou. Nós analisamos esses dados para
                    melhor entender nossos usuários. Esta informação nos permite oferecer um serviço que
                    coincidirá melhor com seus interesses. Nós também mostramos uma análise dos nossos
                    usuários (como um grupo) para os nossos potenciais parceiros, anunciantes e terceiros.
                    </p><p>
                    Acesso a outros sites através da  {{siteName}}
                    <br>
                    Você deve saber que, quando estiver na  {{siteName}}, terá a oportunidade de visitar outros
                    sites não-operados pela  {{siteName}}. Estes sites, dos quais alguns são anunciantes da
                     {{siteName}}, poderão obter informação pessoal identificável sobre você. A  {{siteName}} não
                    controla os sites operados por outros e não se responsabiliza pelo uso de informações
                    destes sites. Esta declaração de privacidade não se aplica para estes outros sites ou
                    anunciantes.
                    </p><p>
                    Uso de conteúdo dos colaboradores
                    <br>
                    A  {{siteName}} é uma comunidade virtual com o objetivo de divulgar o teatro nacional e permitir
                    o livre intercâmbio de ideias e opiniões entre seus usuários. A  {{siteName}} não se
                    responsabiliza por opiniões, comentários, artigos, títulos e/ou espetáculos publicados por
                    colaboradores, moderadores, usuários e entrevistados que, de alguma forma, através de
                    imagem e/ou conteúdo, possam causar ofensas, perdas e danos, pois não representam a
                    opinião dos nossos editores.
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
      <section class="to-block to-viewport bg-dark bg__main" style="" data-block-type="call_to_action" data-id="2" v-if="newTemplate">
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
                <h3 class="title__page">Politica de privacidade</h3>
                    <p>
                    Nós respeitamos a sua privacidade A  {{siteName}} sabe que a sua privacidade é muito
                    importante. Por favor, tome um minuto do seu tempo para ler e entender a nossa &quot;Política
                    de Privacidade&quot;, para que você entenda como tratamos a sua informação pessoal. Se
                    você tiver alguma pergunta sobre esta política, sobre as práticas deste site ou a sua
                    relação com a  {{siteName}}, envie um e-mail para sac@{{siteName}}.
                    </p><p>
                    Padrão mundial
                    <br>
                    Devido à importância que o assunto privacidade exige, a  {{siteName}} preparou o seu manual
                    baseado nos princípios utilizados pelos maiores e mais importantes sites de todo o
                    mundo, usando como base o TRUSTe.org , organização que tem como objetivo promover
                    as normas de confidencialidade de dados e privacidade no mundo digital.
                    </p><p>
                    Livre navegação
                    <br>
                    Em geral, você poderá navegar por este endereço Web &quot;http://www. {{siteName}}&quot; sem ter de
                    declarar quem você é ou revelar qualquer informação a seu respeito. Haverá ocasiões, no
                    entanto, em que poderá ser necessário uma identificação e a obtenção de seus dados
                    pessoais, tais como seu nome, CPF, endereço, telefone, etc. Nossa intenção é lhe
                    comunicar antes de coletar informações a seu respeito na Internet.
                    </p><p>
                    Pesquisas e enquetes
                    <br>
                    Ao se cadastrar e/ou participar de uma pesquisa na  {{siteName}}, você responde algumas
                    informações pessoais e sobre seus interesses. Nós usamos essas informações para
                    entender melhor o seu gosto e adaptar o site da melhor forma possível para você. Além
                    do que estipula esta &quot;Política de Privacidade&quot;, nós não revelamos, alugamos ou
                    vendemos sua informação pessoal para outros, sem sua aprovação ou conhecimento.
                    Nós podemos utilizar alguns serviços provindos de outras companhias para nossos
                    usuários. Em alguns casos, você terá que cadastrar-se conjuntamente com este parceiro
                    para poder receber seus serviços. Através do cadastro conjunto, você estará dando sua
                    informação pessoal também para esta outra empresa. Você, então, poderá receber
                    informações sobre serviços e atualizações deste parceiro.
                    </p><p>
                    E-mail de atualizações e notícias
                    <br>
                    Algumas vezes, a  {{siteName}} envia e-mails de atualização com as novidades e outros
                    serviços que o nosso site oferece para os usuários. Nós também poderemos enviar e-
                    mails sobre novos produtos, companhias ou eventos que possam ser do seu interesse.
                    Você poderá cancelar este serviço simplesmente seguindo as instruções contidas no e-
                    mail. Em promoções nós poderemos solicitar, entre outras ocasiões, alguns dados
                    pessoais identificáveis, para que você possa participar de sorteios, concursos ou
                    promoções realizadas pela  {{siteName}} ou por parceiros. Salas de Bate-Papo e Fóruns
                    Embora a  {{siteName}} tenha o direito de monitorar as salas de Bate Papo e os Fóruns, não
                    será possível fazê-lo permanentemente. Lembre-se de que, se você divulgar alguma
                    informação pessoal nas salas de Bate Papo ou nos fóruns, esta poderá ser usada por
                    outras pessoas.
                    </p><p>
                    Direito autoral e autoridades legais
                    <br>
                    Aviso: as imagens contidas neste site são protegidas pela lei de direito autoral. nº 5988 de
                    14/02/73. A cópia indevida ou a duplicação parcial ou total destas peças sofrerá pena de
                    acordo com a lei que rege os direitos do autor. Nós poderemos compartilhar as
                    informações dos nossos usuários com as autoridades do governo, quando tivermos
                    alguma razão para acreditar que alguém está causando danos ou interferindo com nossos
                    direitos ou propriedade intelectual, com outros usuários da  {{siteName}} ou com qualquer outra
                    pessoa que possa sair prejudicado por estas atividades.
                    </p><p>
                    Cookies
                    <br>
                    Tentamos oferecer para você serviços e produtos de acordo com seus interesses. Para
                    isso, utilizamos os &quot;cookies&quot; para guardar ou traçar informação sobre você. Um &quot;cookie&quot; é
                    uma pequena quantidade de dados enviado ao seu browser pelo servidor Web, que é
                    guardado no &quot;hard disk&quot; do seu computador. Nós utilizamos os &quot;cookies&quot; para: acessar
                    sua informação na  {{siteName}} (que está na base de dados dos nossos computadores),
                    oferecer um serviço personalizado; estimar o tamanho da nossa audiência para os nossos
                    anunciantes; saber o número de visitas em nossas promoções, sorteios e concursos; e
                    identificar quais áreas do nosso site você visitou. Nós analisamos esses dados para
                    melhor entender nossos usuários. Esta informação nos permite oferecer um serviço que
                    coincidirá melhor com seus interesses. Nós também mostramos uma análise dos nossos
                    usuários (como um grupo) para os nossos potenciais parceiros, anunciantes e terceiros.
                    </p><p>
                    Acesso a outros sites através da  {{siteName}}
                    <br>
                    Você deve saber que, quando estiver na  {{siteName}}, terá a oportunidade de visitar outros
                    sites não-operados pela  {{siteName}}. Estes sites, dos quais alguns são anunciantes da
                     {{siteName}}, poderão obter informação pessoal identificável sobre você. A  {{siteName}} não
                    controla os sites operados por outros e não se responsabiliza pelo uso de informações
                    destes sites. Esta declaração de privacidade não se aplica para estes outros sites ou
                    anunciantes.
                    </p><p>
                    Uso de conteúdo dos colaboradores
                    <br>
                    A  {{siteName}} é uma comunidade virtual com o objetivo de divulgar o teatro nacional e permitir
                    o livre intercâmbio de ideias e opiniões entre seus usuários. A  {{siteName}} não se
                    responsabiliza por opiniões, comentários, artigos, títulos e/ou espetáculos publicados por
                    colaboradores, moderadores, usuários e entrevistados que, de alguma forma, através de
                    imagem e/ou conteúdo, possam causar ofensas, perdas e danos, pois não representam a
                    opinião dos nossos editores.
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
