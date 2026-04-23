"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Masters from "@/sections/Masters";
import Portfolio from "@/sections/Portfolio";
import Contact from "@/sections/Contact";
import BookingModal from "@/components/BookingModal";
import PortfolioLightbox from "@/components/PortfolioLightbox";

export type PortfolioItem = {
  image: string;
  master: string;
  procedure: string;
  duration: string;
  description: string;
};

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedMaster, setSelectedMaster] = useState("");

  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const portfolioItems: PortfolioItem[] = [
    {
      image: "/images/1.jpg",
      master: "Анна",
      procedure: "Маникюр",
      duration: "1.5 часа",
      description: "Чистая форма, аккуратная архитектура и спокойное премиальное покрытие.",
    },
    {
      image: "/images/2.jpg",
      master: "Мария",
      procedure: "Педикюр",
      duration: "2 часа",
      description: "Комплексный уход с акцентом на комфорт, чистоту линий и аккуратный результат.",
    },
    {
      image: "/images/3.jpg",
      master: "Ольга",
      procedure: "Комплекс",
      duration: "3 часа",
      description: "Полный уходовый формат для завершённого и визуально чистого результата.",
    },
    {
      image: "/images/4.jpg",
      master: "Анна",
      procedure: "Маникюр",
      duration: "1.5 часа",
      description: "Минималистичная эстетика, точная работа с формой и мягкий блеск покрытия.",
    },
    {
      image: "/images/5.jpg",
      master: "Мария",
      procedure: "Педикюр",
      duration: "2 часа",
      description: "Деликатная обработка и чистая подача результата без визуального шума.",
    },
    {
      image: "/images/6.jpg",
      master: "Ольга",
      procedure: "Комплекс",
      duration: "3 часа",
      description: "Уход, форма и покрытие, собранные в одну цельную премиальную работу.",
    },
  ];

  const openBooking = (service?: string, master?: string) => {
    setSelectedService(service ?? "");
    setSelectedMaster(master ?? "");
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  const openPortfolio = (index: number) => {
    setSelectedImageIndex(index);
    setIsPortfolioOpen(true);
  };

  const closePortfolio = () => {
    setIsPortfolioOpen(false);
  };

  const showPrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? portfolioItems.length - 1 : prev - 1
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === portfolioItems.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <main className="h-screen overflow-y-scroll scroll-smooth bg-black">
        <Header onOpenBooking={() => openBooking()} />
        <Hero onOpenBooking={() => openBooking()} />
        <Services onSelectService={(service) => openBooking(service)} />
        <Masters onSelectMaster={(master) => openBooking(undefined, master)} />
        <Portfolio items={portfolioItems} onOpenImage={openPortfolio} />
        <Contact />
      </main>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        selectedService={selectedService}
        selectedMaster={selectedMaster}
      />

      <PortfolioLightbox
        isOpen={isPortfolioOpen}
        onClose={closePortfolio}
        items={portfolioItems}
        selectedIndex={selectedImageIndex}
        onPrev={showPrevImage}
        onNext={showNextImage}
      />
    </>
  );
}