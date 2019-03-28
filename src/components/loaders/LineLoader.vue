
		
<template>
	<content-loader
		:height="120"
		:width="300"
		:speed="2"
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
	>
		<rect x="0" y="10.61" rx="2" ry="2" width="92.22" height="15" /> 
		<rect x="0" y="33.61" rx="2" ry="2" width="200.22" height="15" /> 
		<rect x="0" y="60.61" rx="2" ry="2" width="86.91" height="22" />
	</content-loader>
</template>

<script>
import {
  ContentLoader
} from "vue-content-loader"

export default {
  name: "LineLoader",
  components: {
    ContentLoader
  }
}
</script>
