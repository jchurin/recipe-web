'use client';

import { useState, useMemo, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { searchRecipes } from '@/lib/utils/fuzzy-search';
import type { Recipe } from '@/types/recipe';

export interface UseSearchReturn {
  query: string;
  debouncedQuery: string;
  setQuery: (query: string) => void;
  results: Recipe[];
  loading: boolean;
  searchRecipes: (recipes: Recipe[]) => Recipe[];
}

/**
 * Custom hook to manage search state and results
 * @param allRecipes - All available recipes to search through
 * @returns Object with search state and helper functions
 */
export function useSearch(allRecipes: Recipe[]): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const results = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      return allRecipes;
    }

    return searchRecipes(allRecipes, debouncedQuery);
  }, [allRecipes, debouncedQuery]);

  // Derive loading state instead of using setState in effect
  const isLoading = query !== debouncedQuery;

  // Update loading state ref
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const searchRecipesFn = useMemo(
    () => (recipes: Recipe[]) => {
      if (!debouncedQuery || debouncedQuery.trim().length < 2) {
        return recipes;
      }
      return searchRecipes(recipes, debouncedQuery);
    },
    [debouncedQuery]
  );

  return {
    query,
    debouncedQuery,
    setQuery,
    results,
    loading,
    searchRecipes: searchRecipesFn,
  };
}
