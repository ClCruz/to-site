<template>
  <div id="app">
    <default-layout></default-layout>
  </div>
</template>

<script>
import DefaultLayout from "@/views/Main.vue"

export default {
  name: 'App',

  components: {
    DefaultLayout
  },

    computed: {
    component () {
      return this.$store.state.common.layout
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
