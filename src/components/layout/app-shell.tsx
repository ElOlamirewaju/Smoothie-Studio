"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SoftButton } from "../ui/soft-button";
import { Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

const nav = [
  { href: "/", label: "Landing" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/builder", label: "Builder" },
  { href: "/progress", label: "Progress" },
];

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <header className="glass-surface sticky top-4 z-30 mb-6 flex items-center justify-between rounded-full px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f172a] text-white shadow-lg shadow-emerald-100">
            SS
          </div>
          <div>
            <div className="text-sm font-semibold text-[#0f172a]">
              Smoothie Studio
            </div>
            <div className="text-xs text-slate-500">
              Apple-style UI + motion demo
            </div>
          </div>
        </div>
        <nav className="hidden gap-2 rounded-full bg-white/60 p-1 text-sm text-slate-600 shadow-inner sm:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 transition-all",
                  active ? "text-[#0f172a]" : "hover:text-[#0f172a]",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="hidden sm:block">
          <SoftButton variant="primary" icon={<Wand2 className="h-4 w-4" />}>
            Open Studio
          </SoftButton>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <nav className="glass-surface fixed bottom-4 left-0 right-0 z-40 mx-auto flex max-w-xl items-center justify-around rounded-full px-3 py-2 text-xs text-slate-600 shadow-lg sm:hidden">
        {nav.slice(1).map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-full px-2 py-2",
                active ? "text-[#0f172a] font-semibold" : "text-slate-500",
              )}
            >
              <span>{item.label}</span>
              {active && <span className="h-1 w-8 rounded-full bg-[#0f172a]" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
