import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/components/auth/Login.vue";
import Store from "@/components/store/Index.vue";
import Staff from "@/components/staff/Index.vue";
import SettingTime from "@/components/setting-time/Index.vue";
import Service from "@/components/service/Index.vue";
import Register from "@/components/auth/Register.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/dashboard',
            component: () => Home
        },
        {
            path: '/store',
            component: () => Store
        },
        {
            path: '/service',
            component: () => Service
        },
        {
            path: '/staff',
            component: () => Staff
        },
        {
            path: '/setting-time',
            component: () => SettingTime
        },
        {
            path: '/login',
            component: () => Login
        },
        {
            path: '/register',
            component: () => Register
        }
    ]
})