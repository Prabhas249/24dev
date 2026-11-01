/**
 * 24dev site configuration — single source for landing page content.
 * Edit copy/testimonials/FAQ here, NOT inside section components.
 */

export const siteConfig = {
  name: "24dev",
  tagline: "Beautifully crafted websites. Delivered before dinner.",
  subTagline: "Your website. Live in 24 hours. From ₹1,999.",
  description:
    "We design, build, and ship beautiful websites in 24 hours. No calls. No back-and-forth. Just send us your brief — get a live site by tonight.",
  url: "https://24dev.in",

  hero: {
    badge: "5 slots remaining this week",
    title: "Beautifully crafted websites. Delivered before dinner.",
    description:
      "Your website. Live in 24 hours. From ₹1,999. No calls. No meetings. No back-and-forth — just send your brief and we ship.",
    cta: {
      primary: { text: "Start at ₹1,999", href: "#pricing" },
      secondary: { text: "See work", href: "#work" },
    },
    trustStrip: "Live before dinner · Hosting free for life · 24-hour or 50% refund",
  },

  liveCounter: {
    sitesThisMonth: 247,
    revenueToday: 49200, // in rupees, displayed as ₹49.2k
    avgDeliveryMinutes: 19,
  },

  // Logo carousel — placeholder names; swap with real client logos
  companies: [
    { name: "Cafe Oga", logo: "/logos/oga.svg" },
    { name: "LeanFit", logo: "/logos/leanfit.svg" },
    { name: "Studio Folk", logo: "/logos/folk.svg" },
    { name: "Glow Skin", logo: "/logos/glow.svg" },
    { name: "Brewhouse", logo: "/logos/brewhouse.svg" },
    { name: "Soul Yoga", logo: "/logos/soulyoga.svg" },
    { name: "Northwind", logo: "/logos/northwind.svg" },
    { name: "Petal & Stem", logo: "/logos/petal.svg" },
  ],

  // Bento features — 6 cards in mixed sizes
  bento: [
    {
      id: "delivery",
      title: "Live by 7pm tonight",
      description: "Pay before noon, your site goes live before dinner. The delivery clock is the product.",
      size: "large", // 2-col span
      tag: "24h delivery",
    },
    {
      id: "hosting",
      title: "Hosting free. Forever.",
      description: "We deploy to your own Vercel account. Free hobby tier covers traffic — you own it, we don't lock you in.",
      size: "medium",
      tag: "Free hosting",
    },
    {
      id: "lighthouse",
      title: "100/100 Lighthouse",
      description: "Performance · Accessibility · Best practices · SEO. Every site shipped passes the bar.",
      size: "medium",
      tag: "Premium quality",
    },
    {
      id: "razorpay",
      title: "Razorpay built-in",
      description: "UPI, cards, wallets — all from day one. We wire it before handover.",
      size: "small",
      tag: "Payments ready",
    },
    {
      id: "mobile",
      title: "Mobile flawless",
      description: "Designed mobile-first. Perfect on every screen, every browser.",
      size: "small",
      tag: "Mobile-first",
    },
    {
      id: "no-meetings",
      title: "Zero meetings",
      description: "It's all WhatsApp. Send brief, send revision feedback, get site. We respect your time.",
      size: "medium",
      tag: "Async-only",
    },
  ],

  // Process — 4-step teardown
  process: [
    {
      step: 1,
      title: "You order",
      description: "Pick your tier. Pay via Razorpay. Send a 2-min Typeform with copy + colors + reference.",
    },
    {
      step: 2,
      title: "We start the clock",
      description: "Delivery countdown begins. Our team + Claude build your site from a private snippet library.",
    },
    {
      step: 3,
      title: "You review",
      description: "Preview link via WhatsApp within 8-12 hours. 1 revision included. We polish based on feedback.",
    },
    {
      step: 4,
      title: "You're live",
      description: "Site deployed to your Vercel. You own everything. Hosting free for life.",
    },
  ],

  // Pricing tiers
  pricing: [
    {
      name: "Starter",
      price: 1999,
      priceLabel: "₹1,999",
      tagline: "Your website, live today.",
      description: "1-page custom site, ready before dinner.",
      features: [
        "1-page custom design",
        "Same-day delivery (6-12 hr)",
        "Mobile-perfect",
        "Razorpay-ready",
        "Free hosting on your Vercel",
        "1 revision included",
      ],
      cta: { text: "Start now", href: "https://razorpay.me/24dev/starter" },
      featured: false,
    },
    {
      name: "Launch",
      price: 4999,
      priceLabel: "₹4,999",
      tagline: "Your landing page. Live in 24 hours.",
      description: "Single-page premium with 5+ sections.",
      features: [
        "Custom hero + 5 sections + footer",
        "24-hour delivery",
        "Form integration + SEO meta",
        "Razorpay payments wired",
        "Free hosting on your Vercel",
        "2 revisions included",
      ],
      cta: { text: "Start now", href: "https://razorpay.me/24dev/launch" },
      featured: true, // most popular
    },
    {
      name: "Pro",
      price: 14999,
      priceLabel: "₹14,999",
      tagline: "Full website. Multi-page. In 24 hours.",
      description: "Multi-page custom site with CMS.",
      features: [
        "3-5 page custom design",
        "24-hour delivery",
        "Basic CMS + analytics",
        "Performance optimized (95+ Lighthouse)",
        "Free hosting on your Vercel",
        "3 revisions included",
      ],
      cta: { text: "Start now", href: "https://razorpay.me/24dev/pro" },
      featured: false,
    },
    {
      name: "Signature",
      price: 24999,
      priceLabel: "₹24,999",
      tagline: "Flagship website. Crafted for impact.",
      description: "5-8 page premium with animations.",
      features: [
        "5-8 page flagship build",
        "Custom animations + interactions",
        "Headless CMS + blog setup",
        "48-72hr delivery",
        "100/100 Lighthouse guaranteed",
        "14-day post-launch support",
      ],
      cta: { text: "Talk to us", href: "https://wa.me/919876543210?text=Signature%20site%20enquiry" },
      featured: false,
    },
  ],

  // Testimonials — placeholder until real ones come in
  testimonials: [
    {
      quote:
        "Sent the brief at 2 AM. Site was live by 6 PM same day. Razorpay was already wired. I just shared the link and started taking orders. Insane.",
      author: "Vivek Menon",
      role: "Owner, Cafe Oga",
      siteUrl: "https://cafeoga.in",
      avatar: "/avatars/vivek.jpg",
      timeToLive: "Live in 14 hours",
    },
    {
      quote:
        "I'd been quoted ₹35-50k by 3 agencies. Each wanted a discovery call, scoping doc, 3-week timeline. 24dev shipped a better landing page for ₹1,999 the next morning.",
      author: "Riteesh Kumar",
      role: "Founder, LeanFit",
      siteUrl: "https://leanfit.app",
      avatar: "/avatars/riteesh.jpg",
      timeToLive: "Live in 22 hours",
    },
    {
      quote:
        "What sold me wasn't the price — it was the speed. Brief on Tuesday morning. Site on Tuesday evening. My competitor still doesn't have one and I've been live a month.",
      author: "Aarav Patel",
      role: "Founder, Studio Folk",
      siteUrl: "https://studiofolk.co",
      avatar: "/avatars/aarav.jpg",
      timeToLive: "Live in 11 hours",
    },
    {
      quote:
        "Three pages, hosted on my own Vercel, free for life. I check it monthly — zero issues, zero downtime. The handover was a 2-line WhatsApp message.",
      author: "Priya Sharma",
      role: "Founder, Glow Skin Clinic",
      siteUrl: "https://glowskinclinic.in",
      avatar: "/avatars/priya.jpg",
      timeToLive: "Live in 28 hours",
    },
    {
      quote:
        "Best ₹2k I've spent in 2026. Was up and running before my chai went cold.",
      author: "Kabir Reddy",
      role: "Founder, Brewhouse",
      siteUrl: "https://brewhouse.cafe",
      avatar: "/avatars/kabir.jpg",
      timeToLive: "Live in 9 hours",
    },
  ],

  // FAQ — 8 questions clients actually ask
  faq: [
    {
      q: "What do I send you?",
      a: "Three things: your business copy (text for hero, sections, contact), your logo or brand colors, and one reference site you like. Done. We handle the rest. Send via Typeform after payment.",
    },
    {
      q: "What if I don't like it?",
      a: "Every tier includes 1-3 revisions. We'll polish based on your feedback. If we miss the delivery window, you get 50% refund AND we still deliver. We've never had to refund.",
    },
    {
      q: "Can you write the copy for me?",
      a: "We focus on design + build, not copy. We're great at editing your draft, terrible at writing from scratch. Bring rough copy — even bullet points — and we'll polish layout around it.",
    },
    {
      q: "How does free hosting work?",
      a: "We deploy to YOUR Vercel account (free Hobby tier) — not ours. You own the deploy, the domain, everything. Vercel covers traffic free for any site under 100GB/mo (you'll never hit it).",
    },
    {
      q: "Do you handle the domain?",
      a: "We point your existing domain (Namecheap, GoDaddy, Hostinger, anywhere) to your new site in 5 min after handover. If you don't own one, we'll guide you to buy one (~₹800/yr from Namecheap).",
    },
    {
      q: "Refund policy?",
      a: "If we miss the delivery window stated in your tier (12hr Starter, 24hr Launch/Pro, 48-72hr Signature), you get 50% refund AND we still deliver the site. Otherwise no refund — scope is locked upfront so there's nothing to dispute.",
    },
    {
      q: "Can you build my SaaS app or dashboard?",
      a: "Yes — that's our Spark tier (₹49,999, 7-day delivery). Auth + database + payment + 1-2 data models with full CRUD. Reach out via WhatsApp for a scope chat (only Spark needs a call).",
    },
    {
      q: "What about updates after?",
      a: "Two paths: (1) ₹999 Quick Fix per change for occasional updates. (2) ₹2,499/mo retainer for unlimited minor updates + monthly performance report. Most clients pick retainer after month 1.",
    },
  ],

  // CTA / final strip
  finalCta: {
    title: "Your website. Live before dinner.",
    description: "Stop quoting agencies. Stop waiting for callbacks. Just send your brief — get a live site by tonight.",
    cta: { text: "Start at ₹1,999", href: "#pricing" },
  },

  // Footer
  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Tiers", href: "#pricing" },
          { label: "Process", href: "#process" },
          { label: "Work", href: "#work" },
          { label: "Spark MVP", href: "/spark" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "FAQ", href: "#faq" },
          { label: "Refund policy", href: "/refunds" },
          { label: "Terms", href: "/terms" },
          { label: "Privacy", href: "/privacy" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Hire us", href: "https://wa.me/919876543210" },
          { label: "Press kit", href: "/press" },
        ],
      },
    ],
    social: [
      { label: "Instagram", href: "https://instagram.com/24dev.in" },
      { label: "X / Twitter", href: "https://twitter.com/24devhq" },
      { label: "LinkedIn", href: "https://linkedin.com/company/24dev" },
      { label: "WhatsApp", href: "https://wa.me/919876543210" },
    ],
    tagline: "Designed. Built. Live. In 24 hours.",
    copyright: `© ${new Date().getFullYear()} 24dev. Made in India.`,
  },
} as const;

export type SiteConfig = typeof siteConfig;
