import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import BookingFlowModalPortal from "@/components/booking/BookingFlowModalPortal";
// import i from "../public/icon.png"

export const metadata: Metadata = {
  title: "Chef Choice Menu - Premium Chef Services",
  description: "Discover the finest dishes crafted with love. Book professional chefs for your events.",
  icons: {
    icon: "https://res.cloudinary.com/dzvvb0z0h/image/upload/f_auto,q_auto/v1757953170/removeb_sxbskt.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream-50">
        <Providers />
        <Header />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
        <BookingFlowModalPortal />
      </body>
    </html>
  );
}
