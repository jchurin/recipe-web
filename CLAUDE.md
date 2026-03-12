# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.1.6 web application for recipes, built with:
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- next-intl v4.8.3 (internationalization)
- App Router architecture (Next.js app directory)

**Project Goals**:
- Frontend-only recipe website (no database)
- JSON files in `/data` folder serve as source of truth
- Multi-language support (English, Spanish, Portuguese, Italian)
- Clean, modern UI with smooth transitions
- Highly componentized architecture
- Can use Next.js API routes if beneficial
- Can leverage SSR or CSR as appropriate

**Design Priorities**:
1. Componentization (highest priority)
2. Clean and pretty UI
3. Smooth transitions and interactions

## Development Commands

**Start development server:**
```bash
npm run dev
```
Server runs at http://localhost:3000 with hot reload enabled.

**Build for production:**
```bash
npm run build
```

**Start production server:**
```bash
npm start
```

**Run linter:**
```bash
npm run lint
```

## Project Architecture

**Folder Structure:**
```
recipe-web/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   └── [locale]/            # Locale-based routing
│       ├── layout.tsx       # Locale layout with translations
│       ├── page.tsx         # Home (CSR - search focused)
│       ├── recipes/
│       │   ├── page.tsx    # Browse (SSR)
│       │   └── [id]/page.tsx # Detail (SSR)
│       └── favorites/page.tsx # Favorites (CSR)
├── components/
│   ├── common/             # Atomic: Button, Badge, Card, Spinner, etc.
│   ├── recipe/             # RecipeCard, RecipeMasonry, RecipeCarousel, etc.
│   ├── search/             # SearchBar, SearchResults
│   ├── filters/            # FilterBar, FilterChip
│   ├── favorites/          # FavoriteButton
│   └── layout/             # Header, Footer, LanguageSwitcher
├── lib/
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── data/               # Data access layer
│   └── i18n/               # Internationalization config
├── messages/                # UI translations (en, es, pt, it)
├── types/                   # TypeScript definitions
├── data/                    # JSON source of truth
│   ├── recipes/            # Recipes by language (en, es, pt, it)
│   └── categories/         # Categories by language (en, es, pt, it)
├── middleware.ts            # Locale detection & routing
```

**TypeScript Configuration:**
- Path alias `@/*` maps to root directory for imports
- Strict mode enabled
- Target: ES2017

**Styling:**
- Tailwind CSS 4 with custom brown/green theme
- Uses Geist and Geist Mono fonts from `next/font/google`
- Dark mode support with manual toggle
- Masonry grid utility (`.masonry-grid`)

**State Management:**
- React hooks for component state
- localStorage for persistence (favorites, recent, theme)
- No external state management library

**Search & Filtering:**
- Fuse.js for fuzzy search (weighted fields: title, description, ingredients, categories)
- Multi-dimensional filtering (cuisine, meal, dietary, time)
- Real-time search with 300ms debounce

## Key Conventions

- All React components use TypeScript (`.tsx`)
- Client components marked with `'use client'` directive
- Server components are default (no directive)
- Image optimization via `next/image` component
- Use `@/` path alias for all imports
- Framer Motion for animations

## Component Architecture

**Atomic Design Pattern:**
1. **Atoms** (`components/common/`): Button, Badge, Card, Spinner, EmptyState
2. **Molecules** (`components/recipe/`, `components/search/`): RecipeCard, SearchBar, FilterChip
3. **Organisms** (`components/recipe/`, `components/filters/`): RecipeMasonry, FilterBar, SearchResults
4. **Templates** (`components/layout/`): Header, Footer
5. **Pages** (`app/`): page.tsx files

**Critical Components:**
- `RecipeCard` - Most reused component (search, browse, favorites)
- `SearchBar` - Main home page feature with autocomplete
- `RecipeMasonry` - Grid layout with animations
- `FilterBar` - Comprehensive filter UI

## Data Management

**Source of Truth:** `/data/recipes/*.json` and `/data/categories/*.json` (by language)

**Adding New Recipes:**
1. Add recipe object to all language files: `data/recipes/en.json`, `es.json`, `pt.json`, `it.json`
2. Keep recipe IDs and category IDs consistent across all languages
3. Translate: title, description, ingredient names, instructions
4. Keep unchanged: id, images, prepTime, cookTime, servings, difficulty, category IDs
5. Add images to `public/images/recipes/`
6. Use standardized units: g, kg, ml, l, pieces, cloves, tsp, tbsp (translatable)
7. Avoid English-only terms like "large", "medium" - use "pieces" with size in notes

**Data Access Layer:**
- `lib/data/recipes.ts` - Functions to get/filter recipes (accepts locale parameter)
- `lib/data/categories.ts` - Functions to get categories (accepts locale parameter)
- All functions are async (even though reading JSON) for future API migration

**Internationalization:**
- `lib/i18n/config.ts` - Supported locales and configuration
- `lib/i18n/request.ts` - Server-side translation setup
- `middleware.ts` - Locale detection and routing
- `messages/*.json` - UI translations for each language

## Custom Hooks

| Hook | Purpose | Location |
|------|---------|----------|
| `useLocalStorage` | Generic localStorage with SSR support | `lib/hooks/useLocalStorage.ts` |
| `useDebounce` | Debounce value changes (300ms) | `lib/hooks/useDebounce.ts` |
| `useFavorites` | Manage favorite recipes | `lib/hooks/useFavorites.ts` |
| `useSearch` | Real-time search with debouncing | `lib/hooks/useSearch.ts` |
| `useFilters` | Multi-dimensional filtering | `lib/hooks/useFilters.ts` |
| `useRecentRecipes` | Track recently viewed recipes | `lib/hooks/useRecentRecipes.ts` |

## Utilities

| Utility | Purpose | Location |
|---------|---------|----------|
| `searchRecipes` | Fuse.js fuzzy search | `lib/utils/fuzzy-search.ts` |
| `cn` | Merge className (clsx + tailwind-merge) | `lib/utils/cn.ts` |
| `formatTime` | Format minutes to "1h 30m" | `lib/utils/format.ts` |
| `formatDifficulty` | Format difficulty with stars | `lib/utils/format.ts` |
| `getRecipeUrl` | Generate shareable URL | `lib/utils/format.ts` |
| `copyToClipboard` | Copy text with fallback | `lib/utils/format.ts` |

## Pages & Routing

| Route | Rendering | Purpose | Key Features |
|-------|-----------|---------|--------------|
| `/[locale]` | CSR | Home/Search | Large search bar, real-time results, recent recipes |
| `/[locale]/recipes` | SSR | Browse | Sidebar filters, masonry grid |
| `/[locale]/recipes/[id]` | SSR | Recipe Detail | Carousel, 2-column layout, share, favorite |
| `/[locale]/favorites` | CSR | Saved Recipes | localStorage-based favorites list |

**Locale Support:** en (English), es (Spanish), pt (Portuguese), it (Italian)

**SSR vs CSR Decision:**
- SSR: Pages needing SEO, shareable URLs (browse, detail)
- CSR: Pages needing localStorage access (home search, favorites)

## Workflow and Development Guidelines

**Branch and Testing:**
- Main branch should only contain completed and tested features
- Everything that can be tested with unit tests should have unit tests
- Everything that can be tested with Playwright should have Playwright tests

**Documentation:**
- Log relevant changes in CHANGELOG.md before commit and push to repo
- Log lessons/learnings in LESSONS.md to avoid running into the same issue more than once

**Code Quality:**
- Always address the root cause of issues
- Always avoid code fallbacks and address the root of what could cause a fallback to trigger

## Epistemic Operating Rules

These rules ensure clarity and reliability in all agent operations.

### 1. Goal Clarity First

Before executing any task, MUST:
- Restate the goal in own words
- Explicitly list success criteria
- Identify constraints (time, scope, tools, quality)

If any of the above are unclear, MUST pause and ask.

### 2. Assumption Enumeration

For every non-trivial task, MUST list:
- Assumptions about user intent
- Assumptions about system behavior
- Assumptions about available context

Assumptions MUST be explicit. Implicit assumptions are treated as errors.

### 3. Context Sensitivity Check

Before reasoning or producing output, MUST classify the task as:
- Low-context (likely in training data)
- Medium-context (partial external context)
- High-context (requires user-provided or repo-specific data)

If the task is medium or high-context and required information is missing, MUST request it before proceeding.

### 4. Falsifiability Requirement

All substantive claims MUST be one of:
- Falsifiable (can be verified by code, data, or inspection)
- Explicitly labeled as speculative
- Explicitly labeled as an assumption

If a claim cannot be falsified, MUST say so.

### 5. Hallucination Handling

If the agent lacks sufficient grounding:
- MUST NOT fabricate details
- MUST prefer abstention over invention
- MUST explain what information is missing

Confidence without grounding is considered failure.

### 6. Visibility Over Brevity

For complex outputs, MUST include:
- Why this approach was chosen
- What alternatives were considered
- What information influenced the result

The goal is interpretability of the agent's reasoning, not just output quality.

### 7. Continuous Assumption Reduction

When iterating on a task, SHOULD:
- Identify which assumptions were validated
- Remove redundant or unused context
- Flag context that appears to hinder performance

Unused context is treated as technical debt.

### 8. Reliability Over Peak Accuracy

Agents should optimize for:
- Consistent correctness
- Verifiable outputs
- Stable behavior across runs

A system that is reliably 85% correct is preferred over one that is intermittently brilliant.
