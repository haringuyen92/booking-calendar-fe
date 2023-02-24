<template>
  <div>
    <form @submit.prevent="createStaff">
      <div class="h__form_left">
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
      <button class="button is-success" @click="createStaff">Create</button>
    </form>
  </div>
</template>
<script setup>
import {reactive} from "vue";

const createStaff = () => console.log(111);
const formData = reactive({

});
</script>