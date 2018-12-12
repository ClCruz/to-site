import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const searchService = {
  autocomplete,
  searchPage
}

function autocomplete(input) {
  let url = config.api + `/v1/search/autocomplete.php?input=${input}`;
  var ret = new Promise(
    function (resolve, reject) {
      Vue.http.get(url).then(res => {
        resolve(res.body);
      }, err => {
        reject({
          error: true,
          msg: err
        });
      });
    }
  );
  return ret;
}

function searchPage(type, input, startAt, howMany, city, state) {
  let url = config.api + `/v1/search/result.php?input=${input}&type=${type}`;
  var ret = new Promise(
    function (resolve, reject) {
      Vue.http.get(url).then(res => {
        resolve(res.body);
      }, err => {
        reject({
          error: true,
          msg: err
        });
      });
    }
  );
  return ret;
}
