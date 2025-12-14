"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <label
      className={cn(
        "glass-surface flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm text-slate-600",
        className,
      )}
    >
      <Search className="h-4 w-4 text-slate-400" />
      <input
        className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
        {...props}
      />
    </label>
  );
}
