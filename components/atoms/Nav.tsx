"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 md:px-10">
        {/* Logo */}
        <a href="/" className="group flex items-baseline gap-0 shrink-0">
          <span
            className="font-[family-name:var(--font-accent)] italic text-[34px] leading-[0.85] tracking-[-0.03em] text-fog group-hover:text-orange transition-colors"
          >
            24
          </span>
          <span className="ml-1 font-body text-[18px] font-medium tracking-tight text-fog-muted leading-none">
            /dev
          </span>
          <span className="text-orange text-[18px] leading-none">.</span>
        </a>

        {/* Center status */}
        <div className="hidden md:flex items-center gap-3 text-[13px] text-fog-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
          </span>
          <span className="font-display uppercase tracking-[0.04em] text-fog text-[15px] leading-none">
            <span className="text-orange">5</span> slots left this week
          </span>
          <span className="text-fog-dim">—</span>
          <span className="font-body text-fog-muted">
            India, Est. 2025
          </span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-5 md:gap-7 text-[14px] font-medium text-fog-muted shrink-0">
          <a className="hover:text-fog transition-colors" href="#work">Work</a>
          <a className="hover:text-fog transition-colors" href="#pricing">Pricing</a>
          <a className="hover:text-fog transition-colors hidden sm:inline" href="#faq">FAQ</a>
        </nav>
      </div>
    </motion.header>
  );
}
