<template>
  <div>
    <div class="h__form_left">
            <div class="h__form_basic">
              <div class="h__form_group row">
                <label class="col-3" for="name">Name:</label>
                <div class="col-9">
                  <input type="text"
                         class="form-control h__form_control d-inline-block"
                         v-model.trim="staffStore.name"
                         :maxlength="MAX_LENGTH_NAME">
                  <span class="hf__count_i">{{ getLength(staffStore.name) }}/30</span>
                </div>
              </div>
              <div class="h__form_group row">
                <label class="col-3" for="email">Image:</label>
                <div class="col-9">
                  <input type="text" class="form-control h__form_control" v-model.trim="staffStore.image">
                </div>
              </div>
              <div class="h__form_group row">
                <label class="col-3" for="description">Description:</label>
                <div class="col-9">
                  <textarea type="text"
                            class="form-control h__form_control d-inline-block"
                            v-model.trim="staffStore.description"
                            :maxlength="MAX_LENGTH_DESCRIPTION"></textarea>
                  <span class="hf__count_i">{{ getLength(staffStore.description) }}/1500</span>
                </div>
              </div>
              <div class="h__form_group row">
                <label class="col-3" for="image">Cost:</label>
                <div class="col-9">
                  <input type="text" class="form-control h__form_control" v-model.trim="staffStore.cost">
                </div>
              </div>

              <div class="h__form_group row">
                <label class="col-3" for="website">maxBooking:</label>
                <div class="col-9">
                  <input type="text" class="form-control h__form_control" v-model.trim="staffStore.maxBookingSlot">
                </div>
              </div>
            </div>
      </div>
    <button class="button is-success" type="button" @click="storeStaff">{{ getTitle() }}</button>
  </div>
</template>
<script setup>
import {useStaffStore} from "@/stores/staffStore";
import {useRoute} from "vue-router";
import StaffService from "@/services/staffService";
import {useAlertStore} from "@/stores/alertStore";
const alertStore = useAlertStore();
const { storeId,staffId } = useRoute().params;
import { router } from "@/router";
import {EVENT_CREATE_CONSTANT, EVENT_UPDATE_CONSTANT, MAX_LENGTH_DESCRIPTION, MAX_LENGTH_NAME} from "@/common/constant";

const staffStore = useStaffStore();
staffStore.reset();

const getLength = value => value ? value.length : 0;
const getTitle = () => staffId ? EVENT_UPDATE_CONSTANT : EVENT_CREATE_CONSTANT;

const getStaff = async (id) => {
  const res = await StaffService.get(storeId, id);
  if (typeof res === 'string') {
    alertStore.error(res);
  } else {
    const {data} = res;
    staffStore.set(data);
  }
}
const createStaff = async () => {
  const res = await StaffService.create(storeId, {
    name: staffStore.name,
    image: staffStore.image,
    description: staffStore.description,
    cost: staffStore.cost,
    maxBookingSlot: staffStore.maxBookingSlot
  });
  if (typeof res === 'string') {
    alertStore.error(res);
  } else {
    await router.push({
      name: 'store.staff'
    });
    alertStore.success(res.message);
  }
}
const updateStaff = async () => {
  const res = await StaffService.update(storeId, staffId, {
    name: staffStore.name,
    image: staffStore.image,
    description: staffStore.description,
    cost: staffStore.cost,
    maxBookingSlot: staffStore.maxBookingSlot
  });
  if (typeof res === 'string') {
    alertStore.error(res);
  } else {
    await router.push({
      name: 'store.staff'
    });
    alertStore.success(res.message);
  }
};
const storeStaff = () => {
  if(staffId){
    updateStaff();
  }else{
    createStaff();
  }
}
if(staffId){
  getStaff(staffId)
}
</script>
<style>
  .hf__count_i-l{
    right: 20px !important;
  }
</style>