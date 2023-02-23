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
          <button class="button is-success" v-if="modal.event === 'create'"
                  @click="createStore">Create</button>
          <button class="button is-success" v-if="modal.event === 'update'"
                  @click="updateStore">Update</button>
        </template>
      </BaseModal>
    </div>
    <Suspense>
      <BaseDataTable :columns="dataTable.columns" :rows="dataTable.rows" @onGetItem="getStore" @onDeleteItem="confirmDeleteStore" />
    </Suspense>
  </div>
</template>
<script setup>
import {computed, reactive, toRefs, watch} from 'vue';
  import StoreService from "@/services/storeService";
  import BaseDataTable from "@/components/table/BaseDataTable.vue";
  import BaseModal from "@/components/modal/BaseModal.vue";
  import {useAuthStore} from "@/stores/authStore";
  import {useAlertStore} from "@/stores/alertStore";
  import {useConfirmModalStore} from "@/stores/confirmModalStore";
  import { STORE_CONSTANT } from '@/common/constant';

  const confirmModalStore = useConfirmModalStore();
  const alertStore = useAlertStore();
  const dataTable = reactive({
    columns: ['name', 'description', 'address', 'phone'],
    rows: [],
  });
  const modal = reactive({
    status: false,
    event: 'create'
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

  const { user } = useAuthStore();
  const { id } = user;
  const getListStore = async () => {
    const res = await StoreService.getAll(id);
    if(res?.success){
      dataTable.rows = [...res.data];
    }
  }
  const showModal = () => modal.status = true;
  const closeModal = () => modal.status = false;

  const { isConfirm, component } = toRefs(confirmModalStore);
  const openModalCreateStore = () => {
    formData.id = '';
    formData.name = '';
    formData.image = '';
    formData.description = '';
    formData.website = '';
    formData.phone = '';
    formData.email = '';
    formData.address = '';
    modal.event = 'create';
    showModal();
  }
  const getTitle = computed(() => modal.event === 'create' ? 'Create Store' : 'Update Store');
  const getStore = async (storeId) => {
    const res = await StoreService.get(id, storeId);
    if(typeof res === 'string'){
      alertStore.error(res);
    }else{
      const { data } = res;
      formData.id = data.id;
      formData.name = data.name;
      formData.image = data.image;
      formData.description = data.description;
      formData.website = data.website;
      formData.phone = data.phone;
      formData.email = data.email;
      formData.address = data.address;
      modal.event = 'update';
      showModal();
    }
  }
  const createStore = async () => {
    const res = await StoreService.create(id, {...formData});
    if(typeof res === 'string'){
      // handler error
      alertStore.error(res);
    }else {
      alertStore.success(res.message);
      closeModal();
      await getListStore();
    }
  }
  const updateStore = async () => {
    const res = await StoreService.update(id, formData.id, formData);
    if(typeof res === 'string'){
      // handler error
      alertStore.error(res);
    }else {
      alertStore.success(res.message);
      closeModal();
      await getListStore();
    }
  }
  const confirmDeleteStore = id => {
    confirmModalStore.show();
    confirmModalStore.setId(id);
    confirmModalStore.setComponentConfirm(STORE_CONSTANT);
  }
  const deleteStore = async () => {
    const res = await StoreService.delete(id, confirmModalStore.id);
    if(typeof res === 'string'){
      // handler error
      alertStore.error(res);
    }else {
      alertStore.success(res.message);
      confirmModalStore.hide();
      await getListStore();
    }
  }
  watch(isConfirm, () => {
    if(component.value === STORE_CONSTANT){
      deleteStore();
    }
  });
  getListStore();
</script>