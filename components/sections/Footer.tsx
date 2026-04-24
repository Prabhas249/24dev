"use client";

import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="relative border-t border-line-strong bg-ink">
      {/* Massive brand strip */}
      <div className="mx-auto max-w-[1400px] px-6 pt-20 md:px-10 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-line pb-16 md:pb-20"
        >
          <h3 className="font-display text-[clamp(4rem,18vw,18rem)] font-black leading-[0.8] tracking-[-0.06em] text-fog select-none">
            24
            <span className="font-body font-medium text-fog-muted tracking-tight">
              /dev
            </span>
            <span className="text-orange">.</span>
          </h3>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <p className="font-[family-name:var(--font-accent)] italic text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug text-fog-muted max-w-md">
              Websites, designed, built, and delivered in 24 hours. Fixed
              price. No calls.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-fog-dim">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
              </span>
              <span className="text-orange">5</span> slots left this week
            </div>
          </div>
        </motion.div>

        {/* 4-col grid */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4 md:gap-8 md:py-16">
          {/* Column 1 — Studio */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-fog-dim">
              — Studio
            </p>
            <ul className="mt-5 space-y-3 font-body text-[14px] text-fog">
              <li>Bangalore, India</li>
              <li>Est. 2025</li>
              <li>Remote-friendly</li>
              <li>
                <a
                  href="https://24dev.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-fog-muted transition-colors hover:text-orange"
                >
                  Premium tier → 24dev.in
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 — Sitemap */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-fog-dim">
              — Sitemap
            </p>
            <ul className="mt-5 space-y-3 font-body text-[14px] text-fog">
              <li>
                <a href="#work" className="transition-colors hover:text-orange">
                  Work
                </a>
              </li>
              <li>
                <a href="#pricing" className="transition-colors hover:text-orange">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-orange">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#testimonials" className="transition-colors hover:text-orange">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#start" className="transition-colors hover:text-orange">
                  Start
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 — Get in touch */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-fog-dim">
              — Get in touch
            </p>
            <ul className="mt-5 space-y-3 font-body text-[14px] text-fog">
              <li>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-orange"
                >
                  <WhatsAppIcon />
                  WhatsApp us
                </a>
              </li>
              <li>
                <a
                  href="mailto:hi@24dev.in"
                  className="transition-colors hover:text-orange"
                >
                  hi@24dev.in
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/24dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-orange"
                >
                  𝕏 @24dev
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/24dev.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-orange"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 — Fine print */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-fog-dim">
              — Fine print
            </p>
            <ul className="mt-5 space-y-3 font-body text-[14px] text-fog">
              <li>
                <a href="/privacy" className="transition-colors hover:text-orange">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="transition-colors hover:text-orange">
                  Terms
                </a>
              </li>
              <li>
                <a href="/refunds" className="transition-colors hover:text-orange">
                  Refunds
                </a>
              </li>
              <li className="text-fog-dim">
                GST: <span className="font-mono text-[12px]">TBA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col gap-4 border-t border-line py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-dim">
            © 2026 24dev · Built by 24dev · Bangalore
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-dim">
            <span className="text-fog">Shipped in 24 hours.</span> Always.
          </p>
        </div>
      </div>

      {/* Giant watermark at bottom */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden"
      >
        <p className="font-display text-[clamp(6rem,28vw,28rem)] font-black leading-[0.8] tracking-[-0.07em] text-fog/[0.03] text-center -mt-4 md:-mt-10">
          24DEV.
        </p>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
