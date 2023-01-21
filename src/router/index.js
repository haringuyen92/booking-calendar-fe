import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import DashBoard from "@/components/dashboard/Index.vue";
import Login from "@/components/auth/Login.vue";
import Store from "@/components/store/Index.vue";
import Staff from "@/components/staff/Index.vue";
import SettingTime from "@/components/setting-time/Index.vue";
import Service from "@/components/service/Index.vue";
import Register from "@/components/auth/Register.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => DashBoard
            },
            {
                path: '/store',
                name: 'store',
                component: () => Store
            },
            {
                path: '/service',
                name: 'service',
                component: () => Service
            },
            {
                path: '/staff',
                name: 'staff',
                component: () => Staff
            },
            {
                path: '/setting-time',
                name: 'setting_time',
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
    }
]
export default createRouter({
    history: createWebHistory(),
    routes: routes
})