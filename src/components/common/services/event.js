import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const eventService = {
  list,
  description,
  presentation,
  rooms,
  dates,
  banner
}

function list(city,state) {
  if (city == null) city = "";
  if (state == null) state = "";
  
  let url = config.api + `/v1/home/card?city=${city}&state=${state}`;

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
function banner(city,state) {
  if (city == null) city = "";
  if (state == null) state = "";
  
  let url = config.api + `/v1/home/banner?city=${city}&state=${state}`;

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

function description(key) {
  let url = config.api + `/v1/event/get?key=${key}`;

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
function presentation(id_base,codPeca) {
  let url = config.api + `/v1/event/presentation?id_base=${id_base}&codPeca=${codPeca}`;

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
function rooms(id_base,codPeca) {
  let url = config.api + `/v1/event/rooms?id_base=${id_base}&codPeca=${codPeca}`;

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
function dates(id_base,codPeca) {
  let url = config.api + `/v1/event/dates?id_base=${id_base}&codPeca=${codPeca}`;

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
