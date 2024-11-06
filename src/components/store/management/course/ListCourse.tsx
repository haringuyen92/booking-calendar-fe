import React, {useCallback, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {showToastError, showToastSuccess} from "../../../../utils/toast";
import {del, get} from "../../../../utils/api";
import CreateCourse from "./CreateCourse";
import UpdateCourse from "./UpdateCourse";
import ModalConfirm from "../../../base/modal/ModalConfirm";

interface ListStoreProps {
    store_id: string
}

interface Course {
    id: string;
    name: string;
    image: string;
    description: string;
    cost: number;
    estimate_time: number;
    active: number;
    color: string
    position: number
}


const ListCourse: React.FC<ListStoreProps> = ({store_id}) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

    const fetchListCourse = useCallback(async () =>{
        try {
            const response = await get<Course[]>(`/stores/${store_id}/courses`);
            setCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            showToastError('Failed to fetch courses');
        }
    }, [store_id])
    useEffect(() => {
        fetchListCourse();
    }, [fetchListCourse]);
    const handleAddCourse = () => {
        setIsCreateModalOpen(true);
    };
    const handleCourseCreated = (newCourse: Course) => {
        fetchListCourse();
    };

    const handleUpdateCourse = (courseId: string) => {
        setSelectedCourseId(courseId);
        setIsUpdateModalOpen(true);
    };

    const handleCourseUpdated = (updatedCourse: Course) => {
        fetchListCourse();
    };

    const handleDeleteCourse = (course: Course) => {
        setCourseToDelete(course)
        setIsDeleteModalOpen(true);
    }

    const confirmDeleteCourse = async () => {
        if (courseToDelete) {
           try {
               await del(`/stores/${store_id}/courses/${courseToDelete.id}`);
               showToastSuccess('Khóa học đã được xóa thành công')
               fetchListCourse();
           } catch (error) {
               console.error('Failed to delete course:', error);
               showToastError('Không thể xóa khóa học');
           }
        }
        setIsDeleteModalOpen(false);
        setCourseToDelete(null);
    }
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Danh sách Khóa học</h2>
                <button
                    onClick={handleAddCourse}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                >
                    Thêm Khóa học
                </button>
            </div>

            <div className="mt-6 overflow-x-auto">
                <div className="inline-block min-w-full shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Tên Khóa học</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Mô tả</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Thời lượng (giờ)</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Giá</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Trạng thái</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Hành động</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.estimate_time}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${course.cost.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${course.active === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {course.active}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleUpdateCourse(course.id)}
                                        className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-100 transition-colors duration-300 mr-2"
                                    >
                                        Cập nhật
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCourse(course)}
                                        className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md border border-red-600 hover:bg-red-100 transition-colors duration-300"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <CreateCourse
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                storeId={store_id}
                onCourseCreated={handleCourseCreated}
            />
            <UpdateCourse
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                storeId={store_id}
                courseId={selectedCourseId || ''}
                onCourseUpdated={handleCourseUpdated}
            />

            <ModalConfirm
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteCourse}
                title="Xác nhận xóa nhân viên"
                message={`Bạn có chắc chắn muốn xóa nhân viên ${courseToDelete?.name}?`}
                confirmText="Xóa"
                cancelText="Hủy"
            />
        </div>
    );
}

export default ListCourse;
