export interface FilterState {
  cuisineTypes: string[];
  mealTypes: string[];
  dietaryRestrictions: string[];
  cookingTime?: string;
  maxTime?: number;
  difficulty?: string[];
}

export type FilterCategory =
  | 'cuisineTypes'
  | 'mealTypes'
  | 'dietaryRestrictions'
  | 'cookingTime'
  | 'difficulty';
