<template>
  <div>
    <div>
      <RouterLink :to="{name:'store.course.create'}" type="button" class="btn btn-primary">New Course</RouterLink>
    </div>
    <Suspense>
      <BaseDataTable :columns="dataTable.columns" :rows="dataTable.rows" @onGetItem="getCourse"
                     @onDeleteItem="confirmDeleteCourse"/>
    </Suspense>
  </div>
</template>

<script setup>
import {reactive, toRefs, watch} from "vue";
import {COURSE_CONSTANT} from "@/common/constant";
import {useConfirmModalStore} from "@/stores/confirmModalStore";
import BaseDataTable from "@/components/ui/table/BaseDataTable.vue";
import CourseService from "@/services/courseService";
import {useRoute} from "vue-router";
import {useAlertStore} from "@/stores/alertStore";
import {router} from "@/router";

const confirmModalStore = useConfirmModalStore();
const alertStore = useAlertStore();
const {storeId} = useRoute().params;
const {isConfirm, component} = toRefs(confirmModalStore);

const dataTable = reactive({
  columns: ['name', 'image', 'description', 'cost', 'estimationTime'],
  rows: [],
});

const getListCourse = async () => {
  const res = await CourseService.getAll(storeId);
  if (res?.success) {
    dataTable.rows = [...res.data];
  }
}
const getCourse = id => {
  router.push({
    name: 'store.course.update',
    params: {
      courseId: id
    }
  })
}
const confirmDeleteCourse = id => {
  confirmModalStore.show();
  confirmModalStore.setId(id);
  confirmModalStore.setComponentConfirm(COURSE_CONSTANT);
}
const deleteCourse = async () => {
  const id = confirmModalStore.id;
  const res = await CourseService.delete(storeId, id);

  if (typeof res === 'string') {
    // handler error
    alertStore.error(res);
  } else {
    alertStore.success(res.message);
    confirmModalStore.hide();
    await getListCourse();
  }
}
watch(isConfirm, () => {
  if (component.value === COURSE_CONSTANT) {
    deleteCourse();
  }
});

getListCourse();
</script>

<style scoped>

</style>