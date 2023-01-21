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
export default createRouter({
    history: createWebHistory(),
    routes: routes
})