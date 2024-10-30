import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from "../../utils/api";

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

    useEffect(() => {
        (async () => {
            try {
                const response = await get<Store[]>('/stores/');
                setStores(response.data);
            } catch (error) {
                console.error('Failed to fetch stores:', error);
                // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
            }
        })();
    }, []);

    const handleCreate = () => {
        navigate('/stores/create');
    };

    const handleSetting = () => {
        navigate('/stores/setting');
    };

    const handleUpdate = (id: string) => {
        navigate(`/stores/${id}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Danh sách Store</h1>
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    Tạo mới
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full leading-normal">
                    <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Tên Store
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Phone
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Address
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Hành động
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {stores.map(store => (
                        <tr key={store.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{store.id}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{store.name}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{store.email}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{store.phone}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{store.address}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <button
                                    onClick={handleSetting}
                                    className="text-gray-600 hover:text-gray-900 mr-2"
                                >
                                    Cài đặt
                                </button>
                                <button
                                    onClick={() => handleUpdate(store.id)}
                                    className="text-blue-600 hover:text-blue-900"
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
