<template>
  <div ref="el">
    <div>
      <button type="button" class="btn btn-primary">New Store</button>
    </div>
    <Suspense>
      <BaseDataTable :columns="dataTable.columns" :rows="dataTable.rows" />
    </Suspense>
  </div>
</template>
<script setup>
  import { reactive } from 'vue';
  import StoreService from "@/services/storeService";
  import BaseDataTable from "@/components/table/BaseDataTable.vue";
  const dataTable = reactive({
    columns: ['name', 'description', 'address', 'phone'],
    rows: [],
  })
  const getListStore = async () => {
    const res = await StoreService.getAll();
    dataTable.rows = [...res.data];
  }
  getListStore();

</script>