# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-03-11

### Added

#### Foundation
- **Project Setup**: Installed core dependencies (fuse.js, framer-motion, clsx, tailwind-merge)
- **TypeScript Types**: Created comprehensive type system for recipes, categories, and filters
- **Sample Data**: Created 10 diverse sample recipes with full nutritional information, allergens, and categories
- **Category System**: Defined predefined categories for cuisine types, meal types, dietary restrictions, cooking times, and allergens

#### Utilities & Hooks
- **Fuzzy Search**: Implemented Fuse.js-based search with weighted fields (title, description, ingredients, categories)
- **Formatting Utilities**: Created helpers for time, numbers, difficulty, nutrition, and URL generation
- **className Utility**: Set up clsx + tailwind-merge for conditional class management
- **Custom Hooks**:
  - `useLocalStorage`: Generic localStorage hook with SSR support and cross-tab synchronization
  - `useDebounce`: Debounce hook with 300ms default delay
  - `useFavorites`: Favorites management with localStorage persistence
  - `useSearch`: Real-time search with debouncing and fuzzy matching
  - `useFilters`: Multi-dimensional filtering (cuisine, meal type, dietary, cooking time)
  - `useRecentRecipes`: Recently viewed recipes tracking

#### Components

**Atomic Components**:
- `Button`: Reusable button with variants (primary, accent, outline, ghost) and sizes
- `Badge`: Badge component for tags and categories
- `Card`: Card container with header, content, and footer sub-components
- `Spinner`: Loading spinner with size variants
- `EmptyState`: Empty state component with icon, title, and description
- `ThemeToggle`: Light/dark mode toggle with localStorage persistence

**Recipe Components**:
- `RecipeCard`: Feature-rich recipe card with images, meta info, difficulty badges, and hover effects
- `RecipeCardSkeleton`: Loading skeleton for recipe cards
- `RecipeMasonry`: Pinterest-style masonry grid layout with staggered animations
- `RecipeCarousel`: Image carousel for recipe detail pages
- `RecipeIngredients`: Ingredients list with quantities and notes
- `RecipeInstructions`: Step-by-step instructions with optional timers
- `RecipeMeta`: Recipe metadata display (prep/cook/total time, servings, difficulty)
- `RecipeNutrition`: Nutritional information and allergen warnings
- `RecipeShare`: Share functionality (copy link, WhatsApp)

**Search & Filter Components**:
- `SearchBar`: Search input with autocomplete, debouncing, and clear functionality
- `SearchResults`: Results container with count display
- `FilterBar`: Comprehensive filter UI with multiple category types
- `FilterChip`: Individual filter selection chip

**Layout Components**:
- `Header`: Site header with navigation and theme toggle
- `Footer`: Site footer

**Favorites**:
- `FavoriteButton`: Heart icon toggle for saving recipes

#### Pages & Routing
- **Home Page** (`/`): Search-focused page with real-time fuzzy search and recently viewed recipes
- **Browse Page** (`/recipes`): Recipe browsing with sidebar filters and masonry grid
- **Recipe Detail** (`/recipes/[id]`): Full recipe view with carousel, two-column layout (sticky ingredients, scrollable instructions), nutrition info, and sharing
- **Favorites** (`/favorites`): User's saved recipes with clear all functionality

#### Styling & Theme
- **Color System**: Brown primary palette (#8b6f47) and green accent palette (#2d9d5e)
- **Dark Mode**: Full dark mode support with manual toggle and system preference detection
- **Tailwind Configuration**: Extended theme with custom colors and utilities
- **Masonry Grid**: Responsive CSS Grid masonry layout (280-320px columns)
- **Animations**: Framer Motion integration for page transitions, card hovers, and staggered lists

#### Data Layer
- **Data Access Functions**: Created async functions for getting recipes, filtering by category, and managing favorites
- **Categories Access**: Functions for retrieving all category types

### Technical Details
- **Framework**: Next.js 16.1.6 with App Router
- **React**: Version 19.2.3
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS 4 with custom brown/green theme
- **Search**: Fuse.js fuzzy search with weighted fields
- **Animations**: Framer Motion for smooth transitions
- **State Management**: React hooks + localStorage for persistence
- **SSR/CSR Strategy**:
  - SSR: Recipe list, recipe detail, category pages (SEO-friendly)
  - CSR: Home page search, favorites page (localStorage access)

### Features

#### Core Functionality
- ✅ Real-time fuzzy search across title, description, ingredients, and categories
- ✅ Comprehensive filtering (cuisine type, meal type, dietary restrictions, cooking time)
- ✅ Favorites system with localStorage persistence and cross-tab sync
- ✅ Recipe sharing (copy link, WhatsApp)
- ✅ Recently viewed recipes tracking
- ✅ Light/dark mode with manual toggle
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Masonry grid layout for recipe cards
- ✅ Image carousel on recipe detail pages
- ✅ Sticky ingredients with scrollable instructions
- ✅ Nutritional information and allergen warnings

#### Design & UX
- Clean, modern UI with food-themed brown/green color scheme
- Smooth page transitions and hover effects
- Loading states with skeleton screens
- Empty states with helpful messaging
- Accessible keyboard navigation
- ARIA labels for screen readers

### Development
- ✅ ESLint configuration with Next.js best practices
- ✅ TypeScript strict mode
- ✅ Path aliases (@/*) for clean imports
- ✅ Component-first architecture (highest priority)
- ✅ Clean, maintainable code structure

### Notes
- Recipe images are placeholder paths - actual images need to be added to `/public/images/recipes/`
- All data is currently in JSON files (frontend-only, no database)
- 10 sample recipes covering diverse cuisines, meal types, and dietary preferences
