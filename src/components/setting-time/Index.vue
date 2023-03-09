<template>
    <div>
        <ToggleButton :checked="configs.isActive" :label="getLabel" @onToggle="setActive"></ToggleButton>
    </div>
    <ul class="d-flex type_setting">
        <li class="mr-5 d-flex align-items-center">
            <input id="cancelDailySetting" type="radio" name="isApplyDailySetting" v-model="configs.isApplyDailySetting" :value="false">
            <label class="ml-1" for="cancelDailySetting">DailySetting</label>
        </li>
        <li class="d-flex align-items-center">
            <input id="applyDailySetting" type="radio" name="isApplyDailySetting" v-model="configs.isApplyDailySetting" :value="true">
            <label class="ml-1" for="applyDailySetting">CustomSetting</label>
        </li>
    </ul>
    <div class="setting_time">
        <div class="d-flex align-items-center">
            <div class="setting_time-left">
                <label for="">dailySetting</label>
            </div>
            <div class="setting_time-right">
                <div class="d-flex align-items-center">
                    <div>
                        <div>
                            <VueTimepicker input-class="display-time"></VueTimepicker>
                            <span class="ml-1 mr-1">
                                <b>~</b>
                            </span>
                            <VueTimepicker></VueTimepicker>
                        </div>
                    </div>
                    <div class="d-flex align-items-center ml-5">
                        <input type="checkbox">
                        <label for="" class="ml-2">isAllDay</label>
                    </div>
                    <div class="ml-5">
                        <button class="btn btn-light">
                            <span class="text-danger">add</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import {computed, reactive} from "vue";
import {defaultSlotTime} from "@/helper/setting-time";
import ToggleButton from "@/components/ui/Button/ToggleButton.vue";
import VueTimepicker from 'vue3-timepicker/src/VueTimepicker.vue'

const getLabel = computed(() => configs.isActive ? 'ON' : 'OFF')
const configs = reactive({
    isActive: false,
    isApplyDailySetting: false,
    settingTime: {
        dailySetting: {label:'dailySetting',...defaultSlotTime()},
        mondaySetting: defaultSlotTime(),
        tuesdaySetting: defaultSlotTime(),
        wednesdaySetting: defaultSlotTime(),
        thursdaySetting: defaultSlotTime(),
        fridaySetting: defaultSlotTime(),
        saturdaySetting: defaultSlotTime(),
        holidaySetting: defaultSlotTime(),
    }

})

const setActive = () => configs.isActive = !configs.isActive;
for(let x in configs){
    console.log(configs[x]);
}
</script>
<style scoped>
.type_setting{
    display: flex;
    padding-left: 15px;
    padding-top: 15px;
}
.setting_time{
    padding: 15px;
}
.setting_time-left{
    flex-basis: 15%;
}
.setting_time-right{
    flex-basis: 85%;
}

</style>