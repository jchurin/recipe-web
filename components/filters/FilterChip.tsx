'use client';

import { Badge } from '@/components/common/Badge';

export interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
    >
      <Badge variant={active ? 'primary' : 'default'} size="md">
        {label}
      </Badge>
    </button>
  );
}
