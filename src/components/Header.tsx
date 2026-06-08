"use client";

import { useRef, useState } from "react";

type HeaderProps = {
  onOpenBooking: () => void;
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
    href: "#reviews",
    label: "Відгуки",
  },
  {
    href: "#contact",
    label: "Контакти",
  },
];

export default function Header({ onOpenBooking }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const bookingClickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSecretAdminClick = () => {
    bookingClickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    clickTimerRef.current = setTimeout(() => {
      bookingClickCountRef.current = 0;
    }, 1500);

    if (bookingClickCountRef.current >= 5) {
      bookingClickCountRef.current = 0;

      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }

      window.location.href = "/admin";
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 text-white sm:px-5 md:px-6">
        <a
          href="#top"
          onClick={closeMenu}
          className="text-sm font-semibold uppercase tracking-[0.24em] text-white"
        >
          Beauty{" "}
          <span
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleSecretAdminClick();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleSecretAdminClick();
              }
            }}
            className="cursor-pointer select-none"
          >
            Booking
          </span>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onOpenBooking}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:scale-[1.02]"
          >
            Записатися
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white md:hidden"
        >
          {isOpen ? "×" : "☰"}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-black/90 backdrop-blur-2xl transition-all duration-300 md:hidden ${
          isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid gap-2 px-4 py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-300"
            >
              {item.label}
            </a>
          ))}

          <button
            type="button"
            onClick={() => {
              closeMenu();
              onOpenBooking();
            }}
            className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black"
          >
            Записатися
          </button>
        </div>
      </div>
    </header>
  );
}