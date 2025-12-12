import { create } from 'zustand';
import { AuthState, Tokens, VerifyOTPResponse } from '@/types/auth';
import { AuthService } from '@/services/authService';

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    tokens: null,
    clientProfile: null,
    serviceProviderProfile: null,
    address: null,
    isAuthenticated: false,

    login: (data: VerifyOTPResponse['data'], tokens: Tokens) => {
        // Store tokens
        AuthService.storeTokens(tokens.access, tokens.refresh);

        // Store user data
        AuthService.storeUserData(data);

        // Update state
        set({
            user: data.user,
            tokens: tokens,
            clientProfile: data.client_profile,
            serviceProviderProfile: data.service_provider,
            address: data.address,
            isAuthenticated: true,
        });
    },

    logout: () => {
        // Clear tokens and user data
        AuthService.clearTokens();

        // Reset state
        set({
            user: null,
            tokens: null,
            clientProfile: null,
            serviceProviderProfile: null,
            address: null,
            isAuthenticated: false,
        });
    },

    initializeAuth: () => {
        // Check if user is already logged in
        const tokens = AuthService.getTokens();
        const userData = AuthService.getUserData();

        if (tokens.access && userData) {
            set({
                user: userData.user,
                tokens: { access: tokens.access, refresh: tokens.refresh || '' },
                clientProfile: userData.client_profile,
                serviceProviderProfile: userData.service_provider,
                address: userData.address,
                isAuthenticated: true,
            });
        }
    },
}));
