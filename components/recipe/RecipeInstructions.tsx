import type { Instruction } from '@/types/recipe';
import { formatTime } from '@/lib/utils/format';

export interface RecipeInstructionsProps {
  instructions: Instruction[];
}

export function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Instructions
      </h2>

      <ol className="space-y-4">
        {instructions.map((instruction) => (
          <li key={instruction.step} className="flex gap-4">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
              {instruction.step}
            </span>
            <div className="flex-1 pt-1">
              <p className="text-gray-700 dark:text-gray-300">{instruction.text}</p>
              {instruction.timer && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  ⏱️ {formatTime(instruction.timer)}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
