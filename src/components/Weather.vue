<template>
	
	<div >
		<h1>Weather App</h1>
		<p>{{ info }}</p>
	</div>
		
</template>
<script>

import axios from 'axios'
export default {
  name: 'Weather',
  data () {
    return {
			info:"This is a VueJs App to show weather information using the metaweather API",
			weatherInfo: {
				cityName:null,
				temperature:null,
				maximumTemperature:null,
				minimumTemperature:null,
				weatherIcon:null
			},
			details: {
				cities:["Istanbul", "Berlin", "London","Helsinki", "Dublin", "Vancouver"]
			}
		}
	},
	methods:{
		dummy: function(){
			console.log("dummy function call")
		}
	},
	mounted(){
		axios.get('http://localhost:8080/weather.php?url=https://www.metaweather.com/api/location/44418/2018/10/10/')
		.then(function(result){
			console.log("Result: "+result);
		})
		.catch( function(error){
			console.log("Error: " +error);
		})
	}
}	
</script>

<style scoped>

</style>
