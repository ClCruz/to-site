<template>
<section class="footer" style="align-content: center">
  <div class="row">
    <div class="col-md-4 text-center footer__address" style="">

      <div>
        {{companyName}}
        <br>
        <span v-if="companyName">{{companyAddress}}</span>
        <br>
        <span v-if="CNPJ">CNPJ - {{CNPJ}}</span>
      </div>
    </div>
    <div class="col-md-4 text-center footer__company" style="color: white; font-size: 10px; align-self: center ">
      <div v-if="!$route.path.includes('/itau')">
        2018 {{siteName}}, Inc. Todos os direitos reservados.
      </div>
    </div>
    <div class="col-md-4 text-center footer__social" v-show="$route.path==='/vClaudio' ? true : false" style="color: white; font-size: 10px; align-self: center">
      <ul style="display: inline-block; list-style: none">
        <li>Ajuda</li>
        <li>Privacidade</li>
        <li>Termos</li>
      </ul>
    </div>
    <div class="col-md-4 text-center" v-show="$route.path==='/vClaudio' ? false : true" style="color: white; font-size: 8px; align-self: center">
      <ul style="font-size:8px; list-style: none">
        <li @click="contact" style="cursor: pointer">Atendimento ao cliente</li>
      </ul>
    </div>
  </div>
</section>
</template>

<script>
import config from '@/config';
import {
  authService
} from "../components/common/services/auth";
import {
  func
} from '@/functions';
export default {
  name: "AppFooter",
  computed: {},
  mixins: [func],
  data: function () {
    return {
      contact: [],
    }
  },
  methods: {

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

<style lang="scss" scoped>
ul li {
  display: inline-block;
  align-self: center;
  font-size: 12px !important;
  font-weight: bold;
  margin: 17px 8px 0 8px;
}
</style>
