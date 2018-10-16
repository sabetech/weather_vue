<template>
	
	<div>
		<div class="container">
			<form class="form-inline" @submit.prevent="search">
        		<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="countrySearchTerm">
        		<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      		</form>
			Showing Weather of Selected Cities <br />
			{{ status }}
			<div class="row">
				<div  v-for="(data, index) in weatherData" :key='index'>
					<div class="col-sm panel" :style="{marginDown:margin}">
						<router-link :to="'/welcome/' + data.woeid">
						
							<label><img :src="data.weatherIcon" :width="40"></label><br />
							<label><strong>City: </strong> {{ data.cityName }}</label><br />
							<label><strong> Temperature: </strong>{{ parseFloat(data.temperature).toFixed(2) }}</label><br />
							<label><strong>Maximum Temperature: </strong>{{ parseFloat(data.maximumTemperature).toFixed(2) }}</label><br />
							<label><strong>Minimum Temperature: </strong>{{ parseFloat(data.minimumTemperature).toFixed(2) }}</label><br />
						
						</router-link>
					</div>
				</div>
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
			countrySearchTerm: '',
			url: 'http://repeater.local/weather.php',
			status: '',
			margin: '1em'
		}
	},
	beforeUpdate() {
		console.log("updated goes here");
		console.log(this.$route.name)
	},
	methods:{
		updateResult: function(result){
			
			var weatherInfo = {};
			weatherInfo.cityName = result.data.title;
			weatherInfo.temperature = result.data.consolidated_weather[0].the_temp;;
			weatherInfo.maximumTemperature = result.data.consolidated_weather[0].max_temp;
			weatherInfo.minimumTemperature = result.data.consolidated_weather[0].min_temp;
			weatherInfo.weatherIcon = "http://www.metaweather.com/static/img/weather/" + result.data.consolidated_weather[0].weather_state_abbr+".svg";
			weatherInfo.woeid = result.data.woeid;
			
			
			this.weatherData.push(weatherInfo);
			this.status = 'Success';

		},
		getWeatherByLocation: function(woeid, vueComponent){
			axios.get(this.url+'?command=location&woeid='+woeid)
			.then(function(result){
				vueComponent.updateResult(result);
			})
			.catch( function(error){
				console.log(error);
			});	
		},
		search: function(){
			var searchTerm = this.countrySearchTerm;
			var self = this;
			axios.get(this.url+'?command=search&keyword='+searchTerm)
			.then(function(result){
				
				if (result.data.length > 0){

					self.weatherData = [];
					self.getWeatherByLocation(result.data[0].woeid, self);

				}else{
					
					self.status = "No results were found. Try changing the keyword!";

				}
				
			})
			.catch( function(error){
				console.log(error);
			});
			

		}
	},
	mounted(){

		//home always posses through here ...
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
		background-color: #eeeeee;
		cursor: hand;

	}

</style>
