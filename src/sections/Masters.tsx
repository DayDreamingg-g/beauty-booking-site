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
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-4 py-20 text-white sm:px-5 md:px-6 md:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

            <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400 sm:tracking-[0.28em]">
              Masters
            </p>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Майстри
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-gray-400 md:text-base">
            Точність, естетика та увага до кожної деталі. Оберіть майстра, який
            найкраще підходить під ваш стиль.
          </p>
        </div>

        <div className="grid items-start gap-5 sm:gap-6 md:grid-cols-3 md:gap-8">
          {masters.map((master) => (
            <div
              key={master.name}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative h-64 overflow-hidden bg-black/30 sm:h-72">
                <img
                  src={master.image}
                  alt={master.name}
                  className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-300 backdrop-blur-xl">
                    {master.role}
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs uppercase tracking-[0.16em] text-gray-200 backdrop-blur-xl">
                    {master.exp}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {master.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
                    <span>Beauty specialist</span>
                  </div>
                </div>

                <p className="text-sm leading-7 text-gray-400 transition group-hover:text-gray-300">
                  {master.description}
                </p>

                <div className="mt-6 flex items-center justify-end border-t border-white/10 pt-5">
                  <button
                    type="button"
                    onClick={() => onSelectMaster?.(master.name)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.10] hover:shadow-[0_0_22px_rgba(255,255,255,0.08)]"
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