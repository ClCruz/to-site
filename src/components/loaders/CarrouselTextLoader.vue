
<template>
	<content-loader
		:height="700"
		:width="960"
		:speed="2"
		primaryColor="#f3f3f3"
		secondaryColor="#dedede"
	>
		<rect x="25" y="0" rx="20" ry="20" width="650" height="60" /> 
		<rect x="25" y="150" rx="5" ry="5" width="500" height="30" /> 
		<rect x="25" y="200" rx="5" ry="5" width="500" height="30" /> 
		<rect x="25" y="250" rx="5" ry="5" width="500" height="30" /> 
		<rect x="25" y="580" rx="5" ry="5" width="500" height="60" /> 
	</content-loader>
</template>

<script>
import {
  ContentLoader
} from "vue-content-loader"

export default {
  name: "CarrouselTextLoader",
  components: {
    ContentLoader
  }
}
</script>
