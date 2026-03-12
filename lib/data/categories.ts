import type { Categories, CategoryDefinition } from '@/types/category';
import type { Locale } from '@/lib/i18n/config';

/**
 * Get all categories for a specific locale
 * @param locale - The language locale (en, es, pt, it)
 * @returns Promise resolving to all category definitions
 */
export async function getAllCategories(locale: Locale = 'en'): Promise<Categories> {
  const categoriesData = await import(`@/data/categories/${locale}.json`);
  return categoriesData.default as Categories;
}

/**
 * Get cuisine type categories
 * @param locale - The language locale
 * @returns Promise resolving to cuisine type categories
 */
export async function getCuisineTypes(locale: Locale = 'en'): Promise<CategoryDefinition[]> {
  const categories = await getAllCategories(locale);
  return categories.cuisineTypes;
}

/**
 * Get meal type categories
 * @param locale - The language locale
 * @returns Promise resolving to meal type categories
 */
export async function getMealTypes(locale: Locale = 'en'): Promise<CategoryDefinition[]> {
  const categories = await getAllCategories(locale);
  return categories.mealTypes;
}

/**
 * Get dietary restriction categories
 * @param locale - The language locale
 * @returns Promise resolving to dietary restriction categories
 */
export async function getDietaryRestrictions(locale: Locale = 'en'): Promise<CategoryDefinition[]> {
  const categories = await getAllCategories(locale);
  return categories.dietaryRestrictions;
}

/**
 * Get cooking time categories
 * @param locale - The language locale
 * @returns Promise resolving to cooking time categories
 */
export async function getCookingTimes(locale: Locale = 'en'): Promise<CategoryDefinition[]> {
  const categories = await getAllCategories(locale);
  return categories.cookingTimes;
}

/**
 * Get allergen categories
 * @param locale - The language locale
 * @returns Promise resolving to allergen categories
 */
export async function getAllergens(locale: Locale = 'en'): Promise<CategoryDefinition[]> {
  const categories = await getAllCategories(locale);
  return categories.allergens;
}

/**
 * Get a specific category by ID from any category type
 * @param categoryId - Category ID to find
 * @param locale - The language locale
 * @returns Promise resolving to category definition or null
 */
export async function getCategoryById(
  categoryId: string,
  locale: Locale = 'en'
): Promise<CategoryDefinition | null> {
  const categories = await getAllCategories(locale);

  const allCategories = [
    ...categories.cuisineTypes,
    ...categories.mealTypes,
    ...categories.dietaryRestrictions,
    ...categories.cookingTimes,
    ...categories.allergens,
  ];

  return allCategories.find((cat) => cat.id === categoryId) || null;
}
