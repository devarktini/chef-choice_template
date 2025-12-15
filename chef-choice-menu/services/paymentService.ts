import { AuthService } from './authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export interface CreateOrderResponse {
    order_id: string;
    amount: number;
    currency?: string;
    key?: string; // API returns 'key'
    key_id?: string; // Handle both just in case
    payment_id_db?: string;
}

export interface VerifyPaymentData {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export class PaymentService {
    private static getHeaders() {
        const tokens = AuthService.getTokens();
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access}`,
        };
    }

    /**
     * Create a Razorpay Order for a Booking
     */
    /**
     * Create a Razorpay Order for a Booking
     */
    static async createOrder(bookingId: string, amount: number, paymentType: 'token' | 'final' = 'token'): Promise<CreateOrderResponse> {
        const response = await fetch(`${API_BASE_URL}/api/razor-pay/${bookingId}/create_order/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({
                amount: amount.toString(),
                payment_type: paymentType
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(JSON.stringify(errorData) || 'Failed to create payment order');
        }

        return response.json();
    }

    /**
     * Verify a successful Razorpay Payment
     */
    static async verifyPayment(bookingId: string, data: VerifyPaymentData): Promise<{ status: string; message: string }> {
        const response = await fetch(`${API_BASE_URL}/api/razor-pay/${bookingId}/verify_payment/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(JSON.stringify(errorData) || 'Payment verification failed');
        }

        return response.json();
    }
}
