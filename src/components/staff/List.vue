<template>
  <div ref="el">
    <div>
      <RouterLink :to="{name:'store.staff.create'}" type="button" class="btn btn-primary">New Staff</RouterLink>
    </div>
    <Suspense>
      <BaseDataTable :columns="dataTable.columns" :rows="dataTable.rows" @onGetItem="getStaff"
                     @onSettingItem="settingStaff"
                     @onDeleteItem="confirmDeleteStaff"/>
    </Suspense>
  </div>
</template>
<script setup>
import BaseDataTable from "@/components/ui/table/BaseDataTable.vue";
import {reactive, toRefs, watch} from "vue";
import StaffService from "@/services/staffService";
import {useRoute} from "vue-router";
import {router} from "@/router";
import {STAFF_CONSTANT} from "@/common/constant";
import {useConfirmModalStore} from "@/stores/confirmModalStore";
import {useAlertStore} from "@/stores/alertStore";

const {storeId} = useRoute().params;
const confirmModalStore = useConfirmModalStore();
const alertStore = useAlertStore();
const {isConfirm, component} = toRefs(confirmModalStore);

const dataTable = reactive({
  columns: ['name', 'image', 'description', 'cost', 'maxBookingSlot'],
  rows: [],
});
const getListStaff = async () => {
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
const confirmDeleteStaff = id => {
  confirmModalStore.show();
  confirmModalStore.setId(id);
  confirmModalStore.setComponentConfirm(STAFF_CONSTANT);
}
const deleteStore = async () => {
  const id = confirmModalStore.id;
  const res = await StaffService.delete(storeId, id);

  if (typeof res === 'string') {
    // handler error
    alertStore.error(res);
  } else {
    alertStore.success(res.message);
    confirmModalStore.hide();
    await getListStaff();
  }
}
const settingStaff = id => {
  console.log(id);
}
watch(isConfirm, () => {
  if (component.value === STAFF_CONSTANT) {
    deleteStore();
  }
});
getListStaff();
</script>