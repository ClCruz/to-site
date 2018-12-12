import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const printService =  {
    ticket,
    booking,
    moviment,
}

function ticket(id_base, codVenda, indice) {
    let url = config.api + `/v1/print/ticket?id_base=${id_base}&id=${codVenda}&indice=${indice}`;
    window.open(url);
}

function booking(id_base, codReserva, indice) {
    let url = config.api + `/v1/print/reservation?id_base=${id_base}&id=${codReserva}&indice=${indice}`;
    window.open(url);
}
function moviment(id_base, id, date, codMovimento) {
    let url = config.api + `/v1/print/cashregister/moviment?id_base=${id_base}&id=${id}&date=${date}&codMovimento=${codMovimento}`;
    window.open(url);
}