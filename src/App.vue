<template>
  <Sidebar />

  <div class="h__left">
    <Navbar/>
    <Warning />
    <div class="container">
      <RouterView :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
  import Sidebar from "@/components/layouts/Sidebar.vue";
  import Navbar from "@/components/layouts/Navbar.vue";
  import Warning from "@/components/modal/Warning.vue";

  export default {
    name: 'App',
    components: {
      Warning,
      Navbar,
      Sidebar,
    }
  }
</script>

<style>
  .h__left{
    margin-left: 250px;
  }
</style>
