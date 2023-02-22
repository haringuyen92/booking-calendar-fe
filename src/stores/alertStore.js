import {defineStore} from "pinia";

export const useAlertStore = defineStore('alert',{
    state: () => ({
        alert: null
    }),
    actions: {
        success(message) {
            let self = this;
            this.alert = { message, type: 'alert-success' };
            setTimeout(() => {
                self.alert = null;
            }, 2000);
        },
        error(message) {
            let self = this;
            this.alert = { message, type: 'alert-danger' };
            setTimeout(() => {
                self.alert = null;
            }, 2000);
        },
        clear() {
            this.alert = null;
        }
    }
})