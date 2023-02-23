<template>
  <div class="modal is-active" v-if="confirmModalStore.display">
    <div class="h__md_background modal-background"></div>
    <div class="modal-dialog modal-confirm">
      <div class="modal-content">
        <div class="d-flex justify-content-end">
          <button class="delete" aria-label="close" @click="close"></button>
        </div>
        <div class="modal-header flex-column">
<!--          <div class="icon-box">-->
<!--            <span class="icon has-text-danger">-->
<!--              <i class="fa"></i>-->
<!--            </span>-->
<!--          </div>-->
          <h4 class="modal-title w-100">{{ confirmModalStore.title }}</h4>
        </div>
        <div class="modal-body">
          <p>{{ confirmModalStore.description }}</p>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-primary" @click="onConfirm">OK</button>
          <button type="button" class="btn btn-danger" @click="close">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConfirmModalStore } from "@/stores/confirmModalStore";

const confirmModalStore = useConfirmModalStore();
const onConfirm = () => confirmModalStore.confirm()
const close = () => confirmModalStore.hide()
</script>

<style scoped>
.modal-confirm {
  color: #636363;
  width: 400px;
}
.modal-confirm .modal-content {
  padding: 20px;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 14px;
}
.modal-confirm .modal-header {
  border-bottom: none;
  position: relative;
}
.modal-confirm h4 {
  text-align: center;
  font-size: 26px;
  margin: 30px 0 -10px;
}
.modal-confirm .close {
  position: absolute;
  top: -5px;
  right: -2px;
}
.modal-confirm .modal-body {
  color: #999;
}
.modal-confirm .modal-footer {
  border: none;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
  padding: 10px 15px 25px;
}
.modal-confirm .modal-footer a {
  color: #999;
}
.modal-confirm .icon-box {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 50%;
  z-index: 9;
  text-align: center;
  border: 3px solid #f15e5e;
}
.modal-confirm .icon-box i {
  color: #f15e5e;
  font-size: 46px;
  display: inline-block;
  margin-top: 13px;
}
.modal-confirm .btn, .modal-confirm .btn:active {
  color: #fff;
  background: #60c7c1;
  text-decoration: none;
  transition: all 0.4s;
  line-height: normal;
  min-width: 120px;
  border: none;
  min-height: 40px;
  border-radius: 3px;
  margin: 0 5px;
}
.modal-confirm .btn-secondary {
  background: #c1c1c1;
}
.modal-confirm .btn-secondary:hover, .modal-confirm .btn-secondary:focus {
  background: #a8a8a8;
}
.modal-confirm .btn-danger {
  background: #f15e5e;
}
.modal-confirm .btn-danger:hover, .modal-confirm .btn-danger:focus {
  background: #ee3535;
}
.trigger-btn {
  display: inline-block;
  margin: 100px auto;
}
</style>