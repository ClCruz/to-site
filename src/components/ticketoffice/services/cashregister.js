import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const cashregisterService =  {
    open,
    shoppingCart,
    movimentsInDay,
    listToClose,
    current,
    close,
    withdraw,
    list,
    isok,
}
function isok(id_base, id) {
    let url = config.api + `/v1/ticketoffice/cashregister/isok?id=${id}&id_base=${id_base}`;

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
function open(id, id_base) {
    let url = config.api + `/v1/ticketoffice/cashregister/open?id_base=${id_base}`;

    let obj = {
        id,
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
function shoppingCart(id, id_base) {
    let url = config.api + `/v1/ticketoffice/cashregister/shoppingcart?id=${id}&id_base=${id_base}`;

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
function current(id_base, id) {
    let url = config.api + `/v1/ticketoffice/cashregister/current?id=${id}&id_base=${id_base}`;

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
function movimentsInDay(id, id_base, date) {
    let url = config.api + `/v1/ticketoffice/cashregister/moviment/inday?id=${id}&id_base=${id_base}&date=${date}`;

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
function close(id_base, id, amount, justificative) {
    let url = config.api + `/v1/ticketoffice/cashregister/close?id_base=${id_base}`;

    let obj = {
        id_ticketoffice_user: id,
        amount,
        justificative
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
function listToClose(id, id_base) {
    let url = config.api + `/v1/ticketoffice/cashregister/listtoclose?id=${id}&id_base=${id_base}`;

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
function withdraw(id_base, id_ticketoffice_user, payment,  amount, justificative) {
    let url = config.api + `/v1/ticketoffice/cashregister/withdraw?id_base=${id_base}`;

    let obj = {
        id_ticketoffice_user,
        payment,
        amount,
        justificative
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
function list(id_base, id, date, codMovimento) {
    let url = config.api + `/v1/ticketoffice/cashregister/moviment/list?id=${id}&id_base=${id_base}&date=${date}&codMovimento=${codMovimento}`;

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