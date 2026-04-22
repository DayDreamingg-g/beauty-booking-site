export default function Services() {
  const services = [
    { title: "Маникюр", price: "700₴", time: "1.5 часа" },
    { title: "Педикюр", price: "900₴", time: "2 часа" },
    { title: "Комплекс", price: "1400₴", time: "3 часа" },
  ];

  return (
    <section
      id="services"
      className="snap-start flex h-screen items-center bg-black px-6 pt-24 text-white"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-12 text-center text-4xl font-bold">Услуги</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
            >
              <h3 className="mb-4 text-xl font-semibold transition group-hover:text-white">
                {service.title}
              </h3>

              <p className="mb-2 text-gray-400 transition group-hover:text-gray-300">
                Цена: {service.price}
              </p>

              <p className="mb-6 text-gray-400 transition group-hover:text-gray-300">
                Время: {service.time}
              </p>

              <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                Выбрать
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}