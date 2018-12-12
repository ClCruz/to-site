import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const purchaseService =  {
    create,
    refund,
    get,
    whatshouldido,
    lastsells,
}

function create(id_base, id_ticketoffice_user, id_payment, isComplementoMeia, codCliente) {    
    let url = config.api + `/v1/purchase/create?id_base=${id_base}&id_ticketoffice_user=${id_ticketoffice_user}&id_payment=${id_payment}&isComplementoMeia=${isComplementoMeia}&codCliente=${codCliente}`;

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

function refund(id_base, id_ticketoffice_user, codVenda, all, indiceList, dogateway) {
    let url = config.api + `/v1/purchase/refund?id_base=${id_base}&id_ticketoffice_user=${id_ticketoffice_user}&codVenda=${codVenda}&all=${all}&indiceList=${indiceList}&dogateway=${dogateway}`;

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
function lastsells(id_base, id) {
    let url = config.api + `/v1/purchase/lastsells?id_base=${id_base}&id=${id}`;

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
function get(id_base, codVenda, nin, id_apresentacao) {
    let url = config.api + `/v1/purchase/get?id_base=${id_base}&codVenda=${codVenda}&nin=${nin}&id_apresentacao=${id_apresentacao}`;

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
function whatshouldido(id_base, id_ticketoffice_user, id_payment) {
    let url = config.api + `/v1/purchase/whatshouldido?id_base=${id_base}&id_ticketoffice_user=${id_ticketoffice_user}&id_payment=${id_payment}`;

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
