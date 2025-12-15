"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { BankAccountService } from '@/services/bankAccountService';
import { BankAccount, CreateBankAccountPayload, UpdateBankAccountPayload } from '@/types/bankAccount';
import BankAccountFormModal from '@/components/dashboard/bank/BankAccountFormModal';
import TransactionsModal from '@/components/dashboard/bank/TransactionsModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import { Plus, Edit2, Pencil, Trash2, Landmark, CreditCard, Building2 } from 'lucide-react';
// import { toast } from 'react-hot-toast'; 
// Checking package.json would be good but standard approach is usually to expect clean imports. 
// I will remove toast for now and use console/alert or create a simple notification system if needed, but likely the project has one. 
// Let's assume basic alert for errors if no toast provider found, BUT I saw no toast in deps list. 
// I will implement without toast for now or use a simple state for success message.
// Re-checking imports from other files... `components/ConfirmationModal.tsx` didn't use toast.
// Let's stick to simple UI feedback or assuming a provider exists.
// Actually, looking at `Sidebar.tsx`, icons are from `lucide-react`.
// Let's proceed.

export default function BankAccountsPage() {
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);

    // Delete confirmation state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    // const [accountToDelete, setAccountToDelete] = useState<string | null>(null); // Unused

    const fetchAccounts = async () => {
        try {
            setIsLoading(true);
            const response = await BankAccountService.getAll();
            setAccounts(response.results);
        } catch (error) {
            console.error('Failed to fetch accounts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
    const [selectedAccountForTransactions, setSelectedAccountForTransactions] = useState<string | null>(null);

    const handleCreate = async (data: CreateBankAccountPayload) => {
        try {
            await BankAccountService.create(data);
            setIsCreateModalOpen(false);
            fetchAccounts(); // Changed from loadAccounts to fetchAccounts
        } catch (error) {
            console.error('Failed to create account:', error);
            alert('Failed to create account');
        }
    };

    const handleUpdate = async (data: UpdateBankAccountPayload) => {
        if (!selectedAccount) return;
        try {
            await BankAccountService.update(selectedAccount.id, data);
            setIsEditModalOpen(false);
            setSelectedAccount(null);
            fetchAccounts(); // Changed from loadAccounts to fetchAccounts
        } catch (error) {
            console.error('Failed to update account:', error);
            alert('Failed to update account');
        }
    };

    const handleDelete = async () => {
        if (!selectedAccount) return;
        setIsDeleting(true);
        try {
            await BankAccountService.delete(selectedAccount.id);
            setIsDeleteModalOpen(false);
            setSelectedAccount(null);
            fetchAccounts(); // Changed from loadAccounts to fetchAccounts
        } catch (error) {
            console.error('Failed to delete account:', error);
            alert('Failed to delete account');
        } finally {
            setIsDeleting(false);
        }
    };

    const openTransactions = (accountId: string) => {
        setSelectedAccountForTransactions(accountId);
        setIsTransactionsModalOpen(true);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 relative h-full min-h-[calc(100vh-8rem)]">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Bank Accounts</h1>
                        <p className="text-gray-500 mt-1">Manage your linked bank accounts</p>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-48 animate-pulse"></div>
                        ))}
                    </div>
                ) : accounts.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Landmark className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">No Bank Accounts</h3>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                            Link your bank account to receive payments directly to your account.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {accounts.map((account) => (
                            <div
                                key={account.id}
                                className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Landmark className="w-24 h-24 text-primary-500 transform rotate-12 translate-x-8 -translate-y-8" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                                            <Landmark className="w-6 h-6" />
                                        </div>
                                        {account.is_active && (
                                            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                                Active
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-800 mb-1">{account.bank_name}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{account.account_name}</p>

                                    <div className="space-y-2 mb-8">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">Account No.</span>
                                            <span className="font-mono font-medium text-gray-700">
                                                •••• {account.account_number.slice(-4)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">IFSC Code</span>
                                            <span className="font-mono font-medium text-gray-700">{account.ifsc_code}</span>
                                        </div>
                                    </div>

                                    {/* Actions moved to bottom right */}
                                    <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                                        <button
                                            onClick={() => openTransactions(account.id)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View Transactions"
                                        >
                                            <CreditCard className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedAccount(account);
                                                setIsEditModalOpen(true);
                                            }}
                                            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                            title="Edit Account"
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedAccount(account);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Account"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Floating Action Button (FAB) */}
                <div className="fixed bottom-8 right-8 z-30">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary-600 to-warm-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                        title="Add New Account"
                    >
                        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                {/* Modals */}
                <BankAccountFormModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={(data) => handleCreate(data as CreateBankAccountPayload)}
                />

                <BankAccountFormModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedAccount(null);
                    }}
                    onSubmit={(data) => handleUpdate(data as UpdateBankAccountPayload)}
                    initialData={selectedAccount}
                />

                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    title="Delete Bank Account"
                    message={`Are you sure you want to delete the account "${selectedAccount?.bank_name}"? This action cannot be undone.`}
                    onConfirm={handleDelete}
                    onCancel={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedAccount(null);
                    }}
                    isLoading={isDeleting}
                    isDanger={true}
                />

                <TransactionsModal
                    isOpen={isTransactionsModalOpen}
                    onClose={() => {
                        setIsTransactionsModalOpen(false);
                        setSelectedAccountForTransactions(null);
                    }}
                    accountId={selectedAccountForTransactions}
                />
            </div>
        </DashboardLayout>
    );
}
