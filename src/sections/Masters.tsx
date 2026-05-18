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
      role: "Топмайстер",
      exp: "5 років",
      image: "/images/master1.jpg",
      description:
        "Чиста форма, акуратне покриття та спокійна преміальна естетика результату.",
    },
    {
      name: "Марія",
      role: "Майстер",
      exp: "3 роки",
      image: "/images/master2.jpg",
      description:
        "Комфорт клієнта, м’яка подача результату та увага до деталей у кожній роботі.",
    },
    {
      name: "Ольга",
      role: "Junior",
      exp: "1 рік",
      image: "/images/master3.jpg",
      description:
        "Делікатний підхід, акуратна робота з формою та доглянутий фінальний вигляд.",
    },
  ];

  return (
    <section
      id="masters"
      className="flex min-h-screen items-center bg-transparent px-4 py-20 text-white sm:px-5 md:px-6 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-gray-500 sm:tracking-[0.28em] md:text-sm">
            Masters
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Майстри
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-gray-500 md:text-base">
            Точність, естетика та увага до кожної деталі.
          </p>
        </div>

        <div className="grid items-start gap-5 sm:gap-6 md:grid-cols-3 md:gap-8">
          {masters.map((master) => (
            <div
              key={master.name}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06] md:rounded-[2rem] md:hover:-translate-y-1 md:hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative h-64 overflow-hidden bg-neutral-900 sm:h-72">
                <img
                  src={master.image}
                  alt={master.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="p-5 md:p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {master.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-400">
                      {master.role}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs uppercase tracking-[0.16em] text-gray-300 md:tracking-[0.18em]">
                    {master.exp}
                  </span>
                </div>

                <p className="text-sm leading-7 text-gray-400 transition group-hover:text-gray-300">
                  {master.description}
                </p>

                <div className="mt-6 flex items-center justify-end border-t border-white/10 pt-5">
                  <button
                    type="button"
                    onClick={() => onSelectMaster?.(master.name)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.10]"
                  >
                    Обрати майстра
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