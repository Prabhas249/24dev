"use client";

import { motion } from "motion/react";

type QA = {
  q: string;
  a: string;
};

const faqs: QA[] = [
  {
    q: "Can you really ship in 24 hours?",
    a: "Yes. Claude Code + a tight design system means builds take 2-6 hours of focused work. The rest is polish, QA, and Vercel deploy. We don't cut corners — the site ships when it's actually ready. 50% back if we miss.",
  },
  {
    q: "What if you miss the deadline?",
    a: "We refund 50% automatically. The brand is literally built on the 24-hour promise — we treat missing it as reputation damage, not a normal outcome. In 6 months of operation, we haven't had a late delivery.",
  },
  {
    q: "What exactly do I need to send you?",
    a: "Copy (your headline, sections, CTAs), brand colors if you have them, a logo or wordmark, and 1-2 reference sites you like. That's it. Send it on WhatsApp or drop a link.",
  },
  {
    q: "Can you redesign my existing site?",
    a: "Yes. Send your current URL, we'll ship a redesign in the same tier window. We preserve your SEO and content, just rebuild the frontend. Launch ₹4,999 covers most redesigns; Pro for bigger multi-page rebuilds.",
  },
  {
    q: "Can you write my copy too?",
    a: "We polish what you send for free. If you need copy from scratch: +₹999 for Starter, +₹1,999 for Launch (headline + all sections), +₹2,999 for Pro (multi-page). Or bring a copywriter and we'll just design & build.",
  },
  {
    q: "What tech stack do you use?",
    a: "Next.js 16 (React), Tailwind v4, Framer Motion, Vercel hosting. Clean modern stack that any dev can pick up. No proprietary tools, no vendor lock-in. You get the full Next.js repo on GitHub.",
  },
  {
    q: "Do I need a domain already?",
    a: "No. We help you buy one via Namecheap or GoDaddy (you own it, ~₹800-1,200/year). Or you can point an existing domain. Either way, we handle DNS setup and SSL — you just provide the name.",
  },
  {
    q: "How do you handle hosting?",
    a: "Vercel (free tier works for 99% of sites). You get the credentials — no lock-in with us. If traffic scales past free, Vercel Pro is $20/month (you manage). We don't markup hosting or charge ongoing fees.",
  },
  {
    q: "Do I own the code and design?",
    a: "100%. You get the full Next.js codebase on GitHub, all design files, all domain credentials. No lock-ins, no license fees, no monthly hosting through us. Move it anywhere, hand it to any developer — it's yours.",
  },
  {
    q: "Why is it so cheap?",
    a: "Because we've engineered away the expensive parts. No sales calls, no 2-week discovery phases, no account managers. Just you, a WhatsApp chat, a clear brief, and a shipped website. Claude Code does 5x the work per hour — we pass the savings to you.",
  },
  {
    q: "Do I get an invoice or GST receipt?",
    a: "Yes. Razorpay generates a GST-compliant invoice automatically, downloadable from their dashboard. Useful for business expense claims or input tax credit if you're GST-registered.",
  },
  {
    q: "Can I cancel after paying?",
    a: "Before work starts: full refund, no questions asked. After we've started building (usually within 2 hours of payment): 50% refund. After delivery: no refund, but you get revisions within the tier's window.",
  },
  {
    q: "What if I want more revisions?",
    a: "Each tier includes revisions (1, 2, or 3). Extra revisions are ₹999 each and take 4-8 hours. If your scope changes entirely, we'll quote a tier upgrade. Most clients don't need more than what's included.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes — we ship to founders everywhere. Razorpay accepts international cards; you can also pay via Stripe or PayPal on request. No timezone issues — we deliver async and update on WhatsApp.",
  },
  {
    q: "Can you build a SaaS or bigger app?",
    a: "Not on this site. This is for websites — landing pages, marketing sites, portfolios. For SaaS, custom apps, or multi-site systems, that's 24dev.in (premium tier). Chat on WhatsApp and we'll point you to the right product.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Not as a service — but you own everything, so you (or any developer) can maintain it. If you want us to make small changes post-launch, we run ₹999 touch-ups (single change, 24h turnaround). Or for bigger refreshes, order a new Starter.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="relative border-t border-line bg-ink py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-line pb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            FAQ
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
            No calls means no one to ask.
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
            Everything you&apos;d
            <br />
            <span className="font-[family-name:var(--font-accent)] italic font-normal">
              probably ask first.
            </span>
          </h2>
          <p className="max-w-md font-body text-[clamp(0.9375rem,1.3vw,1.0625rem)] leading-relaxed text-fog-muted">
            We don&apos;t do calls, so every concern gets answered here. If
            something&apos;s missing, ping us on WhatsApp — we&apos;ll reply
            fast and add it to this list.
          </p>
        </motion.div>

        {/* Q&A feed */}
        <div className="mt-16 border-t border-line-strong md:mt-20">
          {faqs.map((item, i) => (
            <QaRow key={item.q} item={item} index={i} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col items-start gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-fog-dim">
              Still have questions?
            </p>
            <p
              className="mt-2 font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold leading-tight tracking-[-0.03em] text-fog"
            >
              Chat on WhatsApp — we reply fast.
            </p>
          </div>
          <a
            href="https://wa.me/919999999999?text=Hi%2024dev%2C%20I%20have%20a%20question"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#0F0F0F] transition-colors hover:bg-orange-soft"
          >
            <WhatsAppIconSmall />
            Ask on WhatsApp
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// QaRow — editorial Q&A block
// ─────────────────────────────────────────────────────────────

function QaRow({ item, index }: { item: QA; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-b border-line py-10 md:py-12"
    >
      <div className="grid grid-cols-[auto_1fr] gap-6 md:grid-cols-[auto_1fr_1.1fr] md:gap-16">
        {/* Number */}
        <div className="flex shrink-0 items-start gap-2 pt-2 md:pt-3">
          <span className="font-mono text-[11px] text-fog-dim">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="hidden h-px w-4 bg-line-strong md:inline-block mt-[9px]"
            aria-hidden
          />
        </div>

        {/* Question */}
        <h3
          className="font-[family-name:var(--font-accent)] italic text-[clamp(1.375rem,2.8vw,2.25rem)] leading-[1.1] tracking-[-0.01em] text-fog"
        >
          {item.q}
        </h3>

        {/* Answer */}
        <p className="font-body text-[clamp(0.9375rem,1.2vw,1.0625rem)] leading-relaxed text-fog-muted md:col-start-3 md:row-start-1 max-w-prose">
          {item.a}
        </p>
      </div>
    </motion.div>
  );
}

function WhatsAppIconSmall() {
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
