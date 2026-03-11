import type { Categories, CategoryDefinition } from '@/types/category';
import categoriesData from '@/data/categories.json';

/**
 * Get all categories
 * @returns Promise resolving to all category definitions
 */
export async function getAllCategories(): Promise<Categories> {
  return categoriesData as Categories;
}

/**
 * Get cuisine type categories
 * @returns Promise resolving to cuisine type categories
 */
export async function getCuisineTypes(): Promise<CategoryDefinition[]> {
  const categories = await getAllCategories();
  return categories.cuisineTypes;
}

/**
 * Get meal type categories
 * @returns Promise resolving to meal type categories
 */
export async function getMealTypes(): Promise<CategoryDefinition[]> {
  const categories = await getAllCategories();
  return categories.mealTypes;
}

/**
 * Get dietary restriction categories
 * @returns Promise resolving to dietary restriction categories
 */
export async function getDietaryRestrictions(): Promise<CategoryDefinition[]> {
  const categories = await getAllCategories();
  return categories.dietaryRestrictions;
}

/**
 * Get cooking time categories
 * @returns Promise resolving to cooking time categories
 */
export async function getCookingTimes(): Promise<CategoryDefinition[]> {
  const categories = await getAllCategories();
  return categories.cookingTimes;
}

/**
 * Get allergen categories
 * @returns Promise resolving to allergen categories
 */
export async function getAllergens(): Promise<CategoryDefinition[]> {
  const categories = await getAllCategories();
  return categories.allergens;
}

/**
 * Get a specific category by ID from any category type
 * @param categoryId - Category ID to find
 * @returns Promise resolving to category definition or null
 */
export async function getCategoryById(
  categoryId: string
): Promise<CategoryDefinition | null> {
  const categories = await getAllCategories();

  const allCategories = [
    ...categories.cuisineTypes,
    ...categories.mealTypes,
    ...categories.dietaryRestrictions,
    ...categories.cookingTimes,
    ...categories.allergens,
  ];

  return allCategories.find((cat) => cat.id === categoryId) || null;
}
