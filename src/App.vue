<template>
  <BaseAlert/>
  <ConfirmModal />
  <router-view></router-view>
</template>

<script setup>
import BaseAlert from "@/components/alert/BaseAlert.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

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
  .h__sidebar_menu_item:hover .nav-link{
    background-color: rgba(255,255,255,.1);
  }
  .router-link-active{
    background-color: #007bff;
    color: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  }
</style>
