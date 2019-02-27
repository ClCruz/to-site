
		
<template>
	<content-loader
		:height="200"
		:width="400"
		:speed="2"
		primaryColor="#222"
		secondaryColor="#2d313c"
	>		<rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
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
