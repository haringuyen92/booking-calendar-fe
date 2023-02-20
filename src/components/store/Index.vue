

<!--<script >-->

<!--// import BaseDataTable from "@/components/table/BaseDataTable.vue";-->

<!--export default {-->
<!--  async setup(){-->

<!--    const test = ref();-->
<!--    // const dataTable = reactive({-->
<!--    //   columns: ['name', 'description'],-->
<!--    //   rows: [-->
<!--    //     { id: 1, name: 'John Doe', email: 'john@doe.com' },-->
<!--    //     { id: 2, name: 'Jane Doe', email: 'jane@doe.com' }-->
<!--    //   ],-->
<!--    // })-->
<!--    // const { data, success } = await StoreService.getAll();-->

<!--    // if(success){-->
<!--    //   dataTable.rows = [...data];-->
<!--    // }-->
<!--    // console.log(data);-->
<!--    // console.log(success);-->
<!--    onMounted(() => {-->
<!--      console.log(test.value);-->
<!--    })-->
<!--    return {-->

<!--    }-->
<!--  }-->
<!--}-->


<!--</script>-->

<template>
  <div ref="el">
    <div>
      <button type="button" class="btn btn-primary">New Store</button>
    </div>
        <BaseDataTable :columns="dataTable.columns" :rows="dataTable.rows" />
  </div>
</template>
<script setup>
  import {
    // ref,
    reactive,
    // onMounted
  } from 'vue';
  import StoreService from "@/services/storeService";
  import BaseDataTable from "@/components/table/BaseDataTable.vue";
  const dataTable = reactive({
    columns: ['name', 'description', 'address', 'phone'],
    rows: [],
  })
  StoreService.getAll().then(res => {
    dataTable.rows = [...res.data];
  }).catch(err => {
    console.log(err);
  })


</script>