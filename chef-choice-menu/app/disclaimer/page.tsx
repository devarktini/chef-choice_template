import AnimatedBackground from '@/components/AnimatedBackground';

export default function DisclaimerPage() {
  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen pt-20 relative z-10">
        <section className="py-20 bg-gradient-to-br from-cream-100 via-primary-50 to-warm-50">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-center text-gray-900 mb-12 animate-slide-down">Disclaimer</h1>
            <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-2xl animate-scale-in">
              <p className="text-gray-700 leading-relaxed">Legal content for disclaimer...</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
