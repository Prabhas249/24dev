"use client";

import { motion } from "motion/react";
import { Signature } from "@/components/atoms/Flourish";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative border-t border-line bg-ink py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-line pb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            Why we started
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
            Bangalore · Est. 2025
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 pt-16 md:grid-cols-[1fr_1.3fr] md:gap-20 md:pt-20">
          {/* Left — eyebrow + byline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 md:sticky md:top-28 md:self-start"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-dim">
              <span className="h-px w-6 bg-orange" />
              The cause
            </span>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.86] tracking-[-0.04em] text-fog">
              Premium design
              <br />
              <span className="font-[family-name:var(--font-accent)] italic font-normal">
                shouldn&apos;t be
              </span>
              <br />
              a privilege.
            </h2>
            <p className="font-[family-name:var(--font-accent)] italic text-[clamp(1rem,1.4vw,1.25rem)] text-fog-muted leading-snug">
              — Prabhas, founder
              <br />
              <span className="text-fog-dim not-italic text-sm">Bangalore · 2025</span>
            </p>
            <Signature className="mt-2 h-10 w-40" color="var(--color-fog)" />
          </motion.div>

          {/* Right — the story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7 font-body text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed text-fog-muted"
          >
            <p>
              In 2025, we watched Indian founders stuck with{" "}
              <span className="text-fog">three bad options</span> for getting
              a website:
            </p>

            <ul className="space-y-3 border-l border-orange/50 pl-5">
              <li className="text-fog-muted">
                <span className="text-orange mr-2">→</span>
                <span className="text-fog">Agencies</span> charging ₹50,000+,
                taking weeks of calls, slide decks, and revisions
              </li>
              <li className="text-fog-muted">
                <span className="text-orange mr-2">→</span>
                <span className="text-fog">Freelancers</span> on Fiverr and
                Upwork who ghost halfway through
              </li>
              <li className="text-fog-muted">
                <span className="text-orange mr-2">→</span>
                <span className="text-fog">Wix and Squarespace</span>{" "}
                templates that scream &ldquo;template&rdquo;
              </li>
            </ul>

            <p>
              None were fair. None were fast. None felt{" "}
              <span className="font-[family-name:var(--font-accent)] italic text-fog">
                built for India.
              </span>
            </p>

            <p className="font-[family-name:var(--font-accent)] italic text-[clamp(1.25rem,1.8vw,1.625rem)] leading-snug text-fog pt-2">
              So we built 24dev.
            </p>

            <p>
              We believe every Indian founder — whether you code or not —
              deserves a premium-looking site at a fair price, shipped in 24
              hours. Not next month. Not after three calls. Tomorrow.
            </p>

            <p>
              Today, 24dev is <span className="text-fog">one studio, two products</span>:
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="border border-line p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-dim">
                  Premium tier
                </p>
                <p className="mt-2 font-display text-[18px] font-bold tracking-tight text-fog">
                  <a
                    href="https://24dev.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange transition-colors"
                  >
                    24dev.in
                  </a>
                </p>
                <p className="mt-1 text-[13px] text-fog-muted leading-snug">
                  Custom builds · SaaS · bigger brands. From ₹25,000.
                  Call-scoped.
                </p>
              </div>
              <div className="border border-orange/50 bg-orange/10 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
                  Fast tier — here
                </p>
                <p className="mt-2 font-display text-[18px] font-bold tracking-tight text-fog">
                  This site
                </p>
                <p className="mt-1 text-[13px] text-fog-muted leading-snug">
                  Fixed-price, self-serve websites. ₹1,999–₹9,999. Shipped in
                  24 hours.
                </p>
              </div>
            </div>

            <p className="font-[family-name:var(--font-accent)] italic text-[clamp(1rem,1.3vw,1.25rem)] text-fog pt-2">
              Same philosophy. Different price tag. Same hands, both ways.
            </p>

            <div className="pt-6 flex items-center gap-3 border-t border-line">
              <a
                href="/about"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fog transition-colors hover:text-orange"
              >
                Read the full story
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
