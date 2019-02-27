
		
<template>
	<content-loader
		:height="24"
		:width="80"
		:speed="1"
		primaryColor="#222"
		secondaryColor="#2d313c"
	>
		<rect x="-38.64" y="-9.13" rx="5" ry="5" width="747.65" height="91.06" /> 
		<rect x="282.63" y="12.61" rx="0" ry="0" width="0" height="0" /> 
		<rect x="813.63" y="-0.39" rx="0" ry="0" width="164" height="295" />
	</content-loader>
</template>

<script>
import {
  ContentLoader
} from "vue-content-loader"

export default {
  name: "SlideItemLoader",
  components: {
    ContentLoader
  }
}
</script>
