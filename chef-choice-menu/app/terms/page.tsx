"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  FileText, 
  Users, 
  Calendar, 
  DollarSign, 
  Award, 
  Shield, 
  BookOpen, 
  ChevronRight,
  ClipboardCheck,
  Target,
  Briefcase,
  Mail,
  Phone,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Key,
  Clock,
  Star,
  TrendingUp,
  Scale,
  Lock,
  Smartphone,
  Link,
  ArrowRight,
  Bookmark,
  Search,
  Download,
  Upload,
  UserCheck,
  Award as AwardIcon,
  
  ChefHat
} from 'lucide-react';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    { id: 'overview', title: 'Overview', icon: <FileText className="w-4 h-4" /> },
    { id: 'services', title: 'Services', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'registration', title: 'Registration', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'bookings', title: 'Bookings Process', icon: <Calendar className="w-4 h-4" /> },
    { id: 'conduct', title: 'Partner Conduct', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'dosdonts', title: 'DOs & DON\'Ts', icon: <Target className="w-4 h-4" /> },
    { id: 'payments', title: 'Payments', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'rating', title: 'Minimum Rating', icon: <Star className="w-4 h-4" /> },
    { id: 'obligations', title: 'Your Obligations', icon: <Shield className="w-4 h-4" /> },
    { id: 'company', title: 'Company Rights', icon: <Scale className="w-4 h-4" /> },
    { id: 'ip', title: 'Intellectual Property', icon: <Lock className="w-4 h-4" /> },
    { id: 'termination', title: 'Account Termination', icon: <XCircle className="w-4 h-4" /> },
    { id: 'disclaimer', title: 'Disclaimer', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'indemnity', title: 'Indemnification', icon: <Shield className="w-4 h-4" /> },
    { id: 'grievance', title: 'Grievance', icon: <Mail className="w-4 h-4" /> },
    { id: 'contact', title: 'Contact', icon: <Phone className="w-4 h-4" /> },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter sections based on search
  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pb-20">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-40 -mb-40"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30">
                <ChefHat className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Service Partner Terms & Conditions
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Guidelines and rules for chefs and service partners using the CHEFCHOICEMENU platform
              </p>
              
              {/* Quick Info */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {/* <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Updated: Dec 20, 2025</span>
                </div> */}
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Scale className="w-4 h-4" />
                  <span className="text-sm font-medium">Legal Agreement</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Key className="w-4 h-4" />
                  <span className="text-sm font-medium">For Service Partners</span>
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
                  <div className="p-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Quick Navigation</h3>
                </div>
                
                {/* Search */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search terms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                
                <nav className="space-y-2">
                  {filteredSections.map((section) => (
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
                      <span className="font-medium text-left flex-1 text-sm">{section.title}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        activeSection === section.id ? 'text-orange-500' : 'text-gray-400'
                      }`} />
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Key Requirements
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5"></div>
                      <span>18+ years old with valid ID</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5"></div>
                      <span>Minimum rating: 4.0+</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5"></div>
                      <span>Professional chef training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5"></div>
                      <span>Valid FSSAI license</span>
                    </li>
                  </ul>
                </div>

                {/* Download Button */}
                <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  <Download className="w-4 h-4" />
                  Download PDF Version
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
                
                {/* Overview Section */}
                <section id="overview" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Terms Overview</h2>
                      <p className="text-gray-600 mt-1">Last updated: December 20, 2025</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      These terms govern your use of CHEFCHOICEMENU platform (Website & App) as a Service Partner (Chef/Caterer). By using our platform, you agree to these terms.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Service Partner</h3>
                        <p className="text-sm text-gray-600">Chefs, Caterers & Event Managers</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                          <Smartphone className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Platform</h3>
                        <p className="text-sm text-gray-600">Website & Mobile App</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                          <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Legal Agreement</h3>
                        <p className="text-sm text-gray-600">Binding contract with TingleTaste LLP</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-2">Important Notice</h3>
                          <p className="text-gray-700">
                            The Company reserves the right to change these Terms at any time. Your continued use of the Platform constitutes acceptance of updated Terms.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Services Section */}
                <section id="services" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">1. Services</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                          <ChefHat className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">Service Partner Role</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Register as Chef/Caterer/Event Manager</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Provide food preparation & hospitality services</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Services for personal & corporate events</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span><strong>Not an employee</strong> - Independent contractor relationship</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Registration Section */}
                <section id="registration" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
                      <UserCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">2. User Registration & Membership</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                        <Key className="w-5 h-5 text-green-600" />
                        Registration Requirements
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span>Provide accurate personal information</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span>Professional details & experience</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span>Identity proof verification</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span>Cuisine specialization details</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Important Notes
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                          <span>No guaranteed bookings or fixed income</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                          <span>Safeguard your account credentials</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                          <span>Immediately report unauthorized access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Bookings Process Section */}
                <section id="bookings" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">3. Bookings Process</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Booking Timeline */}
                    <div className="relative">
                      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-300 to-pink-300"></div>
                      
                      {[
                        { icon: '📱', title: 'Booking Request', desc: 'Customer selects date, time, location & menu', time: 'Instant' },
                        { icon: '🔔', title: 'Notification', desc: 'Broadcast to all suitable service partners', time: 'Within 2 hours' },
                        { icon: '✅', title: 'Accept Booking', desc: 'First to accept gets the booking', time: 'Within 2 hours' },
                        { icon: '📞', title: 'Customer Connect', desc: 'Share contact info & clarify details', time: 'Pre-event' },
                        { icon: '🔐', title: 'OTP Verification', desc: 'Verify OTP at event start & completion', time: 'During event' },
                        { icon: '💰', title: 'Payment', desc: 'Payment processed 3 days post-completion', time: '3 days after' },
                      ].map((step, index) => (
                        <div key={index} className="relative mb-8 md:mb-12">
                          <div className="md:flex items-center">
                            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}>
                              <div className="bg-white p-5 rounded-xl border border-purple-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-xl">
                                    {step.icon}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-gray-900">{step.title}</h4>
                                    <p className="text-sm text-gray-600">{step.time}</p>
                                  </div>
                                </div>
                                <p className="text-gray-700 text-sm">{step.desc}</p>
                              </div>
                            </div>
                            <div className={`absolute md:relative left-4 md:left-1/2 transform md:-translate-x-1/2 z-10 ${index % 2 === 0 ? 'md:order-2' : ''}`}>
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full border-4 border-white flex items-center justify-center text-white font-bold">
                                {index + 1}
                              </div>
                            </div>
                            <div className="md:w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Important Notes */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Timing Requirements
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></div>
                            <span>Accept booking within 2 hours</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></div>
                            <span>Short notice bookings: 4 hours prior</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></div>
                            <span>Notify unavailability: 2 days prior</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          {/* <Tool className="w-4 h-4" /> */}
                          Service Kit
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                            <span>Provided against deposit</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                            <span>Keep clean and maintain</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                            <span>Return in good condition</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Service Partner Conduct */}
                <section id="conduct" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl">
                      <ClipboardCheck className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">4. Service Partner Conduct</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { icon: '📞', title: 'Arrival Notice', desc: 'Inform estimated arrival time' },
                        { icon: '👞', title: 'Location Rules', desc: 'Follow no-shoe policies if applicable' },
                        { icon: '👤', title: 'Point of Contact', desc: 'Identify single POC for communication' },
                        { icon: '🌶️', title: 'Customization', desc: 'Follow spice levels & dietary needs' },
                        { icon: '🔍', title: 'Equipment Check', desc: 'Verify all equipment availability' },
                        { icon: '📅', title: 'Ingredient Freshness', desc: 'Check expiration dates & freshness' },
                        { icon: '⏰', title: 'Timing', desc: 'Notify 30 mins before service time' },
                        { icon: '💬', title: 'Feedback', desc: 'Take feedback after first course' },
                        { icon: '🌡️', title: 'Temperature Control', desc: 'Maintain proper food temperatures' },
                        { icon: '🧼', title: 'Cleanup', desc: 'Wash & clean all tools post-service' },
                        { icon: '👔', title: 'Uniform', desc: 'Wear clean, fresh uniform provided' },
                        { icon: '🎒', title: 'Kit Organization', desc: 'Keep service kit well-organized' },
                      ].map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-indigo-600">
                              <span className="text-xl">{item.icon}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* DOs & DON'Ts Section */}
                <section id="dosdonts" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-xl">
                      <Target className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">5. DOs & DON&lsquo;Ts</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* DOs Column */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">DOs</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          "Arrive in spotless, ironed chef jacket",
                          "Keep aprons clean and wear as per standards",
                          "Maintain clean kitchen cloths (keep spares)",
                          "Keep chef clogs clean after every service",
                          "Wear fresh pair of socks for every service",
                          "Be well-groomed with trimmed nails",
                          "Wear hair net when required",
                          "Wash hands before preparing food",
                          "Wear gloves if there are cuts or burns",
                          "Keep raw food separate from cooked food",
                          "Keep toxic substances away from food",
                          "Keep chef kit safe from children",
                          "Use only required utensils",
                          "Tie and keep aside garbage bags",
                          "Switch off all equipment after use",
                          "Show Customer space & left-over items",
                          "Keep Customer informed about everything",
                          "Wash cutting boards in hot soapy water",
                          "Leave kitchen clean and sanitized",
                          "Thaw food in refrigerator or cold water"
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DON'Ts Column */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                          <XCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">DON&lsquo;Ts</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          "Don't keep long hair open",
                          "Don't use excessive makeup or hair products",
                          "Don't use overpowering fragrances",
                          "Avoid touching hair/face while preparing food",
                          "Don't handle food with bandaged hands",
                          "Avoid hand sanitizers (don't replace handwashing)",
                          "Don't pile dishes or make kitchen messy",
                          "Don't leave spillages unattended",
                          "Don't thaw food on kitchen counter"
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3 bg-red-50 p-4 rounded-lg border border-red-200">
                            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-600 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Payments Section */}
                <section id="payments" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl">
                      <DollarSign className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">6. Fee & Payment Terms</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
                        <div className="text-center mb-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                            <DollarSign className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold text-gray-900">Fee Structure</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Quoted per event</span>
                            <span className="font-semibold">Negotiable</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Company commission</span>
                            <span className="font-semibold">Percentage based</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Payment time</span>
                            <span className="font-semibold">3 days post-completion</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                        <div className="text-center mb-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                            <Upload className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold text-gray-900">Payment Process</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                            <span>Bank transfer only</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                            <span>Update bank details timely</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                            <span>Taxes: Partner&lsquo;s responsibility</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
                        <div className="text-center mb-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                            <AlertTriangle className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold text-gray-900">Important Notes</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                            <span>No fee for failed services</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                            <span>Bear all travel & setup costs</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                            <span>Raise discrepancies within 7 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Minimum Rating Section */}
                <section id="rating" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-pink-100 to-pink-200 rounded-xl">
                      <Star className="w-6 h-6 text-pink-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">8. Minimum Average Rating</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white text-2xl">
                        4.0+
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Rating Requirements</h3>
                        <p className="text-gray-600">Maintain minimum rating to continue services</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Consequences</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                            <span>Below minimum: Warning & improvement period</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                            <span>No improvement: Account deactivation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                            <span>Higher ratings = More bookings</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Training & SOPs</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                            <span>Regular training sessions conducted</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                            <span>Must follow Standard Operating Procedures</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                            <span>Stay updated with SOP changes</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Your Obligations Section */}
                <section id="obligations" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-xl">
                      <Shield className="w-6 h-6 text-cyan-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">10. Your Obligations</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
                        <h3 className="font-bold text-gray-900 text-lg mb-4">Professional Responsibilities</h3>
                        <div className="space-y-3">
                          {[
                            "Provide safe, clean, quality food",
                            "Obtain necessary licenses as per law",
                            "Treat all customers with courtesy",
                            "Maintain high standards of professionalism",
                            "Follow company policies & guidelines",
                            "Wear company aprons during services",
                            "Comply with all applicable Indian laws",
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-1" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                        <h3 className="font-bold text-gray-900 text-lg mb-4">Prohibited Activities</h3>
                        <div className="space-y-3">
                          {[
                            "No illegal or criminal activities",
                            "No defamatory or obscene content",
                            "No infringement of intellectual property",
                            "No misleading or false information",
                            "No unauthorized contact with customers",
                            "No software viruses or destructive code",
                            "No automated data collection",
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-red-100 to-orange-100 border border-red-300 rounded-xl p-6">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900">Violation Consequences</h4>
                          <p className="text-gray-700">
                            Violation of prohibitions will result in account removal and legal action.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Company Rights Section */}
                <section id="company" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl">
                      <Scale className="w-6 h-6 text-gray-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">11. Company Rights & Responsibilities</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">Company Rights</h3>
                      <div className="space-y-3">
                        {[
                          "Monitor and review information",
                          "Remove inappropriate content",
                          "Terminate accounts without notice",
                          "Modify or suspend platform access",
                          "Change terms without prior notice",
                          "Conduct background checks",
                          "Withhold payments for non-compliance",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 flex-shrink-0"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">Company NOT Responsible For</h3>
                      <div className="space-y-3">
                        {[
                          "Customer actions or misinformation",
                          "Health issues from food allergies",
                          "Misuse of shared information",
                          "Obligations not explicitly stated",
                          "Third-party website content",
                          "Interruptions in platform service",
                          "Service partner-customer disputes",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Intellectual Property Section */}
                <section id="ip" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl">
                      <Lock className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">15. Intellectual Property Rights</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center text-white">
                        ©
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Ownership</h3>
                        <p className="text-gray-600">All rights reserved by TingleTaste LLP</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0 mt-1">
                          🔒
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Company Owns</h4>
                          <p className="text-gray-700">Platform technology, content, services, and all related IP rights</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0 mt-1">
                          📝
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">You Grant</h4>
                          <p className="text-gray-700">License for reviews, photos, and content posted on platform</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0 mt-1">
                          ⚠️
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Important</h4>
                          <p className="text-gray-700">This is not a sale - no ownership transfer of platform or IP rights</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Termination Section */}
                <section id="termination" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-red-100 to-red-200 rounded-xl">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">16. Account Termination</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">Grounds for Termination</h3>
                      <div className="space-y-3">
                        {[
                          "Breach of terms or policies",
                          "Harmful or illegal conduct",
                          "Legal or regulatory requirements",
                          "Continued low ratings",
                          "Non-compliance with SOPs",
                          "Unauthorized activities",
                          "Customer complaints",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">Termination Process</h3>
                      <div className="space-y-3">
                        {[
                          "Immediate without notice possible",
                          "Suspension or deletion of account",
                          "Removal of all user information",
                          "Forfeiture of pending payments",
                          "Legal action may be taken",
                          "Re-registration at company discretion",
                          "Contact support for appeals",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 flex-shrink-0"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Disclaimer Section */}
                <section id="disclaimer" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">19. Disclaimer & Warranties</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">As Is Basis</h4>
                          <p className="text-gray-700">
                            Platform services provided as is and as available" without warranties of any kind.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">No Guarantees</h4>
                          <p className="text-gray-700">
                            No guarantee of perfect, safe, or secure service at all times.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Limited Liability</h4>
                          <p className="text-gray-700">
                            Company not liable for lost profits, revenues, or consequential damages.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Indemnification Section */}
                <section id="indemnity" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">20. Indemnification</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center text-white">
                        ⚖️
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Your Responsibility</h3>
                        <p className="text-gray-600">You agree to indemnify and hold harmless</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Breach of Terms</h4>
                        <p className="text-sm text-gray-600">Any non-performance of obligations</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Law Violation</h4>
                        <p className="text-sm text-gray-600">Violation of laws or third-party rights</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Platform Use</h4>
                        <p className="text-sm text-gray-600">Your use of the platform</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Grievance Section */}
                <section id="grievance" className="scroll-mt-24 mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">22. Grievance Redressal</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                          📧
                        </div>
                        <h3 className="font-bold text-gray-900">Contact Channels</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-green-600" />
                          <a href="mailto:support@ChefChoiceMenu.com" className="text-green-700 hover:text-green-800 font-medium">
                            support@ChefChoiceMenu.com
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">Grievance Officer via same email</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">Support number from contact page</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                          ⚡
                        </div>
                        <h3 className="font-bold text-gray-900">Resolution Timeline</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Acknowledge within prescribed period</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Complex cases may take longer</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span>Regular updates provided</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">23. Contact Us</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white">
                        📞
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Get In Touch</h3>
                        <p className="text-gray-600">For any queries related to platform services</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-blue-200">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Email Support</p>
                          <a href="mailto:support@ChefChoiceMenu.com" className="text-blue-600 hover:text-blue-700">
                            support@ChefChoiceMenu.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-blue-200">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Website</p>
                          <a href="https://ChefChoiceMenu.com" className="text-blue-600 hover:text-blue-700">
                            ChefChoiceMenu.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-blue-200">
                        <Scale className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Registered Office</p>
                          <p className="text-gray-700">F-300, Noida 63, India</p>
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
                      By registering as a Service Partner on CHEFCHOICEMENU, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-sm font-semibold">
                      <FileText className="w-4 h-4" />
                      Effective: December 20, 2025
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