"use client";
import { MapPin, Phone, Mail } from 'lucide-react';
import { use, useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function ContactPage() {

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
   const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const FORMSPREE_ID = "xyzdgree";

    async function submitToFormspree(payload: any) {
    const endpoint = `https://formspree.io/f/${FORMSPREE_ID}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || "Submit failed");
    }
  }
 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      await submitToFormspree({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      setStatus("success");
      setMessage("Thanks! Your message has been sent.");
      setFormData({ name: '', email: '', phone: '', message: '' });

      // setTimeout(() => navigate("/thanks"), 1000);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen pt-20 relative z-10">
        <section className="bg-gradient-to-br from-cream-100 via-primary-50 to-warm-50 py-20">
          <div className="container mx-auto px-4 text-center animate-slide-down">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">GET IN TOUCH WITH US</p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-6">
                {[
                  { icon: <MapPin />, title: "Location", info: "2nd Floor, Plot - 300, Block - F, Sector - 63, Noida. 2010307" },
                  { icon: <Phone />, title: "Phone", info: "+91 85 959 039 39" },
                  { icon: <Mail />, title: "Email", info: "info@chefchoicemenu.com" }
                ].map((item, i) => (
                  <div key={i} className="bg-gradient-to-br from-cream-50 to-white p-6 rounded-2xl shadow-lg animate-slide-right" style={{animationDelay: `${i*0.1}s`}}>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-warm-500 rounded-full flex items-center justify-center text-white">{item.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-gray-600">{item.info}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-cream-50 to-white p-8 rounded-2xl shadow-xl animate-slide-left">
                <h3 className="text-2xl font-bold mb-6">Send Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input value={formData.name} type="text" placeholder="Your Name" onChange={handleChange} name="name" className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none" />
                  <input value={formData.email} type="email" placeholder="Your Email" onChange={handleChange} name="email" className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none" />
                  <input value={formData.phone} type="tel" placeholder="Phone Number" onChange={handleChange} name="phone" className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none" />
                  <textarea value={formData.message} rows={4} placeholder="Your Message" onChange={handleChange} name="message" className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none"></textarea>
                  <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-warm-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>

              <div aria-live="polite" style={{ marginTop: 10 }}>
                {status === "success" && (
                  <span style={{ color: "#13c296" }}>{message}</span>
                )}
                {status === "error" && (
                  <span style={{ color: "#f87171" }}>{message}</span>
                )}
              </div>
                  </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
