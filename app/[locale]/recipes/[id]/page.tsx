import { notFound } from 'next/navigation';
import { getRecipeById, getAllRecipes } from '@/lib/data/recipes';
import { RecipeCarousel } from '@/components/recipe/RecipeCarousel';
import { RecipeMeta } from '@/components/recipe/RecipeMeta';
import { RecipeIngredients } from '@/components/recipe/RecipeIngredients';
import { RecipeInstructions } from '@/components/recipe/RecipeInstructions';
import { RecipeNutrition } from '@/components/recipe/RecipeNutrition';
import { RecipeShare } from '@/components/recipe/RecipeShare';
import { FavoriteButton } from '@/components/favorites/FavoriteButton';
import { CategoryBadges } from '@/components/recipe/CategoryBadges';
import type { Locale } from '@/lib/i18n/config';

interface RecipeDetailPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: RecipeDetailPageProps) {
  const { id, locale } = await params;
  const recipe = await getRecipeById(id, locale as Locale);

  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    };
  }

  return {
    title: `${recipe.title} | Recipe Hub`,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: recipe.images[0] ? [{ url: recipe.images[0] }] : [],
    },
  };
}

export async function generateStaticParams() {
  // Generate params for all locales and all recipes
  const locales: Locale[] = ['en', 'es', 'pt', 'it'];
  const allParams = [];

  for (const locale of locales) {
    const recipes = await getAllRecipes(locale);
    const params = recipes.map((recipe) => ({
      locale,
      id: recipe.id,
    }));
    allParams.push(...params);
  }

  return allParams;
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { id, locale } = await params;
  const recipe = await getRecipeById(id, locale as Locale);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Hero Section with Carousel */}
      <div className="mb-4">
        <RecipeCarousel images={recipe.images} title={recipe.title} />
      </div>

      {/* Title, Meta, and Actions - All in one compact section */}
      <div className="mb-4">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <h1 className="mb-1 text-3xl font-bold text-gray-900 dark:text-gray-100">
              {recipe.title}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400">{recipe.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <FavoriteButton recipeId={recipe.id} variant="full" size="sm" />
            <RecipeShare recipeId={recipe.id} recipeTitle={recipe.title} />
          </div>
        </div>

        {/* Categories and Meta in one line */}
        <div className="flex flex-wrap items-center gap-3">
          <CategoryBadges
            cuisineTypes={recipe.categories.cuisineType}
            mealTypes={recipe.categories.mealType}
            dietaryRestrictions={recipe.categories.dietaryRestrictions}
          />
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
          <RecipeMeta recipe={recipe} />
        </div>
      </div>

      {/* Two Column Layout: Ingredients and Instructions */}
      <div className="grid gap-4 lg:grid-cols-[350px_1fr]">
        {/* Ingredients - Sticky on larger screens */}
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <RecipeIngredients ingredients={recipe.ingredients} />
        </aside>

        {/* Instructions and Nutrition */}
        <div className="space-y-4">
          <RecipeInstructions instructions={recipe.instructions} />
          <RecipeNutrition nutrition={recipe.nutrition} />
        </div>
      </div>
    </div>
  );
}
