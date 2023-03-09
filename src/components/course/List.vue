<template>
    <div>
        <div>
            <div class="h__form_group row">
                <label class="col-2" for="name">isRequiredCourse:</label>
                <div class="col-9">
                    <div class="d-flex flex-row gap-5">
                        <div class="d-flex align-content-center">
                            <input type="radio" v-model="settingSlot.isRequiredCourse" name="isRequiredCourse"
                                   :value="USED" @change="postSettingSlot">
                            <label class="ml-1 text-danger">used</label>
                        </div>
                        <div class="d-flex align-content-center">
                            <input type="radio" v-model="settingSlot.isRequiredCourse" name="isRequiredCourse"
                                   :value="OPTION" @change="postSettingSlot">
                            <label class="ml-1 text-primary">option</label>
                        </div>
                        <div class="d-flex align-content-center">
                            <input type="radio" v-model="settingSlot.isRequiredCourse" name="isRequiredCourse"
                                   :value="NOT_USED" @change="postSettingSlot">
                            <label class="ml-1">not used</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h__form_group row">
                <label class="col-2" for="name">isUseCostCourse:</label>
                <div class="col-9">
                    <div class="d-flex flex-row gap-5">
                        <div class="d-flex align-content-center">
                            <input type="radio" v-model="settingSlot.isUseCostCourse" name="isUseCostCourse"
                                   :value="USED"
                                   @change="postSettingSlot">
                            <label class="ml-1 text-primary">used</label>
                        </div>
                        <div class="d-flex align-content-center">
                            <input type="radio" v-model="settingSlot.isUseCostCourse" name="isUseCostCourse"
                                   :value="NOT_USED" @change="postSettingSlot">
                            <label class="ml-1">not used</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
import {COURSE_CONSTANT, NOT_USED, OPTION, USED} from "@/common/constant";
import {useConfirmModalStore} from "@/stores/confirmModalStore";
import BaseDataTable from "@/components/ui/table/BaseDataTable.vue";
import CourseService from "@/services/courseService";
import {useRoute} from "vue-router";
import {useAlertStore} from "@/stores/alertStore";
import {router} from "@/router";
import SettingSlotService from "@/services/settingSlotService";

const confirmModalStore = useConfirmModalStore();
const alertStore = useAlertStore();
const {storeId} = useRoute().params;
const {isConfirm, component} = toRefs(confirmModalStore);

const dataTable = reactive({
    columns: ['name', 'image', 'description', 'cost', 'estimationTime'],
    rows: [],
});
const settingSlot = reactive({
    isRequiredCourse: OPTION,
    isUseCostCourse: USED
})

const initData = async () => {
    const resSetting = await SettingSlotService.get(storeId);
    const resList = await CourseService.getAll(storeId);
    if(resSetting?.success){
        settingSlot.isRequiredCourse = resSetting.data.isRequiredCourse || settingSlot.isRequiredCourse;
        settingSlot.isUseCostCourse = resSetting.data.isUseCostCourse || settingSlot.isUseCostCourse;
    }
    if (resList?.success) {
        dataTable.rows = [...resList.data];
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
        await initData();
    }
}
watch(isConfirm, () => {
    if (component.value === COURSE_CONSTANT) {
        deleteCourse();
    }
});

const postSettingSlot = async () => {
    const res = await SettingSlotService.update(storeId, {...settingSlot});
    if (typeof res === 'string') {
        // handler error
        alertStore.error(res);
    } else {
        alertStore.success(res.message);
        confirmModalStore.hide();
    }
}

initData();
</script>

<style scoped>

</style>