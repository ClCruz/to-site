import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import config from '@/config';

Vue.use(Router);


export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: to => {
        window.location = `${config.legacy}/admin`;
        return { path: '/', query: null }
      },
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/newHome',
      name: 'newHome',
      redirect: to => {
        window.location = `${config.legacy}/admin`;
        return { path: '/', query: null }
      },
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/resetpass/:key',
      name: 'resetpass',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/dologin',
      name: 'dologin',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/createaccount',
      name: 'createaccount',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/loginandshopping/:key',
      name: 'loginandshopping',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/evento/:key',
      name: 'event',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/Event.vue')
    },
    {
      path: '/espetaculos/:key',
      props: true,
      name: 'event2',
      component: () => import( /* webpackChunkName: "about" */ './views/Event.vue')
    },
    {
      path: '/busca/:input',
      name: 'search',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/Search.vue')
    },
    {
      path: '/busca/cidade/:input',
      name: 'search_bycity',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/Search.vue')
    },
    {
      path: '/busca/estado/:input',
      name: 'search_bystate',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/Search.vue')
    },
    {
      path: '/busca/local/:input',
      name: 'search_bylocal',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/Search.vue')
    },
    {
      path: '/busca/genero/:input',
      name: 'search_bygenre',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/Search.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/sac/parceiros/sejaParceiro',
      name: 'parceiro',
      component: () => import( /* webpackChunkName: "about" */ './views/sac/partner/partner.vue')
    },
    {
      path: '/sac/politica/venda',
      name: 'politicaVenda',
      component: () => import( /* webpackChunkName: "about" */ './views/sac/policy/sales.vue')
    },
    {
      path: '/sac/politica/desconto',
      name: 'politicaDesconto',
      component: () => import( /* webpackChunkName: "about" */ './views/sac/policy/discount.vue')
    },
    {
      path: '/sac/politica/privacidade',
      name: 'politicaPrivacidade',
      component: () => import( /* webpackChunkName: "about" */ './views/sac/policy/privacy.vue')
    },
    {
      path: '/sac/empresa/sobre',
      name: 'empresaSobre',
      component: () => import( /* webpackChunkName: "about" */ './views/sac/company/about.vue')
    },
    {path: '*', redirect: '/'}
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})