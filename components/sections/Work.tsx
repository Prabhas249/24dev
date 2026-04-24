"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CountUp } from "@/components/motion/CountUp";

type WorkItem = {
  id: string;
  url: string;
  title: string;
  tagline: string;
  tier: "Starter" | "Launch" | "Pro";
  price: string;
  accent: string;
  shippedAgo: string;
  category: "SaaS" | "Studio" | "AI" | "D2C" | "Portfolio" | "Fintech" | "Media";
};

const items: WorkItem[] = [
  { id: "orbitscale", url: "orbitscale.io", title: "Orbitscale", tagline: "Ship faster. Scale smarter.", tier: "Launch", price: "₹4,999", accent: "#5E6AD2", shippedAgo: "17h", category: "SaaS" },
  { id: "claypot", url: "claypot.co", title: "Claypot", tagline: "Small-batch coffee.", tier: "Starter", price: "₹1,999", accent: "#F59E0B", shippedAgo: "3d", category: "D2C" },
  { id: "rio", url: "rio-dunes.co", title: "Rio Dunes", tagline: "The beach is empty.", tier: "Pro", price: "₹9,999", accent: "#06B6D4", shippedAgo: "7d", category: "D2C" },
  { id: "mosaic", url: "mosaic.build", title: "Mosaic", tagline: "Blocks for builders.", tier: "Pro", price: "₹9,999", accent: "#EC4899", shippedAgo: "9d", category: "SaaS" },
  { id: "halfpace", url: "halfpace.xyz", title: "Halfpace", tagline: "Slow letters, worth reading.", tier: "Launch", price: "₹4,999", accent: "#8B5CF6", shippedAgo: "11d", category: "Media" },
  { id: "pulse", url: "pulse-fit.io", title: "Pulse", tagline: "Move every day.", tier: "Pro", price: "₹9,999", accent: "#14B8A6", shippedAgo: "14d", category: "SaaS" },
  { id: "kite", url: "kite.design", title: "Kite", tagline: "Portfolio for creators.", tier: "Launch", price: "₹4,999", accent: "#F472B6", shippedAgo: "16d", category: "Portfolio" },
  { id: "nomad", url: "nomad-stays.co", title: "Nomad", tagline: "Remote-friendly stays.", tier: "Pro", price: "₹9,999", accent: "#22D3EE", shippedAgo: "19d", category: "D2C" },
  { id: "type", url: "type.market", title: "Type Market", tagline: "Typography for the web.", tier: "Starter", price: "₹1,999", accent: "#FB7185", shippedAgo: "22d", category: "Media" },
  { id: "founder", url: "founder.fm", title: "Founder FM", tagline: "Audio for builders.", tier: "Launch", price: "₹4,999", accent: "#FACC15", shippedAgo: "29d", category: "Media" },
];

const tiers = ["All", "Starter", "Launch", "Pro"] as const;
type TierFilter = (typeof tiers)[number];

const thumb = (url: string, w = 300, h = 188) =>
  `https://image.thum.io/get/width/${w}/crop/${h}/allowJPG/wait/2/https://${url}`;

export function Work() {
  const [filter, setFilter] = useState<TierFilter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((i) => i.tier === filter)),
    [filter]
  );

  const [featured, ...rest] = filtered;

  return (
    <section
      id="work"
      className="relative border-t border-line bg-ink py-20 md:py-28"
    >
      {/* subtle dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,15,15,0.05) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse at center top, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center top, black 30%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.26em] text-fog-dim">
              <span className="h-px w-6 bg-orange" />
              Shipped · Live feed
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.5rem,7.5vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em] text-fog">
              Real sites,
              <br />
              <span className="font-[family-name:var(--font-accent)] italic font-normal">
                shipped fast.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-6 md:flex md:flex-wrap">
            <Stat label="Shipped" value={<CountUp end={247} />} />
            <Stat label="Avg rating" value={<CountUp end={4.9} decimals={1} suffix="★" />} />
            <Stat label="Avg delivery" value={<CountUp end={19} suffix="h" />} />
            <Stat label="Late" value={<CountUp end={0} />} accent />
          </div>
        </motion.div>

        {/* FILTER CHIPS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-wrap items-center gap-2 border-t border-line pt-5"
        >
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all ${
                filter === t
                  ? "border-orange bg-orange/10 text-orange"
                  : "border-line-strong bg-ink-soft/40 text-fog-muted hover:text-fog hover:border-fog-dim"
              }`}
            >
              {t}
              {t !== "All" && (
                <span className="ml-1.5 text-fog-dim/70">
                  {items.filter((i) => i.tier === t).length}
                </span>
              )}
            </button>
          ))}
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-fog-dim">
            Sort: Latest ↓
          </span>
        </motion.div>

        {/* FEED */}
        <div className="mt-2">
          <AnimatePresence mode="popLayout">
            {featured && (
              <FeaturedRow
                key={`featured-${featured.id}`}
                item={featured}
                number={1}
              />
            )}
            {rest.map((item, i) => (
              <WorkRow key={item.id} item={item} number={i + 2} />
            ))}
          </AnimatePresence>
        </div>

        {/* FOOTER NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim"
        >
          <span>
            Showing {filtered.length} of {items.length}
          </span>
          <a
            href="#pricing"
            className="inline-flex items-center gap-1.5 text-fog transition-colors hover:text-orange"
          >
            Start yours →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FeaturedRow — big first entry
// ─────────────────────────────────────────────────────────────

function FeaturedRow({ item, number }: { item: WorkItem; number: number }) {
  return (
    <motion.a
      href={`https://${item.url}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block border-b border-line py-8 md:py-10"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10">
        <RowNumber number={number} />

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.22em] text-orange">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
              </span>
              Latest shipped
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog-dim">
              {item.shippedAgo} ago · {item.category}
            </span>
          </div>

          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className="font-display text-[clamp(1.5rem,2.4vw,1.875rem)] font-bold leading-none tracking-[-0.025em] text-fog transition-colors group-hover:text-orange">
              {item.title}
            </h3>
            <span className="font-mono text-[11px] text-fog-muted">
              {item.url}
            </span>
          </div>

          <p className="font-[family-name:var(--font-accent)] italic text-[16px] leading-tight text-fog-muted">
            {item.tagline}
          </p>

          <div className="mt-1 flex items-center gap-4">
            <span
              className="rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{
                borderColor: `${item.accent}55`,
                color: item.accent,
                backgroundColor: `${item.accent}12`,
              }}
            >
              {item.tier}
            </span>
            <span className="font-display text-[15px] font-bold tracking-tight text-fog">
              {item.price}
            </span>
          </div>
        </div>

        <div className="relative h-[200px] w-full overflow-hidden rounded-lg border border-line bg-ink-raised md:h-[220px] md:w-[380px]">
          <img
            src={thumb(item.url, 760, 440)}
            alt={item.url}
            loading="eager"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <span
            aria-hidden
            className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-sm text-fog backdrop-blur transition-all group-hover:bg-orange group-hover:text-[#0F0F0F]"
          >
            →
          </span>
        </div>
      </div>
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────
// WorkRow — standard compact list row
// ─────────────────────────────────────────────────────────────

function WorkRow({ item, number }: { item: WorkItem; number: number }) {
  return (
    <motion.a
      href={`https://${item.url}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-5 transition-colors hover:bg-ink-soft/20 md:grid-cols-[auto_auto_1fr_auto_auto_auto] md:gap-6 md:py-6"
    >
      <RowNumber number={number} />

      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
          style={{ backgroundColor: item.accent }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: item.accent }}
        />
      </span>

      <div className="min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="font-display text-[clamp(1.125rem,2vw,1.5rem)] font-bold leading-none tracking-[-0.025em] text-fog transition-colors group-hover:text-orange">
            {item.title}
          </span>
          <span className="font-mono text-[11px] text-fog-muted truncate">
            {item.url}
          </span>
        </div>
        <p className="mt-1.5 font-[family-name:var(--font-accent)] italic text-[15px] leading-tight text-fog-muted">
          {item.tagline}
        </p>
        <div className="mt-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-fog-dim md:hidden">
          <span>{item.shippedAgo} ago</span>
          <span>·</span>
          <span>{item.tier}</span>
          <span>·</span>
          <span className="font-display font-bold text-fog">{item.price}</span>
        </div>
      </div>

      <div className="hidden md:block font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim whitespace-nowrap">
        {item.shippedAgo} ago
      </div>

      <div className="hidden md:flex items-baseline gap-4 whitespace-nowrap">
        <span
          className="rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{
            borderColor: `${item.accent}55`,
            color: item.accent,
            backgroundColor: `${item.accent}12`,
          }}
        >
          {item.tier}
        </span>
        <span className="font-display font-bold text-[15px] tracking-tight text-fog">
          {item.price}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block h-[54px] w-[86px] overflow-hidden rounded-md border border-line bg-ink-raised">
          <img
            src={thumb(item.url)}
            alt={item.url}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.08]"
          />
        </div>
        <span
          aria-hidden
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-line-strong bg-ink-soft/40 text-xs text-fog-muted transition-all group-hover:border-orange group-hover:bg-orange group-hover:text-[#0F0F0F] group-hover:translate-x-0.5"
        >
          →
        </span>
      </div>
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function RowNumber({ number }: { number: number }) {
  return (
    <div className="flex shrink-0 items-baseline gap-1 md:self-start md:pt-1">
      <span className="font-mono text-[11px] text-fog-dim">
        {String(number).padStart(2, "0")}
      </span>
      <span className="hidden h-px w-4 bg-line md:inline-block" aria-hidden />
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 min-w-[96px]">
      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-fog-dim">
        <span className="h-px w-3 bg-fog-dim" />
        {label}
      </span>
      <span
        className={`font-display text-[clamp(1.75rem,2.4vw,2.25rem)] font-black leading-none tracking-[-0.03em] ${
          accent ? "text-orange" : "text-fog"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
