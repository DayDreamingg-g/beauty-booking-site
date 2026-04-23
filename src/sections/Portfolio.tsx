import type { PortfolioItem } from "@/app/page";

type PortfolioProps = {
  items: PortfolioItem[];
  onOpenImage: (index: number) => void;
};

export default function Portfolio({ items, onOpenImage }: PortfolioProps) {
  return (
    <section
      id="portfolio"
      className="flex min-h-screen items-center bg-black px-6 py-24 pb-32 text-white"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.28em] text-gray-500">
            Portfolio
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">Портфолио</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            Выбранные работы, в которых важны форма, чистота исполнения и общее визуальное ощущение результата.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <button
              key={`${item.image}-${index}`}
              type="button"
              onClick={() => onOpenImage(index)}
              className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 text-left transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.10)]"
            >
              <img
                src={item.image}
                alt={`${item.procedure} - ${item.master}`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 transition duration-500 group-hover:from-black/80" />

              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.22em] text-gray-400">
                      {item.procedure}
                    </p>
                    <p className="text-sm text-white/90">{item.master}</p>
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-300 transition group-hover:border-white/20 group-hover:bg-white/[0.10]">
                    Open
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