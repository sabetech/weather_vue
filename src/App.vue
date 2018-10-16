<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Weather App</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">

        <span class="navbar-toggler-icon"></span>

      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/">Home </router-link>
          </li>
        </ul>
      </div>
      
    </nav>
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

@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
