"use client";

import { useState } from "react";
import type { MasterItem, PortfolioItem, ServiceItem } from "@/app/page";
import Header from "@/components/Header";
import BookingModal from "@/components/BookingModal";
import PortfolioLightbox from "@/components/PortfolioLightbox";
import SiteBackground from "@/components/SiteBackground";
import Contact from "@/sections/Contact";
import Hero from "@/sections/Hero";
import Masters from "@/sections/Masters";
import Portfolio from "@/sections/Portfolio";
import Services from "@/sections/Services";

type HomeClientProps = {
  services: ServiceItem[];
  masters: MasterItem[];
  portfolioItems: PortfolioItem[];
};

export default function HomeClient({
  services,
  masters,
  portfolioItems,
}: HomeClientProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedMaster, setSelectedMaster] = useState("");

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedPortfolioIndex, setSelectedPortfolioIndex] = useState(0);

  const serviceNames = services.map((service) => service.title);
  const masterNames = masters.map((master) => master.name);

  const openBooking = (service = "", master = "") => {
    setSelectedService(service);
    setSelectedMaster(master);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  const openPortfolioImage = (index: number) => {
    setSelectedPortfolioIndex(index);
    setIsLightboxOpen(true);
  };

  const closePortfolioImage = () => {
    setIsLightboxOpen(false);
  };

  const showPrevPortfolioImage = () => {
    setSelectedPortfolioIndex((prev) =>
      prev === 0 ? portfolioItems.length - 1 : prev - 1
    );
  };

  const showNextPortfolioImage = () => {
    setSelectedPortfolioIndex((prev) =>
      prev === portfolioItems.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <SiteBackground />

      <Header onOpenBooking={() => openBooking()} />

      <main className="relative z-10">
        <Hero
          onOpenBooking={() => openBooking()}
          mastersCount={masters.length}
          worksCount={portfolioItems.length}
        />

        <Services
          services={services}
          onSelectService={(service) => openBooking(service, "")}
        />

        <Masters
          masters={masters}
          onSelectMaster={(master) => openBooking("", master)}
        />

        <Portfolio items={portfolioItems} onOpenImage={openPortfolioImage} />

        <Contact />
      </main>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        selectedService={selectedService}
        selectedMaster={selectedMaster}
        services={serviceNames}
        masters={masterNames}
      />

      <PortfolioLightbox
        isOpen={isLightboxOpen}
        onClose={closePortfolioImage}
        items={portfolioItems}
        selectedIndex={selectedPortfolioIndex}
        onPrev={showPrevPortfolioImage}
        onNext={showNextPortfolioImage}
        onBook={(service, master) => {
          closePortfolioImage();
          openBooking(service, master);
        }}
      />
    </>
  );
}