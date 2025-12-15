import { ServiceProviderProfile } from '@/types/auth';
import { AuthService } from './authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export class ProviderService {
    private static getHeaders() {
        const tokens = AuthService.getTokens();
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access}`,
        };
    }

    /**
     * Get current user's service provider profile
     */
    static async getProvider(): Promise<ServiceProviderProfile | null> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/service-providers/get-provider/`, {
                method: 'GET',
                headers: this.getHeaders(),
                cache: 'no-store',
            });

            if (response.status === 404) {
                // No provider profile exists yet
                return null;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch provider details');
            }

            return await response.json();
        } catch (error) {
            console.error('Get Provider error:', error);
            throw error;
        }
    }

    /**
     * Create a new service provider profile
     */
    static async createProvider(data: Partial<ServiceProviderProfile>): Promise<ServiceProviderProfile> {
        const response = await fetch(`${API_BASE_URL}/api/service-providers/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create provider profile');
        }

        return response.json();
    }

    /**
     * Update an existing service provider profile
     */
    static async updateProvider(id: string, data: Partial<ServiceProviderProfile>): Promise<ServiceProviderProfile> {
        const response = await fetch(`${API_BASE_URL}/api/service-providers/${id}/`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to update provider profile');
        }

        return response.json();
    }
}
