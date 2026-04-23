export default function Contact() {
  return (
    <section
      id="contact"
      className="flex min-h-screen items-center bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
          <div className="grid md:grid-cols-2">
            {/* Левая часть */}
            <div className="relative border-b border-white/10 p-8 md:border-b-0 md:border-r md:p-12">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <p className="mb-3 text-sm uppercase tracking-[0.28em] text-gray-500">
                Contact
              </p>

              <h2 className="max-w-md text-4xl font-bold leading-tight md:text-5xl">
                Студия, где важны детали
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-8 text-gray-400 md:text-base">
                Спокойная эстетика, чистая подача и внимание к каждой детали.
                Этот блок можно позже заполнить реальным описанием салона,
                ценностей, подхода к работе и преимуществ.
              </p>

              <div className="mt-10 space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                    Адрес
                  </p>
                  <p className="text-sm leading-7 text-gray-300 md:text-base">
                    г. Николаев, ул. Примерная, 10
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                    Время работы
                  </p>
                  <p className="text-sm leading-7 text-gray-300 md:text-base">
                    Пн — Сб: 09:00 — 20:00
                    <br />
                    Вс: по записи
                  </p>
                </div>
              </div>
            </div>

            {/* Правая часть */}
            <div className="relative p-8 md:p-12">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="space-y-4">
                <a
                  href="tel:+380000000000"
                  className="group block rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
                >
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                    Телефон
                  </p>
                  <p className="text-base text-gray-200 transition group-hover:text-white">
                    +38 (000) 000-00-00
                  </p>
                </a>

                <a
                  href="mailto:hello@beautybooking.com"
                  className="group block rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
                >
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                    Email
                  </p>
                  <p className="text-base text-gray-200 transition group-hover:text-white">
                    hello@beautybooking.com
                  </p>
                </a>

                <a
                  href="https://maps.google.com/?q=Mykolaiv"
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                        Карта
                      </p>
                      <p className="text-base text-gray-200 transition group-hover:text-white">
                        Открыть локацию в Google Maps
                      </p>
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-300 transition group-hover:border-white/20 group-hover:bg-white/[0.10]">
                      Open
                    </span>
                  </div>
                </a>
              </div>

              <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6">
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gray-500">
                  Quick note
                </p>

                <p className="max-w-md text-sm leading-7 text-gray-400">
                  Для записи удобнее всего использовать кнопку
                  <span className="mx-1 text-white">“Записаться”</span>
                  в первом экране сайта — форма откроется поверх страницы в
                  аккуратном модальном окне.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}