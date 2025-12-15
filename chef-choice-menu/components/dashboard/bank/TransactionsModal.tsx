"use client";

import { useState, useEffect, useCallback } from 'react';
import { X, Search, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { BankAccountService } from '@/services/bankAccountService';
import { Transaction } from '@/types/bankAccount';

interface TransactionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    accountId: string | null;
}

export default function TransactionsModal({ isOpen, onClose, accountId }: TransactionsModalProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<'ALL' | 'DEPOSIT' | 'WITHDRAWAL'>('ALL');

    const fetchTransactions = useCallback(async () => {
        if (!accountId) return;
        try {
            setIsLoading(true);
            const response = await BankAccountService.getTransactions(accountId);
            setTransactions(response.results);
            setFilteredTransactions(response.results);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        } finally {
            setIsLoading(false);
        }
    }, [accountId]);

    const filterTransactions = useCallback(() => {
        let result = [...transactions];

        // Search by reference or amount
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(
                (t) =>
                    t.reference.toLowerCase().includes(lowerTerm) ||
                    t.amount.includes(lowerTerm)
            );
        }

        // Filter by type
        if (typeFilter !== 'ALL') {
            result = result.filter((t) => t.transaction_type === typeFilter);
        }

        setFilteredTransactions(result);
    }, [searchTerm, typeFilter, transactions]);

    useEffect(() => {
        if (isOpen && accountId) {
            fetchTransactions();
        } else {
            // Reset state when closed
            setTransactions([]);
            setFilteredTransactions([]);
            setSearchTerm('');
            setTypeFilter('ALL');
        }
    }, [isOpen, accountId, fetchTransactions]);

    useEffect(() => {
        filterTransactions();
    }, [filterTransactions]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] h-[100dvh] w-screen flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Panel */}
            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in m-auto flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Transactions</h2>
                        <p className="text-sm text-gray-500">View transaction history</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Filters */}
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search reference or amount..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm transition-all"
                        />
                    </div>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as any)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer"
                    >
                        <option value="ALL">All Types</option>
                        <option value="DEPOSIT">Deposits</option>
                        <option value="WITHDRAWAL">Withdrawals</option>
                    </select>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    {isLoading ? (
                        <div className="space-y-4 animate-pulse">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="bg-gray-50 rounded-xl h-16"></div>
                            ))}
                        </div>
                    ) : filteredTransactions.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No transactions found matching your criteria.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredTransactions.map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${transaction.transaction_type === 'DEPOSIT'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                            }`}>
                                            {transaction.transaction_type === 'DEPOSIT' ? (
                                                <ArrowDownLeft className="w-5 h-5" />
                                            ) : (
                                                <ArrowUpRight className="w-5 h-5" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 text-sm">
                                                {transaction.transaction_type}
                                            </p>
                                            <p className="text-xs text-gray-500 font-mono mt-0.5" title={transaction.reference}>
                                                Ref: {transaction.reference || '-'}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {new Date(transaction.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold text-sm ${transaction.transaction_type === 'DEPOSIT' ? 'text-green-600' : 'text-gray-800'
                                            }`}>
                                            {transaction.transaction_type === 'DEPOSIT' ? '+' : '-'}
                                            {transaction.amount}
                                        </p>
                                        <p className="text-xs text-gray-500 font-mono mt-0.5">
                                            Bal: {transaction.balance_after}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
