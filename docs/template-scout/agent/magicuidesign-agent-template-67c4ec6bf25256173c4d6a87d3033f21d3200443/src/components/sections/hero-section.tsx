"use client";
import { WorkMarquee } from "@/components/sections/work-marquee";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export function HeroSection() {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="w-full relative">
      <div className="relative w-full -mt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background pointer-events-none"></div>
        </div>
        <div className="relative z-10 pt-44 pb-32 max-w-3xl mx-auto w-full flex flex-col gap-10 items-center justify-center">
          <p className="border border-border bg-accent rounded-full text-sm h-8 px-3 flex items-center gap-2">
            {hero.badgeIcon}
            {hero.badge}
          </p>
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tighter text-balance text-center text-primary">
              {hero.title}
            </h1>
            <p className="text-base md:text-lg text-center text-muted-foreground font-medium text-balance leading-relaxed tracking-tight">
              {hero.description}
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <Link
              href={hero.cta.primary.href}
              className="group bg-secondary h-10 flex items-center justify-center gap-1.5 text-sm font-medium tracking-tight rounded-full text-primary-foreground dark:text-secondary-foreground px-5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.08),0_1px_1px_rgba(16,24,40,0.10)] border border-white/[0.12] hover:bg-secondary/90 hover:scale-[1.02] transition-all ease-out active:scale-95"
            >
              <span className="opacity-90">Start at</span>
              <span className="font-semibold tabular-nums tracking-tight">₹1,999</span>
              <span className="opacity-80 transition-transform ease-out group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href={hero.cta.secondary.href}
              className="h-10 flex items-center justify-center px-5 text-sm font-medium tracking-tight text-primary rounded-full transition-all ease-out active:scale-95 bg-white dark:bg-background border border-[#E5E7EB] dark:border-[#27272A] hover:bg-white/80 dark:hover:bg-background/80"
            >
              {hero.cta.secondary.text}
            </Link>
          </div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 md:pb-16 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Recent work
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tighter text-balance text-primary mb-3">
            Hand-built. Live in hours.
          </h2>
          <p className="text-sm md:text-base text-muted-foreground text-balance max-w-xl mx-auto">
            Hosted on the client&apos;s own Vercel. They own everything.
          </p>
        </div>
      </div>
      <WorkMarquee />
    </section>
  );
}
