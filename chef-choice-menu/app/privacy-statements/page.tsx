"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Shield, 
  Lock, 
  Eye, 
  Cookie, 
  Database, 
  Server, 
  Users, 
  Globe, 
  Mail, 
  ChevronRight, 
  FileText, 
  Search,
  Smartphone,
  Link,
  Bell,
  ShieldCheck,
  Key,
  Download,
  MapPin,
  Share2Icon,
  AlertTriangle
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    { id: 'overview', title: 'Overview', icon: <FileText className="w-4 h-4" /> },
    { id: 'collection', title: 'Information Collection', icon: <Download className="w-4 h-4" /> },
    { id: 'personal', title: 'Personal Information', icon: <Users className="w-4 h-4" /> },
    { id: 'nonpersonal', title: 'Non-Personal Info', icon: <Search className="w-4 h-4" /> },
    { id: 'cookies', title: 'Cookies', icon: <Cookie className="w-4 h-4" /> },
    { id: 'access', title: 'Access & Control', icon: <Eye className="w-4 h-4" /> },
    { id: 'use', title: 'How We Use Info', icon: <Bell className="w-4 h-4" /> },
    { id: 'disclosure', title: 'Information Disclosure', icon: <Share2Icon className="w-4 h-4" /> },
    { id: 'storage', title: 'Data Storage', icon: <Database className="w-4 h-4" /> },
    { id: 'security', title: 'Security', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'children', title: 'Children Policy', icon: <Users className="w-4 h-4" /> },
    { id: 'thirdparty', title: 'Third Party Links', icon: <Link className="w-4 h-4" /> },
    { id: 'partners', title: 'Partner Websites', icon: <Globe className="w-4 h-4" /> },
    { id: 'changes', title: 'Policy Changes', icon: <Bell className="w-4 h-4" /> },
    { id: 'contact', title: 'Contact Us', icon: <Mail className="w-4 h-4" /> },
  ];

  // Custom Share2Icon component since it's not in lucide-react
//   const Share2Icon = (props: any) => (
//     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <circle cx="18" cy="5" r="3"></circle>
//       <circle cx="6" cy="12" r="3"></circle>
//       <circle cx="18" cy="19" r="3"></circle>
//       <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
//       <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
//     </svg>
//   );

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-40 -mb-40"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30">
                <Shield className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Your privacy is important to us. Learn how we collect, use, and protect your personal information when you use CHEFCHOICEMENU.
              </p>
              
              {/* Quick Stats */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm font-medium">Data Encrypted</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm font-medium">📍 India Data Centers</span>
                </div>
              </div>
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
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Policy Sections</h3>
                </div>
                
                {/* Search */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search policy..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {section.icon}
                      </div>
                      <span className="font-medium text-left flex-1 text-sm">{section.title}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        activeSection === section.id ? 'text-blue-500' : 'text-gray-400'
                      }`} />
                    </button>
                  ))}
                </nav>

                {/* Quick Info Card */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Your Rights
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      <span>Right to access your data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      <span>Right to correct information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      <span>Right to opt-out of marketing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      <span>Control over location tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
                {/* Overview Section */}
                <section id="overview" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Privacy Policy Overview</h2>
                      <p className="text-gray-600 mt-1">Effective: January 2024</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      "CHEFCHOICEMENU" Website and App is brought to you by TingleTaste LLP. This Privacy Policy describes how we collect, use, and protect your personal information.
                    </p>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-2">Key Agreement</h3>
                          <p className="text-gray-700">
                            By using CHEFCHOICEMENU, you agree to our privacy practices. If you don't agree, please don't use our services.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Information Collection Section */}
                <section id="collection" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                      <Download className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Information Collection</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                          <Users className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">When We Collect Info</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span>When you register on our platform</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span>When you download our mobile app</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span>When you complete surveys or contact us</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span>When you order products and services</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">Location Tracking</h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Our app may track your location <strong>only with your consent</strong> for:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>App functionality and services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Product delivery and logistics</span>
                        </li>
                      </ul>
                      <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                        <p className="text-sm text-blue-800">
                          🔒 <strong>You control location tracking</strong> - You can turn it off anytime in your device settings
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Personal Information Section */}
                <section id="personal" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Personal Information</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center text-white">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">What We Collect</h3>
                        <p className="text-gray-600">Limited to what you share with us</p>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                            👤
                          </div>
                          <span className="font-semibold">Basic Info</span>
                        </div>
                        <p className="text-sm text-gray-600">Name, email, contact details</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                            📱
                          </div>
                          <span className="font-semibold">Device Info</span>
                        </div>
                        <p className="text-sm text-gray-600">App usage, platform details</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                            🛒
                          </div>
                          <span className="font-semibold">Order Details</span>
                        </div>
                        <p className="text-sm text-gray-600">Purchase history, preferences</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                            📍
                          </div>
                          <span className="font-semibold">Location Data</span>
                        </div>
                        <p className="text-sm text-gray-600">Only with your consent</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Non-Personal Information Section */}
                <section id="nonpersonal" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl">
                      <Search className="w-6 h-6 text-gray-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Non-Personal Information</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">What We Automatically Collect</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Technical Info</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                              <span>Browser type & version</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                              <span>Operating system</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                              <span>IP address</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                              <span>Device information</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Usage Analytics</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                              <span>Visit timestamps</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                              <span>Pages visited</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                              <span>Time spent on site</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                              <span>Click-stream data</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Cookies Section */}
                <section id="cookies" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl">
                      <Cookie className="w-6 h-6 text-amber-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Cookies Policy</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center text-white">
                          <Cookie className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">How We Use Cookies</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                          <span>Provide customized content</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                          <span>Monitor site usage patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                          <span>Improve our content and services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                          <span>Deliver targeted advertising</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white">
                          <Settings className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">Cookie Control</h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        You have full control over cookies:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>You can decline cookies anytime</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Manage preferences in browser settings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Note: Some features may not work without cookies</span>
                        </li>
                      </ul>
                      <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                        <p className="text-sm text-blue-800">
                          💡 <strong>Tip:</strong> Check your browser's "Help" menu to learn how to change cookie preferences
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Access & Control Section */}
                <section id="access" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl">
                      <Eye className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Access & Control Your Data</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center text-white">
                        <Key className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Your Rights</h3>
                        <p className="text-gray-600">You have the right to:</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <div className="text-center mb-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                            👁️
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-center mb-2">Access</h4>
                        <p className="text-sm text-gray-600 text-center">View your personal information</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <div className="text-center mb-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                            ✏️
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-center mb-2">Correct</h4>
                        <p className="text-sm text-gray-600 text-center">Modify inaccurate information</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <div className="text-center mb-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                            🚫
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-center mb-2">Opt-Out</h4>
                        <p className="text-sm text-gray-600 text-center">Stop further use of your data</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white border border-emerald-300 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="font-semibold text-gray-900">To exercise your rights:</p>
                          <a href="mailto:support@ChefChoiceMenu.com" className="text-emerald-600 hover:text-emerald-700">
                            support@ChefChoiceMenu.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Use of Information Section */}
                <section id="use" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl">
                      <Bell className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How We Use Your Information</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { icon: '🛒', title: 'Fulfill Requests', desc: 'Process orders for products and services' },
                      { icon: '🎯', title: 'Targeted Offers', desc: 'Provide personalized promotions and advertising' },
                      { icon: '📧', title: 'Communications', desc: 'Send information and promotional materials' },
                      { icon: '🔧', title: 'Service Improvement', desc: 'Review and improve site operations' },
                      { icon: '⚙️', title: 'Problem Resolution', desc: 'Address issues with our services' },
                      { icon: '🛡️', title: 'Security Protection', desc: 'Maintain site integrity and security' },
                    ].map((item, index) => (
                      <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-orange-300 transition-all group">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                            <span className="text-xl">{item.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Disclosure Section */}
                <section id="disclosure" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl">
                      <Share2Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Information Disclosure</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { 
                        title: 'Service Providers', 
                        desc: 'To employees, contractors, and partners for business operations',
                        color: 'bg-red-50 border-red-200'
                      },
                      { 
                        title: 'Legal Requirements', 
                        desc: 'To law enforcement when required by law or for public safety',
                        color: 'bg-red-50 border-red-200'
                      },
                      { 
                        title: 'Business Transfer', 
                        desc: 'In case of company acquisition, as part of transferred assets',
                        color: 'bg-red-50 border-red-200'
                      },
                      { 
                        title: 'Terms Violation', 
                        desc: 'If we believe terms have been violated or rights infringed',
                        color: 'bg-red-50 border-red-200'
                      },
                    ].map((item, index) => (
                      <div key={index} className={`p-4 rounded-xl border ${item.color}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-600 flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-gray-700">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Storage Section */}
                <section id="storage" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl">
                      <Database className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Data Storage & Retention</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                          <Server className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">Storage Location</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                          <span>Primary databases in India</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                          <span>Secure data centers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                          <span>Multiple security layers</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">Retention Period</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Kept as long as appropriate for purposes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Compliant with legal requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Regularly reviewed and updated</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Security Section */}
                <section id="security" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                      <ShieldCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Security Measures</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">Our Security Practices</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-3">
                            👤
                          </div>
                          <h4 className="font-semibold text-gray-900">Access Control</h4>
                          <p className="text-sm text-gray-600 mt-1">Need-to-know basis access</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-3">
                            📋
                          </div>
                          <h4 className="font-semibold text-gray-900">Policies</h4>
                          <p className="text-sm text-gray-600 mt-1">Strict data handling policies</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-3">
                            🔒
                          </div>
                          <h4 className="font-semibold text-gray-900">Encryption</h4>
                          <p className="text-sm text-gray-600 mt-1">SSL encryption for data</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white">
                          🔐
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">SSL Encryption</h3>
                          <p className="text-gray-600">Secure Sockets Layer protection</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span>HTTPS protocol for secure connections</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span>Padlock symbol in address bar</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span>Data encrypted during transmission</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Children Section */}
                <section id="children" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl">
                      <Users className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Children's Privacy</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center text-white text-2xl">
                        18+
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">Age Restriction</h3>
                        <p className="text-gray-700">
                          CHEFCHOICEMENU is not intended for children under 18 years of age. We do not knowingly collect personal information from minors.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-yellow-300">
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>Must be 18+ years old</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>Sound mind and judgment</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>Capable of entering contracts</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-yellow-300">
                        <h4 className="font-semibold text-gray-900 mb-2">Parental Responsibility</h4>
                        <p className="text-sm text-gray-600">
                          Parents/guardians should monitor children's internet usage and help enforce our privacy policy.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Third Party Links Section */}
                <section id="thirdparty" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl">
                      <Link className="w-6 h-6 text-gray-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Third Party Websites</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <h3 className="font-bold text-gray-900">Important Notice</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Our website may contain links to third-party sites. We are not responsible for their privacy practices.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        💡 <strong>Always review</strong> the privacy policy of any website you visit, especially those linked from our site.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Partner Websites Section */}
                <section id="partners" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                      <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Partner Websites</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white">
                          🤝
                        </div>
                        <h3 className="font-bold text-gray-900">Our Partners</h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        We partner with chefs, aggregators, and service providers. When you use their services:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Their privacy policies apply in addition to ours</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>They may update their policies independently</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>We have no control over their policies</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">📝 Recommendation</h4>
                      <p className="text-gray-700">
                        Always review the privacy policy of our partners before using their services.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Changes Section */}
                <section id="changes" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                      <Bell className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Policy Changes</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                        <Bell className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Updates & Notifications</h3>
                        <p className="text-gray-600">We may update this policy periodically</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">
                          📝
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Changes Posted Online</h4>
                          <p className="text-gray-700">All updates will be posted on our website</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">
                          🔔
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Material Changes</h4>
                          <p className="text-gray-700">Significant changes will be prominently notified</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">
                          👁️
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Your Responsibility</h4>
                          <p className="text-gray-700">Please review updates when posted</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl">
                      <Mail className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Us</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white">
                          <Mail className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">Privacy Questions</h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        For any questions or concerns about our privacy practices:
                      </p>
                      <a 
                        href="mailto:supports@ChefChoiceMenu.com" 
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        <Mail className="w-4 h-4" />
                        supports@ChefChoiceMenu.com
                      </a>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                          <Shield className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">Security Concerns</h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        If you believe your account security has been compromised:
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-900">Immediately:</p>
                        <ol className="space-y-1 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs flex-shrink-0">1</span>
                            <span>Change your password</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs flex-shrink-0">2</span>
                            <span>Contact us at the email above</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs flex-shrink-0">3</span>
                            <span>Monitor your account activity</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Final Agreement */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 text-center">
                    <h3 className="font-bold text-gray-900 text-lg mb-3">Your Privacy Matters</h3>
                    <p className="text-gray-700 mb-4">
                      By using CHEFCHOICEMENU, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
                    </p>
                    {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      Last Updated: January 2024
                    </div> */}
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

// Helper components for missing icons
const Settings = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const Calendar = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Check = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);