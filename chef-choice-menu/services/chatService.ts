import { AuthService } from './authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';


export interface ChatMessage {
    conversation_id: string;
    message: string;
}

export class ChatService {
    private static getHeaders() {
        const tokens = AuthService.getTokens();
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access}`,
        };
    }

    static async sendMessage(data: ChatMessage): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/api/chat/send/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(JSON.stringify(errorData) || 'Failed to send message');
        }

        return response.json();
    }

    static async syncMessages(conversationId: string, lastMessageId: string): Promise<any> {
        const params = new URLSearchParams({
            conversation_id: conversationId,
            last_message_id: lastMessageId,
        });

        const response = await fetch(`${API_BASE_URL}/api/chat/sync/?${params}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(JSON.stringify(errorData) || 'Failed to sync messages');
        }

        return response.json();
    }
}
