import { SendOTPResponse, VerifyOTPResponse } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export class AuthService {
    /**
     * Send OTP to the provided phone number
     */
    static async sendOTP(phoneNumber: string): Promise<SendOTPResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/send-otp/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: phoneNumber,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to send OTP');
            }

            const data: SendOTPResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Send OTP error:', error);
            throw error;
        }
    }

    /**
     * Verify OTP code
     */
    static async verifyOTP(phoneNumber: string, code: string, role?: string): Promise<VerifyOTPResponse> {
        try {
            const body: any = {
                phone_number: phoneNumber,
                code: code,
            };

            if (role) {
                body.role = role;
            }

            const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Invalid OTP');
            }

            const data: VerifyOTPResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Verify OTP error:', error);
            throw error;
        }
    }

    /**
     * Store tokens in localStorage
     */
    static storeTokens(access: string, refresh: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
        }
    }

    /**
     * Get stored tokens
     */
    static getTokens(): { access: string | null; refresh: string | null } {
        if (typeof window !== 'undefined') {
            return {
                access: localStorage.getItem('access_token'),
                refresh: localStorage.getItem('refresh_token'),
            };
        }
        return { access: null, refresh: null };
    }

    /**
     * Clear stored tokens
     */
    static clearTokens(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_data');
        }
    }

    /**
     * Store user data in localStorage
     */
    static storeUserData(data: any): void {
    
        if (typeof window !== 'undefined') {
            localStorage.setItem('user_data', JSON.stringify(data));
        }
    }

    /**
     * Get stored user data
     */
    static getUserData(): any {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('user_data');
            return data ? JSON.parse(data) : null;
        }
        return null;
    }
    /**
     * Get user details
     */
    static async getUser(userId: string): Promise<any> {
        try {
            const tokens = this.getTokens();
            const response = await fetch(`${API_BASE_URL}/api/users/${userId}/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tokens.access}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to fetch user details');
            }

            return await response.json();
        } catch (error) {
            console.error('Get User error:', error);
            throw error;
        }
    }

        static async getUser1(): Promise<any> {
        try {
            const tokens = this.getTokens();
            const response = await fetch(`${API_BASE_URL}/api/users/me/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tokens.access}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to fetch user details');
            }

            return await response.json();
        } catch (error) {
            console.error('Get User error:', error);
            throw error;
        }
    }

    /**
     * Update user profile
     */
    static async updateUserProfile(formData: FormData): Promise<any> {
        try {
            const tokens = this.getTokens();
            const response = await fetch(`${API_BASE_URL}/api/update-user-profile/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${tokens.access}`,
                    // Content-Type is left empty to let the browser set it with the boundary for FormData
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to update profile');
            }

            return await response.json();
        } catch (error) {
            console.error('Update Profile error:', error);
            throw error;
        }
    }

    /**
     * Update user role
     */
    static async updateUserRole(userId: string, role: string, tokens: any): Promise<any> {
        console.log("ssss", userId, role)
        try {
            // const tokens = this.getTokens();
            // console.log("ssss", tokens)
            const response = await fetch(`${API_BASE_URL}/api/users/${userId}/update-role/`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens.access}`,
                },
                body: JSON.stringify({ role }),
            });
            console.log("Ssss", response)

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to update user role');
            }

            return await response.json();
        } catch (error) {
            console.error('Update User Role error:', error);
            throw error;
        }
    }
}
