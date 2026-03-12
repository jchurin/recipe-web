# Translation System Implementation Plan

## Overview

Implement internationalization (i18n) for the recipe website supporting **4 languages**:
- 🇬🇧 English (en) - Default
- 🇪🇸 Spanish (es)
- 🇵🇹 Portuguese (pt)
- 🇮🇹 Italian (it)

## Requirements

✅ Translate all UI text (buttons, labels, navigation, etc.)
✅ Translate recipe content (titles, descriptions, ingredients, instructions)
✅ Translate category and filter labels
✅ Filters continue working across languages
✅ Language selector button (next to theme switcher)
✅ Switch language at any time
✅ Shareable URLs include language
✅ SEO-friendly with proper locale URLs

## Technology Stack

**Primary Library**: `next-intl` (v3.x)
- Official recommendation for Next.js App Router
- Server-side rendering support
- Type-safe translations
- Easy integration with App Router's `[locale]` segments

## URL Structure

**Path-based routing** (SEO-friendly):
```
/en/recipes          → English recipes
/es/recipes          → Spanish recipes
/pt/recipes          → Portuguese recipes
/it/recipes          → Italian recipes

/en/recipes/1        → English recipe detail
/es/recipes/1        → Spanish recipe detail
```

**Benefits**:
- Each language gets unique URLs (good for SEO)
- Shareable links preserve language
- Browser back/forward works correctly
- Standard i18n approach

## Architecture

### Folder Structure
```
recipe-web/
├── app/
│   ├── [locale]/                    # Dynamic locale segment
│   │   ├── layout.tsx               # Root layout with locale
│   │   ├── page.tsx                 # Home page
│   │   ├── recipes/
│   │   │   ├── page.tsx             # Browse page
│   │   │   └── [id]/page.tsx        # Recipe detail
│   │   ├── favorites/page.tsx
│   │   └── category/[type]/page.tsx
│   └── layout.tsx                   # Outermost layout (optional)
│
├── messages/                        # UI translations
│   ├── en.json                      # English UI text
│   ├── es.json                      # Spanish UI text
│   ├── pt.json                      # Portuguese UI text
│   └── it.json                      # Italian UI text
│
├── data/
│   ├── recipes/
│   │   ├── en.json                  # English recipes
│   │   ├── es.json                  # Spanish recipes
│   │   ├── pt.json                  # Portuguese recipes
│   │   └── it.json                  # Italian recipes
│   ├── categories/
│   │   ├── en.json                  # English categories
│   │   ├── es.json                  # Spanish categories
│   │   ├── pt.json                  # Portuguese categories
│   │   └── it.json                  # Italian categories
│
├── lib/
│   ├── i18n/
│   │   ├── config.ts                # i18n configuration
│   │   ├── request.ts               # Server-side i18n
│   │   └── routing.ts               # Routing configuration
│   └── data/
│       ├── recipes.ts               # Updated to load by locale
│       └── categories.ts            # Updated to load by locale
│
├── components/
│   ├── layout/
│   │   ├── LanguageSwitcher.tsx     # NEW: Language selector
│   │   └── Header.tsx               # Updated with switcher
│   └── [all components updated to use translations]
│
├── middleware.ts                    # NEW: Locale detection & routing
└── next.config.js                   # Updated with i18n config
```

## Filter Compatibility Strategy

**Key Principle**: Filter IDs remain language-agnostic

### How It Works:

1. **Filter IDs** (used in URLs): Language-agnostic
   - ✅ `cuisine=italian,mexican`
   - ✅ `meal=dinner`
   - ✅ `dietary=vegetarian`

2. **Filter Labels** (displayed to user): Translated
   - English: "Italian", "Mexican"
   - Spanish: "Italiana", "Mexicana"
   - Portuguese: "Italiana", "Mexicana"
   - Italian: "Italiana", "Messicana"

3. **Category Data**: IDs stay the same, labels translated
   ```json
   // categories/en.json
   {
     "cuisineTypes": [
       { "id": "italian", "label": "Italian" }
     ]
   }

   // categories/es.json
   {
     "cuisineTypes": [
       { "id": "italian", "label": "Italiana" }
     ]
   }
   ```

4. **Recipe Matching**: Uses IDs, not labels
   ```typescript
   // Recipe data structure (same IDs across languages)
   {
     "id": "1",
     "categories": {
       "cuisineType": ["italian"],  // Same ID in all languages
       "mealType": ["dinner"]
     }
   }
   ```

### Example: User shares filtered URL

1. User filters by "Italiana" (Spanish) → URL: `/es/recipes?cuisine=italian`
2. Shares URL with English friend
3. Friend changes language to English → URL: `/en/recipes?cuisine=italian`
4. Filters still work! Shows "Italian" label but same recipes

## Implementation Phases

### Phase 1: Setup & Configuration (2-3 hours)

**Tasks**:
1. Install dependencies
   ```bash
   npm install next-intl
   ```

2. Create i18n configuration files:
   - `lib/i18n/config.ts` - Supported locales, default locale
   - `lib/i18n/request.ts` - Server-side translation function
   - `lib/i18n/routing.ts` - Routing configuration

3. Create `middleware.ts` for locale detection:
   - Detect locale from URL
   - Redirect root to default locale
   - Handle locale prefix for all routes

4. Update `next.config.js` if needed

5. Restructure app directory:
   - Move all routes under `app/[locale]/`
   - Update layout files

**Deliverables**:
- ✅ next-intl installed and configured
- ✅ `[locale]` route segment working
- ✅ Middleware redirecting correctly
- ✅ Basic locale detection working

---

### Phase 2: UI Translations (3-4 hours)

**Tasks**:
1. Create message files:
   - `messages/en.json` (baseline)
   - `messages/es.json`
   - `messages/pt.json`
   - `messages/it.json`

2. Define translation keys structure:
   ```json
   {
     "nav": {
       "home": "Home",
       "recipes": "Recipes",
       "favorites": "Favorites"
     },
     "common": {
       "search": "Search",
       "filter": "Filter",
       "share": "Share",
       "copyLink": "Copy Link",
       "whatsapp": "WhatsApp"
     },
     "filters": {
       "title": "Filters",
       "clearAll": "Clear all",
       "cuisineType": "Cuisine Type",
       "mealType": "Meal Type",
       "dietary": "Dietary Restrictions",
       "cookingTime": "Cooking Time",
       "difficulty": "Difficulty Level"
     },
     "recipe": {
       "ingredients": "Ingredients",
       "instructions": "Instructions",
       "nutrition": "Nutrition",
       "servings": "servings",
       "prepTime": "Prep Time",
       "cookTime": "Cook Time",
       "totalTime": "Total Time"
     }
   }
   ```

3. Translate all UI text to 4 languages:
   - English (baseline)
   - Spanish translations
   - Portuguese translations
   - Italian translations

4. Update components to use `useTranslations()` hook:
   - Header.tsx
   - Navigation.tsx
   - Footer.tsx
   - FilterBar.tsx
   - RecipeCard.tsx
   - RecipeShare.tsx
   - SearchBar.tsx
   - Button.tsx (if text props)
   - All page components

**Example component update**:
```typescript
// Before
<h1>Browse Recipes</h1>

// After
import { useTranslations } from 'next-intl';

function Component() {
  const t = useTranslations('recipe');
  return <h1>{t('browseTitle')}</h1>;
}
```

**Deliverables**:
- ✅ All UI text translated to 4 languages
- ✅ Components using translation hooks
- ✅ No hardcoded strings remaining

---

### Phase 3: Recipe Data Translation (4-5 hours)

**Tasks**:
1. Create recipe data structure for each language:
   - `data/recipes/en.json` (baseline - copy from current recipes.json)
   - `data/recipes/es.json`
   - `data/recipes/pt.json`
   - `data/recipes/it.json`

2. Translate all 10 recipes to all 4 languages:
   - **Title**: Recipe name
   - **Description**: Recipe summary
   - **Ingredients**: Each ingredient name and unit
   - **Instructions**: Step-by-step text
   - **Keep IDs the same** across all languages

3. **Important**: Keep these fields **unchanged** across languages:
   - `id` (e.g., "1", "2", "3")
   - `images` (image URLs)
   - `prepTime`, `cookTime`, `totalTime` (numbers)
   - `servings` (number)
   - `difficulty` (id: "easy", "medium", "hard")
   - `categories.cuisineType` (ids: ["italian"])
   - `categories.mealType` (ids: ["dinner"])
   - `categories.dietaryRestrictions` (ids: ["vegetarian"])
   - `categories.cookingTime` (id: "quick")
   - `nutrition` (numbers)

**Example Recipe Structure**:
```json
// data/recipes/en.json
{
  "id": "1",
  "title": "Classic Margherita Pizza",
  "description": "A simple yet delicious Italian pizza...",
  "ingredients": [
    {
      "name": "Pizza dough",
      "amount": 1,
      "unit": "ball"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "text": "Preheat oven to 475°F..."
    }
  ],
  "categories": {
    "cuisineType": ["italian"],
    "mealType": ["dinner"]
  }
}

// data/recipes/es.json
{
  "id": "1",
  "title": "Pizza Margarita Clásica",
  "description": "Una pizza italiana simple pero deliciosa...",
  "ingredients": [
    {
      "name": "Masa de pizza",
      "amount": 1,
      "unit": "bola"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "text": "Precalentar el horno a 245°C..."
    }
  ],
  "categories": {
    "cuisineType": ["italian"],  // Same ID!
    "mealType": ["dinner"]       // Same ID!
  }
}
```

4. Update data access layer:
   ```typescript
   // lib/data/recipes.ts
   export async function getAllRecipes(locale: string): Promise<Recipe[]> {
     const data = await import(`@/data/recipes/${locale}.json`);
     return data.default;
   }
   ```

**Deliverables**:
- ✅ 10 recipes × 4 languages = 40 recipe translations
- ✅ Data loader updated to accept locale parameter
- ✅ Recipe IDs and category IDs consistent across languages

---

### Phase 4: Category & Filter Translations (2 hours)

**Tasks**:
1. Create category files for each language:
   - `data/categories/en.json`
   - `data/categories/es.json`
   - `data/categories/pt.json`
   - `data/categories/it.json`

2. Translate category labels:
   - Cuisine types (Italian → Italiana, etc.)
   - Meal types (Breakfast → Desayuno, etc.)
   - Dietary restrictions (Vegetarian → Vegetariano, etc.)
   - Cooking times (Quick → Rápido, etc.)
   - Difficulty levels (Easy → Fácil, etc.)

3. **Keep IDs the same** across all languages:
   ```json
   // categories/en.json
   { "id": "italian", "label": "Italian" }

   // categories/es.json
   { "id": "italian", "label": "Italiana" }
   ```

4. Update category data loader:
   ```typescript
   export async function getAllCategories(locale: string): Promise<Categories> {
     const data = await import(`@/data/categories/${locale}.json`);
     return data.default;
   }
   ```

5. Update page components to pass locale to data loaders:
   ```typescript
   export default async function RecipesPage({ params }: { params: { locale: string } }) {
     const recipes = await getAllRecipes(params.locale);
     const categories = await getAllCategories(params.locale);
     // ...
   }
   ```

**Deliverables**:
- ✅ Category labels translated to 4 languages
- ✅ Filter labels display in correct language
- ✅ Filters still work with language-agnostic IDs

---

### Phase 5: Language Switcher Component (1-2 hours)

**Tasks**:
1. Create `components/layout/LanguageSwitcher.tsx`:
   - Dropdown or button group
   - Shows current language flag/name
   - Lists all 4 languages
   - Switches language on click
   - Preserves current page and filters

2. Design considerations:
   - Position: Next to theme switcher in header
   - Display: Flag emoji + language code (🇬🇧 EN)
   - Interaction: Click to open dropdown or cycle through
   - Transition: Smooth page transition on language change

3. Implementation:
   ```typescript
   'use client';

   import { useLocale } from 'next-intl';
   import { useRouter, usePathname, useSearchParams } from 'next/navigation';

   export function LanguageSwitcher() {
     const locale = useLocale();
     const router = useRouter();
     const pathname = usePathname();
     const searchParams = useSearchParams();

     const switchLanguage = (newLocale: string) => {
       // Remove current locale from pathname
       const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');

       // Build new URL with new locale
       const query = searchParams.toString();
       const newUrl = `/${newLocale}${pathnameWithoutLocale}${query ? `?${query}` : ''}`;

       router.push(newUrl);
     };

     return (
       <div className="flex gap-2">
         {languages.map((lang) => (
           <button
             key={lang.code}
             onClick={() => switchLanguage(lang.code)}
             className={locale === lang.code ? 'active' : ''}
           >
             {lang.flag} {lang.code.toUpperCase()}
           </button>
         ))}
       </div>
     );
   }
   ```

4. Add to Header component:
   ```typescript
   <div className="flex items-center gap-4">
     <LanguageSwitcher />
     <ThemeToggle />
   </div>
   ```

5. Store language preference (optional):
   - Save to localStorage
   - Save to cookie (for server-side detection)

**Deliverables**:
- ✅ Language switcher component working
- ✅ Positioned next to theme switcher
- ✅ Preserves current page and filters when switching
- ✅ Shows current language clearly

---

### Phase 6: Update Navigation & Links (1-2 hours)

**Tasks**:
1. Create locale-aware Link wrapper:
   ```typescript
   // components/common/LocaleLink.tsx
   import { useLocale } from 'next-intl';
   import Link from 'next/link';

   export function LocaleLink({ href, ...props }) {
     const locale = useLocale();
     const localizedHref = `/${locale}${href}`;
     return <Link href={localizedHref} {...props} />;
   }
   ```

2. Update all components using `<Link>`:
   - Replace `import Link from 'next/link'`
   - With `import { LocaleLink as Link } from '@/components/common/LocaleLink'`
   - Or manually prepend locale to all href props

3. Update navigation links:
   - Header navigation
   - Footer links
   - Recipe cards
   - Breadcrumbs (if any)

4. Update programmatic navigation:
   ```typescript
   // Before
   router.push('/recipes');

   // After
   router.push(`/${locale}/recipes`);
   ```

**Deliverables**:
- ✅ All internal links include locale prefix
- ✅ Navigation works correctly across languages
- ✅ No broken links

---

### Phase 7: Metadata & SEO (1 hour)

**Tasks**:
1. Update page metadata with translations:
   ```typescript
   // app/[locale]/recipes/page.tsx
   import { getTranslations } from 'next-intl/server';

   export async function generateMetadata({ params }: { params: { locale: string } }) {
     const t = await getTranslations({ locale: params.locale, namespace: 'metadata' });

     return {
       title: t('recipes.title'),
       description: t('recipes.description'),
     };
   }
   ```

2. Add `hreflang` tags for SEO:
   ```typescript
   // app/[locale]/layout.tsx
   export async function generateMetadata({ params }: { params: { locale: string } }) {
     return {
       alternates: {
         canonical: `/${params.locale}`,
         languages: {
           'en': '/en',
           'es': '/es',
           'pt': '/pt',
           'it': '/it',
         },
       },
     };
   }
   ```

3. Update sitemap to include all locales

4. Add language meta tags:
   ```html
   <html lang={locale}>
   ```

**Deliverables**:
- ✅ Page titles translated
- ✅ Meta descriptions translated
- ✅ Proper lang attributes
- ✅ hreflang tags for SEO

---

### Phase 8: Testing & Polish (2-3 hours)

**Tasks**:
1. **Functional Testing**:
   - [ ] All 4 languages load correctly
   - [ ] Language switcher works on all pages
   - [ ] Filters work in all languages
   - [ ] Search works in all languages
   - [ ] Recipe detail pages show translated content
   - [ ] Favorites persist across language changes
   - [ ] Share links work with locale

2. **URL Testing**:
   - [ ] `/en/recipes?cuisine=italian` works
   - [ ] `/es/recipes?cuisine=italian` shows Spanish labels
   - [ ] Sharing filtered URL preserves filters
   - [ ] Direct navigation to localized URLs works

3. **Edge Cases**:
   - [ ] Invalid locale redirects to default (en)
   - [ ] Missing translations fall back to English
   - [ ] Switching language on recipe detail goes to same recipe
   - [ ] Browser back/forward works correctly

4. **Performance**:
   - [ ] No performance degradation
   - [ ] Translations load quickly
   - [ ] No layout shifts when switching languages

5. **Accessibility**:
   - [ ] Screen readers announce language changes
   - [ ] Keyboard navigation works
   - [ ] Focus management on language switch

**Deliverables**:
- ✅ All tests passing
- ✅ No bugs found
- ✅ Performance is good
- ✅ Accessibility maintained

---

## Translation Responsibilities

### Spanish (ES) Translations
- ~100 UI strings
- 10 recipes (titles, descriptions, ingredients, instructions)
- ~50 category/filter labels
- Metadata translations

### Portuguese (PT) Translations
- Same scope as Spanish

### Italian (IT) Translations
- Same scope as Spanish

**Recommendation**: Consider using a translation service or tool like:
- **DeepL API** - High-quality translations
- **Google Translate API** - Good baseline
- **Professional translator** - Best quality
- **ChatGPT/Claude** - Quick drafts, needs review

---

## Configuration Files Reference

### 1. `lib/i18n/config.ts`
```typescript
export const locales = ['en', 'es', 'pt', 'it'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  es: { name: 'Español', flag: '🇪🇸' },
  pt: { name: 'Português', flag: '🇵🇹' },
  it: { name: 'Italiano', flag: '🇮🇹' },
};
```

### 2. `lib/i18n/request.ts`
```typescript
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../../messages/${locale}.json`)).default,
}));
```

### 3. `middleware.ts`
```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

---

## Estimated Timeline

| Phase | Time | Complexity |
|-------|------|------------|
| 1. Setup & Configuration | 2-3 hours | Medium |
| 2. UI Translations | 3-4 hours | Medium |
| 3. Recipe Data Translation | 4-5 hours | High |
| 4. Category & Filter Translations | 2 hours | Low |
| 5. Language Switcher | 1-2 hours | Low |
| 6. Update Navigation & Links | 1-2 hours | Low |
| 7. Metadata & SEO | 1 hour | Low |
| 8. Testing & Polish | 2-3 hours | Medium |
| **Total** | **16-22 hours** | **Medium-High** |

---

## Benefits After Implementation

✅ **SEO**: Each language gets unique URLs for better search ranking
✅ **User Experience**: Native language support increases engagement
✅ **Shareability**: URLs with language context are more useful
✅ **Accessibility**: More users can access content
✅ **Professional**: Shows attention to international audience
✅ **Filters**: Continue working seamlessly across languages
✅ **Maintainability**: Clear separation of translations from logic

---

## Potential Challenges

⚠️ **Translation Quality**: Automated translations may need review
⚠️ **Recipe Content**: 40 recipe translations is significant work
⚠️ **Text Length**: Translations may be longer/shorter affecting layout
⚠️ **Maintenance**: Future content needs 4× translation work
⚠️ **Testing**: Need to test in all languages thoroughly

---

## Future Enhancements

🔮 **Phase 2 Features** (post-MVP):
- User preference detection from browser `Accept-Language` header
- Remember language preference across sessions
- More languages (French, German, Japanese, etc.)
- Translation management UI for admins
- Automated translation with manual review workflow
- Language-specific recipe recommendations
- Regional units (cups vs ml, F vs C)

---

## Ready to Start?

This plan provides a complete roadmap for adding multi-language support. I can start implementing this immediately, or we can:

1. **Review & Adjust**: Discuss any changes to the approach
2. **Prioritize**: Start with specific languages or features first
3. **Prototype**: Build a quick proof-of-concept with 1-2 languages
4. **Delegate**: You handle translations, I handle technical implementation

What would you like to do next?
