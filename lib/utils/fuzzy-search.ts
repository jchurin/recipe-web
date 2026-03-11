import Fuse, { IFuseOptions } from "fuse.js";
import type { Recipe } from "@/types/recipe";

export interface SearchOptions {
  threshold?: number;
  includeScore?: boolean;
  keys?: string[];
}

const defaultOptions: IFuseOptions<Recipe> = {
  threshold: 0.3, // Moderate fuzzy matching
  includeScore: true,
  keys: [
    { name: "title", weight: 3 }, // Highest priority
    { name: "description", weight: 2 },
    { name: "ingredients.name", weight: 2 },
    { name: "categories.cuisineType", weight: 1.5 },
    { name: "categories.mealType", weight: 1.5 },
    { name: "categories.dietaryRestrictions", weight: 1 },
  ],
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export function searchRecipes(
  recipes: Recipe[],
  query: string,
  options?: SearchOptions,
): Recipe[] {
  if (!query || query.trim().length < 2) {
    return recipes;
  }

  const fuse = new Fuse(recipes, { ...defaultOptions, ...options });
  const results = fuse.search(query);

  return results.map((result) => result.item);
}

export function getSuggestions(
  recipes: Recipe[],
  query: string,
  limit: number = 5,
): Recipe[] {
  const results = searchRecipes(recipes, query);
  return results.slice(0, limit);
}
