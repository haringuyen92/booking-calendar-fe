<template>
  <div class="h__sidebar">
    <ul class="nav flex-column">
      <li class="nav-item h__sidebar_menu_item" v-for="(item, key) in m_list" :key="key">
        <RouterLink class="nav-link text-white" aria-current="page" :to="item.url">{{ item.text }}</RouterLink>
      </li>
      <li class="nav-item h__sidebar_menu_item h__sidebar_cursor" @click="logout">
        <span class="nav-link text-white" aria-current="page">Logout</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const logout = () => {
  authStore.logout();
  router.push('/login');
}
const m_list = reactive([
  {
    position: 1,
    name: 'dashboard',
    text: 'Dashboard',
    url: '/dashboard'
  },
  {
    position: 2,
    name: 'store',
    text: 'Store',
    url: '/stores'
  },
  // {
  //   position: 3,
  //   name: 'setting_time',
  //   text: 'Setting Time',
  //   url: '/setting-time'
  // },
  // {
  //   position: 4,
  //   name: 'dashboard',
  //   text: 'Staff',
  //   url: '/staff'
  // },
  // {
  //   position: 5,
  //   name: 'service',
  //   text: 'Service',
  //   url: '/service'
  // },
])
</script>
<style scoped>
  .h__sidebar{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    background-color: #4F5962;
    padding-top: 56px;
  }
  .h__sidebar *{
    color: white;
  }
  .h__sidebar_menu_item{
    border-top: 1px solid gray;
  }
  .h__sidebar_menu_item:last-child{
    border-bottom: 1px solid gray;
  }
  .h__sidebar_cursor{
    cursor: pointer;
  }
  .h__sidebar_menu_item:hover .nav-link:not(.router-link-exact-active){
    background-color: rgba(255,255,255,.1);
  }
  .router-link-active{
    background-color: #007bff;
    color: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  }
</style>