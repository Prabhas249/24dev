"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const shipped = [
  { site: "orbitscale.io", timeAgo: "17h 23m ago", tier: "Launch" },
  { site: "finch.studio", timeAgo: "31h 08m ago", tier: "Signature" },
  { site: "harbor-hq.com", timeAgo: "2d 04h ago", tier: "Pro" },
  { site: "ember-ai.app", timeAgo: "3d 11h ago", tier: "Spark" },
  { site: "north-rd.in", timeAgo: "4d 20h ago", tier: "Launch" },
];

export function LatestShippedCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % shipped.length);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const current = shipped[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[260px] rounded-xl border border-line-strong bg-ink-soft/70 p-4 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog-dim">
          Just shipped
        </span>
        <span className="ml-auto rounded-full border border-line-strong px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-fog-muted">
          {current.tier}
        </span>
      </div>

      <div className="mt-3 h-[72px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.site}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-display text-2xl italic leading-none text-fog">
              {current.site}
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fog-dim">
              {current.timeAgo}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-fog-dim">
        <span>Live feed</span>
        <span className="text-orange">●</span>
      </div>
    </motion.div>
  );
}
