export default function Contact() {
  return (
    <section
      id="contact"
      className="snap-start flex min-h-[70vh] items-center bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto w-full max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-500">
              О нас
            </p>
            <h2 className="mb-6 text-4xl font-bold">Студия, где важны детали</h2>
            <p className="max-w-xl text-gray-400 leading-8">
              Мы создаём ухоженный, чистый и эстетичный результат с вниманием
              к форме, цвету и комфорту клиента. Этот блок можно потом заменить
              на реальное описание салона, подхода к работе и преимуществ.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-2 text-sm text-gray-500">Телефон</p>
              <a href="tel:+380000000000" className="text-lg transition hover:text-gray-300">
                +38 (000) 000-00-00
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-2 text-sm text-gray-500">Email</p>
              <a href="mailto:hello@beautybooking.com" className="text-lg transition hover:text-gray-300">
                hello@beautybooking.com
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-2 text-sm text-gray-500">Адрес</p>
              <p className="text-lg">г. Николаев, ул. Примерная, 10</p>
            </div>

            <a
              href="https://maps.google.com/?q=Mykolaiv"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
              Открыть в Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}