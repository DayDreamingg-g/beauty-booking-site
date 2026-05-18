import type { PortfolioItem } from "@/app/page";

type PortfolioProps = {
  items: PortfolioItem[];
  onOpenImage: (index: number) => void;
};

export default function Portfolio({ items, onOpenImage }: PortfolioProps) {
  return (
    <section
      id="portfolio"
      className="flex min-h-screen items-center bg-transparent px-4 py-20 pb-28 text-white sm:px-5 md:px-6 md:py-24 md:pb-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-gray-500 sm:tracking-[0.28em] md:text-sm">
            Portfolio
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Портфоліо
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            Обрані роботи, де важливі форма, чистота виконання та візуальне
            відчуття результату.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <button
              key={`${item.image}-${index}`}
              type="button"
              onClick={() => onOpenImage(index)}
              className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-900 text-left transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.10)] md:rounded-[2rem] md:hover:scale-[1.02]"
            >
              <img
                src={item.image}
                alt={`${item.procedure} - ${item.master}`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105 md:group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-400 md:tracking-[0.22em]">
                      {item.procedure}
                    </p>

                    <p className="text-sm text-white/90 sm:text-base">
                      {item.master}
                    </p>
                  </div>

                  <span className="hidden rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-300 transition group-hover:border-white/20 group-hover:bg-white/[0.10] sm:inline-flex">
                    Відкрити
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}