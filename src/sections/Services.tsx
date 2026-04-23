"use client";

import { useState } from "react";

type ServicesProps = {
  onSelectService: (service: string) => void;
};

type ServiceItem = {
  title: string;
  price: string;
  time: string;
  description: string;
  includes: string[];
};

export default function Services({ onSelectService }: ServicesProps) {
  const [openServices, setOpenServices] = useState<string[]>([]);

  const services: ServiceItem[] = [
    {
      title: "Маникюр",
      price: "700₴",
      time: "1.5 часа",
      description:
        "Аккуратная обработка ногтей и кутикулы с чистой формой, мягкой архитектурой и эстетичным покрытием.",
      includes: [
        "Обработка кутикулы",
        "Выравнивание формы ногтей",
        "Покрытие и финиш",
        "Уход за руками",
      ],
    },
    {
      title: "Педикюр",
      price: "900₴",
      time: "2 часа",
      description:
        "Комплексный уход за стопами и ногтями с акцентом на комфорт, чистоту линий и аккуратный визуальный результат.",
      includes: [
        "Обработка стоп",
        "Работа с кутикулой",
        "Покрытие ногтей",
        "Финальный уход",
      ],
    },
    {
      title: "Комплекс",
      price: "1400₴",
      time: "3 часа",
      description:
        "Полный уходовый формат для тех, кто хочет завершённый премиальный результат за одно посещение.",
      includes: [
        "Маникюр + педикюр",
        "Комплексная обработка",
        "Покрытие",
        "Уход и финальная полировка",
      ],
    },
  ];

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
      className="flex min-h-screen items-center bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.28em] text-gray-500">
            Services
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">Услуги</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            Подробно, аккуратно и без визуального шума. Каждый блок раскрывает
            состав услуги и оставляет ощущение премиальной подачи.
          </p>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-3">
          {services.map((service) => {
            const isOpen = openServices.includes(service.title);

            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold tracking-tight">
                      {service.title}
                    </h3>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-400 transition group-hover:text-gray-300">
                        Цена: {service.price}
                      </p>

                      <p className="text-sm text-gray-400 transition group-hover:text-gray-300">
                        Время: {service.time}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleService(service.title)}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.10] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                    aria-label={
                      isOpen
                        ? `Скрыть подробности услуги ${service.title}`
                        : `Показать подробности услуги ${service.title}`
                    }
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      <span
                        className={`relative text-lg transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        ⌄
                      </span>
                    </div>
                  </button>
                </div>

                <p className="mb-8 max-w-xs text-sm leading-7 text-gray-500 transition group-hover:text-gray-400">
                  Персонализированный уход с акцентом на чистый результат,
                  форму и визуальный баланс.
                </p>

                <div className="flex items-center justify-start gap-4">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_22px_rgba(255,255,255,0.18)]"
                  >
                    Выбрать
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? "mt-6 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
                    <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <p className="mb-5 pt-2 text-sm leading-7 text-gray-300">
                      {service.description}
                    </p>

                    <div className="border-t border-white/10 pt-5">
                      <p className="mb-4 text-xs uppercase tracking-[0.22em] text-gray-500">
                        Что входит
                      </p>

                      <div className="space-y-3">
                        {service.includes.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 text-sm text-gray-300"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end border-t border-white/10 pt-5">
                      <button
                        type="button"
                        onClick={() => onSelectService(service.title)}
                        className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.10]"
                      >
                        Записаться
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