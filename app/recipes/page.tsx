import { getAllRecipes } from '@/lib/data/recipes';
import { getAllCategories } from '@/lib/data/categories';
import { RecipesBrowser } from '@/components/recipe/RecipesBrowser';

export const metadata = {
  title: 'Browse Recipes | Recipe Hub',
  description: 'Browse our collection of delicious recipes. Filter by cuisine, meal type, and dietary preferences.',
};

export default async function RecipesPage() {
  const recipes = await getAllRecipes();
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100">
        Browse Recipes
      </h1>

      <RecipesBrowser recipes={recipes} categories={categories} />
    </div>
  );
}
