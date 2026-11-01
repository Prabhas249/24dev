"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { PortfolioDeck } from "@/components/atoms/PortfolioDeck";
import { BorderBeam } from "@/components/magicui/border-beam";
import Particles from "@/components/magicui/particles";

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-stripe-radial pt-32 pb-16 md:pt-40 md:pb-24"
    >
      {/* Subtle particles background — orange tint, low density */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={40}
        ease={80}
        color="#FF6B35"
        refresh={false}
      />

      <div className="container-24dev">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT — copy + CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
            {/* Live counter badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.3, 0, 0.2, 1] }}
              className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-ink-raised/60 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-fog-muted"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
              </span>
              {hero.badge}
            </motion.div>

            {/* Headline — Stripe-light weight, 2-line layout */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.3, 0, 0.2, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] tracking-[-0.04em] text-fog leading-[1.02]"
            >
              Beautifully crafted websites.
              <br />
              <span className="italic font-accent text-fog-muted">Delivered before dinner.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.3, 0, 0.2, 1] }}
              className="text-lg md:text-xl text-fog-muted max-w-xl leading-relaxed"
            >
              {hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.3, 0, 0.2, 1] }}
              className="flex flex-wrap items-center gap-3 mt-2"
            >
              <Link
                href={hero.cta.primary.href}
                className="relative group inline-flex items-center gap-2 rounded-full bg-fog px-6 py-3 text-sm font-medium text-ink shadow-md transition-all ease-stripe duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {hero.cta.primary.text}
                  <ArrowRight className="h-4 w-4 transition-transform ease-stripe group-hover:translate-x-0.5" />
                </span>
                <BorderBeam
                  size={80}
                  duration={6}
                  colorFrom="#FF6B35"
                  colorTo="#B8FF38"
                />
              </Link>

              <Link
                href={hero.cta.secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-raised px-6 py-3 text-sm font-medium text-fog transition-all ease-stripe duration-200 hover:bg-ink-soft hover:border-fog active:scale-[0.98]"
              >
                {hero.cta.secondary.text}
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-2 text-xs text-fog-dim mt-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-orange" />
              <span>{hero.trustStrip}</span>
            </motion.div>
          </div>

          {/* RIGHT — draggable portfolio deck (clipped to column) */}
          <div className="lg:col-span-5 relative flex items-center justify-center h-[420px] md:h-[520px] lg:h-[560px] overflow-hidden rounded-xl">
            <div className="relative w-full h-full flex items-center justify-center">
              <PortfolioDeck />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
