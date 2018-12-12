
		<template>
	<content-loader
		:height="245"
		:width="180"
		:speed="2"
		primaryColor="#222"
		secondaryColor="#333"
	>
				<rect x="0" y="-1" rx="5" ry="5" width="180" height="250" /> 
		<!-- <rect x="190" y="0.61" rx="0" ry="0" width="180" height="220" /> 
		<rect x="380" y="-0.39" rx="0" ry="0" width="180" height="220" /> 
		<rect x="570" y="-0.39" rx="0" ry="0" width="180" height="220" /> 
		<rect x="760" y="-0.39" rx="0" ry="0" width="90" height="220" /> -->
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
