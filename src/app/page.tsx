"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Masters from "@/sections/Masters";
import Portfolio from "@/sections/Portfolio";
import Contact from "@/sections/Contact";
import BookingModal from "@/components/BookingModal";
import PortfolioLightbox from "@/components/PortfolioLightbox";
import SplashScreen from "@/components/SplashScreen";

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

  const [showSplash, setShowSplash] = useState(true);
  const [splashVisible, setSplashVisible] = useState(false);

  useEffect(() => {
    const appearTimer = setTimeout(() => {
      setSplashVisible(true);
    }, 50);

    const disappearTimer = setTimeout(() => {
      setSplashVisible(false);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => {
      clearTimeout(appearTimer);
      clearTimeout(disappearTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const portfolioItems: PortfolioItem[] = [
    {
      image: "/images/1.jpg",
      master: "Анна",
      procedure: "Маникюр",
      duration: "1.5 часа",
      description:
        "Чистая форма, аккуратная архитектура и спокойное премиальное покрытие.",
    },
    {
      image: "/images/2.jpg",
      master: "Мария",
      procedure: "Педикюр",
      duration: "2 часа",
      description:
        "Комплексный уход с акцентом на комфорт, чистоту линий и аккуратный результат.",
    },
    {
      image: "/images/3.jpg",
      master: "Ольга",
      procedure: "Комплекс",
      duration: "3 часа",
      description:
        "Полный уходовый формат для завершённого и визуально чистого результата.",
    },
    {
      image: "/images/4.jpg",
      master: "Анна",
      procedure: "Маникюр",
      duration: "1.5 часа",
      description:
        "Минималистичная эстетика, точная работа с формой и мягкий блеск покрытия.",
    },
    {
      image: "/images/5.jpg",
      master: "Мария",
      procedure: "Педикюр",
      duration: "2 часа",
      description:
        "Деликатная обработка и чистая подача результата без визуального шума.",
    },
    {
      image: "/images/6.jpg",
      master: "Ольга",
      procedure: "Комплекс",
      duration: "3 часа",
      description:
        "Уход, форма и покрытие, собранные в одну цельную премиальную работу.",
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

  const openBookingFromPortfolio = (service: string, master: string) => {
    setIsPortfolioOpen(false);
    setSelectedService(service);
    setSelectedMaster(master);
    setIsBookingOpen(true);
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
      <SplashScreen isMounted={showSplash} isVisible={splashVisible} />

      <main
        className={`h-screen overflow-y-scroll scroll-smooth bg-black transition-opacity duration-700 ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
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
        onBook={openBookingFromPortfolio}
      />
    </>
  );
}