import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../utils/api';

interface Store {
    name: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    logo: string;
    website: string;
    location: string;
}

const CreateStore: React.FC = () => {
    const navigate = useNavigate();
    const [store, setStore] = useState<Store>({
        name: '',
        description: '',
        email: '',
        phone: '',
        address: '',
        logo: '',
        website: '',
        location: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStore(prevStore => ({
            ...prevStore,
            [name]: value
        }));
    };

    const handleBack = () => {
        navigate('/stores');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await post('/stores/', store);
            navigate('/stores');
        } catch (error) {
            console.error('Failed to create store:', error);
            // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Tạo Store Mới</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên Store:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={store.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={store.description}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={store.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={store.phone}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Địa chỉ:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={store.address}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo URL:</label>
                    <input
                        type="url"
                        id="logo"
                        name="logo"
                        value={store.logo}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website:</label>
                    <input
                        type="url"
                        id="website"
                        name="website"
                        value={store.website}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Vị trí:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={store.location}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                    >
                        Tạo Store
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateStore;
