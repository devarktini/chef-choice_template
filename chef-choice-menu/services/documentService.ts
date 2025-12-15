import { AuthService } from './authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export interface Document {
    id: string;
    service_provider: string;
    name: string;
    attachment: string;
    status: 'pending' | 'approved' | 'rejected';
    admin_comment: string | null;
    created_date: string;
    updated_date: string;
}

export class DocumentService {
    private static getHeaders(isMultipart = false) {
        const tokens = AuthService.getTokens();
        const headers: any = {
            'Authorization': `Bearer ${tokens.access}`,
        };

        // Content-Type should not be set manually for multipart/form-data
        // browser sets it automatically with boundary
        if (!isMultipart) {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    }

    /**
     * Get all documents
     */
    static async getDocuments(): Promise<Document[]> {
        const response = await fetch(`${API_BASE_URL}/api/documents/`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch documents');
        }

        return response.json();
    }

    /**
     * Add a new document
     */
    static async addDocument(formData: FormData): Promise<Document> {
        const response = await fetch(`${API_BASE_URL}/api/documents/add_documents/`, {
            method: 'POST',
            headers: this.getHeaders(true),
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || 'Failed to add document');
        }

        return response.json();
    }

    /**
     * Delete a document
     */
    static async deleteDocument(id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/api/documents/${id}/delete/`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || 'Failed to delete document');
        }
    }
}
