import type { Ingredient } from '@/types/recipe';

export interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Ingredients
      </h2>

      <ul className="space-y-2">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.id}
            className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
          >
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
            <span>
              <span className="font-medium">
                {ingredient.quantity} {ingredient.unit}
              </span>{' '}
              {ingredient.name}
              {ingredient.notes && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {' '}
                  ({ingredient.notes})
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
