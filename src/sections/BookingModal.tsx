"use client";

import { useEffect } from "react";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BookingModal({
  isOpen,
  onClose,
}: BookingModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-8 text-white shadow-[0_0_60px_rgba(0,0,0,0.45)] md:p-10"
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

        <div className="mb-8 pr-12">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-500">
            Запись
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Оставьте заявку
          </h2>

          <p className="mt-3 max-w-lg text-gray-400">
            Заполните форму, и мы свяжемся с вами для подтверждения записи.
          </p>
        </div>

        <form className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Ваше имя"
            className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-white/30"
          />

          <input
            type="tel"
            placeholder="Телефон"
            className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-white/30"
          />

          <select
            defaultValue=""
            className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-3 text-white outline-none transition focus:border-white/30"
          >
            <option value="" disabled>
              Выберите услугу
            </option>
            <option>Маникюр</option>
            <option>Педикюр</option>
            <option>Комплекс</option>
          </select>

          <input
            type="date"
            className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-3 text-white outline-none transition focus:border-white/30"
          />

          <textarea
            placeholder="Комментарий"
            className="min-h-[120px] rounded-2xl border border-white/10 bg-black/60 px-5 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 md:col-span-2"
          />

          <button
            type="submit"
            className="mt-2 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] md:col-span-2"
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
}