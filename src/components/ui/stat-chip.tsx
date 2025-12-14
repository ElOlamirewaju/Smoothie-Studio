"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatChipProps {
  label: string;
  value: string;
  icon?: ReactNode;
  accent?: string;
}

export function StatChip({ label, value, icon, accent }: StatChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="glass-surface flex items-center gap-3 rounded-2xl px-4 py-3 text-sm"
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-2xl"
        style={{
          background: accent ?? "linear-gradient(135deg, #7ee0a3, #9bf0c5)",
        }}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
          {label}
        </div>
        <div className="text-lg font-semibold text-slate-900">{value}</div>
      </div>
    </motion.div>
  );
}
