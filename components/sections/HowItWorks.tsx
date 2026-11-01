"use client";

import { motion } from "motion/react";

type Step = {
  number: string;
  label: string;
  title: string;
  body: string;
  time: string;
};

const steps: Step[] = [
  {
    number: "01",
    label: "Chat",
    title: "WhatsApp us. In plain English.",
    body: "Tell us what you need. A landing page? A portfolio? A multi-page site? Share references, copy, brand colors. Takes 5 minutes.",
    time: "~5 min",
  },
  {
    number: "02",
    label: "Scope",
    title: "We confirm the shape.",
    body: "You hear back within an hour. We'll confirm the tier that fits (Starter / Launch / Pro), clarify anything missing, and send the exact scope in writing.",
    time: "< 1 hour",
  },
  {
    number: "03",
    label: "Pay",
    title: "Razorpay link. One-time.",
    body: "100% upfront via UPI, card, or netbanking. GST-compliant invoice hits your inbox instantly. No retainers, no surprise fees. What you pay is all you pay.",
    time: "~2 min",
  },
  {
    number: "04",
    label: "Build",
    title: "We ship, in real time.",
    body: "Clock starts. You get WhatsApp updates as we go. Custom design, real Next.js code, deployed to Vercel. You see the preview URL the moment it's live.",
    time: "6–36 hours",
  },
  {
    number: "05",
    label: "Own",
    title: "It's yours. Forever.",
    body: "Full codebase on GitHub in your name. Domain + hosting credentials handed over. No lock-ins, no ongoing fees. Maintain it yourself or hand it to any developer.",
    time: "Forever",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative border-t border-line bg-ink py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-line pb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            How it works
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
            5 steps · Start to ship
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
            Start to ship,
            <br />
            <span className="font-[family-name:var(--font-accent)] italic font-normal">
              in five moves.
            </span>
          </h2>
          <p className="max-w-md font-body text-[clamp(0.9375rem,1.3vw,1.0625rem)] leading-relaxed text-fog-muted">
            The whole process takes a day. No calls. No scope documents to
            sign. Just WhatsApp → payment → delivery. That&apos;s the entire
            workflow — nothing hidden.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-16 border-t border-line-strong md:mt-20">
          {steps.map((step, i) => (
            <StepRow key={step.number} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-start gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-md font-[family-name:var(--font-accent)] italic text-[clamp(1.125rem,1.6vw,1.5rem)] leading-snug text-fog">
            The whole flow fits in a single afternoon.
          </p>
          <a
            href="https://wa.me/919999999999?text=Hi%2024dev%2C%20I%20want%20to%20start"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#0F0F0F] transition-colors hover:bg-orange-soft"
          >
            Start step 01
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function StepRow({
  step,
  index,
  isLast,
}: {
  step: Step;
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`grid grid-cols-[auto_1fr] gap-4 py-10 md:grid-cols-[auto_auto_1fr_auto] md:gap-10 md:py-12 ${
        isLast ? "" : "border-b border-line"
      }`}
    >
      {/* Number */}
      <div className="flex shrink-0 items-baseline gap-2 md:self-start md:pt-2">
        <span className="font-display text-[clamp(2rem,3vw,2.75rem)] font-black leading-none tracking-[-0.03em] text-fog">
          {step.number}
        </span>
        <span
          className="hidden h-px w-8 bg-line-strong md:inline-block mt-[22px]"
          aria-hidden
        />
      </div>

      {/* Label */}
      <div className="hidden md:flex flex-col gap-1 md:self-start md:pt-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
          — {step.label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog-dim">
          {step.time}
        </span>
      </div>

      {/* Content */}
      <div className="col-start-2 md:col-start-3">
        {/* Mobile label row */}
        <div className="mb-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] md:hidden">
          <span className="text-orange">— {step.label}</span>
          <span className="text-fog-dim">·</span>
          <span className="text-fog-dim">{step.time}</span>
        </div>
        <h3 className="font-display text-[clamp(1.375rem,2.4vw,2rem)] font-bold leading-[1.1] tracking-[-0.025em] text-fog">
          {step.title}
        </h3>
        <p className="mt-3 font-body text-[15px] leading-relaxed text-fog-muted max-w-prose">
          {step.body}
        </p>
      </div>
    </motion.div>
  );
}
