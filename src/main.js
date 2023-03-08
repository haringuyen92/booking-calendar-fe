import { createApp } from 'vue';
import App from './App.vue';
import store from "@/stores";
import {router} from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App);


app.use(store);
app.use(router);

app.mount('#app')
