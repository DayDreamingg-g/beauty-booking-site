type HeroProps = {
  onOpenBooking: () => void;
};

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center bg-black px-5 pb-20 pt-32 text-white md:px-6 md:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gray-500 md:text-sm">
            Beauty Studio
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
            Минимализм.
            <br />
            Чистота.
            <br />
            Уход.
          </h1>

          <p className="mb-8 max-w-md text-base leading-8 text-gray-400 md:text-lg">
            Премиальный уход и аккуратная эстетика. Мы работаем с формой,
            цветом и деталями, чтобы результат выглядел идеально.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onOpenBooking}
              className="rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              Записаться
            </button>

            <a
              href="#portfolio"
              className="rounded-2xl border border-white/20 px-6 py-4 text-center text-sm transition hover:bg-white/10"
            >
              Смотреть работы
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 shadow-[0_0_60px_rgba(255,255,255,0.04)]">
            <img
              src="/images/1.jpg"
              alt="hero"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}