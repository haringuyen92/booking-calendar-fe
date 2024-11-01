import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { get } from '../../utils/api';

// Import các component con
import SettingTime from './setting/SettingTime';
import SettingSlot from './setting/SettingSlot';
import SettingBooking from './setting/SettingBooking';
import SettingAction from './setting/SettingAction';

interface Store {
    id: string;
    name: string;
    // Các trường khác của store
}

const SettingStore: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [store, setStore] = useState<Store | null>(null);
    const [activeTab, setActiveTab] = useState('setting-time');

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const response = await get<Store>(`/stores/${id}`);
                setStore(response.data);
            } catch (error) {
                console.error('Failed to fetch store:', error);
            }
        };

        if (id) {
            fetchStore();
        }

        // Đặt tab active dựa trên query param
        const searchParams = new URLSearchParams(location.search);
        const action = searchParams.get('action');
        if (action) {
            setActiveTab(action);
        }
    }, [id, location]);

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
        navigate(`/stores/${id}/setting?action=${tabName}`);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'setting-time':
                return <SettingTime store_id={id as string} />;
            case 'setting-slot':
                return <SettingSlot storeId={id as string} />;
            case 'setting-booking':
                return <SettingBooking storeId={id as string} />;
            case 'setting-action':
                return <SettingAction storeId={id as string} />;
            default:
                return <SettingTime store_id={id as string} />;
        }
    };

    if (!store) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Cài đặt cho {store.name}</h1>
            <div className="mb-4">
                <ul className="flex border-b">
                    {['setting-time', 'setting-slot', 'setting-booking', 'setting-action'].map((tab) => (
                        <li className="-mb-px mr-1" key={tab}>
                            <a
                                className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ${
                                    activeTab === tab ? 'border-l border-t border-r rounded-t' : 'border-b'
                                }`}
                                href={`#${tab}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabClick(tab);
                                }}
                            >
                                {tab.split('-')[1].charAt(0).toUpperCase() + tab.split('-')[1].slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-4 border rounded">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default SettingStore;
