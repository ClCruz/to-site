import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';

Vue.use(VueResource);

config.setapikey();

export const authTicketOffice =  {
    login,
    token,
    //logout,
}

function login(user, pass) {
    let url = config.api + `/v1/auth/ticketoffice/login`;
    
    let obj = {
        login: user,
        password: pass,
    }

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
function token(token) {
    let url = config.api + `/v1/auth/ticketoffice/token?id=${token}`;

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