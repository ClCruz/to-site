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
                                  <p class="lead">Consulte a disponibilidade de venda nas bilhterias das peças participantes.
</p>
<a href="https://www.itau.com.br/cartoes/beneficios/beneficios-credito/teatro/">Itaucard 50% de desconto no teatro</a>
<pre style="color: white; font-family: sans-serif">


          <template>
            <a @click="contact" style="cursor: pointer">Consulte</a>
            <br>
          </template>

<a href="https://teatro.compreingressos.com/">
Clique aqui e compre agora
</a>

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
import config from '@/config';
import {
  authService
} from "@/components/common/services/auth";
import {
  func
} from '@/functions';
  import CityList from '@/components/City-list.vue';
import {
  staticPageService
} from "@/components/common/services/static_page.js";

import {
  eventService
} from "@/components/common/services/event";

Vue.use(VueHead);

export default {
  name: "event",
  mixins: [func],
  components: {},
  head: {},
    methods: {
    contact() {
      this.$swal.queue([{
        title: 'Consulta das bilheterias participantes',
        html: '<input id="swal-email1" type="text" required placeholder="Digite seu nome" name="name" class="swal2-input">' +
          '<input id="swal-email2" type="email" required  placeholder="Digite seu email" name="email" class="swal2-input">' +
          '<input id="swal-email3" type="text" required placeholder="Assunto" name="subject" class="swal2-input">' +
          '<input id="swal-email5" type="text" required placeholder="Digite o teatro" name="id" class="swal2-input">' +
          '<textarea style="width: 80%; padding-top: 0.75rem" rows="4" id="swal-email4" placeholder="Digite o espetáculo e quais informações adicionais desejar saber." required> </textarea>',
        focusConfirm: false,
        preConfirm: () => {
          let name = document.getElementById('swal-email1').value;
          let email = document.getElementById('swal-email2').value;
          let subject = document.getElementById('swal-email3').value;
          let content = document.getElementById('swal-email4').value;
          let id = document.getElementById('swal-email5').value;

          this.contact = {
            name,
            email,
            subject,
            content,
            id
          };
          authService.contact(this.contact).then(
            response => {
              if (this.validateJSON(response)) {
                this.toastSuccess("Email enviado");
              }
            },
            error => {
              this.toastError("Falha na execução.");
            }
          );
        }
      }]).then((result) => {
        if (result.value) {} else if (result.dismiss === this.$swal.DismissReason.cancel) {

        }
      });
    },
  },
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
