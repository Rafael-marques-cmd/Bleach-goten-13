import { X, Clock, MapPin, Calendar, Users, Film } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

interface ScreeningDetailsProps {
  screening: Screening | null;
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ScreeningDetails({ screening, movie, isOpen, onClose }: ScreeningDetailsProps) {
  if (!screening || !movie) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', { 
      weekday: 'long', 
      day: '2-digit', 
      month: 'long' 
    }).format(date);
  };

  const occupancyRate = ((screening.totalSeats - screening.availableSeats) / screening.totalSeats) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes da Sessão</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-32 h-48 object-cover rounded-lg"
            />
            
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-bold text-xl mb-1">{movie.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Direção: {movie.director}
                </p>
                <p className="text-sm text-muted-foreground">
                  {movie.country}, {movie.year}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{movie.genre}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {movie.duration} min
                </Badge>
                <Badge variant="outline">{movie.rating}</Badge>
              </div>
            </div>
          </div>

          <div className="p-4 bg-accent rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="size-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Data e Horário</p>
                <p className="font-semibold capitalize">{formatDate(screening.date)}</p>
                <p className="font-semibold">{screening.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Local</p>
                <p className="font-semibold">{screening.venue}</p>
                <p className="text-sm">{screening.room}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="size-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Disponibilidade</p>
                <p className="font-semibold">
                  {screening.availableSeats} vagas disponíveis de {screening.totalSeats}
                </p>
                <div className="mt-2">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        occupancyRate > 80 ? 'bg-red-500' :
                        occupancyRate > 50 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {occupancyRate.toFixed(0)}% ocupado
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Film className="size-4" />
              Sinopse
            </h4>
            <p className="text-sm text-muted-foreground">
              {movie.synopsis}
            </p>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" disabled={screening.availableSeats === 0}>
              {screening.availableSeats === 0 ? 'Esgotado' : 'Reservar Ingresso'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
