// components/ListStaff.tsx
import React, { useEffect, useState } from "react";
import { get } from "../../../../utils/api";
import { showToastError } from "../../../../utils/toast";
import CreateStaff from "./CreateStaff";
import UpdateStaff from "./UpdateStaff";

interface ListStaffProps {
    store_id: string;
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

const ListStaff: React.FC<ListStaffProps> = ({ store_id }) => {
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);

    useEffect(() => {
        fetchStaff();
    }, [store_id]);

    const fetchStaff = async () => {
        try {
            const response = await get<Staff[]>(`/stores/${store_id}/staffs`);
            setStaffList(response.data);
        } catch (error) {
            console.error('Failed to fetch staff:', error);
            showToastError('Không thể tải danh sách nhân viên');
        }
    };

    const handleAddStaff = () => {
        setIsCreateModalOpen(true);
    };

    const handleUpdateStaff = (staffId: string) => {
        setSelectedStaffId(staffId);
        setIsUpdateModalOpen(true);
    };

    const handleStaffCreated = (newStaff: Staff) => {
        setStaffList(prevStaff => [...prevStaff, newStaff]);
    };

    const handleStaffUpdated = (updatedStaff: Staff) => {
        setStaffList(prevStaff => prevStaff.map(staff =>
            staff.id === updatedStaff.id ? updatedStaff : staff
        ));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Danh sách Nhân viên</h2>
                <button
                    onClick={handleAddStaff}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                >
                    Thêm Nhân viên
                </button>
            </div>

            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chi phí</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {staffList.map((staff) => (
                        <tr key={staff.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{staff.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{staff.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{staff.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{staff.cost}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${staff.active === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {staff.active === 1 ? 'Hoạt động' : 'Không hoạt động'}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => handleUpdateStaff(staff.id)}
                                    className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-100 transition-colors duration-300"
                                >
                                    Cập nhật
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <CreateStaff
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                storeId={store_id}
                onStaffCreated={handleStaffCreated}
            />

            <UpdateStaff
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                storeId={store_id}
                staffId={selectedStaffId || ''}
                onStaffUpdated={handleStaffUpdated}
            />
        </div>
    );
};

export default ListStaff;
