<template>
  <div class="h__sidebar">
    <ul class="nav flex-column">
      <li class="nav-item h__sidebar_menu_item" v-for="(item, key) in m_list" :key="key">
        <router-link class="nav-link text-white" aria-current="page" :to="item.url">{{ item.text }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        m_list: [
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
            url: '/store'
          },
          {
            position: 3,
            name: 'setting_time',
            text: 'Setting Time',
            url: '/setting-time'
          },
          {
            position: 4,
            name: 'dashboard',
            text: 'Staff',
            url: '/staff'
          },
          {
            position: 5,
            name: 'service',
            text: 'Service',
            url: '/service'
          },
        ]
      }
    }
  }
</script>
<style>
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
  .h__sidebar_menu_item .nav-link{
    padding: 15px 20px !important;
  }
</style>