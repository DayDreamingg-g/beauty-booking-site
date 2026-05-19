type HeroProps = {
  onOpenBooking: () => void;
};

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-4 pb-16 pt-28 text-white sm:px-5 md:px-6 md:pb-20 md:pt-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12">
        <div className="max-w-xl">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

            <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400 sm:tracking-[0.3em]">
              Beauty Studio
            </p>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
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
              className="w-full rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-black transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] sm:w-auto"
            >
              Записатися
            </button>

            <a
              href="#portfolio"
              className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-4 text-center text-sm text-white backdrop-blur-md transition duration-300 hover:border-white/25 hover:bg-white/[0.10] sm:w-auto"
            >
              Переглянути роботи
            </a>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-md">
              <p className="text-lg font-semibold text-white">3</p>
              <p className="mt-1 text-xs text-gray-500">майстри</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-md">
              <p className="text-lg font-semibold text-white">6+</p>
              <p className="mt-1 text-xs text-gray-500">робіт</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-md">
              <p className="text-lg font-semibold text-white">09:00</p>
              <p className="mt-1 text-xs text-gray-500">старт</p>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/[0.05] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/[0.04] blur-3xl" />

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-[0_0_80px_rgba(255,255,255,0.06)] backdrop-blur-sm transition duration-500 hover:border-white/20 md:rounded-[2rem]">
            <img
              src="/images/beautystudio.jpg"
              alt="Робота студії"
              className="h-full w-full object-cover opacity-95 transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-gray-400">
                Premium care
              </p>

              <p className="text-sm leading-6 text-gray-200">
                Акуратний простір, чиста естетика та уважний догляд у кожній
                деталі.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}