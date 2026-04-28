"use client";

import { useState, useEffect } from "react";

type HeaderProps = {
  onOpenBooking: () => void;
};

export default function Header({ onOpenBooking }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 text-white md:px-6">
          <a
            href="#top"
            className="text-lg font-bold tracking-tight transition hover:text-gray-300 md:text-xl"
          >
            Beauty Booking
          </a>

          <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
            <a href="#services" className="transition hover:text-white">
              Услуги
            </a>
            <a href="#masters" className="transition hover:text-white">
              Мастера
            </a>
            <a href="#portfolio" className="transition hover:text-white">
              Портфолио
            </a>
            <a href="#contact" className="transition hover:text-white">
              Контакты
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white md:hidden"
            >
              ☰
            </button>

            <button
              onClick={onOpenBooking}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.02] md:rounded-2xl md:border md:border-white/15 md:bg-white/5 md:text-white md:hover:bg-white/10"
            >
              Запись
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-xl transition ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`absolute right-0 top-0 h-full w-[80%] max-w-xs transform border-l border-white/10 bg-[#0b0b0b]/95 p-6 text-white transition ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Menu
            </p>

            <button
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white/70"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col gap-5 text-base">
            <a
              href="#services"
              onClick={closeMenu}
              className="border-b border-white/10 pb-3 transition hover:text-white"
            >
              Услуги
            </a>

            <a
              href="#masters"
              onClick={closeMenu}
              className="border-b border-white/10 pb-3 transition hover:text-white"
            >
              Мастера
            </a>

            <a
              href="#portfolio"
              onClick={closeMenu}
              className="border-b border-white/10 pb-3 transition hover:text-white"
            >
              Портфолио
            </a>

            <a
              href="#contact"
              onClick={closeMenu}
              className="border-b border-white/10 pb-3 transition hover:text-white"
            >
              Контакты
            </a>
          </nav>

          <button
            onClick={() => {
              closeMenu();
              onOpenBooking();
            }}
            className="mt-8 w-full rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:scale-[1.02]"
          >
            Записаться
          </button>
        </div>
      </div>
    </>
  );
}