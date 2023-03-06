<template>
  <nav class="h__nav_bar">
    <div class="nav flex-row">
      <div class="nav-item" v-for="setting in settingList" :key="setting.name">
        <RouterLink :to="{ name: setting.name, params: setting.params }" class="navbar-item nav-link text-white text-center">{{setting.title }}</RouterLink>
      </div>
    </div>
  </nav>
  <div class="main__setting">
    <RouterView/>
  </div>
</template>
<script setup>
import {reactive} from "vue";
import {useRoute} from "vue-router";

const router = useRoute();
const {storeId} = router.params;
const settingList = reactive([
  {
    title: 'Setting Time',
    name: 'store.settingTime',
    params: {storeId}
  },
  {
    title: 'Course',
    name: 'store.course',
    params: {storeId}
  },
  {
    title: 'Staff',
    name: 'store.staff',
    params: {storeId}
  }
])
</script>
<style scoped>
.h__nav_bar {
  background: #08BF5A;
  margin: -10px -15px 15px;
}
.router-link-active,
.navbar-item:focus,
.navbar-item:hover {
  background: #189F55;
}
.main__setting{
  animation: fadeEffect 1s;
  -webkit-animation: fadeEffect 1s;
}
</style>