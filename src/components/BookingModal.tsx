"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

type DateOption = {
  value: string;
  label: string;
  subtitle: string;
};

function SelectIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative ml-4 flex shrink-0 items-center justify-center">
      <span className="absolute h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

      <span
        className={`relative text-lg leading-none text-white/80 transition-transform duration-300 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      >
        ⌄
      </span>
    </div>
  );
}

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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">
        {label}
      </p>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm outline-none transition ${
          value
            ? "border-white/20 bg-white/[0.04] text-white"
            : "border-white/10 bg-black/60 text-gray-500"
        } ${
          isOpen
            ? "border-white/30 bg-white/[0.06]"
            : "hover:border-white/20 hover:bg-white/[0.03]"
        }`}
      >
        <span>{value || placeholder}</span>

        <SelectIcon isOpen={isOpen} />
      </button>

      <div
        className={`absolute left-0 right-0 top-[calc(100%+0.65rem)] z-30 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0d0d0d]/95 backdrop-blur-2xl transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="max-h-60 overflow-y-auto p-2">
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
                  <span className="text-xs text-gray-300">✓</span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LuxuryDatePicker({
  label,
  placeholder,
  value,
  options,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: DateOption[];
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedDate = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;

      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">
        {label}
      </p>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm outline-none transition ${
          selectedDate
            ? "border-white/20 bg-white/[0.04] text-white"
            : "border-white/10 bg-black/60 text-gray-500"
        } ${
          isOpen
            ? "border-white/30 bg-white/[0.06]"
            : "hover:border-white/20 hover:bg-white/[0.03]"
        }`}
      >
        <span>{selectedDate ? selectedDate.label : placeholder}</span>

        <SelectIcon isOpen={isOpen} />
      </button>

      <div
        className={`absolute left-0 right-0 top-[calc(100%+0.65rem)] z-30 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0d0d0d]/95 backdrop-blur-2xl transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="max-h-64 overflow-y-auto p-2">
          {options.map((option) => {
            const isSelected = value === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                  isSelected
                    ? "bg-white/[0.10] text-white"
                    : "text-gray-300 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span>
                  <span className="block text-sm">{option.label}</span>
                  <span className="mt-1 block text-xs text-gray-500">
                    {option.subtitle}
                  </span>
                </span>

                {isSelected ? (
                  <span className="text-xs text-gray-300">✓</span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getPhoneDigits(value: string) {
  return value.replace(/\D/g, "").replace(/^38/, "").slice(0, 10);
}

function formatPhoneFromDigits(digits: string) {
  const cleanDigits = digits.replace(/\D/g, "").slice(0, 10);

  const part1 = cleanDigits.slice(0, 3);
  const part2 = cleanDigits.slice(3, 6);
  const part3 = cleanDigits.slice(6, 8);
  const part4 = cleanDigits.slice(8, 10);

  let result = "+38";

  if (part1) result += ` (${part1}`;
  if (part1.length === 3 && (part2 || part3 || part4)) result += ")";
  if (part2) result += ` ${part2}`;
  if (part3) result += `-${part3}`;
  if (part4) result += `-${part4}`;

  return result;
}

function formatPhone(value: string) {
  const digits = getPhoneDigits(value);

  if (!digits) return "";

  return formatPhoneFromDigits(digits);
}

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatDateSubtitle(date: Date) {
  return new Intl.DateTimeFormat("uk-UA", {
    weekday: "long",
  }).format(date);
}

function createDateOptions() {
  const dates: DateOption[] = [];

  for (let index = 0; index < 21; index += 1) {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + index);

    const value = date.toISOString().split("T")[0];

    dates.push({
      value,
      label: formatDateLabel(date),
      subtitle: index === 0 ? "сьогодні" : formatDateSubtitle(date),
    });
  }

  return dates;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedService,
  selectedMaster,
}: BookingModalProps) {
  const timeOptions = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const dateOptions = useMemo(() => createDateOptions(), []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [master, setMaster] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const phoneDigits = phone.replace(/\D/g, "");

  const isFormValid =
    name.trim().length >= 2 &&
    phoneDigits.length === 12 &&
    service &&
    master &&
    date &&
    time;

  useEffect(() => {
    if (isOpen) {
      setService(selectedService || "");
      setMaster(selectedMaster || "");
      setName("");
      setPhone("");
      setDate("");
      setTime("");
      setComment("");
      setErrorMessage("");
      setIsSubmitting(false);
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
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePhoneFocus = () => {
    if (!phone) {
      setPhone("+38");
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const digits = getPhoneDigits(rawValue);

    if (!digits) {
      setPhone("");
      return;
    }

    setPhone(formatPhone(rawValue));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    if (!isFormValid || isSubmitting) {
      setErrorMessage("Будь ласка, заповніть усі обов’язкові поля.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          service,
          master,
          date,
          time,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit booking");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Не вдалося відправити заявку. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl animate-[modalIn_0.25s_ease-out] overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-6 text-white shadow-[0_0_80px_rgba(0,0,0,0.45)] md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Закрити вікно запису"
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
                Залиште заявку
              </h2>

              <p className="mt-3 max-w-lg text-gray-400">
                Заповніть форму, і ми зв’яжемося з вами для підтвердження
                запису.
              </p>
            </div>

            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                  Ім’я
                </p>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ваше ім’я"
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/[0.03]"
                />
              </div>

              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                  Телефон
                </p>

                <input
                  type="tel"
                  value={phone}
                  onFocus={handlePhoneFocus}
                  onChange={handlePhoneChange}
                  placeholder="+38 (___) ___-__-__"
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/[0.03]"
                />
              </div>

              <LuxurySelect
                label="Послуга"
                placeholder="Оберіть послугу"
                value={service}
                options={["Манікюр", "Педикюр", "Комплекс"]}
                onChange={setService}
              />

              <LuxurySelect
                label="Майстер"
                placeholder="Оберіть майстра"
                value={master}
                options={["Анна", "Марія", "Ольга"]}
                onChange={setMaster}
              />

              <LuxuryDatePicker
                label="Дата"
                placeholder="Оберіть дату"
                value={date}
                options={dateOptions}
                onChange={setDate}
              />

              <LuxurySelect
                label="Час"
                placeholder="Оберіть час"
                value={time}
                options={timeOptions}
                onChange={setTime}
              />

              <div className="md:col-span-2">
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                  Коментар
                </p>

                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Коментар"
                  className="min-h-[105px] w-full resize-none rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/[0.03]"
                />
              </div>

              {errorMessage ? (
                <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200 md:col-span-2">
                  {errorMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`mt-2 rounded-2xl px-6 py-4 font-semibold transition md:col-span-2 ${
                  isFormValid && !isSubmitting
                    ? "bg-white text-black hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    : "cursor-not-allowed border border-white/10 bg-white/[0.06] text-gray-500"
                }`}
              >
                {isSubmitting ? "Відправка..." : "Відправити заявку"}
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl">
              ✓
            </div>

            <h2 className="text-3xl font-bold">Заявку відправлено</h2>

            <p className="mx-auto mt-4 max-w-md text-gray-400">
              Дякуємо. Ми зв’яжемося з вами найближчим часом для підтвердження
              запису.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
              Закрити
            </button>
          </div>
        )}
      </div>
    </div>
  );
}