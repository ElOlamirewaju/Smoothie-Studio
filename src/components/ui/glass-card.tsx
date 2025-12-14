"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface GlassCardProps extends PropsWithChildren {
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={cn(
        "glass-surface rounded-3xl p-6 sm:p-7 md:p-8",
        "border border-white/40 shadow-[0_30px_60px_rgba(15,23,42,0.08)]",
        "bg-white/70 backdrop-blur-2xl",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
