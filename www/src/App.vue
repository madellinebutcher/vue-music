<template>
  <div id="app">
    <h1><img class="v" src="./assets/logo.png">ue the Music</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Shadows Into Light Two', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
.v{
  size:15px;
}
</style>
