<template>
  <Sidebar />
  <Header />
  <div class="h__wrapper">
    <routerView />
  </div>
</template>

<script>
  import Sidebar from '@/components/layouts/Sidebar.vue';
  import Header from '@/components/layouts/Header.vue';

  export default{
    components: { Sidebar, Header },
  }
</script>

<style>
  .h__wrapper{
    margin-left: 250px;
    padding: 15px;

  }
</style>

