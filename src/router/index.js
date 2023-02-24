import { createRouter, createWebHistory } from "vue-router";
import PageNotFound from "@/components/PageNotFound";
import Home from "@/components/Home.vue";
import DashBoard from "@/components/dashboard/Index.vue";
import Login from "@/components/auth/Login.vue";
import Store from "@/components/store/Index.vue";
import Staff from "@/components/staff/Index.vue";
import ListStaff from "@/components/staff/List.vue";
import CreateStaff from "@/components/staff/Create.vue";
import SettingTime from "@/components/setting-time/Index.vue";
import Service from "@/components/service/Index.vue";
import Register from "@/components/auth/Register.vue";
import { useAlertStore } from "@/stores/alertStore";
import { useAuthStore } from "@/stores/authStore";
import ListStore from "@/components/store/List.vue";
import Setting from "@/components/store/Setting.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => Home,
        children: [
            {
                path: 'stores',
                name: 'store',
                component: () => Store,
                children: [
                    {
                        path: 'setting',
                        name: 'store.setting',
                        component: () => Setting,
                        children: [
                            {
                                path: ':storeId/services',
                                name: 'store.service',
                                component: () => Service
                            },
                            {
                                path: ':storeId/staffs',
                                component: () => Staff,
                                children: [
                                    {
                                        path: 'create',
                                        name: 'store.staff.create',
                                        component: () => CreateStaff
                                    },
                                    {
                                        path: '',
                                        name: 'store.staff',
                                        component: () => ListStaff
                                    }
                                ]
                            },
                            {
                                path: ':storeId/setting-times',
                                name: 'store.settingTime',
                                component: () => SettingTime
                            },
                        ]
                    },
                    {
                        path: '',
                        component: () => ListStore
                    },
                ]
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => DashBoard
            },
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
export const router = createRouter({
    history: createWebHistory(),
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