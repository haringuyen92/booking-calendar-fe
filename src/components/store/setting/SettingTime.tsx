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
        return <div>Loading...</div>;
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
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={settings?.is_open_all_day}
                            onChange={(e) => updateDaySettings(day, 'is_open_all_day', e.target.checked)}
                        />
                        <span className="ml-2">Mở cả ngày</span>
                    </label>
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={settings?.is_off_day}
                            onChange={(e) => updateDaySettings(day, 'is_off_day', e.target.checked)}
                        />
                        <span className="ml-2">Ngày nghỉ</span>
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Thời gian mở cửa</label>
                    {settings.slot_time?.map((slot, slotIndex) => (
                        <div key={slotIndex} className="flex items-center space-x-2 mt-2">
                            <input
                                type="time"
                                value={formatTimeForInput(slot?.time_start)}
                                onChange={(e) => updateTimeSlot(day, slotIndex, 'time_start', e.target.value)}
                                className="form-input"
                            />
                            <input
                                type="time"
                                value={formatTimeForInput(slot?.time_end)}
                                onChange={(e) => updateTimeSlot(day, slotIndex, 'time_end', e.target.value)}
                                className="form-input"
                            />
                            <button
                                type="button"
                                onClick={() => addTimeSlot(day)}
                                className="px-2 py-1 bg-green-500 text-white rounded"
                            >
                                +
                            </button>
                            {settings?.slot_time && settings.slot_time.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeTimeSlot(day, slotIndex)}
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                >
                                    -
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Trạng thái mở cửa</label>
                <div className="mt-2 space-x-4">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            className="form-radio"
                            name="is_open"
                            checked={settingTime.is_open}
                            onChange={() => updateSettingTime('is_open', true)}
                        />
                        <span className="ml-2">Mở cửa</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            className="form-radio"
                            name="is_open"
                            checked={!settingTime.is_open}
                            onChange={() => updateSettingTime('is_open', false)}
                        />
                        <span className="ml-2">Đóng cửa</span>
                    </label>
                </div>
            </div>
            <div>
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={settingTime.is_apply_daily_setting}
                        onChange={(e) => updateSettingTime('is_apply_daily_setting', e.target.checked)}
                    />
                    <span className="ml-2">Áp dụng cài đặt hàng ngày</span>
                </label>
            </div>
            {settingTime.is_apply_daily_setting ? (
                <div className="border-t pt-4">
                    {renderTimeSettings('daily_setting')}
                </div>
            ) : (
                <div className="space-y-6">
                    {['monday_setting', 'tuesday_setting', 'wednesday_setting', 'thursday_setting', 'friday_setting', 'saturday_setting', 'sunday_setting'].map((day, index) => (
                        <div key={day} className="border-t pt-4">
                            <h3 className="font-medium mb-2">{daysOfWeek[index]}</h3>
                            {renderTimeSettings(day as keyof SettingTime)}
                        </div>
                    ))}
                </div>
            )}
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Lưu cài đặt
            </button>
        </form>
    );
};

export default SettingTime;
