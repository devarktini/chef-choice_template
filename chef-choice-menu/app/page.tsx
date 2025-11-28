import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import BookingSteps from "@/components/home/BookingSteps";
import AddOnServices from "@/components/home/AddOnServices";
import Occasions from "@/components/home/Occasions";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import VideoSection from "@/components/home/VideoSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThirdSection from "@/components/home/ThirdSection/ThirdSection";
import SubscriptionPlans from "@/components/home/SubscriptionPlans";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen pt-20 relative z-10">
        <Hero />
        <VideoSection />
        <Services />
        <ThirdSection />
        {/* <BookingSteps /> */}
        <AddOnServices />
        <SubscriptionPlans />
        <Occasions />
        <Testimonials />
        <FAQ />
      </main>
    </>
  );
}
