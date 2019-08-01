import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Appheader from './components/App-header.vue'
import Appfooter from './components/App-footer.vue'
import VueWait from 'vue-wait';
import vueAlert from 'vue-sweetalert2';
import VueHead from 'vue-head';
import VueAnalytics from 'vue-analytics';
import { partnerService } from '@/components/common/services/partner';
import VueLazyload from 'vue-lazyload'

import './registerServiceWorker';

export const serverBus = new Vue();

//Vue.config.productionTip = false;
Vue.use(VueHead);
Vue.use(VueWait);
Vue.use(vueAlert);
Vue.use(VueLazyload, {
  preLoad: 2,
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})

// Global Components
Vue.component('Appheader', Appheader);
Vue.component('Appfooter', Appfooter);

Vue.prototype.getWindow = window;

Vue.use(VueAnalytics, {
  id: () => partnerService.ga().then(response => {
    //console.log(response.ga_id);
    return response.ga_id;
  }),
  router
});


const vueApp = new Vue({
  el: '#app',
  router,
  store,
  wait: VueWait,
  render: h => h(App)
}).$mount('#app')
