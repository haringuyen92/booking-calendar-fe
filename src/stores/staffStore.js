import {defineStore} from "pinia";

export const useStaffStore = defineStore('staff', {
    state: () => ({
        _id: null,
        name: null,
        image: null,
        description: null,
        cost: 0,
        maxBookingSlot: 0,
        active: false,
        position: 1
    }),
    actions: {
        set(data){
            for(let key in data){
                this[key] = data[key];
            }
        },
        reset(){
            Object.assign(this, {
                _id: null,
                name: null,
                image: null,
                description: null,
                cost: 0,
                maxBookingSlot: 0,
                active: false,
                position: 1
            })
        }
    }
})