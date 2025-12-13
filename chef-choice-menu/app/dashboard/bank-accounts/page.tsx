"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function BankAccountsPage() {
    return (
        <DashboardLayout>
            <div className="bg-white rounded-xl p-6 shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Bank Accounts</h1>
                <p className="text-gray-600">
                    Manage your bank accounts and payouts here. (Coming Soon)
                </p>
            </div>
        </DashboardLayout>
    );
}
