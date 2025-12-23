"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Download, Eye, FileText, CreditCard, Calendar, Search, Filter, ChevronDown, CheckCircle, Clock, X } from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  client: string;
  description: string;
  dueDate: string;
}

const page = () => {
  const [activeTab, setActiveTab] = useState<'payments' | 'invoices'>('invoices');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Mock data for invoices
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      date: '2024-12-20',
      amount: 15000,
      status: 'paid',
      client: 'Rajesh Wedding Services',
      description: 'Catering & Tent House Services',
      dueDate: '2024-12-25'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      date: '2024-12-18',
      amount: 8500,
      status: 'paid',
      client: 'Priya Events Management',
      description: 'Chef Services for Corporate Event',
      dueDate: '2024-12-23'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      date: '2024-12-15',
      amount: 22000,
      status: 'pending',
      client: 'Sharma Family Celebration',
      description: 'Full Catering & Decoration Package',
      dueDate: '2024-12-30'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      date: '2024-12-10',
      amount: 12500,
      status: 'overdue',
      client: 'Anniversary Celebrations',
      description: 'Chef & Waiter Services',
      dueDate: '2024-12-18'
    }
  ];

  // Mock payment data
  const payments = [
    { id: '1', date: '2024-12-20', amount: 15000, method: 'Credit Card', status: 'completed', invoiceId: 'INV-2024-001' },
    { id: '2', date: '2024-12-18', amount: 8500, method: 'Debit Card', status: 'completed', invoiceId: 'INV-2024-002' },
    { id: '3', date: '2024-12-12', amount: 5000, method: 'UPI', status: 'completed', invoiceId: 'INV-2024-003' },
    { id: '4', date: '2024-12-08', amount: 25000, method: 'Bank Transfer', status: 'completed', invoiceId: 'INV-2024-005' }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white shadow-lg">
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
            onClick={() => setActiveTab('invoices')}
            className={`px-6 py-3 font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'invoices'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <FileText className="w-5 h-5" />
            Invoices
          </button>
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
          {activeTab === 'invoices' ? (
            <div className="p-6 space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by invoice number or client name..."
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
                      {['all', 'paid', 'pending', 'overdue'].map((status) => (
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

              {/* Invoices List */}
              <div className="space-y-3">
                {filteredInvoices.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-semibold">No invoices found</p>
                    <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredInvoices.map((invoice, index) => (
                    <div
                      key={invoice.id}
                      className="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 hover:border-green-400 rounded-xl p-5 transition-all hover:shadow-md"
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
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Invoice Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 text-lg">{invoice.invoiceNumber}</h3>
                              <p className="text-sm text-gray-600">{invoice.client}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 ml-15">{invoice.description}</p>
                        </div>

                        {/* Amount and Date */}
                        <div className="flex flex-col gap-2">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">₹{invoice.amount.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
                          </div>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex items-center gap-3">
                          <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 flex items-center gap-1 ${getStatusColor(invoice.status)}`}>
                            {getStatusIcon(invoice.status)}
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                          <button className="p-2.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors hidden md:block">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* Payment History Tab */
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Payments</h2>
              
              {payments.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-semibold">No payment history</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {payments.map((payment, index) => (
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
                        <div>
                          <p className="font-bold text-gray-900">{payment.method}</p>
                          <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="text-left md:text-right">
                        <p className="text-2xl font-bold text-gray-900">₹{payment.amount.toLocaleString()}</p>
                      </div>

                      {/* Status and Action */}
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 flex items-center gap-1 ${getStatusColor(payment.status)}`}>
                          <CheckCircle className="w-4 h-4" />
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                        <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-semibold hidden md:block">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-700 text-sm">Total Revenue</h3>
              <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center text-green-700">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">₹{invoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-2">From {invoices.length} invoices</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-700 text-sm">Paid Amount</h3>
              <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center text-blue-700">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">₹{invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-2">{invoices.filter(i => i.status === 'paid').length} invoices paid</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-700 text-sm">Pending Amount</h3>
              <div className="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center text-yellow-700">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">₹{invoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-2">{invoices.filter(i => i.status === 'pending' || i.status === 'overdue').length} awaiting payment</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;