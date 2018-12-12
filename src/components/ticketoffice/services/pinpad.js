import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const pinpadService =  {
    add,
    get,
    purchase,
    sync,
    status,
    ping,
    clear
}
function add(id_ticketoffice_user,id_base,codPeca,id_apresentacao, payment, clientCode) {
    let url = config.api + `/v1/ticketoffice/pinpad/add?id_ticketoffice_user=${id_ticketoffice_user}&id_base=${id_base}&codPeca=${codPeca}&id_apresentacao=${id_apresentacao}&payment=${payment}&clientCode=${clientCode}`;

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
function get(key) {
    let url = config.api + `/ticketoffice/pinpad/get?key=${key}`;

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

function purchase(key) {
    let url = config.pinpad + `/pinpad/charge?key=${key}`;

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
function sync() {
    let url = config.pinpad + `/pinpad/sync`;

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
function status(key) {
    let url = config.pinpad + `/status?key=${key}`;

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
function ping(key) {
    let url = config.pinpad + `/ping?key=${key}`;

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
function clear() {
    let url = config.pinpad + `/resetCache`;

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
