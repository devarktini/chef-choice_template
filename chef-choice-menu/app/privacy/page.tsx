"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FileText, ChevronRight, BookOpen, Shield, Lock, AlertTriangle, DollarSign, Users, Smartphone, Globe, Scale, Mail, Phone } from 'lucide-react';

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'conditions', title: 'Conditions for Use', icon: <Shield className="w-4 h-4" /> },
    { id: 'account', title: 'Account Details', icon: <Lock className="w-4 h-4" /> },
    { id: 'prohibited', title: 'Prohibited Activities', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'payments', title: 'Payments & Refunds', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'liability', title: 'Liability', icon: <Scale className="w-4 h-4" /> },
    { id: 'providers', title: 'For Service Providers', icon: <Users className="w-4 h-4" /> },
    { id: 'software', title: 'Software & Mobile App', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'jurisdiction', title: 'Jurisdiction', icon: <Globe className="w-4 h-4" /> },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-40 -mb-40"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30">
                <FileText className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Terms & Conditions
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Please read these terms carefully before using our platform. By accessing CHEFCHOICEMENU, you agree to be bound by these terms.
              </p>
              
              {/* Last Updated */}
              {/* <div className="mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">📅 Last Updated:</span>
                <span className="text-sm">January 2024</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg">
                    <FileText className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Quick Navigation</h3>
                </div>
                
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 text-orange-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {section.icon}
                      </div>
                      <span className="font-medium text-left flex-1">{section.title}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        activeSection === section.id ? 'text-orange-500' : 'text-gray-400'
                      }`} />
                    </button>
                  ))}
                </nav>

                {/* Contact Card */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Need Help?
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    If you have questions about our terms, contact our legal team.
                  </p>
                  <div className="space-y-2">
                    <a href="mailto:legal@chefchoicemenu.com" className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium">
                      <Mail className="w-4 h-4" />
                      legal@chefchoicemenu.com
                    </a>
                    <a href="tel:+911234567890" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                      <Phone className="w-4 h-4" />
                      +91 12345 67890
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
                {/* Overview Section */}
                <section id="overview" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl">
                      <BookOpen className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Overview</h2>
                  </div>
                  
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      This Technology Platform / Website (the Website) and the Mobile App CHEFCHOICEMENU, is owned and operated by TingleTaste LLP (CHEFCHOICEMENU), a Company incorporated under the Indian Companies Act.
                    </p>
                    
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-3">Key Points:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                          <span>CHEFCHOICEMENU is an E-Commerce Technology platform connecting users with specialized chefs</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                          <span>We facilitate connections but do not own or control the services provided by chefs</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                          <span>By using our platform, you agree to these Terms of Use</span>
                        </li>
                      </ul>
                    </div>
                    
                    <p>
                      CHEFCHOICEMENU reserves its rights to change these Terms of Use and your continued use of this Website/Mobile Application is conditioned upon acceptance of the updated Terms of Use.
                    </p>
                  </div>
                </section>

                {/* Conditions for Use Section */}
                <section id="conditions" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-100 rounded-xl">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Conditions for Use</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Customers Card */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                        For Customers
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span>You must be 18 years or older to use our services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span>You are responsible for your safety and belongings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span>All information provided must be accurate and complete</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span>You must safeguard your account credentials</span>
                        </li>
                      </ul>
                    </div>

                    {/* Service Providers Card */}
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">👨‍🍳</div>
                        For Service Providers
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-1" />
                          <span>Keep your login credentials safe and secure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-1" />
                          <span>Provide accurate details about your services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-1" />
                          <span>Maintain customer privacy and data security</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-1" />
                          <span>Keep CHEFCHOICEMENU indemnified from service-related claims</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Account Details Section */}
                <section id="account" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-100 rounded-xl">
                      <Lock className="w-6 h-6 text-gray-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Account Details</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      While creating a log in account on the Website, you shall provide:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">👤</div>
                        <span className="font-medium">Full Name & Contact</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">📱</div>
                        <span className="font-medium">Mobile Number</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">💳</div>
                        <span className="font-medium">Payment Details</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600">📍</div>
                        <span className="font-medium">Address</span>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Note:</strong> You warrant that the details provided are correct without any manipulation or fraud.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Prohibited Activities Section */}
                <section id="prohibited" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-red-100 to-red-100 rounded-xl">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Prohibited Activities</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <span>Do not use this Website for commercial purposes</span>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <span>Do not make false or fraudulent orders</span>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <span>Do not use automated means to access content</span>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <span>Do not copy, modify, or distribute content without permission</span>
                    </div>
                  </div>
                </section>

                {/* Payments & Refunds Section */}
                <section id="payments" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-green-100 to-green-100 rounded-xl">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Payments & Refunds</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white">💰</div>
                        Payment Processing
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span>CHEFCHOICEMENU collects payments on behalf of chefs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span>We partner with secure payment gateways</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span>We do not store credit card or banking details</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span>Payment does not guarantee delivery confirmation</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white">↩️</div>
                        Cancellation & Refund Policy
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                          <span>Cancellation subject to chef&lsquo;s terms & conditions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                          <span>No cancellation after chef confirms order</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                          <span>CHEFCHOICEMENU not responsible for refunds</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                          <span>Cancellation only within 1 hour of payment or before confirmation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Liability Section */}
                <section id="liability" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-100 rounded-xl">
                      <Scale className="w-6 h-6 text-gray-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Limitation of Liability</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">Important Disclaimers</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 flex-shrink-0"></div>
                          <span>CHEFCHOICEMENU is a technology platform facilitator only</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 flex-shrink-0"></div>
                          <span>No responsibility for food quality, taste, or workmanship</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 flex-shrink-0"></div>
                          <span>No guarantee on accuracy of information or ratings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 flex-shrink-0"></div>
                          <span>Services provided as is without warranties</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">Disclaimer of Liability</h3>
                      <p className="text-gray-700">
                        Under no circumstances shall CHEFCHOICEMENU be liable for any direct, indirect, punitive, incidental, special or consequential damages arising out of, or in any way connected with, your access to, display of or use of this Website.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Service Providers Section */}
                <section id="providers" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-100 rounded-xl">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">For Service Providers</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center text-white">
                        👨‍🍳
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Important Responsibilities</h3>
                        <p className="text-sm text-gray-600">As a chef/service provider on our platform</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0 mt-1">
                          <Shield className="w-3 h-3" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Quality & Safety</h4>
                          <p className="text-sm text-gray-600 mt-1">You are responsible for food quality, ingredients, and any adverse reactions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0 mt-1">
                          <Lock className="w-3 h-3" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Data Security</h4>
                          <p className="text-sm text-gray-600 mt-1">Maintain customer privacy and secure information with latest security methods</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0 mt-1">
                          <Scale className="w-3 h-3" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Indemnification</h4>
                          <p className="text-sm text-gray-600 mt-1">You agree to defend and indemnify CHEFCHOICEMENU from claims related to your services</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Software & Mobile App Section */}
                <section id="software" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-100 rounded-xl">
                      <Smartphone className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Software & Mobile App</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                          📱
                        </div>
                        Mobile Application Usage
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Software is copyrighted work of CHEFCHOICEMENU</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Limited, personal, non-exclusive license granted for use</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Internet connection required for app functionality</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Automatic data collection for normal operation</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">⚠️ Important Notice</h3>
                      <p className="text-gray-700">
                        CHEFCHOICEMENU is a trademark owned by TingleTaste LLP. All rights reserved. Any unauthorized use, reproduction, or imitation without written permission constitutes infringement.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Jurisdiction Section */}
                <section id="jurisdiction" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-indigo-100 to-indigo-100 rounded-xl">
                      <Globe className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Jurisdiction & Contact</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">⚖️</div>
                        Legal Jurisdiction
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                          <span>Governed by Laws of India</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                          <span>Subject to Jurisdiction of Delhi Courts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                          <span>Account termination possible for terms violation</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center text-white">📧</div>
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">legal@chefchoicemenu.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">+91 12345 67890</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">www.chefchoicemenu.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Acceptance Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6 text-center">
                    <h3 className="font-bold text-gray-900 text-lg mb-3">Acceptance of Terms</h3>
                    <p className="text-gray-700 mb-4">
                      By accessing or using CHEFCHOICEMENU, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-sm font-semibold">
                      <FileText className="w-4 h-4" />
                      Effective: January 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scroll-mt-24 {
          scroll-margin-top: 6rem;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        section {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </>
  );
}