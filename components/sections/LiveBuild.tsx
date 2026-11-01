"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type BuildStep = {
  cmd: string;
  lines: string[];
  preview: "empty" | "nav" | "hero" | "cta" | "live";
};

const buildSequence: BuildStep[] = [
  {
    cmd: "$ pnpm create 24dev-launch",
    lines: ["⏱  19:42:11 · starting build", "✓  brief received via WhatsApp"],
    preview: "empty",
  },
  {
    cmd: "$ code src/page.tsx",
    lines: [
      "// Nav + Logo",
      "<Nav brand='your-brand' />",
    ],
    preview: "nav",
  },
  {
    cmd: "$ pnpm add sections/Hero",
    lines: [
      "<Hero",
      "  title='Your headline'",
      "  subtitle='Live in 24h'",
      "/>",
    ],
    preview: "hero",
  },
  {
    cmd: "$ pnpm add sections/Cta",
    lines: [
      "<Cta href='/start'>",
      "  Start now →",
      "</Cta>",
    ],
    preview: "cta",
  },
  {
    cmd: "$ vercel deploy --prod",
    lines: [
      "✓  deploying...",
      "✓  live at your-brand.com",
      "⏱  shipped in 19:47:03",
    ],
    preview: "live",
  },
];

export function LiveBuild() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % buildSequence.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const current = buildSequence[step];
  const isLive = current.preview === "live";

  return (
    <section
      id="live-build"
      className="relative border-t border-line bg-ink py-20 md:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-line pb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            Watch it ship
          </span>
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
            </span>
            Live demo · Looping
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
            Code up.
            <br />
            <span className="font-[family-name:var(--font-accent)] italic font-normal">
              Site live.
            </span>
            <br />
            In hours.
          </h2>
          <p className="max-w-md font-body text-[clamp(0.9375rem,1.3vw,1.0625rem)] leading-relaxed text-fog-muted">
            This is a rough loop of what happens when you send us a brief.
            Code gets written, preview updates live, deployed to Vercel. Out
            the door.
          </p>
        </motion.div>

        {/* Split: terminal + preview */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2">
          {/* TERMINAL */}
          <div className="overflow-hidden rounded-xl border border-line-strong bg-[#0C0C0C] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)]">
            {/* chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#1A1A1A] px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                ~/24dev · terminal
              </span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-orange">
                step {step + 1}/5
              </span>
            </div>

            {/* content */}
            <div className="min-h-[280px] p-5 font-mono text-[13px] leading-relaxed md:min-h-[320px] md:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`term-${step}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2"
                >
                  {/* Command */}
                  <p className="text-white">
                    <span className="text-orange">➤</span>{" "}
                    <TypewriterLine text={current.cmd} delay={0} />
                  </p>

                  {/* Output lines */}
                  {current.lines.map((line, i) => (
                    <p
                      key={i}
                      className={`${
                        line.startsWith("//")
                          ? "text-[#86B67A]"
                          : line.startsWith("<")
                            ? "text-[#BCA0DB]"
                            : line.startsWith("✓")
                              ? "text-[#27C93F]"
                              : line.startsWith("⏱")
                                ? "text-orange"
                                : "text-white/80"
                      }`}
                    >
                      <TypewriterLine
                        text={line}
                        delay={500 + i * 350}
                      />
                    </p>
                  ))}

                  {/* Blinking cursor */}
                  <span className="inline-block h-[1em] w-[0.5em] bg-orange animate-pulse align-middle" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="overflow-hidden rounded-xl border border-line-strong bg-ink-raised shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]">
            {/* chrome */}
            <div className="flex items-center gap-2 border-b border-line bg-ink-soft px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="ml-3 flex flex-1 items-center gap-1.5 rounded border border-line bg-ink-raised px-2 py-0.5">
                <span className="h-1 w-1 rounded-full bg-fog-dim" />
                <span className="font-mono text-[10px] text-fog-muted">
                  your-brand.com
                </span>
              </div>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.22em] transition-colors ${
                  isLive ? "text-[#27C93F]" : "text-fog-dim"
                }`}
              >
                {isLive ? "● live" : "● building"}
              </span>
            </div>

            {/* Preview content */}
            <div className="relative min-h-[280px] bg-ink-raised p-6 md:min-h-[320px] md:p-8">
              <AnimatePresence>
                {/* Nav */}
                {(["nav", "hero", "cta", "live"] as readonly string[]).includes(current.preview) && (
                  <motion.div
                    key="nav"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between"
                  >
                    <span className="font-display text-sm font-black tracking-tight text-fog">
                      your-brand
                      <span className="text-orange">.</span>
                    </span>
                    <div className="flex items-center gap-3 font-mono text-[10px] text-fog-muted">
                      <span>Pricing</span>
                      <span>FAQ</span>
                    </div>
                  </motion.div>
                )}

                {/* Hero */}
                {(["hero", "cta", "live"] as readonly string[]).includes(current.preview) && (
                  <motion.div
                    key="hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-8"
                  >
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-black leading-[0.95] tracking-[-0.03em] text-fog">
                      Your headline
                    </h3>
                    <p className="mt-2 font-[family-name:var(--font-accent)] italic text-sm text-fog-muted">
                      Live in 24 hours.
                    </p>
                  </motion.div>
                )}

                {/* CTA */}
                {(["cta", "live"] as readonly string[]).includes(current.preview) && (
                  <motion.div
                    key="cta"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="mt-5"
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-[13px] font-medium text-[#0F0F0F]">
                      Start now
                      <span>→</span>
                    </span>
                  </motion.div>
                )}

                {/* Live overlay */}
                {isLive && (
                  <motion.div
                    key="live"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full border border-[#27C93F]/40 bg-[#27C93F]/10 px-3 py-1"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#27C93F] opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#27C93F]" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#27C93F]">
                      Deployed
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Progress + notes */}
        <div className="mt-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          {/* Step indicators */}
          <div className="flex items-center gap-2">
            {buildSequence.map((_, i) => (
              <motion.span
                key={i}
                animate={{
                  width: i === step ? 32 : 10,
                  backgroundColor: i === step ? "#FF6B35" : "rgba(15,15,15,0.25)",
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-1 rounded-full"
              />
            ))}
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-dim">
            Looped demo · not the actual build
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Typewriter line — animates text character-by-character
// ─────────────────────────────────────────────────────────────

function TypewriterLine({ text, delay }: { text: string; delay: number }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    const startTimer = setTimeout(() => {
      const id = setInterval(() => {
        setVisible((v) => {
          if (v >= text.length) {
            clearInterval(id);
            return v;
          }
          return v + 1;
        });
      }, 20);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [text, delay]);

  return <span>{text.slice(0, visible)}</span>;
}
