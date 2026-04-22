type HeaderProps = {
  onOpenBooking: () => void;
};

export default function Header({ onOpenBooking }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
        <a
          href="#top"
          className="text-lg font-bold tracking-tight transition hover:text-gray-300"
        >
          Beauty Booking
        </a>

        <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
          <a href="#services" className="transition hover:text-white">
            Услуги
          </a>
          <a href="#masters" className="transition hover:text-white">
            Мастера
          </a>
          <a href="#portfolio" className="transition hover:text-white">
            Портфолио
          </a>
          <a href="#contact" className="transition hover:text-white">
            Контакты
          </a>
        </nav>

        <button
          type="button"
          onClick={onOpenBooking}
          className="hidden rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 md:inline-flex"
        >
          Запись
        </button>
      </div>
    </header>
  );
}