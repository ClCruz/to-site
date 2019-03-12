import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

//config.setapikey();

export const externalService = {
  cep
}

function cep(text) {
  let url = `https://api.postmon.com.br/v1/cep/${text}`;

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
