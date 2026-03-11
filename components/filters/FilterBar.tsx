'use client';

import { useFilters } from '@/lib/hooks/useFilters';
import { useEffect } from 'react';
import type { Categories } from '@/types/category';
import { FilterChip } from './FilterChip';
import { Button } from '@/components/common/Button';

export interface FilterBarProps {
  categories: Categories;
  onFilterChange?: (count: number) => void;
}

export function FilterBar({ categories, onFilterChange }: FilterBarProps) {
  const { filters, setFilter, clearFilters, activeFilterCount } = useFilters();

  useEffect(() => {
    onFilterChange?.(activeFilterCount);
  }, [activeFilterCount, onFilterChange]);

  const toggleCuisine = (id: string) => {
    const newValues = filters.cuisineTypes.includes(id)
      ? filters.cuisineTypes.filter((c) => c !== id)
      : [...filters.cuisineTypes, id];
    setFilter('cuisineTypes', newValues);
  };

  const toggleMealType = (id: string) => {
    const newValues = filters.mealTypes.includes(id)
      ? filters.mealTypes.filter((m) => m !== id)
      : [...filters.mealTypes, id];
    setFilter('mealTypes', newValues);
  };

  const toggleDietary = (id: string) => {
    const newValues = filters.dietaryRestrictions.includes(id)
      ? filters.dietaryRestrictions.filter((d) => d !== id)
      : [...filters.dietaryRestrictions, id];
    setFilter('dietaryRestrictions', newValues);
  };

  return (
    <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Cuisine Types */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          Cuisine Type
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.cuisineTypes.slice(0, 6).map((cuisine) => (
            <FilterChip
              key={cuisine.id}
              label={cuisine.label}
              active={filters.cuisineTypes.includes(cuisine.id)}
              onClick={() => toggleCuisine(cuisine.id)}
            />
          ))}
        </div>
      </div>

      {/* Meal Types */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Meal Type</h4>
        <div className="flex flex-wrap gap-2">
          {categories.mealTypes.map((meal) => (
            <FilterChip
              key={meal.id}
              label={meal.label}
              active={filters.mealTypes.includes(meal.id)}
              onClick={() => toggleMealType(meal.id)}
            />
          ))}
        </div>
      </div>

      {/* Dietary Restrictions */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          Dietary Restrictions
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.dietaryRestrictions.map((dietary) => (
            <FilterChip
              key={dietary.id}
              label={dietary.label}
              active={filters.dietaryRestrictions.includes(dietary.id)}
              onClick={() => toggleDietary(dietary.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
