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
      className="fixed inset-0 z-[110] bg-black/80 px-4 py-6 backdrop-blur-xl md:flex md:items-center md:justify-center"
      onClick={onClose}
    >
      <div
        className="relative mx-auto max-h-[92vh] w-full max-w-6xl animate-[modalIn_0.25s_ease-out] overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0b0b0b] shadow-[0_0_80px_rgba(0,0,0,0.6)] md:flex md:h-[85vh] md:flex-col md:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="sticky top-4 z-30 ml-auto mr-4 mt-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-xl text-white/80 backdrop-blur-xl transition hover:bg-white/10 hover:text-white md:absolute md:right-6 md:top-6 md:m-0"
          aria-label="Закрыть просмотр"
        >
          ×
        </button>

        <div className="grid gap-5 px-5 pb-5 md:min-h-0 md:flex-1 md:grid-cols-[1.2fr_1fr] md:gap-8 md:p-6">
          <div className="h-[360px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black md:h-full md:min-h-0">
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={item.image}
                alt={`${item.procedure} - ${item.master}`}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col">
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

            <div className="mt-6 border-t border-white/10 pt-6 text-sm leading-7 text-gray-300 md:min-h-0 md:flex-1 md:overflow-y-auto">
              {item.description}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => onBook(item.procedure, item.master)}
                className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] md:w-auto"
              >
                Записаться
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/10 px-5 py-4 md:px-6">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-full border border-white/10 px-4 py-2 text-white transition hover:bg-white/10"
          >
            ←
          </button>

          <button
            type="button"
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