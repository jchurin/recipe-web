export interface CategoryDefinition {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface CookingTimeDefinition extends CategoryDefinition {
  maxMinutes?: number;
}

export interface Categories {
  cuisineTypes: CategoryDefinition[];
  mealTypes: CategoryDefinition[];
  dietaryRestrictions: CategoryDefinition[];
  cookingTimes: CookingTimeDefinition[];
  allergens: CategoryDefinition[];
}
