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
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 p-6 md:p-8 text-white shadow-md">
                    {/* Subtle Decorative Elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -ml-16 -mb-16"></div>

                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">🏦 Bank Accounts</h1>
                        <p className="text-blue-100">Manage and link your bank accounts for seamless payments</p>
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
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-10 text-center border-2 border-dashed border-blue-300">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                            <Landmark className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">No Bank Accounts Yet</h3>
                        <p className="text-gray-600 mt-2 max-w-sm mx-auto leading-relaxed">
                            Link your bank account to receive payments directly. Add your first account to get started.
                        </p>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="mt-5 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-semibold"
                        >
                            <Plus className="w-4 h-4 inline mr-2" />
                            Add Account
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {accounts.map((account, index) => (
                            <div
                                key={account.id}
                                className="group relative bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 overflow-hidden"
                                style={{
                                    animation: `fadeInUp 0.5s ease-out ${index * 0.05}s backwards`
                                }}
                            >
                                <style jsx>{`
                                    @keyframes fadeInUp {
                                        from {
                                            opacity: 0;
                                            transform: translateY(10px);
                                        }
                                        to {
                                            opacity: 1;
                                            transform: translateY(0);
                                        }
                                    }
                                `}</style>
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Landmark className="w-20 h-20 text-blue-500 transform rotate-12 translate-x-6 -translate-y-6" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-2.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg text-blue-600">
                                            <Landmark className="w-5 h-5" />
                                        </div>
                                        {account.is_active && (
                                            <span className="px-2.5 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-bold rounded-full border border-green-300">
                                                ✓ Active
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-base font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{account.bank_name}</h3>
                                    <p className="text-gray-500 text-sm mb-5">{account.account_name}</p>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-500 font-medium">Account No.</span>
                                            <span className="font-mono font-semibold text-gray-700">•••• {account.account_number.slice(-4)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-500 font-medium">IFSC Code</span>
                                            <span className="font-mono font-semibold text-gray-700">{account.ifsc_code}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-between items-center gap-1 pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => openTransactions(account.id)}
                                            className="flex-1 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-xs font-medium"
                                            title="View Transactions"
                                        >
                                            <CreditCard className="w-4 h-4 mx-auto" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedAccount(account);
                                                setIsEditModalOpen(true);
                                            }}
                                            className="flex-1 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-xs font-medium"
                                            title="Edit Account"
                                        >
                                            <Pencil className="w-4 h-4 mx-auto" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedAccount(account);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            className="flex-1 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs font-medium"
                                            title="Delete Account"
                                        >
                                            <Trash2 className="w-4 h-4 mx-auto" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Floating Action Button (FAB) */}
                <div className="fixed xl:bottom-8 bottom-28 right-8 z-30">
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
