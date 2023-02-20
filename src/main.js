import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import { LoadingPlugin } from 'vue-loading-overlay';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App);

app.use(router);
app.use(LoadingPlugin, {
    color: 'black',
    backgroundColor: '#787878'
}, {});

app.mount('#app')
