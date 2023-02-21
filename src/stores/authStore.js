import { defineStore } from 'pinia';
console.log("useAuthStore");
export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null
    }),
    getters: {
        isAdmin: (token) => token,
    },
    actions: {
        setAccessToken(accessToken) {
            this.accessToken = accessToken;
            localStorage.setItem('accessToken', accessToken);
        },
    },
})
