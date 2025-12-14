'use client';

import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { StatChip } from "@/components/ui/stat-chip";
import { DailyRing } from "@/components/domain/daily-ring";
import { SoftButton } from "@/components/ui/soft-button";
import { SuggestionCard } from "@/components/domain/suggestion-card";
import { buildSuggestions } from "@/lib/suggestions";
import { useSmoothieStore } from "@/store/useSmoothieStore";
import { Flame, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo } from "react";

export default function DashboardPage() {
  const toggles = useSmoothieStore((s) => s.toggles);
  const togglePreference = useSmoothieStore((s) => s.togglePreference);
  const suggestions = useMemo(() => buildSuggestions(toggles), [toggles]);

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-4">
          <GlassCard>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Today
                </div>
                <div className="text-2xl font-semibold text-slate-900">
                  Your day at a glance
                </div>
              </div>
              <SoftButton variant="outline">Generate 3 smoothie ideas</SoftButton>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatChip label="Calories" value="1,240 kcal" icon={<Flame className="h-4 w-4 text-white" />} />
              <StatChip label="Protein" value="86 g" icon={<ShieldCheck className="h-4 w-4 text-white" />} />
              <StatChip label="Fiber" value="22 g" icon={<Leaf className="h-4 w-4 text-white" />} />
              <StatChip label="Sugar" value="38 g" icon={<Sparkles className="h-4 w-4 text-white" />} />
            </div>
            <div className="mt-6">
              <DailyRing progress={0.68} label="Daily ring" sublabel="Smoothie move" />
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  Your smoothie style
                </div>
                <div className="text-xl font-semibold text-slate-900">
                  Preference agent (mocked)
                </div>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Deterministic UI
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["High Protein", "Low Added Sugar", "Creamy", "Green Tolerance: Medium"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-slate-700 shadow-inner"
                >
                  {chip}
                </span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <ToggleChip
                label="More filling"
                active={toggles.moreFilling}
                onClick={() => togglePreference("moreFilling")}
              />
              <ToggleChip
                label="Less sweet"
                active={toggles.lessSweet}
                onClick={() => togglePreference("lessSweet")}
              />
              <ToggleChip
                label="Plant-based"
                active={toggles.plantBased}
                onClick={() => togglePreference("plantBased")}
              />
            </div>
          </GlassCard>

          <GlassCard>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  Quick actions
                </div>
                <div className="text-xl font-semibold text-slate-900">
                  Stay in flow
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <SoftButton variant="outline" className="justify-center" href="/builder">
                Build a smoothie
              </SoftButton>
              <SoftButton variant="outline" className="justify-center" href="/ingredients">
                Log a favorite
              </SoftButton>
              <SoftButton
                variant="outline"
                className="justify-center"
                href="/dashboard#suggestions"
              >
                Try a suggestion
              </SoftButton>
            </div>
          </GlassCard>
        </div>
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="flex items-center justify-between" id="suggestions">
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  AI suggestions (mock)
                </div>
                <div className="text-xl font-semibold text-slate-900">
                  Ready to pour
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="mt-4 space-y-4">
              {suggestions.map((recipe) => (
                <SuggestionCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}

function ToggleChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-3 py-3 text-left text-sm font-semibold transition-all ${
        active
          ? "bg-[#0f172a] text-white shadow-lg shadow-emerald-200"
          : "bg-white/80 text-slate-700 shadow-inner hover:-translate-y-1"
      }`}
    >
      {label}
    </button>
  );
}
