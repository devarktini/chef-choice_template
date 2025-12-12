import { Address } from '@/types/auth';
import { AuthService } from './authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export class AddressService {
    private static getHeaders() {
        const tokens = AuthService.getTokens();
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access}`,
        };
    }

    /**
     * Get all addresses for the current user
     */
    static async getAddresses(): Promise<Address[]> {
        const response = await fetch(`${API_BASE_URL}/api/addresses/`, {
            method: 'GET',
            headers: this.getHeaders(),
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch addresses');
        }

        const data = await response.json();
        return Array.isArray(data) ? data : (data.results || []);
    }

    /**
     * Create a new address
     */
    static async createAddress(data: Partial<Address>): Promise<Address> {
        const response = await fetch(`${API_BASE_URL}/api/addresses/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create address');
        }

        return response.json();
    }

    /**
     * Update an existing address
     */
    static async updateAddress(id: string, data: Partial<Address>): Promise<Address> {
        const response = await fetch(`${API_BASE_URL}/api/addresses/${id}/`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to update address');
        }

        return response.json();
    }

    /**
     * Delete an address
     */
    static async deleteAddress(id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/api/addresses/${id}/`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to delete address');
        }
    }
}
