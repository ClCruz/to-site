<template>
<div class="content">
  <div class="row">
    <div class="col-md-2 container__logo">
      <div class="logo">
        <router-link to='/' v-if="!$route.path.includes('/itau')">
          <img src="../../assets/logo.png" class="img-responsive" alt="">
        </router-link>
          <router-link to='/itau' v-if="$route.path === '/itau/busca'">
            <img src="../../assets/logo-itau.png" class="img-responsive" alt="" >
          </router-link>
      </div>
    </div>
    <div class="col-md-10 col-xs-12">
      <div class="row search__title">
        <div class="col-md-6">
          <p class="result__container">Resultados encontrados para:
            <span class="result__description">"Santos"</span>
            <br>
            <span class="result__count">12 resultados encontrados</span>
          </p>
          <div class="result__button-group">
            <button type="button" class="btn btn-dark btn-sm" v-on:click="toggleFilter('card')" v-bind:class="{ active: !filterCards }">Cartões</button>
            <button type="button" class="btn btn-dark btn-sm" v-on:click="toggleFilter('lists')" v-bind:class="{ active: !filterLists }">Listas</button>
          </div>
        </div>
      </div>
      <div class="col-md-10 p-0 col-12 ">
        <div class="row container__search" v-if="!filterCards">
          <div class="col-lg-4 col-md-6 col-xs-12">
            <div class="search__card">
              <div class="cardx cardx-1">
                <div class="thumb"></div>
                <div class="infos">
                  <span class="flag">
                      <img v-for="(ibadge, index) in item.badge" :key="index" :src="ibadge.img" :alt="ibadge.tag">
                    </span>
                  <h2 class="title">A Magia do Cinema 2018</h2>
                  <h3 class="date">
                    MAR 03 - MAR 08
                  </h3>
                  <h3 class="seats">
                    Teatro UMC Vila Leopoldina - São Paulo - SP
                  </h3>
                  <button type="button" class="btn btn-outline-light btn-sm details">
                      <router-link to="/itau/evento" tag='span'>Comprar</router-link>
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-xs-12 ">
            <div class="search__card">
              <div class="cardx cardx-2">
                <div class="thumb"></div>
                <div class="infos">

                  <h2 class="title">Levando o Caos com Mauricio Meirelles
                  </h2>
                  <span class="flag"></span>
                  <h3 class="date">ABR 04 - ABR 12</h3>
                  <h3 class="seats">Teatro Renaissance Jardins - São Paulo - SP
                  </h3>
                  <button type="button" class="btn btn-outline-light btn-sm details">
                      <router-link to="/itau/evento" tag='span'>Comprar</router-link>
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-xs-12">
            <div class="search__card">
              <div class="cardx cardx-3">
                <div class="thumb"></div>
                <div class="infos">
                  <h2 class="title">5 Anos de Café Teatro Rubi WANDA SÁ E NELSON FARIA - BOSSA SEMPRE NOVA
                  </h2>
                  <span class="flag"></span>
                  <h3 class="date">ABR 14 - ABR 19</h3>
                  <h3 class="seats">Café Teatro Rubi - Wish/ Hotel Da Bahia by GJP Campo Grande - Salvador - BA
                  </h3>
                  <button type="button" class="btn btn-outline-light btn-sm details">
                      <router-link to="/itau/evento" tag='span'>Comprar</router-link>
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-xs-12 ">
            <div class="search__card">
              <div class="cardx cardx-4">
                <div class="thumb"></div>
                <div class="infos">
                  <h2 class="title">Fale Mais Sobre Isso...
                  </h2>
                  <span class="flag"></span>
                  <h3 class="date">ABR 15 - MAR 05</h3>
                  <h3 class="seats">Teatro Renaissance Jardins - São Paulo - SP
                  </h3>
                  <button type="button" class="btn btn-outline-light btn-sm details">
                      <router-link to="/itau/evento" tag='span'>Comprar</router-link>
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row container__search-list" v-if="!filterLists">
        <div class="search__list-item col-md-12 col-lg-12 col-xl-10 p-0">
          <div class="card col-12 col-md-11 col-lg-10 col-xs-10">
            <div class="card-body row">
              <div class="col-2 col-md-1 card__date">
                <img src="https://www.compreingressos.com/images/espetaculos/10495/miniatura.jpg?1536293404" alt="">
                </div>
                <div class="col-8 col-md-8 card__description">
                  A Magia do Cinema 2018
                  <br> 20/03 - 28/03 - Teatro UMC Vila Leopoldina - São Paulo, 13 anos
                  <br>
                  <span class="flag">
                    <img src="../../assets/images/badge_ci.png" alt="">
                    <img src="../../assets/images/badge_ci.png" alt="">
                    <img src="../../assets/images/badge_ci.png" alt="">
                  </span>
                </div>
                <div class="col-md-3 text-center card__btn">
                  <button type="button" class="btn btn-outline-light btn-sm">
                    <router-link to="/itau/evento" tag='span'>Comprar</router-link>
                  </button>
                </div>
              </div>
            </div>
            <div class="card col-12 col-md-11 col-lg-10 col-xs-10">
              <div class="card-body row">
                <div class="col-2 col-md-1 card__date" style="padding-right: 0">
                  <img src="https://www.compreingressos.com/images/espetaculos/9859/miniatura.jpg?1512141690" alt="">
                </div>
                  <div class="col-8 col-md-8 card__description">
                    Levando o Caos com Mauricio Meireles
                    <br> 20/04 - 06/05 - Teatro Renaissance, São Paulo, Brasil 13 anos
                    <br>
                    <span class="flag">
                    <img src="../../assets/images/badge_ci.png" alt="">
                    <img src="../../assets/images/badge_ci.png" alt="">
                    <img src="../../assets/images/badge_ci.png" alt="">
                  </span>
                  </div>

                  <div class="col-md-3 card__btn text-center">
                    <button type="button" class="btn btn-outline-light btn-sm">
                    <router-link to="/itau/evento" tag='span'>Comprar</router-link>
                  </button>
                  </div>
                </div>
              </div>
              <div class="card col-12 col-md-11 col-lg-10 col-xs-10">
                <div class="card-body row">
                  <div class="col-2 col-md-1 card__date">
                    <img src="https://www.compreingressos.com/images/espetaculos/10521/miniatura.jpg?1537533860" alt="">
                </div>
                    <div class="col-8 col-md-8 card__description">
                      5 Anos de Café Teatro Rubi - WANDA SÁ E NELSON FARIA - BOSSA SEMPRE NOVA
                      <br> 30/02 - 05/03 - Café Teatro Rubi, São Paulo, Brasil Livre
                </div>
                      <div class="col-md-3 card__btn text-center">
                        <button type="button" class="btn btn-outline-light btn-sm">
                    <router-link to="/itau/evento" tag='span'>Comprar</router-link>
                  </button>
                      </div>
                    </div>
                  </div>
                  <div class="card col-12 col-md-11 col-lg-10 col-xs-10">
                    <div class="card-body row">
                      <div class="col-2 col-md-1 card__date">
                        <img src="https://www.compreingressos.com/images/espetaculos/4062/miniatura.jpg?1482857429" alt="">
                </div>
                        <div class="col-8 col-md-8 card__description">
                          Fale Mais Sobre Isso...
                          <br> 20/06 - 24/06 - Teatro Renaissance, São Paulo, Brasil 14 anos
                </div>
                          <div class="col-md-3 card__btn text-center">
                            <button type="button" class="btn btn-outline-light btn-sm">
                    <router-link to="/itau/evento" tag='span'>Comprar</router-link>
                  </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
</template>

<script>
export default {
  name: "search",
  data: function () {
    return {
      filterCards: false,
      filterLists: true
    };
  },
  methods: {
    toggleFilter: function (type) {
      if (type === "lists") {
        this.filterCards = true;
        this.filterLists = false;
      } else {
        this.filterLists = true;
        this.filterCards = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
