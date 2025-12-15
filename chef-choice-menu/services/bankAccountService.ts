import { AuthService } from './authService';
import { BankAccount, BankAccountListResponse, CreateBankAccountPayload, UpdateBankAccountPayload } from '@/types/bankAccount';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export class BankAccountService {
    /**
     * Get all bank accounts for the logged-in user
     */
    static async getAll(): Promise<BankAccountListResponse> {
        try {
            const tokens = AuthService.getTokens();
            const response = await fetch(`${API_BASE_URL}/api/bank-accounts/accounts/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tokens.access}`,
                    'X-CSRFTOKEN': 'QHgRtHQQHJK1iaHYv8s8ATYycurgAksvWcOPTthWvj1peVCuW4w8fHQWy4kvgSwi', // Note: Ideally fetch from cookie or meta tag
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Failed to fetch bank accounts');
            }

            return await response.json();
        } catch (error) {
            console.error('Get Bank Accounts error:', error);
            throw error;
        }
    }

    /**
     * Create a new bank account
     */
    static async create(payload: CreateBankAccountPayload): Promise<BankAccount> {
        try {
            const tokens = AuthService.getTokens();
            const response = await fetch(`${API_BASE_URL}/api/bank-accounts/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens.access}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Failed to create bank account');
            }

            return await response.json();
        } catch (error) {
            console.error('Create Bank Account error:', error);
            throw error;
        }
    }

    /**
     * Update an existing bank account
     */
    static async update(id: string, payload: UpdateBankAccountPayload): Promise<BankAccount> {
        try {
            const tokens = AuthService.getTokens();
            const response = await fetch(`${API_BASE_URL}/api/bank-accounts/${id}/update/`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens.access}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Failed to update bank account');
            }

            return await response.json();
        } catch (error) {
            console.error('Update Bank Account error:', error);
            throw error;
        }
    }

    /**
     * Delete a bank account
     */
    static async delete(id: string): Promise<void> {
        try {
            const tokens = AuthService.getTokens();
            const response = await fetch(`${API_BASE_URL}/api/bank-accounts/${id}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tokens.access}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Failed to delete bank account');
            }
        } catch (error) {
            console.error('Delete Bank Account error:', error);
            throw error;
        }
    }

    /**
     * Get transactions for a bank account
     */
    static async getTransactions(accountId: string): Promise<any> {
        try {
            const tokens = AuthService.getTokens();
            const response = await fetch(`${API_BASE_URL}/api/bank-accounts/${accountId}/transactions/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tokens.access}`,
                    'X-CSRFTOKEN': 'DK0vE1ytRmafX7RcwPGo3GZ1JQUDYn6DJfyt4NZzFWrDTSMIXLKoIuRp5qNSEVaq', // Note: Should ideally be dynamic
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Failed to fetch transactions');
            }

            return await response.json();
        } catch (error) {
            console.error('Get Transactions error:', error);
            throw error;
        }
    }
}
