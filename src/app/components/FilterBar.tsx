import { Calendar, MapPin, Tag, Heart } from "lucide-react";
import { FilterOptions } from "@/app/types/festival";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
  venues: string[];
  genres: string[];
  dates: string[];
  showFavoritesOnly: boolean;
  onToggleShowFavorites: () => void;
  favoriteCount: number;
}

export function FilterBar({
  filters,
  onFilterChange,
  venues,
  genres,
  dates,
  showFavoritesOnly,
  onToggleShowFavorites,
  favoriteCount
}: FilterBarProps) {
  const formatDate = (dateStr: string) => {
    if (dateStr === "all") return "Todos os dias";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', { 
      weekday: 'short',
      day: '2-digit', 
      month: 'short' 
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Select value={filters.date} onValueChange={(value) => onFilterChange('date', value)}>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <SelectValue placeholder="Data" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os dias</SelectItem>
            {dates.map(date => (
              <SelectItem key={date} value={date}>
                {formatDate(date)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.venue} onValueChange={(value) => onFilterChange('venue', value)}>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <SelectValue placeholder="Local" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {venues.map(venue => (
              <SelectItem key={venue} value={venue}>
                {venue}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.genre} onValueChange={(value) => onFilterChange('genre', value)}>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <Tag className="size-4" />
              <SelectValue placeholder="Gênero" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {genres.map(genre => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          onClick={onToggleShowFavorites}
          className="w-full"
        >
          <Heart className={`size-4 mr-2 ${showFavoritesOnly ? 'fill-current' : ''}`} />
          Favoritos {favoriteCount > 0 && `(${favoriteCount})`}
        </Button>
      </div>

      {(filters.date !== "all" || filters.venue !== "Todos" || filters.genre !== "Todos" || showFavoritesOnly) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          {filters.date !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {formatDate(filters.date)}
              <button
                onClick={() => onFilterChange('date', 'all')}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.venue !== "Todos" && (
            <Badge variant="secondary" className="gap-1">
              {filters.venue}
              <button
                onClick={() => onFilterChange('venue', 'Todos')}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.genre !== "Todos" && (
            <Badge variant="secondary" className="gap-1">
              {filters.genre}
              <button
                onClick={() => onFilterChange('genre', 'Todos')}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {showFavoritesOnly && (
            <Badge variant="secondary" className="gap-1">
              Apenas favoritos
              <button
                onClick={onToggleShowFavorites}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
