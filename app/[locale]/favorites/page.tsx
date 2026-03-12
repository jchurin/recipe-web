'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { getRecipesByIds } from '@/lib/data/recipes';
import { RecipeMasonry } from '@/components/recipe/RecipeMasonry';
import { Button } from '@/components/common/Button';
import type { Recipe } from '@/types/recipe';
import type { Locale } from '@/lib/i18n/config';

export default function FavoritesPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations('favoritesPage');
  const tCommon = useTranslations('common');
  const { favorites, clearFavorites } = useFavorites();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (favorites.length > 0) {
        const recipes = await getRecipesByIds(favorites, locale);
        setFavoriteRecipes(recipes);
      } else {
        setFavoriteRecipes([]);
      }
      setLoading(false);
    }

    loadFavorites();
  }, [favorites, locale]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {t('title')}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {favorites.length} {favorites.length === 1 ? tCommon('save') : t('description')}
          </p>
        </div>

        {favorites.length > 0 && (
          <Button onClick={clearFavorites} variant="outline">
            {tCommon('clearAll')}
          </Button>
        )}
      </div>

      {/* Recipes Grid */}
      <RecipeMasonry
        recipes={favoriteRecipes}
        loading={loading}
        emptyMessage={t('empty')}
      />
    </div>
  );
}
