import axios from "axios";
import {useLoading} from 'vue-loading-overlay'

const $loading = useLoading();
let loader;
let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTlkNTMzZTRkZjlhMjgzNDg4N2JhOCIsImlhdCI6MTY3Njg4ODA4OSwiZXhwIjoxNjc5NDgwMDg5fQ.CUmC6O1aXz8APvDAqgC1ekOl8BklABVvBfnPMhFaRiM`;
const httpClient = axios.create({
    baseURL: `http://localhost:3000/api`,
    headers: {
        Authorization: `Bearer ${token}`
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
    // const error = {};
    // if(err.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     error.data = err.response.data;
    //     error.status = err.response.status;
    //     error.headers = err.response.headers;
    // }else if (err.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     error.request = err.request;
    // }else {
    //     error.message = err.message;
    // }
    return Promise.reject(err);
});

export default httpClient;