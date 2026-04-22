export default function Hero() {
  return (
    <section className="min-h-screen pt-24 flex flex-col items-center justify-center bg-black text-white">
      
      <h1 className="text-6xl font-bold mb-6">
        Beauty Booking
      </h1>

      <p className="text-gray-400 text-lg mb-10">
        Онлайн запись в салон красоты
      </p>

      <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
        Записаться
      </button>

    </section>
  );
}