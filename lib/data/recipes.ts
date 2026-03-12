import type { Recipe } from '@/types/recipe';
import type { Locale } from '@/lib/i18n/config';

/**
 * Get all recipes for a specific locale
 * @param locale - The language locale (en, es, pt, it)
 * @returns Promise resolving to array of all recipes
 */
export async function getAllRecipes(locale: Locale = 'en'): Promise<Recipe[]> {
  const recipesData = await import(`@/data/recipes/${locale}.json`);
  return recipesData.default as Recipe[];
}

/**
 * Get a single recipe by ID
 * @param id - Recipe ID
 * @param locale - The language locale
 * @returns Promise resolving to recipe or null if not found
 */
export async function getRecipeById(id: string, locale: Locale = 'en'): Promise<Recipe | null> {
  const recipes = await getAllRecipes(locale);
  return recipes.find((recipe) => recipe.id === id) || null;
}

/**
 * Get recipes by category
 * @param categoryType - Type of category (cuisineType, mealType, etc.)
 * @param categoryId - Category ID
 * @param locale - The language locale
 * @returns Promise resolving to filtered recipes
 */
export async function getRecipesByCategory(
  categoryType: keyof Recipe['categories'],
  categoryId: string,
  locale: Locale = 'en'
): Promise<Recipe[]> {
  const recipes = await getAllRecipes(locale);

  return recipes.filter((recipe) => {
    const categoryValue = recipe.categories[categoryType];

    if (Array.isArray(categoryValue)) {
      return categoryValue.includes(categoryId);
    }

    return categoryValue === categoryId;
  });
}

/**
 * Get recipes by multiple IDs
 * @param ids - Array of recipe IDs
 * @param locale - The language locale
 * @returns Promise resolving to array of recipes
 */
export async function getRecipesByIds(ids: string[], locale: Locale = 'en'): Promise<Recipe[]> {
  const recipes = await getAllRecipes(locale);
  return recipes.filter((recipe) => ids.includes(recipe.id));
}

/**
 * Get featured recipes (e.g., for homepage)
 * @param limit - Number of recipes to return
 * @param locale - The language locale
 * @returns Promise resolving to array of recipes
 */
export async function getFeaturedRecipes(limit: number = 6, locale: Locale = 'en'): Promise<Recipe[]> {
  const recipes = await getAllRecipes(locale);
  // For now, return the first N recipes
  // In a real app, this could be based on a "featured" flag or popularity
  return recipes.slice(0, limit);
}

/**
 * Get recipe count
 * @param locale - The language locale
 * @returns Promise resolving to total number of recipes
 */
export async function getRecipeCount(locale: Locale = 'en'): Promise<number> {
  const recipes = await getAllRecipes(locale);
  return recipes.length;
}
