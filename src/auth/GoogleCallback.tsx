import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {post} from "../utils/api";

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {
        const handleGoogleCallback = async () => {
            const urlParams = new URLSearchParams(location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    // Gọi API backend với code nhận được
                    const response = await post<LoginResponse>('/auth/login', { code });

                    // Xử lý response
                    console.log('Login successful:', response);

                    // Lưu token vào localStorage hoặc state management của bạn
                    localStorage.setItem('authToken', response.data.token);

                    // Chuyển hướng người dùng sau khi đăng nhập thành công
                    navigate('/dashboard'); // hoặc bất kỳ route nào bạn muốn
                } catch (error) {
                    console.error('Login failed:', error);
                    // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
                    navigate('/login', { state: { error: 'Login failed. Please try again.' } });
                }
            } else {
                console.error('No code received');
                navigate('/login', { state: { error: 'No authorization code received from Google.' } });
            }
        };

        handleGoogleCallback();
    }, [location, navigate]);

    return <div>Processing Google login...</div>;
};

export default GoogleCallback;
