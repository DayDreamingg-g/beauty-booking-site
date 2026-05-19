"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type HeaderProps = {
  onOpenBooking: () => void;
};

export default function Header({ onOpenBooking }: HeaderProps) {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (logoClickCount === 0) return;

    const resetTimer = setTimeout(() => {
      setLogoClickCount(0);
    }, 1800);

    return () => {
      clearTimeout(resetTimer);
    };
  }, [logoClickCount]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const nextCount = logoClickCount + 1;

    if (nextCount >= 5) {
      setLogoClickCount(0);
      router.push("/admin");
      return;
    }

    setLogoClickCount(nextCount);

    if (window.location.hash !== "#top") {
      window.location.hash = "top";
      return;
    }

    document.getElementById("top")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navItems = [
    {
      href: "#services",
      label: "Послуги",
    },
    {
      href: "#masters",
      label: "Майстри",
    },
    {
      href: "#portfolio",
      label: "Портфоліо",
    },
    {
      href: "#contact",
      label: "Контакти",
    },
  ];

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 text-white sm:px-5 md:px-6 md:py-4">
          <a
            href="#top"
            onClick={handleLogoClick}
            className="min-w-0 truncate text-base font-bold tracking-tight transition hover:text-gray-300 sm:text-lg md:text-xl"
            title="Beauty Booking"
          >
            Beauty Booking
          </a>

          <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-lg text-white transition hover:bg-white/[0.10] md:hidden"
              aria-label="Відкрити меню"
            >
              ☰
            </button>

            <button
              type="button"
              onClick={onOpenBooking}
              className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black transition hover:scale-[1.02] sm:px-4 sm:text-sm md:rounded-2xl md:border md:border-white/15 md:bg-white/5 md:text-white md:hover:bg-white/10"
            >
              Запис
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-xl transition duration-300 ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm transform flex-col border-l border-white/10 bg-[#0b0b0b]/95 p-5 text-white shadow-[0_0_80px_rgba(0,0,0,0.55)] transition duration-300 sm:w-[80%] sm:p-6 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-gray-500">
                Menu
              </p>

              <p className="mt-2 text-lg font-semibold">Beauty Booking</p>
            </div>

            <button
              type="button"
              onClick={closeMenu}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Закрити меню"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col gap-3 text-base">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                onOpenBooking();
              }}
              className="w-full rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:scale-[1.02]"
            >
              Записатися
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              Оберіть послугу, майстра та зручний час запису.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}