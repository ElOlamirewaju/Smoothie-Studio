"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface SoftButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  icon?: React.ReactNode;
  active?: boolean;
  href?: string;
}

export function SoftButton({
  children,
  className,
  variant = "primary",
  icon,
  active,
  href,
  ...props
}: SoftButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-[#0f172a] text-white hover:bg-[#111827] shadow-lg shadow-emerald-100"
      : variant === "outline"
        ? "border border-white/70 bg-white/70 hover:bg-white text-slate-700"
        : "text-slate-700 hover:bg-white/60";

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  const classNames = cn(
    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all",
    "min-h-[44px]",
    styles,
    active && "ring-2 ring-emerald-300/60",
    className,
  );

  if (href) {
    return (
      <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Link href={href} className={classNames}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={classNames}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
}
