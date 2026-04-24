"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type MockSite = {
  url: string;
  brand: string;
  nav: string[];
  headline: string;
  sub: string;
  cta: string;
  accent: string;
};

const sites: MockSite[] = [
  {
    url: "orbitscale.io",
    brand: "orbitscale",
    nav: ["Product", "Docs", "Pricing"],
    headline: "Ship faster. Scale smarter.",
    sub: "The observability platform built for modern engineering teams.",
    cta: "Start free →",
    accent: "SaaS · Launch tier",
  },
  {
    url: "finch.studio",
    brand: "finch",
    nav: ["Work", "About", "Contact"],
    headline: "Design for the new era.",
    sub: "An independent studio shipping brand + product for founders.",
    cta: "See our work →",
    accent: "Studio · Signature tier",
  },
  {
    url: "ember-ai.app",
    brand: "ember",
    nav: ["Product", "Changelog", "Login"],
    headline: "Your AI workspace.",
    sub: "One fast surface for writing, planning, and building with AI.",
    cta: "Try ember →",
    accent: "AI app · Spark tier",
  },
];

export function BrowserShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % sites.length);
    }, 5200);
    return () => clearInterval(id);
  }, []);

  const site = sites[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -4 }}
      animate={{ opacity: 1, y: 0, rotate: -2.5 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[540px]"
    >
      {/* Floating tag top-right */}
      <div className="absolute -top-3 -right-3 z-10 rotate-[6deg] rounded-full border border-orange/40 bg-orange/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-orange backdrop-blur">
        Shipped in 19h
      </div>

      {/* Browser frame */}
      <div className="overflow-hidden rounded-xl border border-line-strong bg-ink-raised shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
        {/* Chrome */}
        <div className="flex items-center gap-3 border-b border-line bg-ink-soft px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-[10px] w-[10px] rounded-full bg-[#FF5F56]" />
            <div className="h-[10px] w-[10px] rounded-full bg-[#FFBD2E]" />
            <div className="h-[10px] w-[10px] rounded-full bg-[#27C93F]" />
          </div>
          <div className="ml-2 flex flex-1 items-center gap-2 rounded-md border border-line bg-ink px-3 py-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-fog-dim" />
            <AnimatePresence mode="wait">
              <motion.span
                key={site.url}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="truncate font-mono text-[11px] text-fog-muted"
              >
                {site.url}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="hidden sm:flex gap-1">
            <div className="h-1.5 w-4 rounded-full bg-line" />
            <div className="h-1.5 w-1.5 rounded-full bg-line" />
          </div>
        </div>

        {/* Site content */}
        <div className="aspect-[16/10] bg-[#0B0B0B] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={site.url}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col p-5 md:p-7"
            >
              {/* site nav */}
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs font-semibold text-fog tracking-tight">
                  {site.brand}
                  <span className="text-orange">.</span>
                </div>
                <div className="flex items-center gap-4">
                  {site.nav.map((n) => (
                    <span key={n} className="text-[10px] text-fog-muted">
                      {n}
                    </span>
                  ))}
                  <span className="rounded-full border border-line px-2.5 py-1 text-[10px] text-fog">
                    Start
                  </span>
                </div>
              </div>

              {/* site hero */}
              <div className="flex flex-1 items-center">
                <div className="max-w-[80%]">
                  <div className="font-display text-[clamp(1.5rem,3.8vw,2.6rem)] italic leading-[1.05] text-fog tracking-tight">
                    {site.headline}
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-fog-muted max-w-xs">
                    {site.sub}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-orange px-3 py-1.5 text-[10px] font-medium text-[#0F0F0F]">
                      {site.cta}
                    </span>
                    <span className="text-[10px] text-fog-dim">or</span>
                    <span className="text-[10px] text-fog underline decoration-fog-dim underline-offset-2">
                      see pricing
                    </span>
                  </div>
                </div>
              </div>

              {/* faint bottom row */}
              <div className="flex items-center gap-4 border-t border-line pt-3">
                <span className="h-1 w-1 rounded-full bg-orange" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-fog-dim">
                  {site.accent}
                </span>
                <span className="ml-auto font-mono text-[9px] text-fog-dim">
                  built by 24dev
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Second stacked preview, offset + smaller (depth) */}
      <div className="absolute -bottom-6 -left-10 -z-10 w-[70%] rotate-[4deg] overflow-hidden rounded-lg border border-line bg-ink-soft opacity-60 shadow-xl">
        <div className="flex gap-1 border-b border-line bg-ink-raised px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-line-strong" />
          <div className="h-2 w-2 rounded-full bg-line-strong" />
          <div className="h-2 w-2 rounded-full bg-line-strong" />
        </div>
        <div className="aspect-[16/10] bg-[#0B0B0B] p-4">
          <div className="font-display text-sm italic text-fog/50">
            Another site, live.
          </div>
          <div className="mt-2 h-1.5 w-20 rounded-full bg-line" />
          <div className="mt-1 h-1.5 w-14 rounded-full bg-line" />
        </div>
      </div>
    </motion.div>
  );
}
