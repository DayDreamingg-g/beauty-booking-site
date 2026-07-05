type HeroProps = {
  onOpenBooking: () => void;
  mastersCount: number;
  worksCount: number;
};

function getMastersLabel(count: number) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "майстрів";
  }

  if (lastDigit === 1) {
    return "майстер";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "майстри";
  }

  return "майстрів";
}

function getWorksLabel(count: number) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "робіт";
  }

  if (lastDigit === 1) {
    return "робота";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "роботи";
  }

  return "робіт";
}

export default function Hero({
  onOpenBooking,
  mastersCount,
  worksCount,
}: HeroProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-4 pb-16 pt-28 text-white sm:px-5 md:px-6 md:pb-20 md:pt-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12">
        <div className="max-w-xl">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

            <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400 sm:tracking-[0.28em]">
              Beauty Studio
            </p>
          </div>

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

          <div className="mb-8 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
              <p className="text-2xl font-bold text-white">
                {mastersCount}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {getMastersLabel(mastersCount)}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
              <p className="text-2xl font-bold text-white">
                {worksCount}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {getWorksLabel(worksCount)}
              </p>
            </div>
          </div>

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
          <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-white/[0.03] blur-2xl" />

          <div className="relative mx-auto aspect-[1195/1316] w-full max-w-[650px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
            <img
              src="/images/beautystudio.jpg"
              alt="Beauty studio"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}