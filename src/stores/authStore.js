import { defineStore } from 'pinia';
console.log("useAuthStore");
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {}
    }),
    getters: {
        isAdmin: (token) => token,
    },
    actions: {
        setUser(user) {
            this.user = user;
            if(typeof user === 'string'){
                localStorage.setItem('user', user);
            }else{
                localStorage.setItem('user', JSON.stringify(user));
            }
        },
    },
})
