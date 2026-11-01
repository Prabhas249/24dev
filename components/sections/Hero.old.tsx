"use client";

import { useRef } from "react";
import { CountdownTimer } from "@/components/motion/CountdownTimer";
import { KineticHeadline } from "@/components/motion/KineticHeadline";
import { PortfolioDeck } from "@/components/atoms/PortfolioDeck";
import { motion } from "motion/react";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative h-[100svh] min-h-[720px] flex flex-col overflow-hidden pt-16"
    >
      {/* subtle paper texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,15,15,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 md:px-10">
        {/* TIER STRIP */}
        <div className="border-t border-line py-4 relative z-[200] bg-ink">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-fog-dim md:w-[88px] shrink-0">
              — Tiers
            </span>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8 flex-1">
              <TierCard label="Starter" price="₹1,999" />
              <Divider />
              <TierCard label="Launch" price="₹4,999" highlight />
              <Divider />
              <TierCard label="Pro" price="₹9,999" />
            </div>

            <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.22em] text-fog-dim/80 ml-auto whitespace-nowrap">
              Need more? →{" "}
              <a
                href="https://24dev.in"
                className="text-fog underline decoration-fog-dim underline-offset-2 transition-colors hover:text-orange"
              >
                24dev.in
              </a>
            </span>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="relative grid flex-1 grid-cols-1 gap-8 pt-8 md:grid-cols-[1fr_1.05fr] md:gap-10 md:pt-10">
          {/* LEFT — headline + timer + ctas */}
          <div className="flex flex-col justify-center gap-10">
            <KineticHeadline
              lines={[
                ["Websites", "from"],
                [{ text: "₹1,999", priceStyle: true, accent: true }],
                [
                  { text: "Live", italic: true, serif: true },
                  { text: "in", italic: true, serif: true },
                  { text: "24h.", bold: true },
                ],
              ]}
              className="text-[clamp(2.5rem,9.5vw,9.5rem)] text-left"
              baseDelay={0.5}
              wordStagger={0.1}
              lineGap={0.12}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-[150] flex flex-wrap items-end gap-6"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-dim">
                  ⏱ Live delivery clock
                </span>
                <CountdownTimer />
              </div>

              <div className="flex flex-wrap gap-3 ml-auto">
                <a
                  href="#pricing"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-orange px-6 py-3 text-sm font-medium text-[#0F0F0F] transition-all hover:bg-orange-soft"
                >
                  <span className="relative z-10">See pricing</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                  <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-soft/40 px-6 py-3 text-sm font-medium text-fog backdrop-blur transition-all hover:bg-ink-raised hover:border-fog-dim"
                >
                  See work
                  <span className="transition-transform group-hover:translate-y-0.5" aria-hidden>↓</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — portfolio deck */}
          <div className="relative min-h-[420px] md:min-h-0">
            <PortfolioDeck constraintsRef={heroRef} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TierCard({
  label,
  price,
  highlight,
}: {
  label: string;
  price: string;
  delivery?: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-2 group relative">
      {highlight && (
        <span className="absolute -top-3.5 left-0 rounded-full border border-orange/50 bg-orange/10 px-1.5 py-[1px] font-mono text-[10px] uppercase tracking-[0.22em] text-orange leading-none">
          ★ most
        </span>
      )}
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
          highlight ? "text-orange/80" : "text-fog-muted"
        }`}
      >
        {label}
      </span>
      <span
        className={`font-display font-bold tracking-[-0.03em] text-[15px] ${
          highlight ? "text-orange" : "text-fog"
        }`}
      >
        {price}
      </span>
    </div>
  );
}

function Divider() {
  return <span className="hidden md:inline-block h-5 w-px bg-line" aria-hidden />;
}
