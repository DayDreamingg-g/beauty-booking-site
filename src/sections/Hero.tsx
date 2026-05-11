type HeroProps = {
  onOpenBooking: () => void;
};

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-black px-5 pb-20 pt-32 text-white md:px-6 md:pt-24"
    >

      {/* Top depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent" />

      {/* Smooth bottom fade into black */}
     
      <div className="absolute inset-x-0 bottom-[-80px] h-64 bg-black blur-[70px]" />

      {/* Side fades */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent" />

      {/* Soft right glow only */}
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-white/[0.035] blur-[160px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gray-400 md:text-sm">
            Beauty Studio
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Минимализм.
            <br />
            Чистота.
            <br />
            Уход.
          </h1>

          <p className="mb-8 max-w-md text-base leading-8 text-gray-300 md:text-lg">
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
              className="rounded-2xl border border-white/20 bg-black/20 px-6 py-4 text-center text-sm text-white backdrop-blur-md transition hover:bg-white/10"
            >
              Смотреть работы
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/60 shadow-[0_0_80px_rgba(255,255,255,0.06)] backdrop-blur-sm">
            <img
              src="/images/1.jpg"
              alt="Работа студии"
              className="h-full w-full object-cover opacity-95 transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}