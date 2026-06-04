import type { PortfolioItem } from "@/app/page";

type PortfolioProps = {
  items: PortfolioItem[];
  onOpenImage: (index: number) => void;
};

export default function Portfolio({ items, onOpenImage }: PortfolioProps) {
  return (
    <section
      id="portfolio"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-4 py-20 pb-28 text-white sm:px-5 md:px-6 md:py-24 md:pb-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

            <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400 sm:tracking-[0.28em]">
              Portfolio
            </p>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Портфоліо
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
            Обрані роботи, де важливі форма, чистота виконання та візуальне
            відчуття результату.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center">
            <p className="text-lg font-semibold text-white">
              Робіт поки немає
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Додайте першу роботу в адмінці.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenImage(index)}
                className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] text-left backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_45px_rgba(255,255,255,0.10)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <img
                  src={item.image}
                  alt={`${item.procedure} - ${item.master}`}
                  className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-105 md:group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-300 backdrop-blur-xl">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-4 backdrop-blur-xl transition duration-300 group-hover:border-white/20 group-hover:bg-black/45">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-400 md:tracking-[0.22em]">
                          {item.procedure}
                        </p>

                        <p className="text-sm font-medium text-white/90 sm:text-base">
                          {item.master}
                        </p>
                      </div>

                      <span className="hidden shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-300 transition group-hover:border-white/20 group-hover:bg-white/[0.10] sm:inline-flex">
                        Відкрити
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}