'use client';

import { useState } from 'react';
import { Share2, Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { getRecipeUrl, copyToClipboard } from '@/lib/utils/format';

export interface RecipeShareProps {
  recipeId: string;
  recipeTitle: string;
}

export function RecipeShare({ recipeId, recipeTitle }: RecipeShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = getRecipeUrl(recipeId);
    await copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const url = getRecipeUrl(recipeId);
    const text = `Check out this recipe: ${recipeTitle}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleCopyLink} variant={copied ? 'accent' : 'outline'} size="sm">
        {copied ? (
          <>
            <Check className="mr-1.5 h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Share2 className="mr-1.5 h-4 w-4" />
            Copy Link
          </>
        )}
      </Button>
      <Button onClick={handleWhatsAppShare} variant="primary" size="sm">
        <MessageCircle className="mr-1.5 h-4 w-4" />
        WhatsApp
      </Button>
    </div>
  );
}
