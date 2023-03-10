<template>
    <div>
        <ToggleButton :checked="configs.isActive" :label="getLabel" @onToggle="setActive"></ToggleButton>
    </div>
    <ul class="d-flex type_setting">
        <li class="mr-5 d-flex align-items-center">
            <input id="cancelDailySetting" type="radio" name="isApplyDailySetting" v-model="configs.isApplyDailySetting"
                   :value="false">
            <label class="ml-1" for="cancelDailySetting">DailySetting</label>
        </li>
        <li class="d-flex align-items-center">
            <input id="applyDailySetting" type="radio" name="isApplyDailySetting" v-model="configs.isApplyDailySetting"
                   :value="true">
            <label class="ml-1" for="applyDailySetting">CustomSetting</label>
        </li>
    </ul>
    <div class="setting_time" v-if="!configs.isApplyDailySetting">
        <SlotTime :setting="configs.dailySetting" @onPushSlotTime="pushSlotTime"
                  @onRemoveSlotTime="removeSlotTime"></SlotTime>
    </div>
    <div class="setting_time" v-else>
        <SlotTime v-for="(setting, i) in configs.settingTime" :key="setting" :setting="setting" :slotTime="i"
                  @onRemoveSlotTime="removeSlotTime"
                  @onPushSlotTime="pushSlotTime"></SlotTime>
    </div>
    <button class="button is-success" @click="onSettingTime">SAVE</button>
</template>
<script setup>

import {computed, reactive} from "vue";
import {defaultSlotTime} from "@/helper/setting-time";
import ToggleButton from "@/components/ui/Button/ToggleButton.vue";
import SlotTime from "@/components/setting-time/SlotTime.vue";
import {useAlertStore} from "@/stores/alertStore";
import SettingTimeService from "@/services/settingTimeService";
import {useRoute} from "vue-router";

const alertStore = useAlertStore();
const {storeId} = useRoute().params;

const getLabel = computed(() => configs.isActive ? 'ON' : 'OFF')
const configs = reactive({
    isActive: false,
    isApplyDailySetting: false,
    dailySetting: {label: 'dailySetting', ...defaultSlotTime()},
    settingTime: {
        mondaySetting: {label: 'mondaySetting', ...defaultSlotTime()},
        tuesdaySetting: {label: 'tuesdaySetting', ...defaultSlotTime()},
        wednesdaySetting: {label: 'wednesdaySetting', ...defaultSlotTime()},
        thursdaySetting: {label: 'thursdaySetting', ...defaultSlotTime()},
        fridaySetting: {label: 'fridaySetting', ...defaultSlotTime()},
        saturdaySetting: {label: 'saturdaySetting', ...defaultSlotTime()},
        holidaySetting: {label: 'holidaySetting', ...defaultSlotTime()},
    }
})

const setActive = async () => {
    configs.isActive = !configs.isActive
    const res = await SettingTimeService.update(storeId, {isOpen: configs.isActive})
    if(typeof res === 'string'){
        alertStore.error(res.message);
    }else{
        alertStore.success(res.message);
    }
};
const pushSlotTime = slot => {
    const getLastSlotTime = () => slot.data[slot.data.length - 1];
    if (slot.data.length < 3) {
        slot.data.push({...getLastSlotTime()});
    } else {
        alertStore.error(`${slot.label} is max 3 slot time`)
    }
}
const removeSlotTime = (slot, i) => {
    slot.splice(i, 1);
}
const onSettingTime = async () => {
    if(configs.isApplyDailySetting){

    }else{

    }
}
const initData = async () => {
    const res = await SettingTimeService.get(storeId);
    const {success, data} = res;
    if(success){
        configs.isActive = data.isOpen;
    }
}
initData();
</script>
<style scoped>
.type_setting {
    display: flex;
    padding-left: 15px;
    padding-top: 15px;
}

.setting_time {
    padding: 15px;
    max-width: 695px;
}

</style>