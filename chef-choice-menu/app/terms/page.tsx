"use client";

import AnimatedBackground from '@/components/AnimatedBackground';
import {
  ScrollText,
  Shield,
  Users,
  CalendarCheck,
  UtensilsCrossed,
  AlertCircle,
  CheckCircle2,
  XCircle,
  CreditCard,
  GraduationCap,
  Star,
  RefreshCcw,
  Mail,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { id: 'services', label: '1. Services' },
    { id: 'registration', label: '2. Registration' },
    { id: 'bookings', label: '3. Bookings' },
    { id: 'conduct', label: '4. Provider Conduct' },
    { id: 'dos-donts', label: '5. DOs and DON\'Ts' },
    { id: 'payment', label: '6. Fees & Payment' },
    { id: 'refunds', label: 'Refund Policy' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <div className="min-h-screen bg-cream-50 relative">
      <AnimatedBackground />

      {/* Header Banner */}
      <div className="relative pt-28 pb-12 px-6 bg-gradient-to-b from-primary-900/10 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4 font-serif">
            Terms & Conditions
          </h1>
          <p className="text-earth-600 max-w-2xl mx-auto text-lg">
            Please read these terms carefully before using our services. Last updated on 20 December, 2025.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sticky Navigation Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-primary-100">
              <h3 className="font-bold text-earth-800 mb-4 flex items-center gap-2">
                <ScrollText className="w-5 h-5 text-primary-600" />
                Contents
              </h3>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-3 py-2 text-sm text-earth-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors border-l-2 border-transparent hover:border-primary-500"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 bg-white rounded-3xl shadow-xl border border-primary-100/50 overflow-hidden">
            <div className="p-8 md:p-12 space-y-12">

              {/* Introduction */}
              <div className="prose prose-earth max-w-none">
                <p className="text-lg leading-relaxed text-earth-700">
                  These terms and conditions (“Terms”) govern the use of ChefChoiceMenu website and mobile application. The company <span className="font-semibold text-primary-800">TingleTaste LLP</span> is the sole and exclusive owner of the brand ChefChoiceMenu. By visiting, using, or interacting with the Platform, Users accept to be bound by these Terms.
                </p>
              </div>

              {/* 1. Services */}
              <section id="services" className="scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary-100 rounded-xl text-primary-700">
                    <UtensilsCrossed className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-earth-800">1. Services</h2>
                </div>
                <div className="text-earth-600 space-y-4 leading-relaxed pl-2 border-l-4 border-primary-100 ml-4">
                  <p>1.1 The Company provides the Platform for Users to render services as chefs and event management professionals (&quot;Service Partners&quot;) for end customers.</p>
                  <p>1.2 Users must register to provide services. Registration allows access to bookings for personal or corporate events.</p>
                  <p>1.3 Service Partners are engaged solely for providing services via the Platform and no employer-employee relationship is created.</p>
                </div>
              </section>

              {/* 2. User Registration */}
              <section id="registration" className="scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary-100 rounded-xl text-primary-700">
                    <Users className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-earth-800">2. Registration & Membership</h2>
                </div>
                <div className="text-earth-600 space-y-4 leading-relaxed">
                  <p>2.1 Users must provide accurate personal info (name, email, mobile, etc.) to register.</p>
                  <p>2.3 Service Partners must add professional details: experience, photos, identity proof, and cuisine specialization.</p>
                  <div className="bg-warm-50 p-4 rounded-lg border border-warm-100 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-warm-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-warm-800">Registering does not guarantee fixed bookings or income. Frequency depends on demand and skill set.</p>
                  </div>
                </div>
              </section>

              {/* 3. Bookings */}
              <section id="bookings" className="scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary-100 rounded-xl text-primary-700">
                    <CalendarCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-earth-800">3. Bookings</h2>
                </div>
                <div className="space-y-4 text-earth-600 leading-relaxed">
                  <p>3.1 Customers select date, time, location, and menu. Service Partners are allocated based on availability.</p>
                  <p>3.3 Partners must accept bookings within <strong>2 hours</strong> of confirmation.</p>
                  <p>3.5 Partners must verify OTP from Customer before starting service.</p>
                  <p>3.6 Partners must clean the event location and mark the booking as completed via OTP before leaving.</p>
                  <div className="bg-primary-50/50 p-6 rounded-xl space-y-3 border border-primary-100">
                    <h4 className="font-semibold text-primary-900">Key Responsibilities</h4>
                    <ul className="list-disc pl-5 space-y-2 text-earth-700">
                      <li>Ensure required equipment/ingredients are available.</li>
                      <li>Handle equipment with care.</li>
                      <li>Update availability regularly (notify 2 days prior for unavailability).</li>
                      <li>Maintain your own Service Kit (provided against deposit).</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 4. Conduct */}
              <section id="conduct" className="scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary-100 rounded-xl text-primary-700">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-earth-800">4. Service Partner Conduct</h2>
                </div>
                <ul className="space-y-3 text-earth-600 list-disc pl-5">
                  <li className="pl-2"><span className="font-medium text-earth-800">Arrival:</span> Inform customer of ETA. Check for specific house rules (e.g., no shoes).</li>
                  <li className="pl-2"><span className="font-medium text-earth-800">POC:</span> Identify one Point of Contact for coordination.</li>
                  <li className="pl-2"><span className="font-medium text-earth-800">Hygiene:</span> Check ingredient freshness. Maintain food temperatures (Hot &gt; 60°C, Cold &lt; 4°C).</li>
                  <li className="pl-2"><span className="font-medium text-earth-800">Service:</span> Serve on time, take feedback, pack leftovers efficiently.</li>
                  <li className="pl-2"><span className="font-medium text-earth-800">Uniform:</span> Always wear clean ChefChoiceMenu uniform and maintain a hygienic kit.</li>
                </ul>
              </section>

              {/* 5. DOs and DON'Ts */}
              <section id="dos-donts" className="scroll-mt-28">
                <h2 className="text-2xl font-bold text-earth-800 mb-6 flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary-500 rounded-full"></div>
                  5. DOs and DON&apos;Ts
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100">
                    <h3 className="flex items-center gap-2 text-green-800 font-bold mb-4 text-lg">
                      <CheckCircle2 className="w-5 h-5" /> DOs
                    </h3>
                    <ul className="space-y-3 text-sm text-green-900/80">
                      <li className="flex gap-2"><span className="text-green-500">•</span> Arrive in spotless chef jacket/uniform.</li>
                      <li className="flex gap-2"><span className="text-green-500">•</span> Keep nails trimmed, hands washed properly.</li>
                      <li className="flex gap-2"><span className="text-green-500">•</span> Keep raw and cooked food separate.</li>
                      <li className="flex gap-2"><span className="text-green-500">•</span> Clean and wash all used utensils.</li>
                      <li className="flex gap-2"><span className="text-green-500">•</span> Leave kitchen clean and sanitized.</li>
                      <li className="flex gap-2"><span className="text-green-500">•</span> Keep customer informed at all times.</li>
                    </ul>
                  </div>

                  <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100">
                    <h3 className="flex items-center gap-2 text-red-800 font-bold mb-4 text-lg">
                      <XCircle className="w-5 h-5" /> DON&apos;Ts
                    </h3>
                    <ul className="space-y-3 text-sm text-red-900/80">
                      <li className="flex gap-2"><span className="text-red-500">•</span> Keep long hair open.</li>
                      <li className="flex gap-2"><span className="text-red-500">•</span> Use excessive makeup or strong fragrances.</li>
                      <li className="flex gap-2"><span className="text-red-500">•</span> Handle food with bandages or unwashed hands.</li>
                      <li className="flex gap-2"><span className="text-red-500">•</span> Pile dishes or make mess.</li>
                      <li className="flex gap-2"><span className="text-red-500">•</span> Thaw food on counter.</li>
                      <li className="flex gap-2"><span className="text-red-500">•</span> Leave waste unattended.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 6. Fees & Payment */}
              <section id="payment" className="scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary-100 rounded-xl text-primary-700">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-earth-800">6. Fees & Payment Terms</h2>
                </div>
                <div className="text-earth-600 space-y-4">
                  <p>Service Partners quote expected remuneration during signup. Fees are paid within <strong>3 days</strong> of a Completed Booking via bank transfer.</p>
                  <p className="text-sm bg-gray-50 p-4 rounded-lg"><strong>Note:</strong> Company retains a commission. Fees are exclusive of taxes. Partner bears travel/setup costs.</p>
                </div>
              </section>

              {/* Training & Ratings */}
              <section className="scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary-100 rounded-xl text-primary-700">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-earth-800">Training & Ratings</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <h3 className="font-bold text-earth-800">Minimum Rating</h3>
                    </div>
                    <p className="text-sm text-earth-600">Partners must maintain a Minimum Average Rating. Falling below this may lead to deactivation. Higher ratings improve booking chances.</p>
                  </div>
                  <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-primary-500" />
                      <h3 className="font-bold text-earth-800">SOP Adherence</h3>
                    </div>
                    <p className="text-sm text-earth-600">Strict adherence to Standard Operating Procedures (SOPs) is mandatory.</p>
                  </div>
                </div>
              </section>

              {/* Disclaimer/Obligations Block */}
              <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-earth-800 mb-4">Obligations & Prohibitions</h3>
                <p className="text-sm text-earth-600 mb-4">Users must ensure safety, legality, and professionalism at all times. Prohibited activities (harassment, illegal substances, false info) will lead to immediate account termination and legal action.</p>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                  Company reserves right to terminate accounts for violations.
                </div>
              </section>

              {/* Customer Policy Section */}
              <div className="border-t-2 border-primary-100 pt-12 mt-12">
                <section id="refunds" className="scroll-mt-28">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-primary-100 rounded-xl text-primary-700">
                      <RefreshCcw className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-primary-900">Customer Cancellation & Refund Policy</h2>
                      <p className="text-primary-600 text-sm">Updated 10th December, 2025</p>
                    </div>
                  </div>

                  <div className="overflow-hidden bg-white shadow-sm rounded-xl border border-gray-200 mb-8">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-earth-50">
                        <tr>
                          <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-earth-700 uppercase tracking-wider">
                            Timeline
                          </th>
                          <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-earth-700 uppercase tracking-wider">
                            Refund (%)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-earth-700">Before Service Partner assignment</td>
                          <td className="px-6 py-4 text-sm font-semibold text-green-600">Full Refund</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-earth-700">No show by Service Partner</td>
                          <td className="px-6 py-4 text-sm font-semibold text-green-600">Full Refund</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-earth-700">
                            Assignment confirmed UNTIL ingredients dispatched OR <br />
                            12 hours before ETA
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-primary-600">50% Refund</td>
                        </tr>
                        <tr className="bg-red-50/10">
                          <td className="px-6 py-4 text-sm text-earth-700">
                            Customer missed booking / No one at location OR <br />
                            Ingredients/Equipment not ready upon Partner arrival
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-red-600">No Refund</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-sm text-earth-500 italic mb-10">
                    * Refunds are processed within 10-15 business days to original source. Company Cancellation due to unavoidable incidents = Full Refund.
                  </p>

                  {/* Partner Policy */}
                  <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
                    <h3 className="text-xl font-bold text-primary-900 mb-4">Chef/Caterer Partner Policy</h3>
                    <div className="space-y-4 text-earth-700">
                      <p><strong>Refunds:</strong> Not applicable for Partners after payment is made.</p>
                      <p><strong>Cancellation:</strong> Partners allowed <strong>1 cancellation/month</strong> (must be 72h prior).
                        Calculated monthly. Excess cancellations affect rating and leads.</p>
                    </div>
                  </div>

                </section>
              </div>

              {/* 23. Contact */}
              <section id="contact" className="scroll-mt-28 py-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary-100 rounded-xl text-primary-700">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-earth-800">Contact Us</h2>
                </div>
                <div className="bg-earth-900 text-white rounded-2xl p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Have questions?</h3>
                    <p className="text-earth-200">Our support team is here to help you.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="mailto:support@ChefChoiceMenu.com" className="bg-white text-earth-900 px-6 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors">
                      support@ChefChoiceMenu.com
                    </a>
                  </div>
                </div>
              </section>

              {/* Standard Footer Legalese */}
              <div className="text-xs text-earth-400 mt-12 border-t border-gray-100 pt-6">
                <p>Disclaimer: The Company may amend these Terms and Policies at any time. Continued use of the Platform implies consent to amended terms.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
