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
      title: "Манікюр",
      price: "700₴",
      time: "1.5 години",
      description:
        "Акуратна обробка нігтів і кутикули з чистою формою, м’якою архітектурою та естетичним покриттям.",
      includes: [
        "Обробка кутикули",
        "Вирівнювання форми нігтів",
        "Покриття та фініш",
        "Догляд за руками",
      ],
    },
    {
      title: "Педикюр",
      price: "900₴",
      time: "2 години",
      description:
        "Комплексний догляд за стопами та нігтями з акцентом на комфорт, чистоту ліній та акуратний візуальний результат.",
      includes: [
        "Обробка стоп",
        "Робота з кутикулою",
        "Покриття нігтів",
        "Фінальний догляд",
      ],
    },
    {
      title: "Комплекс",
      price: "1400₴",
      time: "3 години",
      description:
        "Повний доглядовий формат для тих, хто хоче завершений преміальний результат за одне відвідування.",
      includes: [
        "Манікюр + педикюр",
        "Комплексна обробка",
        "Покриття",
        "Догляд і фінальне полірування",
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
      className="flex min-h-screen items-center bg-transparent px-4 py-20 text-white sm:px-5 md:px-6 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-gray-500 sm:tracking-[0.28em] md:text-sm">
            Services
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Послуги
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            Детально, акуратно та без візуального шуму. Кожен блок розкриває
            склад послуги.
          </p>
        </div>

        <div className="grid items-start gap-5 sm:gap-6 md:grid-cols-3 md:gap-8">
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
                      <p className="text-sm text-gray-400">
                        Ціна: {service.price}
                      </p>

                      <p className="text-sm text-gray-400">
                        Час: {service.time}
                      </p>
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
                        className={`relative text-lg transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        ⌄
                      </span>
                    </div>
                  </button>
                </div>

                <p className="mb-8 text-sm leading-7 text-gray-500">
                  Персоналізований догляд з акцентом на чистий результат,
                  форму та візуальний баланс.
                </p>

                {!isOpen ? (
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_22px_rgba(255,255,255,0.18)] md:w-auto"
                  >
                    Обрати
                  </button>
                ) : null}

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen
                      ? "mt-6 max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
                    <p className="mb-5 text-sm leading-7 text-gray-300">
                      {service.description}
                    </p>

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
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.10] md:w-auto"
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