import type { Recipe } from '@/types/recipe';
import recipesData from '@/data/recipes.json';

/**
 * Get all recipes
 * @returns Promise resolving to array of all recipes
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  return recipesData as Recipe[];
}

/**
 * Get a single recipe by ID
 * @param id - Recipe ID
 * @returns Promise resolving to recipe or null if not found
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  const recipes = await getAllRecipes();
  return recipes.find((recipe) => recipe.id === id) || null;
}

/**
 * Get recipes by category
 * @param categoryType - Type of category (cuisineType, mealType, etc.)
 * @param categoryId - Category ID
 * @returns Promise resolving to filtered recipes
 */
export async function getRecipesByCategory(
  categoryType: keyof Recipe['categories'],
  categoryId: string
): Promise<Recipe[]> {
  const recipes = await getAllRecipes();

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
 * @returns Promise resolving to array of recipes
 */
export async function getRecipesByIds(ids: string[]): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  return recipes.filter((recipe) => ids.includes(recipe.id));
}

/**
 * Get featured recipes (e.g., for homepage)
 * @param limit - Number of recipes to return
 * @returns Promise resolving to array of recipes
 */
export async function getFeaturedRecipes(limit: number = 6): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  // For now, return the first N recipes
  // In a real app, this could be based on a "featured" flag or popularity
  return recipes.slice(0, limit);
}

/**
 * Get recipe count
 * @returns Promise resolving to total number of recipes
 */
export async function getRecipeCount(): Promise<number> {
  const recipes = await getAllRecipes();
  return recipes.length;
}
