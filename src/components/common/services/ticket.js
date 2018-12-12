import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const ticketService =  {
    types,
}

function types(id_base, codPeca, id_apresentacao) {
    let url = config.api + `/v1/purchase/ticket/types?id_base=${id_base}&codPeca=${codPeca}&id_apresentacao=${id_apresentacao}`;

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
