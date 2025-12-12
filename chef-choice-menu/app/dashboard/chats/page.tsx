"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Send, Search } from 'lucide-react';
import { useState } from 'react';

export default function ChatsPage() {
    const [selectedChat, setSelectedChat] = useState(1);
    const [message, setMessage] = useState('');

    // Dummy chat data
    const conversations = [
        {
            id: 1,
            name: 'Chef John Doe',
            lastMessage: 'Looking forward to cooking for you!',
            time: '2h ago',
            unread: 2,
            avatar: 'JD',
        },
        {
            id: 2,
            name: 'Chef Jane Smith',
            lastMessage: 'What time works best for you?',
            time: '5h ago',
            unread: 0,
            avatar: 'JS',
        },
        {
            id: 3,
            name: 'Chef Mike Johnson',
            lastMessage: 'I can accommodate your dietary needs',
            time: '1d ago',
            unread: 1,
            avatar: 'MJ',
        },
    ];

    const messages = [
        {
            id: 1,
            sender: 'chef',
            text: 'Hello! Thank you for booking with me.',
            time: '10:00 AM',
        },
        {
            id: 2,
            sender: 'user',
            text: 'Hi! I\'m excited about the dinner.',
            time: '10:05 AM',
        },
        {
            id: 3,
            sender: 'chef',
            text: 'Do you have any dietary restrictions I should know about?',
            time: '10:10 AM',
        },
        {
            id: 4,
            sender: 'user',
            text: 'No specific restrictions, but I prefer vegetarian options.',
            time: '10:15 AM',
        },
        {
            id: 5,
            sender: 'chef',
            text: 'Perfect! I\'ll prepare a special vegetarian menu for you. Looking forward to cooking for you!',
            time: '10:20 AM',
        },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
                    <p className="text-gray-600 mt-1">Chat with your chefs</p>
                </div>

                {/* Chat Interface */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-[calc(100vh-16rem)]">
                    <div className="flex h-full">
                        {/* Conversations List */}
                        <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
                            {/* Search */}
                            <div className="p-4 border-b border-gray-200">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search conversations..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            {/* Conversation List */}
                            <div className="flex-1 overflow-y-auto">
                                {conversations.map((conv) => (
                                    <div
                                        key={conv.id}
                                        onClick={() => setSelectedChat(conv.id)}
                                        className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${selectedChat === conv.id ? 'bg-primary-50' : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-warm-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                                {conv.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-semibold text-gray-800 truncate">{conv.name}</h3>
                                                    <span className="text-xs text-gray-500">{conv.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                                            </div>
                                            {conv.unread > 0 && (
                                                <span className="bg-primary-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                                                    {conv.unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="hidden md:flex md:w-2/3 flex-col">
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-warm-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {conversations.find(c => c.id === selectedChat)?.avatar}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {conversations.find(c => c.id === selectedChat)?.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">Active now</p>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user'
                                                    ? 'bg-gradient-to-r from-primary-500 to-warm-500 text-white'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            <p>{msg.text}</p>
                                            <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                                                {msg.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-gray-200">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    />
                                    <button className="bg-gradient-to-r from-primary-500 to-warm-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
