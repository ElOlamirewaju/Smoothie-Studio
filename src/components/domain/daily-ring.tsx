"use client";

import { motion } from "framer-motion";

interface DailyRingProps {
  progress: number;
  label: string;
  sublabel: string;
}

export function DailyRing({ progress, label, sublabel }: DailyRingProps) {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const percent = Math.round(clamped * 100);

  return (
    <div className="glass-surface flex items-center gap-4 rounded-3xl border border-white/60 p-5">
      <div
        className="relative h-28 w-28 rounded-full bg-gradient-to-br from-[#7ee0a3] to-[#0f172a]"
        style={{
          backgroundImage: `conic-gradient(#7ee0a3 ${percent}%, #e2e8f0 ${percent}% 100%)`,
        }}
      >
        <div className="absolute inset-[10px] rounded-full bg-white/80 backdrop-blur-xl" />
        <div className="absolute inset-[18px] rounded-full bg-white flex items-center justify-center">
          <motion.span
            key={percent}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg font-semibold text-slate-900"
          >
            {percent}%
          </motion.span>
        </div>
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
          {sublabel}
        </div>
        <div className="text-xl font-semibold text-slate-900">{label}</div>
        <div className="mt-1 text-sm text-slate-600">
          Closing the ring with your smoothies today
        </div>
      </div>
    </div>
  );
}
