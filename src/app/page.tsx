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
import SiteBackground from "@/components/SiteBackground";

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
    }, 80);

    const disappearTimer = setTimeout(() => {
      setSplashVisible(false);
    }, 1700);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2400);

    return () => {
      clearTimeout(appearTimer);
      clearTimeout(disappearTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const portfolioItems: PortfolioItem[] = [
    {
      image: "/images/manicure1.jpg",
      master: "Анна",
      procedure: "Манікюр",
      duration: "1.5 години",
      description:
        "Чиста форма, акуратна архітектура та спокійне преміальне покриття.",
    },
    {
      image: "/images/pedicure1.jpg",
      master: "Марія",
      procedure: "Педикюр",
      duration: "2 години",
      description:
        "Комплексний догляд з акцентом на комфорт, чистоту ліній та акуратний результат.",
    },
    {
      image: "/images/complex1.jpg",
      master: "Ольга",
      procedure: "Комплекс",
      duration: "3 години",
      description:
        "Повний доглядовий формат для завершеного та візуально чистого результату.",
    },
    {
      image: "/images/manicure2.jpg",
      master: "Анна",
      procedure: "Манікюр",
      duration: "1.5 години",
      description:
        "Мінімалістична естетика, точна робота з формою та м’який блиск покриття.",
    },
    {
      image: "/images/pedicure2.jpg",
      master: "Марія",
      procedure: "Педикюр",
      duration: "2 години",
      description:
        "Делікатна обробка та чиста подача результату без візуального шуму.",
    },
    {
      image: "/images/complex2.jpg",
      master: "Ольга",
      procedure: "Комплекс",
      duration: "3 години",
      description:
        "Догляд, форма та покриття, зібрані в одну цілісну преміальну роботу.",
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

      <SiteBackground />

      <main
        className={`site-shell relative z-10 h-screen overflow-y-scroll scroll-smooth bg-transparent transition-opacity duration-700 ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        <Header onOpenBooking={() => openBooking()} />

        <Hero onOpenBooking={() => openBooking()} />

        <Services onSelectService={(service) => openBooking(service)} />

        <Masters
          onSelectMaster={(master) => openBooking(undefined, master)}
        />

        <Portfolio
          items={portfolioItems}
          onOpenImage={openPortfolio}
        />

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