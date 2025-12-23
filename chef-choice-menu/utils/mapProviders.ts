// utils/mapProviders.ts
export const mapProviders = (apiProviders: any[]) => {
  return apiProviders.map((p) => ({
    value: p.id, // used for selection
    label: p.company_name || `${p.user.first_name} ${p.user.last_name}`,
    title: `${p.service_type.toUpperCase()} • ${p.experience_years}+ yrs`,
    image: p.user.profile_picture,
    rating: p.avg_rating || 0,
    reviews: p.review_count || 0,
    specialties: Object.keys(p.specialization || {}),
    price: p.services?.[0]
      ? `₹${p.services[0].price} ${p.services[0].price_unit}`
      : "Price on request",
    badge: p.verified ? "Verified" : "New",
    verified: p.verified,
    experience: `${p.experience_years} years`,
    location: p.service_area,
    contact: p.user.email,
    email: p.user.email,
    description: p.description,
    awards: [],
    languages: ["English", "Hindi"],
    raw: p, // keep full object if needed later
  }));
};
