export default function Contact() {
  return (
    <section
      id="contact"
      className="flex min-h-screen items-center bg-transparent px-4 py-20 text-white sm:px-5 md:px-6 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_0_60px_rgba(255,255,255,0.03)] backdrop-blur-sm">
          <div className="grid md:grid-cols-2">
            <div className="relative border-b border-white/10 p-6 sm:p-8 md:border-b-0 md:border-r md:p-12">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <p className="mb-3 text-sm uppercase tracking-[0.28em] text-gray-500">
                Про нас
              </p>

              <h2 className="max-w-md text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                Студія, де важливі деталі
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-8 text-gray-400 md:text-base">
                Спокійна естетика, чиста подача та увага до кожної деталі.
                Ми створюємо результат, який виглядає акуратно, дорого та
                доречно без зайвого візуального шуму.
              </p>

              <div className="mt-10 space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                    Адреса
                  </p>

                  <p className="text-sm text-gray-300 md:text-base">
                    м. Миколаїв, вул. Прикладна, 10
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                    Графік роботи
                  </p>

                  <p className="text-sm text-gray-300 md:text-base">
                    Пн — Сб: 09:00 — 20:00
                    <br />
                    Нд: за записом
                  </p>
                </div>
              </div>
            </div>

            <div className="relative p-6 sm:p-8 md:p-12">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                <div className="space-y-6">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.18em] text-gray-500">
                      Телефон
                    </p>

                    <a
                      href="tel:+380000000000"
                      className="text-lg text-white transition hover:text-gray-300"
                    >
                      +38 (000) 000-00-00
                    </a>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <p className="mb-1 text-xs uppercase tracking-[0.18em] text-gray-500">
                      Email
                    </p>

                    <a
                      href="mailto:hello@beauty.com"
                      className="text-lg text-white transition hover:text-gray-300"
                    >
                      hello@beauty.com
                    </a>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gray-500">
                      Ми на картах
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://maps.google.com/?q=Mykolaiv"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                      >
                        Google Maps
                      </a>

                      <a
                        href="https://maps.apple.com/?q=Mykolaiv"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                      >
                        Apple Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gray-500">
                  Ми в соціальних мережах
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                  <a href="#" className="transition hover:text-white">
                    Instagram
                  </a>

                  <a href="#" className="transition hover:text-white">
                    Telegram
                  </a>

                  <a href="#" className="transition hover:text-white">
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}