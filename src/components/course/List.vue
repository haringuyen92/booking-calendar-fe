<template>
  <div>
    <div>
      <RouterLink :to="{name:'store.staff.create'}" type="button" class="btn btn-primary">New Store</RouterLink>
    </div>
    <Suspense>
      <BaseDataTable :columns="dataTable.columns" :rows="dataTable.rows" @onGetItem="getCourse"
                     @onDeleteItem="confirmDeleteCourse"/>
    </Suspense>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {COURSE_CONSTANT} from "@/common/constant";
import {useConfirmModalStore} from "@/stores/confirmModalStore";
import BaseDataTable from "@/components/ui/table/BaseDataTable.vue";
import CourseService from "@/services/courseService";
import {useRoute} from "vue-router";

const {storeId} = useRoute().params;
const confirmModalStore = useConfirmModalStore();
const dataTable = reactive({
  columns: ['name', 'image', 'description', 'cost', 'estimationTime'],
  rows: [],
});

const getListCourse = async () => {
  const res = CourseService.getAll(storeId);
  if (res?.success) {
    dataTable.rows = [...res.data];
  }
}
const getCourse = () => {
  console.log("getCourse")
}
const confirmDeleteCourse = id => {
  confirmModalStore.show();
  confirmModalStore.setId(id);
  confirmModalStore.setComponentConfirm(COURSE_CONSTANT);
}
getListCourse();
</script>

<style scoped>

</style>