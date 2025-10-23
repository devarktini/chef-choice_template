import { Calendar, MapPin, Users, UtensilsCrossed, CheckCircle } from 'lucide-react';

export default function BookingSteps() {
  const steps = [
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "Step 1",
      description: "Select service type & define event occasion",
      color: "from-primary-400 to-primary-500"
    },
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Step 2",
      description: "Enter event location & choose suitable schedule",
      color: "from-warm-400 to-warm-500"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Step 3",
      description: "Specify guest details & set overall budget",
      color: "from-accent-400 to-accent-500"
    },
    {
      icon: <UtensilsCrossed className="w-10 h-10" />,
      title: "Step 4",
      description: "Choose food preferences & dietary restrictions",
      color: "from-fresh-400 to-fresh-500"
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Step 5",
      description: "Confirm contact details & receive chef proposals",
      color: "from-primary-500 to-warm-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-cream-50 to-primary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-grid opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-down">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Chef</h2>
          <p className="text-xl text-gray-600">Easy mobile booking in 5 simple steps</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full">
                <div className={`bg-gradient-to-r ${step.color} text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {step.description}
                </p>
              </div>

              {/* Connecting Arrow (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="text-primary-400 text-3xl">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
