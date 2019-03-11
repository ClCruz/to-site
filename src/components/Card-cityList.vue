<template>
<section class="features" style="background: white" data-block-type="features" data-id="3">
  <div class="container">
    <div class="row text-left pt-3 pb-1">
      <!-- <div class="col-12 col-sm-12 text-left">
        <h3>{{title}}</h3>
      </div> -->

      <div @click="goto('city',item.ds_municipio)" class="col-6 col-sm-2 p-0 pr-1 card__container" style="" v-for="(item, index) in cityList" :key='index'>
        <p>
          <div alt="image" class="img-fluid rounded card__home" :class="['card__home-' + index]">
            <span class="genre">{{ item.ds_municipio }}</span>
          </div>
        </p>
      </div>
      <div @click="goto('city','+')" class="col-6 col-sm-2 card__container  card__see-more" v-if="false">
        <p>
          <div alt="image" class="img-fluid rounded card__home">
          </div>
          <span class="genre">Ver mais</span>
        </p>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: "CardCityList",
  computed: {},
  methods: {

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
  props: ['cityList', 'title'],
  created() {}
};
</script>

<style lang="scss" scoped>
.card__home {
  height: 36px !important;
  border-radius: 4px !important;
  width: 90%;
  background: #fff!important;
}

.card__home-0 {
  background: url('https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//hero/yellow.svg');

  padding-left: 0;
  padding-right: 0;
  margin-left: 5px;
  margin-right: 0;

}

.card__home-1 {
  background: url('https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//hero/blue.svg');
}

.card__home-2 {
  background: url('https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//hero/red.svg');
}

.card__home-3 {
  background: url('https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//hero/purple.svg');
}

.card__home-4 {
  background: url('https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//hero/red.svg');
}

.card__home-5 {
  background: url('https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//hero/red.svg');
}

.genre {
  position: unset !important;
  background-size: cover;
  display: flex !important;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-line-pack: center;
  padding-top: 7px;
  align-content: center;
  color: #2d313c!important;

  font-size: 14px;
}
</style>
