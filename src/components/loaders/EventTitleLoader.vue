
		
<template>
	<content-loader
		:height="512"
		:width="500"
		:speed="2"
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
	>
		<rect x="0" y="2" rx="5" ry="5" width="400" height="30" /> 
		<rect x="0" y="40.61" rx="5" ry="5" width="70.81" height="16" /> 
		<rect x="80.52" y="40.61" rx="5" ry="5" width="70.31" height="16" /> 
		<rect x="160.52" y="40.61" rx="5" ry="5" width="70.31" height="16" /> 
		<rect x="0" y="80.61" rx="5" ry="5" width="183.26" height="20" />

		 
		<rect x="0" y="120" rx="3" ry="3" width="350" height="10.4" /> 
		<rect x="0" y="150" rx="3" ry="3" width="380" height="10.4" /> 
		<rect x="0" y="180" rx="3" ry="3" width="300" height="10.4" /> 
		<rect x="0" y="210" rx="3" ry="3" width="380" height="10.4" /> 
	</content-loader>
</template>

<script>
import {
  ContentLoader
} from "vue-content-loader"

export default {
  name: "EventTitleLoader",
  components: {
    ContentLoader
  }
}
</script>
