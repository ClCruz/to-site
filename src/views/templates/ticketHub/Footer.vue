<template>
  <footer class="fdb-block footer-small bg-dark" style="font-size: 12px">
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
          <ul class="nav justify-content-center">
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

        <div class="col-12 col-lg-2 mt-4 mt-lg-0 text-lg-right">
          <a @click="contact" style="cursor: pointer">Atendimento ao cliente</a>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col text-center">
          <span style="color: #ccc">{{companyName}} - {{companyAddress}} - CNPJ: {{CNPJ}} </span>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col text-center">
          2018 {{siteName}},  Inc.
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
        if (result.value) {
          console.log(result)
        } else if (result.dismiss === this.$swal.DismissReason.cancel) {

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
    }
  }
};
</script>

<style lang="scss">
</style>