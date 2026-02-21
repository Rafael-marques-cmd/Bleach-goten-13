import { Captain } from "@/app/types/bleach";
import backgroundImg from "@/assets/fundo.jpg";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { thumbMap } from "@/app/data/captainImages";

interface PersonagensPageProps {
  captains: Captain[];
  onCaptainSelect: (captain: Captain) => void;
}

export function PersonagensPage({
  captains,
  onCaptainSelect,
}: PersonagensPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Capitães do Gotei 13
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {captains.map((captain) => (
            <button
              key={captain.id}
              onClick={() => onCaptainSelect(captain)}
              className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
            >
              <div className="relative">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-orange-500/50 group-hover:border-orange-500 transition-colors shadow-lg shadow-orange-500/20">
                  <ImageWithFallback
                    src={thumbMap[captain.id] ?? captain}
                    alt={captain.name}
                    className={
                      // Para 8ª divisão, aplicar mais zoom e focar mais no topo (mostrar rosto)
                      captain.division === 8
                        ? "w-full h-full object-cover object-top transform scale-125"
                        : "w-full h-full object-cover object-center transform scale-110"
                    }
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-black/40" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-sm group-hover:text-orange-500 transition-colors">
                  {captain.division}ª Divisão
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
