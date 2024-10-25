import React from 'react';

const Login: React.FC = () => {
    const handleGoogleLogin = () => {
        const clientId = '245701519163-hvrh8ber3ul00dse1nok7ih5577181dk.apps.googleusercontent.com'; // Thay thế bằng Client ID của bạn
        const redirectUri = encodeURIComponent('http://localhost:3000/auth/google/callback');
        const scope = encodeURIComponent('email profile');
        const responseType = 'code';

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

        window.location.href = googleAuthUrl;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                {/* ... (phần còn lại của form) */}
                <div>
                    <button
                        onClick={handleGoogleLogin}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
