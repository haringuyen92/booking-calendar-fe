import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
// Import component
import { LoadingPlugin } from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App);

app.use(router);
app.use(LoadingPlugin, {
    color: 'black',
    backgroundColor: '#787878'
}, {});

app.mount('#app')
