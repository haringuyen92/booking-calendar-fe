<template>
  <table class="table table-responsive table-hover">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td v-for="column in columns" :key="column">
          {{ row[column] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import {defineProps, toRefs} from "vue";

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
</script>