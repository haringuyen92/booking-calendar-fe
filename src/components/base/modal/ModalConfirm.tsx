// components/common/ModalConfirm.tsx
import React from 'react';
import BaseModal from '../../base/modal/BaseModal';

interface ModalConfirmProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

const ModalConfirm: React.FC<ModalConfirmProps> = (
{ isOpen, onClose, onConfirm, title, message, confirmText = 'Xác nhận', cancelText = 'Hủy'}) => {
    const modalFooter = (
        <div className="flex justify-end space-x-4">
            <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
            >
                {cancelText}
            </button>
            <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300"
            >
                {confirmText}
            </button>
        </div>
    );

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            footer={modalFooter}
        >
            <p className="text-gray-700">{message}</p>
        </BaseModal>
    );
};

export default ModalConfirm;
