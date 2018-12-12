let environment = '';

import Vue from 'vue';
import VueResource from "vue-resource";
import multi from "./multi";
import myconf from "./configs/config-vars";
import myinfo from "./configs/config-info";

Vue.use(VueResource);

environment = multi.env;

const configHelp = {
  environment,
  setapikey,
  info: myinfo
}

const defaultConfig = Object.assign({}, myconf, configHelp);

function setapikey() {
  Vue.http.interceptors.push((request, next) => {
      if (request.url.startsWith(defaultConfig.api)) {
        if (request.url.indexOf("apikey=")==-1) {
          if (request.url.indexOf("?")>-1) {
              request.url+="&apikey="+defaultConfig.apikey;
            }
            else {
              request.url+="?apikey="+defaultConfig.apikey;
            }
          }
      }
      next();
  });

}

export default Object.assign({}, defaultConfig);