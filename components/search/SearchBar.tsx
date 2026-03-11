'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { Spinner } from '@/components/common/Spinner';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onSearch, loading = false, placeholder = 'Search recipes...', className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    };

    const handleClear = () => {
      onSearch('');
    };

    return (
      <div className="relative w-full">
        {/* Search Icon */}
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={ref}
          type="text"
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            'h-14 w-full rounded-lg border-2 border-gray-300 bg-white pl-14 pr-12 text-lg text-gray-900 placeholder-gray-500 transition-colors focus:border-primary-500 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-400',
            className
          )}
          {...props}
        />

        {/* Loading or Clear Button */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {loading ? (
            <Spinner size="sm" />
          ) : (
            props.value && (
              <button
                onClick={handleClear}
                className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear search"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6m0-6 6 6" />
                </svg>
              </button>
            )
          )}
        </div>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
