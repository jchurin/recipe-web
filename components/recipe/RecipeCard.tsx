'use client';

import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Share2, Check, MessageCircle, Heart } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import type { Recipe } from '@/types/recipe';
import type { Categories } from '@/types/category';
import { Badge } from '@/components/common/Badge';
import { formatTime, getRecipeUrl, copyToClipboard } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { getAllCategories } from '@/lib/data/categories';
import type { Locale } from '@/lib/i18n/config';
import { CardActionButton } from './CardActionButton';

export interface RecipeCardProps {
  recipe: Recipe;
  variant?: 'default' | 'compact';
  showFavorite?: boolean;
  className?: string;
}

export const RecipeCard = memo(function RecipeCard({
  recipe,
  variant = 'default',
  className,
}: RecipeCardProps) {
  const [copied, setCopied] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);
  const locale = useLocale() as Locale;
  const tDifficulty = useTranslations('difficulty');
  const tRecipe = useTranslations('recipe');
  const [categories, setCategories] = useState<Categories | null>(null);

  // Load categories for translated labels
  useEffect(() => {
    getAllCategories(locale).then(setCategories);
  }, [locale]);

  const difficultyColor = {
    easy: 'success' as const,
    medium: 'warning' as const,
    hard: 'error' as const,
  };

  // Helper to get translated category label
  const getCategoryLabel = (categoryId: string, type: 'cuisineType' | 'mealType') => {
    if (!categories) return categoryId;
    const categoryList = type === 'cuisineType' ? categories.cuisineTypes : categories.mealTypes;
    const category = categoryList?.find((c) => c.id === categoryId);
    return category?.label || categoryId;
  };

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getRecipeUrl(recipe.id);
    await copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getRecipeUrl(recipe.id);
    const text = `Check out this recipe: ${recipe.title}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn('group', className)}
    >
      <Link href={`/recipes/${recipe.id}`} className="block">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
          {/* Image */}
          <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image
              src={recipe.images[0] || '/placeholder-recipe.jpg'}
              alt={recipe.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Action Buttons - Show on hover */}
            <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {/* Favorite Button */}
              <CardActionButton
                onClick={handleFavorite}
                label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                icon={
                  <Heart
                    className={cn(
                      'h-5 w-5',
                      favorite
                        ? 'fill-red-500 text-red-500'
                        : 'fill-none text-gray-700 dark:text-gray-300'
                    )}
                  />
                }
              />

              {/* Copy Link Button */}
              <CardActionButton
                onClick={handleShare}
                label="Copy link"
                icon={
                  copied ? (
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Share2 className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  )
                }
              />

              {/* WhatsApp Share Button */}
              <CardActionButton
                onClick={handleWhatsAppShare}
                label="Share on WhatsApp"
                icon={<MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />}
              />
            </div>

            {/* Difficulty Badge */}
            <div className="absolute bottom-2 right-2">
              <Badge variant={difficultyColor[recipe.difficulty]} size="sm">
                {tDifficulty(recipe.difficulty)}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {recipe.title}
            </h3>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{formatTime(recipe.totalTime)}</span>
              </div>

              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>{recipe.servings} {tRecipe('servings')}</span>
              </div>
            </div>

            {/* Categories */}
            {variant === 'default' && (
              <div className="mt-3 flex flex-wrap gap-1">
                {recipe.categories.cuisineType.slice(0, 2).map((cuisine) => (
                  <Badge key={cuisine} variant="primary" size="sm">
                    {getCategoryLabel(cuisine, 'cuisineType')}
                  </Badge>
                ))}
                {recipe.categories.mealType.slice(0, 1).map((meal) => (
                  <Badge key={meal} variant="accent" size="sm">
                    {getCategoryLabel(meal, 'mealType')}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
});
