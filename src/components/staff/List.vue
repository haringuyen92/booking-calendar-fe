<template>
  <div ref="el">
    <div>
      <RouterLink :to="{name:'store.staff.create'}" type="button" class="btn btn-primary">New Store</RouterLink>
    </div>
    <Suspense>
      <BaseDataTable :columns="dataTable.columns" :rows="dataTable.rows" @onGetItem="getStaff" @onDeleteItem="confirmDeleteStaff"/>
    </Suspense>
  </div>
</template>
<script setup>
import BaseDataTable from "@/components/ui/table/BaseDataTable.vue";
import {reactive} from "vue";

const dataTable = reactive({
  columns: ['name', 'description', 'address', 'phone'],
  rows: [],
});
const getStaff = () => {
  console.log("getStaff");
}
const confirmDeleteStaff = () => {
  console.log("confirmDeleteStaff");
}

</script>