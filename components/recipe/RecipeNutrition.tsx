import type { Nutrition } from '@/types/recipe';
import { Badge } from '@/components/common/Badge';

export interface RecipeNutritionProps {
  nutrition: Nutrition;
}

export function RecipeNutrition({ nutrition }: RecipeNutritionProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Nutrition Information
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {nutrition.calories}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Protein</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {nutrition.protein}g
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Carbs</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {nutrition.carbs}g
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Fat</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {nutrition.fat}g
          </p>
        </div>
      </div>

      {nutrition.allergens.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Allergens:
          </p>
          <div className="flex flex-wrap gap-2">
            {nutrition.allergens.map((allergen) => (
              <Badge key={allergen} variant="warning" size="sm">
                {allergen}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
