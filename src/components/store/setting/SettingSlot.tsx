import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {get, put} from "../../../utils/api";
import {showToastError, showToastSuccess} from "../../../utils/toast";

interface SettingSlotProps {
    store_id: string;
}

interface SettingSlotRequest {
    require: boolean;
    use_cost: boolean;
}

const initSettingSlotRequest: SettingSlotRequest ={
     require: true,
     use_cost: false
}

interface SettingSlot {
    course: SettingSlotRequest
    staff: SettingSlotRequest
    default_course_estimate_time: number
}

const initSettingSlot: SettingSlot = {
    course: initSettingSlotRequest,
    staff: initSettingSlotRequest,
    default_course_estimate_time: 1
}

const SettingSlot: React.FC<SettingSlotProps> = ({ store_id }) => {
    const navigate = useNavigate();
    const [settingSlot, setSettingSlot] = useState<SettingSlot>(initSettingSlot);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSettingSlot = async () => {
            try {
                setIsLoading(true);
                const response = await get<SettingSlot>(`/stores/${store_id}/setting-slot`);
                setSettingSlot(response.data);
            } catch (error) {
                console.error('Failed to fetch setting management.', error);
            } finally {
                setIsLoading(false);
            }
        }
        if (store_id) {
            fetchSettingSlot();
        }

    }, [store_id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    const handleCancel = () => {
        navigate(`/stores/`); // Quay lại trang trước đó
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await put<SettingSlot>(`/stores/${store_id}/setting-slot`, settingSlot);
            if (response.code === 200) {
                showToastSuccess('Setting management updated successfully');
                navigate(`/stores`);
            } else {
                showToastError(`Failed to update setting slot: ${response.message}`);
            }
        } catch (error) {
            console.error('Failed to update setting management', error);
            showToastError(`Failed to update setting slot: ${error}`);
        }
    };
    const handleChange = (section: 'course' | 'staff', field: keyof SettingSlotRequest, value: boolean) => {
        setSettingSlot(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleEstimateTimeChange = (value: number) => {
        setSettingSlot(prev => ({
            ...prev,
            default_course_estimate_time: value
        }));
    };
    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Cài đặt Slot</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Cài đặt Khóa học</h3>
                    <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={settingSlot.course.require}
                                onChange={(e) => handleChange('course', 'require', e.target.checked)}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-gray-700">Yêu cầu</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={settingSlot.course.use_cost}
                                onChange={(e) => handleChange('course', 'use_cost', e.target.checked)}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-gray-700">Sử dụng chi phí</span>
                        </label>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Cài đặt Nhân viên</h3>
                    <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={settingSlot.staff.require}
                                onChange={(e) => handleChange('staff', 'require', e.target.checked)}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-gray-700">Yêu cầu</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={settingSlot.staff.use_cost}
                                onChange={(e) => handleChange('staff', 'use_cost', e.target.checked)}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-gray-700">Sử dụng chi phí</span>
                        </label>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Thời gian ước tính mặc định cho khóa
                        học</h3>
                    <div className="flex items-center space-x-3">
                        <input
                            type="number"
                            value={settingSlot.default_course_estimate_time}
                            onChange={(e) => handleEstimateTimeChange(Number(e.target.value))}
                            min="1"
                            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        />
                        <span className="text-gray-700">giờ</span>
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
                        Lưu cài đặt
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SettingSlot;