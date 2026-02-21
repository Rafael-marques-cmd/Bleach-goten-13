import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("festival-favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("festival-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movieId: string) => {
    setFavorites(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const isFavorite = (movieId: string) => favorites.includes(movieId);

  return { favorites, toggleFavorite, isFavorite };
}
