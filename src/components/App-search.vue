<template>
  <suggestions v-model="searchQuery" :options="options" :onItemSelected="onSearchItemSelected" :onInputChange="onInputChange" @keyup.native="keyup">
    <div slot="item" slot-scope="props" class="single-item" v-bind:class="{ noClick: (props.item.notselectable === 1) }" @click.prevent="goto(props.item);">
      <span class="suggestions-group" v-if="props.item.notselectable === 1">
          {{props.item.description}}
      </span>

      <span class="name" v-if="props.item.notselectable === 0">
        <a>
          <span v-if="props.item.type=='event'" class="autocomplete__icon autocomplete__event"></span>
          <span v-else-if="props.item.type=='local'" class="autocomplete__icon autocomplete__local"></span>
          <span v-else-if="props.item.type=='state'" class="autocomplete__icon autocomplete__state"></span>
          <span v-else-if="props.item.type=='genre'" class="autocomplete__icon autocomplete__genre"></span>
          <span v-else class="autocomplete__icon autocomplete__city"></span>
          <span>
          {{props.item.description}}
          </span>
        </a>
      </span>
    </div>
</suggestions>
</template>

<script>
import Vue from 'vue';
import suggestions from "v-suggestions";

import {
  searchService
} from "@/components/common/services/search";
import "v-suggestions/dist/v-suggestions.css";

export default {
  name: "App-search",
  components: {
    suggestions
  },
  data() {
    return {
      searchQuery: "",
      selectedSearchItem: null,
      options: {
        debounce: 200,
        inputClass: 'inputautocomplete',
      }
    };
  },
  methods: {

    /** 
     * Identificar enter na pesquisa e limpar a query
     */
    keyup(event) {
      switch (event.key) {
        case "Enter":
          this.searchQuery = document.getElementsByClassName("inputautocomplete")[1].value;

          Vue.nextTick().then(response => {
            this.onSubmit(event);
          });
        break;
        default:
          if(/Android|webOS|iPhone||iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.searchQuery = querySelector('.header__mobile .inputautocomplete').value;
            this.$children.query = this.searchQuery;
            // this.$children[0].onQueryChanged(this.searchQuery);
          }
        break;
      }
    },
    onSubmit(e) {
      if (this.searchQuery == '') return
      if (e.keyCode == 13) {

        if (this.selectedSearchItem!=null) {
          this.goto(this.selectedSearchItem);
        }
        else {
          this.$router.push({
            name: 'search',
            params: {
              input: this.searchQuery
            }
          });
        }

        this.clear();
        e.preventDefault();

        setTimeout(() => {
          this.showItems = false
        }, 30)
      }
    },
    clear() {
      this.searchQuery = "";
      this.selectedSearchItem = null;
      this.$children[0].setItems([]);
    },
    goto(item) {
      if (item.notselectable == 1) return;

      switch (item.type) {
        case "local":
          this.$router.push("/busca/local/" + item.description);
        break;
        case "genre":
          this.$router.push("/busca/genero/" + item.description);
        break;
        case "city":
          this.$router.push("/busca/cidade/" + item.description);
        break;
        case "state":
          this.$router.push("/busca/estado/" + item.description);
        break;
        case "event":
          this.$router.push(item.uri);
        break;
      }
      this.clear();
    },

    onInputChange(query) {
      if (query.trim().length === 0) {
        return null;
      }

      const items = [];
      return new Promise(resolve => {
        searchService.autocomplete(query).then(response => {
          response.forEach(item => {
            //if (item.id_evento === null && item.notselectable === 0) return;
            if (item.description) {
              if (item.description.length > 50) {
                item.description = item.description.substring(0, 50) + "...";
              }
              items.push(item);
            }
          });

          resolve(items);
        });
      });
    },
    onSearchItemSelected(item) {
      this.selectedSearchItem = item;
    },
    getAutocomplete(input) {
      searchService.autocomplete(input).then(
        response => {
          //console.log(response);
        },
        error => {
          this.toastError("Falha na execução.");
        }
      );
    }
  }
};
</script>
<style>
.noClick {
  cursor: default;
}
</style>
