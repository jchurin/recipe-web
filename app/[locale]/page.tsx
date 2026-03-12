'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { useSearch } from '@/lib/hooks/useSearch';
import { useRecentRecipes } from '@/lib/hooks/useRecentRecipes';
import { getAllRecipes, getRecipesByIds } from '@/lib/data/recipes';
import type { Recipe } from '@/types/recipe';
import type { Locale } from '@/lib/i18n/config';

export default function HomePage() {
  const locale = useLocale() as Locale;
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const { recentRecipeIds } = useRecentRecipes();

  // Load all recipes
  useEffect(() => {
    getAllRecipes(locale).then(setAllRecipes);
  }, [locale]);

  // Load recent recipes
  useEffect(() => {
    if (recentRecipeIds.length > 0) {
      getRecipesByIds(recentRecipeIds, locale).then(setRecentRecipes);
    }
  }, [recentRecipeIds, locale]);

  const { query, setQuery, results, loading } = useSearch(allRecipes);

  // Show search results if query exists, otherwise show recent recipes
  const displayRecipes = query.length >= 2 ? results : recentRecipes;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section with Search */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-gray-100">
          {t('title')}
        </h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
          {t('subtitle')}
        </p>

        <div className="mx-auto max-w-3xl">
          <SearchBar
            onSearch={setQuery}
            placeholder={t('searchPlaceholder')}
            value={query}
            loading={loading}
            autoFocus
          />
        </div>
      </section>

      {/* Results Section */}
      <SearchResults
        recipes={displayRecipes}
        query={query}
        loading={loading}
        emptyMessage={
          query ? tCommon('search') : t('recentRecipes')
        }
      />

      {/* Show hint when no query and no recent recipes */}
      {!query && recentRecipes.length === 0 && !loading && (
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {t('recentRecipes')}{' '}
            <Link href={`/${locale}/recipes`} className="font-medium text-primary-600 hover:underline dark:text-primary-400">
              {t('popularRecipes')}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
