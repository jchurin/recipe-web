'use client';

import { useMemo, useCallback, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Recipe } from '@/types/recipe';
import type { FilterState, FilterCategory } from '@/types/filter';

export interface UseFiltersReturn {
  filters: FilterState;
  setFilter: (category: FilterCategory, values: string[]) => void;
  clearFilters: () => void;
  clearFilter: (category: FilterCategory) => void;
  activeFilterCount: number;
  filterRecipes: (recipes: Recipe[]) => Recipe[];
}

/**
 * Parse filters from URL search params
 */
function parseFiltersFromURL(searchParams: URLSearchParams): FilterState {
  return {
    cuisineTypes: searchParams.get('cuisine')?.split(',').filter(Boolean) || [],
    mealTypes: searchParams.get('meal')?.split(',').filter(Boolean) || [],
    dietaryRestrictions: searchParams.get('dietary')?.split(',').filter(Boolean) || [],
    cookingTime: searchParams.get('time') || undefined,
    difficulty: searchParams.get('difficulty')?.split(',').filter(Boolean) || [],
  };
}

/**
 * Convert filters to URL search params string
 */
function filtersToURLParams(filters: FilterState): string {
  const params = new URLSearchParams();

  if (filters.cuisineTypes.length > 0) {
    params.set('cuisine', filters.cuisineTypes.join(','));
  }
  if (filters.mealTypes.length > 0) {
    params.set('meal', filters.mealTypes.join(','));
  }
  if (filters.dietaryRestrictions.length > 0) {
    params.set('dietary', filters.dietaryRestrictions.join(','));
  }
  if (filters.cookingTime) {
    params.set('time', filters.cookingTime);
  }
  if (filters.difficulty && filters.difficulty.length > 0) {
    params.set('difficulty', filters.difficulty.join(','));
  }

  return params.toString();
}

/**
 * Custom hook to manage filter state and apply filters to recipes
 * Reads filter state from URL search params for shareability and persistence
 * @returns Object with filter state and helper functions
 */
export function useFilters(): UseFiltersReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Derive filters directly from URL (no state needed)
  const filters = useMemo(() => parseFiltersFromURL(searchParams), [searchParams]);

  const setFilter = useCallback(
    (category: FilterCategory, values: string[]) => {
      const newFilters = {
        ...filters,
        [category]: values,
      };

      const queryString = filtersToURLParams(newFilters);
      const newUrl = queryString ? `/recipes?${queryString}` : '/recipes';

      startTransition(() => {
        router.push(newUrl, { scroll: false });
      });
    },
    [filters, router]
  );

  const clearFilter = useCallback(
    (category: FilterCategory) => {
      const newFilters = {
        ...filters,
        [category]: Array.isArray(filters[category]) ? [] : undefined,
      };

      const queryString = filtersToURLParams(newFilters);
      const newUrl = queryString ? `/recipes?${queryString}` : '/recipes';

      startTransition(() => {
        router.push(newUrl, { scroll: false });
      });
    },
    [filters, router]
  );

  const clearFilters = useCallback(() => {
    startTransition(() => {
      router.push('/recipes', { scroll: false });
    });
  }, [router]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.cuisineTypes.length > 0) count += filters.cuisineTypes.length;
    if (filters.mealTypes.length > 0) count += filters.mealTypes.length;
    if (filters.dietaryRestrictions.length > 0) count += filters.dietaryRestrictions.length;
    if (filters.cookingTime) count += 1;
    if (filters.difficulty && filters.difficulty.length > 0) count += filters.difficulty.length;
    return count;
  }, [filters]);

  const filterRecipes = useCallback(
    (recipes: Recipe[]): Recipe[] => {
      return recipes.filter((recipe) => {
        // Filter by cuisine type
        if (
          filters.cuisineTypes.length > 0 &&
          !filters.cuisineTypes.some((type) => recipe.categories.cuisineType.includes(type))
        ) {
          return false;
        }

        // Filter by meal type
        if (
          filters.mealTypes.length > 0 &&
          !filters.mealTypes.some((type) => recipe.categories.mealType.includes(type))
        ) {
          return false;
        }

        // Filter by dietary restrictions
        if (
          filters.dietaryRestrictions.length > 0 &&
          !filters.dietaryRestrictions.some((restriction) =>
            recipe.categories.dietaryRestrictions.includes(restriction)
          )
        ) {
          return false;
        }

        // Filter by cooking time
        if (filters.cookingTime && recipe.categories.cookingTime !== filters.cookingTime) {
          return false;
        }

        // Filter by difficulty
        if (
          filters.difficulty &&
          filters.difficulty.length > 0 &&
          !filters.difficulty.includes(recipe.difficulty)
        ) {
          return false;
        }

        return true;
      });
    },
    [filters]
  );

  return {
    filters,
    setFilter,
    clearFilters,
    clearFilter,
    activeFilterCount,
    filterRecipes,
  };
}
