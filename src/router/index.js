import Vue from 'vue'
import Router from 'vue-router'
import Weather from '@/components/Weather'

Vue.use(Router)

export default new Router({mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/weather/:woeid',
      name: 'WeatherDetails',
      component: Weather
    },
    {
      path: '/search/:keyword',
      name: 'WeatherSearch',
      component: Weather
    }
  ]
})
