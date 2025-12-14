"use client";

import { BuilderItem } from "@/types";
import { formatKcal, formatNumber } from "@/lib/utils";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { SoftButton } from "../ui/soft-button";
import { motion } from "framer-motion";

interface BuilderCupProps {
  items: BuilderItem[];
  onUpdate: (id: string, grams: number) => void;
  onRemove: (id: string) => void;
  onSaveFavorite: () => void;
  onLog: () => void;
}

export function BuilderCup({
  items,
  onUpdate,
  onRemove,
  onSaveFavorite,
  onLog,
}: BuilderCupProps) {
  const totals = calculateTotals(items);

  return (
    <div className="glass-surface flex h-full flex-col gap-4 rounded-3xl border border-white/60 p-6">
      <div>
        <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
          Your Cup
        </div>
        <div className="text-2xl font-semibold text-slate-900">
          {items.length ? "Custom blend" : "Add ingredients"}
        </div>
      </div>
      <div className="flex flex-col gap-3 overflow-auto">
        {items.length === 0 && (
          <div className="rounded-2xl bg-white/70 p-4 text-sm text-slate-500">
            Ingredients you add will glide into this list. Try tapping “Add” on a
            card to see the animation.
          </div>
        )}
        {items.map((item) => (
          <motion.div
            key={item.ingredient.id}
            layoutId={`card-${item.ingredient.id}`}
            className="group flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-inner"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/70">
              <Image
                src={item.ingredient.imageUrl}
                alt={item.ingredient.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900">
                {item.ingredient.name}
              </div>
              <div className="text-xs text-slate-500 capitalize">
                {item.ingredient.category}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:shadow-md"
                onClick={() =>
                  onUpdate(item.ingredient.id, Math.max(0, item.grams - 10))
                }
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <div className="min-w-[56px] text-center text-sm font-semibold text-slate-800">
                {Math.round(item.grams)} g
              </div>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f172a] text-white shadow hover:shadow-lg"
                onClick={() =>
                  onUpdate(item.ingredient.id, Math.min(500, item.grams + 10))
                }
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              className="opacity-0 transition group-hover:opacity-100"
              onClick={() => onRemove(item.ingredient.id)}
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          </motion.div>
        ))}
      </div>
      <div className="rounded-2xl bg-white/70 p-4 shadow-inner">
        <div className="mb-3 text-xs uppercase tracking-[0.14em] text-slate-500">
          Live totals
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Macro label="Calories" value={formatKcal(totals.kcal)} />
          <Macro label="Protein" value={`${formatNumber(totals.protein)} g`} />
          <Macro label="Fiber" value={`${formatNumber(totals.fiber)} g`} />
          <Macro label="Sugar" value={`${formatNumber(totals.sugar)} g`} />
        </div>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-2">
        <SoftButton variant="outline" onClick={onSaveFavorite}>
          Save as Favorite
        </SoftButton>
        <SoftButton onClick={onLog}>Log for Today</SoftButton>
      </div>
    </div>
  );
}

function Macro({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-3 text-slate-700 shadow-sm">
      <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
        {label}
      </div>
      <div className="text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function calculateTotals(items: BuilderItem[]) {
  return items.reduce(
    (totals, item) => {
      const factor = item.grams / 100;
      return {
        kcal: totals.kcal + item.ingredient.nutrition.kcal * factor,
        protein: totals.protein + item.ingredient.nutrition.protein * factor,
        fiber: totals.fiber + item.ingredient.nutrition.fiber * factor,
        sugar: totals.sugar + item.ingredient.nutrition.sugar * factor,
      };
    },
    { kcal: 0, protein: 0, fiber: 0, sugar: 0 },
  );
}
