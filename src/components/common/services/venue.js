import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const venueService = {
  get
}

function get(name) {

  
  let url = config.api + `/v1/place/get?name=${name}`;
  
  // console.log(url);
  
  let obj = {
    name
  };
  // console.log(name);

  // console.log(obj);

  var ret = new Promise(
      function (resolve, reject) {
          Vue.http.post(url, obj, { emulateJSON: true }).then(res => {
              resolve(res.body);
          },
          (err) => {
              console.log("Err", err);
            })
          .catch((e) => {
            console.log("Caught", e);
          })
      }
  );
  return ret;
}