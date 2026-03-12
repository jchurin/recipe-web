'use client';

import { useTranslations } from 'next-intl';
import type { Recipe } from '@/types/recipe';
import { Badge } from '@/components/common/Badge';
import { formatTime } from '@/lib/utils/format';

export interface RecipeMetaProps {
  recipe: Recipe;
}

export function RecipeMeta({ recipe }: RecipeMetaProps) {
  const t = useTranslations('recipe');
  const tDifficulty = useTranslations('difficulty');

  const difficultyColor = {
    easy: 'success' as const,
    medium: 'warning' as const,
    hard: 'error' as const,
  };

  return (
    <div className="flex flex-wrap gap-3 text-xs">
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-700 dark:text-gray-300">{t('prepTime')}:</span>
        <span className="text-gray-600 dark:text-gray-400">{formatTime(recipe.prepTime)}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-700 dark:text-gray-300">{t('cookTime')}:</span>
        <span className="text-gray-600 dark:text-gray-400">{formatTime(recipe.cookTime)}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-700 dark:text-gray-300">{t('totalTime')}:</span>
        <span className="text-gray-600 dark:text-gray-400">{formatTime(recipe.totalTime)}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-700 dark:text-gray-300">{t('servings')}:</span>
        <span className="text-gray-600 dark:text-gray-400">{recipe.servings}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-700 dark:text-gray-300">{t('difficulty')}:</span>
        <Badge variant={difficultyColor[recipe.difficulty]} size="sm">
          {tDifficulty(recipe.difficulty)}
        </Badge>
      </div>
    </div>
  );
}
