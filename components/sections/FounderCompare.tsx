"use client";

import { motion } from "motion/react";

type Row = { label: string; agency: string; us: string; ourWin?: boolean };

const rows: Row[] = [
  { label: "First call", agency: "Week 1 · 60 min discovery", us: "No call. WhatsApp brief." },
  { label: "Price quoted", agency: "₹50,000–₹1,50,000", us: "₹4,999 fixed", ourWin: true },
  { label: "Design mockups", agency: "Week 2–3 · Figma rounds", us: "Built directly in code" },
  { label: "Revisions", agency: "Scope creep · hourly billing", us: "2 included · ₹999 extra" },
  { label: "Delivery date", agency: "Week 6–8 (often slips)", us: "24 hours. Or 50% back.", ourWin: true },
  { label: "Ownership", agency: "Often held hostage", us: "Full code + design. Yours." },
  { label: "Ongoing cost", agency: "Retainer ₹15K+/month", us: "₹0. Forever." },
];

export function FounderCompare() {
  return (
    <section
      id="compare"
      className="relative border-t border-line bg-ink py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-line pb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            The comparison
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
            Agency route vs 24dev route
          </span>
        </div>

        {/* Editorial headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16"
        >
          <h2 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.86] tracking-[-0.045em] text-fog">
            Two founders.
            <br />
            <span className="font-[family-name:var(--font-accent)] italic font-normal">
              Same need.
            </span>
            <br />
            Different paths.
          </h2>
          <p className="max-w-md font-body text-[clamp(0.9375rem,1.3vw,1.0625rem)] leading-relaxed text-fog-muted">
            One calls three agencies and waits six weeks. One WhatsApps us at
            3pm and ships by tomorrow evening. The work gets done. Only one
            keeps their sanity and their ₹45,000.
          </p>
        </motion.div>

        {/* Table */}
        <div className="mt-16 overflow-hidden rounded-xl border border-line-strong bg-ink-raised md:mt-20">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-line-strong">
            <div className="flex items-center px-4 py-5 md:px-6 md:py-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog-dim">
                What
              </span>
            </div>
            <div className="flex flex-col items-start gap-1 border-l border-line px-4 py-5 md:px-6 md:py-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog-dim">
                Founder A
              </span>
              <span className="font-display text-[15px] font-bold tracking-tight text-fog md:text-[17px]">
                Hires agency
              </span>
            </div>
            <div className="flex flex-col items-start gap-1 border-l border-line bg-orange/5 px-4 py-5 md:px-6 md:py-6">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-orange">
                <span className="h-1 w-1 rounded-full bg-orange animate-pulse" />
                Founder B
              </span>
              <span className="font-display text-[15px] font-bold tracking-tight text-fog md:text-[17px]">
                Uses 24dev
              </span>
            </div>
          </div>

          {rows.map((row, i) => (
            <TableRow key={row.label} row={row} index={i} />
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-start gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between"
        >
          <p className="font-[family-name:var(--font-accent)] italic text-[clamp(1.125rem,1.6vw,1.5rem)] text-fog-muted">
            &ldquo;Same result. Different 6 weeks.&rdquo;
          </p>
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-fog transition-colors hover:text-orange"
          >
            Pick your tier
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function TableRow({ row, index }: { row: Row; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="grid grid-cols-[1fr_1fr_1fr] border-b border-line last:border-b-0"
    >
      {/* Label */}
      <div className="flex items-center px-4 py-4 md:px-6 md:py-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
          {row.label}
        </span>
      </div>

      {/* Founder A (agency) */}
      <div className="flex items-center border-l border-line px-4 py-4 md:px-6 md:py-5">
        <span className="font-body text-[13px] leading-snug text-fog-muted line-through decoration-fog-dim/40 decoration-[1px] underline-offset-2 md:text-[14px]">
          {row.agency}
        </span>
      </div>

      {/* Founder B (24dev) */}
      <div className="flex items-center border-l border-line bg-orange/[0.04] px-4 py-4 md:px-6 md:py-5">
        <span
          className={`font-body leading-snug text-[13px] md:text-[14px] ${
            row.ourWin ? "text-fog font-medium" : "text-fog-muted"
          }`}
        >
          {row.us}
        </span>
      </div>
    </motion.div>
  );
}
