'use client';

import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { Button } from '@/components/common/Button';

export interface FavoriteButtonProps {
  recipeId: string;
  variant?: 'icon' | 'full';
  size?: 'sm' | 'md' | 'lg';
}

export function FavoriteButton({ recipeId, variant = 'icon', size = 'md' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipeId);
  const t = useTranslations('common');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipeId);
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className="transition-transform hover:scale-110 active:scale-95"
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          className={`h-6 w-6 ${
            favorite
              ? 'fill-red-500 text-red-500'
              : 'fill-none text-gray-700 dark:text-gray-300'
          }`}
        />
      </button>
    );
  }

  return (
    <Button onClick={handleClick} variant={favorite ? 'accent' : 'outline'} size={size}>
      <Heart
        className={`h-4 w-4 mr-1.5 ${favorite ? 'fill-current' : 'fill-none'}`}
      />
      {favorite ? t('saved') : t('save')}
    </Button>
  );
}
