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
import StaffService from "@/services/staffService";
import {useRoute} from "vue-router";
import {router} from "@/router";

const { storeId } = useRoute().params;

const dataTable = reactive({
  columns: ['name', 'image', 'description', 'cost', 'maxBookingSlot'],
  rows: [],
});
const getStaffs = async () => {
  const res = await StaffService.getAll(storeId);
  if (res?.success) {
    dataTable.rows = [...res.data];
  }
}
const getStaff = (id) => {
  router.push({
    name: 'store.staff.update',
    params: {
      staffId: id
    }
  })
}
const confirmDeleteStaff = () => {
  console.log("confirmDeleteStaff");
}
getStaffs();
</script>