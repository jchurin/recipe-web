'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { getRecipeUrl, copyToClipboard } from '@/lib/utils/format';

export interface RecipeShareProps {
  recipeId: string;
  recipeTitle: string;
}

export function RecipeShare({ recipeId }: RecipeShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = getRecipeUrl(recipeId);
    await copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button onClick={handleCopyLink} variant={copied ? 'accent' : 'outline'} size="sm">
      {copied ? (
        <>
          <Check className="mr-1.5 h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="mr-1.5 h-4 w-4" />
          Share
        </>
      )}
    </Button>
  );
}
