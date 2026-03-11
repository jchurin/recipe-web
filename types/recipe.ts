export type Difficulty = 'easy' | 'medium' | 'hard';
export type CookingTimeCategory = 'quick' | 'medium' | 'long';

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export interface Instruction {
  step: number;
  text: string;
  image?: string;
  timer?: number;
}

export interface RecipeCategories {
  cuisineType: string[];
  mealType: string[];
  dietaryRestrictions: string[];
  cookingTime: CookingTimeCategory;
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  allergens: string[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  images: string[];

  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  difficulty: Difficulty;

  ingredients: Ingredient[];
  instructions: Instruction[];

  categories: RecipeCategories;
  nutrition: Nutrition;

  createdAt: string;
  updatedAt: string;
}
