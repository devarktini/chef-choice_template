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
    provider_type: 'individual' | 'company';
    service_type: string;
    provides: string;
    service_area: string;
    company_name: string;
    experience_years: number;
    specialization: Record<string, any> | string[]; // Can be an object (from GET) or list (our intent) - making flexible
    description: string;
    services: Record<string, any>;
    verified: boolean;
    avg_rating: number;
    review_count: number;
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
    updateUser: (user: User) => void;
}
