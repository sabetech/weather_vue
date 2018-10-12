<template>
	
	<div>
		<div><label><strong>City:</strong>{{ weatherInfo.cityName }}</label></div>
		<div><label><strong>Temperature:</strong>{{ weatherInfo.temperature }}</label></div>
		<div><label><strong>Maximum Temperature:</strong>{{ weatherInfo.maximumTemperature }}</label></div>
		<div><label><strong>Minimum Temperature:</strong>{{ weatherInfo.minimumTemperature }}</label></div>
		<div><label><img :src="weatherInfo.weatherIcon" :width="40"></label></div>
	</div>
		
</template>
<script>

import axios from 'axios'
export default {
  name: 'Weather',
  data () {
    return {
			weatherInfo: {
				cityName:null,
				temperature:null,
				maximumTemperature:null,
				minimumTemperature:null,
				weatherIcon:null
			},
			details: {
				//cities:["Istanbul", "Berlin", "London","Helsinki", "Dublin", "Vancouver"]
				cities_woeid:[2344116, 638242, 44418, 565346, 560743, 9807]
			}
		}
	},
	methods:{
		displayResult: function(result){
			this.weatherInfo.cityName = result.data.title;
			this.weatherInfo.temperature = result.data.consolidated_weather[0].the_temp;;
			this.weatherInfo.maximumTemperature = result.data.consolidated_weather[0].max_temp;
			this.weatherInfo.minimumTemperature = result.data.consolidated_weather[0].min_temp;
			this.weatherInfo.weatherIcon = "http://www.metaweather.com/static/img/weather/" + result.data.consolidated_weather[0].weather_state_abbr+".svg";
			
		},
		getWeatherByLocation: function(woeid, vueComponent){
			axios.get('http://repeater.local/weather.php?command=location&woeid='+woeid)
			.then(function(result){
				vueComponent.displayResult(result);
			})
			.catch( function(error){
				console.log(error);
			})	
		}
	},
	mounted(){
		this.getWeatherByLocation(this.details.cities_woeid[0], this);
		//console.log(woeiad);
	}
}	
</script>

<style scoped>

</style>
