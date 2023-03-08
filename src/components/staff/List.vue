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
                            <input type="checkbox" v-model="selectAll" @change="selectedStore.toggleAll(selectAll)">
                        </div>
                        <div class="h__form_group d-flex flex-row" v-for="item in modal.items" :key="item.id">
                            <label class="col-4 has-text-right mr-2">{{ item.name }}:</label>
                            <input type="checkbox" :id="item.id" v-model="item.checked">
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:action>
                <button class="button is-success" @click="onSubmitSettingStaff">Update</button>
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
import {computed, reactive, toRefs, watch} from "vue";
import StaffService from "@/services/staffService";
import {useRoute} from "vue-router";
import {router} from "@/router";
import {EVENT_UPDATE_CONSTANT, STAFF_CONSTANT} from "@/common/constant";
import {useConfirmModalStore} from "@/stores/confirmModalStore";
import {useAlertStore} from "@/stores/alertStore";
import {useSelectedStore} from "@/stores/selectedStore";
import BaseModal from "@/components/ui/modal/BaseModal.vue";
import CourseService from "@/services/courseService";

const selectedStore = useSelectedStore()
const confirmModalStore = useConfirmModalStore();
const alertStore = useAlertStore();
const {storeId} = useRoute().params;
const {isConfirm, component} = toRefs(confirmModalStore);

const dataTable = reactive({
    columns: ['name', 'image', 'description', 'cost', 'maxBookingSlot'],
    rows: [],
});
const modal = reactive({
    id: null,
    status: false,
    event: EVENT_UPDATE_CONSTANT,
    items: [],
    isAllCourse: true,
    courses: []
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
// eslint-disable-next-line no-unused-vars
const settingStaff = async id => {
    const getListCourse = await CourseService.getAll(storeId);
    const getStaff = await StaffService.get(storeId, id);
    const {isAllCourse, courses} = {...getStaff.data};
    const listCourse = [...getListCourse.data]
    selectedStore.init(listCourse.map(item => {
        let checked = true;
        if (!isAllCourse) checked = courses.some(c => c._id === item._id);
        return {id: item._id, name: item.name, checked}
    }));
    modal.items = selectedStore.getItems();
    modal.id = id;
    showModal();
}
const onSubmitSettingStaff = async () => {
    const res = await StaffService.update(storeId, modal.id, {
        isAllCourse: selectedStore.isCheckAll,
        courses: selectedStore.checkedList
    });
    if (typeof res === 'string') {
        // handler error
        alertStore.error(res);
    } else {
        alertStore.success(res.message);
        closeModal();
    }
}
const selectAll = computed({
    get() {
        return modal.items.every((item) => item.checked)
    },
    set(checked) {
        selectedStore.toggleAll(checked)
    },
})

watch(isConfirm, () => {
    if (component.value === STAFF_CONSTANT) {
        deleteStore();
    }
});
getListStaff();
</script>