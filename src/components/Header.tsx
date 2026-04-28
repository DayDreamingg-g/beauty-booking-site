type HeaderProps = {
  onOpenBooking: () => void;
};

export default function Header({ onOpenBooking }: HeaderProps) {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 text-white md:px-6">
        <a
          href="#top"
          className="text-lg font-bold tracking-tight transition hover:text-gray-300 md:text-xl"
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
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.02] md:rounded-2xl md:border md:border-white/15 md:bg-white/5 md:text-white md:hover:bg-white/10"
        >
          Запись
        </button>
      </div>
    </header>
  );
}