import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {get, put} from "../../../utils/api";
import {showToastError, showToastSuccess} from "../../../utils/toast";

interface SettingBookingProps {
    store_id: string;
}

interface SettingBookingRequest {
    require: boolean;
    with_before_time: number
}

const initSettingBookingRequest: SettingBookingRequest = {
    require: true,
    with_before_time: 0,
}

interface SettingBooking {
    duration: number;
    max_booking_the_same_time: number;
    approve: SettingBookingRequest;
    change: SettingBookingRequest;
    cancel: SettingBookingRequest;
}

const initSettingBooking: SettingBooking = {
    duration: 30,
    max_booking_the_same_time: 1,
    approve: initSettingBookingRequest,
    change: initSettingBookingRequest,
    cancel: initSettingBookingRequest,
}

const SettingBooking: React.FC<SettingBookingProps> = ({ store_id }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [settingBooking, setSettingBooking] = useState<SettingBooking>(initSettingBooking);

    useEffect(() => {
        const fetchSettingBooking = async () => {
            try {
                setIsLoading(true);
                const response = await get<SettingBooking>(`/stores/${store_id}/setting-booking`);
                setSettingBooking(response.data);
            } catch (error) {
                console.error('Failed to fetch setting booking',error);
            } finally {
                setIsLoading(false);
            }
        }
        if (store_id) {
            fetchSettingBooking();
        }
    }, [store_id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await put<SettingBooking>(`/stores/${store_id}/setting-booking`, settingBooking);
            if (response.code === 200) {
                showToastSuccess('Setting booking updated successfully')
                navigate(`/stores`);
            } else {
                console.log('Failed to update store:', response);
                showToastError(`Failed to update store:`, response);
            }
        } catch (error) {
            console.error('Failed to update setting booking',error);
            showToastError(`Failed to update setting booking ${error}`);
        }
    }
    const handleCancel = () => {
        navigate(`/stores/`); // Quay lại trang trước đó
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSettingBooking(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : Number(value)
        }));
    }

    const handleNestedChange = (category: 'approve' | 'change' | 'cancel', field: keyof SettingBookingRequest, value: boolean | number) => {
        setSettingBooking(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
    }
    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Booking Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                        <input
                            type="number"
                            name="duration"
                            value={settingBooking.duration}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Bookings at the Same
                            Time</label>
                        <input
                            type="number"
                            name="max_booking_the_same_time"
                            value={settingBooking.max_booking_the_same_time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        />
                    </div>
                </div>

                {['approve', 'change', 'cancel'].map((category) => {
                    const setting = settingBooking[category as keyof SettingBooking];
                    const isSettingBookingRequest = (value: any): value is SettingBookingRequest => {
                        return value && typeof value === 'object' && 'require' in value && 'with_before_time' in value;
                    };
                    if (!isSettingBookingRequest(setting)) return null;
                    return (
                        <div key={category} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800 capitalize mb-4">{category}</h3>
                            <div className="flex items-center mb-4">
                                <input
                                    id={`${category}-require`}
                                    type="checkbox"
                                    checked={setting.require}
                                    onChange={(e) => handleNestedChange(category as 'approve' | 'change' | 'cancel', 'require', e.target.checked)}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`${category}-require`}
                                       className="ml-3 text-sm font-medium text-gray-700">
                                    Require
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Time Before
                                    (hours)</label>
                                <input
                                    type="number"
                                    value={setting.with_before_time}
                                    onChange={(e) => handleNestedChange(category as 'approve' | 'change' | 'cancel', 'with_before_time', Number(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>
                        </div>
                    );
                })}

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
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SettingBooking;