'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import type { Nutrition } from '@/types/recipe';
import type { Categories } from '@/types/category';
import { Badge } from '@/components/common/Badge';
import { getAllCategories } from '@/lib/data/categories';
import type { Locale } from '@/lib/i18n/config';

export interface RecipeNutritionProps {
  nutrition: Nutrition;
}

export function RecipeNutrition({ nutrition }: RecipeNutritionProps) {
  const t = useTranslations('recipe');
  const locale = useLocale() as Locale;
  const [categories, setCategories] = useState<Categories | null>(null);

  useEffect(() => {
    getAllCategories(locale).then(setCategories);
  }, [locale]);

  const getAllergenLabel = (allergenId: string) => {
    if (!categories) return allergenId;
    const allergen = categories.allergens?.find((a) => a.id === allergenId);
    return allergen?.label || allergenId;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
        {t('nutritionInfo')}
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('calories')}</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {nutrition.calories}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('protein')}</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {nutrition.protein}g
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('carbs')}</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {nutrition.carbs}g
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('fat')}</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {nutrition.fat}g
          </p>
        </div>
      </div>

      {nutrition.allergens.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('allergens')}:
          </p>
          <div className="flex flex-wrap gap-2">
            {nutrition.allergens.map((allergen) => (
              <Badge key={allergen} variant="warning" size="sm">
                {getAllergenLabel(allergen)}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
