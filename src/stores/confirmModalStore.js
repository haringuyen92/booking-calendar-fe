import {defineStore} from "pinia";

export const useConfirmModalStore = defineStore('confirmModal', {
    state: () => ({
        id: null,
        display: null,
        title: 'Are you sure?',
        description: 'Will delete all data of Item',
        isConfirm: false,
        component: null
    }),
    actions: {
        setId(id){
            this.id = id;
        },
        show(){
            this.display = true;
        },
        hide(){
            this.setId(null);
            this.isConfirm = false
            this.display = null;
            this.component = null;
        },
        confirm(){
            this.isConfirm = true;
        },
        setComponentConfirm(component){
            this.component = component;
        }
    }
})