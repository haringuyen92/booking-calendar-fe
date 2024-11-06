// components/UpdateCourse.tsx
import React, { useState, useEffect } from 'react';
import BaseModal from '../../../base/modal/BaseModal';
import { get, put } from '../../../../utils/api';
import { showToastError, showToastSuccess } from '../../../../utils/toast';

interface UpdateCourseProps {
    isOpen: boolean;
    onClose: () => void;
    storeId: string;
    courseId: string;
    onCourseUpdated: (updatedCourse: Course) => void;
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

const UpdateCourse: React.FC<UpdateCourseProps> = ({ isOpen, onClose, storeId, courseId, onCourseUpdated }) => {
    const [course, setCourse] = useState<Course | null>(null);

    useEffect(() => {
        if (isOpen && courseId) {
            fetchCourse();
        }
    }, [isOpen, courseId]);

    const fetchCourse = async () => {
        try {
            const response = await get<Course>(`/stores/${storeId}/courses/${courseId}`);
            setCourse(response.data);
        } catch (error) {
            console.error('Failed to fetch course:', error);
            showToastError('Không thể tải thông tin khóa học');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCourse(prev => prev ? ({
            ...prev,
            [name]: name === 'cost' || name === 'estimate_time' || name === 'active' || name === 'position' ? Number(value) : value
        }) : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!course) return;

        try {
            const response = await put<Course>(`/stores/${storeId}/courses/${courseId}`, course);
            onCourseUpdated(response.data);
            onClose();
            showToastSuccess('Khóa học đã được cập nhật thành công');
        } catch (error) {
            console.error('Failed to update course:', error);
            showToastError('Không thể cập nhật khóa học');
        }
    };

    const modalFooter = (
        <div className="flex justify-end">
            <button
                type="submit"
                form="updateCourseForm"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
                Cập nhật Khóa học
            </button>
        </div>
    );

    if (!course) return null;

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Cập nhật Khóa học"
            footer={modalFooter}
        >
            <form id="updateCourseForm" onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên khóa học</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={course.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Hình ảnh URL</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={course.image}
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
                        value={course.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Giá</label>
                    <input
                        type="number"
                        id="cost"
                        name="cost"
                        value={course.cost}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="estimate_time" className="block text-sm font-medium text-gray-700">Thời lượng (giờ)</label>
                    <input
                        type="number"
                        id="estimate_time"
                        name="estimate_time"
                        value={course.estimate_time}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Màu sắc</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={course.color}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="active" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <select
                        id="active"
                        name="active"
                        value={course.active}
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

export default UpdateCourse;
