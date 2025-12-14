'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { SoftButton } from "@/components/ui/soft-button";
import { ArrowRight, Sparkles, Waves, LineChart } from "lucide-react";

const previewCards = [
  {
    title: "Smoothie Builder",
    detail: "Shared layout animation from ingredient card → cup list",
    icon: <Sparkles className="h-5 w-5" />,
    href: "/builder",
  },
  {
    title: "Progress",
    detail: "Apple-like ring + clean charts with mock data",
    icon: <LineChart className="h-5 w-5" />,
    href: "/progress",
  },
  {
    title: "AI Preferences",
    detail: "Mocked agent that shapes suggestions + toggles",
    icon: <Waves className="h-5 w-5" />,
    href: "/dashboard",
  },
];

export default function Home() {
  return (
    <AppShell>
      <div className="relative overflow-hidden rounded-[32px] bg-white/70 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-inner">
            Apple-polished UI + Framer Motion
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Build smoothies that match your goals.
          </h1>
          <p className="max-w-xl text-lg text-slate-600">
            A portfolio-ready experience that blends glass panels, soft depth,
            and iOS-like motion. Explore the builder, AI suggestions, and clean
            progress visuals—all mocked, all delightful.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/builder">
              <SoftButton variant="primary" icon={<ArrowRight className="h-4 w-4" />}>
                Open Studio
              </SoftButton>
            </Link>
            <Link href="/ingredients">
              <SoftButton variant="outline">View Ingredients</SoftButton>
            </Link>
          </div>
        </motion.div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {previewCards.map((card, index) => (
            <GlassCard key={card.title} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className="flex h-full flex-col gap-4"
              >
                <div className="flex items-center gap-3 text-slate-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    {card.icon}
                  </div>
                  <div className="text-lg font-semibold">{card.title}</div>
                </div>
                <p className="text-sm text-slate-600">{card.detail}</p>
                <Link
                  href={card.href}
                  className="mt-auto inline-flex items-center text-sm font-semibold text-[#0f172a] transition hover:translate-x-1"
                >
                  Peek <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            </GlassCard>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
