<template>
  <Sidebar />
  <Header />
  <div class="h__wrapper">
    <routerView />
  </div>
</template>

<script setup>
  import Sidebar from '@/components/layouts/Sidebar.vue';
  import Header from '@/components/layouts/Header.vue';
</script>

<style>
  .h__wrapper{
    margin-left: 250px;
    padding: 15px;

  }
</style>

