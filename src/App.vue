<template>
<div id="app">
  <default-layout></default-layout>
</div>
</template>

<script>
import DefaultLayout from "@/views/Main.vue"
import vueAlert from 'vue-sweetalert2';

export default {
  name: 'App',

  components: {
    DefaultLayout
  },
  methods: {
    toastSuccess(message, timer = 4000, showbutton = false) {
      this.$swal({
        type: 'success',
        toast: true,
        text: message,
        position: 'top-end',
        customClass: 'alert__tixsme alert__sucess',
        background: '#333',
        timer: timer,
        showConfirmButton: showbutton,
      });
    },
  },

  computed: {
    component() {
      return this.$store.state.common.layout
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
