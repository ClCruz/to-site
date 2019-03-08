import Vue from 'vue';
import Vuex from 'vuex';
const { func } = require('@/functions');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
  },
  mutations: {
    storeUser (state, userData) {
      state.token = userData.token;
      state.user = userData.user;
    },
    clearAuthData (state) {
      state.token = null
      state.user= null
    }
  },
  actions: {
    setLogoutTimer ({commit}, expirationTime) {
      //setTimeout(() => {
      //  commit('clearAuthData')
      //}, expirationTime * 1000)
    },
    login ({commit, dispatch}, auth) {
        const now = new Date()
        const expirationDate = new Date(auth.tokenValidUntil);
        
        func.methods.ls_add('token', auth.token);
        func.methods.ls_add('id', auth.id);
        func.methods.ls_add('expirationDate', expirationDate);
        commit('storeUser', {
          token: auth.token,
          user: auth
        });
        //dispatch('setLogoutTimer', 30)
    },
    logout ({commit}) {
      commit('clearAuthData');
      func.methods.ls_remove("base");
      func.methods.ls_remove("operation");
      func.methods.ls_remove("expirationDate");
      func.methods.ls_remove("token");
      func.methods.ls_remove("id");
      func.methods.ls_remove("client");
      func.methods.ls_remove("fb_connect");
      func.methods.ls_remove("add_user");
      window.location = "/";

      //router.replace('/');
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.token !== null
    }
  }
})
