"use client";

import { useEffect } from "react";
import type { PortfolioItem } from "@/app/page";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  items: PortfolioItem[];
  selectedIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onBook: (service: string, master: string) => void;
};

export default function PortfolioLightbox({
  isOpen,
  onClose,
  items,
  selectedIndex,
  onPrev,
  onNext,
  onBook,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  const item = items[selectedIndex];

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 px-6 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] shadow-[0_0_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          ×
        </button>

        <div className="grid min-h-0 flex-1 gap-8 p-6 md:grid-cols-[1.2fr_1fr]">
          {/* IMAGE */}
          <div className="min-h-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={item.image}
                alt={`${item.procedure} - ${item.master}`}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* INFO */}
          <div className="flex min-h-0 flex-col">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
                Portfolio
              </p>

              <h3 className="text-3xl font-semibold text-white">
                {item.procedure}
              </h3>

              <div className="mt-4 space-y-2 text-sm text-gray-300">
                <p>Мастер: {item.master}</p>
                <p>Время: {item.duration}</p>
              </div>
            </div>

            <div className="mt-6 min-h-0 flex-1 overflow-y-auto border-t border-white/10 pt-6 text-sm leading-7 text-gray-300">
              {item.description}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => onBook(item.procedure, item.master)}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Записаться
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-4">
          <button
            onClick={onPrev}
            className="rounded-full border border-white/10 px-4 py-2 text-white transition hover:bg-white/10"
          >
            ←
          </button>
          <button
            onClick={onNext}
            className="rounded-full border border-white/10 px-4 py-2 text-white transition hover:bg-white/10"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}