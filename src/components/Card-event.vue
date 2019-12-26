<template>
  <div
    class="col-12 col-xl-4 col-md-6 p-2 text-left"
    @click="goto('discovery', item.link)"
    v-if="item.isdiscovery == 1"
  >
    <div class="to-box p-0">
      <div
        class="img-fluid rounded-0"
        :style="{ backgroundImage: 'url(\'' + item.imageURI + '?' + (new Date()).getTime() + '\')' }"
        style="background-size: cover;"
      ></div>

      <div
        class="content to-box p-2 pt-0 pb-1"
        style="position: relative; border-top-left-radius: 0 !important; border-top-right-radius: 0 !important;"
      >
        <h4 class="event__title pb-1" style="text-transform: uppercase !important">
          <strong>{{ item.title | truncate(35, ' ...') }}</strong>
        </h4>
        <p
          class="p-0 pt-1 m-0 h-200 event__item"
          style="font-size: 13px"
        >{{item.content | truncate(110, ' ...') }}</p>
      </div>
    </div>
  </div>
  <div v-else class="col-12 col-xl-4 col-md-6 p-2 text-left">
    <div
      class="ad__badge-it"
      v-if="siteName == 'ingressoparatodos.com.br' ||	siteName == 'peixeurbano.ticketoffice.me' ||	siteName == 'www.ingreshow.com.br' && (item.minAmount !== null && item.minAmount !== '')"
    >
      <!-- <i class="far fa-money-bill-alt" style=""></i> -->
      <span
        class
        v-if="siteName == 'ingressoparatodos.com.br' && item.minAmount !== null && item.minAmount !== ''"
        style="margin-top: 6px"
      >
        <template v-if="item.mmAmountIsPer == 0">
          A partir de
          <span
            style="font-weight: bold !important; font-size: 10px !important"
          >{{item.minAmount}}</span>
        </template>
        <template v-if="item.mmAmountIsPer != 0">
          Desconto de
          <span
            style="font-weight: bold !important; font-size: 10px !important"
          >{{item.minAmount}}%</span>
        </template>
      </span>
      <span
        class
        v-else-if="item.minAmount !== null && item.minAmount !== ''"
        style="margin-top: 6px"
      >
        <template v-if="item.mmAmountIsPer == 0">
          A partir de
          <span
            style="font-weight: bold !important; font-size: 12px !important"
          >{{item.minAmount}}</span>
        </template>
        <template v-if="item.mmAmountIsPer != 0 ">
          Desconto de
          <span
            style="font-weight: bold !important; font-size: 12px !important"
          >{{item.minAmount}}%</span>
        </template>
      </span>
    </div>
    <div class="to-box p-0">
      <a :href="item.uri" style="text-decoration: none">
        <div
          class="img-fluid rounded-0"
          v-lazy:background-image="item.img  + '?' + getDayForCache"
          style="background-size: cover;"
        ></div>

        <div
          class="content to-box p-2 pt-0 pb-1"
          style="position: relative; border-top-left-radius: 0 !important; border-top-right-radius: 0 !important;"
        >
          <h4 class="event__title pb-1">
            <strong>{{ item.ds_evento | truncate(35, ' ...') }}</strong>
          </h4>

          <p class="p-0 m-0 event__item event__item-date">
            <span class="bold">{{item.datas | replace('-', 'á')}}</span>
            <span class="ml-1 mr-2" v-if="item.showPartnerInfo == 1">-</span>
            <span class v-if="item.showPartnerInfo == 1">
              <i class="far fa-handshake" style="padding-right: 6px;"></i>
              {{item.partner}}
            </span>
          </p>
          <p class="p-0 pt-1 m-0 h-200 event__item event__item-local">
            <span
              class="bold"
              style="text-transform: capitalize !important"
            >{{ item.ds_nome_teatro | capitalize() }} - {{ item.ds_municipio | capitalize() }},</span>
            {{ item.sg_estado }}
          </p>

          <!-- <p class="p-0 m-0 mt-0 event__item"  style="font-size: 13px">
        <i class="far fa-money-bill-alt" style="margin-right: 6px; margin-top: 4px;"></i>
        
        <span class="bold" style="margin-top: 6px">{{item.valores}}</span>
          </p>-->
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import config from "@/config";

export default {
  name: "CardEvent",
  computed: {
    siteName() {
      return config.info.siteName;
    },
    getDayForCache() {
      const date = new Date();
      return date.getDate() + "" + (date.getMonth() + 1);
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
    }
  },
  props: ["item"],

  filters: {
    truncate: function(text, length, clamp) {
      if (text == null || text == undefined) return;

      clamp = clamp || "...";
      var node = document.createElement("div");
      node.innerHTML = text;
      var content = node.textContent;
      return content;
      // return content.length > length ? content.slice(0, length) + clamp : content;
    },
    replace: function(message, toReplace, replacement) {
      if (message == null || message == undefined) return;
      return message.replace(toReplace, replacement);
    },
    capitalize: function(value) {
      if (value == null || value == undefined) return;

      if (!value) return "";

      return value.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  }
};
</script>
