import { AuthService } from '@/services/authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

const getAuthHeaders = () => {
    const { access } = AuthService.getTokens();
    return {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json',
    };
};

export interface DashboardBookingStats {
    total: number;
    pending: number;
    approved: number;
    completed: number;
    upcoming: number;
}

export interface UserDashboardSummary {
    bookings: DashboardBookingStats;
    payments: {
        total_spent: number;
    };
    favorites: any[];
    reviews: any[];
    notifications: {
        unread: number;
    };
}

export interface ProviderDashboardSummary {
    bookings: DashboardBookingStats;
    earnings: {
        total_earnings: number;
        total_payouts_received: number;
        recent_payouts: any[];
    };
    reviews: any[];
    notifications: {
        unread: number;
    };
}

export const DashboardService = {
    async getUserSummary(): Promise<UserDashboardSummary> {
        const headers = getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}/api/dashboard/user-summary/`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user dashboard summary');
        }

        return response.json();
    },

    async getProviderSummary(): Promise<ProviderDashboardSummary> {
        const headers = getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}/api/dashboard/provider-summary/`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch provider dashboard summary');
        }

        return response.json();
    }
};
