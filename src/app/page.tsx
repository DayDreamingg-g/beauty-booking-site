"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Masters from "@/sections/Masters";
import Portfolio from "@/sections/Portfolio";
import Contact from "@/sections/Contact";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <main className="h-screen overflow-y-scroll scroll-smooth bg-black">
        <Header />
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />
        <Services />
        <Masters />
        <Portfolio />
        <Contact />
      </main>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}