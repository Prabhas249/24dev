# BSSI — Brand & Build Spec

Client: Bharat Stainless Steel Industries (BSSI), Hisar, Haryana — via 24dev.
Contact person shared brand on WhatsApp 22 Jul 2026. Design reference notes + images still pending from client.

## Colors (client-locked)
- Primary (ink / dark bg): `#160B04`
- Secondary (muted text): `#545454`
- Accent: `#DF2F00`
- Text on light bg: `#160B04`
- Text on dark bg: `#FFFFFF`
- WhatsApp CTA: `#25D366`
- Background (light/card): `#FFFFFF`
- Derived canvas (from logo file): warm off-white `#FAF7F2` — use for page canvas, pure white for cards.

## Fonts (client-locked)
- Headings: IBM Plex Sans (600/700)
- Body: Inter (400/500)
- Logo wordmark is an image (don't recreate in type). Files: `source/logos/` (black-on-cream + white-on-dark PNG).

## Voice / positioning (from copy)
- Manufacturer-direct, honesty-first ("honest weight", "we state plainly what we're NOT certified for").
- WhatsApp-first conversion: every CTA routes to `wa.me/918199950046` with section-specific pre-filled messages. No email forms, no backend.
- Key trust stats: 12+ years · 650+ customers · 5,500+ MT/yr · 210+ cities · Jindal-sourced · GSTIN 06AZBPD9705B1ZW.

## Site structure (from sitemap)
Home / About Us / Products (hub + 10 product pages — COPY PENDING) / Industries We Serve / Resources (weight calculator + grade comparison) / Contact Us / Privacy Policy / Sitemap.
Sticky WhatsApp button on every page (pre-filled generic message).

## Content source of truth
`content/00-sitemap.md` … `06-privacy-policy.md` — verbatim transcriptions of client PDFs in `source/copy/`. Use copy EXACTLY as written; do not rewrite client copy.

## Build
- Next.js (App Router) + Tailwind at `site/`, dev port 3010.
- Product routes: `/products/pipes-tubes/*`, `/products/coils-strip/*`, `/products/sheets/*` (10 pages, placeholder until copy arrives).
- Contact/bottom-CTA forms are client-side only → compose wa.me link on submit.
