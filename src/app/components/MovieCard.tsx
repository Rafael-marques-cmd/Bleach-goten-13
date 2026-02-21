import { Heart, Clock, MapPin, Calendar, Users } from "lucide-react";
import { Movie, Screening } from "@/app/types/festival";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

interface MovieCardProps {
  movie: Movie;
  screenings: Screening[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onScreeningClick: (screening: Screening) => void;
}

export function MovieCard({ movie, screenings, isFavorite, onToggleFavorite, onScreeningClick }: MovieCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(date);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-black/50 hover:bg-black/70 ${isFavorite ? 'text-red-500' : 'text-white'}`}
          onClick={onToggleFavorite}
        >
          <Heart className={`size-5 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg mb-1">{movie.title}</h3>
            <p className="text-sm text-muted-foreground">
              {movie.director} • {movie.year} • {movie.country}
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

          <p className="text-sm text-muted-foreground line-clamp-2">
            {movie.synopsis}
          </p>

          <div className="space-y-2 pt-2 border-t">
            <p className="text-xs font-semibold text-muted-foreground">SESSÕES</p>
            {screenings.map(screening => {
              const occupancyRate = ((screening.totalSeats - screening.availableSeats) / screening.totalSeats) * 100;
              
              return (
                <button
                  key={screening.id}
                  onClick={() => onScreeningClick(screening)}
                  className="w-full text-left p-2 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="size-3 text-muted-foreground" />
                      <span className="font-medium">{formatDate(screening.date)}</span>
                      <span className="text-muted-foreground">às {screening.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      <span>{screening.venue} - {screening.room}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="size-3" />
                      <span>{screening.availableSeats} vagas</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          occupancyRate > 80 ? 'bg-red-500' :
                          occupancyRate > 50 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${occupancyRate}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
