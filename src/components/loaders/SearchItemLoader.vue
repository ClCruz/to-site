<template>
	<content-loader
		:height="230"
		:width="180"
		:speed="2"
		primaryColor="#151515"
		secondaryColor="#222"
	>
		<rect x="0" y="-2.13" rx="5" ry="5" width="747.65" height="230" /> 
	</content-loader>
</template>

<script>
import {
  ContentLoader
} from "vue-content-loader"

export default {
  name: "SearchItemLoader",
  components: {
    ContentLoader
  }
}
</script>
