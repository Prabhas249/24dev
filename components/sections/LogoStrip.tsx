"use client";

import { motion } from "motion/react";

const brands = [
  "Orbitscale",
  "Finch Studio",
  "Ember",
  "Claypot",
  "Mosaic",
  "Pulse",
  "Halfpace",
  "North Mount",
  "Rio Dunes",
  "Nomad",
];

export function LogoStrip() {
  return (
    <section
      aria-label="Trusted by founders"
      className="relative border-t border-line bg-ink py-10 md:py-14 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-6 md:gap-10"
        >
          {/* Label */}
          <div className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-fog-dim">
            <span className="h-px w-6 bg-orange" />
            Shipped for
          </div>

          {/* Fade-masked marquee */}
          <div
            className="relative flex-1 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
            }}
          >
            <div className="flex animate-marquee whitespace-nowrap">
              {[...brands, ...brands].map((brand, i) => (
                <span
                  key={i}
                  className="font-display text-[clamp(1.125rem,2vw,1.5rem)] font-bold tracking-[-0.02em] text-fog-muted mx-8 shrink-0"
                >
                  {brand}
                  <span className="ml-8 inline-block align-middle text-[10px] text-orange">
                    ●
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Count */}
          <div className="hidden md:flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-fog-dim">
            <span className="text-orange">247</span>
            shipped
          </div>
        </motion.div>
      </div>
    </section>
  );
}
