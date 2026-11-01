"use client";

import { motion } from "motion/react";

const urls = [
  "linear.app", "vercel.com", "stripe.com", "framer.com", "notion.so",
  "arc.net", "raycast.com", "supabase.com", "resend.com", "cal.com",
  "orbitscale.io", "finch.studio", "ember-ai.app", "claypot.co", "northmount.in",
  "ledger-hq.app", "rio-dunes.co", "mosaic.build", "halfpace.xyz", "pulse-fit.io",
  "kite.design", "nomad-stays.co", "type.market", "signal-lab.ai", "founder.fm",
  "glow-coffee.co", "slate-studio.xyz", "vela.app", "harbor-hq.com", "north-rd.in",
];

const thumb = (url: string) =>
  `https://image.thum.io/get/width/240/crop/150/allowJPG/wait/2/https://${url}`;

export function SiteMosaic() {
  return (
    <section
      id="mosaic"
      className="relative border-t border-line bg-ink-soft py-20 md:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-baseline justify-between border-b border-line pb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            — 30 of 247 shipped
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
            Real sites · real founders
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 font-display text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.85] tracking-[-0.045em] text-fog max-w-4xl"
        >
          This many,{" "}
          <span className="font-[family-name:var(--font-accent)] italic font-normal">
            in six months.
          </span>
        </motion.h2>

        <div className="mt-14 grid grid-cols-3 gap-2 md:mt-16 md:grid-cols-6 md:gap-3 lg:grid-cols-10">
          {urls.map((url, i) => (
            <motion.a
              key={url}
              href={`https://${url}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              whileHover={{ scale: 1.08, zIndex: 10 }}
              transition={{
                duration: 0.45,
                delay: i * 0.025,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-md border border-line bg-ink-raised aspect-[16/10]"
            >
              <img
                src={thumb(url)}
                alt={url}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-1 left-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-fog opacity-0 transition-opacity group-hover:opacity-100">
                {url}
              </span>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-fog-dim"
        >
          ... + 217 more
        </motion.p>
      </div>
    </section>
  );
}
