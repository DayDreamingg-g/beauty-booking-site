"use client";

import { useEffect } from "react";
import type { PortfolioItem } from "@/app/page";

type PortfolioLightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  items: PortfolioItem[];
  selectedIndex: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function PortfolioLightbox({
  isOpen,
  onClose,
  items,
  selectedIndex,
  onPrev,
  onNext,
}: PortfolioLightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  const currentItem = items[selectedIndex];

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Закрыть просмотр"
        >
          ×
        </button>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          <img
            src={currentItem.image}
            alt={`${currentItem.procedure} - ${currentItem.master}`}
            className="max-h-[75vh] w-full object-contain bg-black"
          />

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-gray-400">
                  Portfolio
                </p>

                <h3 className="text-2xl font-semibold text-white">
                  {currentItem.procedure}
                </h3>

                <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-300">
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
                    Мастер: {currentItem.master}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
                    Время: {currentItem.duration}
                  </span>
                </div>

                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300">
                  {currentItem.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onPrev}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.10]"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={onNext}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.10]"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}