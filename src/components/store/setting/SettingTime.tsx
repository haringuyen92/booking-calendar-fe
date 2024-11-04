import React, {useEffect, useState} from 'react';
import {get, put} from "../../../utils/api";
import {formatTimeForInput} from "../../../utils/date-time";
import {showToastError, showToastSuccess} from "../../../utils/toast";
import {useNavigate} from "react-router-dom";

interface SettingTimeProps {
    store_id: string;
}

interface SlotTime {
    time_start: string;
    time_end: string;
}

const initSlotTime = {
    time_start: '08:00', time_end: '18:00'
}

interface DaySettings {
    is_open_all_day: boolean;
    is_off_day: boolean;
    slot_time?: SlotTime[];
}

const initialDaySettings: DaySettings = {
    is_open_all_day: false,
    is_off_day: false,
};

interface SettingTime {
    is_open: boolean;
    is_apply_daily_setting: boolean;
    daily_setting: DaySettings;
    monday_setting: DaySettings;
    tuesday_setting: DaySettings;
    wednesday_setting: DaySettings;
    thursday_setting: DaySettings;
    friday_setting: DaySettings;
    saturday_setting: DaySettings;
    sunday_setting: DaySettings;
}

const initialSettingTime: SettingTime = {
    is_open: false,
    is_apply_daily_setting: false,
    daily_setting: initialDaySettings,
    monday_setting: initialDaySettings,
    tuesday_setting: initialDaySettings,
    wednesday_setting: initialDaySettings,
    thursday_setting: initialDaySettings,
    friday_setting: initialDaySettings,
    saturday_setting: initialDaySettings,
    sunday_setting: initialDaySettings,
}

const daysOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

const SettingTime: React.FC<SettingTimeProps> = ({ store_id }) => {
    const navigate = useNavigate();
    const [settingTime, setSettingTime] = useState<SettingTime>(initialSettingTime);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSettingTime = async () => {
            try {
                setIsLoading(true);
                const response = await get<SettingTime>(`/stores/${store_id}/setting-time`);
                const newSettingTime = response.data;
                setSettingTime(newSettingTime);
            } catch (error) {
                console.error('Failed to fetch setting time:', error);
            } finally {
                setIsLoading(false);
            }
        }

        if (store_id) {
            fetchSettingTime();
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
            const response = await put<SettingTime>(`/stores/${store_id}/setting-time`, settingTime)
            if(response.code === 200) {
                showToastSuccess('Setting time updated successfully')
                navigate(`/stores`);
            } else {
                console.error('Failed to update store:', response);
                showToastError(`Failed to update setting time ${response.code}`)
            }
        } catch (error) {
            console.error('Failed to update setting time:', error);
            showToastError(`Failed to update setting time ${error}`)
        }
    };

    const updateSettingTime = (field: keyof SettingTime, value: any) => {
        setSettingTime(prev => ({ ...prev, [field]: value }));
    };

    const updateDaySettings = (day: keyof SettingTime, field: keyof DaySettings, value: any) => {
        setSettingTime((prev: SettingTime) => {
            const updatedDay = {
                ...prev[day as keyof SettingTime] as DaySettings,
                [field]: value
            };
            return {
                ...prev,
                [day]: updatedDay
            };
        });
    };

    const addTimeSlot = (day: keyof SettingTime) => {
        setSettingTime((prev: SettingTime) => {
            const currentDay = prev[day] as DaySettings;
            const slotTime = currentDay.slot_time ?? [{...initSlotTime}]
            return {
                ...prev,
                [day]: {
                    ...currentDay,
                    slot_time: [
                        ...slotTime,
                        {...initSlotTime}
                    ]
                }
            };
        });
    };

    const removeTimeSlot = (day: keyof SettingTime, slotIndex: number) => {
        setSettingTime((prev: SettingTime) => {
            const currentDay = prev[day] as DaySettings;
            const slotTime = currentDay.slot_time ?? [{...initSlotTime}]
            return {
                ...prev,
                [day]: {
                    ...currentDay,
                    slot_time: slotTime.filter((_, index) => index !== slotIndex)
                }
            };
        });
    };

    const updateTimeSlot = (day: keyof SettingTime, slotIndex: number, field: 'time_start' | 'time_end', value: string): void => {
        setSettingTime((prev: SettingTime) => {
            const currentDay = prev[day] as DaySettings;
            const updatedSlotTime = currentDay.slot_time?.map((slot, index) =>
                index === slotIndex ? { ...slot, [field]: value } : slot
            );

            return {
                ...prev,
                [day]: {
                    ...currentDay,
                    slot_time: updatedSlotTime
                }
            };
        });
    };

    const renderTimeSettings = (day: keyof SettingTime) => {
        const settings = settingTime[day] as DaySettings;
        if (!settings.slot_time || settings.slot_time.length === 0) {
            settings.slot_time = [{...initSlotTime}];
        }
        return (
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={settings?.is_open_all_day}
                            onChange={(e) => updateDaySettings(day, 'is_open_all_day', e.target.checked)}
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">Mở cả ngày</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={settings?.is_off_day}
                            onChange={(e) => updateDaySettings(day, 'is_off_day', e.target.checked)}
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">Ngày nghỉ</span>
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian mở cửa</label>
                    {settings.slot_time?.map((slot, slotIndex) => (
                        <div key={slotIndex} className="flex items-center space-x-2 mt-2">
                            <div className="flex-grow flex items-center space-x-2">
                                <input
                                    type="time"
                                    value={formatTimeForInput(slot?.time_start)}
                                    onChange={(e) => updateTimeSlot(day, slotIndex, 'time_start', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                />
                                <span className="text-gray-500">đến</span>
                                <input
                                    type="time"
                                    value={formatTimeForInput(slot?.time_end)}
                                    onChange={(e) => updateTimeSlot(day, slotIndex, 'time_end', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>
                            <div className="flex items-center space-x-1">
                                <button
                                    type="button"
                                    onClick={() => addTimeSlot(day)}
                                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                                {settings?.slot_time && settings.slot_time.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeTimeSlot(day, slotIndex)}
                                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                             fill="currentColor">
                                            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Cài đặt thời gian</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Trạng thái mở cửa</h3>
                    <div className="space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                name="is_open"
                                checked={settingTime.is_open}
                                onChange={() => updateSettingTime('is_open', true)}
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">Mở cửa</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                name="is_open"
                                checked={!settingTime.is_open}
                                onChange={() => updateSettingTime('is_open', false)}
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">Đóng cửa</span>
                        </label>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={settingTime.is_apply_daily_setting}
                            onChange={(e) => updateSettingTime('is_apply_daily_setting', e.target.checked)}
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">Áp dụng cài đặt hàng ngày</span>
                    </label>
                </div>

                {settingTime.is_apply_daily_setting ? (
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Cài đặt hàng ngày</h3>
                        {renderTimeSettings('daily_setting')}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {['monday_setting', 'tuesday_setting', 'wednesday_setting', 'thursday_setting', 'friday_setting', 'saturday_setting', 'sunday_setting'].map((day, index) => (
                            <div key={day} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">{daysOfWeek[index]}</h3>
                                {renderTimeSettings(day as keyof SettingTime)}
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                    >
                        Lưu cài đặt
                    </button>
                </div>
            </form>
        </div>

    );
};

export default SettingTime;
