<template>
<div class="row row__events">
  <div class="col-12 col-sm-12 text-left mt-2 mb-4">
    <h3 class="" style="text-transform: capitalize">{{thisMonth}}</h3>
  </div>
  <div class="col-12 col-xl-4 col-md-6 p-2 text-left" v-for="(item, index) in computedSlideData" :key='index' @click="goto('event', item)"  v-if="thisMonthNumber == item.firstMonth || thisMonthNumber == item.lastMonth || thisMonthNumber > item.firstMonth && thisMonthNumber < item.lastMonth ">
    <div class="to-box p-0">
      <div class="img-fluid rounded-0" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }" style="background-size: cover;"></div>

      <div class="content to-box p-2 pt-0 pb-1" style="position: relative; border-top-left-radius: 0 !important; border-top-right-radius: 0 !important;">
        <h4 class="event__title pb-1">
          <strong>{{ item.ds_evento |  truncate(35, ' ...') }}</strong>
        </h4>
        <p class="p-0 m-0 event__item event__item-date"><span class="bold">{{item.datas |  replace('-', 'á')}}</span></p>
        <p class="p-0 pt-1 m-0 h-200 event__item event__item-local"><span class="bold" style="text-transform: capitalize !important">{{ item.ds_nome_teatro | capitalize() }} - {{ item.ds_municipio | capitalize() }},</span> {{ item.sg_estado }} </p>
      </div>
    </div>
  </div>

  <div class="col-12 col-sm-12 text-left mt-2 mb-4">
    <h3 class="" style="text-transform: capitalize">{{nextMonth}}</h3>
  </div>
  <div class="col-12 col-xl-4 col-md-6 p-2 text-left" v-for="(item, index) in computedSlideData" :key='index' @click="goto('event', item)" v-if="nextMonthNumber == item.firstMonth || nextMonthNumber == item.lastMonth || nextMonthNumber > item.firstMonth && nextMonthNumber < item.lastMonth ">
    <div class="to-box p-0">
      <div class="img-fluid rounded-0" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }" style="background-size: cover;"></div>

      <div class="content to-box p-2 pt-0 pb-1" style="position: relative; border-top-left-radius: 0 !important; border-top-right-radius: 0 !important;">
        <h4 class="event__title pb-1">
          <strong>{{ item.ds_evento |  truncate(35, ' ...') }}</strong>
        </h4>
        <p class="p-0 m-0 event__item event__item-date"><span class="bold">{{item.datas |  replace('-', 'á')}}</span></p>
        <p class="p-0 pt-1 m-0 h-200 event__item event__item-local"><span class="bold" style="text-transform: capitalize !important">{{ item.ds_nome_teatro | capitalize() }} - {{ item.ds_municipio | capitalize() }},</span> {{ item.sg_estado }} </p>
      </div>
    </div>

  </div>

  <div class="col-12 col-sm-12 text-left mt-2 mb-4">
    <h3 class="">Eventos futuros</h3>
  </div>
  <div class="col-12 col-xl-4 col-md-6 p-2 text-left" v-for="(item, index) in computedSlideData" :key='index' @click="goto('event', item)" v-if="item.firstMonth > nextMonthNumber">
    <div class="to-box p-0">
      <div class="img-fluid rounded-0" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }" style="background-size: cover;"></div>

      <div class="content to-box p-2 pt-0 pb-1" style="position: relative; border-top-left-radius: 0 !important; border-top-right-radius: 0 !important;">
        <h4 class="event__title pb-1">
          <strong>{{ item.ds_evento |  truncate(35, ' ...') }}</strong>
        </h4>
        <p class="p-0 m-0 event__item event__item-date"><span class="bold">{{item.datas |  replace('-', 'á')}}</span></p>
        <p class="p-0 pt-1 m-0 h-200 event__item event__item-local"><span class="bold" style="text-transform: capitalize !important">{{ item.ds_nome_teatro | capitalize() }} - {{ item.ds_municipio | capitalize() }},</span> {{ item.sg_estado }} </p>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "CardEventItau",
  computed: {},
  methods: {
    listOfMonths() {

    },
    goto(type, item) {
      if (item.notselectable != undefined && item.notselectable == 1) return;

      let where = item.type != undefined ? item.type : type;

      switch (where) {
        case "local":
          this.$router.push("/busca/local/" + item);
          break;
        case "genre":
          this.$router.push("/busca/genero/" + item);
          break;
        case "city":
          this.$router.push("/busca/cidade/" + item);
          break;
        case "state":
          this.$router.push("/busca/estado/" + item);
          break;
        case "event":
          this.$router.push(item.uri);
          break;
      }
    },
  },
  props: ['slideData'],

  filters: {
    truncate: function (text, length, clamp) {
      clamp = clamp || '...';
      var node = document.createElement('div');
      node.innerHTML = text;
      var content = node.textContent;
      return content.length > length ? content.slice(0, length) + clamp : content;
    },
    replace: function (message, toReplace, replacement) {
      return message.replace(toReplace, replacement);
    },
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      value = value.toLowerCase();
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  computed: {
    thisMonth() {
      // debugger; 

      var date = new Date();  // 2009-11-10
      var month = date.toLocaleString('pt-br', { month: 'long' });

      return month;
    },
    thisMonthNumber() {
       var date = new Date();  // 2009-11-10
      var month = date.toLocaleString('pt-br', { month: 'long' });
      var monthDay = date.getMonth();

      return monthDay;
    },
    nextMonth() {
      var d = new Date();

      d.setMonth(d.getMonth() + 1, 1);

      var dt = new Date(d);

      var month = dt.toLocaleString('pt-br', { month: 'long' });

      return month;
    },
    nextMonthNumber() {
      var d = new Date();

      d.setMonth(d.getMonth() + 1, 1);

      var dt = new Date(d);

      var month = dt.toLocaleString('pt-br', { month: 'long' });

      return dt.getMonth();
    },
    futureEvents() {
     var d = new Date();

      d.setMonth(d.getMonth() + 2, 1);

      var dt = new Date(d);

      var month = dt.toLocaleString('pt-br', { month: 'long' });

      return dt.getMonth();
    },
    computedSlideData() {
      var ret = this.slideData;

      ret.map(x => {
        var splitDay = x.datas.split(' - ');

        var firstDay = splitDay[0].replace('/', ',').split(',');
        var lastDay = splitDay[1] !== undefined ? splitDay[1].replace('/', ',').split(',') : '';

        // var date = new Date(firstDay[1]);  // 2009-11-10
        // var month = date.toLocaleString('pt-br', { month: 'long' });

        // x.month = month;

        var date = new Date(); // 2009-11-10
        date = date.getMonth();
        var month = date.toLocaleString('pt-br', {
          month: 'long'
        });

        // console.log((firstDay[1] - 1) == month);
        // console.log(firstDay[1]);

        x.firstMonth = (firstDay[1] - 1);
        x.lastMonth = (lastDay[1] - 1)

        // return (firstDay[1] - 1) == month;
      });

      console.log(ret);
      return ret;
    },
  },
};
</script>
