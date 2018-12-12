import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const baseService =  {
    listBase,
}

function listBase(id_ticketoffice_user) {
    let url = config.api + `/v1/ticketoffice/bases?id_ticketoffice_user=${id_ticketoffice_user}`;

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
