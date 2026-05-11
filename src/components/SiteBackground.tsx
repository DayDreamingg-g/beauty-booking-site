export default function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
      <img
        src="/images/bg-texture.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/75" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />

      <div className="absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-white/[0.035] blur-[160px]" />

      <div className="absolute -right-40 bottom-1/4 h-[460px] w-[460px] rounded-full bg-white/[0.025] blur-[180px]" />
    </div>
  );
}