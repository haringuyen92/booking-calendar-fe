<template>
  <div class="h__c_404">
    <h2>404 Not Found</h2>
    <div>
        <router-link to="/dashboard">Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PageNotFound'
}
</script>

<style>
    .h__c_404{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 350px;
        height: 120px;
        margin: 15% auto;
        flex-direction: column;
    }
</style>