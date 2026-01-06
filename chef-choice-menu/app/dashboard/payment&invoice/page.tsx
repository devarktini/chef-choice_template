"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Download, Eye, FileText, CreditCard, Calendar, Search, Filter, ChevronDown, CheckCircle, Clock, X } from 'lucide-react';
import { PaymentService } from '@/services/paymentService';

interface PaymentTransaction {
  id: string;
  booking_details: {
    id: string;
    event_type: string;
    dates: Record<string, string>;
    guests: {
      adults: number;
      babies: number;
      children: number;
    };
    request_status: string;
    estimated_cost: number | null;
  };
  client_name: string;
  client_email: string;
  client_phone: string;
  created_date: string;
  updated_date: string;
  meta_info: Record<string, any>;
  payment_type: string;
  amount: string;
  razorpay_order_id: string;
  status: string;
  created_at: string;
  booking: string;
}

const PaymentInvoicePage = () => {
  const [activeTab, setActiveTab] = useState<'payments' | 'invoices'>('payments');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [paymentTransactions, setPaymentTransactions] = useState<PaymentTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentTransaction | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Fetch payment transactions on component mount
  useEffect(() => {
    const fetchPaymentTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await PaymentService.searchPaymentTransactions();
        setPaymentTransactions(response.results || []);
      } catch (err) {
        console.error('Error fetching payment transactions:', err);
        setError('Failed to load payment history. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentTransactions();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
      case 'overdue':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Generate invoice PDF
  const generateInvoicePDF = (payment: PaymentTransaction) => {
    const eventDates = Object.keys(payment.booking_details.dates)[0];
    const totalGuests = payment.booking_details.guests.adults + 
                        payment.booking_details.guests.children + 
                        payment.booking_details.guests.babies;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice ${payment.id}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; }
          .invoice-container { background-color: white; padding: 40px; margin: 0 auto; max-width: 800px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 3px solid #10b981; padding-bottom: 20px; }
          .logo { font-size: 28px; font-weight: bold; color: #10b981;, width: 50px;  }
          .invoice-title { text-align: right; }
          .invoice-title h1 { font-size: 24px; color: #333; margin-bottom: 5px; }
          .invoice-title p { color: #666; font-size: 14px; }
          .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
          .details-section h3 { font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 8px; font-weight: bold; }
          .details-section p { color: #333; margin-bottom: 5px; font-size: 14px; }
          .items-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
          .items-table th { background-color: #f3f4f6; padding: 12px; text-align: left; font-weight: bold; color: #333; border-bottom: 2px solid #e5e7eb; }
          .items-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
          .items-table tr:last-child td { border-bottom: 2px solid #e5e7eb; }
          .total-section { text-align: right; margin-bottom: 40px; }
          .total-row { display: flex; justify-content: flex-end; gap: 40px; margin-bottom: 8px; }
          .total-label { font-weight: bold; color: #333; width: 150px; }
          .total-value { width: 100px; color: #333; }
          .grand-total { display: flex; justify-content: flex-end; gap: 40px; padding-top: 12px; border-top: 2px solid #10b981; }
          .grand-total .total-label { font-size: 16px; color: #10b981; }
          .grand-total .total-value { font-size: 16px; font-weight: bold; color: #10b981; }
          .footer { text-align: center; color: #666; font-size: 12px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          .status-badge { display: inline-block; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: capitalize; }
          .status-paid { background-color: #d1fae5; color: #065f46; }
          .status-pending { background-color: #fef3c7; color: #92400e; }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
           <div class="logo">
                <img 
                  src="https://res.cloudinary.com/dzvvb0z0h/image/upload/f_auto,q_auto/v1757953170/removeb_sxbskt.png" 
                  alt="Chef Choice Logo" 
                  class=""
                />
              </div>
            <div class="invoice-title">
              <h1>INVOICE</h1>
              <p>Transaction ID: ${payment.id}</p>
            </div>
          </div>

          <div class="details-grid">
            <div>
              <h3>Bill To</h3>
              <p><strong>${payment.client_name}</strong></p>
              <p>${payment.client_email}</p>
              <p>${payment.client_phone}</p>
            </div>
            <div>
              <h3>Invoice Details</h3>
              <p><strong>Invoice Date:</strong> ${new Date(payment.created_date).toLocaleDateString()}</p>
              <p><strong>Payment Type:</strong> ${payment.payment_type.charAt(0).toUpperCase() + payment.payment_type.slice(1)}</p>
              <p><strong>Status:</strong> <span class="status-badge status-${payment.status}">${payment.status}</span></p>
            </div>
          </div>

          <div class="details-grid">
            <div>
              <h3>Event Details</h3>
              <p><strong>Event Type:</strong> ${payment.booking_details.event_type.charAt(0).toUpperCase() + payment.booking_details.event_type.slice(1)}</p>
              <p><strong>Event Date:</strong> ${eventDates}</p>
              <p><strong>Total Guests:</strong> ${totalGuests}</p>
              <p style="margin-top: 10px; color: #666; font-size: 12px;">
                Adults: ${payment.booking_details.guests.adults} | 
                Children: ${payment.booking_details.guests.children} | 
                Babies: ${payment.booking_details.guests.babies}
              </p>
            </div>
            <div>
              <h3>Payment Method</h3>
              <p><strong>Order ID:</strong> ${payment.razorpay_order_id}</p>
              <p><strong>Created:</strong> ${new Date(payment.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <table class="items-table">
            <thead>
              <tr>
                <th style="text-align: left; width: 60%;">Description</th>
                <th style="text-align: right; width: 20%;">Quantity</th>
                <th style="text-align: right; width: 20%;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Catering & Event Services</td>
                <td style="text-align: right;">1</td>
                <td style="text-align: right;">₹${parseFloat(payment.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>

          <div class="total-section">
            <div class="total-row">
              <div class="total-label">Subtotal</div>
              <div class="total-value">₹${parseFloat(payment.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            <div class="total-row">
              <div class="total-label">Tax (0%)</div>
              <div class="total-value">₹0.00</div>
            </div>
            <div class="grand-total">
              <div class="total-label">Total Amount</div>
              <div class="total-value">₹${parseFloat(payment.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for your business! For any queries, please contact us at support@chefchoice.com</p>
            <p style="margin-top: 10px;">This invoice was generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${payment.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Filter payment transactions
  const filteredPayments = paymentTransactions.filter(payment => {
    const matchesSearch = payment.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.client_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.razorpay_order_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#e59f4a] to-orange-600 p-8 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">💰 Payments & Invoices</h1>
            <p className="text-green-100 text-sm md:text-base">Manage your transactions and download invoices</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 bg-white rounded-t-xl">
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-6 py-3 font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'payments'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            Payment History
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-xl shadow-md">
          {/* Payment History Tab */}
          <div className="p-6 space-y-4">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className="px-4 py-2.5 border-2 border-gray-300 rounded-lg hover:border-green-500 transition-colors flex items-center gap-2 font-semibold text-gray-700 bg-gray-50"
                  >
                    <Filter className="w-5 h-5" />
                    Status
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showFilterMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
                      {['all', 'paid', 'pending'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setStatusFilter(status);
                            setShowFilterMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 hover:bg-green-50 transition-colors capitalize font-semibold ${
                            statusFilter === status ? 'bg-green-100 text-green-700' : 'text-gray-700'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-12">
                  <div className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500 font-semibold">Loading payment history...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-700 font-semibold">{error}</p>
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredPayments.length === 0 && (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-semibold">No payment history found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                </div>
              )}

              {/* Payments List */}
              {!loading && filteredPayments.length > 0 && (
                <div className="space-y-3">
                  {filteredPayments.map((payment, index) => (
                    <div
                      key={payment.id}
                      className="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 hover:border-green-400 rounded-xl p-5 transition-all hover:shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 0.08}s backwards`
                      }}
                    >
                      <style jsx>{`
                        @keyframes fadeInUp {
                          from {
                            opacity: 0;
                            transform: translateY(12px);
                          }
                          to {
                            opacity: 1;
                            transform: translateY(0);
                          }
                        }
                      `}</style>
                      
                      {/* Payment Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">{payment.client_name}</p>
                          <p className="text-xs text-gray-500">{payment.client_email}</p>
                          <p className="text-xs text-gray-400 mt-1">{payment.booking_details.event_type} • {Object.keys(payment.booking_details.dates)[0]}</p>
                        </div>
                      </div>

                      {/* Payment Type */}
                      <div className="text-left md:text-center">
                        <p className="text-sm font-semibold text-gray-700 capitalize">{payment.payment_type} Payment</p>
                        <p className="text-xs text-gray-500">{new Date(payment.created_date).toLocaleDateString()}</p>
                      </div>

                      {/* Amount */}
                      <div className="text-left md:text-right">
                        <p className="text-2xl font-bold text-gray-900">₹{parseFloat(payment.amount).toLocaleString('en-IN')}</p>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 flex items-center gap-1 ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                        <button 
                          onClick={() => {
                            setSelectedPayment(payment);
                            setShowInvoiceModal(true);
                          }}
                          className="p-2.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors hidden md:block"
                          title="View Invoice"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => {
                            if (selectedPayment?.id !== payment.id) {
                              setSelectedPayment(payment);
                            }
                            generateInvoicePDF(payment);
                          }}
                          className="px-4 py-2.5 bg-gradient-to-r from-[#e59f4a] to-[#e69532] text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          <span className="hidden sm:inline">Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        {/* Invoice Modal */}
        {showInvoiceModal && selectedPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 flex justify-between items-center border-b">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Invoice Details
                </h2>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content - Invoice Display */}
              <div className="p-8 bg-white">
                {/* Invoice Header */}
                <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-200">
                  <div>
                    <h1 className="text-3xl font-bold text-green-600">INVOICE</h1>
                    <p className="text-gray-600 text-sm mt-2">Transaction ID: {selectedPayment.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Invoice Date</p>
                    <p className="font-bold text-gray-900">{new Date(selectedPayment.created_date).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Client and Invoice Details */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-sm font-bold text-gray-600 uppercase mb-3">Bill To</h3>
                    <p className="font-bold text-gray-900 text-lg">{selectedPayment.client_name}</p>
                    <p className="text-gray-600 text-sm mt-1">{selectedPayment.client_email}</p>
                    <p className="text-gray-600 text-sm">{selectedPayment.client_phone}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-sm font-bold text-gray-600 uppercase mb-3">Invoice Info</h3>
                    <p className="text-gray-600 text-sm"><span className="font-semibold">Order ID:</span> {selectedPayment.razorpay_order_id}</p>
                    <p className="text-gray-600 text-sm mt-2"><span className="font-semibold">Payment Type:</span> <span className="capitalize">{selectedPayment.payment_type}</span></p>
                    <p className="text-gray-600 text-sm mt-2 flex justify-end items-center gap-2">
                      <span className="font-semibold">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(selectedPayment.status)}`}>
                        {selectedPayment.status}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Event Details */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
                  <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Event Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">Event Type</p>
                      <p className="font-bold text-gray-900 capitalize">{selectedPayment.booking_details.event_type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">Event Date</p>
                      <p className="font-bold text-gray-900">{Object.keys(selectedPayment.booking_details.dates)[0]}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">Total Guests</p>
                      <p className="font-bold text-gray-900">
                        {selectedPayment.booking_details.guests.adults + selectedPayment.booking_details.guests.children + selectedPayment.booking_details.guests.babies}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">Event Status</p>
                      <p className="font-bold text-gray-900 capitalize">{selectedPayment.booking_details.request_status}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-4 pt-4 border-t border-gray-300">
                    Adults: {selectedPayment.booking_details.guests.adults} | Children: {selectedPayment.booking_details.guests.children} | Babies: {selectedPayment.booking_details.guests.babies}
                  </p>
                </div>

                {/* Items Table */}
                <div className="mb-8">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Description</th>
                        <th className="text-center py-3 px-4 font-bold text-gray-700">Qty</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-700">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-4 px-4 text-gray-900 font-semibold">Catering & Event Services</td>
                        <td className="py-4 px-4 text-center text-gray-900">1</td>
                        <td className="py-4 px-4 text-right text-gray-900 font-bold">₹{parseFloat(selectedPayment.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
                  <div className="flex justify-between mb-3 py-2">
                    <span className="text-gray-700 font-semibold">Subtotal</span>
                    <span className="text-gray-900 font-bold">₹{parseFloat(selectedPayment.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between mb-3 py-2 border-b border-gray-300">
                    <span className="text-gray-700 font-semibold">Tax (0%)</span>
                    <span className="text-gray-900 font-bold">₹0.00</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-lg font-bold text-green-600">Total Amount</span>
                    <span className="text-lg font-bold text-green-600">₹{parseFloat(selectedPayment.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-gray-600 pt-6 border-t border-gray-200">
                  <p>Thank you for your business!</p>
                  <p>For any queries, please contact us at support@chefchoice.com</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-8 py-4 flex gap-3 justify-end border-t">
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-6 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    generateInvoicePDF(selectedPayment);
                    setShowInvoiceModal(false);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PaymentInvoicePage;