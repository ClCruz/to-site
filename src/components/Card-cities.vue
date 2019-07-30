<template>
<div class="row p-3">
  <swiper :options="swiperOption" class="col-12 pb-0 mb-0">
    <swiper-slide v-for="(item, index) in cityList" :key='index' class="col-12 col-xl-3 col-md-4 pr-2  pb-0 pt-0 text-left">
      <div class="pr-2">
        <div class="to-box p-0">
          <div @click="goto('city',{ uri: item.ds_municipio})" class="cities__container img-fluid rounded-0" style="background-size: cover;height: 300px !important;" :style="{ backgroundImage: 'url(\'' + returnRandomImage(item) + '\')' }" >
            <div class=" cities__featured">
            </div>
          <!--  -->
              <h1 class="cities__featured-text"><span>{{item.ds_municipio  | capitalize()}}</span></h1>
          </div>
          <!-- <div class="partner__badge"><i class="fa fa-lg fa-handshake"></i>Compreingressos</div> -->
        </div>
      </div>
    </swiper-slide>

  </swiper>
</div>
</template>

<script>
import config from '@/config';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import {
  citiesService
} from "@/components/common/services/cities";

export default {
  name: "CardEvent",
  mounted() {
    this.getCities();
  },
  computed: {
    siteName() {
      return config.info.siteName;
    },
    getDayForCache() {
      const date = new Date();
      return date.getDate() + '' + (date.getMonth() + 1);
    }
  },
  data: function () {
    return {
      cityList: [],
      slideData: [],
    }
  },
  methods: {
    returnRandomImage(item) {
      if (item.img_extra == '') return item.img

      let aux = Math.floor(Math.random() * 2) + 1;

      if (1) return item.img;
      if (2) return item.img_extra;

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
    getCities() {
      citiesService.get().then(
        response => {
          if (response !== null) {
          let temp = response.filter(x => x.img !== undefined && x.img !== null && x.img !== '');

          this.cityList = this.removeDuplicatesBy(x => x.ds_municipio, temp);

          }
         
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
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
