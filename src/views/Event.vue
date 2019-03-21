<template>
<div>
  <div v-if="template == 'tixs'">
    <div class="content__show container__new">
      <div class="row">
        <div class="col-md-6 container">
          <div class="row">
            <div class="col-md-12" style="">
              <div class="content__description">
                <div class="card event__card">
                  <div class="show__date">
                    <h2>{{event.NomPeca}}</h2>
                    <span class="event__badges">
                        <a href="#" class="badge badge__icon badge__genre badge-danger noClick" id="badge__gender" @click="gotoSearch(event.TipPeca, 'genre')">{{event.TipPeca}}</a>
                        <a href="#" :class="parentalrating(event)" id="badge__age">{{event.CenPeca}}</a>
                        <a href="#" class="badge badge__icon badge__state badge-light" id="badge__address" @click="gotoSearch(event.ds_local_evento, 'local')">{{event.ds_local_evento}}</a>
                        <a href="#" class="badge badge__icon badge__city badge-secondary" id="badge__city" @click="gotoSearch(event.city, 'city')">{{event.cityBadgeText}}</a>
                        <a href="#" class="badge badge__icon badge__money badge-success noClick" id="badge__price">{{event.valores}}</a>
                        <a href="#" v-if="imageLoaded" class="badge badge__icon badge__local badge-info" id="badge__map" @click="map($event)">Ver no mapa</a>
                        <span class="flag" id="">
                          <img v-for="(item) in event.badge" v-bind:key="item.tag" :id="item.tag" :title="item.tag" :src="item.img" alt="">
                          <img v-for="(ipromo, index) in event.promo" :key="index" :src="ipromo.img" :title="ipromo.tag" :alt="ipromo.tag">
                        </span>

                    </span>
                  </div>

                </div>
              </div>
              <div class="content__description">
                <div class="card event__card card__container">
                  <p class="event__card-holder">
                    <!-- <EventImageLoader class="event__card-img" v-if="!imageLoaded && !roomLoaded && !timeLoaded" :speed="2" :animate="true" style="height: 200px; border-radius: 5px"></EventImageLoader> -->
                    <span>
                        <img class="event__card-img" :src="event.img" alt="" style="">
                      </span>
                  </p>
                  <h3 style="padding-left: 10px">Descrição</h3>
                  <span class="event__description" v-html="event.description">
                      </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-12 time__card">
              <div class="show__date show__date-disp">
                <div>
                  <h2>Escolha a data e o setor</h2>
                </div>
                <div class="result__button-group" v-if="!roomLoaded && !timeLoaded">
                  <EventRoomLoader class="container__placeholder" :speed="2" :animate="true" style="height: 23px; border-radius: 5px; margin-top: 5px"></EventRoomLoader>
                </div>
                <div class="result__button-group" v-else>
                  <b-dropdown variant="dark" id="ddown-sm-split" size="sm" split :text="filterByDate" bin class="btn__datas m-2">
                    <b-dropdown-item-button variant="dark" v-for="(item) in dates" @click="selectedDate(item)" :key="item.date">{{item.date}}</b-dropdown-item-button>
                  </b-dropdown>
                  <b-dropdown variant="dark" id="ddown-sm-split" size="sm" split :text="filterByRoom" bin class="btn__salas m-2">
                    <b-dropdown-item-button style="border-color: transparent!important" @click="selectedRoom({ CodSala: 0, NomSala: 'Todas as salas'})">Todas as salas</b-dropdown-item-button>
                    <b-dropdown-item-button style="border-color: transparent!important" v-for="(item) in salasDisponiveis" @click="selectedRoom(item)" :key="item.CodSala">{{item.NomSala}}</b-dropdown-item-button>
                  </b-dropdown>
                </div>
              </div>
              <div class="container__time">
                <EventTimeLoader class="container__placeholder" v-if="!roomLoaded && !timeLoaded" :speed="2" :animate="true" style="height: 70px; border-radius: 5px"></EventTimeLoader>
                <div class="time__placeholder" v-else>
                  <div class="card" v-if="filtered.length==0">
                    <div class="card-body row">
                      <div class="col col-md text-center card__date">
                        Não há mais dias para esse evento.
                      </div>
                    </div>
                  </div>

                  <transition-group name="fade">
                    <div class="card" v-for="(item) in filtered" :key='item'>
                      <div class="card-body row">
                        <div class="col-4 col-md-2 text-center card__date">
                          {{ item.weekdayName }} <br /> {{ item.day }} <br /> {{ item.HorSessao }}
                        </div>
                        <div class="col-7 col-md-7 card__description">
                          {{ item.NomPeca }} - {{item.NomSala}} - {{ item.ValPeca | money}} <br> {{ item.ds_municipio }}
                        </div>
                        <div class="col-10 col-md-3 card__btn">
                          <button type="button" class="btn btn-outline-light btn-sm float-right" @click="buy(item.id_apresentacao)">Comprar</button>
                        </div>
                      </div>
                    </div>
                  </transition-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="template == 'ingressaria'">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <section class="to-block to-block-mobile" style="background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFk%0D%0Ab2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246%0D%0AIDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzciIHhtbG5z%0D%0APSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMu%0D%0Ab3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMjE2LjkgODIy%0D%0ALjEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyMTYuOSA4MjIuMTsiIHhtbDpz%0D%0AcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGNEY3%0D%0ARkU7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMCwwaDEyMTYuOXY3MzguNGMwLDAt%0D%0ANTg4LjgsMjAwLTYxMi44LTE4czM4OS44LTQ3NC4yLTExMS01MjlDMTAwLjEsMTQ4LjQsMCwwLDAs%0D%0AMHoiLz4KPC9zdmc+Cg==')">
            <div class="container">
              <div class="row">
                <div class="col-12 col-md-8 col-lg-6">
                  <img class="event__card-img img__mobile" :src="event.img" alt="" style="">

                  <h1 class="title mb-2 mt-0">{{event.NomPeca}}</h1>
                  <span class="event__badges">
                        <a href="#" class="badge badge__icon badge__genre badge-danger noClick" id="badge__gender" @click="gotoSearch(event.TipPeca, 'genre')">{{event.TipPeca}}</a>
                        <a href="#" :class="parentalrating(event)" id="badge__age">{{event.CenPeca}}</a>
                        <a href="#" class="badge badge__icon badge__state badge-light" id="badge__address" @click="gotoSearch(event.ds_local_evento, 'local')">{{event.ds_local_evento}}</a>
                        <a href="#" class="badge badge__icon badge__city badge-secondary" id="badge__city" @click="gotoSearch(event.city, 'city')">{{event.cityBadgeText}}</a>
                        <a href="#" class="badge badge__icon badge__money badge-success noClick" id="badge__price">{{event.valores}}</a>
                        <a href="#" v-if="imageLoaded" class="badge badge__icon badge__local badge-info" id="badge__map" @click="map($event)">Ver no mapa</a>
                        <span class="flag" id="">
                          <img v-for="(item) in event.badge" v-bind:key="item.tag" :id="item.tag" :title="item.tag" :src="item.img" alt="">
                          <img v-for="(ipromo, index) in event.promo" :key="index" :src="ipromo.img" :title="ipromo.tag" :alt="ipromo.tag">
                        </span>
                  </span>
                  <h3 class="mt-3">Detalhes do eventos</h3>
                  <p id='read-more-p' class="lead mt-0 pt-0"><span class="event__description mt-0 p-0" v-html="event.description"></span></p>
                  <div id='read-more' @click="expand(this)">
                    <div class="btn to-btn dark">
                      LER MAIS
                    </div>
                  </div>
                  <div id='read-less' @click="retract(this)">
                    <div class="btn to-btn dark">
                      LER MENOS
                    </div>
                  </div>

                </div>
                <div class="col-12 col-sm-6 mx-auto col-md-4 col-lg-6">
                  <img class="event__card-img" :src="event.img" alt="" style="">
                  <!-- Share -->
                  <hr data-content="Compartilhar" class="divider mb-0 mt-2" style="max-width: 460px">
                  <div class="row" id="share">

                    <!-- facebook -->
                    <a class="facebook" href="https://www.facebook.com/share.php?u=url&title=title" target="blank"><i class="fab fa-facebook-f"></i></a>

                    <!-- twitter -->
                    <a class="twitter" href="https://twitter.com/intent/tweet?status=title+url" target="blank"><i class="fab fa-twitter"></i></a>

                    <!-- linkedin -->
                    <a class="linkedin" href="https://www.linkedin.com/shareArticle?mini=true&url=url&title=title&source=source" target="blank"><i class="fab fa-linkedin-in"></i></a>

                    <!-- pinterest -->
                    <a class="pinterest" href="https://pinterest.com/pin/create/bookmarklet/?media=media&url=url&is_video=false&description=title" target="blank"><i class="fab fa-pinterest-p"></i></a>

                  </div>
                  <!-- Produtor -->
                  <div class="col-md-12 col-10 m-sm-auto p-0" style="max-width: 460px;">
                    <h3 class="mt-3">Sobre o parceiro</h3>
                    <div class="row align-items-center ">
                      <div class="col-4 ">
                        <!-- <img alt="image" class="img-fluid rounded-circle" src="https://github.com/froala/design-blocks/blob/2.0.1/dist/imgs/people/8.jpg?raw=true"> -->
                      </div>

                      <div class="col-12">
                        <h4>Cia de Ingressos</h4>
                        <p class="lead">A cia de ingressos fornece aos nossos clientes uma prestação de serviço diferenciada e específica para controle de venda de ingressos para todo o tipo de evento</p>
                        <a href="#" class="btn to-btn dark"><i class="fa fa-sm mr-2 fa-link"></i>Ir para o site do parceiro</a>
                      </div>
                    </div>
                  </div>
                  <!-- Local do evento -->
                  <div class="col-md-12 col-10 m-sm-auto p-0 pt-3 mb-0" style="max-width: 460px;">
                    <h3 class="mt-3">Local do evento</h3>
                    <div class="row align-items-center ">
                      <div class="col-4 ">
                        <!-- <img alt="image" class="img-fluid rounded-circle" src="https://github.com/froala/design-blocks/blob/2.0.1/dist/imgs/people/8.jpg?raw=true"> -->
                      </div>

                      <div class="col-12">
                        <p class="lead">{{this.event.address}}</p>
                        <a href="#" @click="map($event)" class="btn to-btn dark"><i class="fa fa-sm mr-2 fa-map"></i>Ver mapa</a>
                      </div>
                    </div>
                  </div>

                  <!-- Horários -->
                  <!-- <div class="col-md-12 col-10 m-sm-auto p-0" style="max-width: 460px;" v-if="imageLoaded && roomLoaded && timeLoaded">
                      <iframe class="map" :src="returnMap()"
          width="100%" height="300" frameborder="0" style="border:0" allowfullscreen=""></iframe>

                  </div> -->
                </div>
              </div>
            </div>

            <div class="btn__comprar" id="btn__comprar" @click="scrollTo()" title="Selecionar horários">
              <!-- <i class="fa fa-sm fa-shopping-cart"></i> -->
              <i class="fa fa-sm fa-arrow-down" title="Visualizar opções de compra"></i>
              Selecionar horário
            </div>
            <!-- Banner -->
            <div class="container pl-0 pt-4 container__calendar">
              <div class="">
                <div class="p-2">
                  <h3 class="" id="horario">Escolha de horário</h3>
                  <p class="mt-1 mb-0 pb-0">Selecione uma data e um horário</p>
                  <div class="container__arrows">
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                  </div>
                  <swiper :options="swiperOption" class="">
                    <swiper-slide class="p-0">
                      <div class="c">
                        <div class="img-fluid rounded-0 col-12 p-0 card__time text-center align-items-center card__time-active" style="">
                          <div>
                            <h3 class="">HOJE</h3>
                            <p class="lead">Mar 21</p>
                          </div>
                          <i class="icon-active fa fa-caret-down"></i>
                          <div>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                    <swiper-slide class="p-0">
                      <div class="c">
                        <div class="img-fluid rounded-0 col-12 p-0 card__time text-center align-items-center" style="">
                          <div>
                            <h3 class="">AMANHÃ</h3>
                            <p class="lead">Mar 22</p>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                    <swiper-slide class="p-0">
                      <div class="c">
                        <div class="img-fluid rounded-0 col-12 p-0 card__time text-center align-items-center" style="">
                          <div>
                            <h3 class="">QUI</h3>
                            <p class="lead">Mar 23</p>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                    <swiper-slide class="p-0">
                      <div class="c">
                        <div class="img-fluid rounded-0 col-12 p-0 card__time text-center align-items-center" style="">
                          <div>
                            <h3 class="">🎉SEX</h3>
                            <p class="lead">Mar 24</p>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                    <swiper-slide class="p-0">
                      <div class="c">
                        <div class="img-fluid rounded-0 col-12 p-0 card__time text-center align-items-center" style="">
                          <div>
                            <h3 class="">SAB</h3>
                            <p class="lead">Mar 25</p>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                    <swiper-slide class="p-0">
                      <div class="c">
                        <div class="img-fluid rounded-0 col-12 p-0 card__time text-center align-items-center" style="">
                          <div>
                            <h3 class="">DOM</h3>
                            <p class="lead">Mar 26</p>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                    <swiper-slide class="p-0">
                      <div class="c">
                        <div class="img-fluid rounded-0 col-12 p-0 card__time text-center align-items-center" style="">
                          <div>
                            <h3 class="">SEG</h3>
                            <p class="lead">Mar 27</p>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                    <swiper-slide class="p-0">
                      <div class="c">
                        <div class="img-fluid rounded-0 col-12 p-0 card__time text-center align-items-center" style="">
                          <div>
                            <h3 class="">TER</h3>
                            <p class="lead">Mar 28</p>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                    <swiper-slide class="p-0">
                      <div class="c">
                        <div class="img-fluid rounded-0 col-12 p-0 card__time text-center align-items-center" style="">
                          <div>
                            <h3 class="">QUA</h3>
                            <p class="lead">Mar 29</p>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                  </swiper>
                  <div class="container__available-times pl-3 row">
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>

                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>

                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>

                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>

                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>

                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>
                    <div class="card__hour text-center align-items-center" style="">
                      <div>
                        <!-- <h3 class="">HORÁRIO</h3> -->
                        <h3 class="lead"><i class="far fa-sm fa-clock" style="margin-right: 5px; font-size: 15px" ></i>18:00</h3>
                        <p class="lead">A partir de R$ 17,00</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- <div class="col-3">
          a
        </div> -->

      </div>
    </div>

  </div>
  <div v-else>
    <section class="to-block to-viewport bg-dark bg__main" style="height: 500px;" data-block-type="call_to_action" data-id="2">

    </section>
    <div class="content__show container__new" style="margin-top: -500px !important">
      <div class="row">
        <div class="col-md-6 container">
          <div class="row">
            <div class="col-md-12" style="">
              <div class="content__description">
                <div class="card event__card">
                  <div class="show__date">
                    <h2>{{event.NomPeca}}</h2>
                    <span class="event__badges">
                        <a href="#" class="badge badge__icon badge__genre badge-danger noClick" id="badge__gender" @click="gotoSearch(event.TipPeca, 'genre')">{{event.TipPeca}}</a>
                        <a href="#" :class="parentalrating(event)" id="badge__age">{{event.CenPeca}}</a>
                        <a href="#" class="badge badge__icon badge__state badge-light" id="badge__address" @click="gotoSearch(event.ds_local_evento, 'local')">{{event.ds_local_evento}}</a>
                        <a href="#" class="badge badge__icon badge__city badge-secondary" id="badge__city" @click="gotoSearch(event.city, 'city')">{{event.cityBadgeText}}</a>
                        <a href="#" class="badge badge__icon badge__money badge-success noClick" id="badge__price">{{event.valores}}</a>
                        <a href="#" v-if="imageLoaded" class="badge badge__icon badge__local badge-info" id="badge__map" @click="map($event)">Ver no mapa</a>
                        <span class="flag" id="">
                          <img v-for="(item) in event.badge" v-bind:key="item.tag" :id="item.tag" :title="item.tag" :src="item.img" alt="">
                          <img v-for="(ipromo, index) in event.promo" :key="index" :src="ipromo.img" :title="ipromo.tag" :alt="ipromo.tag">
                        </span>

                    </span>
                  </div>

                </div>
              </div>
              <div class="content__description">
                <div class="card 
                   card__container">
                  <p class="event__card-holder">
                    <span>
                        <EventImageLoader class="event__card-img" v-if="!imageLoaded && !roomLoaded && !timeLoaded" :speed="2" :animate="true" style="height: 200px; border-radius: 5px"></EventImageLoader> 
                        <img  v-else class="event__card-img" :src="event.img" alt="" style="">
                      </span>
                  </p>
                  <h3 style="padding-left: 10px">Descrição</h3>
                  <span class="event__description" v-html="event.description">
                      </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-12 time__card">
              <div class="show__date show__date-disp">
                <div>
                  <h2>Escolha a data e a opção</h2>
                </div>
                <div class="result__button-group" v-if="!roomLoaded && !timeLoaded">
                  <EventRoomLoader class="container__placeholder" :speed="2" :animate="true" style="height: 23px; border-radius: 5px; margin-top: 5px"></EventRoomLoader>
                </div>
                <div class="result__button-group" v-else>
                  <b-dropdown variant="dark" id="ddown-sm-split" size="sm" split :text="filterByDate" bin class="btn__datas m-2">
                    <b-dropdown-item-button variant="dark" v-for="(item) in dates" @click="selectedDate(item)" :key="item.date">{{item.date}}</b-dropdown-item-button>
                  </b-dropdown>
                  <b-dropdown variant="dark" id="ddown-sm-split" size="sm" split :text="filterByRoom" bin class="btn__salas m-2">
                    <b-dropdown-item-button style="border-color: transparent!important" @click="selectedRoom({ CodSala: 0, NomSala: 'Todas as opções'})">Todas as opções</b-dropdown-item-button>
                    <b-dropdown-item-button style="border-color: transparent!important" v-for="(item) in salasDisponiveis" @click="selectedRoom(item)" :key="item.CodSala">{{item.NomSala}}</b-dropdown-item-button>
                  </b-dropdown>
                </div>
              </div>
              <div class="container__time">
                <EventTimeLoader class="container__placeholder" v-if="!roomLoaded && !timeLoaded" :speed="2" :animate="true" style="height: 70px; border-radius: 5px"></EventTimeLoader>
                <div class="time__placeholder" v-else>
                  <div class="card" v-if="filtered.length==0">
                    <div class="card-body row">
                      <div class="col col-md text-center card__date">
                        Não há mais dias para esse evento.
                      </div>
                    </div>
                  </div>

                <transition-group name="fade">
                  <div class="card" v-for="(item) in filtered" :key='item'>
                    <div class="card-body row">
                      <div class="col-3 col-md-2 text-center card__date p-0">
                        <span style="font-size: 12px">
                          {{ item.weekdayName }} 
                        </span>
                        <br />
                        <span style="font-weight: bold; font-size: 14px">
                          {{ item.day }} 
                        </span> 
                        <br /> 
                        <span style="font-size: 12px">
                          {{ item.HorSessao }}
                        </span> 
                      </div>
                      <div class="col-8 col-md-7 card__description" style="border-left: 1px solid #777;padding-left: 15px;">
                        <span class="">
                        {{ item.NomPeca }} - {{item.NomSala}} - {{ item.ValPeca | money}} </span> <br> <span class="pt-1">{{ item.ds_municipio }}/{{item.sg_estado}}</span>
                      </div>
                      <div class="col-10 col-md-3 card__btn">
                        <button type="button" class="btn btn-outline-light btn-sm float-right" @click="buy(item.id_apresentacao)">Comprar</button>
                      </div>
                    </div>
                  </transition-group>
                </div>
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
import Vue from 'vue';
import VueResource from "vue-resource";
import VueHead from 'vue-head';
import config from '@/config';
import {
  func
} from '@/functions';
import $ from "jquery";
import EventTimeLoader from '@/components/loaders/EventTimeLoader.vue';
import EventRoomLoader from '@/components/loaders/EventRoomLoader.vue';
import EventImageLoader from '@/components/loaders/EventImageLoader.vue';
import AppSearch from "@/components/App-search.vue";

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

import {
  eventService
} from "@/components/common/services/event";

Vue.use(VueHead);

Vue.filter("money", function (value) {
  let helper = parseFloat(value);
  let ret = "0.00";
  if (helper > 0) {
    ret = helper.toFixed(2);
  }
  return `R$ ${ret}`;
});

export default {
  name: "event",
  mixins: [func],
  components: {
    EventTimeLoader,
    EventRoomLoader,
    EventImageLoader,
    AppSearch
  },
  head: {
    title: function () {
      return {
        inner: (this.event.loaded ? `${this.event.NomPeca} - ${this.event.ds_local_evento} - ${this.event.TipPeca}` : "Carregando..."),
        separator: " - ",
        complement: this.event.loaded ? config.info.title : "",
      }
    },
    meta: function () {
      return [{
          name: 'application-name',
          id: 'application-name',
          content: this.metaObj.appName
        },
        {
          name: 'description',
          id: 'description',
          content: this.metaObj.description
        },
        {
          name: 'keywords',
          id: 'keywords',
          content: this.metaObj.keywords
        },
        {
          itemprop: 'name',
          id: 'name',
          content: this.metaObj.name
        },
        {
          itemprop: 'description',
          id: 'itempropdescription',
          content: this.metaObj.description
        },
        {
          name: 'twitter:card',
          id: 'twitter_card',
          content: this.metaObj.twitter.card
        },
        {
          name: 'twitter:title',
          id: 'twitter_title',
          content: this.metaObj.twitter.title
        },
        {
          name: 'twitter:description',
          id: 'twitter_description',
          content: this.metaObj.twitter.description
        },
        {
          name: 'twitter:image',
          id: 'twitter_image',
          content: this.metaObj.twitter.image.root
        },
        {
          name: 'twitter:image:alt',
          id: 'twitter_imagealt',
          content: this.metaObj.twitter.image.alt
        },
        {
          property: 'og:title',
          id: 'og_title',
          content: this.metaObj.og.title
        },
        {
          property: 'og:type',
          id: 'og_type',
          content: this.metaObj.og.type
        },
        {
          property: 'og:url',
          id: 'og_url',
          content: this.metaObj.og.url
        },
        {
          property: 'og:description',
          id: 'og_description',
          content: this.metaObj.og.description
        },
        {
          property: 'og:site_name',
          id: 'og_site_name',
          content: this.metaObj.og.site_name
        },
        {
          property: 'og:image',
          id: 'og_image',
          content: this.metaObj.og.image.root
        },
        {
          property: 'og:image:secure_url',
          id: 'og_image_secure_url',
          content: this.metaObj.og.image.secure_url
        },
        {
          property: 'og:image:type',
          id: 'og_image_type',
          content: this.metaObj.og.image.type
        },
        {
          property: 'og:image:alt',
          id: 'og_image_alt',
          content: this.metaObj.og.image.alt
        },
      ]
    },
    link: function () {
      return [{
          rel: 'icon',
          href: `${config.info.favicoPath}/favicon-32x32.png`,
          sizes: '32x32',
          type: 'image/png'
        },
        {
          rel: 'icon',
          href: `${config.info.favicoPath}/favicon-16x16.png`,
          sizes: '16x16',
          type: 'image/png'
        },
      ]
    }
  },

  data() {
    return {
      processing: true,
      filterBy: 0,
      filterByDate: '',
      filterByRoom: 'Todas as opções',
      metaObj: this.metatag_getObj(),
      event: {
        loaded: false,
        NomPeca: null,
        CodPeca: null,
        TipPeca: null,
        CenPeca: null,
        ds_local_evento: null,
        id_base: null,
        address: null,
        valores: null,
        description: null,
        img: null,
        badge: [],
        promo: [],
        city: null,
        state: null,
        cityBadgeText: null,
      },
      dates: [],
      salasDisponiveis: [],
      presentantion: [],
      timeLoaded: false,
      roomLoaded: false,
      dateLoaded: false,
      imageLoaded: false,
      swiperOption: {
        // loop: true,
        // autoplay: true,
        // speed: 1000,
        // loopedSlides: 1,
        slidesPerView: "7",
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          800: {
            slidesPerView: "3",
          }
        }
      }
    }
  },
  created() {
    // Fixa navbar ao ultrapassa-lo
    var navbar = $('#navbar'),
      distance = navbar.offset().top,
      $window = $(window);

    $window.scroll(function () {
      if ($window.scrollTop() >= 140) {
        navbar.removeClass('navbar-fixed-top').addClass('navbar-fixed-top');
      } else {
        navbar.removeClass('navbar-fixed-top');
      }

      if ($window.scrollTop() >= 600) {
        $('#btn__comprar').css("opacity", 1 - $(window).scrollTop() / 250);
      } else {
        $('#btn__comprar').css("opacity", 1 + $(window).scrollTop() / 250);
      }
    });
  },
  methods: {
    scrollTo() {
      var element = document.getElementById("horario");
      var top = element.offsetTop;
      window.scrollTo(0, top - 100);
    },
    showReadMore() {
      //   let readmorep = document.querySelector("#read-more-p");
      // if (readmorep.style.height < 399) {
      //     let readmore = document.querySelector("#read-more");
      //     readmore.style.display = "none";
      // }
    },
    expand(target) {
      let prev = document.querySelector("#read-more-p");

      prev.style.height = prev.scrollHeight + "px";

      let readmore = document.querySelector("#read-more");
      let readless = document.querySelector("#read-less");

      readmore.style.display = "none";
      readless.style.display = "block";
    },
    retract(target) {
      let prev = document.querySelector("#read-more-p");
      let readmore = document.querySelector("#read-more");
      let readless = document.querySelector("#read-less");

      prev.style.height = "400px";
      readmore.style.display = "block";
      readless.style.display = "none";
    },
    parentalrating(event) {
      let ret = "badge noClick ";
      switch (event.CenPeca) {
        case "L":
          ret += "badge-prL";
          break;
        case "10":
          ret += "badge-pr10";
          break;
        case "12":
          ret += "badge-pr12";
          break;
        case "14":
          ret += "badge-pr14";
          break;
        case "16":
          ret += "badge-pr16";
          break;
        case "18":
          ret += "badge-pr18";
          break;
      }
      return ret;
    },
    selectedDate(item) {
      this.filterByDate = item.date;
    },
    selectedRoom(item) {
      this.filterBy = item.CodSala;
      this.filterByRoom = item.NomSala;
    },
    toggleFilter(code) {
      this.filterBy = code;
    },
    buy(id_apresentacao) {
      this.gotoLegacy(id_apresentacao, "shopping");
    },
    map(event) {
      if (event) event.preventDefault();

      window.open("http://maps.google.com/?q=" + (this.event.address == null || this.event.address == "" ? this.event.ds_local_evento : this.event.address));
    },
    returnMap() {
      //  debugger

      var map = "https://www.google.com/maps/embed?q=" + encodeURIComponent(this.event.address)
      return map;
    },
    gotoSearch(item, type) {
      switch (type) {
        case "city":
          this.$router.push("/busca/cidade/" + item);
          break;
        case "local":
          this.$router.push("/busca/local/" + item);
          break;
        case "genre":
          this.$router.push("/busca/genero/" + item);
          break;
      }
      //this.$router.push("/busca/" + item);
    },
    getRooms() {
      Vue.nextTick().then(response => {
        eventService.rooms(this.event.id_base, this.event.CodPeca).then(
          response => {
            this.hideWaitAboveAll();
            if (this.validateJSON(response)) {
              this.salasDisponiveis = response;
              this.roomLoaded = true;
            }
          },
          error => {
            this.processing = false;
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");
          }
        );

      });
    },
    getDates() {
      Vue.nextTick().then(response => {
        eventService.dates(this.event.id_base, this.event.CodPeca).then(
          response => {
            this.hideWaitAboveAll();
            if (this.validateJSON(response)) {
              this.dates = response;
              this.dateLoaded = true;
              this.filterByDate = "Datas";
              //if (this.dates.length > 0) {
              //  this.filterByDate = this.dates[0].date;
              // }
              //else {
              //  this.filterByDate = "";
              // }
            }
          },
          error => {
            this.processing = false;
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");
          }
        );

      });
    },
    getPresentation() {
      this.showWaitAboveAll();
      Vue.nextTick().then(response => {
        eventService.presentation(this.event.id_base, this.event.CodPeca).then(
          response => {
            this.hideWaitAboveAll();
            if (this.validateJSON(response)) {
              this.presentantion = response;
              this.timeLoaded = true;
            }
          },
          error => {
            this.processing = false;
            this.hideWaitAboveAll();
            this.toastError("Falha na execução.");
          }
        );
      });
    },
    getEvent() {
      this.showWaitAboveAll();
      this.processing = true;

      eventService.description(this.key).then(
        response => {
          this.hideWaitAboveAll();
          this.processing = false;

          if (response.error) {
            this.toastError(response.msg);
            if (response.goto == "home")
              window.location = "/";
            return;
          }
          if (this.validateJSON(response)) {
            this.event.loaded = true;
            this.event.NomPeca = response.NomPeca;
            this.event.CodPeca = response.CodPeca;
            this.event.TipPeca = response.TipPeca;
            this.event.CenPeca = response.CenPeca;
            this.event.ds_local_evento = response.ds_local_evento;
            this.event.address = response.address;
            this.event.id_base = response.id_base;
            this.event.valores = response.valores;
            this.event.description = response.description;
            this.event.img = response.img;
            this.event.badge = response.badge;
            this.event.promo = response.promo;
            this.event.meta_keyword = response.meta_keyword;
            this.event.meta_description = response.meta_description;
            this.event.city = response.ds_municipio;
            this.event.state = response.sg_estado;
            this.event.cityBadgeText = response.badge_city_text;
            this.getRooms();
            this.getPresentation();
            this.getDates();

            this.metaObj.appName = config.info.siteName;
            this.metaObj.description = this.event.meta_description;
            this.metaObj.keywords = this.event.meta_keyword;
            this.metaObj.name = this.event.NomPeca;
            this.metaObj.twitter.card = 'summary_large_image';
            this.metaObj.twitter.title = this.event.NomPeca;
            this.metaObj.twitter.description = this.event.meta_description;
            this.metaObj.twitter.image.root = this.event.img;
            this.metaObj.twitter.image.alt = this.event.NomPeca;
            this.metaObj.og.title = this.event.NomPeca;
            this.metaObj.og.type = 'website';
            this.metaObj.og.url = config.host + response.key;
            this.metaObj.og.description = this.event.meta_description;
            this.metaObj.og.site_name = config.info.siteName;
            this.metaObj.og.image.root = this.event.img;
            this.metaObj.og.image.secure_url = this.event.img;
            this.metaObj.og.image.type = 'image/jpeg';
            this.metaObj.og.image.alt = this.event.NomPeca;

            this.$emit('updateHead');

            this.imageLoaded = true;
          }
          console.log(this.event.description.length);
        },
        error => {
          this.processing = false;
          this.hideWaitAboveAll();
          this.toastError("Falha na execução.");
        }
      );
    },
  },
  mounted() {
    this.getEvent();
    this.keepalive();

  },
  computed: {
    key() {
      return this.$route.params.key;
    },
    filtered() {
      let ret = this.presentantion;
      if (this.filterBy != 0) {
        ret = this.presentantion.filter(x => x.CodSala == this.filterBy);
      }

      if (this.filterByDate != '' && this.filterByDate != 'Datas') {
        let splited = this.filterByDate.split('/');
        let day = `${splited[0]}/${splited[1]}`;
        let year = splited[2];
        ret = ret.filter(x => x.day == day && x.year == year);
      }

      return ret;
    },

  }
};

$(document).ready(function () {
  // console.log( "ready!" );
  // debugger

});
</script>

<style lang="scss" scoped>
.card {
  background: #333;
}

.noClick {
  cursor: default;
}

.result__button-group {
  padding-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active em versões anteriores a 2.1.8 */
  {
  opacity: 0;
}

.badge-prL {
  color: #fff;
  background-color: #28a745;
}

.badge-prL[href]:hover,
.badge-prL[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #1e7e34;
}

.badge-pr10 {
  color: #fff;
  background-color: #007bff;
}

.badge-pr10[href]:hover,
.badge-pr10[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #0062cc;
}

.badge-pr12 {
  color: #212529;
  background-color: #ffc107;
}

.badge-pr12[href]:hover,
.badge-pr12[href]:focus {
  color: #212529;
  text-decoration: none;
  background-color: #d39e00;
}

.badge-pr14 {
  color: #fff;
  background-color: #ed7300;
}

.badge-pr14[href]:hover,
.badge-pr14[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #e5760e;
}

.badge-pr16 {
  color: #fff;
  background-color: #dc3545;
}

.badge-pr16[href]:hover,
.badge-pr16[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #bd2130;
}

.badge-pr18 {
  color: #fff;
  background-color: #343a40;
}

.badge-pr18[href]:hover,
.badge-pr18[href]:focus {
  color: #fff;
  text-decoration: none;
  background-color: #1d2124;
}
</style>
