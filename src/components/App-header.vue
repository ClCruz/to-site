<template>
<div class="a">

  <div class="header">
    <!-- header das paginas (menos evento) -->

    <div class="row" v-if="!$route.path.includes('/evento') && !$route.path.includes('/itau')">

      <div class="col-md-2">
        <div class="header__logo text-right" v-if="$route.path==='/' || $route.path.includes('/busca') ||$route.path.includes('/sac')  ? false : true">
          <router-link to="/">
            <div class="img"></div>
                        <img src="" class="hidden" alt="Home">
          </router-link>
        </div>
      </div>
      <div class="col-md-9">
        <!-- Use any element to open/show the overlay navigation menu -->
        <div id="nav-icon3" class="toggle nav__hamburger" @click="toggleNav()" @keyup.esc="toggleNav()">
          <span></span>
          <span></span>
          <span></span>
          <span></span> 
        </div>
        <span v-if="!isLogged" class="header__signin hidden-xs hidden-sm" @click="login">Entrar</span>
        <span v-if="!isLogged" class="header__signin-mobile" @click="login"><img src="../assets/icons/log-in.svg" alt=""></span>

        <div class="mx-auto text-center" style="width: 65%; align-self: center">
          <app-search></app-search>
        </div>
        <div id="myNav" class="overlay">
          <!-- Overlay content -->
          <div class="overlay-content">
            <a href="#" @click="loadSACPage('company','sobre')">
              Sobre a empresa
            </a>
            <a href="#" @click="loadSACPage('policy','venda')">
              Politica de Venda
            </a>
            <a href="#" @click="loadSACPage('policy','desconto')">
              Política de Meia Entrada
            </a>
            <a href="#" @click="loadSACPage('policy','privacidade')">
              Politica de Privacidade
            </a>
            <a href="#" @click="loadSACPage('partner','sejaParceiro')">
              Seja nosso Parceiro
            </a>
          </div>

        </div>
      </div>
      <div class="col-md-9" v-if="$route.path === '/busca222'">
        <span class="header__signin hidden-xs hidden-sm">Entrar</span>
        <span class="visible-xs visible-sm header__signin-mobile" style="float: right; display: none"><img src="../assets/icons/log-in.svg" alt=""></span>
        <div class="mx-auto text-center" style="width: 65%; align-self: center">
          <app-search></app-search>
        </div>
        <div id="myNav" class="overlay">

          <!-- Overlay content -->
          <div class="overlay-content">
            <a href="#" @click="loadSACPage('company','sobre')">
              Sobre a empresa
            </a>
            <a href="#" @click="loadSACPage('policy','venda')">
              Politica de Venda
            </a>
            <a href="#" @click="loadSACPage('policy','desconto')">
              Política de Meia Entrada
            </a>
            <a href="#" @click="loadSACPage('policy','privacidade')">
              Politica de Privacidade
            </a>
            <a href="#" @click="loadSACPage('partner','sejaParceiro')">
              Seja nosso Parceiro
            </a>
          </div>

        </div>
      </div>
      <!-- The overlay -->
    </div>
    <!-- header da evento -->
    <div class="row" v-if="$route.path.includes('/evento') && !$route.path.includes('/itau')">
      <div class="col-1">
        <div class="header__logo text-right" v-if="$route.path.includes('itau/evento')">
          <router-link to="/itau">
            <img src="../assets/logo-itau.png">
        </router-link>
        </div>
        <div class="header__logo text-right" v-else>
          <router-link to="/">
            <div class="img"></div>
          </router-link>
        </div>

      </div>
      <div class="col-1">
        <!-- Use any element to open/show the overlay navigation menu -->
        <div id="nav-icon3" class="toggle nav__hamburger" @click="toggleNav()" @keyup.esc="toggleNav()">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="col-8 signin-mobile-evento">

        <div class="mx-auto text-center" style="width: 65%; align-self: center">
          <app-search></app-search>
        </div>
      </div>
      <div class="col-2">
        <span v-if="!isLogged" class="header__signin hidden-xs hidden-sm" @click="login">Entrar</span>
        <span v-if="!isLogged" class="header__signin-mobile" @click="login"><img src="../assets/icons/log-in.svg" alt=""></span>

      </div>

      <div id="myNav" class="overlay">

        <!-- Overlay content -->
        <div class="overlay-content">
          <a href="#" @click="loadSACPage('company','sobre')">
              Sobre a empresa
            </a>
            <a href="#" @click="loadSACPage('policy','venda')">
              Politica de Venda
            </a>
            <a href="#" @click="loadSACPage('policy','desconto')">
              Política de Meia Entrada
            </a>
            <a href="#" @click="loadSACPage('policy','privacidade')">
              Politica de Privacidade
            </a>
            <a href="#" @click="loadSACPage('partner','sejaParceiro')">
              Seja nosso Parceiro
            </a>
        </div>

      </div>
    </div>
  </div>
  <b-navbar class="header__mobile" type="dark" variant="dark">

    <div id="myNavMobile" class="overlay">

      <!-- Overlay content -->
      <div class="overlay-content">
        <a href="#" @click="loadSACPage('company','sobre')">
              Sobre a empresa
            </a>
            <a href="#" @click="loadSACPage('policy','venda')">
              Politica de Venda
            </a>
            <a href="#" @click="loadSACPage('policy','desconto')">
              Política de Meia Entrada
            </a>
            <a href="#" @click="loadSACPage('policy','privacidade')">
              Politica de Privacidade
            </a>
            <a href="#" @click="loadSACPage('partner','sejaParceiro')">
              Seja nosso Parceiro
            </a>
      </div>

    </div>
    <div class="col-3 nav__mobile">
      <div id="nav-icon3" class="toggle nav__hamburger" @click="toggleNavMobile()" @keyup.esc="toggleNavMobile()">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="col-6 text-center mx-0 mx-auto">
      <b-navbar-brand class="" href="/">
        {{siteName}}
      </b-navbar-brand>
    </div>
    <div class="col-3">
      <div class="icon"></div>
      <span v-if="!isLogged" class="header__signin hidden-xs hidden-sm" @click="login">Entrar</span>
      <span v-if="!isLogged" class="header__signin-mobile" @click="login"><img src="../assets/icons/log-in.svg" alt=""></span>
    </div>
    <div class="col-12">
      <app-search></app-search>
    </div>
    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

</div>
</template>

<script>
import Vue from 'vue';
import VueResource from "vue-resource";
import VeeValidate from 'vee-validate';
import config from '@/config';
import {
  func
} from '@/functions';
import {
  authService
} from "../components/common/services/auth";

import AppSearch from "@/components/App-search.vue";
import $ from "jquery";

export default {
  name: "AppHeader",
  components: {
    AppSearch
  },
  mixins: [func],
  data: function () {
    return {
      menuOpen: false,
      form: {
        login: null,
        pass: null,
      },
        siteName: config.info.siteName,
    };
  },
  computed: {
    isLogged() {
      if (!this.ls_get("client")) return false;

      let logged = JSON.parse(this.ls_get("client"));
      if (!logged) return false;

      return true;
    },
    clientName() {
      if (!this.ls_get("client")) return "";

      let logged = JSON.parse(this.ls_get("client"));
      if (!logged) return "";

      return logged.name;
    },
    token() {
      if (!this.ls_get("client")) return "";

      let logged = JSON.parse(this.ls_get("client"));
      if (!logged) return "";

      return logged.token;
    },
  },
  mounted() {},
  methods: {
    loadSACPage: function (categoria, pagina) {
      switch (categoria) {
        case "company":
          this.$router.push("/sac/empresa/" + pagina);
          break;
        case "policy":
          this.$router.push("/sac/politica/" + pagina);
          break;
        case "partner":
          this.$router.push("/sac/parceiros/" + pagina);
          break;
      }
    },
    setClient(obj) {
      if (obj.logged) {
        this.ls_add("client", JSON.stringify({
          name: obj.name,
          token: obj.token,
          login: obj.login,
        }));
        this.$parent.idappheader = this.$parent.idappheader + 1;
        this.toastSuccess(`Seja bem vindo ${obj.name}.`);
      } else {
        this.toastError(obj.msg);
      }
    },
    makeLogin() {
      
    },

    goto(to, item = null) {
      switch (to) {
        case "legacy:my_account":
          this.gotoLegacy(null, "myaccount");
          break;
        case "system:logout":
          this.$store.dispatch('logout');
          break;
      }
    },

    login() {
      this.$swal.queue([{
          showCancelButton: false,
          allowEscapeKey: true,
          allowOutsideClick: () => !this.$swal.isLoading(),
          allowEnterKey: false,
          confirmButtonText: 'Continuar',
          position: 'center',
          input: 'email',
          showCloseButton: true,
          animation: false,
          customClass: 'swal-theme',
          inputPlaceholder: 'Digite seu e-mail',
          text: 'Já tem cadastro?',
          footer: `<a href="${config.legacy}/comprar/querocadastrar.php">Não tenho conta? Clique aqui.</a>`,
          progressSteps: ['1', '2', '3'],
          preConfirm: (login) => {
            this.form.login = login;
            authService.check(login).then(
              response => {
                if (this.validateJSON(response)) {
                  if (response.exist == 1) {
                    this.$swal.insertQueueStep({
                      position: 'center',
                      allowEscapeKey: true,
                      allowOutsideClick: true,
                      showCloseButton: true,
                      allowEnterKey: true,
                      input: 'password',
                      inputPlaceholder: 'Digite sua senha',
                      footer: `<a href="${config.legacy}/comprar/minha_conta.php">Esqueceu sua senha? Clique aqui.</a>`,
                      inputAttributes: {
                        maxlength: 100,
                        autocapitalize: 'off',
                        autocorrect: 'off'
                      },
                      progressSteps: ['1', '2', '3', '4'],
                      preConfirm: (pass) => {
                        this.form.pass = pass;
                        this.makeLogin();
                      }
                    });
                    this.$swal.clickConfirm();
                  } else {
                    this.$swal.insertQueueStep({
                      position: 'center',
                      type: 'error',
                      showCloseButton: true,
                      allowEscapeKey: true,
                      allowOutsideClick: true,
                      allowEnterKey: true,
                      text: 'E-mail não existe.',
                      progressSteps: ['1', '2', '3'],
                    });
                    this.$swal.clickConfirm();
                  }
                }
              },
              error => {
                this.toastError("Falha na execução.");
              }
            );
          },
        },
        {
          title: 'Verificando',
          position: 'center',
          showConfirmButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          allowEnterKey: false,
          progressSteps: ['1', '2', '3'],
        }
      ]).then((result) => {
        if (result.value) {} else if (result.dismiss === this.$swal.DismissReason.cancel) {

        }
      });
    },
    toggleNav() {
      document.getElementById("myNav").style.width = "0%";
      $(".toggle").removeClass("open");

      if (!this.menuOpen) {
        document.getElementById("myNav").style.width = "100%";
        $(".toggle").addClass("open");
      } else {
        document.getElementById("myNav").style.width = "0%";
        $(".toggle").removeClass("open");
      }
      this.menuOpen = !this.menuOpen;
    },
    toggleNavMobile() {
      document.getElementById("myNavMobile").style.width = "0%";
      $(".toggle").removeClass("open");

      if (!this.menuOpen) {
        document.getElementById("myNavMobile").style.width = "100%";
        $(".toggle").addClass("open");
      } else {
        document.getElementById("myNavMobile").style.width = "0%";
        $(".toggle").removeClass("open");
      }
      this.menuOpen = !this.menuOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
/* The Overlay (background) */
.overlay {
  /* Height & width depends on how you want to reveal the overlay (see JS below) */
  height: 100%;
  width: 0;
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 0;
  top: 0;
  background-color: rgb(0, 0, 0);
  /* Black fallback color */
  background-color: rgba(0, 0, 0, 0.9);
  /* Black w/opacity */
  overflow-x: hidden;
  /* Disable horizontal scroll */
  transition: 0.5s;
  /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
}

/* Position the content inside the overlay */
.overlay-content {
  position: relative;
  top: 25%;
  /* 25% from the top */
  width: 100%;
  /* 100% width */
  text-align: center;
  /* Centered text/links */
  margin-top: 15px;
  /* 30px top margin to avoid conflict with the close button on smaller screens */
}

/* The navigation links inside the overlay */
.overlay a {
  padding: 8px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  /* Display block instead of inline */
  transition: 0.3s;
  /* Transition effects on hover (color) */
}

/* When you mouse over the navigation links, change their color */
.overlay a:hover,
.overlay a:focus {
  color: #f1f1f1;
}

.toggle {
  z-index: 5000;
  color: #fff;
  position: absolute;
  cursor: pointer;
  align-self: center;
}

.header__signin {
  color: #fff;
  cursor: pointer;
}

.header__signin:after {
  font: normal 0.6em StripeIcons;
  content: "\2192";
  padding-left: 5px;
}

#nav-icon1,
#nav-icon2,
#nav-icon3,
#nav-icon4 {
  width: 24px;
  height: 100%;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  position: absolute;
}

#nav-icon1 span,
#nav-icon3 span,
#nav-icon4 span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: #fff;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

#nav-icon3 span:nth-child(1) {
  top: 5px;
}

#nav-icon3 span:nth-child(2),
#nav-icon3 span:nth-child(3) {
  top: 15px;
}

#nav-icon3 span:nth-child(4) {
  top: 25px;
}

#nav-icon3.open span:nth-child(1) {
  top: 24px;
  width: 0%;
  left: 50%;
}

#nav-icon3.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#nav-icon3.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#nav-icon3.open span:nth-child(4) {
  top: 18px;
  width: 0%;
  left: 50%;
}

/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
@media screen and (max-height: 450px) {
  .overlay a {
    font-size: 20px;
  }

  .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
}
</style>
