# Recipe Data Documentation

This directory contains the JSON data files that serve as the source of truth for the recipe website.

## Files

- **recipes.json** - All recipe data
- **categories.json** - Category definitions (cuisine types, meal types, dietary restrictions, etc.)

## Recipe Schema

Each recipe in `recipes.json` must follow this structure:

```typescript
{
  "id": string,                    // Unique identifier (kebab-case)
  "title": string,                 // Recipe name
  "description": string,           // Brief description
  "images": string[],              // Array of image paths (relative to /public)

  "prepTime": number,              // Preparation time in minutes
  "cookTime": number,              // Cooking time in minutes
  "totalTime": number,             // Total time in minutes
  "servings": number,              // Number of servings
  "difficulty": "easy" | "medium" | "hard",

  "ingredients": Array<{
    "id": string,                  // Unique ID within recipe
    "name": string,                // Ingredient name
    "quantity": number,            // Amount
    "unit": string,                // Unit of measurement
    "notes"?: string               // Optional notes (e.g., "finely chopped")
  }>,

  "instructions": Array<{
    "step": number,                // Step number (1-indexed)
    "text": string,                // Instruction text
    "image"?: string,              // Optional step image
    "timer"?: number               // Optional timer in minutes
  }>,

  "categories": {
    "cuisineType": string[],       // Must match IDs from categories.json
    "mealType": string[],          // Must match IDs from categories.json
    "dietaryRestrictions": string[], // Must match IDs from categories.json
    "cookingTime": "quick" | "medium" | "long"
  },

  "nutrition": {
    "calories": number,            // Total calories
    "protein": number,             // Protein in grams
    "carbs": number,               // Carbohydrates in grams
    "fat": number,                 // Fat in grams
    "allergens": string[]          // Must match IDs from categories.json
  },

  "createdAt": string,             // ISO 8601 date string
  "updatedAt": string              // ISO 8601 date string
}
```

## Adding a New Recipe

1. **Create recipe object** following the schema above
2. **Choose unique ID** (kebab-case, e.g., "chocolate-cake")
3. **Add images** to `/public/images/recipes/`
4. **Select categories** from predefined lists in `categories.json`
5. **Validate allergens** against the allergens list
6. **Add to recipes.json** array
7. **Restart dev server** to see changes

## Category IDs Reference

### Cuisine Types
- `italian`, `mexican`, `asian`, `american`, `thai`, `chinese`, `greek`, `vietnamese`, `mediterranean`, `european`

### Meal Types
- `breakfast`, `lunch`, `dinner`, `dessert`, `snack`

### Dietary Restrictions
- `vegetarian`, `vegan`, `gluten-free`, `dairy-free`, `keto`

### Cooking Time Categories
- `quick` - Under 30 minutes
- `medium` - 30-60 minutes
- `long` - Over 60 minutes

### Allergens
- `dairy`, `wheat`, `nuts`, `soy`, `eggs`, `shellfish`

## Example Recipe

```json
{
  "id": "avocado-toast",
  "title": "Simple Avocado Toast",
  "description": "Quick and healthy breakfast with creamy avocado on crispy toast.",
  "images": ["/images/recipes/avocado-toast-1.jpg"],
  "prepTime": 5,
  "cookTime": 3,
  "totalTime": 8,
  "servings": 2,
  "difficulty": "easy",
  "ingredients": [
    { "id": "1", "name": "bread", "quantity": 2, "unit": "slices", "notes": "whole grain" },
    { "id": "2", "name": "avocado", "quantity": 1, "unit": "large", "notes": "ripe" },
    { "id": "3", "name": "lemon juice", "quantity": 1, "unit": "tsp" },
    { "id": "4", "name": "salt", "quantity": 0.5, "unit": "tsp" },
    { "id": "5", "name": "red pepper flakes", "quantity": 0.25, "unit": "tsp" }
  ],
  "instructions": [
    { "step": 1, "text": "Toast the bread slices until golden brown.", "timer": 3 },
    { "step": 2, "text": "Mash the avocado in a bowl with lemon juice and salt." },
    { "step": 3, "text": "Spread avocado mixture on toast." },
    { "step": 4, "text": "Sprinkle with red pepper flakes and serve immediately." }
  ],
  "categories": {
    "cuisineType": ["american"],
    "mealType": ["breakfast", "snack"],
    "dietaryRestrictions": ["vegetarian", "vegan"],
    "cookingTime": "quick"
  },
  "nutrition": {
    "calories": 280,
    "protein": 8,
    "carbs": 32,
    "fat": 16,
    "allergens": ["wheat"]
  },
  "createdAt": "2026-03-11T00:00:00Z",
  "updatedAt": "2026-03-11T00:00:00Z"
}
```

## Image Guidelines

**Location:** `/public/images/recipes/`

**Naming Convention:**
- `{recipe-id}-{number}.jpg` (e.g., `avocado-toast-1.jpg`)
- Multiple images: `{recipe-id}-1.jpg`, `{recipe-id}-2.jpg`, etc.

**Recommended Specifications:**
- Format: JPG or WebP
- Aspect Ratio: 4:3 or 16:9
- Resolution: At least 1200px wide
- File Size: Under 500KB (optimized)

## Validation

Before adding a recipe, ensure:
- ✅ All required fields are present
- ✅ `totalTime` = `prepTime` + `cookTime`
- ✅ Category IDs match exactly (case-sensitive)
- ✅ Image paths start with `/images/recipes/`
- ✅ Ingredient and instruction IDs are unique within recipe
- ✅ Instructions are numbered sequentially starting from 1
- ✅ Dates are in ISO 8601 format

## Notes

- All category IDs are lowercase, kebab-case
- Recipe IDs must be unique across all recipes
- Images are loaded on-demand (lazy loading)
- Nutritional values are approximate
- Multiple categories per recipe are supported
