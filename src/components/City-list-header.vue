<template>
<a v-if="cityList.length > 1">
  <b-dropdown class="mr-0 pr-0" id="ddown1" :text="'Cidades'">
    <b-dropdown-item v-for="(item,index) in cityList" :key="index" :href="'/busca/' + item.ds_municipio" >
     {{item.ds_municipio | capitalize()}}
    </b-dropdown-item>
  </b-dropdown>
  <b-dropdown class="ml-0 pl-0" id="ddown1" :text="'Locais'">
    <b-dropdown-item v-for="(item,index) in localList" :key="index" :href="'/teatros/' + item.ds_nome_teatro" class="">
     {{item.ds_nome_teatro | capitalize()}}
    </b-dropdown-item>
  </b-dropdown>
</a>
</template>

<script>
import {
  eventService
} from "@/components/common/services/event";

export default {
  name: "CityList",
  mounted() {
    this.getListResults();
  },
  data: function () {
    return {
      cityList: [],
      localList: [],
      slideData: [],
    }
  },
  filters: {

    capitalize: function (value) {
      if (value == null || value == undefined) return;

      if (!value) return ''

      value = value.toString()
      value = value.toLowerCase();
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {
    removeDuplicatesBy(keyFn, array) {
      var mySet = new Set();
      return array.filter(function (x) {
        var key = keyFn(x).toUpperCase(),
          isNew = !mySet.has(key);
        if (isNew) mySet.add(key);
        return isNew;
      });
    },
    getListResults() {
      eventService.list().then(
        response => {
          console.log(response);
          this.slideData = response.filter(x => x.id_genre !== undefined && x.id_genre !== null);

          this.cityList = this.removeDuplicatesBy(x => x.ds_municipio, this.slideData);

          this.localList = this.removeDuplicatesBy(x => x.ds_nome_teatro, this.slideData);
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
  }
};
</script>

<style lang="scss">
  #ddown1 button {
    color: #444 !important;
    font-weight: normal;
  }

  .dropdown {
    width: 80px;
  }

</style>
