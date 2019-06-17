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
    //compatibility
    {
      path: '/espetaculos/:key',
      props: true,
      name: 'espetaculos',
      component: () => import( /* webpackChunkName: "about" */ './views/Event.vue')
    },
    {
      path: '/espetaculos',
      props: true,
      name: 'espetaculos_home',
      beforeEnter: (to, from, next) => {
        if (to.query != null && to.query != undefined && to.query.cidade != null && to.query.cidade != undefined) {
          next({ path: `/cidade/${to.query.cidade}`, replace: true });
        }
        else {
          next();
        }
      },
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue'),
    },
    {
      path: '/teatros/',
      props: true,
      name: 'teatros',
      component: () => import( /* webpackChunkName: "about" */ './views/Search.vue')
    },
    {
      path: '/teatros/:input',
      props: true,
      name: 'teatros_search',
      beforeEnter: (to, from, next) => {
        let split = to.params.input.split("-");
        let tosearch = "";
        let removed = "";
        let stringToSearch = "";
        if (split.length == 1) {
          tosearch = to.params.input;
        }
        else {
          for (var i = 0; i < split.length; i++) {
            if (i > 0) tosearch += split[i] + " ";
          }

          stringToSearch = split[1] + " " + split[2];
        }

        next({ path: `/local/${tosearch}`, replace: true });
      },
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue'),
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
      path: '/venue/:key',
      name: 'venue',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/Venue.vue')
    },
    {
      path: '/busca/:input',
      name: 'search',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/Search.vue')
    },
    {
      path: '/teatro/:input',
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
      path: '/cidade/:input',
      name: 'search_bycity_without_search',
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
      path: '/local/:input',
      name: 'search_bylocal_without_search',
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