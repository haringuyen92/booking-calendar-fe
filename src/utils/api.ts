import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL", API_URL)

// Tạo một instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor để xử lý lỗi
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Xử lý lỗi ở đây (ví dụ: refresh token, logout nếu 401, etc.)
        return Promise.reject(error);
    }
);

export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

// Function chung để gọi API
export const apiCall = async <T>(
    method: 'get' | 'post' | 'put' | 'delete',
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
    try {
        let response: AxiosResponse<ApiResponse<T>>;

        switch (method) {
            case 'get':
                response = await axiosInstance.get<ApiResponse<T>>(endpoint, config);
                break;
            case 'post':
                response = await axiosInstance.post<ApiResponse<T>>(endpoint, data, config);
                break;
            case 'put':
                response = await axiosInstance.put<ApiResponse<T>>(endpoint, data, config);
                break;
            case 'delete':
                response = await axiosInstance.delete<ApiResponse<T>>(endpoint, config);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        return response.data;
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
};

// Các hàm tiện ích
export const get = <T>(endpoint: string, config?: AxiosRequestConfig) =>
    apiCall<T>('get', endpoint, undefined, config);

export const post = <T>(endpoint: string, data?: any, config?: AxiosRequestConfig) =>
    apiCall<T>('post', endpoint, data, config);

export const put = <T>(endpoint: string, data?: any, config?: AxiosRequestConfig) =>
    apiCall<T>('put', endpoint, data, config);

export const del = <T>(endpoint: string, config?: AxiosRequestConfig) =>
    apiCall<T>('delete', endpoint, undefined, config);

// Thêm token vào header (sử dụng khi cần xác thực)
export const setAuthToken = (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Xóa token khỏi header
export const removeAuthToken = () => {
    delete axiosInstance.defaults.headers.common['Authorization'];
};
