
		
<template>
	<content-loader
		:height="240"
		:width="460"
		:speed="1"
		primaryColor="#f3f3f3"
		secondaryColor="#ebeaea"
	>		
	<rect x="0" y="0" rx="5" ry="5" width="460" height="240" />
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
