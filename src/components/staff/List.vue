<template>
  <div ref="el">
    <div>
      <RouterLink :to="{name:'store.staff.create'}" type="button" class="btn btn-primary">New Staff</RouterLink>
    </div>
    <BaseModal v-model="modal.status" v-if="modal.status" @onCloseModal="closeModal" title="Setting Staff">
      <template v-slot:main>
        <div class="h__form_center">
          <div class="h__form_basic">
            <div class="h__form_group d-flex flex-row">
              <label class="col-4 has-text-right mr-2">isAllCourse:</label>
              <input type="checkbox">
            </div>
            <div class="h__form_group d-flex flex-row" v-for="course in courses" :key="course">
              <label class="col-4 has-text-right mr-2">{{ course.name }}:</label>
              <input type="checkbox">
            </div>
          </div>
        </div>
      </template>
      <template v-slot:action>
        <button class="button is-success">Update</button>
      </template>
    </BaseModal>
    <Suspense>
      <BaseDataTable :columns="dataTable.columns"
                     :rows="dataTable.rows"
                     @onGetItem="getStaff"
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
import {EVENT_CREATE_CONSTANT, STAFF_CONSTANT} from "@/common/constant";
import {useConfirmModalStore} from "@/stores/confirmModalStore";
import {useAlertStore} from "@/stores/alertStore";
import BaseModal from "@/components/ui/modal/BaseModal.vue";
import CourseService from "@/services/courseService";

const {storeId} = useRoute().params;
const confirmModalStore = useConfirmModalStore();
const alertStore = useAlertStore();
const {isConfirm, component} = toRefs(confirmModalStore);

const dataTable = reactive({
  columns: ['name', 'image', 'description', 'cost', 'maxBookingSlot'],
  rows: [],
});
let courses = reactive([]);
const modal = reactive({
  status: false,
  event: EVENT_CREATE_CONSTANT
});
const showModal = () => modal.status = true;
const closeModal = () => modal.status = false;
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
const settingStaff = async id => {
  const resGetCourse = await CourseService.getAll(storeId);
  courses = [...resGetCourse.data]
  console.log(id)
  console.log(resGetCourse.data)
  showModal();
}
watch(isConfirm, () => {
  if (component.value === STAFF_CONSTANT) {
    deleteStore();
  }
});
getListStaff();
</script>