'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { searchRecipes } from '@/lib/utils/fuzzy-search';
import type { Recipe } from '@/types/recipe';

export interface SearchFilter {
  id: string;
  term: string;
}

export interface UseSmartSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: Recipe[];
  loading: boolean;
  searchFilters: SearchFilter[];
  addSearchFilter: (term: string) => void;
  removeSearchFilter: (id: string) => void;
  removeLastSearchFilter: () => void;
  clearSearchFilters: () => void;
}

/**
 * Enhanced search hook with multi-term filtering
 * Allows adding multiple search terms as filter chips
 * Results must match ALL filter terms
 */
export function useSmartSearch(allRecipes: Recipe[]): UseSmartSearchReturn {
  const [query, setQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilter[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  // Add a search filter from any text
  const addSearchFilter = useCallback((term: string) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;

    setSearchFilters((prev) => {
      // Don't add duplicates (case-insensitive)
      if (prev.some((f) => f.term.toLowerCase() === trimmedTerm.toLowerCase())) {
        return prev;
      }
      return [
        ...prev,
        {
          id: `filter-${Date.now()}-${Math.random()}`,
          term: trimmedTerm,
        },
      ];
    });
  }, []);

  // Remove a search filter
  const removeSearchFilter = useCallback((id: string) => {
    setSearchFilters((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // Remove the last search filter (for Escape key)
  const removeLastSearchFilter = useCallback(() => {
    setSearchFilters((prev) => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
  }, []);

  // Clear all search filters
  const clearSearchFilters = useCallback(() => {
    setSearchFilters([]);
  }, []);

  // Apply filters and search to recipes
  // Each filter must match (AND logic)
  const results = useMemo(() => {
    let filtered = allRecipes;

    // Apply each search filter (all must match)
    if (searchFilters.length > 0) {
      searchFilters.forEach((filter) => {
        filtered = searchRecipes(filtered, filter.term);
      });
    }

    // Apply current query (real-time search)
    if (debouncedQuery && debouncedQuery.trim().length >= 2) {
      filtered = searchRecipes(filtered, debouncedQuery);
    }

    return filtered;
  }, [allRecipes, searchFilters, debouncedQuery]);

  // Update loading state
  const isLoading = query !== debouncedQuery;
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return {
    query,
    setQuery,
    results,
    loading,
    searchFilters,
    addSearchFilter,
    removeSearchFilter,
    removeLastSearchFilter,
    clearSearchFilters,
  };
}
