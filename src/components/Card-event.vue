<template>
<div class="col-12 col-xl-4 col-md-6 p-1 text-left">
  <div class="to-box p-0">
    <div class="img-fluid rounded-0" :style="{ backgroundImage: 'url(\'' + item.img + '\')' }" style="background-size: cover;"></div>

    <div class="content to-box p-2 pt-0 pb-2" style="position: relative; border-top-left-radius: 0 !important; border-top-right-radius: 0 !important;">
      <h4 class="event__title pb-1">
        <strong>{{ item.ds_evento |  truncate(35, ' ...') }}</strong>
      </h4>
      <p class="p-0 m-0 event__item event__item-date"><span class="bold">{{item.datas |  replace('-', 'á')}}</span></p>
      <p class="p-0 pt-1 m-0 h-200 event__item event__item-local"><span class="bold" style="text-transform: capitalize !important">{{ item.ds_nome_teatro | capitalize() }} - {{ item.ds_municipio | capitalize() }},</span> {{ item.sg_estado }} </p>

    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "CardEvent",
  computed: {},
  methods: {},
  props: ['item'],

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
  }
};
</script>

<style lang="scss">
</style>
