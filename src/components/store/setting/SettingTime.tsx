import React, { useState } from 'react';

interface SettingTimeProps {
    storeId: string;
}

interface TimeSlot {
    start: string;
    end: string;
}

interface DaySettings {
    openAllDay: boolean;
    offDay: boolean;
    timeSlots: TimeSlot[];
}

const initialDaySettings: DaySettings = {
    openAllDay: false,
    offDay: false,
    timeSlots: [{ start: '00:00', end: '23:59' }]
};

const daysOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

const SettingTime: React.FC<SettingTimeProps> = ({ storeId }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isApplyDailySetting, setIsApplyDailySetting] = useState(false);
    const [dailySettings, setDailySettings] = useState<DaySettings>(initialDaySettings);
    const [weeklySettings, setWeeklySettings] = useState<DaySettings[]>(
        Array(7).fill(null).map(() => ({ ...initialDaySettings }))
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted:', { storeId, isOpen, isApplyDailySetting, dailySettings, weeklySettings });
    };

    const updateDailySettings = (field: keyof DaySettings, value: any) => {
        setDailySettings(prev => ({ ...prev, [field]: value }));
    };

    const updateWeeklySettings = (dayIndex: number, field: keyof DaySettings, value: any) => {
        setWeeklySettings(prev =>
            prev.map((day, index) =>
                index === dayIndex ? { ...day, [field]: value } : day
            )
        );
    };

    const addTimeSlot = (dayIndex: number | null) => {
        if (dayIndex === null) {
            setDailySettings(prev => ({
                ...prev,
                timeSlots: [...prev.timeSlots, { start: '00:00', end: '23:59' }]
            }));
        } else {
            setWeeklySettings(prev =>
                prev.map((day, index) =>
                    index === dayIndex
                        ? { ...day, timeSlots: [...day.timeSlots, { start: '00:00', end: '23:59' }] }
                        : day
                )
            );
        }
    };

    const removeTimeSlot = (dayIndex: number | null, slotIndex: number) => {
        if (dayIndex === null) {
            setDailySettings(prev => ({
                ...prev,
                timeSlots: prev.timeSlots.filter((_, index) => index !== slotIndex)
            }));
        } else {
            setWeeklySettings(prev =>
                prev.map((day, index) =>
                    index === dayIndex
                        ? { ...day, timeSlots: day.timeSlots.filter((_, idx) => idx !== slotIndex) }
                        : day
                )
            );
        }
    };

    const updateTimeSlot = (dayIndex: number | null, slotIndex: number, field: 'start' | 'end', value: string) => {
        if (dayIndex === null) {
            setDailySettings(prev => ({
                ...prev,
                timeSlots: prev.timeSlots.map((slot, index) =>
                    index === slotIndex ? { ...slot, [field]: value } : slot
                )
            }));
        } else {
            setWeeklySettings(prev =>
                prev.map((day, index) =>
                    index === dayIndex
                        ? {
                            ...day,
                            timeSlots: day.timeSlots.map((slot, idx) =>
                                idx === slotIndex ? { ...slot, [field]: value } : slot
                            )
                        }
                        : day
                )
            );
        }
    };

    const renderTimeSettings = (settings: DaySettings, dayIndex: number | null) => (
        <div className="space-y-4">
            <div>
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={settings.openAllDay}
                        onChange={(e) => dayIndex === null
                            ? updateDailySettings('openAllDay', e.target.checked)
                            : updateWeeklySettings(dayIndex, 'openAllDay', e.target.checked)
                        }
                    />
                    <span className="ml-2">Mở cả ngày</span>
                </label>
            </div>
            <div>
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={settings.offDay}
                        onChange={(e) => dayIndex === null
                            ? updateDailySettings('offDay', e.target.checked)
                            : updateWeeklySettings(dayIndex, 'offDay', e.target.checked)
                        }
                    />
                    <span className="ml-2">Ngày nghỉ</span>
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Thời gian mở cửa</label>
                {settings.timeSlots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex items-center space-x-2 mt-2">
                        <input
                            type="time"
                            value={slot.start}
                            onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'start', e.target.value)}
                            className="form-input"
                        />
                        <input
                            type="time"
                            value={slot.end}
                            onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'end', e.target.value)}
                            className="form-input"
                        />
                        <button
                            type="button"
                            onClick={() => addTimeSlot(dayIndex)}
                            className="px-2 py-1 bg-green-500 text-white rounded"
                        >
                            +
                        </button>
                        {settings.timeSlots.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeTimeSlot(dayIndex, slotIndex)}
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

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Trạng thái mở cửa</label>
                <div className="mt-2 space-x-4">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            className="form-radio"
                            name="isOpen"
                            checked={isOpen}
                            onChange={() => setIsOpen(true)}
                        />
                        <span className="ml-2">Mở cửa</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            className="form-radio"
                            name="isOpen"
                            checked={!isOpen}
                            onChange={() => setIsOpen(false)}
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
                        checked={isApplyDailySetting}
                        onChange={(e) => setIsApplyDailySetting(e.target.checked)}
                    />
                    <span className="ml-2">Áp dụng cài đặt hàng ngày</span>
                </label>
            </div>
            {isApplyDailySetting ? (
                <div className="border-t pt-4">
                    {renderTimeSettings(dailySettings, null)}
                </div>

            ) : (
                <div className="space-y-6">
                    {weeklySettings.map((daySetting, index) => (
                        <div key={index} className="border-t pt-4">
                            <h3 className="font-medium mb-2">{daysOfWeek[index]}</h3>
                            {renderTimeSettings(daySetting, index)}
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
