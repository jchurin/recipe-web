import { notFound } from 'next/navigation';
import { getRecipeById, getAllRecipes } from '@/lib/data/recipes';
import { RecipeCarousel } from '@/components/recipe/RecipeCarousel';
import { RecipeMeta } from '@/components/recipe/RecipeMeta';
import { RecipeIngredients } from '@/components/recipe/RecipeIngredients';
import { RecipeInstructions } from '@/components/recipe/RecipeInstructions';
import { RecipeNutrition } from '@/components/recipe/RecipeNutrition';
import { RecipeShare } from '@/components/recipe/RecipeShare';
import { FavoriteButton } from '@/components/favorites/FavoriteButton';
import { Badge } from '@/components/common/Badge';

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: RecipeDetailPageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

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
  const recipes = await getAllRecipes();
  return recipes.map((recipe) => ({
    id: recipe.id,
  }));
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

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
          <div className="flex flex-wrap gap-1.5">
            {recipe.categories.cuisineType.slice(0, 2).map((cuisine) => (
              <Badge key={cuisine} variant="primary" size="sm">
                {cuisine}
              </Badge>
            ))}
            {recipe.categories.mealType.slice(0, 1).map((meal) => (
              <Badge key={meal} variant="accent" size="sm">
                {meal}
              </Badge>
            ))}
            {recipe.categories.dietaryRestrictions.slice(0, 2).map((dietary) => (
              <Badge key={dietary} variant="success" size="sm">
                {dietary}
              </Badge>
            ))}
          </div>
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
