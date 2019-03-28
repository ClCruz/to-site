
		
<template>
	<content-loader
		:height="16"
		:width="600"
		:speed="2"
		primaryColor="#e9e9e9"
		secondaryColor="#d9d9d9"
	>
		<rect x="0" y="0" rx="2" ry="2" width="92.81" height="16" /> 
		<rect x="100" y="0" rx="2" ry="2" width="92.58" height="16" />
		<!-- <rect x="200" y="0" rx="2" ry="2" width="92.58" height="25" /> -->
		<!-- <rect x="300" y="0" rx="2" ry="2" width="92.58" height="25" /> -->
	</content-loader>
</template>

<script>
import {
  ContentLoader
} from "vue-content-loader"

export default {
  name: "GenreFeaturesLoader",
  components: {
    ContentLoader
  }
}
</script>
