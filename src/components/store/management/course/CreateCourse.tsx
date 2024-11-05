// components/CreateCourse.tsx
import React, { useState } from 'react';
import BaseModal from '../../../base/BaseModal';
import { post } from '../../../../utils/api';
import { showToastError, showToastSuccess } from '../../../../utils/toast';

interface CreateCourseProps {
    isOpen: boolean;
    onClose: () => void;
    storeId: string;
    onCourseCreated: (newCourse: Course) => void;
}

interface Course {
    id: string;
    name: string;
    image: string;
    description: string;
    cost: number;
    estimate_time: number;
    active: number;
    color: string;
    position: number;
}

const initialCourse: Omit<Course, 'id'> = {
    name: '',
    image: '',
    description: '',
    cost: 0,
    estimate_time: 0,
    active: 1,
    color: '',
    position: 0,
};

const CreateCourse: React.FC<CreateCourseProps> = ({ isOpen, onClose, storeId, onCourseCreated }) => {
    const [newCourse, setNewCourse] = useState<Omit<Course, 'id'>>(initialCourse);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCourse(prev => ({ ...prev, [name]: name === 'cost' || name === 'estimate_time' || name === 'active' || name === 'position' ? Number(value) : value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await post<Course>(`/stores/${storeId}/courses`, newCourse);
            onCourseCreated(response.data);
            setNewCourse(initialCourse);
            onClose();
            showToastSuccess('Khóa học đã được tạo thành công');
        } catch (error) {
            console.error('Không thể tạo khóa học:', error);
            showToastError('Không thể tạo khóa học');
        }
    };
    const modalFooter = (
        <div className="flex justify-end">
            <button
                type="submit"
                form="createCourseForm"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
                Tạo Khóa học
            </button>
        </div>
    );

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Tạo Khóa học mới"
            footer={modalFooter}
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên khóa học</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newCourse.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Hình ảnh URL</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={newCourse.image}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={newCourse.description}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Giá</label>
                    <input
                        type="number"
                        id="cost"
                        name="cost"
                        value={newCourse.cost}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="estimate_time" className="block text-sm font-medium text-gray-700">Thời lượng (giờ)</label>
                    <input
                        type="number"
                        id="estimate_time"
                        name="estimate_time"
                        value={newCourse.estimate_time}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Màu sắc</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={newCourse.color}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="active" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <select
                        id="active"
                        name="active"
                        value={newCourse.active}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value={1}>Hoạt động</option>
                        <option value={0}>Không hoạt động</option>
                    </select>
                </div>
            </form>
        </BaseModal>
    );
};

export default CreateCourse;
