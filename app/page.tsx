'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { useSearch } from '@/lib/hooks/useSearch';
import { useRecentRecipes } from '@/lib/hooks/useRecentRecipes';
import { getAllRecipes, getRecipesByIds } from '@/lib/data/recipes';
import type { Recipe } from '@/types/recipe';

export default function HomePage() {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const { recentRecipeIds } = useRecentRecipes();

  // Load all recipes
  useEffect(() => {
    getAllRecipes().then(setAllRecipes);
  }, []);

  // Load recent recipes
  useEffect(() => {
    if (recentRecipeIds.length > 0) {
      getRecipesByIds(recentRecipeIds).then(setRecentRecipes);
    }
  }, [recentRecipeIds]);

  const { query, setQuery, results, loading } = useSearch(allRecipes);

  // Show search results if query exists, otherwise show recent recipes
  const displayRecipes = query.length >= 2 ? results : recentRecipes;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section with Search */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-gray-100">
          Find Your Perfect Recipe
        </h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
          Search by name, ingredients, cuisine, or dietary preferences
        </p>

        <div className="mx-auto max-w-3xl">
          <SearchBar
            onSearch={setQuery}
            placeholder="Search recipes..."
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
          query ? 'No recipes found' : 'Your recently viewed recipes will appear here'
        }
      />

      {/* Show hint when no query and no recent recipes */}
      {!query && recentRecipes.length === 0 && !loading && (
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Start by browsing our{' '}
            <Link href="/recipes" className="font-medium text-primary-600 hover:underline dark:text-primary-400">
              recipe collection
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
