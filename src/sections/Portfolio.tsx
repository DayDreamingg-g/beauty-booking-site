"use client";

import type { MasterItem, PortfolioItem } from "@/app/page";

type PortfolioProps = {
  items: PortfolioItem[];
  masters: MasterItem[];
  selectedMasterId: string;
  onSelectMaster: (masterId: string) => void;
  onOpenImage: (index: number) => void;
};

export default function Portfolio({
  items,
  masters,
  selectedMasterId,
  onSelectMaster,
  onOpenImage,
}: PortfolioProps) {
  return (
    <section
      id="portfolio"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-4 py-20 text-white sm:px-5 md:px-6 md:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

            <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400">
              Portfolio
            </p>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Портфоліо
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
            Приклади робіт майстрів. Усі фото автоматично підлаштовуються під
            однакову рамку, щоб сітка виглядала рівно.
          </p>
        </div>

        <div className="mb-8 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm md:p-5">
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
              Усі роботи
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

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center">
            <p className="text-lg font-semibold text-white">
              Робіт поки немає
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Додайте роботи через адмінку, і вони з’являться тут.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <button
                  type="button"
                  onClick={() => onOpenImage(index)}
                  className="relative block aspect-[366/403] w-full overflow-hidden bg-black"
                >
                  <img
                    src={item.image}
                    alt={item.procedure}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />

                  <div className="pointer-events-none absolute bottom-4 left-4 right-4 text-left">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-300">
                      {item.master}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {item.procedure}
                    </h3>
                  </div>
                </button>

                <div className="p-5">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300">
                      {item.duration}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300">
                      {item.master}
                    </span>
                  </div>

                  <p className="text-sm leading-7 text-gray-400">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}