import {defineStore} from "pinia";

export const useSelectedStore = defineStore('selected', {
    state: () => ({
        items: [],
    }),
    getters: {
        isCheckAll(){
            return this.items.filter(item => item.checked === true).length === this.items.length;
        },
        checkedList(){
            return this.items.filter(item => item.checked === true).map(item => item.id);
        }
    },
    actions: {
        init(list){
          this.items = [...list];
        },
        getItems(){
            return this.items;
        },
        toggleAll(checked) {
            this.items.forEach((item) => {
                item.checked = checked
            })
        },
    }
})