import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import BookingFlowModalPortal from "@/components/booking/BookingFlowModalPortal";
import Script from "next/script";
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
      <head>
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KX3QD7L6');
          `}
        </Script>
      </head>
      <body className="bg-cream-50">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KX3QD7L6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
