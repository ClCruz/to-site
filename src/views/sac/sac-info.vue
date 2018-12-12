<template>
<div class="col-md-6">
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
</template>

<script>
export default {
  name: "SacInfo",
  computed: {},
  created: function() {
    this.toggleNav()
  },
  
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
