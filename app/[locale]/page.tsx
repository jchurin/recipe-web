'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { SearchFilterChips } from '@/components/search/SearchFilterChips';
import { useSmartSearch } from '@/lib/hooks/useSmartSearch';
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

  const {
    query,
    setQuery,
    results,
    loading,
    searchFilters,
    addSearchFilter,
    removeSearchFilter,
    removeLastSearchFilter,
    clearSearchFilters,
  } = useSmartSearch(allRecipes);

  // Handle Enter key in search bar - add any text as filter
  const handleSearchEnter = (searchQuery: string) => {
    addSearchFilter(searchQuery);
    setQuery(''); // Clear search input after adding filter
  };

  // Handle Escape key in search bar (remove last filter)
  const handleSearchEscape = () => {
    removeLastSearchFilter();
  };

  // Show search results if query or filters exist, otherwise show recent recipes
  const hasActiveSearch = query.length >= 2 || searchFilters.length > 0;
  const displayRecipes = hasActiveSearch ? results : recentRecipes;

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
            onEnter={handleSearchEnter}
            onEscape={handleSearchEscape}
            placeholder={t('searchPlaceholder')}
            value={query}
            loading={loading}
            autoFocus
          />

          {/* Search Filter Chips */}
          {searchFilters.length > 0 && (
            <div className="mt-4">
              <SearchFilterChips
                filters={searchFilters}
                onRemove={removeSearchFilter}
                onClearAll={clearSearchFilters}
              />
            </div>
          )}
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

      {/* Show hint when no query/filters and no recent recipes */}
      {!hasActiveSearch && recentRecipes.length === 0 && !loading && (
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
