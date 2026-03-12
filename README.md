# 🍳 Recipe Hub

A modern, responsive recipe website built with Next.js 16, featuring real-time search, comprehensive filtering, and a beautiful UI with smooth animations.

## ✨ Features

- 🌍 **Multi-Language Support** - Full i18n with English, Spanish, Portuguese, and Italian
- 🔍 **Real-time Fuzzy Search** - Search recipes by name, ingredients, cuisine, or categories
- 🎛️ **Advanced Filtering** - Filter by cuisine type, meal type, dietary restrictions, and cooking time
- ❤️ **Favorites System** - Save your favorite recipes with localStorage persistence
- 📱 **Recipe Sharing** - Share recipes via link or WhatsApp
- 🌓 **Dark Mode** - Full dark mode support with manual toggle
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎨 **Masonry Layout** - Pinterest-style grid with smooth animations
- 🖼️ **Image Carousel** - Browse multiple recipe images
- 📊 **Nutritional Info** - Complete nutrition facts and allergen warnings
- ⚡ **Fast & Performant** - Optimized with Next.js App Router and SSR

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x or higher
- npm 10.x or higher

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd recipe-web
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
recipe-web/
├── app/                      # Next.js App Router
│   └── [locale]/            # Locale-based routing
│       ├── page.tsx         # Home page with search
│       ├── recipes/         # Recipe pages
│       │   ├── page.tsx    # Browse recipes
│       │   └── [id]/page.tsx # Recipe detail
│       └── favorites/page.tsx # Favorites page
│
├── components/              # React components
│   ├── common/             # Atomic components (Button, Badge, etc.)
│   ├── recipe/             # Recipe-specific components
│   ├── search/             # Search components
│   ├── filters/            # Filter components
│   ├── favorites/          # Favorites components
│   └── layout/             # Layout components (Header, Footer, LanguageSwitcher)
│
├── lib/                     # Utilities and hooks
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── data/               # Data access layer
│   └── i18n/               # Internationalization config
│
├── messages/                # UI translations (en, es, pt, it)
├── types/                   # TypeScript type definitions
├── data/                    # JSON data files
│   ├── recipes/            # Recipe data by language
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── pt.json
│   │   └── it.json
│   └── categories/         # Category definitions by language
│       ├── en.json
│       ├── es.json
│       ├── pt.json
│       └── it.json
│
├── middleware.ts            # Locale detection & routing
└── public/                  # Static assets
    └── images/recipes/     # Recipe images
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **UI Library:** React 19.2.3
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Internationalization:** next-intl v4.8.3
- **Search:** Fuse.js (fuzzy search)
- **Animations:** Framer Motion
- **State:** React Hooks + localStorage

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎨 Design System

**Color Palette:**
- Primary: Brown (#8b6f47) - Warm, food-related tone
- Accent: Green (#2d9d5e) - Fresh, natural accent
- Supports light and dark modes

**Typography:**
- Primary: Geist Sans
- Monospace: Geist Mono

## 🌍 Multi-Language Support

The website supports **4 languages** with complete translations:
- 🇬🇧 English (en) - Default
- 🇪🇸 Spanish (es)
- 🇵🇹 Portuguese (pt)
- 🇮🇹 Italian (it)

**Features:**
- SEO-friendly URLs (`/en/recipes`, `/es/recipes`)
- Language switcher in header
- All UI elements translated
- Recipe content translated (titles, descriptions, ingredients, instructions)
- Filters work across all languages
- Measurement units translated (tsp, tbsp, etc.)

## 🗂️ Adding New Recipes

1. **Add recipe data** to all language files (`data/recipes/*.json`):

```json
{
  "id": "recipe-id",
  "title": "Recipe Name",
  "description": "Recipe description",
  "images": ["/images/recipes/image.jpg"],
  "prepTime": 15,
  "cookTime": 30,
  "totalTime": 45,
  "servings": 4,
  "difficulty": "medium",
  "ingredients": [...],
  "instructions": [...],
  "categories": {
    "cuisineType": ["italian"],
    "mealType": ["dinner"],
    "dietaryRestrictions": [],
    "cookingTime": "medium"
  },
  "nutrition": {
    "calories": 450,
    "protein": 25,
    "carbs": 50,
    "fat": 15,
    "allergens": ["wheat", "dairy"]
  },
  "createdAt": "2026-03-11T00:00:00Z",
  "updatedAt": "2026-03-11T00:00:00Z"
}
```

2. **Add recipe images** to `public/images/recipes/`

3. **Restart dev server** to see changes

## 🧩 Key Components

### Custom Hooks
- `useFavorites` - Manage favorite recipes
- `useSearch` - Real-time search with debouncing
- `useFilters` - Multi-dimensional filtering
- `useLocalStorage` - localStorage with SSR support
- `useRecentRecipes` - Track recently viewed recipes

### Atomic Components
- `Button` - Reusable button with variants
- `Badge` - Category and tag badges
- `Card` - Container component
- `Spinner` - Loading indicator
- `EmptyState` - Empty state messaging

### Recipe Components
- `RecipeCard` - Recipe card with hover effects
- `RecipeMasonry` - Masonry grid layout
- `RecipeCarousel` - Image carousel
- `SearchBar` - Search input with autocomplete
- `FilterBar` - Comprehensive filter UI

## 🌐 Pages

| Route | Description | Rendering |
|-------|-------------|-----------|
| `/[locale]` | Home with search | CSR |
| `/[locale]/recipes` | Browse all recipes | SSR |
| `/[locale]/recipes/[id]` | Recipe detail | SSR |
| `/[locale]/favorites` | Saved recipes | CSR |

**Supported Locales:** en (English), es (Spanish), pt (Portuguese), it (Italian)

## 📊 Data Structure

See `types/recipe.ts` for complete TypeScript definitions.

**Key Interfaces:**
- `Recipe` - Full recipe data
- `Ingredient` - Recipe ingredient
- `Instruction` - Cooking step
- `Categories` - Category definitions

## 🔒 Local Storage

The app uses localStorage for:
- Favorite recipes (`recipe-favorites`)
- Recently viewed recipes (`recipe-recent`)
- Theme preference (`theme`)

## 🚢 Deployment

### Deploy to Vercel

```bash
npm run build
# Deploy to Vercel (recommended)
vercel deploy
```

### Environment Variables

No environment variables required - all data is in JSON files.

## 📄 Documentation

- **CLAUDE.md** - Development guidance for AI assistants
- **REQUIREMENTS.md** - Complete requirements Q&A
- **CHANGELOG.md** - Project change history
- **PLAN.md** - Implementation plan (in `.claude/plans/`)

## 🤝 Contributing

1. Follow the coding style defined in ESLint config
2. Maintain componentization as top priority
3. Update CHANGELOG.md for all changes
4. Test all features before committing
5. Follow the guidelines in CLAUDE.md

## 📝 License

Private project - All rights reserved

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Powered by [Claude Code](https://claude.ai/code)
