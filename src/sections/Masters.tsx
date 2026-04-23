"use client";

type MastersProps = {
  onSelectMaster?: (master: string) => void;
};

type MasterItem = {
  name: string;
  role: string;
  exp: string;
  image: string;
  description: string;
};

export default function Masters({ onSelectMaster }: MastersProps) {
  const masters: MasterItem[] = [
    {
      name: "Анна",
      role: "Топ-мастер",
      exp: "5 лет опыта",
      image: "/images/2.jpg",
      description:
        "Работает с чистой архитектурой формы, аккуратным покрытием и спокойной премиальной эстетикой.",
    },
    {
      name: "Мария",
      role: "Мастер",
      exp: "3 года опыта",
      image: "/images/3.jpg",
      description:
        "Фокусируется на комфорте клиента, мягкой подаче результата и визуальном балансе деталей.",
    },
    {
      name: "Ольга",
      role: "Junior",
      exp: "1 год опыта",
      image: "/images/4.jpg",
      description:
        "Аккуратный подход, внимание к уходу и деликатная работа с формой и финальным видом покрытия.",
    },
  ];

  return (
    <section
      id="masters"
      className="flex min-h-screen items-center bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.28em] text-gray-500">
            Masters
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">Мастера</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            Специалисты с аккуратным подходом, вниманием к деталям и спокойной
            эстетикой результата.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {masters.map((master) => (
            <div
              key={master.name}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                <img
                  src={master.image}
                  alt={master.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-gray-400">
                    {master.role}
                  </p>

                  <h3 className="text-2xl font-semibold tracking-tight">
                    {master.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">{master.exp}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-7 text-gray-400 transition group-hover:text-gray-300">
                  {master.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-xs uppercase tracking-[0.18em] text-gray-500">
                    Personal care
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectMaster?.(master.name)}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.10]"
                  >
                    Выбрать мастера
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}