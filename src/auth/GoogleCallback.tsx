import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');

        if (code) {
            // Gửi code này đến server của bạn để đổi lấy access token
            console.log('Authorization code:', code);
            // Sau khi xử lý xong, chuyển hướng người dùng
            navigate('/');
        } else {
            // Xử lý lỗi
            console.error('No code received');
            navigate('/login');
        }
    }, [location, navigate]);

    return <div>Processing Google login...</div>;
};

export default GoogleCallback;
