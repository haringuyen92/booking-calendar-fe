import { createRouter, createWebHistory } from "vue-router";
import PageNotFound from "@/components/PageNotFound";
import Home from "@/components/Home.vue";
import DashBoard from "@/components/dashboard/Index.vue";
import Login from "@/components/auth/Login.vue";
import Store from "@/components/store/Index.vue";
import Staff from "@/components/staff/Index.vue";
import SettingTime from "@/components/setting-time/Index.vue";
import Service from "@/components/service/Index.vue";
import Register from "@/components/auth/Register.vue";
import { useAlertStore } from "@/stores/alertStore";
import { useAuthStore } from "@/stores/authStore";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => Home,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => DashBoard
            },
            {
                path: '/store',
                name: 'Store',
                component: () => Store
            },
            {
                path: '/service',
                name: 'Service',
                component: () => Service
            },
            {
                path: '/staff',
                name: 'Staff',
                component: () => Staff
            },
            {
                path: '/setting-time',
                name: 'SettingTime',
                component: () => SettingTime
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => Login
    },
    {
        path: '/register',
        name: 'Register',
        component: () => Register
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: () => PageNotFound
    }
]
console.log("router")
export const router = createRouter({
    history: createWebHistory(),
    // linkActiveClass: 'active',
    routes: routes
})
router.beforeEach((to, from, next) => {
    const alertStore = useAlertStore();
    alertStore.clear();
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);

    const authStore = useAuthStore();
    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return next('/login');
    }
    next();
})