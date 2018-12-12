import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const eventService =  {
    list,
    listEventDays,
    listEventDayHours,
    getMap,
    getSeats,
    get
}

function list(id_base) {
    let url = config.api + `/v1/ticketoffice/event/list?id_base=${id_base}`;

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
function listEventDays(id_base, codPeca) {
    let url = config.api + `/v1/ticketoffice/event/days?id_base=${id_base}&codPeca=${codPeca}`;

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
function listEventDayHours(id_base, codPeca, datePresentation) {
    let url = config.api + `/v1/ticketoffice/event/hours?id_base=${id_base}&codPeca=${codPeca}&datePresentation=${datePresentation}`;

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
function getMap(id_base, id_apresentacao) {
    let url = config.api + `/v1/event/map?id_base=${id_base}&id=${id_apresentacao}`;

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
function getSeats(id_base, id_apresentacao, id) {
    let url = config.api + `/v1/event/seats?id_base=${id_base}&id_apresentacao=${id_apresentacao}&id=${id}`;

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
function get(id_base, id) {
    let url = config.api + `/v1/ticketoffice/event/get?id_base=${id_base}&id=${id}`;

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
