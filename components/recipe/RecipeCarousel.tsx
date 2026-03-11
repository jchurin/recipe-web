'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/common/Button';

export interface RecipeCarouselProps {
  images: string[];
  title: string;
}

export function RecipeCarousel({ images, title }: RecipeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative aspect-[4/1] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
      <Image
        src={images[currentIndex] || '/placeholder-recipe.jpg'}
        alt={`${title} - Image ${currentIndex + 1}`}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />

      {images.length > 1 && (
        <>
          {/* Previous Button */}
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80"
            aria-label="Previous image"
          >
            ←
          </Button>

          {/* Next Button */}
          <Button
            onClick={goToNext}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80"
            aria-label="Next image"
          >
            →
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-4 bg-white'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
