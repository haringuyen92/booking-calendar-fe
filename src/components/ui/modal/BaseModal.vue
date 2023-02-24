<template>
  <div class="modal is-active">
    <div class="h__md_background modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <span class="modal-card-title">{{ title }}</span>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <slot name="main"/>
      </section>
      <footer class="modal-card-foot justify-content-end">
        <button type="button" class="button is-danger" @click="closeModal">Cancel</button>
        <slot name="action" />
      </footer>
    </div>
  </div>
</template>

<script setup>
  import {defineProps, toRefs, defineEmits} from "vue";

  const props = defineProps({
    status: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Title'
    }
  })

  const emit = defineEmits(['onCloseModal']);
  const closeModal = () => emit('onCloseModal');

  const {title} = toRefs(props);
</script>