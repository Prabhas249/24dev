# 24dev Redesign — Progress checkpoint 2026-04-27

## ✅ What's done

### 1. Stripe DNA extracted via designlang
- Located at `docs/design-extracts/stripe-extract/`
- Includes: DESIGN.md, design-tokens.json (DTCG), tailwind.config.js, shadcn-theme.css, MCP server config, Claude skill rules
- Stripe specifics learned: 300-weight headings, -0.04em letterspacing, 1266px container, 0.06 shadow opacity, `cubic-bezier(0.3, 0, 0.2, 1)` easing, "you-only" voice

### 2. MagicUI templates downloaded + scouted
- 5 templates unzipped in `docs/template-scout/`:
  - **agent** (white/light, AI agent — picked as base inspiration)
  - **startup** (dillionverma — stole border-beam, particles, text-shimmer, sphere-mask)
  - **saas**, **devtool**, **codeforge** (reference only)

### 3. Agent template now LIVE on port 3002 ✅
**URL:** http://localhost:3002

**Setup applied:**
- Removed `--turbopack` from dev script (Turbopack + motion + RSC = bug)
- Added `"use client"` to `src/lib/config.tsx` (config has JSX with motion components)
- Added `"use client"` to all `src/components/sections/*.tsx` (they import siteConfig which is now client-only)
- Cleared `.next` cache + restarted

**Use this as live reference** while building 24dev redesign.

### 4. 24dev runtime stack (ready to build on)
Already installed in `/Users/prabhas/24dev`:
- Next.js 16 (App Router, Turbopack)
- Tailwind v4 + tw-animate-css
- React 19
- Motion (framer-motion)
- Lenis (smooth scroll)
- Lucide icons
- Radix (accordion, slot, navigation-menu)
- next-themes
- @number-flow/react
- shadcn pattern compat (CSS vars in globals.css)
- Clerk (Agency OS auth — separate)
- Drizzle + Supabase (Agency OS — separate)

### 5. Components copied to 24dev project
**From Agent (`components/ui/`):**
- accordion.tsx
- agent-button.tsx
- feature-slideshow.tsx
- hero-video-dialog.tsx
- marquee.tsx

**From Startup/dillionverma (`components/magicui/`):**
- border-beam.tsx
- particles.tsx
- sphere-mask.tsx
- text-shimmer.tsx

### 6. globals.css merged
24dev paper theme + Stripe DNA + tw-animate-css + shadcn/MagicUI compat vars
- Brand: ink/fog/orange + new lime/coral
- Stripe-light heading hierarchy (300-400 weight, -0.04em letterspacing)
- Subtle shadow scale (0.06 opacity)
- All animations: marquee, accordion, slide, scale, fade, orbit, shimmer, border-beam
- Container: `container-24dev` = 1266px (Stripe DNA)
- Stripe easing: `cubic-bezier(0.3, 0, 0.2, 1)` available as `.ease-stripe` utility

### 7. site-config.ts written
`/Users/prabhas/24dev/lib/site-config.ts` — single source of content:
- Hero with locked tagline B + sub C
- 5 placeholder testimonials (real client names, real businesses)
- 8 FAQ Qs/As covering real client objections
- 6 bento features (24h delivery, free hosting, 100/100 Lighthouse, Razorpay, mobile, no meetings)
- 4 pricing tiers (Starter ₹1,999 / Launch ₹4,999 / Pro ₹14,999 / Signature ₹24,999)
- 4 process steps
- 4 footer columns + social links

### 8. Hero rebuilt
`/Users/prabhas/24dev/components/sections/Hero.tsx`
- Stripe-light headline (Unbounded font + italic Instrument Serif on second line)
- BorderBeam animated CTA (orange → lime)
- Particles bg (40 dots, orange tint)
- Existing PortfolioDeck preserved on right column (clipped to column)
- All entrance animations on `cubic-bezier(0.3, 0, 0.2, 1)`

### 9. Nav rebuilt — exact Agent template parity
`/Users/prabhas/24dev/components/atoms/Nav.tsx`
- **Sliding pill indicator** (motion.li with spring stiffness 400 / damping 30)
- **Outer pill morphing** (76rem → 880px on scroll)
- White bg + border + blur + shadow on scroll
- Active section auto-tracking with 100px offset
- Smooth scroll on click with manual scroll guard (600ms reset)
- Mobile bottom-sheet drawer (spring physics + AnimatePresence)
- Inset shadow on CTA button (Stripe-style)

### 10. Page layout — Agent template structure
`/Users/prabhas/24dev/app/page.tsx`
- `max-w-7xl mx-auto border-x border-line` outer column
- Two inner vertical line rails at `left-6` / `right-6` (signature double-rail)
- `divide-y divide-line` between every section
- Body: solid bg-ink (no rounded card)

---

## 🎯 Current state of 24dev (`http://localhost:3000`)

- ✅ Hero with new tagline + Stripe-light typography + BorderBeam CTA + Particles
- ✅ Nav with full Agent parity (sliding pill, morph, sticky, mobile drawer)
- ✅ Layout: column with vertical border rails, horizontal section dividers
- ✅ All existing sections still render (LiveBuild, Manifesto, Work, etc — old style)
- ⏳ NOT YET refactored: LogoStrip, Manifesto, FounderCompare, LiveBuild, Work, SiteMosaic, PaymentProof, Testimonials, HowItWorks, Pricing, Faq, FinalCta, Footer

---

## 📋 What user wants to do next

User wants to BUILD FROM SCRATCH using Agent template (running on port 3002) as reference.

**Approach for next session:**
1. Open `http://localhost:3002` (Agent template — see exact behaviors)
2. Open `http://localhost:3000` (24dev current state)
3. For each Agent section, port the structure to a new 24dev component:
   - Use Agent's HTML/JSX structure exactly
   - Apply 24dev brand colors via CSS vars (already in globals.css)
   - Replace Agent's content with `siteConfig` from `lib/site-config.ts`
4. Replace one section at a time in `app/page.tsx`
5. Test, get user feedback, iterate

---

## 🛠 Reference URLs + paths

| What | Where |
|------|-------|
| 24dev landing (live) | http://localhost:3000 |
| Agent template (live, reference) | http://localhost:3002 |
| Agent template source | `docs/template-scout/agent/magicuidesign-agent-template-67c4ec6bf25256173c4d6a87d3033f21d3200443/src/` |
| Stripe extract (DTCG tokens) | `docs/design-extracts/stripe-extract/` |
| Existing landing page | `app/page.tsx` |
| Site config (content) | `lib/site-config.ts` |
| Nav (Agent parity) | `components/atoms/Nav.tsx` |
| Hero (Stripe + Agent) | `components/sections/Hero.tsx` |
| MagicUI gems | `components/magicui/` |
| UI primitives from Agent | `components/ui/` |
| Old Hero (backup) | `components/sections/Hero.old.tsx` |

---

## 🔧 Agent template fixes applied (so it runs locally)

If you ever zip Agent again, these fixes are needed:
1. `package.json` → `"dev": "next dev"` (remove `--turbopack`)
2. `src/lib/config.tsx` → first line: `"use client";`
3. All `src/components/sections/*.tsx` → first line: `"use client";`
4. Clear `.next` cache + restart

---

## 🎨 Locked design decisions

- Tagline: B (*"Beautifully crafted websites. Delivered before dinner."*) + sub C (*"Your website. Live in 24 hours. From ₹1,999."*)
- Layout: Agent column + double border rails + horizontal dividers
- Nav: Agent floating pill with sliding indicator (line-by-line port)
- Pricing: ₹1,999 → ₹2,499 raise at M4
- Mix locked: 60 Starter + 4 Launch / week (no Pro forced quota)
- Goal: ₹15-20L net 9 months floor, ₹25L stretch
- Heading weight: 300-400 LIGHT (Stripe DNA, not bold)
- Container: 1266px (Stripe DNA)
- Easing: `cubic-bezier(0.3, 0, 0.2, 1)` (Stripe DNA)
- Voice: "you-only" (no "we" → "you", just "you")

---

## 🚀 Next concrete next-session steps

1. Open both browsers side by side (3000 + 3002)
2. Decide what to copy first (likely BentoSection — visual centerpiece)
3. Port section by section, test each, get user feedback
4. Wire each ported section into `app/page.tsx`, comment out old equivalent
5. Once all sections done: cleanup, perf pass, deploy
