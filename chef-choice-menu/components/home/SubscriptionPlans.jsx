import { Check, Star, ChefHat, Clock, Calendar, Users, Utensils, Heart, Zap, Crown, Shield, Gift } from 'lucide-react';
import Link from 'next/link';

export default function SubscriptionPlans() {
  const plans = [
    {
      name: "Per Day Chef",
      description: "Perfect for house parties, special dinners, and one-off culinary experiences",
      price: "Starting at ₹2,499",
      originalPrice: "₹3,499",
      savings: "Save 28%",
      popular: false,
      features: [
        { icon: ChefHat, text: "One-time chef booking", highlight: true },
        { icon: Utensils, text: "Custom menu planning", highlight: true },
        { icon: Users, text: "All cuisines available (Indian, Continental, Fusion, etc.)" },
        { icon: Clock, text: "Option for in-home cooking or food delivery" },
        { icon: Shield, text: "Ingredients can be provided by customer or chef" },
        { icon: Heart, text: "Ideal for gatherings, date nights, or celebrations" }
      ],
      cta: "Book for Today",
      color: "orange"
    },
    {
      name: "Weekly Chef",
      description: "Chef visit 7 days a week with complete meal customization",
      price: "₹15,999",
      originalPrice: "₹22,399",
      savings: "Save 29%",
      popular: true,
      features: [
        { icon: Calendar, text: "Chef visit 7 days a week", highlight: true },
        { icon: Users, text: "Meals as per your customization plan (vegan, keto, low carb, etc.)", highlight: true },
        { icon: Utensils, text: "In-home meal prep and cooking at your home or delivered to your door" },
        { icon: Zap, text: "Enjoy the freedom to switch chefs or cuisines as per choice" },
        { icon: Clock, text: "Flexible pause or reschedule options" },
        { icon: Shield, text: "Quality guaranteed with every meal" }
      ],
      cta: "Start Weekly Plan",
      color: "red"
    },
    {
      name: "Monthly Chef",
      description: "Your full-time culinary partner for daily meals and comfort",
      price: "₹49,999",
      originalPrice: "₹74,999",
      savings: "Save 33%",
      popular: false,
      features: [
        { icon: Crown, text: "Chef assigned exclusively for all working days", highlight: true },
        { icon: Clock, text: "Breakfast, lunch, or dinner options available", highlight: true },
        { icon: Utensils, text: "Fully customized menu based on preferences" },
        { icon: Gift, text: "Free access to special festive and seasonal menus" },
        { icon: Users, text: "Dedicated customer support" },
        { icon: Heart, text: "Complimentary guest meal preparation included" },
        { icon: Shield, text: "Priority booking and scheduling" }
      ],
      cta: "Choose Monthly Plan",
      color: "amber"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <ChefHat className="w-4 h-4" />
            CHEF SUBSCRIPTION PLANS
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-orange-600">Culinary Experience</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From one-time celebrations to daily culinary excellence, we have the perfect plan for your needs
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg flex items-center gap-2">
                    <Star className="w-4 h-4 fill-white" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className={`h-full bg-white rounded-3xl shadow-2xl overflow-hidden border-2 transition-all hover:scale-105 ${
                plan.popular ? 'border-orange-500' : 'border-orange-200'
              }`}>
                <div className={`bg-gradient-to-r ${
                  plan.color === 'orange' ? 'from-orange-500 to-amber-500' :
                  plan.color === 'red' ? 'from-red-500 to-orange-500' :
                  'from-amber-500 to-orange-500'
                } text-white p-8`}>
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <p className="text-orange-100 mb-4">{plan.description}</p>
                  
                  {/* <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-orange-200 line-through text-lg ml-2">{plan.originalPrice}</span>
                      )}
                    </div>
                    {plan.savings && (
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                        {plan.savings}
                      </span>
                    )}
                  </div> */}
                </div>

                {/* Features */}
                <div className="p-6">
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          feature.highlight 
                            ? 'bg-orange-100 text-orange-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <feature.icon className="w-4 h-4" />
                        </div>
                        <span className={`text-sm ${
                          feature.highlight ? 'font-semibold text-gray-900' : 'text-gray-700'
                        }`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                   <Link href="/contact">
                  <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg'
                      : 'bg-orange-100 hover:bg-orange-200 text-orange-700'
                  }`}>
                    {plan.cta}
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}