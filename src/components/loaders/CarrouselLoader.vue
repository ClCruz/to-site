
<template>
	<content-loader
		:height="390"
		:width="790"
		:speed="3"
		primaryColor="#f3f3f3"
		secondaryColor="#dedede"
	>
		<rect x="0" y="0" rx="5" ry="10" width="790" height="390" /> 
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
