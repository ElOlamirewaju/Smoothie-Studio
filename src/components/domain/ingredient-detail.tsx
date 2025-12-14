"use client";

import { Ingredient } from "@/types";
import Image from "next/image";
import { SoftButton } from "../ui/soft-button";
import { motion } from "framer-motion";

interface IngredientDetailProps {
  ingredient: Ingredient | null;
  onClose: () => void;
  onAdd: (ingredient: Ingredient) => void;
}

export function IngredientDetail({
  ingredient,
  onClose,
  onAdd,
}: IngredientDetailProps) {
  if (!ingredient) return null;
  const facts = ingredient.nutrition;

  return (
    <motion.div
      layout
      className="glass-surface fixed inset-y-4 right-4 z-40 hidden w-96 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-2xl lg:block"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
            {ingredient.origin}
          </div>
          <div className="text-2xl font-semibold text-slate-900">
            {ingredient.name}
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-500 transition hover:text-slate-800"
        >
          Close
        </button>
      </div>
      <div className="relative mt-5 h-44 w-full overflow-hidden rounded-2xl border border-white/70">
        <Image
          src={ingredient.imageUrl}
          alt={ingredient.name}
          fill
          sizes="320px"
          className="object-cover"
        />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-700">
        <Fact label="Calories" value={`${facts.kcal} kcal`} />
        <Fact label="Protein" value={`${facts.protein} g`} />
        <Fact label="Carbs" value={`${facts.carbs} g`} />
        <Fact label="Fat" value={`${facts.fat} g`} />
        <Fact label="Fiber" value={`${facts.fiber} g`} />
        <Fact label="Sugar" value={`${facts.sugar} g`} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {ingredient.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
          >
            {tag.replace("_", " ")}
          </span>
        ))}
      </div>
      <SoftButton
        className="mt-6 w-full justify-center"
        onClick={() => onAdd(ingredient)}
      >
        Add to Smoothie
      </SoftButton>
    </motion.div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/70 px-3 py-2 shadow-inner">
      <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
        {label}
      </div>
      <div className="text-base font-semibold text-slate-900">{value}</div>
    </div>
  );
}
