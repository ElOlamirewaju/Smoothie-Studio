"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Chip<V extends string> = {
  label: string;
  value: V;
};

interface FilterChipsProps<V extends string> {
  chips: Chip<V>[];
  active: Set<V>;
  onToggle: (value: V) => void;
}

export function FilterChips<V extends string = string>({ chips, active, onToggle }: FilterChipsProps<V>) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => {
        const isActive = active.has(chip.value);
        return (
          <motion.button
            key={chip.value}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggle(chip.value)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-all",
              isActive
                ? "border-emerald-300 bg-white text-[#0f172a] shadow-sm"
                : "border-white/60 bg-white/50 text-slate-600 hover:bg-white",
            )}
          >
            {chip.label}
          </motion.button>
        );
      })}
    </div>
  );
}
