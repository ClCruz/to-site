
<template>
	<content-loader
		:height="480"
		:width="840"
		:speed="3"
		primaryColor="#f3f3f3"
		secondaryColor="#dedede"
	>
		<rect x="0" y="0" rx="5" ry="10" width="840" height="480" /> 
	</content-loader>
</template>

<script>
import {
  ContentLoader
} from "vue-content-loader"

export default {
  name: "CarrouselLoader",
  components: {
    ContentLoader
  }
}
</script>
