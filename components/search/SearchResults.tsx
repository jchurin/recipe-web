import type { Recipe } from '@/types/recipe';
import { RecipeMasonry } from '@/components/recipe/RecipeMasonry';

export interface SearchResultsProps {
  recipes: Recipe[];
  query: string;
  loading?: boolean;
  emptyMessage?: string;
}

export function SearchResults({
  recipes,
  query,
  loading = false,
  emptyMessage = 'No recipes found',
}: SearchResultsProps) {
  if (!query && recipes.length === 0 && !loading) {
    return null;
  }

  return (
    <div className="mt-8">
      {query && !loading && (
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
          Found <span className="font-semibold">{recipes.length}</span> recipe
          {recipes.length !== 1 && 's'}
        </p>
      )}

      <RecipeMasonry recipes={recipes} loading={loading} emptyMessage={emptyMessage} />
    </div>
  );
}
