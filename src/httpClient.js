import axios from "axios";
import {useLoading} from 'vue-loading-overlay';
import {authHeader} from "@/helpers/auth-header";

const $loading = useLoading();
let loader;
const httpClient = axios.create({
    baseURL: `http://localhost:3000/api`,
    withCredentials: true,
    headers: {
        ...authHeader()
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