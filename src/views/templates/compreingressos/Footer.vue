<template>
<div>
  <footer class="fdb-block bg-dark">
    <div class="container">
      <div class="row align-items-top text-center text-md-left">
        <div class="col-12 col-md">
         
        </div>

      </div>
      <div v-if="siteName == 'ingressoparatodos.com.br'" class="col-12 col-md mt-5 mt-md-0 text-md-left">
        <h3><strong>Realização:</strong></h3>

        <img style="width: 80%;" src="/assets/logo-parceiro-construcao.png" alt="">

          </div>

      </div>
         <div class="footer__logo text-center mb-3">
            <router-link to="/">
              <div class="img" style="    height: 90px !important; background-position: center !important;"></div>
            </router-link>
          </div>
      <div class="row mt-5 footer-name nopadding">
        <div class="col text-center">
          <p>{{companyName}} </p>
        </div>
    </div>
  </footer>
</div>
</template>

<script>
import config from '@/config';
import {
  authService
} from "@/components/common/services/auth";
import {
  func
} from '@/functions';
import {
  staticPageService
} from "@/components/common/services/static_page.js";

export default {
  name: "Footer",
  computed: {},
  methods: {
    checkSACPages() {
      staticPageService.check().then(
        response => {
          this.checkSAC = response;
          // console.log(response);
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
    getSACContent() {
      for (var i = 1; i <= 5; i++) {
        staticPageService.get(i).then(

          response => {
            this.getSAC.push(response);
          },
          error => {
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");
          }
        );
      }
      // console.log(this.getSAC);

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
      getSAC: [],
      checkSAC: [],
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
  mounted() {
    this.$nextTick(() => {
      this.checkSACPages();
      //this.$refs.slick.reSlick();
    });
    // this.getSACContent();
  },
};
</script>

<style lang="scss">
</style>
