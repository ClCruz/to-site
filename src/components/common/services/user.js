import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const usersiteService = {
  add,
  save,
  reset,
  newpass,
  documenttype,
  resetvalidatecode,
}

function documenttype() {    
    let url = config.api + `/v1/user/documenttype`;

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
function resetvalidatecode(code) {
    let url = config.api + `/v1/user/resetvalidatecode`;
    
      let obj = {
        code
      }
  
      var ret = new Promise(
          function (resolve, reject) {
              Vue.http.post(url, obj, {
                  emulateJSON: true
              }).then(res => {
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
function reset(email) {
  let url = config.api + `/v1/user/resetemail`;

    let isadd = 1;

    let obj = {
      email
    }

    var ret = new Promise(
        function (resolve, reject) {
            Vue.http.post(url, obj, {
                emulateJSON: true
            }).then(res => {
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
function newpass(code, pass) {
  let url = config.api + `/v1/user/newpass`;

    let obj = {
      pass,code
    }

    var ret = new Promise(
        function (resolve, reject) {
            Vue.http.post(url, obj, {
                emulateJSON: true
            }).then(res => {
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

function add(firstname, lastname, gender, birthdate, document, documenttype, brazilian_rg, phone_ddd, phone_number, zipcode, city_state, city, neighborhood, address, address_number, address_more, login, pass, newsletter, agree, fb, isforeign) {
  let url = config.api + `/v1/user/save`;

    let isadd = 1;

    let obj = {
      firstname, lastname, gender, birthdate, document, documenttype, brazilian_rg, phone_ddd, phone_number, zipcode, city_state, city, neighborhood, address, address_number, address_more, login, pass, newsletter: newsletter ? 1 : 0, agree: agree ? 1 : 0, fb, isforeign: isforeign ? 1 : 0,
      type: isadd
    }

    var ret = new Promise(
        function (resolve, reject) {
            Vue.http.post(url, obj, {
                emulateJSON: true
            }).then(res => {
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
function save(firstname, lastname, gender, birthdate, document, documenttype, brazilian_rg, phone_ddd, phone_number, zipcode, city_state, city, neighborhood, address, address_number, address_more, login, pass, newsletter, agree, fb, isforeign) {
  let url = config.api + `/v1/user/save`;

    let isadd = 0;

    let obj = {
      firstname, lastname, gender, birthdate, document, documenttype, brazilian_rg, phone_ddd, phone_number, zipcode, city_state, city, neighborhood, address, address_number, address_more, login, pass, newsletter, agree, fb, isforeign,
      isadd
    }

    var ret = new Promise(
        function (resolve, reject) {
            Vue.http.post(url, obj, {
                emulateJSON: true
            }).then(res => {
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
