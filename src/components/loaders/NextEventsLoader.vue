<template>
	<content-loader
		:height="80"
		:width="180"
		:speed="2"
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
	>
		<rect x="0" y="0" rx="10" ry="5" width="180" height="80" />
	</content-loader>
</template>

<script>
import {
  ContentLoader
} from "vue-content-loader"

export default {
  name: "NextEventsLoader",
  components: {
    ContentLoader
  }
}
</script>
