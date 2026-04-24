"use client";

import { motion } from "motion/react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  tier: "Starter" | "Launch" | "Pro";
  shippedIn: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I needed a portfolio that looked professional and secure. 24dev built exactly what I needed — clean, fast, and perfect for showcasing my cybersecurity work. Delivered in 19 hours, not 19 days.",
    name: "Vivek Dasari",
    role: "Cybersecurity Specialist",
    company: "Freelance",
    tier: "Launch",
    shippedIn: "19h",
    rating: 5,
  },
  {
    quote:
      "Before, we wasted time going back and forth with designers. Now we get clean, clear visuals on the first try. Which lets us focus on what really matters.",
    name: "Marcus Lee",
    role: "Product Manager",
    company: "NovaTech",
    tier: "Pro",
    shippedIn: "28h",
    rating: 5,
  },
  {
    quote:
      "Showcasing my designs required a website that didn't distract from the work. The team built a stunning gallery layout that has already helped me land better clients.",
    name: "Riteesh",
    role: "UI/UX Designer",
    company: "Independent",
    tier: "Launch",
    shippedIn: "22h",
    rating: 5,
  },
  {
    quote:
      "Paid at noon, site was live before dinner. I've never had a smoother handoff. They sent the Razorpay link, I filled the brief on WhatsApp, and it was done.",
    name: "Ananya Kapoor",
    role: "Founder",
    company: "claypot.co",
    tier: "Starter",
    shippedIn: "6h",
    rating: 5,
  },
  {
    quote:
      "For ₹4,999 I got a site that would've cost me ₹50k elsewhere. The catch? None. The code is clean, the design is mine to keep, and it was live the next day.",
    name: "Rahul Menon",
    role: "Indie Hacker",
    company: "orbitscale.io",
    tier: "Launch",
    shippedIn: "17h",
    rating: 5,
  },
  {
    quote:
      "I dreaded the thought of 'hopping on a call.' 24dev just delivered. Brief over WhatsApp, site in 26 hours, done. This is how services should work.",
    name: "Priya Shetty",
    role: "Creator",
    company: "halfpace.xyz",
    tier: "Launch",
    shippedIn: "26h",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative border-t border-line bg-ink py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-line pb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            Testimonials
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
            Real founders · Verified shipped
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
            Founders who
            <br />
            <span className="font-[family-name:var(--font-accent)] italic font-normal">
              ship, not wait.
            </span>
          </h2>
          <p className="max-w-md font-body text-[clamp(0.9375rem,1.3vw,1.0625rem)] leading-relaxed text-fog-muted">
            What they said after we delivered. Each tagged with the tier they
            bought and the actual shipping time.
          </p>
        </motion.div>

        {/* Testimonial grid */}
        <div className="mt-16 grid grid-cols-1 gap-0 border-t border-line-strong md:mt-20">
          {testimonials.map((t, i) => (
            <TestimonialRow key={t.name} testimonial={t} index={i} />
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-line pt-8 font-mono text-[10px] uppercase tracking-[0.26em] text-fog-muted"
        >
          <span>247 shipped</span>
          <span className="text-fog-dim">·</span>
          <span>
            <span className="text-orange">4.9★</span> avg rating
          </span>
          <span className="text-fog-dim">·</span>
          <span>0 late deliveries</span>
          <span className="text-fog-dim">·</span>
          <span>6 months in</span>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// TestimonialRow — editorial quote block
// ─────────────────────────────────────────────────────────────

function TestimonialRow({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group grid grid-cols-[auto_1fr] gap-4 border-b border-line py-10 md:grid-cols-[auto_1fr_auto] md:gap-10 md:py-12"
    >
      {/* Number */}
      <div className="flex shrink-0 items-start gap-2 pt-2">
        <span className="font-mono text-[11px] text-fog-dim">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="hidden h-px w-4 bg-line-strong md:inline-block mt-[9px]"
          aria-hidden
        />
      </div>

      {/* Quote */}
      <blockquote
        className="font-[family-name:var(--font-accent)] italic text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.25] tracking-[-0.005em] text-fog"
      >
        <span className="text-orange/70 text-[1.2em] leading-none mr-1" aria-hidden>
          &ldquo;
        </span>
        {testimonial.quote}
        <span className="text-orange/70 text-[1.2em] leading-none ml-1" aria-hidden>
          &rdquo;
        </span>
      </blockquote>

      {/* Attribution */}
      <div className="col-start-2 md:col-start-3 md:max-w-[220px] md:self-end">
        <div className="flex items-center gap-1 text-orange">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i} className="text-[14px]">★</span>
          ))}
        </div>
        <p className="mt-2 font-display text-[15px] font-bold leading-tight tracking-tight text-fog">
          {testimonial.name}
        </p>
        <p className="mt-0.5 font-body text-[12px] leading-snug text-fog-muted">
          {testimonial.role}
          <br />
          <span className="text-fog-dim">{testimonial.company}</span>
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
          {testimonial.tier} tier · shipped in{" "}
          <span className="text-orange">{testimonial.shippedIn}</span>
        </p>
      </div>
    </motion.div>
  );
}
