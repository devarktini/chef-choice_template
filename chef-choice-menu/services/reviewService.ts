import { AuthService } from './authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export interface ReviewData {
    rating: number;
    comment: string;
    booking: string;
    client: string;
    service_provider: string;
}

export class ReviewService {
    private static getHeaders() {
        const tokens = AuthService.getTokens();
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access}`,
        };
    }

    static async createReview(data: ReviewData): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/api/reviews/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(JSON.stringify(errorData) || 'Failed to submit review');
        }

        return response.json();
    }
}
