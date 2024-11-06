// components/base/BaseModal.tsx
import React from 'react';

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={onClose}>
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="relative bg-white w-full max-w-4xl mx-auto rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center p-6 border-b">
                        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                        {children}
                    </div>
                    <div className="border-t p-6 bg-gray-50">
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseModal;
