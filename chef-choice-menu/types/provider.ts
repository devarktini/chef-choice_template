// types/provider.ts
export interface ServiceProviderProfile1 {
  id: string;
  provider_type: string;
  service_type: string;
  company_name: string;
  experience_years: number;
  description: string;
  verified: boolean;
  avg_rating: number;
  review_count: number;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
  };
  services: any[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
