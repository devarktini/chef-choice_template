import { MapPin, Users, Star, Heart, Calendar, Utensils } from 'lucide-react';
import Image from 'next/image';

export default function VenuePage() {
  const venues = [
    {
      name: "Grand Ballroom",
      type: "Luxury Banquet",
      capacity: "200-300 Guests",
      location: "City Center",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop",
      price: "₹85,000"
    },
    // {
    //   name: "Serene Farmhouse",
    //   type: "Outdoor Venue",
    //   capacity: "150-250 Guests",
    //   location: "Outskirts",
    //   rating: 4.9,
    //   reviews: 89,
    //   image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&h=400&fit=crop",
    //   price: "₹65,000"
    // },
    {
      name: "Skyline Terrace",
      type: "Rooftop Garden",
      capacity: "80-120 Guests",
      location: "Downtown",
      rating: 4.7,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
      price: "₹45,000"
    },
    {
      name: "Royal Palace Hall",
      type: "Traditional Venue",
      capacity: "300-500 Guests",
      location: "Heritage District",
      rating: 4.6,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
      price: "₹1,20,000"
    },
    // {
    //   name: "Garden Pavilion",
    //   type: "Outdoor Garden",
    //   capacity: "100-180 Guests",
    //   location: "Green Park",
    //   rating: 4.8,
    //   reviews: 92,
    //   image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop",
    //   price: "₹55,000"
    // },
    // {
    //   name: "Beachside Villa",
    //   type: "Destination Venue",
    //   capacity: "50-100 Guests",
    //   location: "Coastal Area",
    //   rating: 4.9,
    //   reviews: 78,
    //   image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    //   price: "₹95,000"
    // }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect <span className="text-orange-600">Venue</span>
          </h1>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              From cozy private parties to grand celebrations — we've got the perfect space with help of our preferred event Management company for every moment! Enjoy exclusive access to party halls, farmhouses, and beautiful event venues, all paired with our top-notch catering service.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mt-4">
              With ChefChoiceMenu, your special occasion becomes an unforgettable experience — full of flavor, elegance, and joy. Let's make your moments magical together!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">50+</div>
              <div className="text-gray-600">Venues</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">15+</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">1000+</div>
              <div className="text-gray-600">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">4.8★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-orange-600">Venues</span>
            </h2>
            <p className="text-xl text-gray-600">
              Discover handpicked venues for your special occasions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  {/* <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full font-semibold">
                    {venue.price}
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{venue.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{venue.rating}</span>
                      <span>({venue.reviews})</span>
                    </div>
                  </div>

                  <p className="text-orange-600 font-semibold mb-3">{venue.type}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{venue.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{venue.capacity}</span>
                    </div>
                  </div>

                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Venue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Perfect Venue?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Let us help you create unforgettable memories in the perfect setting
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3">
              <Utensils className="w-5 h-5" />
              Book Venue & Catering
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors">
              View All Venues
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}