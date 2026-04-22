"use client";

import { useEffect, useState } from "react";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
};

export default function BookingModal({
  isOpen,
  onClose,
  selectedService,
}: BookingModalProps) {
  const [service, setService] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setService(selectedService || "");
      setIsSubmitted(false);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, selectedService]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-8 text-white shadow-[0_0_80px_rgba(0,0,0,0.45)] transition duration-300 md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Закрыть окно записи"
        >
          ×
        </button>

        {!isSubmitted ? (
          <>
            <div className="mb-8 pr-12">
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-500">
                Booking
              </p>

              <h2 className="text-3xl font-bold md:text-4xl">
                Оставьте заявку
              </h2>

              <p className="mt-3 max-w-lg text-gray-400">
                Заполните форму, и мы свяжемся с вами для подтверждения записи.
              </p>
            </div>

            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/[0.03]"
              />

              <input
                type="tel"
                placeholder="Телефон"
                className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/[0.03]"
              />

              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition focus:border-white/30 focus:bg-white/[0.03]"
              >
                <option value="" disabled>
                  Выберите услугу
                </option>
                <option value="Маникюр">Маникюр</option>
                <option value="Педикюр">Педикюр</option>
                <option value="Комплекс">Комплекс</option>
              </select>

              <input
                type="date"
                className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition focus:border-white/30 focus:bg-white/[0.03]"
              />

              <textarea
                placeholder="Комментарий"
                className="min-h-[120px] rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/[0.03] md:col-span-2"
              />

              <button
                type="submit"
                className="mt-2 rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] md:col-span-2"
              >
                Отправить заявку
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl">
              ✓
            </div>

            <h2 className="text-3xl font-bold">Заявка отправлена</h2>

            <p className="mx-auto mt-4 max-w-md text-gray-400">
              Спасибо. Мы свяжемся с вами в ближайшее время для подтверждения
              записи.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}