export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
        >
        <source src="/videoheader.mp4" type="video/mp4" />
        </video>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Discover Los Cabos
        </h1>
        <p className="text-lg md:text-xl opacity-80">
          Unforgettable experiences in paradise.
        </p>
      </div>

    </section>
  );
}