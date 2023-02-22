import axios from "axios";
import {useLoading} from 'vue-loading-overlay';
import {authHeader} from "@/helper/auth-header";

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
    const error = {};
    if(err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        error.data = err.response.data;
        error.message = err.response.data.error;
        error.status = err.response.status;
        error.headers = err.response.headers;
    }else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        error.request = err.request;
        error.message = err.code;
    }else {
        error.message = err.message;
    }
    return Promise.reject(error);
});

export default httpClient;