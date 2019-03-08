
<template>
 <section class="features" style="background: white" data-block-type="features" data-id="3">
    <div class="container">
      <div class="row text-left pt-3 pb-1">
        <div class="col-12 col-sm-12 text-left">
          <h3>{{title}}</h3>
        </div>

        <div @click="goto('genre',item.genreName)" class="col-6 col-sm-2 p-0 card__container" style="" v-for="(item, index) in genreList" :key='index'>
          <p>
            <div alt="image" class="img-fluid rounded card__home" :class="['card__home-' + index]">
              <div alt="image" class="img-fluid rounded card__home card__home-0 img__inside" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }"></div>
            </div>
            <span class="genre" style="text-transform: uppercase">{{ item.genreName }}</span>
          </p>
        </div>
        <div @click="goto('genre','+')" class="col-6 col-sm-2 card__container  card__see-more" v-if="false">
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
  name: "CardGenreList",
  computed: {},
  methods: {},
  props: ['genreList', 'title'],
  created() {
    console.log(this.genreList[2]);
  }
};
</script>

<style lang="scss">
</style>
