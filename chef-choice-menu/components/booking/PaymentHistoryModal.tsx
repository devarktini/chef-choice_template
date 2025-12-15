
import { X, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Booking } from '@/services/bookingService';

interface PaymentHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking?: Booking;
}

export default function PaymentHistoryModal({ isOpen, onClose, booking }: PaymentHistoryModalProps) {
    if (!isOpen || !booking) return null;

    // detail: User requested "payments_details object list".
    // Fallback to 'payments' if 'payment_details' is empty/undefined, or vice versa.
    const payments = booking.payment_details || booking.payments || [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'failed':
                return 'text-red-600 bg-red-50 border-red-200';
            case 'pending':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return <CheckCircle2 className="w-4 h-4" />;
            case 'failed':
                return <AlertCircle className="w-4 h-4" />;
            case 'pending':
                return <Clock className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Payment History</h2>
                        <p className="text-sm text-gray-500">Booking #{booking.id.slice(0, 8)}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {payments.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No payment records found for this booking.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {payments.map((payment) => (
                                <div key={payment.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${payment.payment_type === 'token' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                                {payment.payment_type}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {new Date(payment.created_at).toLocaleDateString()} {new Date(payment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="font-mono text-xs text-gray-400 mt-1 truncate max-w-[200px]" title={payment.id}>ID: {payment.id}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-800">₹{payment.amount.toLocaleString()}</p>
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)} animate-in fade-in`}>
                                            {getStatusIcon(payment.status)}
                                            <span className="capitalize">{payment.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center text-sm">
                    <span className="text-gray-500">Total Paid:</span>
                    <span className="font-bold text-gray-800 text-lg">
                        ₹{payments.filter(p => ['success', 'captured'].includes(p.status?.toLowerCase())).reduce((sum, p) => sum + Number(p.amount || 0), 0).toLocaleString()}
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
