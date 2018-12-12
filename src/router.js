import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import config from '@/config';

Vue.use(Router);
const TicketOfficeIndex = resolve => {
  require.ensure(['./views/ticketoffice/Index.vue'], () => {
    resolve(require('./views/ticketoffice/Index.vue'));
  }, 'ticketoffice');
};
const TicketOfficeLogin = resolve => {
  require.ensure(['./views/ticketoffice/Login.vue'], () => {
    resolve(require('./views/ticketoffice/Login.vue'));
  }, 'ticketoffice');
};
const TicketOfficeOperationCashRegister = resolve => {
  require.ensure(['./views/ticketoffice/operation/CashRegister.vue'], () => {
    resolve(require('./views/ticketoffice/operation/CashRegister.vue'));
  }, 'ticketoffice');
};
const TicketOfficePinpadConf = resolve => {
  require.ensure(['./views/ticketoffice/PinpadConf.vue'], () => {
    resolve(require('./views/ticketoffice/PinpadConf.vue'));
  }, 'ticketoffice');
};
const TicketOfficeOperation = resolve => {
  require.ensure(['./views/ticketoffice/Operation.vue'], () => {
    resolve(require('./views/ticketoffice/Operation.vue'));
  }, 'ticketoffice');
};
const TicketOfficeOperationMap = resolve => {
  require.ensure(['./views/ticketoffice/operation/Map.vue'], () => {
    resolve(require('./views/ticketoffice/operation/Map.vue'));
  }, 'ticketoffice');
};
const TicketOfficeClient = resolve => {
  require.ensure(['./views/ticketoffice/Client.vue'], () => {
      resolve(require('./views/ticketoffice/Client.vue'));
  }, 'ticketoffice');
};
const TicketOfficePurchase = resolve => {
  require.ensure(['./views/ticketoffice/Purchase.vue'], () => {
      resolve(require('./views/ticketoffice/Purchase.vue'));
  }, 'ticketoffice');
};
const TicketOfficeReservation = resolve => {
  require.ensure(['./views/ticketoffice/Reservation.vue'], () => {
      resolve(require('./views/ticketoffice/Reservation.vue'));
  }, 'ticketoffice');
};
const TicketOfficeMoviment = resolve => {
  require.ensure(['./views/ticketoffice/Moviment.vue'], () => {
      resolve(require('./views/ticketoffice/Moviment.vue'));
  }, 'ticketoffice');
};
const TicketOfficeCloseCR = resolve => {
  require.ensure(['./views/ticketoffice/CloseCR.vue'], () => {
      resolve(require('./views/ticketoffice/CloseCR.vue'));
  }, 'ticketoffice');
};
const TicketOfficeWithdrawCR = resolve => {
  require.ensure(['./views/ticketoffice/WithdrawCR.vue'], () => {
      resolve(require('./views/ticketoffice/WithdrawCR.vue'));
  }, 'ticketoffice');
};


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
      path: '/evento/:key',
      name: 'event',
      props: true,
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
      path: '/sac/',
      name: 'sac',
      props: true,
      component: () => import( /* webpackChunkName: "about" */ './views/SAC.vue')
    },
    {
      path: '/vClaudio',
      name: 'vClaudio',
      title: 'teste',
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/itau',
      name: 'itau',
      title: 'teste',
      component: () => import( /* webpackChunkName: "about" */ './views/itau/Home.vue')
    },
    {
      path: '/itau/evento',
      name: 'itauEvento',
      title: 'teste',
      component: () => import( /* webpackChunkName: "about" */ './views/itau/Event.vue')
    },
    {
      path: '/itau/busca',
      name: 'itauBusca',
      title: 'teste',
      component: () => import( /* webpackChunkName: "about" */ './views/itau/Search.vue')
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
    
    {
      path: '/ticketoffice',
      name: 'ticketoffice',
      component: () => import('./views/TicketOffice.vue'),
      children: [{
          path: '/ticketoffice/login',
          components: {
            routerView_ticketoffice: TicketOfficeLogin
          }
        },
        {
          path: '/ticketoffice/pinpadconf',
          components: {
            routerView_ticketoffice: TicketOfficePinpadConf
          }
        },
        {
          path: '/ticketoffice/operation/:type',
          components: {
            routerView_ticketoffice: TicketOfficeOperation
          }
        },
        {
          path: '/ticketoffice/operation/:type/seat',
          components: {
            routerView_ticketoffice: TicketOfficeOperationMap
          }
        },
        {
          path: '/ticketoffice/sell',
          components: {
            routerView_ticketoffice: TicketOfficeOperationCashRegister
          }
        },
        {
          path: '/ticketoffice/client',
          components: {
            routerView_ticketoffice: TicketOfficeClient
          }
        },
        {
          path: '/ticketoffice/purchase/search',
          components: {
            routerView_ticketoffice: TicketOfficePurchase
          }
        },
        {
          path: '/ticketoffice/reservation/search',
          components: {
            routerView_ticketoffice: TicketOfficeReservation
          }
        },
        {
          path: '/ticketoffice/cashregister/moviments',
          components: {
            routerView_ticketoffice: TicketOfficeMoviment
          }
        },
        {
          path: '/ticketoffice/cashregister/close',
          components: {
            routerView_ticketoffice: TicketOfficeCloseCR
          }
        },
        {
          path: '/ticketoffice/cashregister/withdraw',
          components: {
            routerView_ticketoffice: TicketOfficeWithdrawCR
          }
        },
      ]
    },
    {path: '*', redirect: '/'}
  ]
})