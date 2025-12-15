"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { BankAccount, CreateBankAccountPayload, UpdateBankAccountPayload } from '@/types/bankAccount';
import { useAuthStore } from '@/stores/authStore';

interface BankAccountFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (payload: CreateBankAccountPayload | UpdateBankAccountPayload) => void;
    initialData?: BankAccount | null;
    isLoading?: boolean;
}

export default function BankAccountFormModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isLoading = false
}: BankAccountFormModalProps) {
    const { user } = useAuthStore();
    const [formData, setFormData] = useState<CreateBankAccountPayload>({
        user_id: user?.id || '',
        account_number: '',
        account_name: '',
        bank_name: '',
        ifsc_code: '',
        currency: 'str', // Set default as per curl, user might want 'INR' later
        is_active: true
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                user_id: initialData.user_id,
                account_number: initialData.account_number,
                account_name: initialData.account_name,
                bank_name: initialData.bank_name,
                ifsc_code: initialData.ifsc_code,
                currency: initialData.currency,
                is_active: initialData.is_active
            });
        } else {
            // Reset form for create mode
            setFormData({
                user_id: user?.id || '',
                account_number: '',
                account_name: '',
                bank_name: '',
                ifsc_code: '',
                currency: 'str',
                is_active: true
            });
        }
    }, [initialData, user, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateIFSC = (ifsc: string) => {
        const regex = /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/;
        return regex.test(ifsc);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateIFSC(formData.ifsc_code)) {
            alert("Invalid IFSC format. Expected pattern: 'AAAA0XXXXXX'.");
            return;
        }

        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] h-[100dvh] w-screen flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Panel */}
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in m-auto flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">
                        {initialData ? 'Edit Bank Account' : 'Add Bank Account'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bank Name
                            </label>
                            <input
                                type="text"
                                name="bank_name"
                                value={formData.bank_name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. HDFC Bank"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Account Name
                            </label>
                            <input
                                type="text"
                                name="account_name"
                                value={formData.account_name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Account Number
                            </label>
                            <input
                                type="text"
                                name="account_number"
                                value={formData.account_number}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter account number"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                IFSC Code
                            </label>
                            <input
                                type="text"
                                name="ifsc_code"
                                value={formData.ifsc_code}
                                onChange={handleChange}
                                required
                                style={{ textTransform: 'uppercase' }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. HDFC0001234"
                            />
                        </div>

                        {/* Hidden currency field as per requirements mostly, but kept editable if needed or hidden */}
                        <input type="hidden" name="currency" value={formData.currency} />

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                                Set as Active Account
                            </label>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary-600 to-warm-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Saving...' : (initialData ? 'Update Account' : 'Add Account')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
