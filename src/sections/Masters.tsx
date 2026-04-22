export default function Masters() {
  const masters = [
    { name: "Анна", role: "Топ-мастер", exp: "5 лет" },
    { name: "Мария", role: "Мастер", exp: "3 года" },
    { name: "Ольга", role: "Junior", exp: "1 год" },
  ];

  return (
    <section
      id="masters"
      className="snap-start flex h-screen items-center bg-black px-6 pt-24 text-white"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-12 text-center text-4xl font-bold">Мастера</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {masters.map((master) => (
            <div
              key={master.name}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
            >
              <div className="flex h-56 items-center justify-center bg-white/5 text-gray-500 transition duration-300 group-hover:bg-white/10 group-hover:text-gray-300">
                Фото
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold transition group-hover:text-white">
                  {master.name}
                </h3>
                <p className="mt-2 text-gray-400 transition group-hover:text-gray-300">
                  {master.role}
                </p>
                <p className="text-sm text-gray-500 transition group-hover:text-gray-400">
                  Опыт: {master.exp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}