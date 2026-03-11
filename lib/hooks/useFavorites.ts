'use client';

import { useLocalStorage } from './useLocalStorage';
import { useCallback, useMemo } from 'react';

export interface UseFavoritesReturn {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

/**
 * Custom hook to manage favorite recipes in localStorage
 * @returns Object with favorites array and helper functions
 */
export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useLocalStorage<string[]>('recipe-favorites', []);

  const isFavorite = useCallback(
    (id: string): boolean => {
      return favorites.includes(id);
    },
    [favorites]
  );

  const addFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        if (prev.includes(id)) {
          return prev;
        }
        return [...prev, id];
      });
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => prev.filter((favId) => favId !== id));
    },
    [setFavorites]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      if (isFavorite(id)) {
        removeFavorite(id);
      } else {
        addFavorite(id);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, [setFavorites]);

  return useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
    }),
    [favorites, isFavorite, toggleFavorite, addFavorite, removeFavorite, clearFavorites]
  );
}
