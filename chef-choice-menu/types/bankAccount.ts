export interface BankAccount {
    id: string;
    user_id: string;
    account_number: string;
    account_name: string;
    bank_name: string;
    ifsc_code: string;
    balance: string;
    currency: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateBankAccountPayload {
    user_id: string;
    account_number: string;
    account_name: string;
    bank_name: string;
    ifsc_code: string;
    currency: string;
    is_active: boolean;
}

export interface UpdateBankAccountPayload {
    account_number?: string;
    account_name?: string;
    bank_name?: string;
    currency?: string;
    is_active?: boolean;
}

export interface BankAccountListResponse {
    count: number;
    limit: number;
    offset: number;
    results: BankAccount[];
}

export interface Transaction {
    id: string;
    transaction_type: 'DEPOSIT' | 'WITHDRAWAL'; // inferred from example, assuming these are types
    amount: string;
    reference: string;
    account: string;
    account_number: string;
    related_account: string | null;
    balance_after: string;
    created_at: string;
}

export interface TransactionListResponse {
    count: number;
    limit: number;
    offset: number;
    results: Transaction[];
}
