export default function Services() {
  const services = [
    { title: "Маникюр", price: "700₴", time: "1.5 часа" },
    { title: "Педикюр", price: "900₴", time: "2 часа" },
    { title: "Комплекс", price: "1400₴", time: "3 часа" },
  ];

  return (
    <section id="services" className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-4xl font-bold">Услуги</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <h3 className="mb-4 text-xl font-semibold">{service.title}</h3>

              <p className="mb-2 text-gray-400">Цена: {service.price}</p>
              <p className="mb-6 text-gray-400">Время: {service.time}</p>

              <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black">
                Выбрать
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}