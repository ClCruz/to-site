<template>
<div class="col-md-6" v-if="template != 'ingressaria'">
  <div class="row">
    <div class="col-md-12">

      <div class="content__description content__sac">
        <div class="card event__card sac__card">
          <h3 class="title__page">SAC</h3>

          <p>Institucional</p>
          <b-link href="#" @click="loadSACPage('company','sobre')">Sobre a empresa</b-link>

          <p>Politicas</p>
          <b-link href="#" @click="loadSACPage('policy','venda')">
            Politica de Venda
          </b-link>

          <b-link href="#" @click="loadSACPage('policy','desconto')">
            Política de Meia Entrada
          </b-link>

          <b-link href="#" @click="loadSACPage('policy','privacidade')">
            Politica de Privacidade
          </b-link>

          <p>Parceiros</p>

          <b-link href="#" @click="loadSACPage('partner','sejaParceiro')">
            Seja nosso Parceiro
          </b-link>

        </div>
      </div>
    </div>
  </div>
</div>

  <div class="col-10 col-sm-6 m-auto m-lg-0 col-lg-4" v-else-if="template == 'ingressaria'">
    <h1 class="">SAC</h1>

    <h3>Institucional</h3>
    <b-link style="width: 100%" href="#" @click="loadSACPage('company','sobre')">Sobre a empresa</b-link>

    <h3>Politicas</h3>
    <ul style="padding-left: 0 ">
      <li>
    <b-link style="width: 100%" href="#" @click="loadSACPage('policy','venda')">
      Politica de Venda
    </b-link>
    </li>
<li>
    <b-link style="width: 100%" href="#" @click="loadSACPage('policy','desconto')">
      Política de Meia Entrada
    </b-link>
</li>
<li>
    <b-link style="width: 100%" href="#" @click="loadSACPage('policy','privacidade')">
      Politica de Privacidade
    </b-link>
    </li>
</ul>
    <h3>Parceiros</h3>

    <b-link style="width: 100%" href="#" @click="loadSACPage('partner','sejaParceiro')">
      Seja nosso Parceiro
    </b-link>

</div>
</template>

<script>
import config from "@/config";

import {
  func
} from "@/functions";

export default {
  name: "SacInfo",
  computed: {},
  created: function () {
    this.toggleNav()
  },
  mixins: [func],

  methods: {

    toggleNav() {
      if (document.querySelector('.open')) {
        document.querySelector('.open').removeAttribute('class', 'open')
      }
      document.getElementById("myNav").style.width = "0%";
    },
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
  }
};
</script>

<style lang="scss">
.component-fade-enter-active,
.component-fade-leave-active {
  transition: none;
}

.component-fade-enter,
.component-fade-leave-to

/* .component-fade-leave-active below version 2.1.8 */
  {
  opacity: 1;
}
</style>
