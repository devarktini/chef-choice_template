import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Chef Choice Menu - Premium Chef Services",
  description: "Discover the finest dishes crafted with love. Book professional chefs for your events.",
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
      </body>
    </html>
  );
}
