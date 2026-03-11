import { type ReactNode, type MouseEvent } from 'react';
import { cn } from '@/lib/utils/cn';

export interface CardActionButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  icon: ReactNode;
  label: string;
  className?: string;
}

export function CardActionButton({ onClick, icon, label, className }: CardActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition-transform hover:scale-110 active:scale-95 dark:bg-gray-800/90',
        className
      )}
      aria-label={label}
    >
      {icon}
    </button>
  );
}
