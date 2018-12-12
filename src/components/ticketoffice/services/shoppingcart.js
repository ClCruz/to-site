import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const shoppingCartService =  {
    add,
    update,
    del,
    delByIndice,
    list,
    clear,
}

function add(id, id_base, currentStep, id_event, id_apresentacao, indice, quantity, id_payment_type, amount, amount_discount, amount_topay) {
    let url = config.api + `/v1/ticketoffice/shoppingcart/add?id_ticketoffice_user=${id}&id_base=${id_base}&currentStep=${currentStep}&id_event=${id_event}&id_apresentacao=${id_apresentacao}&indice=${indice}&quantity=${quantity}&id_payment_type=${id_payment_type}&amount=${amount}&amount_discount=${amount_discount}&amount_topay=${amount_topay}`;

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
function update(id_base, id, indice, id_ticket_type) {
    let url = config.api + `/v1/ticketoffice/shoppingcart/update?id_base=${id_base}&id=${id}&indice=${indice}&id_ticket_type=${id_ticket_type}`;

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
function del(id, id_payment_type) {
    let url = config.api + `/v1/ticketoffice/shoppingcart/delete_other?id_ticketoffice_user=${id}&id_payment_type=${id_payment_type}`;

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
function delByIndice(id, indice) {
    let url = config.api + `/v1/ticketoffice/shoppingcart/delete?id_ticketoffice_user=${id}&indice=${indice}`;

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
function list(id) {
    let url = config.api + `/v1/ticketoffice/shoppingcart/add?id_ticketoffice_user=${id}`;

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
function clear(id) {
    let url = config.api + `/v1/ticketoffice/shoppingcart/clear?id_ticketoffice_user=${id}`;

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
