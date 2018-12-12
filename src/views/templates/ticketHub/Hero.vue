<template>
<div class="a">
  <section class="fdb-block fdb-viewport bg-dark p-5" style="background-image: url(./img/bg.svg);"
    data-block-type="call_to_action" data-id="2">
    <div class="container justify-content-center align-items-center d-flex p-5">
      <div class="col-8 justify-content-center text-center">
        <div class="" style="z-index: 10000;">
            <h2 >O que você deseja encontrar ?</h2>
        </div>
        <div class="input-group mt-4 mb-4 p-3 w-100">
            <input type="text" class="form-control" placeholder="Procure um evento">
            <div class="input-group-append">
              <button class="btn btn-primary" type="button">Submit</button>
            </div>
          </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  name: "Hero",
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
</style>
