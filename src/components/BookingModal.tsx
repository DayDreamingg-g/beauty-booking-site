"use client";

import { useEffect, useRef, useState } from "react";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
  selectedMaster: string;
};

type LuxurySelectProps = {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function LuxurySelect({
  label,
  placeholder,
  value,
  options,
  onChange,
}: LuxurySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
        {label}
      </p>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-white outline-none transition ${
          isOpen
            ? "border-white/30 bg-white/[0.05] shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            : "border-white/10 bg-black/60 hover:border-white/20 hover:bg-white/[0.03]"
        }`}
      >
        <span className={value ? "text-white" : "text-gray-500"}>
          {value || placeholder}
        </span>

        <span
          className={`ml-4 text-sm text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ⌄
        </span>
      </button>

      <div
        className={`absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0d0d]/95 backdrop-blur-2xl transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="max-h-64 overflow-y-auto p-2">
          {options.map((option) => {
            const isSelected = value === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition ${
                  isSelected
                    ? "bg-white/[0.10] text-white"
                    : "text-gray-300 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span>{option}</span>

                {isSelected ? (
                  <span className="text-xs uppercase tracking-[0.18em] text-gray-400">
                    Selected
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedService,
  selectedMaster,
}: BookingModalProps) {
  const [service, setService] = useState("");
  const [master, setMaster] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setService(selectedService || "");
      setMaster(selectedMaster || "");
      setIsSubmitted(false);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, selectedService, selectedMaster]);

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-8 text-white shadow-[0_0_80px_rgba(0,0,0,0.45)] md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white/70 transition hover:bg-white/10 hover:text-white"
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

            <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                  Имя
                </p>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/[0.03]"
                />
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                  Телефон
                </p>
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/[0.03]"
                />
              </div>

              <LuxurySelect
                label="Услуга"
                placeholder="Выберите услугу"
                value={service}
                options={["Маникюр", "Педикюр", "Комплекс"]}
                onChange={setService}
              />

              <LuxurySelect
                label="Мастер"
                placeholder="Выберите мастера"
                value={master}
                options={["Анна", "Мария", "Ольга"]}
                onChange={setMaster}
              />

              <div className="md:col-span-2">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                  Дата
                </p>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition focus:border-white/30 focus:bg-white/[0.03]"
                />
              </div>

              <div className="md:col-span-2">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                  Комментарий
                </p>
                <textarea
                  placeholder="Комментарий"
                  className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/[0.03]"
                />
              </div>

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