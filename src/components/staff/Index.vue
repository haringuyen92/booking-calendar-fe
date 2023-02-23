<template>
  <div ref="el">
    <div>
      <button type="button" class="btn btn-primary" @click="openModalCreateStore">New Store</button>
      <BaseModal v-model="modal.status" v-if="modal.status" @onCloseModal="closeModal" :title="getTitle">
        <template v-slot:main>
          <div class="h__form_center">
            <div class="h__form_basic">
              <div class="h__form_group row">
                <label class="col-3" for="name">Name:</label>
                <div class="col-9">
                  <input type="text"
                         class="form-control h__form_control"
                         v-model.trim="formData.name"
                         ref="name">
                </div>
              </div>
              <div class="h__form_group row">
                <label class="col-3" for="email">Email:</label>
                <div class="col-9">
                  <input type="text"
                         class="form-control h__form_control"
                         v-model.trim="formData.email"
                         ref="email">
                </div>
              </div>
              <div class="h__form_group row">
                <label class="col-3" for="address">Address:</label>
                <div class="col-9">
                  <input type="text"
                         class="form-control h__form_control"
                         v-model.trim="formData.address"
                         ref="address">
                </div>
              </div>
              <div class="h__form_group row">
                <label class="col-3" for="image">Image:</label>
                <div class="col-9">
                  <input type="text"
                         class="form-control h__form_control"
                         v-model.trim="formData.image"
                         ref="image">
                </div>
              </div>
              <div class="h__form_group row">
                <label class="col-3" for="description">Description:</label>
                <div class="col-9">
                <textarea type="text"
                          class="form-control h__form_control"
                          v-model.trim="formData.description"
                          ref="description"></textarea>
                </div>
              </div>
              <div class="h__form_group row">
                <label class="col-3" for="website">Website:</label>
                <div class="col-9">
                  <input type="text"
                         class="form-control h__form_control"
                         v-model.trim="formData.website"
                         ref="website">
                </div>
              </div>
              <div class="h__form_group row">
                <label class="col-3" for="phone">Phone:</label>
                <div class="col-9">
                  <input type="text"
                         class="form-control h__form_control"
                         v-model.trim="formData.phone"
                         ref="phone">
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:action>
          <button class="button is-success" v-if="modal.event === EVENT_CREATE_CONSTANT"
                  @click="createStore">Create
          </button>
          <button class="button is-success" v-if="modal.event === EVENT_UPDATE_CONSTANT"
                  @click="updateStore">Update
          </button>
        </template>
      </BaseModal>
    </div>
    <Suspense>
      <BaseDataTable :columns="dataTable.columns" :rows="dataTable.rows" @onGetItem="getStore" @onDeleteItem="confirmDeleteStore"/>
    </Suspense>
  </div>
</template>
<script setup>
import BaseModal from "@/components/modal/BaseModal.vue";
import BaseDataTable from "@/components/table/BaseDataTable.vue";
import {reactive} from "vue";
import {EVENT_CREATE_CONSTANT} from "@/common/constant";

const dataTable = reactive({
  columns: ['name', 'description', 'address', 'phone'],
  rows: [],
});
const modal = reactive({
  status: false,
  event: EVENT_CREATE_CONSTANT
});
const formData = reactive({
  id: '',
  name: '',
  image: '',
  description: '',
  website: '',
  phone: '',
  email: '',
  address: '',
});
const showModal = () => modal.status = true;
const closeModal = () => modal.status = false;
const openModalCreateStore = () => {
  formData.id = '';
  formData.name = '';
  formData.image = '';
  formData.description = '';
  formData.website = '';
  formData.phone = '';
  formData.email = '';
  formData.address = '';
  modal.event = EVENT_CREATE_CONSTANT;
  showModal();
}
</script>