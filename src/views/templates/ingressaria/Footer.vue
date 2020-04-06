<template>
  <div>
    <footer class="fdb-block bg-dark">
      <div class="container">
        <div class="row align-items-top text-center text-md-left">
          <div class="col-12 col-md">
            <div class="footer__logo text-left mb-3">
              <router-link to="/">
                <div class="img" style></div>
              </router-link>
            </div>
            <!-- mudança wihtelabel bilheteriacom -->
            <div
              class="logos__footer text-left mb-3"
              v-if="siteName == 'Bilheteria.com.br' || siteName == 'convenia.bilheteria.com.br' "
            >
              <img src="assets/images/abqvpng.png" alt />
              <img src="assets/images/abrhpng.png" alt />
              <img src="assets/images/adibrapng.png" alt />
            </div>
            <!-- fim mudança wihtelabel bilheteriacom -->
          </div>

          <div class="col-12 col-md mt-4 mt-sm-0">
            <h3>
              <strong>Institucional</strong>
            </h3>
            <template>
              <a @click="contact" style="cursor: pointer">Atendimento ao cliente</a>
              <br />
            </template>

            <template v-if="checkSAC[0] != undefined && checkSAC[0].isvisible == 1">
              <a href="#" @click="loadSACPage('company','sobre')">Sobre a empresa</a>
              <br />
            </template>
            <template v-if="checkSAC[4] != undefined && checkSAC[4].isvisible == 1">
              <a href="#" @click="loadSACPage('partner','sejaParceiro')">Seja nosso Parceiro</a>
            </template>
          </div>

          <div class="col-12 col-md mt-5 mt-md-0 text-md-left">
            <h3>
              <strong>Políticas</strong>
            </h3>
            <template v-if="checkSAC[1] != undefined && checkSAC[1].isvisible == 1">
              <a href="#" @click="loadSACPage('policy','venda')">Politica de Venda</a>
              <br />
            </template>
            <template v-if="checkSAC[3] != undefined && checkSAC[3].isvisible == 1">
              <a href="#" @click="loadSACPage('policy','desconto')">Política de Meia Entrada</a>
              <br />
            </template>
            <template v-if="checkSAC[2] != undefined && checkSAC[2].isvisible == 1">
              <a href="#" @click="loadSACPage('policy','privacidade')">Politica de Privacidade</a>
            </template>
            <div
              class="mt-3"
              v-if="siteName != 'convenia.bilheteria.com.br' && siteName != 'Bilheteria.com.br'"
            >
              <City-list></City-list>
            </div>
          </div>
          <!-- mudança wihtelabel bilheteriacom -->
          <div
            class="col-12 col-md mt-5 mt-md-0 text-md-left"
            v-if="siteName == 'Bilheteria.com.br' || siteName == 'convenia.bilheteria.com.br' "
          >
            <h3>
              <strong>Siga-nos</strong>
            </h3>
            <div class="social__media">
              <a href="https://www.facebook.com/bilheteriacom/" target="blank">
                <img src="/assets/images/logo-facebook.png" alt />
              </a>
              <a href="https://www.instagram.com/bilheteriacom/" target="blank">
                <img src="/assets/images/logo-instagram.png" alt />
              </a>
              <a href="https://twitter.com/bilheteriacom" target="blank">
                <img src="/assets/images/logo-twitter.png" alt />
              </a>
              <a href="https://www.youtube.com/channel/UC1_gz9OCwU49rIzLZB0QlWg" target="blank">
                <img src="/assets/images/logo-youtube.png" alt />
              </a>
            </div>
            <h3>
              <strong>Central de atendimento</strong>
            </h3>
            <p>(11) 3030-3033</p>
            <h3>
              <strong>Whatsapp</strong>
            </h3>
            <p>(11) 99607-9544</p>
          </div>

          <!-- fim mudança wihtelabel bilheteriacom -->
          <div class="col-12 col-md mt-5 mt-md-0 text-md-left">
            <h3>
              <strong>Formas de Pagamento</strong>
            </h3>
            <div class="credit__cards col-10 nopadding p-0">
              <img src="/assets/images/logo-visa.png" alt />
              <img src="/assets/images/logo-mastercard.png" alt />
              <img src="/assets/images/logo-amex.png" alt />
              <img src="/assets/images/logo-discover.png" alt />
              <img src="/assets/images/logo-elo.png" alt class="credit__cards-elo" />
              <img src="/assets/images/logo-hipercard.png" class="credit__cards-hipercard" alt />
              <img src="/assets/images/logo-diners.png" alt />
              <img src="/assets/images/logo-aura.png" alt class="credit__cards-aura" />
              <img src="/assets/images/logo-jcb.png" alt />
              <img src="/assets/images/logo-boleto.png" alt />
              <br />
            </div>
            <img
              v-if="siteName != 'Bilheteria.com.br' && siteName != 'teatro.uaupass.com.br'"
              src="/assets/images/logo-pagarme.svg"
              class="mt-3 p-1"
              style="width: 120px; background: white; border-radius: 3px;"
              alt
            />
          </div>
          <div v-if="isPartner()" class="col-12 col-md mt-5 mt-md-0 text-md-left">
            <h3 style>
              <strong>Parceiros</strong>
            </h3>
            <div
              class="row nopadding mt-4"
              style="justify-content: center!important"
              v-if="isPartner()"
            >
              <ul class="nav justify-content-center mx-0 nopadding text-center">
                <li
                  v-for="(item) in listPartners"
                  v-bind:key="item.url"
                  class="m-0 pr-2 nav-item text-center mx-0 mx-auto"
                  style="margin-top: 2px !important; margin-bottom: 2px !important"
                >
                  <a :href="item.url" v-if="item.name != 'Localhost'">
                    <img :src="item.img" style="width: 80px" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="siteName == 'ingressoparatodos.com.br'"
            class="col-12 col-md mt-5 mt-md-0 text-md-left"
          >
            <h3>
              <strong>Realização:</strong>
            </h3>

            <img style="width: 80%;" src="/assets/logo-parceiro-construcao.png" alt />
          </div>
        </div>
        <div class="row mt-5 footer-name nopadding">
          <div class="col text-center">
            <p v-if="siteName != 'teatro.uaupass.com.br'">{{companyName}}</p>
          </div>
        </div>
        <div class="row mt-0 nopadding mb-0 pb-0">
          <div class="col text-center">
            <p>
              {{companyAddress}}
              <span
                v-if="companyAddress != '' && siteName != 'teatro.uaupass.com.br'"
              >- CNPJ: {{CNPJ}}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import config from "@/config";
import { authService } from "@/components/common/services/auth";
import { func } from "@/functions";
import { staticPageService } from "@/components/common/services/static_page.js";
import CityList from "@/components/City-list.vue";

import { serverBus } from "@/main";

export default {
  name: "Footer",
  created() {},
  components: {
    CityList
  },
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

    loadSACPage: function(categoria, pagina) {
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
      this.$swal
        .queue([
          {
            title: "Atendimento ao cliente",
            html:
              '<input id="swal-email1" type="text" required placeholder="Digite seu nome" name="name" class="swal2-input">' +
              '<input id="swal-email2" type="email" required  placeholder="Digite seu email" name="email" class="swal2-input">' +
              '<input id="swal-email3" type="text" required placeholder="Assunto" name="subject" class="swal2-input">' +
              '<input id="swal-email5" type="text" required placeholder="Número do pedido" name="id" class="swal2-input">' +
              '<textarea style="width: 80%; padding-top: 0.75rem" rows="4" id="swal-email4" placeholder="Conteudo" required> </textarea>',
            focusConfirm: false,
            preConfirm: () => {
              let name = document.getElementById("swal-email1").value;
              let email = document.getElementById("swal-email2").value;
              let subject = document.getElementById("swal-email3").value;
              let content = document.getElementById("swal-email4").value;
              let id = document.getElementById("swal-email5").value;

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
          }
        ])
        .then(result => {
          if (result.value) {
          } else if (result.dismiss === this.$swal.DismissReason.cancel) {
          }
        });
    }
  },

  data: function() {
    return {
      events: [],
      getSAC: [],
      checkSAC: [],

      siteName: config.info.siteName,
      CNPJ: config.info.CNPJ,
      companyName: config.info.companyName,
      companyAddress: config.info.companyAddress,
      listPartners: [
        {
          name: "www.bilhete.promo",
          url: "http://bilhete.promo",
          img: "/assets/logo-bilhetepromo.png"
        },
        {
          name: "BR INGRESSOS.com.br",
          url: "http://bringressos.com.br",
          img: "/assets/logo-bringressos.svg"
        },
        {
          name: "www.ingresso.promo",
          url: "http://ingresso.promo",
          img: "/assets/logo-ingressopromo.png"
        },
        {
          name: "www.ingresso.store",
          url: "https://www.ingresso.store/",
          img: "/assets/logo-ingressostore.png"
        },
        {
          name: "www.ingressos.store",
          url: "https://www.ingressos.store/",
          img: "/assets/logo-ingressosstore.jpeg"
        },
        {
          name: "www.meuingresso.promo",
          url: "https://meuingresso.promo",
          img: "/assets/logo-meuingressopromo.png"
        },
        {
          name: "www.teatroparatodos.club",
          url: "https://teatroparatodos.club",
          img: "/assets/logo-teatroparatodosclub.jpeg"
        },
        {
          name: "www.teatroparatodos.online",
          url: "https://teatroparatodos.online",
          img: "/assets/logo-teatroparatodosonline.jpeg"
        }
        // {
        //   "name": "Localhost",
        //   "url": "localhost:8080",
        //   "img": "/assets/logo-teatroparatodosonline.jpeg"
        // },
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.checkSACPages();
      //this.$refs.slick.reSlick();
    });
    // this.getSACContent();
  }
};
</script>

<style lang="scss">
footer h3 {
  text-transform: uppercase;
  font-size: 11px;
}
</style>