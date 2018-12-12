<template>
    <b-container class="bv-example-row" v-if="this.$store.getters.isAuthenticated">
        <b-row>
            <b-col>
                <b-form>
                    <b-container fluid>
                      <b-row class="my-1">
                        <b-input-group size="sm">
                            <b-input-group-prepend is-text class="firstLabel">
                                Evento:
                            </b-input-group-prepend>
                            <b-form-select id="event" v-on:change="selectedEvent" v-model="form.codPeca" :options="events">
                                <template slot="first">
                                    <option :value="null" disabled>-- Selecione --</option>
                                </template>
                            </b-form-select>
                        </b-input-group>
                      </b-row>
                      <b-row class="my-1" v-if="loads.days">
                        <b-input-group size="sm">
                            <b-input-group-prepend is-text class="firstLabel">
                                Dias:
                            </b-input-group-prepend>
                            <b-form-select id="days"
                                            :options="days"
                                            v-on:change="populateHours"
                                            v-model="form.datePresentation">
                                <template slot="first">
                                    <option :value="null" disabled>-- Selecione --</option>
                                </template>
                            </b-form-select>
                        </b-input-group>
                      </b-row>
                      <b-row class="my-1" v-if="loads.hours">
                        <b-input-group size="sm">
                            <b-input-group-prepend is-text class="firstLabel">
                                Sala:
                            </b-input-group-prepend>
                            <b-form-select id="hours"
                                            :options="hours"
                                            v-on:change="selectedHour"
                                            v-model="form.id_apresentacao">
                                <template slot="first">
                                    <option :value="null" disabled>-- Selecione --</option>
                                </template>
                            </b-form-select>
                        </b-input-group>
                      </b-row>
                    </b-container>
                </b-form>
            </b-col>
            <b-col>
                <b-card :title="event.name"
                        :img-src="event.image"
                        :img-alt="event.name"
                        img-top
                        style="max-width: 20rem;"
                        class="mb-2" v-if="event.loaded">
                    <p class="card-text">
                        <b-list-group flush>
                            <b-list-group-item>{{event.days}}</b-list-group-item>
                            <b-list-group-item>Valor Geral: {{event.cost | money}}
                              <span v-if="event.room.loaded">/ Valor: {{event.room.cost | money}}</span>
                            </b-list-group-item>
                            <b-list-group-item>Venda web: {{event.sellWeb | truefalse}} / {{event.duration | duration}} / {{event.genre}}</b-list-group-item>
                            <b-list-group-item v-if="event.room.loaded">Assento númerado: {{event.room.isNumbered | truefalse}}</b-list-group-item>
                        </b-list-group>                    
                    </p>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Vue from "vue";
import VueResource from "vue-resource";
import config from "@/config";
import { func } from "@/functions";
import { eventService } from "../../components/ticketoffice/services/event";
import { funcOperation } from "../../components/ticketoffice/services/functions";
import { bookingService } from "../../components/common/services/booking";
import { shoppingCartService } from "../../components/ticketoffice/services/shoppingcart";
import { cashregisterService } from "../../components/ticketoffice/services/cashregister";


Vue.filter("truefalse", function(value) {
  //if (!value) return ''
  return value || value == 1 ? "Sim" : "Não";
});

Vue.filter("money", function(value) {
  if (!value) return "";
  return `R$ ${value}`;
});

Vue.filter("duration", function(value) {
  if (!value) return "";
  var hours = Math.floor(parseInt(value) / 60);
  var minutes = parseInt(value) % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes}min`;
});

export default {
  name: "operation",
  mixins: [func, funcOperation],
  data() {
    return {
      isOperation: true,
      processing: false,
      isReservation: false,
      loads: {
        event: false,
        days: false,
        hours: false,
      },
      events: [],
      days: [],
      hours: [],
      event: {
        loaded: false,
        image: null,
        name: null,
        cost: null,
        sellWeb: false,
        days: null,
        duration: null,
        genre: null,
        room: {
          loaded: false,
          isNumbered: false,
          cost: null,
        }
      },
      form: {
        codPeca: null,
        datePresentation: null,
        id_apresentacao: null
      }
    };
  },
  methods: {
    selectedHour() {
      Vue.nextTick().then(response => {
        if (this.form.id_apresentacao) {
          var obj = this.hours.filter(
            e => e.id_apresentacao == this.form.id_apresentacao
          );
          if (obj == null && (obj != null && obj.length > 0)) {
            this.event.room.loaded = false;
            this.event.room.isNumbered = false;
            this.event.room.cost = "";
            obj.HorSessao = "";
            obj.NomSala = "";
          } else {
            obj = obj[0];
            this.event.room.loaded = true;
            this.event.room.isNumbered = obj.IngressoNumerado == "1";
            this.event.room.cost = obj.cost;
          }

          if (this.event.room.isNumbered == false && this.isReservation) {
            this.toastError("Não é possível reservar para apresentação não numerada.");
            this.toffice_buttonNext(false);
            return;
          }

          this.addStep1(
            this.form.codPeca,
            this.form.datePresentation,
            this.form.id_apresentacao,
            obj.HorSessao,
            obj.NomSala,
            this.$route.params.type
          );
          this.toffice_buttonNext(true, this.nextURI);
        } else {
          this.toffice_buttonNext(false);
        }
      });
    },
    selectedEvent() {
      this.$nextTick(() => {
        var obj = this.events.filter(e => e.codPeca == this.form.codPeca);
        if (obj == null || (obj != null && obj.length == 0)) {
          this.event.loaded = false;
          this.event.name = null;
          this.event.image = null;
          this.event.cost = null;
          this.event.sellWeb = false;
          this.event.days = null;
          this.event.duration = null;
          this.event.genre = null;
          this.event.room.loaded = false;
          this.event.room.isNumbered = false;
        } else {
          obj = obj[0];

          this.event.loaded = true;
          this.event.name = obj.NomPeca;
          this.event.image = obj.img;
          this.event.cost = obj.ValIngresso;
          this.event.sellWeb = obj.in_vende_site == "1";
          this.event.days = obj.days;
          this.event.duration = obj.TemDurPeca;
          this.event.genre = obj.TipPeca;
          this.event.room.loaded = false;
          this.event.room.isNumbered = false;
        }
        this.populateDays();
      });
    },
    populateDays() {
      this.toffice_buttonNext(false);
      this.days = [];
      this.hours = [];
      this.form.datePresentation = null;
      this.form.id_apresentacao = null;

      this.showWaitAboveAll();

      Vue.nextTick().then(response => {
        this.loads.days = false;
        eventService.listEventDays(this.get_id_base(), this.form.codPeca).then(
          response => {
            this.hideWaitAboveAll();
            if (this.validateJSON(response)) {
              this.loads.days = true;
              this.days = response;

              if (this.days.length == 0) {
                this.toastError("Não há nenhum dia disponível para esse evento.");
              }
            }
          },
          error => {
              this.hideWaitAboveAll();
              this.toastError("Falha na execução.");        
          }
        );
      });
    },
    populateHours() {
      this.toffice_buttonNext(false);
      this.hours = [];
      this.form.id_apresentacao = null;

      this.showWaitAboveAll();

      Vue.nextTick().then(response => {
        this.loads.hours = false;
        eventService
          .listEventDayHours(
            this.get_id_base(),
            this.form.codPeca,
            this.form.datePresentation
          )
          .then(
            response => {
              if (this.validateJSON(response)) {
                this.loads.hours = true;
                this.hours = response;
                this.hideWaitAboveAll();
              }
            },
            error => {
              this.hideWaitAboveAll();
              this.toastError("Falha na execução.");        
            }
          );
      });
    },
    removeMemory() {
      this.clearPurchase(false);
    },
    initMe() {
      this.removeMemory();

      this.showWaitAboveAll();

      eventService.list(this.get_id_base()).then(
        response => {
          this.loads.event = true;
          this.events = response;
          this.hideWaitAboveAll();
        },
        error => {
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");        
        }
      );
    },
  },
  computed: {
    nextURI () {
      return `/ticketoffice/operation/${this.$route.params.type}/seat`;
    },
  },
  created() {
    switch (this.$route.params.type) {
      case "sell":
        this.isReservation = false;
      break;
      case "reservation":
        this.isReservation = true;
      break;
    }

    this.isCashRegisterOpenAndOk(this.initMe);
  }
};
</script>

<style>
.card {
  color: #000 !important;
}
.card img {
    max-width: 100px;
    max-height: 100px;
    left: 33%;
    position: relative;
}
.card-title {
    color:#fff;;
}
.firstLabel div {
    min-width: 66px;
}
.list-group-item {
    padding: 3px 10px;
    font-size: 13px;
    text-align: left;
    background-color:#fff
}
</style>
