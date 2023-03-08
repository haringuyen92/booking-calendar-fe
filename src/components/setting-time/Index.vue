<template>
  <div>
    setting time
  </div>
</template>
<script setup>

import {reactive} from "vue";
import {getDefaultPeriod} from "@/helper/setting-time";

const dailySetting = reactive({
    allDay: false,
    dayOff: false,
    period: [
        {...getDefaultPeriod()}
    ]
})
console.log(dailySetting);
</script>