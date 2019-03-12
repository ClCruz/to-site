<template>
<swiper :options="swiperOption">
  <swiper-slide v-for="(item, index) in bannerEvents" :key='index'>
    <div class="item__slide" style="">
      <div class="row">
        <div class="col-md-8  col-xs-12 nopadding">
          <span style="cursor: pointer" @click="goto('event',{ uri: item.uri})">
                    <img :src="item.img" class="slide__image" alt="" style="width:100%;">
                  </span>
        </div>
        <div class="col-md-4 d-none d-sm-block visible-md visible-lg to__slide" style="height:320px;padding:30px;">
          <h3 class="" style="font-size: 20px">{{item.ds_evento}}</h3>
          <div class="">
            <div class="event-name pull-left">
              <p v-html="item.bannerDescription"></p>
              <div class="slide__item-icon">
                <p class="p-0 m-0 event__item event__item-date slide__item-date"><span class="bold">{{item.datas |  replace('-', 'á')}}</span></p>
                <p class="p-0 pt-1 m-0 h-200 event__item event__item-local slide__item-local"><span class="bold" style="text-transform: capitalize !important">{{ item.ds_nome_teatro | capitalize() }} - {{ item.ds_municipio | capitalize() }},</span> {{ item.sg_estado }} </p>
              </div>
            </div>
          </div>
          <div class="button-event pt-4 w-100 to__slide-button" style="">
            <button class="btn btn-sm btn-outline-dark w-70 mx-auto mx-0" @click="goto('event',{ uri: item.uri})" type="button">Comprar</button>
          </div>
        </div>
      </div>
    </div>
  </swiper-slide>
  <div class="swiper-pagination" slot="pagination"></div>
  <div class="swiper-button-prev" slot="button-prev"></div>
  <div class="swiper-button-next" slot="button-next"></div>
</swiper>
</template>

<script>
import {
  func
} from '@/functions';
export default {
  name: "BannerSlide",
  computed: {},
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
      }
    },
  },
  data() {
    return {

      swiperOption: {
        loop: true,
        autoplay: true,
        speed: 400,
        loopedSlides: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 5000
        },

        breakpoints: {},
        on: {
          slideChangeTransitionEnd: function () {
            let me = this;
            if (this.isEnd) {
              if (this.autoplay.running) {
                setTimeout(function () {
                  me.slideToLoop(0, me.params.speed);
                  me.autoplay.stop();
                  me.autoplay.start();
                }, this.params.autoplay.delay);
              }
            }
          }
        }
      }
    }
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
  },
  props: ['bannerEvents'],
  created() {},
};
</script>

<style lang="scss">
</style>
