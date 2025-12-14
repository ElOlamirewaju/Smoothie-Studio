'use client';

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { SearchInput } from "@/components/ui/search-input";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ingredients } from "@/data/ingredients";
import { IngredientCard } from "@/components/domain/ingredient-card";
import { BuilderCup } from "@/components/domain/builder-cup";
import { useSmoothieStore } from "@/store/useSmoothieStore";
import { motion, LayoutGroup } from "framer-motion";
import { SoftButton } from "@/components/ui/soft-button";
import { buildSuggestions } from "@/lib/suggestions";
import { SuggestionCard } from "@/components/domain/suggestion-card";

export default function BuilderPage() {
  const addIngredient = useSmoothieStore((s) => s.addIngredient);
  const builder = useSmoothieStore((s) => s.builder);
  const updateGrams = useSmoothieStore((s) => s.updateGrams);
  const removeIngredient = useSmoothieStore((s) => s.removeIngredient);
  const saveFavorite = useSmoothieStore((s) => s.saveFavorite);
  const logToday = useSmoothieStore((s) => s.logToday);
  const toggles = useSmoothieStore((s) => s.toggles);

  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return ingredients.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (query && !item.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [category, query]);

  const suggestions = useMemo(() => buildSuggestions(toggles), [toggles]);

  const swapIngredient = (recipeId: string) => {
    const recipe = suggestions.find((r) => r.id === recipeId);
    if (!recipe) return;
    const rotated = [...recipe.ingredients.slice(1), recipe.ingredients[0]];
    rotated.forEach((item) => addIngredient(item.ingredient));
  };

  return (
    <AppShell>
      <LayoutGroup>
        <div className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-4">
            <GlassCard>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Build
                  </div>
                  <div className="text-2xl font-semibold text-slate-900">
                    Ingredient browser
                  </div>
                </div>
                <SegmentedControl
                  options={[
                    { label: "All", value: "all" },
                    { label: "Fruits", value: "fruit" },
                    { label: "Veg", value: "vegetable" },
                    { label: "Protein", value: "protein" },
                    { label: "Sweet", value: "sweetener" },
                  ]}
                  value={category}
                  onChange={setCategory}
                />
              </div>
              <div className="mt-3">
                <SearchInput
                  placeholder="Search mango, kale, oat milk..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </GlassCard>
            <div className="grid gap-3 md:grid-cols-2">
              {filtered.map((ingredient) => (
                <motion.div key={ingredient.id} layoutId={`card-${ingredient.id}`}>
                  <IngredientCard ingredient={ingredient} onAdd={addIngredient} />
                </motion.div>
              ))}
            </div>
          </div>
          <BuilderCup
            items={builder}
            onUpdate={updateGrams}
            onRemove={removeIngredient}
            onSaveFavorite={saveFavorite}
            onLog={logToday}
          />
        </div>
      </LayoutGroup>
      <GlassCard className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
              AI suggestions (mocked)
            </div>
            <div className="text-2xl font-semibold text-slate-900">
              Add in a tap
            </div>
          </div>
          <SoftButton variant="ghost" href="/dashboard">
            View agent
          </SoftButton>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {suggestions.map((recipe) => (
            <SuggestionCard
              key={recipe.id}
              recipe={recipe}
              onAdd={(r) => r.ingredients.forEach((item) => addIngredient(item.ingredient))}
              onSwap={swapIngredient}
            />
          ))}
        </div>
      </GlassCard>
    </AppShell>
  );
}
