<template>
<div class="row p-3">
  <swiper :options="swiperOption" class="col-12 pb-0 mb-0">
    <swiper-slide v-for="(item, index) in bannerEvents" :key='index' class="col-12 col-xl-6 col-md-6 p-0 pb-0 pt-0 text-left">
      <div class="pr-1">
        <div class="to-box p-0 ">
          <div @click="goto('event',{ uri: item.uri})" class="img-fluid rounded-0" style="background-size: cover;height: 300px !important" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }">
          </div>
          <!-- <div class="partner__badge"><i class="fa fa-lg fa-handshake"></i>Compreingressos</div> -->
        </div>
      </div>

      <p class="p-0 m-0 mt-2 card__featured-item">
        <span v-if="siteName == 'peixeurbano.ticketoffice.me'">
          TOP
        </span>
        <span v-else>

          DESTAQUES
        </span>
      </p>
      <h4 class="event__title-featured pb-0 mt-2">
        <strong>{{ item.ds_evento | capitalize() }}</strong>
      </h4>

      <p class="p-0 m-0 event__item event__item-date event__item-featured">
        <span class="bold">{{item.datas |  replace('-', 'á')}} </span>
        <span class="ml-1 mr-2" v-if="item.showPartnerInfo == 1">-</span>
        <span class="" v-if="item.showPartnerInfo == 1"><i class="far fa-handshake" style="padding-right: 6px;"></i>{{item.partner}}</span>
      </p>
      <p class="p-0 pt-1 m-0 h-200 event__item event__item-local event__item-featured"><span class="bold" style="text-transform: capitalize !important">{{ item.ds_nome_teatro | capitalize() }} - {{ item.ds_municipio | capitalize() }},</span> {{ item.sg_estado }} </p>
    </swiper-slide>

  </swiper>
</div>
</template>

<script>
import config from '@/config';
import VueAwesomeSwiper from 'vue-awesome-swiper';

export default {
  name: "CardEvent",
  computed: {
    siteName() {
      return config.info.siteName;
    },
    getDayForCache() {
      const date = new Date();
      return date.getDate() + '' + (date.getMonth() + 1);
    }
  },
  methods: {
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
        case "discovery":
          window.location.href = item;
          break;
      }
    },
  },
  props: ['bannerEvents', 'swiperOption'],

  filters: {
    truncate: function (text, length, clamp) {
      if (text == null || text == undefined) return;

      clamp = clamp || '...';
      var node = document.createElement('div');
      node.innerHTML = text;
      var content = node.textContent;
      return content;
      // return content.length > length ? content.slice(0, length) + clamp : content;
    },
    replace: function (message, toReplace, replacement) {
      if (message == null || message == undefined) return;
      return message.replace(toReplace, replacement);
    },
    capitalize: function (value) {
      if (value == null || value == undefined) return;

      if (!value) return ''

      value = value.toString()
      value = value.toLowerCase();
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
};
</script>
