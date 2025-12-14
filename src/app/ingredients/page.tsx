'use client';

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { SearchInput } from "@/components/ui/search-input";
import { FilterChips } from "@/components/ui/filter-chips";
import { IngredientCard } from "@/components/domain/ingredient-card";
import { IngredientDetail } from "@/components/domain/ingredient-detail";
import { Sheet } from "@/components/ui/sheet";
import { ingredients } from "@/data/ingredients";
import { Ingredient, IngredientTag } from "@/types";
import { useSmoothieStore } from "@/store/useSmoothieStore";
import Image from "next/image";

const filterOptions: { label: string; value: IngredientTag }[] = [
  { label: "High fiber", value: "high_fiber" },
  { label: "Low sugar", value: "low_sugar" },
  { label: "High protein", value: "high_protein" },
  { label: "Antioxidant", value: "antioxidant" },
  { label: "Creamy", value: "creamy" },
];

export default function IngredientsPage() {
  const addIngredient = useSmoothieStore((s) => s.addIngredient);
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Set<IngredientTag>>(new Set());
  const [selected, setSelected] = useState<Ingredient | null>(null);

  const filtered = useMemo(() => {
    return ingredients.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (query && !item.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      if (activeFilters.size) {
        for (const filter of activeFilters) {
          if (!item.tags.includes(filter)) return false;
        }
      }
      return true;
    });
  }, [category, query, activeFilters]);

  const toggleFilter = (value: IngredientTag) => {
    const next = new Set(activeFilters);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    setActiveFilters(next);
  };

  const handleAdd = (ingredient: Ingredient) => {
    addIngredient(ingredient);
    setSelected(ingredient);
  };

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-[1fr,340px]">
        <div className="space-y-4">
          <GlassCard>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Global catalog
                </div>
                <div className="text-2xl font-semibold text-slate-900">
                  Ingredients
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
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SearchInput
                placeholder="Search berries, greens, proteins..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <FilterChips
                chips={filterOptions}
                active={activeFilters}
                 onToggle={(value) => toggleFilter(value as IngredientTag)}
              />
            </div>
          </GlassCard>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((ingredient) => (
              <IngredientCard
                key={ingredient.id}
                ingredient={ingredient}
                onAdd={handleAdd}
                onOpen={setSelected}
              />
            ))}
          </div>
        </div>
        <IngredientDetail
          ingredient={selected}
          onClose={() => setSelected(null)}
          onAdd={addIngredient}
        />
      </div>
      <Sheet open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div className="space-y-4 text-sm text-slate-700">
            <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-white/70">
              <Image src={selected.imageUrl} alt={selected.name} fill sizes="320px" className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Fact label="Calories" value={`${selected.nutrition.kcal} kcal`} />
              <Fact label="Protein" value={`${selected.nutrition.protein} g`} />
              <Fact label="Fiber" value={`${selected.nutrition.fiber} g`} />
              <Fact label="Sugar" value={`${selected.nutrition.sugar} g`} />
            </div>
            <FilterChips
              chips={selected.tags.map((tag) => ({ label: tag, value: tag }))}
              active={new Set(selected.tags)}
              onToggle={() => {}}
            />
            <button
              className="w-full rounded-full bg-[#0f172a] py-3 text-sm font-semibold text-white"
              onClick={() => handleAdd(selected)}
            >
              Add to Smoothie
            </button>
          </div>
        )}
      </Sheet>
    </AppShell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/80 px-3 py-2 shadow-inner">
      <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
        {label}
      </div>
      <div className="text-base font-semibold text-slate-900">{value}</div>
    </div>
  );
}
