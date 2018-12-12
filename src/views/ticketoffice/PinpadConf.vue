<template>
    <div class="container">
        <div class="row">
            <div class="col">
              <b-button-group vertical>
                <b-button @click="status" id="status" :variant="variantStatus">{{variantStatusText}}</b-button>
                <b-button @click="sync" id="sync">Sincronizar tabelas</b-button>
                <b-button @click="last" id="last">Último Status</b-button>
                <b-button @click="all" id="all">Status</b-button>
                <b-button @click="clear" id="clear">Limpar</b-button>
                <b-button @click="fake" id="fake">Teste</b-button>
              </b-button-group>
            </div>
        </div>

      <b-tooltip target="status" placement="topright">
          <span>Clique para verificar o status do pinpad.</span>
      </b-tooltip>
      <b-tooltip target="sync" placement="topright">
          <span>Clique para sincronizar as tabelas do pinpad.</span>
      </b-tooltip>
      <b-tooltip target="last" placement="topright">
          <span>Clique para recuperar o último status do pinpad.</span>
      </b-tooltip>
      <b-tooltip target="all" placement="topright">
          <span>Clique para recuperar todos status (enquanto ativo) do pinpad.</span>
      </b-tooltip>
      <b-tooltip target="clear" placement="topright">
          <span>Clique para limpar os status do pinpad.</span>
      </b-tooltip>
      <b-tooltip target="fake" placement="topright">
          <span>Clique para realizar uma compra no ambiente de Homologação.</span>
      </b-tooltip>
    </div>
</template>

<script>
import Vue from "vue";
import VueResource from "vue-resource";
import config from "@/config";
import { func } from "@/functions";
import { pinpadService } from "../../components/ticketoffice/services/pinpad";
import moment from 'moment';


//Vue.use(moment);

export default {
  mixins: [func],
  data() {
    return {
      processing: false,
      aliveChecked: false,
      alive: false,
      lastStatus: null,
      listStatus: [],
    };
  },
  methods: {
    status() {
      if (this.processing) return;
      this.processing = true;
      this.showWaitAboveAll();

      pinpadService.ping("").then(
        response => {
            this.hideWaitAboveAll();
            this.processing = false;

            if (response.success) {
              this.toastSuccess("Comunicação realizada com sucesso.");
              this.aliveChecked = true;
              this.alive = true;
            }
            else {
              this.toastError(response.message);
              this.aliveChecked = true;
              this.alive = false;
            }

        },
        error => {
            this.processing = false;
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");        

            this.aliveChecked = true;
        }
      );
    },
    sync() {
      if (this.processing) return;
      this.processing = true;
      this.showWaitAboveAll();

      pinpadService.sync().then(
        response => {
            this.hideWaitAboveAll();
            this.processing = false;
            if (response.success) {
              this.toastSuccess("Sincronização realizada com sucesso.");
              this.aliveChecked = true;
              this.alive = true;
            }
            else {
              this.toastError(response.message);
              this.aliveChecked = true;
              this.alive = false;
            }
        },
        error => {
            this.processing = false;
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");      
            this.aliveChecked = true;
            this.alive = false;  
        }
      );
    },
    last() {
      if (this.processing) return;
      this.processing = true;
      this.showWaitAboveAll();

      pinpadService.status("").then(
        response => {
            this.hideWaitAboveAll();
            this.processing = false;
            if (response.success) {
              this.toastSuccess(response.message);
              this.aliveChecked = true;
              this.alive = true;
            }
            else {
              this.toastError(response.message);
              this.aliveChecked = true;
              this.alive = false;
            }
        },
        error => {
            this.processing = false;
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");      
            this.aliveChecked = true;
            this.alive = false;  
        }
      );
    },
    all() {
      if (this.processing) return;
      this.processing = true;
      this.showWaitAboveAll();

      pinpadService.status("").then(
        response => {
            this.hideWaitAboveAll();
            this.processing = false;
            if (response.success) {
              this.aliveChecked = true;
              this.alive = true;
              let msg = "";
              msg+="<div class='bd-example vue-example vue-example-list-group-variant'>";
              msg+="<div class='list-group'>";
              console.log(response.all);
              for (let x in response.all) {
                  let date = response.all[x].date;
                  let error = response.all[x].error;
                  let strace = response.all[x].strace;

                  let dateAux = moment(date).format("YYYY-MM-DD HH:mm:ss");
                  if (error)
                    msg+=`<div class='list-group-item list-group-item-danger list-group-item_pinpad'>${dateAux} - ${strace}</div>`;
                  else
                    msg+=`<div class='list-group-item list-group-item_pinpad'>${dateAux} - ${strace}</div>`;
              }
              msg+="</div>";
              msg+="</div>";

              this.$swal({
                title: 'Pinpad',
                html: msg,
                customClass: 'animated fadeInUp'
              });
            }
            else {
              this.toastError(response.message);
              this.aliveChecked = true;
              this.alive = false;
            }
        },
        error => {
            this.processing = false;
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");      
            this.aliveChecked = true;
            this.alive = false;  
        }
      );
    }, 
    clear() {
      if (this.processing) return;
      this.processing = true;
      this.showWaitAboveAll();

      pinpadService.clear().then(
        esponse => {
            this.hideWaitAboveAll();
            this.processing = false;
            this.toastSuccess("Limpeza de status realizada com sucesso.");
        },
        error => {
            this.processing = false;
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");      
            this.aliveChecked = true;
            this.alive = false;  
        }
      );
    },
    fake() {
      if (this.processing) return;
      this.processing = true;
      this.showWaitAboveAll();

      pinpadService.list().then(
        response => {
            this.hideWaitAboveAll();
            this.processing = false;
        },
        error => {
            this.processing = false;
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");        
        }
      );
    },
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    variantStatus() {
      if (!this.aliveChecked) {
        return "warning";
      }
      if (this.alive) {
        return "success";
      }
      else {
        return "danger";
      }
    },
    variantStatusText() {
      if (!this.aliveChecked) {
        return "Não verificado";
      }
      if (this.alive) {
        return "Normal";
      }
      else {
        return "Falha";
      }
    }
  }
};
</script>

<style lang="scss">
.list-group-item_pinpad {
    padding: 3px 10px;
    font-size: 13px;
    text-align: left;
    background-color:#0000
}
</style>
