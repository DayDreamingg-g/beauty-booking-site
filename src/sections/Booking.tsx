export default function Booking() {
  return (
    <section
      id="booking"
      className="flex min-h-screen items-center bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
        
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-500">
            Запись
          </p>

          <h2 className="text-4xl font-bold">
            Оставьте заявку
          </h2>
        </div>

        <form className="grid gap-6 md:grid-cols-2">
          
          <input
            type="text"
            placeholder="Ваше имя"
            className="w-full rounded-2xl border border-white/10 bg-black px-5 py-3 outline-none transition focus:border-white/30"
          />

          <input
            type="tel"
            placeholder="Телефон"
            className="w-full rounded-2xl border border-white/10 bg-black px-5 py-3 outline-none transition focus:border-white/30"
          />

          <select
            className="w-full rounded-2xl border border-white/10 bg-black px-5 py-3 text-gray-400 outline-none transition focus:border-white/30"
          >
            <option>Выберите услугу</option>
            <option>Маникюр</option>
            <option>Педикюр</option>
            <option>Комплекс</option>
          </select>

          <input
            type="date"
            className="w-full rounded-2xl border border-white/10 bg-black px-5 py-3 text-gray-400 outline-none transition focus:border-white/30"
          />

          <textarea
            placeholder="Комментарий"
            className="col-span-2 min-h-[120px] rounded-2xl border border-white/10 bg-black px-5 py-3 outline-none transition focus:border-white/30"
          />

          <button
            type="submit"
            className="col-span-2 mt-4 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Отправить заявку
          </button>

        </form>
      </div>
    </section>
  );
}