import {defineStore} from 'pinia';
import AuthService from "@/services/authService";
import {useAlertStore} from "@/stores/alertStore";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: '/dashboard'
    }),
    getters: {
        getUserLogin: () => {
        },
    },
    actions: {
        setUser(user) {
            this.user = user;
            if (typeof user === 'string') {
                localStorage.setItem('user', user);
            } else {
                localStorage.setItem('user', JSON.stringify(user));
            }
        },
        async login(username, password) {
            try {
                const res = await AuthService.login(username, password);
                if (res?.success) {
                    const user = res.user;
                    this.user = user;
                    localStorage.setItem('user', JSON.stringify(user));
                }
                return res;
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async logout() {
            this.user = null;
            localStorage.removeItem('user');
        }
    },
})
