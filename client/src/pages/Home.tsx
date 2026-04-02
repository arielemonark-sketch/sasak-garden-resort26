/* ============================================================
   Home — Sasak Garden Resort
   Main landing page assembling all sections
   Design: Kinfolk Tropical Editorial
   Colors: Cream #F8F5F0, Emerald #0F4A38, Gold #D4B88A, Brown #2C1810
   Fonts: Playfair Display (serif headings) + DM Sans (body)
   ============================================================ */

import AboutSection from "@/components/AboutSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import AttractionsSection from "@/components/AttractionsSection";
import BookingSection from "@/components/BookingSection";
import VideoGallerySection from "@/components/VideoGallerySection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import FloatingBar from "@/components/FloatingBar";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import RestaurantSection from "@/components/RestaurantSection";
import ReviewsSection from "@/components/ReviewsSection";
import RoomsSection from "@/components/RoomsSection";
import SpecialOffersSection from "@/components/SpecialOffersSection";
import { useEffect } from "react";

export default function Home() {
  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal, .clip-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        background: "#F8F5F0",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Navigation />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <VideoGallerySection />
      <RoomsSection />
      <SpecialOffersSection />
      <BookingSection />
      <AmenitiesSection />
      <RestaurantSection />
      <ReviewsSection />
      <AttractionsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <FloatingBar />
    </div>
  );
}
