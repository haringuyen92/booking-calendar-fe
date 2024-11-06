// components/UpdateStaff.tsx
import React, { useState, useEffect } from 'react';
import BaseModal from '../../../base/modal/BaseModal';
import { get, put } from '../../../../utils/api';
import { showToastError, showToastSuccess } from '../../../../utils/toast';

interface UpdateStaffProps {
    isOpen: boolean;
    onClose: () => void;
    storeId: string;
    staffId: string;
    onStaffUpdated: (updatedStaff: Staff) => void;
}

interface Staff {
    id: string;
    name: string;
    email: string;
    phone: string;
    cost: number;
    max_booking_slot: number;
    active: number;
    color: string;
    position: number;
    is_all_course: number;
}

const UpdateStaff: React.FC<UpdateStaffProps> = ({ isOpen, onClose, storeId, staffId, onStaffUpdated }) => {
    const [staff, setStaff] = useState<Staff | null>(null);

    useEffect(() => {
        if (isOpen && staffId) {
            fetchStaff();
        }
    }, [isOpen, staffId]);

    const fetchStaff = async () => {
        try {
            const response = await get<Staff>(`/stores/${storeId}/staffs/${staffId}`);
            setStaff(response.data);
        } catch (error) {
            console.error('Failed to fetch staff:', error);
            showToastError('Không thể tải thông tin nhân viên');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStaff(prev => prev ? ({
            ...prev,
            [name]: ['cost', 'max_booking_slot', 'active', 'position', 'is_all_course'].includes(name) ? Number(value) : value
        }) : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!staff) return;

        try {
            const response = await put<Staff>(`/stores/${storeId}/staffs/${staffId}`, staff);
            onStaffUpdated(response.data);
            onClose();
            showToastSuccess('Nhân viên đã được cập nhật thành công');
        } catch (error) {
            console.error('Failed to update staff:', error);
            showToastError('Không thể cập nhật nhân viên');
        }
    };

    const modalFooter = (
        <div className="flex justify-end">
            <button
                type="submit"
                form="updateStaffForm"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
                Cập nhật Nhân viên
            </button>
        </div>
    );

    if (!staff) return null;

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Cập nhật Nhân viên"
            footer={modalFooter}
        >
            <form id="updateStaffForm" onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên nhân viên</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={staff.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={staff.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={staff.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Chi phí</label>
                    <input
                        type="number"
                        id="cost"
                        name="cost"
                        value={staff.cost}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="max_booking_slot" className="block text-sm font-medium text-gray-700">Số lượng đặt chỗ tối đa</label>
                    <input
                        type="number"
                        id="max_booking_slot"
                        name="max_booking_slot"
                        value={staff.max_booking_slot}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="active" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <select
                        id="active"
                        name="active"
                        value={staff.active}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value={1}>Hoạt động</option>
                        <option value={0}>Không hoạt động</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Màu sắc</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={staff.color}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">Vị trí</label>
                    <input
                        type="number"
                        id="position"
                        name="position"
                        value={staff.position}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="is_all_course" className="block text-sm font-medium text-gray-700">Áp dụng cho tất cả khóa học</label>
                    <select
                        id="is_all_course"
                        name="is_all_course"
                        value={staff.is_all_course}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value={1}>Có</option>
                        <option value={0}>Không</option>
                    </select>
                </div>
            </form>
        </BaseModal>
    );
};

export default UpdateStaff;
