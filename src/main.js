import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Appheader from './components/App-header.vue'
import Appfooter from './components/App-footer.vue'
import VueWait from 'vue-wait';
import vueAlert from 'vue-sweetalert2';
import VueHead from 'vue-head';

//navigator.serviceWorker.register("./registerServiceWorker").then(function (reg) {
//  debugger;
//  console.log(JSON.stringify(reg));
//});
//debugger;
import './registerServiceWorker';

//Vue.config.productionTip = false;
Vue.use(VueHead);
Vue.use(VueWait);
Vue.use(vueAlert);

// Global Components
Vue.component('Appheader', Appheader)
Vue.component('Appfooter', Appfooter)

const vueApp = new Vue({
  el: '#app',
  router,
  store,
  wait: VueWait,
  render: h => h(App)
}).$mount('#app')
