"use client";

import { useState } from "react";
import type { ServiceItem } from "@/app/page";

type ServicesProps = {
  services: ServiceItem[];
  onSelectService: (service: string) => void;
};

export default function Services({ services, onSelectService }: ServicesProps) {
  const [openServices, setOpenServices] = useState<string[]>([]);

  const toggleService = (title: string) => {
    setOpenServices((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <section
      id="services"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-4 py-20 text-white sm:px-5 md:px-6 md:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

            <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400 sm:tracking-[0.28em]">
              Services
            </p>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Послуги
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
            Детально, акуратно та без візуального шуму. Кожен блок розкриває
            склад послуги та допомагає швидко обрати потрібний догляд.
          </p>
        </div>

        <div className="grid items-start gap-5 sm:gap-6 md:grid-cols-3 md:gap-8">
          {services.map((service) => {
            const isOpen = openServices.includes(service.title);

            return (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_50px_rgba(255,255,255,0.08)] sm:p-6"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="mb-3 text-2xl font-semibold tracking-tight">
                      {service.title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300">
                        {service.price}
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300">
                        {service.time}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleService(service.title)}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.10] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                    aria-label={isOpen ? "Згорнути опис" : "Розгорнути опис"}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

                      <span
                        className={`relative text-lg leading-none transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        ⌄
                      </span>
                    </div>
                  </button>
                </div>

                <p className="mb-7 text-sm leading-7 text-gray-400">
                  {service.description}
                </p>

                {!isOpen ? (
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_22px_rgba(255,255,255,0.18)]"
                  >
                    Обрати
                  </button>
                ) : null}

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen
                      ? "mt-6 max-h-[620px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="relative rounded-[1.75rem] border border-white/10 bg-black/20 p-5 backdrop-blur-2xl">
                    <div className="border-t border-white/10 pt-5">
                      <p className="mb-4 text-xs uppercase tracking-[0.22em] text-gray-500">
                        Що входить
                      </p>

                      <div className="space-y-3">
                        {service.includes.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 text-sm text-gray-300"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.7)]" />

                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end border-t border-white/10 pt-5">
                      <button
                        type="button"
                        onClick={() => onSelectService(service.title)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.10]"
                      >
                        Записатися
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}