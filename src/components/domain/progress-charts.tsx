"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { caloriesFromSmoothies, smoothieCount, weightTrend } from "@/data/progress";
import { GlassCard } from "../ui/glass-card";

export function ProgressCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <GlassCard className="lg:col-span-2">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Health Progress
            </div>
            <div className="text-xl font-semibold text-slate-900">
              Weight Trend
            </div>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Mock data
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightTrend}>
              <defs>
                <linearGradient id="weightGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7ee0a3" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#7ee0a3" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 8" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={["dataMin-1", "dataMax+1"]} />
              <Tooltip />
              <Area
                dataKey="weight"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#weightGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      <GlassCard>
        <div className="mb-3 text-xl font-semibold text-slate-900">
          Weekly Smoothies
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={smoothieCount}>
              <CartesianGrid strokeDasharray="4 8" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#0f172a" radius={[10, 10, 8, 8]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      <GlassCard className="lg:col-span-3">
        <div className="mb-3 text-xl font-semibold text-slate-900">
          Average calories by style
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={caloriesFromSmoothies}>
              <CartesianGrid strokeDasharray="4 8" stroke="#e2e8f0" />
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="kcal"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 6, strokeWidth: 2, fill: "#0f172a" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
