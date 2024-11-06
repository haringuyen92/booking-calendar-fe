// components/CreateStaff.tsx
import React, { useState } from 'react';
import BaseModal from '../../../base/modal/BaseModal';
import { post } from '../../../../utils/api';
import { showToastError, showToastSuccess } from '../../../../utils/toast';

interface CreateStaffProps {
    isOpen: boolean;
    onClose: () => void;
    storeId: string;
    onStaffCreated: (newStaff: Staff) => void;
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

const initialStaff: Omit<Staff, 'id'> = {
    name: '',
    email: '',
    phone: '',
    cost: 0,
    max_booking_slot: 1,
    active: 1,
    color: '',
    position: 0,
    is_all_course: 1
};

const CreateStaff: React.FC<CreateStaffProps> = ({ isOpen, onClose, storeId, onStaffCreated }) => {
    const [newStaff, setNewStaff] = useState<Omit<Staff, 'id'>>(initialStaff);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewStaff(prev => ({
            ...prev,
            [name]: ['cost', 'max_booking_slot', 'active', 'position', 'is_all_course'].includes(name) ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await post<Staff>(`/stores/${storeId}/staffs`, newStaff);
            onStaffCreated(response.data);
            setNewStaff(initialStaff);
            onClose();
            showToastSuccess('Nhân viên đã được tạo thành công');
        } catch (error) {
            console.error('Failed to create staff:', error);
            showToastError('Không thể tạo nhân viên');
        }
    };

    const modalFooter = (
        <div className="flex justify-end">
            <button
                type="submit"
                form="createStaffForm"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
                Tạo Nhân viên
            </button>
        </div>
    );

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Tạo Nhân viên mới"
            footer={modalFooter}
        >
            <form id="createStaffForm" onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên nhân viên</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newStaff.name}
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
                        value={newStaff.email}
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
                        value={newStaff.phone}
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
                        value={newStaff.cost}
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
                        value={newStaff.max_booking_slot}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="active" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <select
                        id="active"
                        name="active"
                        value={newStaff.active}
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
                        value={newStaff.color}
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
                        value={newStaff.position}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="is_all_course" className="block text-sm font-medium text-gray-700">Áp dụng cho tất cả khóa học</label>
                    <select
                        id="is_all_course"
                        name="is_all_course"
                        value={newStaff.is_all_course}
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

export default CreateStaff;
