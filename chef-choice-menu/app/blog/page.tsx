import { Calendar, User } from 'lucide-react';
import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function BlogPage() {
  const blogs = [
    { title: "Top Benefits of Hiring a Private Chef", date: "26 Oct 2016", author: "Mitwa Dadkan", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop" },
    { title: "How to Choose the Perfect Chef", date: "26 Oct 2016", author: "Mahvus Georgia", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop" },
    { title: "10 Benefits of Private Chef Services", date: "29 Feb 2018", author: "Alex Hales", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop" }
  ];

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen pt-20 relative z-10">
        <section className="bg-gradient-to-br from-cream-100 via-primary-50 to-warm-50 py-20">
          <div className="container mx-auto px-4 text-center animate-slide-down">
            <p className="text-primary-600 font-semibold text-lg mb-2">Our Blogs</p>
            <h1 className="text-5xl font-bold text-gray-900">Blogs</h1>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {blogs.map((blog, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all animate-scale-in group" style={{animationDelay: `${i*0.1}s`}}>
                  <div className="relative h-56 overflow-hidden">
                    <Image src={blog.img} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{blog.date}</span>
                      <span className="flex items-center gap-1"><User className="w-4 h-4" />{blog.author}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary-500 transition-colors">{blog.title}</h3>
                    <button className="text-primary-600 font-semibold hover:text-primary-700">Read More →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
