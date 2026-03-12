import { getAllRecipes } from '@/lib/data/recipes';
import { getAllCategories } from '@/lib/data/categories';
import { RecipesBrowser } from '@/components/recipe/RecipesBrowser';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.recipes' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function RecipesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeString } = await params;
  const locale = localeString as Locale;
  const recipes = await getAllRecipes(locale);
  const categories = await getAllCategories(locale);
  const t = await getTranslations('recipesPage');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100">
        {t('title')}
      </h1>

      <RecipesBrowser recipes={recipes} categories={categories} />
    </div>
  );
}
