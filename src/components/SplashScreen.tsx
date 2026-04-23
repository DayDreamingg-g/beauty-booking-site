"use client";

type SplashScreenProps = {
  isMounted: boolean;
  isVisible: boolean;
};

export default function SplashScreen({
  isMounted,
  isVisible,
}: SplashScreenProps) {
  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black transition-all duration-700 ${
        isVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`flex flex-col items-center transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <p className="mb-4 text-xs uppercase tracking-[0.45em] text-gray-500">
          Beauty Studio
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
          Beauty Booking
        </h1>

        <div className="mt-8 h-px w-40 overflow-hidden bg-white/10">
          <div className="animate-loader-line h-full w-full bg-white/70" />
        </div>
      </div>
    </div>
  );
}