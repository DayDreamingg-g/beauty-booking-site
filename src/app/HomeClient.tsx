"use client";

import { useMemo, useState } from "react";
import type {
  MasterItem,
  PortfolioItem,
  ReviewItem,
  ServiceItem,
} from "@/app/page";
import Header from "@/components/Header";
import BookingModal from "@/components/BookingModal";
import PortfolioLightbox from "@/components/PortfolioLightbox";
import SiteBackground from "@/components/SiteBackground";
import Contact from "@/sections/Contact";
import Hero from "@/sections/Hero";
import Masters from "@/sections/Masters";
import Portfolio from "@/sections/Portfolio";
import Reviews from "@/sections/Reviews";
import Services from "@/sections/Services";

type HomeClientProps = {
  services: ServiceItem[];
  masters: MasterItem[];
  portfolioItems: PortfolioItem[];
  reviews: ReviewItem[];
};

export default function HomeClient({
  services,
  masters,
  portfolioItems,
  reviews,
}: HomeClientProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedMaster, setSelectedMaster] = useState("");

  const [portfolioMasterFilter, setPortfolioMasterFilter] = useState("all");
  const [reviewsMasterFilter, setReviewsMasterFilter] = useState("all");

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedPortfolioIndex, setSelectedPortfolioIndex] = useState(0);

  const serviceNames = services.map((service) => service.title);
  const masterNames = masters.map((master) => master.name);

  const filteredPortfolioItems = useMemo(() => {
    if (portfolioMasterFilter === "all") {
      return portfolioItems;
    }

    return portfolioItems.filter(
      (item) => item.masterId === portfolioMasterFilter
    );
  }, [portfolioItems, portfolioMasterFilter]);

  const openBooking = (service = "", master = "") => {
    setSelectedService(service);
    setSelectedMaster(master);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const openMasterReviews = (masterId: string) => {
    setReviewsMasterFilter(masterId);
    setTimeout(() => scrollToSection("reviews"), 0);
  };

  const openMasterPortfolio = (masterId: string) => {
    setPortfolioMasterFilter(masterId);
    setTimeout(() => scrollToSection("portfolio"), 0);
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
      prev === 0 ? filteredPortfolioItems.length - 1 : prev - 1
    );
  };

  const showNextPortfolioImage = () => {
    setSelectedPortfolioIndex((prev) =>
      prev === filteredPortfolioItems.length - 1 ? 0 : prev + 1
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
          onOpenReviews={openMasterReviews}
          onOpenPortfolio={openMasterPortfolio}
        />

        <Portfolio
          items={filteredPortfolioItems}
          masters={masters}
          selectedMasterId={portfolioMasterFilter}
          onSelectMaster={setPortfolioMasterFilter}
          onOpenImage={openPortfolioImage}
        />

        <Reviews
          masters={masters}
          initialReviews={reviews}
          selectedMasterId={reviewsMasterFilter}
          onSelectMaster={setReviewsMasterFilter}
        />

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
        items={filteredPortfolioItems}
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