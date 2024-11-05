import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from "../../utils/api";
import { showToastError } from "../../utils/toast";

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

const ListStore: React.FC = () => {
    const navigate = useNavigate();
    const [stores, setStores] = useState<Store[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                setIsLoading(true);
                const response = await get<Store[]>('/stores/');
                setStores(response.data);
            } catch (error) {
                console.error('Failed to fetch stores:', error);
                showToastError('Failed to fetch stores');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStores();
    }, []);

    const handleCreate = () => {
        navigate('/stores/create');
    };

    const handleManagement = (id: string)  => {
        navigate(`/stores/${id}/management`);
    }

    const handleSetting = (id: string) => {
        navigate(`/stores/${id}/setting`);
    };

    const handleUpdate = (id: string) => {
        navigate(`/stores/${id}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Danh sách Store</h2>
                <button
                    onClick={handleCreate}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                >
                    Tạo mới
                </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Store</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {stores.map(store => (
                        <tr key={store.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => handleManagement(store.id)}
                                    className="text-yellow-600 hover:text-yellow-900 mr-4 px-3 py-1 rounded-md border border-yellow-600 hover:bg-yellow-100 transition-colors duration-300"
                                >
                                    Quản lý
                                </button>
                                <button
                                    onClick={() => handleSetting(store.id)}
                                    className="text-yellow-600 hover:text-yellow-900 mr-4 px-3 py-1 rounded-md border border-yellow-600 hover:bg-yellow-100 transition-colors duration-300"
                                >
                                    Cài đặt
                                </button>
                                <button
                                    onClick={() => handleUpdate(store.id)}
                                    className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-100 transition-colors duration-300"
                                >
                                    Cập nhật
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListStore;
