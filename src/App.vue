<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  @import 'bulma/css/bulma.min.css';
  #app *{
    font-family: "Source Code Pro", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #app *:not(input, select, textarea){
    font-weight: bold;
  }
  label{
    font-size: 0.9rem;
  }
  #app *:not(h1,h2,h3,h4,h5,h6,label){
    font-size: 0.8rem;
  }
  .h__left{
    margin-left: 250px;
  }
</style>
