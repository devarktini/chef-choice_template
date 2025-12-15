
import { AuthService } from './authService';
import { Address } from '@/types/auth';

export interface Booking {
    id: string;
    client: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        profile_picture: string | null;
    };
    event_address: Address | null;
    created_date: string;
    updated_date: string;
    event_type: string;
    dates: Record<string, string>;
    food_cuisines_preferences: {
        type: string;
        cuisines: string[];
    };
    meal_timings: Record<string, { time: string; meals: string[] }>;
    menu_items_details: {
        items: string[];
    };
    booking_teams: any;
    guests: {
        adults: number;
        babies: number;
        children: number;
    };
    service_provider: {
        id: string;
        name: string;
        company_name: string;
        service_type: string;
        provider_type: string;
    };
    services_selections: {
        providers: string[];
    };
    request_status: string;
    token_amount_required?: number;
    payments?: {
        id: string;
        payment_type: 'token' | 'final';
        amount: number;
        status: 'success' | 'pending' | 'failed';
        created_at: string;
    }[];
    payment_details?: {
        id: string;
        payment_type: 'token' | 'final';
        amount: number;
        status: 'success' | 'pending' | 'failed';
        created_at: string;
        // Add other fields if known, or keep generic for now
    }[];
    // ... add other fields as needed
}

export interface BookingListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Booking[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export class BookingService {
    private static getHeaders() {
        const tokens = AuthService.getTokens();
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access}`,
        };
    }

    /**
     * Create a new booking request
     */
    static async createBooking(data: any): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/api/event-booking-requests/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(JSON.stringify(errorData) || 'Failed to create booking request');
        }

        return response.json();
    }

    /**
     * Get all bookings for the current user
     */
    static async getBookings(page: number = 1): Promise<BookingListResponse> {
        const response = await fetch(`${API_BASE_URL}/api/event-booking-requests/?page=${page}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch bookings');
        }

        return response.json();
    }

    /**
     * Update an existing booking request
     */
    static async updateBooking(id: string, data: any): Promise<Booking> {
        const response = await fetch(`${API_BASE_URL}/api/event-booking-requests/${id}/`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(JSON.stringify(errorData) || 'Failed to update booking request');
        }

        return response.json();
    }
}
