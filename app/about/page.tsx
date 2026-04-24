import type { Metadata } from "next";
import { Nav } from "@/components/atoms/Nav";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "About 24dev",
  description:
    "Why we started 24dev: to give every Indian founder access to premium web design at a fair price, shipped in 24 hours.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="bg-ink pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          {/* Eyebrow */}
          <div className="flex items-baseline justify-between border-b border-line pb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
              About
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
              Bangalore · Est. 2025
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-14 font-display text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[0.86] tracking-[-0.04em] text-fog">
            Premium design
            <br />
            <span className="font-[family-name:var(--font-accent)] italic font-normal">
              shouldn&apos;t be
            </span>
            <br />
            a privilege.
          </h1>

          <p className="mt-6 max-w-2xl font-[family-name:var(--font-accent)] italic text-[clamp(1.125rem,1.7vw,1.5rem)] leading-snug text-fog-muted">
            Why we started 24dev. What we believe. Where we&apos;re going.
          </p>

          {/* THE STORY */}
          <div className="mt-20 space-y-10 md:mt-24">
            <section className="space-y-5 font-body text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed text-fog-muted">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange">
                — The problem
              </h2>
              <p>
                In early 2025, we watched dozens of Indian founders — from
                Bangalore SaaS teams to Jaipur jewelry shops to Mumbai yoga
                studios — all stuck with the same three bad options for a
                basic website:
              </p>

              <ul className="space-y-4 border-l-2 border-orange/40 pl-6">
                <li>
                  <span className="text-fog">Design agencies</span> quoting
                  ₹50,000 or ₹1,00,000, asking for 2–4 weeks of calls,
                  discovery, decks, revisions. Fine for a Series A startup.
                  Not fine for a solo founder or a local business.
                </li>
                <li>
                  <span className="text-fog">Freelancers</span> on Fiverr and
                  Upwork — cheap on paper, but half ghost halfway through,
                  half deliver template sites with their name in the footer.
                  Trust is broken.
                </li>
                <li>
                  <span className="text-fog">Wix / Squarespace / Webflow</span>{" "}
                  — great tools, but the sites scream &ldquo;template&rdquo;
                  and the monthly fees never end. You never really own it.
                </li>
              </ul>

              <p>
                None of these felt <span className="italic font-[family-name:var(--font-accent)] text-fog">built for India</span>{" "}
                — where business happens over WhatsApp, GST matters, UPI is
                the default, and most founders are bootstrapped and in a
                hurry.
              </p>
            </section>

            <section className="space-y-5 font-body text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed text-fog-muted">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange">
                — The idea
              </h2>
              <p>
                What if there was a studio that:
              </p>

              <ul className="space-y-3 pl-5 list-none">
                <li>
                  <span className="text-orange mr-2">→</span>
                  <span className="text-fog">Quoted a fixed price</span> — no
                  hourly billing, no surprise invoices
                </li>
                <li>
                  <span className="text-orange mr-2">→</span>
                  <span className="text-fog">Shipped in 24 hours</span> — not
                  24 days, not 24 weeks
                </li>
                <li>
                  <span className="text-orange mr-2">→</span>
                  <span className="text-fog">Worked over WhatsApp</span> — no
                  mandatory calls, no Slack channels, no back-and-forth emails
                </li>
                <li>
                  <span className="text-orange mr-2">→</span>
                  <span className="text-fog">Let you own everything</span> —
                  code, design, domain, credentials — so you&apos;re never
                  locked in
                </li>
                <li>
                  <span className="text-orange mr-2">→</span>
                  <span className="text-fog">Charged Indian prices</span> —
                  ₹1,999 to ₹9,999 — accessible to actual Indian founders, not
                  just VC-funded ones
                </li>
              </ul>

              <p className="pt-2 font-[family-name:var(--font-accent)] italic text-[clamp(1.25rem,1.8vw,1.625rem)] leading-snug text-fog">
                That&apos;s 24dev.
              </p>
            </section>

            <section className="space-y-5 font-body text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed text-fog-muted">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange">
                — How it&apos;s possible
              </h2>
              <p>
                We build sites with Claude Code (an AI coding assistant) +
                Next.js + a tight internal design system. What used to take a
                2-person design + dev team two weeks — we do in a few focused
                hours. We pass the savings on.
              </p>
              <p>
                This isn&apos;t &ldquo;AI-generated junk.&rdquo; Every site
                ships with real craft — custom animations, proper typography,
                responsive layouts. We just work 5× faster than agencies still
                using 2020 workflows.
              </p>
            </section>

            <section className="space-y-5 font-body text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed text-fog-muted">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange">
                — Two products, one studio
              </h2>
              <p>
                24dev ships in two lanes depending on what you need:
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="border border-line p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-fog-dim">
                    Premium lane
                  </p>
                  <p className="mt-3 font-display text-[22px] font-bold tracking-tight text-fog">
                    <a
                      href="https://24dev.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange transition-colors"
                    >
                      24dev.in →
                    </a>
                  </p>
                  <p className="mt-2 text-[14px] text-fog-muted leading-snug">
                    For bigger builds, custom SaaS, marketing sites for funded
                    startups, or agencies scaling out.
                    <br />
                    <span className="mt-2 inline-block">From ₹25,000. Call-scoped.</span>
                  </p>
                </div>

                <div className="border border-orange/40 bg-orange/[0.04] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-orange">
                    Fast lane — you&apos;re here
                  </p>
                  <p className="mt-3 font-display text-[22px] font-bold tracking-tight text-fog">
                    This site
                  </p>
                  <p className="mt-2 text-[14px] text-fog-muted leading-snug">
                    For solo founders, small businesses, creators, coaches —
                    anyone who wants a sharp website, fast, without the agency
                    price tag.
                    <br />
                    <span className="mt-2 inline-block">
                      <span className="text-fog">₹1,999 – ₹9,999.</span>{" "}
                      Self-serve. Shipped in 24 hours.
                    </span>
                  </p>
                </div>
              </div>

              <p className="mt-6 font-[family-name:var(--font-accent)] italic text-[clamp(1.125rem,1.5vw,1.375rem)] text-fog">
                Same philosophy. Different price tag. Same hands, both ways.
              </p>
            </section>

            <section className="space-y-5 font-body text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed text-fog-muted">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange">
                — Who we&apos;re for
              </h2>
              <p>
                Not just tech founders. We ship for:
              </p>
              <ul className="grid grid-cols-1 gap-2 pl-0 md:grid-cols-2">
                <li><span className="text-orange mr-2">→</span> Solo founders shipping an MVP</li>
                <li><span className="text-orange mr-2">→</span> Local businesses going online</li>
                <li><span className="text-orange mr-2">→</span> Coaches, therapists, consultants</li>
                <li><span className="text-orange mr-2">→</span> Creators and writers</li>
                <li><span className="text-orange mr-2">→</span> Freelancers building a portfolio</li>
                <li><span className="text-orange mr-2">→</span> Restaurants, clinics, studios</li>
                <li><span className="text-orange mr-2">→</span> Students launching their first venture</li>
                <li><span className="text-orange mr-2">→</span> Anyone tired of &ldquo;let&apos;s hop on a call&rdquo;</li>
              </ul>
              <p className="pt-2">
                If you&apos;re Indian and you need a website, we&apos;re
                probably for you.
              </p>
            </section>

            <section className="space-y-5 font-body text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed text-fog-muted">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange">
                — The promise
              </h2>
              <p>
                Everything we ship comes with the same commitments:
              </p>
              <ul className="space-y-2 pl-0">
                <li><span className="text-orange mr-2">→</span> Fixed price, no surprises</li>
                <li><span className="text-orange mr-2">→</span> Shipped in 24 hours, or <span className="text-fog">50% back automatically</span></li>
                <li><span className="text-orange mr-2">→</span> You own the code, design, and credentials</li>
                <li><span className="text-orange mr-2">→</span> GST invoice from Razorpay, if you need it</li>
                <li><span className="text-orange mr-2">→</span> Zero retainers, zero lock-ins</li>
              </ul>
            </section>

            <section className="space-y-5 font-body text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed text-fog-muted">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange">
                — Where we&apos;re going
              </h2>
              <p>
                We want 24dev to become the default option for any Indian
                business that needs a website — the same way{" "}
                <span className="text-fog">Razorpay is the default for payments</span>{" "}
                or <span className="text-fog">Zepto is the default for groceries</span>.
              </p>
              <p>
                Premium design for everyone, not just those who can afford an
                agency. That&apos;s what we&apos;re building, one shipped site
                at a time.
              </p>
              <p className="pt-3 font-[family-name:var(--font-accent)] italic text-[clamp(1.25rem,1.8vw,1.625rem)] leading-snug text-fog">
                — Prabhas, founder
                <br />
                <span className="text-fog-dim not-italic text-base">
                  Bangalore · 2025
                </span>
              </p>
            </section>

            {/* CTA */}
            <div className="mt-16 flex flex-col items-start gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
              <p className="max-w-md font-body text-[15px] leading-relaxed text-fog-muted">
                Ready to work together? Start the conversation on WhatsApp —
                we reply fast.
              </p>
              <a
                href="https://wa.me/919999999999?text=Hi%2024dev%2C%20I%20read%20about%20you%20and%20want%20to%20start"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-orange-soft"
              >
                Start on WhatsApp
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>

            {/* Back to home */}
            <div className="mt-12 flex items-center justify-between border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-fog-dim">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-fog transition-colors hover:text-orange"
              >
                ← Back to 24dev
              </a>
              <span>Bangalore · 2025</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
