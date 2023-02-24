<template>
  <BaseAlert/>
  <ConfirmModal />
  <routerView />
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
  a{
    text-decoration: none!important;
  }
  .nav-link{
    min-width: 120px;
    padding: 15px 20px !important;
  }
  @keyframes fadeEffect {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes fadeEffect {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>
