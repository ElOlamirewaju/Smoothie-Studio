"use client";

import { SmoothieRecipe } from "@/types";
import Image from "next/image";
import { SoftButton } from "../ui/soft-button";
import { RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";

interface SuggestionCardProps {
  recipe: SmoothieRecipe;
  onAdd?: (recipe: SmoothieRecipe) => void;
  onSwap?: (id: string) => void;
}

export function SuggestionCard({ recipe, onAdd, onSwap }: SuggestionCardProps) {
  return (
    <div className="glass-surface flex flex-col gap-4 rounded-3xl border border-white/50 p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
            {recipe.target}
          </div>
          <div className="text-xl font-semibold text-slate-900">
            {recipe.title}
          </div>
        </div>
        <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          AI-picked
        </div>
      </div>
      <p className="text-sm text-slate-600">{recipe.reason}</p>
      <div className="grid grid-cols-2 gap-3">
        {recipe.ingredients.map((item) => (
          <div
            key={item.ingredient.id}
            className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-inner"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/70">
              <Image
                src={item.ingredient.imageUrl}
                alt={item.ingredient.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {item.ingredient.name}
              <span className="block text-xs font-normal text-slate-500">
                {Math.round(item.grams)} g
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <SoftButton
          variant="outline"
          className="flex-1 justify-center"
          onClick={() => onAdd?.(recipe)}
        >
          Add to Builder
        </SoftButton>
        <SoftButton
          variant="ghost"
          className="justify-center"
          onClick={() => onSwap?.(recipe.id)}
          icon={<RefreshCw className="h-4 w-4" />}
        >
          Swap ingredient
        </SoftButton>
        <SoftButton variant="ghost" icon={<ThumbsUp className="h-4 w-4" />}>
          Like
        </SoftButton>
        <SoftButton variant="ghost" icon={<ThumbsDown className="h-4 w-4" />}>
          Nah
        </SoftButton>
      </div>
    </div>
  );
}
