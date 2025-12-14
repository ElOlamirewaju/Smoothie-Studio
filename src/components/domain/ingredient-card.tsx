"use client";

import { Ingredient } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";

interface IngredientCardProps {
  ingredient: Ingredient;
  onAdd?: (ingredient: Ingredient) => void;
  onOpen?: (ingredient: Ingredient) => void;
}

export function IngredientCard({
  ingredient,
  onAdd,
  onOpen,
}: IngredientCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="group glass-surface flex cursor-pointer flex-col gap-4 rounded-3xl border border-white/40 p-5"
      onClick={() => onOpen?.(ingredient)}
    >
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
          {ingredient.origin}
        </div>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/80 text-slate-800 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            onAdd?.(ingredient);
          }}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/60 shadow-inner">
          <Image
            src={ingredient.imageUrl}
            alt={ingredient.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-900">
            {ingredient.name}
          </div>
          <div className="text-sm text-slate-500 capitalize">
            {ingredient.category}
          </div>
          <div className="mt-2 text-xs font-medium text-slate-600">
            Fiber {ingredient.nutrition.fiber.toFixed(1)}g / 100g
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {ingredient.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-inner"
          >
            {tag.replace("_", " ")}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
