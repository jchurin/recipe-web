'use client';

import { useLocalStorage } from './useLocalStorage';
import { useCallback, useMemo } from 'react';

interface RecentRecipeEntry {
  id: string;
  viewedAt: number;
}

/**
 * Custom hook to track recently viewed recipes
 * @param maxRecent - Maximum number of recent recipes to store (default: 6)
 * @returns Object with recent recipe IDs and helper function
 */
export function useRecentRecipes(maxRecent: number = 6) {
  const [recentEntries, setRecentEntries] = useLocalStorage<RecentRecipeEntry[]>(
    'recipe-recent',
    []
  );

  const addRecentRecipe = useCallback(
    (recipeId: string) => {
      setRecentEntries((prev) => {
        // Remove existing entry if present
        const filtered = prev.filter((entry) => entry.id !== recipeId);

        // Add new entry at the beginning
        const updated = [{ id: recipeId, viewedAt: Date.now() }, ...filtered];

        // Keep only the most recent entries
        return updated.slice(0, maxRecent);
      });
    },
    [maxRecent, setRecentEntries]
  );

  const recentRecipeIds = useMemo(() => {
    return recentEntries.map((entry) => entry.id);
  }, [recentEntries]);

  const clearRecentRecipes = useCallback(() => {
    setRecentEntries([]);
  }, [setRecentEntries]);

  return {
    recentRecipeIds,
    addRecentRecipe,
    clearRecentRecipes,
  };
}
