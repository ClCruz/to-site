
<template>
	<content-loader
		:height="350"
		:width="775"
		:speed="4"
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
	>
		<rect x="0" y="0" rx="0" ry="0" width="775" height="350" /> 
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
