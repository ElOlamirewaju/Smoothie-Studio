"use client";

import { useEffect, useState } from "react";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";

interface NumberTickerProps {
  value: number;
  suffix?: string;
}

export function NumberTicker({ value, suffix = "" }: NumberTickerProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => latest.toFixed(0));
  const [display, setDisplay] = useState<string>(rounded.get());

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [motionValue, value]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub()
  }, [rounded]);

  return (
    <motion.span className="tabular-nums">
      {display}
      {suffix}
    </motion.span>
  );
}
