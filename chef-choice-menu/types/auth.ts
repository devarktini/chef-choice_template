export interface User {
    id: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    email: string;
    role: 'client' | 'service_provider';
    is_verified: boolean;
    account_status: string;
    profile_picture: string | null;
}

export interface ClientProfile {
    id: string;
    created_date: string;
    updated_date: string;
    meta_info: Record<string, any>;
    dietary_restrictions: string[];
    culinary_preferences: string[];
    user: string;
    favorite_chefs: string[];
}

export interface ServiceProviderProfile {
    id: string;
    created_date: string;
    updated_date: string;
    meta_info: Record<string, any>;
    user: string;
    // Add other service provider specific fields as needed
}

export interface Address {
    id: string;
    created_date: string;
    updated_date: string;
    meta_info: Record<string, any>;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    zip_code: string;
    label: string;
    user: string;
}

export interface Tokens {
    refresh: string;
    access: string;
}

export interface SendOTPResponse {
    message: string;
    status: number;
    expires_at: string;
}

export interface VerifyOTPResponse {
    message: string;
    status: number;
    tokens: Tokens;
    data: {
        user: User;
        client_profile: ClientProfile | null;
        service_provider: ServiceProviderProfile | null;
        address: Address | null;
    };
}

export interface AuthState {
    user: User | null;
    tokens: Tokens | null;
    clientProfile: ClientProfile | null;
    serviceProviderProfile: ServiceProviderProfile | null;
    address: Address | null;
    isAuthenticated: boolean;
    login: (data: VerifyOTPResponse['data'], tokens: Tokens) => void;
    logout: () => void;
    initializeAuth: () => void;
}
