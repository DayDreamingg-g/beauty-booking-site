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
  const [selectedService, setSelectedService] = useState("");

  const openBooking = (service?: string) => {
    setSelectedService(service ?? "");
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <>
      <main className="h-screen overflow-y-scroll scroll-smooth bg-black">
        <Header onOpenBooking={() => openBooking()} />
        <Hero onOpenBooking={() => openBooking()} />
        <Services onSelectService={(service) => openBooking(service)} />
        <Masters />
        <Portfolio />
        <Contact />
      </main>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        selectedService={selectedService}
      />
    </>
  );
}