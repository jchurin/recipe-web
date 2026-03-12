'use client';

import { X } from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import type { SearchFilter } from '@/lib/hooks/useSmartSearch';

export interface SearchFilterChipsProps {
  filters: SearchFilter[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function SearchFilterChips({ filters, onRemove, onClearAll }: SearchFilterChipsProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => (
        <Badge
          key={filter.id}
          variant="primary"
          size="md"
          className="pr-1"
        >
          <span>{filter.term}</span>
          <button
            onClick={() => onRemove(filter.id)}
            className="ml-1.5 inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10"
            aria-label={`Remove ${filter.term} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {filters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm font-medium text-gray-600 underline-offset-2 hover:underline dark:text-gray-400"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
