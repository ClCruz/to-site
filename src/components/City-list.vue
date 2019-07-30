<template>
<a v-if="cityList.length > 1">
  <h3 style=""><strong>Encontre Eventos</strong></h3>
  <div v-for="(item,index) in cityList" :key="index">
    <a :href="'/busca/' + item.ds_municipio"  style="cursor: pointer;">{{item.ds_municipio | capitalize()}}</a>
    <br :key="index+1">
  </div>
</a>
</template>

<script>
import {
  eventService
} from "@/components/common/services/event";

export default {
  name: "CityList",
  mounted() {
    //console.log('oi');
    this.getListResults();
  },
  data: function () {
    return {
      cityList: [],
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
          this.slideData = response.filter(x => x.id_genre !== undefined && x.id_genre !== null);

          this.cityList = this.removeDuplicatesBy(x => x.ds_municipio, this.slideData);

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
</style>
