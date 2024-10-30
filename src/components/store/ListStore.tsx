import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from "../../utils/api";

interface Store {
    id: string;
    name: string;
    // Thêm các trường khác nếu cần
}

const ListStore: React.FC = () => {
    const navigate = useNavigate();
    const [stores, setStores] = useState<Store[]>([]);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await get<Store[]>('/stores/');
                setStores(response.data);
            } catch (error) {
                console.error('Failed to fetch stores:', error);
                // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
            }
        };

        fetchStores();
    }, []);

    const handleCreate = () => {
        navigate('/stores/create');
    };

    const handleSetting = () => {
        navigate('/stores/setting');
    };

    const handleUpdate = (id: string) => {
        navigate(`/stores/update/${id}`);
    };

    return (
        <div className="list-store">
            <h1>Danh sách Store</h1>

            <button onClick={handleCreate} className="create-button">
                Tạo Store mới
            </button>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên Store</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {stores.map(store => (
                    <tr key={store.id}>
                        <td>{store.id}</td>
                        <td>{store.name}</td>
                        <td>
                            <button onClick={handleSetting} className="setting-button">
                                Setting
                            </button>
                            <button onClick={() => handleUpdate(store.id)} className="update-button">
                                Update
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListStore;
