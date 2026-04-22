export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
      
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        
        <div className="font-bold text-lg">
          Beauty Booking
        </div>

        <nav className="hidden md:flex gap-6 text-sm text-gray-300">
          <a href="#" className="hover:text-white">Услуги</a>
          <a href="#" className="hover:text-white">Мастера</a>
          <a href="#" className="hover:text-white">Портфолио</a>
          <a href="#" className="hover:text-white">Запись</a>
        </nav>

      </div>

    </header>
  );
}