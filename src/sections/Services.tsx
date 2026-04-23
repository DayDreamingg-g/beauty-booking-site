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
  const [openService, setOpenService] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      title: "Маникюр",
      price: "700₴",
      time: "1.5 часа",
      description:
        "Аккуратная обработка ногтей и кутикулы с чистой формой и эстетичным покрытием.",
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
        "Комплексный уход за стопами и ногтями с акцентом на чистоту, комфорт и аккуратный результат.",
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
        "Полный уходовый сет для тех, кто хочет завершённый и премиальный результат за одно посещение.",
      includes: [
        "Маникюр + педикюр",
        "Комплексная обработка",
        "Покрытие",
        "Уход и финальная полировка",
      ],
    },
  ];

  const toggleService = (title: string) => {
    setOpenService((prev) => (prev === title ? null : title));
  };

  return (
    <section
      id="services"
      className="flex min-h-screen items-center bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gray-500">
            Services
          </p>
          <h2 className="text-4xl font-bold">Услуги</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => {
            const isOpen = openService === service.title;

            return (
              <div
                key={service.title}
                className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold transition group-hover:text-white">
                      {service.title}
                    </h3>

                    <p className="mb-2 text-gray-400 transition group-hover:text-gray-300">
                      Цена: {service.price}
                    </p>

                    <p className="text-gray-400 transition group-hover:text-gray-300">
                      Время: {service.time}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleService(service.title)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition hover:border-white/20 hover:bg-white/10"
                    aria-label={
                      isOpen
                        ? `Скрыть подробности услуги ${service.title}`
                        : `Показать подробности услуги ${service.title}`
                    }
                  >
                    <span
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      →
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  >
                    Выбрать
                  </button>

                  <span className="text-sm text-gray-500">
                    Подробнее по стрелке
                  </span>
                </div>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "mt-6 grid-rows-[1fr] opacity-100"
                      : "mt-0 grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl">
                      <p className="mb-4 leading-7 text-gray-300">
                        {service.description}
                      </p>

                      <div className="border-t border-white/10 pt-4">
                        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-gray-500">
                          Что входит
                        </p>

                        <div className="space-y-2">
                          {service.includes.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-3 text-sm text-gray-300"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
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