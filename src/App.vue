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
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false,
    };
  },
  computed: {
    
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  mounted() {
    
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
    showRefreshUI (e) {
      this.registration = e.detail;
      this.updateExists = true;
      // this.$swal({
      //   title: 'Nova versão',
      //   text: "Realizamos atualizações no site, iremos atualizar agora.",
      //   type: 'success',
      //   toast: true,
      //   position: 'top-end',
      //   customClass: 'alert__tixsme alert__sucess',
      //   background: '#333',
      //   showConfirmButton: false,
      //   timer: 4000,
      // }).then((result) => {
      //   this.refreshApp();
      // });
      this.refreshApp();
      //this.toastSuccess("Realizamos atualizações no site, iremos atualizar agora.");
    },
    refreshApp () {
      this.updateExists = false;
      if (!this.registration || !this.registration.waiting) { return; }
      this.registration.waiting.postMessage('skipWaiting');
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
