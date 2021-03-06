import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const authService = {
  check,
  login,
  loginbyfb,
  tokencheck,
  contact,
  keepalive,
}

function tokencheck(token) {
  let url = config.api + `/v1/auth/legacy/clienttoken`;
  
  let obj = {
    token,
  };

  var ret = new Promise(
      function (resolve, reject) {
          Vue.http.post(url, obj, { emulateJSON: true }).then(res => {
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

function check(login) {
  let url = config.api + `/v1/auth/legacy/logincheck`;
  let obj = {
    login,
  };

  var ret = new Promise(
      function (resolve, reject) {
          Vue.http.post(url, obj, { emulateJSON: true }).then(res => {
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

function loginbyfb(fb, email) {
  let url = config.api + `/v1/auth/legacy/loginbyfb`;

  let obj = {
      fb,
      email,
  };

  var ret = new Promise(
      function (resolve, reject) {
          Vue.http.post(url, obj, { emulateJSON: true }).then(res => {
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

function login(login, pass) {
  let url = config.api + `/v1/auth/legacy/login`;

  let obj = {
      login,
      pass,
  };

  var ret = new Promise(
      function (resolve, reject) {
          Vue.http.post(url, obj, { emulateJSON: true }).then(res => {
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
function contact(obj) {
  let url = config.api + `/v1/help/send`;


  var ret = new Promise(
      function (resolve, reject) {
          Vue.http.post(url, obj, { emulateJSON: true }).then(res => {
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
function keepalive(token) {
  if (token == "" || token == undefined || token == null)
    return;

  let url = config.api + `/v1/auth/legacy/keepalive?token=${token}`;
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
