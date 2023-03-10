<template>
    <div class="d-flex align-items-center p-2" :class="[bindingClass]">
        <div class="setting_time-left">
            <label for="">{{ setting.label }}</label>
        </div>
        <div class="setting_time-right">
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex flex-column gap-2 mr-5" v-if="!setting.isAllDay">
                    <div class="d-flex gap-2 align-items-center" v-for="(item, i) in setting.data" :key="item">
                        <VueTimepicker input-class="display-time" v-model="item.from"></VueTimepicker>
                        <b>~</b>
                        <VueTimepicker input-class="display-time" v-model="item.to"></VueTimepicker>
                        <button class="delete" v-if="setting.data.length > 1"
                                @click="removeSlotTime(setting.data, i)"></button>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center mr-5">
                        <input type="checkbox" v-model="setting.isAllDay">
                        <label for="" class="ml-2">isAllDay</label>
                    </div>
                    <div v-if="!setting.isAllDay">
                        <button class="btn btn-light" @click="pushSlotTime(setting)">
                            <span class="text-danger">add</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VueTimepicker from 'vue3-timepicker/src/VueTimepicker.vue'
import {toRefs, defineProps, defineEmits, computed} from "vue";

const emit = defineEmits(['onPushSlotTime', 'onRemoveSlotTime']);
const props = defineProps({
    slotTime: {
        type: String,
        default: 'dailySetting'
    },
    setting: {
        type: Object,
        required: true
    }
})
const {setting, slotTime} = toRefs(props);
const bindingClass = computed(() => ['dailySetting', 'mondaySetting'].includes(slotTime.value) ? '' : 'border-top');

const pushSlotTime = setting => emit('onPushSlotTime', setting);
const removeSlotTime = (slot, i) => emit('onRemoveSlotTime', slot, i);
</script>

<style scoped>
.setting_time-left {
    flex-basis: 25%;
}

.setting_time-right {
    flex-basis: 75%;
}
</style>