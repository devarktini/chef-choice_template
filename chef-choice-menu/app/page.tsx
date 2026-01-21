'use client';

import { useRef } from 'react';
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
  const thirdSectionRef = useRef<HTMLDivElement>(null);

  const scrollToThirdSection = () => {
    thirdSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen pt-20 relative z-10">
        <Hero onHowItWorksClick={scrollToThirdSection} />
        <Occasions />
        <VideoSection />
        {/* <Services /> */}
        <div ref={thirdSectionRef}>
          <ThirdSection />
        </div>
        {/* <BookingSteps /> */}
        {/* <AddOnServices /> */}
        <SubscriptionPlans />

        <Testimonials />
        {/* <FAQ /> */}
      </main>
    </>
  );
}
