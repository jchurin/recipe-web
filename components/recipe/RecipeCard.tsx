'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Share2, Check } from 'lucide-react';
import type { Recipe } from '@/types/recipe';
import { Badge } from '@/components/common/Badge';
import { formatTime, getRecipeUrl, copyToClipboard } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { FavoriteButton } from '@/components/favorites/FavoriteButton';

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

  const difficultyColor = {
    easy: 'success' as const,
    medium: 'warning' as const,
    hard: 'error' as const,
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getRecipeUrl(recipe.id);
    await copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
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
              <div className="rounded-full bg-white/90 p-1.5 shadow-md backdrop-blur-sm dark:bg-gray-800/90">
                <FavoriteButton recipeId={recipe.id} variant="icon" />
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition-transform hover:scale-110 active:scale-95 dark:bg-gray-800/90"
                aria-label="Share recipe"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <Share2 className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>

            {/* Difficulty Badge */}
            <div className="absolute bottom-2 right-2">
              <Badge variant={difficultyColor[recipe.difficulty]} size="sm">
                {recipe.difficulty}
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
                <span>{recipe.servings} servings</span>
              </div>
            </div>

            {/* Categories */}
            {variant === 'default' && (
              <div className="mt-3 flex flex-wrap gap-1">
                {recipe.categories.cuisineType.slice(0, 2).map((cuisine) => (
                  <Badge key={cuisine} variant="primary" size="sm">
                    {cuisine}
                  </Badge>
                ))}
                {recipe.categories.mealType.slice(0, 1).map((meal) => (
                  <Badge key={meal} variant="accent" size="sm">
                    {meal}
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
