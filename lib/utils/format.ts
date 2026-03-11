/**
 * Format minutes into human-readable time string
 * @param minutes - Total minutes
 * @returns Formatted string like "1h 30m" or "45m"
 */
export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Format a number with commas for thousands
 * @param num - Number to format
 * @returns Formatted string like "1,234"
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Capitalize first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format difficulty level for display
 * @param difficulty - Difficulty level
 * @returns Formatted string with icon
 */
export function formatDifficulty(difficulty: string): string {
  const difficultyMap: Record<string, string> = {
    easy: '⭐ Easy',
    medium: '⭐⭐ Medium',
    hard: '⭐⭐⭐ Hard',
  };

  return difficultyMap[difficulty] || difficulty;
}

/**
 * Format nutrition value with unit
 * @param value - Nutrition value
 * @param unit - Unit (g, mg, etc.)
 * @returns Formatted string
 */
export function formatNutrition(value: number, unit: string = 'g'): string {
  return `${value}${unit}`;
}

/**
 * Generate a shareable URL for a recipe
 * @param recipeId - Recipe ID
 * @returns Full URL
 */
export function getRecipeUrl(recipeId: string): string {
  if (typeof window === 'undefined') {
    return `https://recipe-web.vercel.app/recipes/${recipeId}`;
  }
  return `${window.location.origin}/recipes/${recipeId}`;
}

/**
 * Generate WhatsApp share URL
 * @param recipeId - Recipe ID
 * @param recipeTitle - Recipe title
 * @returns WhatsApp share URL
 */
export function getWhatsAppShareUrl(recipeId: string, recipeTitle: string): string {
  const url = getRecipeUrl(recipeId);
  const text = `Check out this recipe: ${recipeTitle}`;
  return `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copied
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } finally {
      textArea.remove();
    }
  }
}
