import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'


import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
createApp(App)
    .use(VueRouter)
    .mount('#app')
