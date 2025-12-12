"use client";

import { X, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
    isDanger?: boolean;
}

export default function ConfirmationModal({
    isOpen,
    title = "Confirm Action",
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    isLoading = false,
    isDanger = false
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] h-[100dvh] w-screen flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={isLoading ? undefined : onCancel}
            ></div>

            {/* Modal Panel */}
            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in m-auto">
                <div className="p-6 text-center">
                    <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isDanger ? 'bg-red-100 text-red-600' : 'bg-primary-50 text-primary-600'}`}>
                        <AlertTriangle className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {title}
                    </h3>

                    <p className="text-gray-600 mb-6">
                        {message}
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`flex-1 px-4 py-2 rounded-lg text-white font-medium shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${isDanger
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-gradient-to-r from-primary-500 to-warm-500 hover:scale-105'
                                }`}
                        >
                            {isLoading ? 'Processing...' : confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
