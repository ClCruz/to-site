<template>
<div class="row p-3">
  <swiper :options="swiperOption" class="col-12 pb-0 mb-0">
    <swiper-slide v-for="(item, index) in genreList" @click="goto('genre',item.genreName)" :key='index' class="col-12 col-xl-4 col-md-4 pr-0 pb-0 pt-0 text-left m-0">
      <a :href="'/busca/genero/' + item.genreName" style="text-decoration: none">

        <div class="card__genre-container col-12 m-2">
          <div class="card__genre-img col-5 text-left p-0 m-0" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }"></div>
          <div class="card__genre-text col-7 p-0 m-0">

            <h3 class="">{{ item.genreName | capitalize }}</h3>
            <p class="">Evento em destaque: </p>
            <p class="destaque mt-0 pt-0">{{ item.ds_evento | capitalize }}</p>
          </div>
        </div>
      </a>
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
  mounted() {},
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
          this.$router.push("/cidade/" + item);
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
  props: ['genreList', 'swiperOption'],

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
