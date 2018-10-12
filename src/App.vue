<template>
  <div id="app">
    <h1>Weather App</h1>
    <p>{{ info }}</p>
    
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      info:"This is a VueJs App to show weather information using the metaweather API"
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
