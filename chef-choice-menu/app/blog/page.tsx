'use client';
import { Calendar, User } from 'lucide-react';
import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useEffect, useState } from 'react';
import { getChefBlogs } from '../../services/blogService';
import Link from 'next/link';

const BASE_IMAGE_URL = 'https://blogapi.gyprc.com';

interface Blog {
  id: string;
  title: string;
  date: string;
  author: string;
  img: string;
  content?: string;
  excerpt?: string;
}

interface BlogPageState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

export default function BlogPage() {
  const [state, setState] = useState<BlogPageState>({
    blogs: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const blogsData = await getChefBlogs();
        console.log("aaaaaaa", blogsData)
        
        // Validate and transform the data
        const validatedBlogs: Blog[] = blogsData.blogs.map((blog: any, index: number) => ({
          id: blog._id || `blog-${index}`,
          title: blog.title || 'Untitled Blog',
          date: blog.createdAt || new Date().toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          }),
          author: blog.author || 'Unknown Author',
          img: blog.imageUrl ? `${BASE_IMAGE_URL}${blog.imageUrl}` : '/images/blog-placeholder.jpg',
          content: blog.content,
          excerpt: blog.type,
        }));
        
        setState({
          blogs: validatedBlogs,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setState({
          blogs: [],
          loading: false,
          error: 'Failed to load blogs. Please try again later.',
        });
      }
    };

    fetchBlogs();
  }, []);

  const { blogs, loading, error } = state;

  if (loading) {
    return (
      <>
        <AnimatedBackground />
        <main className="min-h-screen pt-20 relative z-10">
          <section className="bg-gradient-to-br from-cream-100 via-primary-50 to-warm-50 py-20">
            <div className="container mx-auto px-4 text-center">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-32 mx-auto mb-4"></div>
                <div className="h-12 bg-gray-300 rounded w-48 mx-auto"></div>
              </div>
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="h-56 bg-gray-300 animate-pulse"></div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                      </div>
                      <div className="h-6 bg-gray-300 rounded mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded w-32"></div>
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

  if (error) {
    return (
      <>
        <AnimatedBackground />
        <main className="min-h-screen pt-20 relative z-10">
          <section className="bg-gradient-to-br from-cream-100 via-primary-50 to-warm-50 py-20">
            <div className="container mx-auto px-4 text-center">
              <p className="text-primary-600 font-semibold text-lg mb-2">Our Blogs</p>
              <h1 className="text-5xl font-bold text-gray-900">Blogs</h1>
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-2xl p-8">
                <div className="text-red-600 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Error Loading Blogs</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  if (blogs.length === 0) {
    return (
      <>
        <AnimatedBackground />
        <main className="min-h-screen pt-20 relative z-10">
          <section className="bg-gradient-to-br from-cream-100 via-primary-50 to-warm-50 py-20">
            <div className="container mx-auto px-4 text-center">
              <p className="text-primary-600 font-semibold text-lg mb-2">Our Blogs</p>
              <h1 className="text-5xl font-bold text-gray-900">Blogs</h1>
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-8">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Blogs Available</h3>
                <p className="text-gray-600">Check back later for new blog posts!</p>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

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
                <article 
                  key={blog.id} 
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all animate-scale-in group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src={blog.img} 
                      alt={blog.title}
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      priority={i < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 flex-wrap">
                      <time className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {blog.date}
                      </time>
                      <address className="flex items-center gap-1 not-italic">
                        <User className="w-4 h-4" />
                        {blog.author}
                      </address>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <Link href={`/blog/${blog.title
                      .toLowerCase()                // convert to lowercase
                      .replace(/[^a-z0-9\s-]/g, "") // remove special chars except spaces and -
                      .trim()                       // remove leading/trailing spaces
                      .replace(/\s+/g, "-")         // replace spaces with -
                      }/${blog.id}`} >
                    <button 
                    //  onClick={() => handleReadMore(blog)}
                      className="text-primary-600 font-semibold hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                      aria-label={`Read more about ${blog.title}`}
                    >
                      Read More →
                    </button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}