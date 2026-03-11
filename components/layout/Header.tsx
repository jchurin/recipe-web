import Link from 'next/link';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-700 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl">🍳</span>
          <span className="text-xl font-bold text-primary-700 dark:text-primary-300">
            Recipe Hub
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/recipes"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
          >
            Browse
          </Link>
          <Link
            href="/favorites"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
          >
            Favorites
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
