export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
        <a href="#top" className="text-lg font-bold transition hover:text-gray-300">
          Beauty Booking
        </a>

        <nav className="hidden gap-6 text-sm text-gray-300 md:flex">
          <a href="#services" className="transition hover:text-white">
            Услуги
          </a>
          <span className="cursor-default text-gray-500">Мастера</span>
          <span className="cursor-default text-gray-500">Портфолио</span>
          <span className="cursor-default text-gray-500">Запись</span>
        </nav>
      </div>
    </header>
  );
}