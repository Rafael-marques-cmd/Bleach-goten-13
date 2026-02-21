import { X, Sword, Sparkles, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Captain } from "@/app/types/bleach";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Badge } from "@/app/components/ui/badge";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { fullMap, galleryMap } from "@/app/data/captainImages";

interface CaptainModalProps {
  captain: Captain | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CaptainModal({ captain, isOpen, onClose }: CaptainModalProps) {
  if (!captain) return null;

  const images =
    galleryMap[captain.id] && galleryMap[captain.id].length > 0
      ? galleryMap[captain.id]
      : [fullMap[captain.id] ?? captain.imageUrl];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      setIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-950 border-orange-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            Capitão da {captain.division}ª Divisão
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Header with Image */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-64 h-64 aspect-square rounded-lg overflow-hidden border-4 border-orange-500/50 shadow-lg shadow-orange-500/20">
                  {captain.division === 3 ||
                  captain.division === 6 ||
                  captain.division === 7 ||
                  captain.division === 8 ||
                  captain.division === 9 ? (
                    <div
                      role="img"
                      aria-label={captain.name}
                      className={
                        captain.division === 3
                          ? "w-full h-full bg-cover bg-top bg-no-repeat"
                          : "w-full h-full bg-cover bg-center bg-no-repeat"
                      }
                      style={{
                        backgroundImage: `url(${images[index]})`,
                        backgroundSize: "cover",
                        backgroundPosition:
                          captain.division === 3
                            ? "top"
                            : captain.division === 6
                              ? "center 30%"
                              : captain.division === 7
                                ? "center 18%"
                                : captain.division === 8
                                  ? "center 20%"
                                  : "center 12%",
                      }}
                    />
                  ) : (
                    <ImageWithFallback
                      src={images[index]}
                      alt={captain.name}
                      className={
                        captain.division === 2
                          ? "w-full h-full object-cover object-top transform scale-115 translate-y-2"
                          : "w-full h-full object-cover object-center"
                      }
                      style={{ objectPosition: "center" }}
                    />
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {captain.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-orange-500 text-orange-500"
                  >
                    {captain.division}ª Divisão
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Sword className="size-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-400">Zanpakutō</p>
                      <p className="text-white font-semibold">
                        {captain.zanpakuto}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Sparkles className="size-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-400">Bankai</p>
                      <p className="text-white font-semibold">
                        {captain.bankai}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start"></div>
                </div>
              </div>
            </div>

            {/* Curiosities */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="size-5 text-orange-500" />
                Curiosidades
              </h4>
              <ul className="space-y-3">
                {captain.curiosities.map((curiosity, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-slate-300 leading-relaxed"
                  >
                    <span className="text-orange-500 font-bold flex-shrink-0">
                      {index + 1}.
                    </span>
                    <span>{curiosity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
