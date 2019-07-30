import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const citiesService =  {
    get,
}

function get() {
    let url = config.api + `/v1/home/cities`;

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
