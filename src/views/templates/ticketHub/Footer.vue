<template>
<footer class="fdb-block footer-large bg-dark fp-active mt-5 pt-5" data-block-type="footers" data-id="4">
  <div class="container">
    <div class="row align-items-top text-center text-md-left">
      <div class="col-12 col-sm-6 col-md-4" style="">
        <p> {{companyName}}
          <p>        <span v-if="companyName">{{companyAddress}}</span></p>
          <p>
            <span v-if="CNPJ">CNPJ - {{CNPJ}}</span>
          </p>
      </div>

      <div class="col-12 col-sm-6 col-md-4 mt-4 mt-sm-0" style="">
        <ul>
          <li>
            <a href="#" @click="loadSACPage('company','sobre')">
              Sobre a empresa
            </a>
          </li>
          <li>
            <a href="#" @click="loadSACPage('policy','venda')">
              Politica de Venda
            </a>
          </li>
          <li>
            <a href="#" @click="loadSACPage('policy','desconto')">
              Política de Meia Entrada
            </a>
          </li>
          <li>
            <a href="#" @click="loadSACPage('policy','privacidade')">
              Politica de Privacidade
            </a>
          </li>
          <li>
            <a href="#" @click="loadSACPage('partner','sejaParceiro')">
              Seja nosso Parceiro
            </a>
          </li>
        </ul>
      </div>

      <div class="col-12 col-md-4 mt-5 mt-md-0 text-md-left" style="">
        <li @click="contact" style="cursor: pointer">Atendimento ao cliente</li>     
      </div>
    </div>

    <div class="row mt-5">
      <div class="col text-center fr-box" role="application" style="">
        <div class="fr-wrapper" dir="auto">
          <div class="fr-element fr-view" dir="auto" contenteditable="true" aria-disabled="false" spellcheck="true">
        2018 {{siteName}}, Inc. Todos os direitos reservados.
            
          </div>
        </div>
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