import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get, put } from '../../utils/api';
import { showToastError, showToastSuccess } from "../../utils/toast";

interface Store {
    id: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    logo: string;
    website: string;
    location: string;
}

const UpdateStore: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [store, setStore] = useState<Store>({
        id: '',
        name: '',
        description: '',
        email: '',
        phone: '',
        address: '',
        logo: '',
        website: '',
        location: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStore = async () => {
            try {
                setIsLoading(true);
                const response = await get<Store>(`/stores/${id}`);
                setStore(response.data);
            } catch (error) {
                console.error('Failed to fetch store:', error);
                showToastError('Failed to fetch store details');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchStore();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStore(prevStore => ({
            ...prevStore,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await put<Store>(`/stores/${id}`, store);
            if (response.code === 200) {
                showToastSuccess('Store updated successfully');
                navigate('/stores');
            } else {
                showToastError(`Failed to update store: ${response.message}`);
            }
        } catch (error) {
            console.error('Failed to update store:', error);
            showToastError(`Failed to update store: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Cập nhật Store</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Thông tin cơ bản</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên Store:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={store.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Thông tin liên hệ</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={store.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Thông tin bổ sung</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Địa chỉ:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={store.address}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                    >
                        Cập nhật Store
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStore;
