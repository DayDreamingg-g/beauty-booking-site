export default function Portfolio() {
  const works = [1, 2, 3, 4, 5, 6];

  return (
    <section id="portfolio" className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Портфолио
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {works.map((item) => (
            <div
              key={item}
              className="group relative h-56 overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.03] hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              {/* Фон (заглушка) */}
              <div className="flex h-full items-center justify-center text-gray-500 transition group-hover:scale-110">
                Работа #{item}
              </div>

              {/* Тёмный градиент снизу */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

              {/* Текст */}
              <div className="absolute bottom-4 left-4 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-sm font-medium text-white">
                  Посмотреть работу
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}