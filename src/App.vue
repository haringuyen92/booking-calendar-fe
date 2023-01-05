<template>
  <router-view></router-view>
</template>

<script>
  import Navbar from "@/components/layouts/Navbar.vue";
  import Warning from "@/components/modal/Warning.vue";
  import Sidebar from "@/components/layouts/Sidebar.vue";

  export default {
    name: 'App',
    components: {
      // eslint-disable-next-line vue/no-unused-components
      Sidebar,
      // eslint-disable-next-line vue/no-unused-components
      Warning,
      // eslint-disable-next-line vue/no-unused-components
      Navbar,
    }
  }
</script>

<style>
  #app *{
    font-family: "Source Code Pro", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #app *:not(input, select){
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
