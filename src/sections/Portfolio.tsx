export default function Portfolio() {
  const works = [1, 2, 3, 4, 5, 6];

  return (
    <section
      id="portfolio"
      className="snap-start flex h-screen items-center bg-black px-6 pt-24 text-white"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-12 text-center text-4xl font-bold">Портфолио</h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {works.map((item) => (
            <div
              key={item}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.10)]"
            >
              <img
                src={`/images/${item}.jpg`}
                alt={`Работа ${item}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                <p className="text-sm font-medium text-white">Посмотреть работу</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}