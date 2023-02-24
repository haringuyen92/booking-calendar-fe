<template>
  <div v-if="alert" class="h__alert">
    <div class="m-3">
      <div class="alert alert-dismissable" :class="alert.type">
        <span>{{ alert.message }}</span>
        <button @click="alertStore.clear()" class="btn btn-link close">×</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia';
import {useAlertStore} from '@/stores/alertStore';

const alertStore = useAlertStore();
const {alert} = storeToRefs(alertStore);
</script>
<style scoped>
.h__alert {
  z-index: 1056;
  position: fixed;
  right: 0;
}
</style>