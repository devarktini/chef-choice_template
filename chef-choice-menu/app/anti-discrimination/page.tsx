"use client";

import { useState } from 'react';
import { 
  FileText, 
  Shield, 
  Users, 
  Heart,
  Gavel,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  MessageSquare
} from 'lucide-react';

export default function AntiDiscriminationPolicyPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { 
      id: 'overview', 
      title: 'Overview', 
      icon: <FileText className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Commitment</h3>
            <p className="text-gray-700 leading-relaxed">
              ChefChoiceMenu, operated by Tinge Taste LLP (Company, we, our, or us), is committed to maintaining a safe, inclusive, and non-discriminatory platform for all users and service partners across India.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <div className="flex gap-4">
              <Heart className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Equal Access for All</h4>
                <p className="text-blue-800">
                  We believe that everyone deserves equal access to our services, regardless of their background, identity, or personal characteristics.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'prohibited', 
      title: 'Prohibited Discrimination', 
      icon: <Shield className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed font-medium">
            The Company strictly prohibits discrimination against any customer or service provider on the basis of:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Religion',
              'Caste',
              'Race',
              'Ethnicity',
              'National origin',
              'Disability',
              'Sex',
              'Sexual orientation',
              'Gender identity',
              'Marital status',
              'Age',
              'Other protected characteristics'
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    { 
      id: 'conduct', 
      title: 'Discriminatory Conduct', 
      icon: <AlertCircle className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What Constitutes Discriminatory Conduct</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-6 py-3">
                <h4 className="font-semibold text-gray-900 mb-2">Service Refusal</h4>
                <p className="text-gray-700">
                  Refusal to provide services based on any protected characteristic
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-6 py-3">
                <h4 className="font-semibold text-gray-900 mb-2">Service Cancellation</h4>
                <p className="text-gray-700">
                  Refusing to accept or cancelling services based on protected characteristics
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-6 py-3">
                <h4 className="font-semibold text-gray-900 mb-2">Incomplete Service</h4>
                <p className="text-gray-700">
                  Failure to complete services due to discriminatory reasons
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6 py-3">
                <h4 className="font-semibold text-gray-900 mb-2">Harassing Behavior</h4>
                <p className="text-gray-700">
                  Any form of harassment, intimidation, or hostile behavior based on protected characteristics
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-6">
            <div className="flex gap-4">
              <Lightbulb className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-red-900 mb-2">Non-Exhaustive List</h4>
                <p className="text-red-800">
                  The above examples are not exhaustive. Discriminatory conduct includes, but is not limited to, refusal to provide, accept, or complete services based on any protected characteristic.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'enforcement', 
      title: 'Enforcement & Consequences', 
      icon: <Gavel className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What Happens When Policy is Violated</h3>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Corrective Action</h4>
                    <p className="text-gray-700 mb-4">
                      Any customer or service partner found to be in violation of this policy may be subject to corrective action, including:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-red-600 font-bold">•</span>
                        <span className="text-gray-700"><strong>Suspension of Account:</strong> Temporary removal from the platform pending investigation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-600 font-bold">•</span>
                        <span className="text-gray-700"><strong>Permanent Termination:</strong> Complete removal from ChefChoiceMenu platform</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-600 font-bold">•</span>
                        <span className="text-gray-700"><strong>Financial Penalties:</strong> Refunds to affected parties where applicable</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-600 font-bold">•</span>
                        <span className="text-gray-700"><strong>Legal Action:</strong> Reporting to appropriate authorities as per applicable laws</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-xl">
              <p className="text-gray-800">
                <strong>Discretion & Compliance:</strong> All corrective actions are taken at the Company's sole discretion and in accordance with applicable laws in India and the respective states/union territories where our services operate.
              </p>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'reporting', 
      title: 'Report Discrimination', 
      icon: <MessageSquare className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex gap-4">
              <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Have You Experienced Discrimination?</h4>
                <p className="text-blue-800 mb-4">
                  We take all complaints seriously. If you believe you or someone else has been discriminated against on our platform, please report it immediately.
                </p>
                <p className="text-blue-800">
                  Your report will be investigated promptly and confidentially to the extent possible under the law.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-orange-600" />
                <h4 className="font-semibold text-gray-900">Contact Support Team</h4>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Report through our support channels for immediate review and investigation.
              </p>
              <a href="mailto:support@chefchoicemenu.com" className="text-orange-600 font-semibold hover:underline text-sm">
                support@chefchoicemenu.com
              </a>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-orange-600" />
                <h4 className="font-semibold text-gray-900">Confidential Reporting</h4>
              </div>
              <p className="text-gray-700 text-sm">
                All reports are treated with confidentiality and investigated by our dedicated team without retaliation against the reporter.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-40 -mt-40"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-40 -mb-40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30">
              <Heart className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Anti-Discrimination Policy
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              ChefChoiceMenu is committed to providing equal access and treatment to all users, free from discrimination.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Sections</h3>
              </div>
              <nav className="space-y-1 p-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-orange-100 text-orange-900 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="space-y-12">
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-xl border border-gray-200 p-8 md:p-10 shadow-sm scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex-shrink-0">
                      {section.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <div className="text-gray-700">
                    {section.content}
                  </div>
                </div>
              ))}

              {/* Additional Resources */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <a href="/terms" className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition">
                    <FileText className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Terms & Conditions</h4>
                      <p className="text-sm text-gray-600 mt-1">Read our complete terms of service</p>
                    </div>
                  </a>
                  
                  <a href="/privacy" className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition">
                    <Shield className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Privacy Policy</h4>
                      <p className="text-sm text-gray-600 mt-1">Understand how we protect your data</p>
                    </div>
                  </a>

                  <a href="/cancellation-refund-policy" className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition">
                    <FileText className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Cancellation & Refunds</h4>
                      <p className="text-sm text-gray-600 mt-1">Learn about our refund policies</p>
                    </div>
                  </a>

                  <a href="/contact" className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition">
                    <MessageSquare className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Contact Us</h4>
                      <p className="text-sm text-gray-600 mt-1">Get in touch with our support team</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Footer Note */}
              <div className="text-center text-gray-600 text-sm py-6 border-t border-gray-200">
                <p>
                  This Anti-Discrimination Policy is effective as of the date of publication and subject to updates.
                </p>
                <p className="mt-2">
                  Last Updated: December 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
