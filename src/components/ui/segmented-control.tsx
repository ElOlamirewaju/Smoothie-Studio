"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Option = {
  label: string;
  value: string;
};

interface SegmentedControlProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({
  options,
  value,
  onChange,
}: SegmentedControlProps) {
  return (
    <div className="glass-surface relative flex items-center gap-1 rounded-full p-1 text-sm text-slate-700">
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative z-10 flex-1 rounded-full px-4 py-2 transition-colors",
              isActive ? "text-[#0f172a] font-semibold" : "text-slate-500",
            )}
          >
            {isActive && (
              <AnimatePresence>
                <motion.span
                  layoutId="pill"
                  className="absolute inset-0 rounded-full bg-white shadow-lg shadow-emerald-50"
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
