'use client';

import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { ProgressCharts } from "@/components/domain/progress-charts";
import { SoftButton } from "@/components/ui/soft-button";

export default function ProgressPage() {
  return (
    <AppShell>
      <GlassCard>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Progress
            </div>
            <div className="text-3xl font-semibold text-slate-900">
              Health overview
            </div>
            <p className="max-w-xl text-sm text-slate-600">
              Clean, Apple-like charts with mocked data. Nothing live—just a polished presentation of how trends could look.
            </p>
          </div>
          <SoftButton variant="outline" href="/builder">
            Log for Today
          </SoftButton>
        </div>
      </GlassCard>
      <div className="mt-4">
        <ProgressCharts />
      </div>
    </AppShell>
  );
}
