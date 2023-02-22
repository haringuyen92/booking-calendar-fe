<template>
  <table class="table table-responsive table-hover">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id" @click="getItem(row.id)">
        <td v-for="(column, c_key) in columns" :key="c_key">
          {{ row[column] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import {defineProps, defineEmits, toRefs} from "vue";

  const emit = defineEmits(['onGetItem'])
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

  const getItem = id => emit('onGetItem', id);
</script>