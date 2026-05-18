type HeroProps = {
  onOpenBooking: () => void;
};

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-4 pb-16 pt-28 text-white sm:px-5 md:px-6 md:pb-20 md:pt-24"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12">
        <div className="max-w-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.24em] text-gray-400 sm:tracking-[0.3em] md:text-sm">
            Beauty Studio
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Мінімалізм.
            <br />
            Чистота.
            <br />
            Догляд.
          </h1>

          <p className="mb-8 max-w-md text-sm leading-7 text-gray-300 sm:text-base md:text-lg md:leading-8">
            Преміальний догляд та акуратна естетика. Ми працюємо з формою,
            кольором і деталями, щоб результат виглядав бездоганно.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-black transition hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] sm:w-auto"
            >
              Записатися
            </button>

            <a
              href="#portfolio"
              className="w-full rounded-2xl border border-white/20 bg-black/20 px-6 py-4 text-center text-sm text-white backdrop-blur-md transition hover:bg-white/10 sm:w-auto"
            >
              Переглянути роботи
            </a>
          </div>
        </div>

        <div className="relative w-full">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-[0_0_80px_rgba(255,255,255,0.06)] backdrop-blur-sm md:rounded-[2rem]">
            <img
              src="/images/beautystudio.jpg"
              alt="Робота студії"
              className="h-full w-full object-cover opacity-95 transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}