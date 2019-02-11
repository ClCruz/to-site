<template>
<footer class="to-block footer-small bg-dark mt-4" style="font-size: 12px">
  <div class="container  pt-4 pb-2">
    <div class="row text-center align-items-center">
      <div class="col-12 col-lg-2 text-lg-left">
        <div class="footer__logo text-left">
          <router-link to="/">
            <div class="img"></div>
          </router-link>
        </div>
      </div>

      <div class="col mt-4 mt-lg-0 text-center">

        <div class="row nopadding" style="justify-content: center!important">
          <ul class="nav justify-content-center mx-0 nopadding">
            <li class="nav-item">
              <a href="#" class="nav-link" @click="loadSACPage('company','sobre')">
                Sobre a empresa
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click="loadSACPage('policy','venda')">
                Politica de Venda
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click="loadSACPage('policy','desconto')">
                Política de Meia Entrada
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click="loadSACPage('policy','privacidade')">
                Politica de Privacidade
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click="loadSACPage('partner','sejaParceiro')">
                Seja nosso Parceiro
              </a>
            </li>
          </ul>
        </div>
        <div class="row nopadding mt-4" style="justify-content: center!important" v-if="isPartner()">
          <ul class="nav justify-content-center mx-0 nopadding text-center" >
            <li v-for="(item) in listPartners" v-bind:key="item" class=" ml-3 mr-3 pl-3 pr-3 nav-item text-center mx-0 mx-auto">

              <a :href="item.url" v-if="item.name != 'Localhost'">
               <img :src="item.img" style="width: 70px"> 

             </a>
            </li>

          </ul>
        </div>
        <div class="row mt-4 nopadding">
          <div class="col text-center">
            <span>{{companyName}} - {{companyAddress}} - CNPJ: {{CNPJ}} </span>
          </div>
        </div>
        <div class="row mt-4 nopadding mb-0 pb-0">
          <div class="col text-center">
            2018 {{siteName}}, Inc.
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-2 mt-4 mt-lg-0 text-lg-right">
        <a @click="contact" style="cursor: pointer">Atendimento ao cliente</a>
      </div>
    </div>

  </div>
</footer>
</template>

<script>
import config from '@/config';
import {
  authService
} from "@/components/common/services/auth";
import {
  func
} from '@/functions';
export default {
  name: "Footer",
  computed: {},
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
    isPartner() {
      return this.listPartners.filter(x => x.name == this.siteName).length > 0;
    },
    contact() {
      this.$swal.queue([{
        title: 'Atendimento ao cliente',
        html: '<input id="swal-email1" type="text" required placeholder="Digite seu nome" name="name" class="swal2-input">' +
          '<input id="swal-email2" type="email" required  placeholder="Digite seu email" name="email" class="swal2-input">' +
          '<input id="swal-email3" type="text" required placeholder="Assunto" name="subject" class="swal2-input">' +
          '<input id="swal-email5" type="text" required placeholder="Número do pedido" name="id" class="swal2-input">' +
          '<textarea style="width: 80%; padding-top: 0.75rem" rows="4" id="swal-email4" placeholder="Conteudo" required> </textarea>',
        focusConfirm: false,
        preConfirm: () => {
          let name = document.getElementById('swal-email1').value;
          let email = document.getElementById('swal-email2').value;
          let subject = document.getElementById('swal-email3').value;
          let content = document.getElementById('swal-email4').value;
          let id = document.getElementById('swal-email5').value;

          this.contact = {
            name,
            email,
            subject,
            content,
            id
          };
          authService.contact(this.contact).then(
            response => {
              if (this.validateJSON(response)) {
                this.toastSuccess("Email enviado");
              }
            },
            error => {
              this.toastError("Falha na execução.");
            }
          );
        }
      }]).then((result) => {
        if (result.value) {} else if (result.dismiss === this.$swal.DismissReason.cancel) {

        }
      });
    },
  },

  data: function () {
    return {
      siteName: config.info.siteName,
      CNPJ: config.info.CNPJ,
      companyName: config.info.companyName,
      companyAddress: config.info.companyAddress,
      listPartners: [{
          "name": "www.bilhete.promo",
          "url": "http://bilhete.promo",
          "img": "/assets/logo-bilhetepromo.png"
        },
        {
          "name": "BR INGRESSOS.com.br",
          "url": "http://bringressos.com.br",
          "img": "/assets/logo-bringressos.svg"
        },
        {
          "name": "www.ingresso.promo",
          "url": "http://ingresso.promo",
          "img": "/assets/logo-ingressopromo.png"
        },
        {
          "name": "www.ingresso.store",
          "url": "https://www.ingresso.store/",
          "img": "/assets/logo-ingressostore.png"
        },
        {
          "name": "www.ingressos.store",
          "url": "https://www.ingressos.store/",
          "img": "/assets/logo-ingressosstore.jpeg"
        },
        {
          "name": "www.meuingresso.promo",
          "url": "https://meuingresso.promo",
          "img": "/assets/logo-meuingressopromo.png"
        },
        {
          "name": "www.teatroparatodos.club",
          "url": "https://teatroparatodos.club",
          "img": "/assets/logo-teatroparatodosclub.jpeg"
        },
        {
          "name": "www.teatroparatodos.online",
          "url": "https://teatroparatodos.online",
          "img": "/assets/logo-teatroparatodosonline.jpeg"
        },
        // {
        //   "name": "Localhost",
        //   "url": "localhost:8080",
        //   "img": "/assets/logo-teatroparatodosonline.jpeg"
        // },
      ]
    }
  },
  created() {
  },
};
</script>

<style lang="scss">
</style>
