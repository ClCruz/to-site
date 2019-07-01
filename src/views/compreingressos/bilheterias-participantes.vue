<template>
<div>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <section class="to-block bg__ingressaria to-block-mobile" style="">
            <div class="container">
              <div class="row pb-5 pt-0 mt-0">
                <div class="col-12" style="background: rgba(0,0,0,0.3); border-radius: 5px">
                  <img class="event__card-img" :src="'https://media.tixs.me/ci/visor.jpg?1541728042'" alt="" style="height: auto !important; max-width: 800px !important" >
                </div>
              </div>
            </div>
            <div class="row">
                                <div class="col-12 col-sm-6 mx-auto col-md-4 col-lg-6">
                                  <h3>Itaucard Bilheterias Participantes</h3>
                                  <p class="lead">Confira a lista completa dos teatros onde você também pode comprar seus ingressos com 50% de desconto utilizando o seu Itaucard.
</p>
<a href="https://www.itau.com.br/cartoes/beneficios/beneficios-credito/teatro/">Itaucard 50% de desconto no teatro</a>
<pre style="color: white; font-family: sans-serif">

São Paulo / SP
Mini Teatro / Cia de Revista 
Teatro do Ator 
Instituto Cultural Capobianco 
Teatro do nucleo experimental 
Teatro Italia 
Teatro Juca Chaves 
Teatro Mube Nova Cutural 
Teatro Paiol Cultural 
Cit Ecum 
Galpão do Folias 

Cerquilho / SP
Teatro Municipal de Cerquilho

Rio de Janeiro / RJ
Teatro Municipal Carlos Gomes 
Teatro Municipal Parque Das Ruínas 
Lona Cultural João Bosco 
Teatro Municipal Maria Clara Machado 
Teatro Municipal do Jockey 
Lona Cultural Gilberto Gil 
Lona Cultural Elza Osborne 
Teatro Municipal Café Pequeno 
Teatro Municipal Gonzaguinha 
Espaço Cultural Municipal Sérgio Porto 
Teatro Municipal Ziembinski 
Lona Cultural Terra 
Centro Coreografico 
Sala Municipal Baden Powell 
Centro de Referência da Música Carioca Arthur Da Távola 
Teatro Municipal Ipanema 
Lona Cultural Hermeto Pascoal 
Lona Cultural Carlos Zéfiro 
Lona Cultural Sandra de Sá - Santa Cruz 
Lona Cultural Herbert Vianna 
Unicirco 
Casa da Gávea 
Teatro João Caetano 
Teatro Gláucio Gill 
Casa de Cultura Laura Alvim 
Teatro Arthur Azevedo 
Teatro Armando Gonzaga 
Lona Renato Russo 
Lona Jacob do Bandolim

Salvador / BA
Teatro Acbeu 
Teatro Isba 
Teatro Módulo 
Café Teatro Rubi - Sheraton da Bahia Hotel 
Teatro Jorge Amado 
Teatro Sesc Casa do Comércio

Goiãnia / GO
Teatro Rio Vermelho 

Anápolis / GO
Teatro Municipal de Anápolis

Campo Grande / MS
Palácio Popular da Cultura 
Tenda Palco Brasil 

Curitiba / PR
Teatro Barracão Encena
</pre>
                                  </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import VueResource from "vue-resource";
import VueHead from 'vue-head';
import config from '@/config';
import {
  func
} from '@/functions';
import $ from "jquery";
import EventTimeLoader from '@/components/loaders/EventTimeLoader.vue';
import EventTitleLoader from '@/components/loaders/EventTitleLoader.vue';
import EventRoomLoader from '@/components/loaders/EventRoomLoader.vue';
import LineLoader from '@/components/loaders/LineLoader.vue';
import EventImageLoader from '@/components/loaders/EventImageLoader.vue';
import EventImageIngressariaLoader from '@/components/loaders/EventImageIngressariaLoader.vue';
import AppSearch from "@/components/App-search.vue";

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

import {
  eventService
} from "@/components/common/services/event";

Vue.use(VueHead);

export default {
  name: "event",
  mixins: [func],
  components: {},
  head: {},
  methods: {},
  data() {
    return {
      siteName: config.info.siteName,

    }
  },
  mounted() {
    if (this.siteName !== 'www.compreingressos.com' ) {
        window.location = "/";
    }
  },
  computed: {}
};

$(document).ready(function () {
  // console.log( "ready!" );
  // debugger

});
</script>

<style lang="scss" scoped>
.card {
  background: #333;
}

.noClick {
  cursor: default;
}

.result__button-group {
  padding-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active em versões anteriores a 2.1.8 */
  {
  opacity: 0;
}

.badge-prL {
  color: #fff;
  background-color: #28a745;
}

.badge-prL[href]:hover,
.badge-prL[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #1e7e34;
}

.badge-pr10 {
  color: #fff;
  background-color: #007bff;
}

.badge-pr10[href]:hover,
.badge-pr10[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #0062cc;
}

.badge-pr12 {
  color: #212529;
  background-color: #ffc107;
}

.badge-pr12[href]:hover,
.badge-pr12[href]:focus {
  color: #212529;
  text-decoration: none;
  background-color: #d39e00;
}

.badge-pr14 {
  color: #fff;
  background-color: #ed7300;
}

.badge-pr14[href]:hover,
.badge-pr14[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #e5760e;
}

.badge-pr16 {
  color: #fff;
  background-color: #dc3545;
}

.badge-pr16[href]:hover,
.badge-pr16[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #bd2130;
}

.badge-pr18 {
  color: #fff;
  background-color: #343a40;
}

.badge-pr18[href]:hover,
.badge-pr18[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #1d2124;
}
</style>
