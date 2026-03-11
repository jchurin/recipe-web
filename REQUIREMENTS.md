# Requirements Q&A

This document tracks all requirements gathering questions and answers for the recipe website project.

---

## Initial Context (2026-03-10)

**User Statement**:
- Build a recipe website
- Frontend only (no database)
- JSON files in `/data` folder as source of truth
- Can use Next.js API routes if needed
- Can be SSR or CSR
- Clean UI with smooth transitions
- Prioritize componentization and clean/pretty UI

---

## Requirements Questions & Answers

### Session 1 - Initial Requirements Gathering

#### **1. Core Features & User Capabilities**

**Q: What should users be able to do on this website?**

**A:** Users should be able to:
- Browse and view recipes
- Search for recipes
- Filter by categories/tags (cuisine type, dietary restrictions, cooking time, etc.)
- Save recipes to favorites (stored in localStorage)
- Share recipes
- ~~Print recipes~~ (No)

---

#### **2. Recipe Data Structure**

**Q: What information should each recipe contain?**

**A:** Each recipe should include:
- Title, description, and image
- Ingredients with quantities
- Step-by-step instructions
- Cooking time, prep time, and servings
- Difficulty level
- Categories/tags (cuisine type, meal type, dietary restrictions, cooking time categories)
- Nutritional information
- ~~Author/source~~ (No - all recipes come from the app's JSON database)

---

#### **3. Pages & Navigation**

**Q: What pages/routes should the website have?**

**A:** The website should have:
- **Home page**: Large, prominent search component as the main element. The search should be highly flexible, allowing users to search by name, description, ingredients, etc., potentially using fuzzy search. Below the search, display recent recipes or the user's latest visited recipes (from localStorage).
- **Recipe list/browse page**: Grid/masonry layout with comprehensive filters (ingredients, categories, cuisine type, meal type, dietary restrictions, cooking time, etc.)
- **Individual recipe detail page**: Full recipe information display
- **Category/tag pages**: Pages for browsing recipes by specific categories
- ~~Search results page~~ (Not necessary - search can be integrated into browse page)
- ~~About page~~ (No)

---

#### **4. UI/UX Preferences**

**Q: What are the color scheme and design preferences?**

**A:**
- **Color scheme**: Brown as primary color with green accents (food-related colors). Open to suggestions for other warm, food-related colors if better options exist.
- **Light/dark mode**: Yes, include toggle
- **Layout**: Masonry/Pinterest-style grid for recipe cards
- **Animations**:
  - Smooth page transitions: Yes
  - Hover effects: Yes
  - Loading states: Yes (required)

---

#### **5. Recipe Organization**

**Q: How should recipes be organized/categorized?**

**A:** Recipes should support multiple filtering and categorization dimensions (similar to Pedidos Ya), including:
- Cuisine type (Italian, Mexican, Asian, etc.)
- Meal type (Breakfast, Lunch, Dinner, Dessert, etc.)
- Dietary restrictions (Vegetarian, Vegan, Gluten-free, etc.)
- Cooking time categories (Quick meals, etc.)

Each recipe can have multiple categories across all these dimensions to enable flexible filtering and browsing.

---

#### **6. Initial Content**

**Q: Should sample data be created? How many recipes?**

**A:**
- AI should create sample recipe data to start
- Start with **10 recipes**
- Ensure the recipe structure includes all fields needed for filtering and categorization (cuisine type, meal type, dietary restrictions, cooking time, etc.)

---

### **Key Design Priorities** (from initial brief):
1. High componentization (top priority)
2. Clean, modern UI
3. Smooth transitions and interactions
4. Flexible, powerful search (potentially fuzzy search)
5. Comprehensive filtering system

---

### Session 2 - Detailed Feature Clarifications

#### **7. Search Functionality Details**

**Q: How should the home page search work?**

**A:**
- **Autocomplete/suggestions**: Yes, as user types
- **Real-time results**: Yes, display matching recipes below the search bar immediately
- **Results count**: Show the number of matching results while filtering
- **No redirection**: Search should NOT redirect to another page
- **Initial state**: When input is empty, no recipe cards are shown
- **Search fields**: Search should match across title, description, ingredients, food type, categories, etc.
- **Behavior**: As soon as user starts typing, the search should find and display matching recipes

---

#### **8. Recipe Sharing**

**Q: How should recipe sharing work?**

**A:**
- **Copy link to clipboard**: Yes, must have this option
- **WhatsApp share**: Yes, primary social sharing method
- **Other social media** (Facebook, Twitter): Good to have, but lower priority
- **Unique URLs**: Yes, each recipe must have a unique ID and unique detail page URL

---

#### **9. Favorites Feature**

**Q: How should favorites be displayed?**

**A:**
- **Dedicated favorites page**: Yes, must have a dedicated route (`/favorites`)
- **Display**: Show list of all favorited recipes
- **Storage**: localStorage

---

#### **10. Recipe Detail Page Layout**

**Q: What layout should the recipe detail page have?**

**A:**
- **Image carousel**: At the top (not too large, decorative purpose)
  - Click to open full-screen image viewer
- **Two-column layout** (desktop):
  - **Left column**: Ingredients (always visible, fixed)
  - **Right column**: Instructions (scrollable independently)
- **Mobile**: Same layout adapted responsively (stacked if necessary)

---

#### **11. Nutritional Information Fields**

**Q: What nutritional fields should be included?**

**A:**
- Calories
- Protein
- Carbs (Carbohydrates)
- Fat
- **Allergen information**: Yes
- **Specific ingredients warning**: For example, indicate if recipe contains wheat (important for people with celiac disease)

---

#### **12. Categories System**

**Q: How should categories be structured?**

**A:**
- **Predefined lists only**: Fixed lists managed by developers in the repository
- **No free-form tags**: All categories are controlled/fixed
- **Types of categories**: Cuisine type, meal type, dietary restrictions, cooking time, etc.

---

#### **13. Recipe Card Display (Masonry Layout)**

**Q: How should recipe cards be displayed?**

**A:**
- **Card sizing**: Dynamic sizing based on image aspect ratio
- **Information displayed on cards**:
  - Image
  - Title
  - Cooking time
  - Difficulty level

---

