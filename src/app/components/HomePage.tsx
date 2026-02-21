import backgroundImg from "@/assets/fundo.jpg";

export function HomePage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Bem vindo
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed">
            Adentre o mundo da Soul Society e descubra os segredos dos 13
            Capitães do Gotei 13.
          </p>
          <p className="text-base md:text-lg text-white/80 leading-relaxed">
            Cada capitão possui uma história única, habilidades extraordinárias
            e segredos que moldaram o destino da Soul Society. Explore as
            curiosidades fascinantes sobre esses guerreiros lendários.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
