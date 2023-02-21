import axios from "axios";
import {useLoading} from 'vue-loading-overlay';

const $loading = useLoading();
let loader;
console.log("httpClient");
const httpClient = axios.create({
    baseURL: `http://localhost:3000/api`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer {accessToken}`
    }
});
httpClient.interceptors.request.use(function (config) {
    loader = $loading.show();
    return config;
}, function (error) {
    return Promise.reject(error);
});

httpClient.interceptors.response.use(function (response) {
    loader.hide();
    return response.data;
}, function (err) {
    loader.hide();
    return Promise.reject(err);
});

export default httpClient;