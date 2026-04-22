export default function Masters() {
  const masters = [
    { name: "Анна", role: "Топ-мастер", exp: "5 лет" },
    { name: "Мария", role: "Мастер", exp: "3 года" },
    { name: "Ольга", role: "Junior", exp: "1 год" },
  ];

  return (
    <section id="masters" className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-4xl font-bold">Мастера</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {masters.map((m) => (
            <div
              key={m.name}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
            >
              <div className="flex h-56 items-center justify-center bg-white/5 text-gray-500">
                Фото
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">{m.name}</h3>
                <p className="mt-2 text-gray-400">{m.role}</p>
                <p className="text-gray-500 text-sm">Опыт: {m.exp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}