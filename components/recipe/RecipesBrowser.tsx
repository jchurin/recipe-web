'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useFilters } from '@/lib/hooks/useFilters';
import { FilterBar } from '@/components/filters/FilterBar';
import { RecipeMasonry } from './RecipeMasonry';
import type { Recipe } from '@/types/recipe';
import type { Categories } from '@/types/category';

export interface RecipesBrowserProps {
  recipes: Recipe[];
  categories: Categories;
}

export function RecipesBrowser({ recipes, categories }: RecipesBrowserProps) {
  const { filterRecipes } = useFilters();
  const t = useTranslations('filters');

  const filteredRecipes = useMemo(() => {
    return filterRecipes(recipes);
  }, [filterRecipes, recipes]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Filters Sidebar */}
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <FilterBar categories={categories} />
      </aside>

      {/* Recipe Grid */}
      <div>
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {t('showing')} {filteredRecipes.length} {t('of')} {recipes.length} {t('recipes')}
        </div>
        <RecipeMasonry recipes={filteredRecipes} emptyMessage={t('recipes')} />
      </div>
    </div>
  );
}
