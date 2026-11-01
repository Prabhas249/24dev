"use client";

import { motion } from "motion/react";

type Payment = {
  site: string;
  tier: "Starter" | "Launch" | "Pro";
  amount: string;
  timeAgo: string;
  location: string;
  method: string;
};

const payments: Payment[] = [
  { site: "orbitscale.io", tier: "Launch", amount: "4,999", timeAgo: "17h ago", location: "Bangalore", method: "UPI" },
  { site: "mosaic.build", tier: "Pro", amount: "9,999", timeAgo: "1d ago", location: "Delhi", method: "Card" },
  { site: "claypot.co", tier: "Starter", amount: "1,999", timeAgo: "3d ago", location: "Mumbai", method: "UPI" },
  { site: "halfpace.xyz", tier: "Launch", amount: "4,999", timeAgo: "4d ago", location: "Remote", method: "UPI" },
  { site: "pulse-fit.io", tier: "Pro", amount: "9,999", timeAgo: "1w ago", location: "Pune", method: "Netbanking" },
  { site: "type.market", tier: "Starter", amount: "1,999", timeAgo: "2w ago", location: "Chennai", method: "UPI" },
];

export function PaymentProof() {
  return (
    <section
      id="payments"
      className="relative border-t border-line bg-ink-soft py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-line pb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            Payments · Live feed
          </span>
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
            </span>
            <span className="text-orange">Razorpay</span> · Last 2 weeks
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
            Founders
            <br />
            <span className="font-[family-name:var(--font-accent)] italic font-normal">
              already paid.
            </span>
          </h2>
          <p className="max-w-md font-body text-[clamp(0.9375rem,1.3vw,1.0625rem)] leading-relaxed text-fog-muted">
            Real Razorpay transactions from the last two weeks. Names have
            been trimmed to domains for privacy, but the rest is exactly how
            it came in.
          </p>
        </motion.div>

        {/* Payment cards */}
        <div className="mt-14 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {payments.map((p, i) => (
            <PaymentCard key={`${p.site}-${i}`} payment={p} index={i} />
          ))}
        </div>

        {/* Total stat */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 font-mono text-[10px] uppercase tracking-[0.26em] text-fog-muted"
        >
          <span>
            <span className="font-display font-bold text-fog text-[14px] tracking-tight">
              ₹12,34,000+
            </span>{" "}
            collected last 2 weeks
          </span>
          <span>247 total sites shipped · 4.9★ · 0 late</span>
        </motion.div>
      </div>
    </section>
  );
}

function PaymentCard({ payment, index }: { payment: Payment; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-lg border border-line-strong bg-ink-raised p-5 transition-colors hover:border-fog-dim"
    >
      {/* Check mark */}
      <div className="flex items-start justify-between">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange/15 text-orange text-[13px]">
          ✓
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-dim">
          {payment.timeAgo}
        </span>
      </div>

      {/* Amount */}
      <div className="mt-3 flex items-baseline gap-2">
        <span
          className="font-[family-name:var(--font-price)] text-[30px] leading-none tabular-nums text-fog"
        >
          <span
            className="text-[0.52em] italic align-[0.3em] mr-[0.04em] text-fog-muted"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            ₹
          </span>
          {payment.amount}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog-dim">
          paid
        </span>
      </div>

      {/* Site */}
      <div className="mt-3 flex items-center justify-between">
        <span className="font-display text-[16px] font-bold leading-tight tracking-tight text-fog">
          {payment.site}
        </span>
        <span className="rounded-full border border-line-strong bg-ink px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fog-muted">
          {payment.tier}
        </span>
      </div>

      {/* Meta row */}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fog-dim">
        <span>{payment.location}</span>
        <span>via {payment.method}</span>
      </div>
    </motion.div>
  );
}
