"use client";

import { useState } from "react";

type NavItem = {
  label: string;
  targetId?: string;
  href?: string;
  isMain?: boolean;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "← На сайт",
    isMain: true,
  },
  {
    targetId: "quick-add",
    label: "+ Додати",
  },
  {
    targetId: "bookings",
    label: "Заявки",
  },
  {
    targetId: "services-list",
    label: "Послуги",
  },
  {
    targetId: "masters-list",
    label: "Майстри",
  },
  {
    targetId: "portfolio-list",
    label: "Портфоліо",
  },
  {
    targetId: "reviews-list",
    label: "Відгуки",
  },
];

export default function AdminQuickNav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToSection = (targetId: string) => {
    closeMenu();

    const section = document.getElementById(targetId);

    if (!section) {
      return;
    }

    const headerOffset = 96;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: sectionTop - headerOffset,
      behavior: "smooth",
    });
  };

  const handleNavClick = (item: NavItem) => {
    closeMenu();

    if (item.href) {
      window.location.assign(item.href);
      return;
    }

    if (item.targetId) {
      scrollToSection(item.targetId);
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 text-white sm:px-5 md:px-6">
        <button
          type="button"
          onClick={() => scrollToSection("quick-add")}
          className="text-left text-sm font-semibold uppercase tracking-[0.24em] text-white"
        >
          Admin <span className="text-gray-400">Panel</span>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavClick(item)}
              className={
                item.isMain
                  ? "rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:scale-[1.02]"
                  : "rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              }
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white md:hidden"
          aria-label="Відкрити меню адмінки"
        >
          {isOpen ? "×" : "☰"}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-black/90 backdrop-blur-2xl transition-all duration-300 md:hidden ${
          isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid gap-2 px-4 py-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavClick(item)}
              className={
                item.isMain
                  ? "rounded-2xl bg-white px-4 py-3 text-left text-sm font-semibold text-black"
                  : "rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-gray-300"
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}