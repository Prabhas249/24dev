"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Tier = {
  id: "starter" | "launch" | "pro";
  code: string;
  label: string;
  price: number;
  priceDisplay: string;
  tagline: string;
  delivery: string;
  revisions: string;
  features: string[];
  recommended?: boolean;
};

const tiers: Tier[] = [
  {
    id: "starter",
    code: "STR",
    label: "Starter",
    price: 1999,
    priceDisplay: "1,999",
    tagline: "A single page, live today.",
    delivery: "6–12h",
    revisions: "1 rev",
    features: [
      "1-page custom landing",
      "Mobile responsive",
      "Deploy + domain",
      "SEO meta + OG image",
    ],
  },
  {
    id: "launch",
    code: "LNC",
    label: "Launch",
    price: 4999,
    priceDisplay: "4,999",
    tagline: "Landing page in 24 hours.",
    delivery: "24h",
    revisions: "2 rev",
    recommended: true,
    features: [
      "Custom single-page site",
      "Animations + micro-interactions",
      "Forms + analytics + SEO",
      "Deploy + domain + favicon",
    ],
  },
  {
    id: "pro",
    code: "PRO",
    label: "Pro",
    price: 9999,
    priceDisplay: "9,999",
    tagline: "Multi-page site, shipped fast.",
    delivery: "24–36h",
    revisions: "3 rev",
    features: [
      "3–5 page custom website",
      "Light CMS setup included",
      "Advanced SEO + schema",
      "Performance optimization",
    ],
  },
];

const today = new Date()
  .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
  .toUpperCase();

export function Pricing() {
  const [selectedId, setSelectedId] = useState<Tier["id"]>("launch");
  const selected = tiers.find((t) => t.id === selectedId)!;

  return (
    <section
      id="pricing"
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
            "radial-gradient(ellipse at center top, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center top, black 30%, transparent 80%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-line pb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            Pricing
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
            One receipt · Pick · Pay · Ship
          </span>
        </div>

        {/* Editorial headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 max-w-3xl text-center"
        >
          <h2 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.86] tracking-[-0.045em] text-fog">
            Pick a tier.
            <br />
            <span className="font-[family-name:var(--font-accent)] italic font-normal">
              Chat on WhatsApp.
            </span>
            <br />
            Shipped in 24 hours.
          </h2>
          <p className="mt-5 font-body text-[clamp(0.9375rem,1.3vw,1.0625rem)] leading-relaxed text-fog-muted max-w-xl mx-auto">
            One receipt. Three tiers. No hidden fees, no calls, no lock-ins.
            Fixed price, upfront, delivered.
          </p>
        </motion.div>

        {/* Receipt container — narrow, centered, physical */}
        <div className="relative mt-16 flex justify-center md:mt-20">
          {/* Ghost receipts layered behind */}
          <GhostReceipt offsetX={-32} offsetY={12} rotate={-5} opacity={0.08} />
          <GhostReceipt offsetX={28} offsetY={24} rotate={4} opacity={0.12} />
          <motion.div
            initial={{ opacity: 0, y: -60, rotate: -3, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
              rotate: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
            }}
            whileHover={{ y: -4, rotate: 0.3 }}
            className="relative w-full max-w-[440px] origin-top"
            style={{
              filter:
                "drop-shadow(0 30px 50px rgba(0,0,0,0.18)) drop-shadow(0 8px 18px rgba(0,0,0,0.08))",
            }}
          >
            {/* PREVIEW rubber stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 2, rotate: -16 }}
              whileInView={{ opacity: 0.32, scale: 1, rotate: -16 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: 1.1,
                duration: 0.35,
                ease: [0.6, 1.4, 0.5, 1],
              }}
              className="pointer-events-none absolute top-[8%] right-[-14px] z-20"
              style={{ transformOrigin: "center" }}
            >
              <div
                className="rounded border-[3px] border-[#FF6B35] px-3 py-1.5"
                style={{
                  fontFamily: "var(--font-unbounded)",
                  color: "#FF6B35",
                  letterSpacing: "0.25em",
                  filter: "drop-shadow(0 0 2px rgba(255,107,53,0.2))",
                }}
              >
                <span className="text-[16px] font-black uppercase leading-none">
                  Preview
                </span>
              </div>
            </motion.div>

            <TornEdge />

            <div
              className="relative bg-[#F5EFE1] text-[#1A1612]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <div className="px-8 py-10">
                {/* ── BRAND HEADER ── */}
                <div className="text-center">
                  <h3
                    style={{ fontFamily: "var(--font-unbounded)" }}
                    className="text-[28px] font-black leading-none tracking-[0.02em] text-[#1A1612]"
                  >
                    24DEV<sup className="text-[0.35em] font-normal">®</sup>
                  </h3>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-[#1A1612]/70">
                    Websites · delivered in 24 hours
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#1A1612]/50">
                    Bangalore — Remote · Est. 2025
                  </p>
                </div>

                <Dashes />

                {/* ── META ── */}
                <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.2em] text-[#1A1612]/70">
                  <span>
                    <span className="opacity-50">No.</span> 24D-
                    {selected.code}-2026
                  </span>
                  <span>{today}</span>
                </div>

                <Dashes />

                {/* ── COLUMN HEAD ── */}
                <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.26em] text-[#1A1612]/50">
                  <span>Item</span>
                  <span>Price (₹)</span>
                </div>

                {/* ── ITEMS ── */}
                <div className="mt-3 space-y-1">
                  {tiers.map((tier) => (
                    <ReceiptItem
                      key={tier.id}
                      tier={tier}
                      selected={selectedId === tier.id}
                      onSelect={() => setSelectedId(tier.id)}
                    />
                  ))}
                </div>

                <Dashes />

                {/* ── TOTAL (all-inclusive pricing) ── */}
                <div className="my-4 h-[2px] w-full bg-[#1A1612]" />

                <div className="flex items-baseline justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span
                      style={{ fontFamily: "var(--font-unbounded)" }}
                      className="text-[15px] font-black uppercase tracking-[0.05em] text-[#1A1612]"
                    >
                      Total
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1612]/50">
                      incl. tax · one-time · no subscription
                    </span>
                  </div>
                  <span
                    style={{ fontFamily: "var(--font-price)" }}
                    className="text-[36px] leading-none tabular-nums text-[#1A1612]"
                  >
                    <span
                      className="text-[0.48em] italic align-[0.32em] mr-[0.04em] opacity-70"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      ₹
                    </span>
                    <AnimatedMoney value={selected.price} noSymbol />
                  </span>
                </div>

                <Dashes />

                {/* ── 4-STEP FLOW INDICATOR ── */}
                <div className="mb-4 grid grid-cols-4 gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#1A1612]/60">
                  <FlowStep n="1" label="Chat" sub="WhatsApp" />
                  <FlowStep n="2" label="Scope" sub="Quote + sign" />
                  <FlowStep n="3" label="Pay" sub="Razorpay" />
                  <FlowStep n="4" label="Ship" sub={selected.delivery} />
                </div>

                {/* ── START BUTTON — opens WhatsApp ── */}
                <a
                  href={`https://wa.me/919999999999?text=${encodeURIComponent(
                    `Hi 24dev, I'm interested in the ${selected.label} tier (₹${selected.priceDisplay}). Here's what I need:\n\n[Describe your site, share references or Figma, any deadline]`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex w-full items-center justify-between gap-2 overflow-hidden bg-[#1A1612] px-5 py-4 text-[#F5EFE1] transition-colors hover:bg-[#25A050]"
                  style={{ fontFamily: "var(--font-unbounded)" }}
                >
                  <span className="flex items-center gap-2">
                    <WhatsAppIcon />
                    <span className="text-[13px] font-black uppercase tracking-[0.1em]">
                      Start on WhatsApp
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span
                      className="text-[15px] leading-none tabular-nums"
                      style={{ fontFamily: "var(--font-price)" }}
                    >
                      <span
                        className="text-[0.55em] italic align-[0.24em] mr-[0.03em] opacity-80"
                        style={{ fontFamily: "var(--font-accent)" }}
                      >
                        ₹
                      </span>
                      {selected.priceDisplay}
                    </span>
                    <span className="text-[14px] leading-none">→</span>
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                </a>

                <p className="mt-2.5 text-center text-[10px] uppercase tracking-[0.24em] text-[#1A1612]/70">
                  We chat · confirm scope · send Razorpay · ship
                </p>

                <Dashes />

                {/* ── TERMS ── */}
                <ul className="space-y-1 text-[11px] uppercase tracking-[0.18em] text-[#1A1612]/70">
                  <li>» Delivered in tier window or 50% back</li>
                  <li>» Code + design — yours forever</li>
                  <li>» No retainers · no calls · no scope creep</li>
                  <li>» Bigger build? → 24dev.in</li>
                </ul>

                <Dashes />

                {/* ── THANK YOU / BARCODE ── */}
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-[0.5em] text-[#1A1612]">
                    ✲ Thank you ✲
                  </p>
                  <p
                    className="mt-2 italic text-[13px] text-[#1A1612]/70"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    &ldquo;Websites, but faster.&rdquo;
                  </p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.26em] text-[#1A1612]/50">
                    24dev.in
                  </p>

                  <div className="mt-4 flex justify-center">
                    <Barcode />
                  </div>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[#1A1612]/50 tabular-nums">
                    24D-{selected.code}-2026 · {today}
                  </p>
                </div>
              </div>
            </div>

            <TornEdge bottom />
          </motion.div>
        </div>

        {/* Signature line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-2 text-center"
        >
          <span
            className="font-[family-name:var(--font-accent)] italic text-[clamp(1.125rem,1.6vw,1.375rem)] text-fog -rotate-[1.5deg]"
          >
            — Signed, the 24dev crew ✍
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-dim">
            Last receipt shipped{" "}
            <span className="text-orange">17h ago</span> · orbitscale.io
          </span>
        </motion.div>

        {/* Help text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 mx-auto max-w-md text-center font-body text-[13px] leading-relaxed text-fog-dim"
        >
          Tap a tier on the receipt to update it. WhatsApp link opens when
          you&apos;re ready.
        </motion.p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// GhostReceipt — faint stacked receipts behind the main one
// ─────────────────────────────────────────────────────────────

function GhostReceipt({
  offsetX,
  offsetY,
  rotate,
  opacity,
}: {
  offsetX: number;
  offsetY: number;
  rotate: number;
  opacity: number;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute w-full max-w-[440px] h-[720px]"
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
        filter:
          "drop-shadow(0 30px 60px rgba(0,0,0,0.3)) drop-shadow(0 8px 20px rgba(0,0,0,0.2))",
      }}
    >
      <div className="h-full bg-[#E8DFC9]" />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// ReceiptItem — single selectable item row
// ─────────────────────────────────────────────────────────────

function ReceiptItem({
  tier,
  selected,
  onSelect,
}: {
  tier: Tier;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative block w-full cursor-pointer px-2 py-2.5 text-left transition-colors ${
        selected ? "bg-orange/15" : "hover:bg-[#1A1612]/[0.04]"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-2 min-w-0">
          <span
            className={`text-[12px] leading-none shrink-0 ${
              selected ? "text-orange" : "text-[#1A1612]/30"
            }`}
            aria-hidden
          >
            {selected ? "●" : "○"}
          </span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#1A1612]/60">
            24D-{tier.code}
          </span>
          <span
            style={{ fontFamily: "var(--font-unbounded)" }}
            className={`text-[12px] font-black uppercase tracking-[0.06em] ${
              selected ? "text-orange" : "text-[#1A1612]"
            }`}
          >
            {tier.label}
          </span>
          {tier.recommended && (
            <span
              className={`text-[10px] leading-none ${
                selected ? "text-orange" : "text-[#1A1612]/60"
              }`}
              aria-hidden
            >
              ★
            </span>
          )}
        </div>
        <span
          style={{ fontFamily: "var(--font-price)" }}
          className={`shrink-0 text-[18px] leading-none tabular-nums ${
            selected ? "text-orange" : "text-[#1A1612]"
          }`}
        >
          <span
            className="text-[0.55em] italic align-[0.25em] mr-[0.03em] opacity-70"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            ₹
          </span>
          {tier.priceDisplay}
        </span>
      </div>
      <p
        className={`mt-1 ml-[22px] italic text-[12px] leading-tight ${
          selected ? "text-[#1A1612]" : "text-[#1A1612]/60"
        }`}
        style={{ fontFamily: "var(--font-accent)" }}
      >
        {tier.tagline}
      </p>
      <p className="mt-1 ml-[22px] text-[10px] uppercase tracking-[0.22em] text-[#1A1612]/50">
        {tier.delivery} · {tier.revisions}
      </p>
      <ul
        className={`mt-2 ml-[22px] space-y-0.5 text-[11px] uppercase tracking-[0.16em] ${
          selected ? "text-[#1A1612]/80" : "text-[#1A1612]/50"
        }`}
      >
        {tier.features.map((f) => (
          <li key={f} className="flex items-baseline gap-1.5">
            <span className="shrink-0 opacity-70">→</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Flow step pills
// ─────────────────────────────────────────────────────────────

function FlowStep({ n, label, sub }: { n: string; label: string; sub: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-0.5 border border-[#1A1612]/30 bg-[#1A1612]/[0.03] px-2 py-2 text-center">
      <span className="text-[10px] tracking-[0.14em] text-[#1A1612]/50">
        STEP {n}
      </span>
      <span
        className="text-[10px] font-black uppercase tracking-[0.1em] text-[#1A1612]"
        style={{ fontFamily: "var(--font-unbounded)" }}
      >
        {label}
      </span>
      <span className="text-[10px] tracking-[0.16em] text-[#1A1612]/60">
        {sub}
      </span>
    </div>
  );
}

function FlowArrow() {
  return (
    <span
      aria-hidden
      className="self-center text-[10px] text-[#1A1612]/40"
    >
      →
    </span>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Dashes — row of em-dashes
// ─────────────────────────────────────────────────────────────

function Dashes() {
  return (
    <div
      aria-hidden
      className="my-4 h-px w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, #1A1612 0 5px, transparent 5px 10px)",
        opacity: 0.4,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// TornEdge — perforated paper edge
// ─────────────────────────────────────────────────────────────

function TornEdge({ bottom = false }: { bottom?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      className={`block h-[12px] w-full text-[#F5EFE1] ${bottom ? "rotate-180" : ""}`}
    >
      <path
        d="M0,10 L0,6 Q2.5,3 5,6 T10,6 T15,6 T20,6 T25,6 T30,6 T35,6 T40,6 T45,6 T50,6 T55,6 T60,6 T65,6 T70,6 T75,6 T80,6 T85,6 T90,6 T95,6 T100,6 L100,10 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Barcode
// ─────────────────────────────────────────────────────────────

function Barcode() {
  const widths = [2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 2, 1, 1];
  return (
    <div className="flex items-end gap-[2px] h-9">
      {widths.map((w, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            delay: 1.4 + i * 0.025,
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="bg-[#1A1612] origin-bottom"
          style={{ width: `${w}px`, height: "100%" }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AnimatedMoney
// ─────────────────────────────────────────────────────────────

function AnimatedMoney({
  value,
  noSymbol,
}: {
  value: number;
  noSymbol?: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {!noSymbol && "₹"}
        {value.toLocaleString("en-IN")}
      </motion.span>
    </AnimatePresence>
  );
}
