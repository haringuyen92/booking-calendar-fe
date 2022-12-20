<template>
  <Sidebar />
  <div class="h__left">
    <Navbar/>
    <Warning />
  </div>
</template>

<script>
  import Navbar from "@/components/layouts/Navbar.vue";
  import Warning from "@/components/modal/Warning.vue";
  import Sidebar from "@/components/layouts/Sidebar.vue";

  export default {
    name: 'App',
    components: {
      Sidebar,
      Warning,
      Navbar,
    }
  }
</script>

<style>
  #app *{
    font-family: "Source Code Pro", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: bold;
  }
  .h__left{
    margin-left: 250px;
  }
</style>
