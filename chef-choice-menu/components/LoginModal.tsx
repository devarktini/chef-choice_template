"use client";

import { useState, useEffect } from 'react';
import { X, Phone, Lock } from 'lucide-react';
import { AuthService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [role, setRole] = useState<'client' | 'service_provider'>('client');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [expiresAt, setExpiresAt] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(0);

    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    // Countdown timer for OTP expiration
    useEffect(() => {
        if (expiresAt) {
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const expiry = new Date(expiresAt).getTime();
                const diff = Math.floor((expiry - now) / 1000);

                if (diff <= 0) {
                    setCountdown(0);
                    clearInterval(interval);
                } else {
                    setCountdown(diff);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [expiresAt]);

    const handleSendOTP = async () => {
        if (!phoneNumber || phoneNumber.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await AuthService.sendOTP(phoneNumber);
            setExpiresAt(response.expires_at);
            setStep('otp');
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await AuthService.verifyOTP(phoneNumber, otp);

            // Store authentication data
            // We assume the verified token allows us to proceed.
            login(response.data, response.tokens);

            // Close modal and redirect to dashboard
            onClose();
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setPhoneNumber('');
        setOtp('');
        setStep('phone');
        setRole('client');
        setError('');
        setExpiresAt(null);
        setCountdown(0);
        onClose();
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setOtp(value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setPhoneNumber(value);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] h-[100dvh] w-screen flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={handleClose}
            ></div>

            {/* Modal Panel */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in m-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {step === 'phone' ? 'Login' : 'Verify OTP'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {step === 'phone' ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={handlePhoneChange}
                                        placeholder="Enter 10-digit phone number"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleSendOTP}
                                disabled={loading || phoneNumber.length !== 10}
                                className="w-full bg-gradient-to-r from-primary-500 to-warm-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? 'Sending...' : 'Generate OTP'}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="text-center space-y-2">
                                <p className="text-gray-600">
                                    OTP sent to <span className="font-semibold">{phoneNumber}</span>
                                </p>
                                {countdown > 0 && (
                                    <p className="text-sm text-primary-600">
                                        Expires in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter OTP
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        placeholder="Enter 6-digit OTP"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-center text-2xl tracking-widest font-semibold"
                                        disabled={loading}
                                        maxLength={6}
                                    />
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    I am a
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setRole('client')}
                                        className={`p-3 rounded-lg border-2 transition-all font-medium ${role === 'client'
                                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                : 'border-gray-200 hover:border-primary-200 text-gray-600'
                                            }`}
                                    >
                                        Client
                                    </button>
                                    <button
                                        onClick={() => setRole('service_provider')}
                                        className={`p-3 rounded-lg border-2 transition-all font-medium ${role === 'service_provider'
                                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                : 'border-gray-200 hover:border-primary-200 text-gray-600'
                                            }`}
                                    >
                                        Service Provider
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-3">
                                <button
                                    onClick={handleVerifyOTP}
                                    disabled={loading || otp.length !== 6}
                                    className="w-full bg-gradient-to-r from-primary-500 to-warm-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {loading ? 'Verifying...' : 'Verify & Login'}
                                </button>

                                <button
                                    onClick={() => {
                                        setStep('phone');
                                        setOtp('');
                                        setError('');
                                        setExpiresAt(null);
                                    }}
                                    className="w-full text-gray-600 hover:text-primary-500 py-2 font-medium transition-colors"
                                    disabled={loading}
                                >
                                    Change Phone Number
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
