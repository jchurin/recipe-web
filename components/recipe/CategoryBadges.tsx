'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Badge } from '@/components/common/Badge';
import { getAllCategories } from '@/lib/data/categories';
import type { Locale } from '@/lib/i18n/config';
import type { Categories } from '@/types/category';

export interface CategoryBadgesProps {
  cuisineTypes: string[];
  mealTypes: string[];
  dietaryRestrictions?: string[];
}

export function CategoryBadges({ cuisineTypes, mealTypes, dietaryRestrictions = [] }: CategoryBadgesProps) {
  const locale = useLocale() as Locale;
  const [categories, setCategories] = useState<Categories | null>(null);

  useEffect(() => {
    getAllCategories(locale).then(setCategories);
  }, [locale]);

  const getCategoryLabel = (categoryId: string, type: 'cuisineType' | 'mealType' | 'dietary') => {
    if (!categories) return categoryId;
    let categoryList;
    if (type === 'cuisineType') categoryList = categories.cuisineTypes;
    else if (type === 'mealType') categoryList = categories.mealTypes;
    else categoryList = categories.dietaryRestrictions;

    const category = categoryList?.find((c) => c.id === categoryId);
    return category?.label || categoryId;
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {cuisineTypes.slice(0, 2).map((cuisine) => (
        <Badge key={cuisine} variant="primary" size="sm">
          {getCategoryLabel(cuisine, 'cuisineType')}
        </Badge>
      ))}
      {mealTypes.slice(0, 1).map((meal) => (
        <Badge key={meal} variant="accent" size="sm">
          {getCategoryLabel(meal, 'mealType')}
        </Badge>
      ))}
      {dietaryRestrictions.slice(0, 2).map((dietary) => (
        <Badge key={dietary} variant="success" size="sm">
          {getCategoryLabel(dietary, 'dietary')}
        </Badge>
      ))}
    </div>
  );
}
