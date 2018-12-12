import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const clientService =  {
    add,
    get,
}

function add(id_base, nin, rg, name, email, phoneDDD, phone, phoneRamal, cardBin, makeCode) {
    let url = config.api + `/v1/ticketoffice/client/add?id_base=${id_base}`;

    let obj = {
        nin,
        rg,
        name,
        email,
        phone: {
            ddd: phoneDDD,
            number: phone,
            ramal: phoneRamal
        },
        cardBin,
        makeCode
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
function get(id_base, nin, code) {
    let url = config.api + `/v1/ticketoffice/client/get?id_base=${id_base}&nin=${nin}&code=${code}`;
  
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