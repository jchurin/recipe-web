'use client';

import { motion } from 'framer-motion';
import type { Recipe } from '@/types/recipe';
import { RecipeCard } from './RecipeCard';
import { RecipeCardSkeleton } from './RecipeCardSkeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { cn } from '@/lib/utils/cn';

export interface RecipeMasonryProps {
  recipes: Recipe[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function RecipeMasonry({
  recipes,
  loading = false,
  emptyMessage = 'No recipes found',
  className,
}: RecipeMasonryProps) {
  if (loading) {
    return (
      <div className={cn('masonry-grid', className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <EmptyState
        icon="🍽️"
        title={emptyMessage}
        description="Try adjusting your search or filters"
      />
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn('masonry-grid', className)}
    >
      {recipes.map((recipe) => (
        <motion.div key={recipe.id} variants={item}>
          <RecipeCard recipe={recipe} />
        </motion.div>
      ))}
    </motion.div>
  );
}
