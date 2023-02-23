<template>
  <table class="table table-responsive table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th v-for="column in columns" :key="column">{{ column }}</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, num) in rows" :key="row.id" @click="getItem(row.id)">
        <td>{{ num+1 }}</td>
        <td v-for="(column, c_key) in columns" :key="c_key">
          {{ row[column] }}
        </td>
        <td>
          <button class="btn btn-danger" type="button" @click="deleteItem(row.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import {defineProps, defineEmits, toRefs} from "vue";

  const emit = defineEmits(['onGetItem', 'onDeleteItem'])
  const props = defineProps({
    columns: {
      type: Array,
      default: () => [{}]
    },
    rows: {
      type: Array,
      default: () => [{}]
    }
  });
  const { columns, rows } = toRefs(props);

  const getItem = id => {
    if(event.target.tagName !== 'BUTTON'){
      emit('onGetItem', id);
    }
  }
  const deleteItem = id => {
    emit('onDeleteItem', id);
  }
</script>
<style scoped>
td{
  vertical-align: middle;
}
</style>