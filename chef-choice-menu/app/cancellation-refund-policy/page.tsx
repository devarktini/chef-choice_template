"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  FileText, 
  ChevronRight,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Percent,
  Calendar,
  Mail,
  Phone,
  RefreshCw,
  UserCheck,
  Shield,
  TrendingUp,
  ArrowRight,
  Download,
  Upload,
  Ban,
  HelpCircle,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function RefundPolicyPage() {
  const [activeTab, setActiveTab] = useState<'customer' | 'partner'>('customer');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-40 -mb-40"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30">
                <RefreshCw className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Refund & Cancellation Policy
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Clear guidelines for refunds and cancellations for customers and service partners
              </p>
              
              {/* Last Updated */}
              {/* <div className="mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Updated: December 10, 2025</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Policy Tabs */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-2 mb-8">
              <button
                onClick={() => setActiveTab('customer')}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                  activeTab === 'customer'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-semibold text-lg">Customer Policy</span>
              </button>
              
              <button
                onClick={() => setActiveTab('partner')}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                  activeTab === 'partner'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <UserCheck className="w-5 h-5" />
                <span className="font-semibold text-lg">Chef/Partner Policy</span>
              </button>
            </div>
          </div>

          {/* Customer Policy Content */}
          {activeTab === 'customer' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Policy Overview */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Customer Refund Policy</h2>
                    <p className="text-gray-600 mt-1">For customers booking services through CHEFCHOICEMENU</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <Info className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">Important Information</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                          <span>Policy applies to all services booked through our Platform</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                          <span>Company may charge cancellation fees</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                          <span>Refunds processed in 10-15 business days</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cancellation by Customer */}
                <div className="mb-10">
                  <div 
                    onClick={() => toggleSection('customer-cancellation')}
                    className="flex items-center justify-between cursor-pointer p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">Cancellation by Customer</h3>
                    </div>
                    {expandedSection === 'customer-cancellation' ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  
                  {expandedSection === 'customer-cancellation' && (
                    <div className="mt-4 space-y-6">
                      {/* Refund Timeline Table */}
                      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4">
                          <h4 className="font-bold text-lg">Refund Timeline & Percentage</h4>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {/* Full Refund Row */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 bg-green-50">
                            <div className="md:col-span-3 flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white">
                                <CheckCircle className="w-5 h-5" />
                              </div>
                              <span className="font-bold text-gray-900">Full Refund (100%)</span>
                            </div>
                            <div className="md:col-span-9">
                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                                  <span>Until Service Partner is not assigned to the event</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                                  <span>No show by the Service Partner</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 50% Refund Row */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 bg-yellow-50">
                            <div className="md:col-span-3 flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-white">
                                <Percent className="w-5 h-5" />
                              </div>
                              <span className="font-bold text-gray-900">Partial Refund (50%)</span>
                            </div>
                            <div className="md:col-span-9">
                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                                  <span>After chef is assigned until ingredients are dispatched</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                                  <span>Up to 12 hours before Service Partner's estimated arrival time</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* No Refund Row */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 bg-red-50">
                            <div className="md:col-span-3 flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                                <Ban className="w-5 h-5" />
                              </div>
                              <span className="font-bold text-gray-900">No Refund (0%)</span>
                            </div>
                            <div className="md:col-span-9">
                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                                  <span>Customer missed booking, nobody present at location</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                                  <span>Service Partner arrives but ingredients/equipment are not ready</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Refund Process Info */}
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <DollarSign className="w-5 h-5 text-blue-600" />
                            </div>
                            <h5 className="font-bold text-gray-900">Refund Method</h5>
                          </div>
                          <p className="text-sm text-gray-600">
                            Refund issued via original payment method (credit/debit card) or credit note based on preference.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Clock className="w-5 h-5 text-green-600" />
                            </div>
                            <h5 className="font-bold text-gray-900">Processing Time</h5>
                          </div>
                          <p className="text-sm text-gray-600">
                            Refunds initiated within 10-15 business days. May take additional time to reflect in your account.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <Shield className="w-5 h-5 text-purple-600" />
                            </div>
                            <h5 className="font-bold text-gray-900">Liability</h5>
                          </div>
                          <p className="text-sm text-gray-600">
                            Company liability limited to final booking price. No refunds for amounts exceeding booking value.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cancellation by Company */}
                <div>
                  <div 
                    onClick={() => toggleSection('company-cancellation')}
                    className="flex items-center justify-between cursor-pointer p-4 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">Cancellation by Company</h3>
                    </div>
                    {expandedSection === 'company-cancellation' ? (
                      <ChevronUp className="w-5 h-5 text-purple-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  
                  {expandedSection === 'company-cancellation' && (
                    <div className="mt-4 space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Full Refund Case */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                              <CheckCircle className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">Full Refund Cases</h4>
                              <p className="text-sm text-gray-600">When company cancels due to:</p>
                            </div>
                          </div>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                              <span>Unavoidable circumstances beyond control</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                              <span>Service Partner availability issues</span>
                            </li>
                          </ul>
                        </div>

                        {/* No Refund Case */}
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                              <XCircle className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">No Refund Cases</h4>
                              <p className="text-sm text-gray-600">When company cancels due to:</p>
                            </div>
                          </div>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                              <span>Material breach by customer</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                              <span>Serious misconduct by customer</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Chef/Partner Policy Content */}
          {activeTab === 'partner' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Policy Overview */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Chef/Caterer Partner Policy</h2>
                    <p className="text-gray-600 mt-1">For service partners providing services through CHEFCHOICEMENU</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <Info className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">Important Information</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                          <span>Service Partners receive payment for completed services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                          <span>No refunds after payment has been made to Service Partner</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                          <span>Cancellation policies affect your rating and future bookings</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Refunds Section */}
                <div className="mb-10">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white">
                        <DollarSign className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Refunds for Service Partners</h3>
                        <p className="text-gray-600">Payment terms and refund conditions</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white p-5 rounded-xl border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Payment Entitlement
                        </h4>
                        <p className="text-gray-700">
                          Service Partners receive monetary consideration at mutually agreed rates for completed services.
                        </p>
                      </div>
                      
                      <div className="bg-white p-5 rounded-xl border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Ban className="w-4 h-4 text-red-500" />
                          No Refunds After Payment
                        </h4>
                        <p className="text-gray-700">
                          Company is not entitled to refunds after payment has been made to the Service Partner.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cancellation Section */}
                <div className="space-y-8">
                  {/* Cancellation by Service Partner */}
                  <div>
                    <div 
                      onClick={() => toggleSection('partner-cancellation')}
                      className="flex items-center justify-between cursor-pointer p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                          <UserCheck className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg">Cancellation by Service Partner</h3>
                      </div>
                      {expandedSection === 'partner-cancellation' ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    
                    {expandedSection === 'partner-cancellation' && (
                      <div className="mt-4">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <div className="grid md:grid-cols-3 gap-6">
                            {/* Cancellation Allowance */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
                              <div className="text-center mb-4">
                                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                                  <span className="text-lg font-bold">1</span>
                                </div>
                                <h4 className="font-bold text-gray-900">Monthly Allowance</h4>
                              </div>
                              <p className="text-center text-gray-600 text-sm">
                                Service Partners can cancel 1 booking per month
                              </p>
                            </div>

                            {/* Time Requirement */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
                              <div className="text-center mb-4">
                                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                                  <Clock className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-gray-900">Advance Notice</h4>
                              </div>
                              <p className="text-center text-gray-600 text-sm">
                                72 hours prior to event visit required
                              </p>
                            </div>

                            {/* Rating Impact */}
                            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-5">
                              <div className="text-center mb-4">
                                <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                                  <TrendingUp className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-gray-900">Rating Impact</h4>
                              </div>
                              <p className="text-center text-gray-600 text-sm">
                                Cancellations affect rating and future opportunities
                              </p>
                            </div>
                          </div>

                          {/* Additional Notes */}
                          <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-lg">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-1">Important Notes</h5>
                                <ul className="space-y-1 text-sm text-gray-600">
                                  <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                                    <span>Cancellation allowance does not carry forward to next month</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                                    <span>Multiple cancellations severely impact booking opportunities</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cancellation by Company */}
                  <div>
                    <div 
                      onClick={() => toggleSection('company-partner-cancellation')}
                      className="flex items-center justify-between cursor-pointer p-4 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg">Cancellation by Company</h3>
                      </div>
                      {expandedSection === 'company-partner-cancellation' ? (
                        <ChevronUp className="w-5 h-5 text-purple-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                    
                    {expandedSection === 'company-partner-cancellation' && (
                      <div className="mt-4">
                        <div className="space-y-6">
                          {/* Cancellation Reasons */}
                          <div className="grid md:grid-cols-3 gap-6">
                            {/* Unavoidable Circumstances */}
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                                </div>
                                <h5 className="font-bold text-gray-900">Unavoidable Circumstances</h5>
                              </div>
                              <p className="text-sm text-gray-600">
                                Company may cancel bookings due to circumstances beyond control
                              </p>
                            </div>

                            {/* Unlawful Events */}
                            <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-xl p-5">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                  <Ban className="w-5 h-5 text-red-600" />
                                </div>
                                <h5 className="font-bold text-gray-900">Unlawful Events</h5>
                              </div>
                              <p className="text-sm text-gray-600">
                                Cancellation for unlawful events or safety concerns of Service Partner
                              </p>
                            </div>

                            {/* Material Breach */}
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                  <XCircle className="w-5 h-5 text-orange-600" />
                                </div>
                                <h5 className="font-bold text-gray-900">Material Breach</h5>
                              </div>
                              <p className="text-sm text-gray-600">
                                Cancellation for material breach or misconduct by Service Partner
                              </p>
                            </div>
                          </div>

                          {/* Consequences Section */}
                          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 rounded-xl p-6">
                            <h4 className="font-bold text-gray-900 text-lg mb-4">Consequences of Company Cancellation</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  Standard Cancellation
                                </h5>
                                <p className="text-gray-600 text-sm">
                                  No penalty for Service Partner in case of unavoidable circumstances or safety concerns
                                </p>
                              </div>
                              
                              <div className="space-y-3">
                                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                                  <XCircle className="w-4 h-4 text-red-500" />
                                  Breach/Misconduct Cancellation
                                </h5>
                                <p className="text-gray-600 text-sm">
                                  Company may withhold payment and recover costs incurred due to Service Partner's misconduct
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer & Contact Section */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Disclaimer */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    <h3 className="font-bold text-gray-900 text-lg">Policy Disclaimer</h3>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-yellow-200">
                    <p className="text-gray-700">
                      The Company may amend this Policy at any time without prior intimation. 
                      By continuing to use the Platform, users consent to the amended terms of this Policy.
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-emerald-600" />
                    <h3 className="font-bold text-gray-900 text-lg">Contact & Support</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                      <Globe className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-gray-900">Website</p>
                        <a href="https://ChefChoiceMenu.com" className="text-emerald-600 hover:text-emerald-700">
                          https://ChefChoiceMenu.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                      <Phone className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-gray-900">Support</p>
                        <p className="text-gray-700">Available through contact page</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Policy Button */}
              <div className="mt-8 pt-6 border-t border-gray-300 text-center">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
                  <Download className="w-5 h-5" />
                  Download Policy PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
}

// Helper component for Globe icon
const Globe = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);