"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MasterItem, ReviewItem } from "@/app/page";

type ReviewsProps = {
  masters: MasterItem[];
  initialReviews: ReviewItem[];
  selectedMasterId: string;
  onSelectMaster: (masterId: string) => void;
};

type LuxurySelectOption = {
  value: string;
  label: string;
};

type LuxurySelectProps = {
  placeholder: string;
  value: string;
  options: LuxurySelectOption[];
  onChange: (value: string) => void;
};

function formatReviewDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function LuxurySelect({
  placeholder,
  value,
  options,
  onChange,
}: LuxurySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((option) => option.value === value);

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
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm outline-none transition ${
          value
            ? "border-white/20 bg-white/[0.04] text-white"
            : "border-white/10 bg-black/40 text-gray-500"
        } ${
          isOpen
            ? "border-white/30 bg-white/[0.06]"
            : "hover:border-white/20 hover:bg-white/[0.03]"
        }`}
      >
        <span>{selectedOption?.label || placeholder}</span>

        <div className="relative ml-4 flex h-8 w-8 shrink-0 items-center justify-center">
          <span className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.95),0_0_14px_rgba(255,255,255,0.45)]" />

          <span
            className={`absolute text-[10px] leading-none text-white/80 transition-all duration-300 ${
              isOpen ? "-translate-y-[5px] rotate-180" : "translate-y-[5px]"
            }`}
          >
            ⌄
          </span>
        </div>
      </button>

      <div
        className={`absolute left-0 right-0 top-[calc(100%+0.75rem)] z-50 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0d0d]/95 backdrop-blur-2xl transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="max-h-64 overflow-y-auto p-2">
          {options.length > 0 ? (
            options.map((option) => {
              const isSelected = value === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition ${
                    isSelected
                      ? "bg-white/[0.10] text-white"
                      : "text-gray-300 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span>{option.label}</span>

                  {isSelected ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15 transition-all duration-300 hover:bg-white/40" />
                  )}
                </button>
              );
            })
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              Майстрів поки немає
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Reviews({
  masters,
  initialReviews,
  selectedMasterId,
  onSelectMaster,
}: ReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [masterId, setMasterId] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const masterOptions = masters.map((master) => ({
    value: master.id,
    label: master.name,
  }));

  const filteredReviews = useMemo(() => {
    if (selectedMasterId === "all") {
      return reviews;
    }

    return reviews.filter((review) => review.masterId === selectedMasterId);
  }, [reviews, selectedMasterId]);

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.url) {
        throw new Error(result.message || "Upload failed");
      }

      setImageUrl(result.url);
    } catch (error) {
      console.error(error);
      setMessage("Не вдалося завантажити фото.");
      setImageUrl("");
    } finally {
      setIsUploading(false);
    }
  };

  const submitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !text.trim() || !masterId || !rating) {
      setMessage("Заповніть ім’я, майстра, оцінку та текст відгуку.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          text,
          rating,
          masterId,
          image: imageUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.review) {
        throw new Error(result.message || "Failed to create review");
      }

      setReviews((prev) => [result.review, ...prev]);
      setName("");
      setText("");
      setMasterId("");
      setRating(5);
      setImageUrl("");
      setMessage("Дякуємо, відгук додано.");
    } catch (error) {
      console.error(error);
      setMessage("Не вдалося додати відгук.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="reviews"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-4 py-20 text-white sm:px-5 md:px-6 md:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

            <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400">
              Reviews
            </p>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Відгуки
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
            Тут можна переглянути відгуки клієнтів, відфільтрувати їх за
            майстром або залишити власний відгук.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[420px_1fr]">
          <form
            onSubmit={submitReview}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm md:p-6"
          >
            <p className="mb-5 text-xl font-semibold">Залишити відгук</p>

            <div className="grid gap-4">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ваше ім’я"
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-black/60"
              />

              <LuxurySelect
                placeholder="Оберіть майстра"
                value={masterId}
                options={masterOptions}
                onChange={setMasterId}
              />

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                  Оцінка
                </p>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg transition ${
                        rating >= star
                          ? "border-white/30 bg-white text-black"
                          : "border-white/10 bg-white/[0.04] text-gray-500 hover:text-white"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                disabled={isUploading}
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (file) {
                    uploadImage(file);
                  }
                }}
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black disabled:cursor-not-allowed disabled:opacity-50"
              />

              {isUploading ? (
                <p className="text-xs text-gray-500">Завантаження фото...</p>
              ) : null}

              {imageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={imageUrl}
                    alt="Фото відгуку"
                    className="h-48 w-full object-cover"
                  />
                </div>
              ) : null}

              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Текст відгуку"
                className="min-h-32 resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-black/60"
              />

              {message ? (
                <p className="text-sm text-gray-400">{message}</p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Відправка..." : "Додати відгук"}
              </button>
            </div>
          </form>

          <div className="grid content-start gap-5">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm md:p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Фільтр за майстром
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onSelectMaster("all")}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedMasterId === "all"
                      ? "border-white/30 bg-white text-black"
                      : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  Усі відгуки
                </button>

                {masters.map((master) => (
                  <button
                    key={master.id}
                    type="button"
                    onClick={() => onSelectMaster(master.id)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      selectedMasterId === master.id
                        ? "border-white/30 bg-white text-black"
                        : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    {master.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {filteredReviews.length === 0 ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-6 py-10 text-center">
                  <p className="text-base font-semibold text-white">
                    Відгуків поки немає
                  </p>

                  <p className="mt-3 text-sm text-gray-500">
                    Будьте першим, хто залишить відгук.
                  </p>
                </div>
              ) : (
                filteredReviews.map((review) => {
                  const reviewDate = formatReviewDate(review.createdAt);

                  return (
                    <article
                      key={review.id}
                      className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      {review.image ? (
                        <img
                          src={review.image}
                          alt={review.name}
                          className="h-64 w-full object-cover"
                        />
                      ) : null}

                      <div className="p-5 md:p-6">
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <h3 className="text-xl font-semibold">
                                {review.name}
                              </h3>

                              {reviewDate ? (
                                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-400">
                                  {reviewDate}
                                </span>
                              ) : null}
                            </div>

                            <p className="text-sm text-gray-500">
                              Майстер: {review.master}
                            </p>
                          </div>

                          <div className="flex gap-1 text-lg text-white">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <span
                                key={index}
                                className={
                                  index < review.rating
                                    ? "text-white"
                                    : "text-white/20"
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="text-sm leading-7 text-gray-300">
                          {review.text}
                        </p>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}