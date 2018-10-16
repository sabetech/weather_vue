<template>
	
	<div>
		<div  v-for="(data, index) in weatherData" :key='index' class="panel">
			<div v-bind:style="{ width: width, float: float_left }">
				<label><img :src="data.weatherIcon" :width="40"></label><br />
				<label><strong>City: </strong> {{ data.cityName }}</label><br />
				<label><strong> Temperature: </strong>{{ parseFloat(data.temperature).toFixed(2) }}</label><br />
				<label><strong>Maximum Temperature:</strong>{{ parseFloat(data.maximumTemperature).toFixed(2) }}</label><br />
				<label><strong>Minimum Temperature:</strong>{{ parseFloat(data.minimumTemperature).toFixed(2) }}</label><br />
			</div>
		</div>
	</div>
		

</template>
<script>

import axios from 'axios'
export default {
  name: 'Weather',
  data () {
    return {
			
			details: {
				//cities:["Istanbul", "Berlin", "London","Helsinki", "Dublin", "Vancouver"]
				cities_woeid:[2344116, 638242, 44418, 565346, 560743, 9807]
			},
			weatherData: [],
			width: '20%',
			float_left: 'left',
			parent_width: '80%'
		}
	},
	methods:{
		updateResult: function(result){
			var weatherInfo = {};
			weatherInfo.cityName = result.data.title;
			weatherInfo.temperature = result.data.consolidated_weather[0].the_temp;;
			weatherInfo.maximumTemperature = result.data.consolidated_weather[0].max_temp;
			weatherInfo.minimumTemperature = result.data.consolidated_weather[0].min_temp;
			weatherInfo.weatherIcon = "http://www.metaweather.com/static/img/weather/" + result.data.consolidated_weather[0].weather_state_abbr+".svg";
			
			this.weatherData.push(weatherInfo);

		},
		getWeatherByLocation: function(woeid, vueComponent){
			axios.get('http://repeater.local/weather.php?command=location&woeid='+woeid)
			.then(function(result){
				vueComponent.updateResult(result);
			})
			.catch( function(error){
				console.log(error);
			})	
		}
	},
	mounted(){
		for(var i = 0;i < this.details.cities_woeid.length; i++){
			this.getWeatherByLocation(this.details.cities_woeid[i], this);
		}
		
	}
}	
</script>

<style scoped>
	@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
	.panel {
		font-family: 'Montserrat', sans-serif;
		width: 80%;
		background-color: #eeeeee;
		margin:auto;
	}

</style>
