export default function Hero() {
  return (
    <section
      id="top"
      className="snap-start flex h-screen flex-col items-center justify-center bg-black px-6 pt-24 text-white"
    >
      <h1 className="mb-6 text-center text-6xl font-bold">Beauty Booking</h1>

      <p className="mb-10 text-center text-lg text-gray-400">
        Онлайн запись в салон красоты
      </p>

      <a
        href="#services"
        className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
      >
        Записаться
      </a>
    </section>
  );
}