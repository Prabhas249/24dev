# 24dev Redesign — Template Strategy (LOCKED 2026-04-26)

## Base template: MagicUI Agent (white/light)
**Reason:** Stripe-tier white aesthetic, all sections we need, Tailwind v4 + React 19, premium button shadow stack, radial gradient hero matches Stripe pattern.

**Source:** `/docs/template-scout/agent/magicuidesign-agent-template-*/`

## Steal from MagicUI Startup (dillionverma)
**Source:** `/docs/template-scout/startup/dillionverma-startup-template-*/`

| Component | Purpose | Where to use |
|-----------|---------|--------------|
| `border-beam.tsx` ⭐ | Animated traveling border | CTA buttons, featured pricing card, hero portfolio deck |
| `particles.tsx` | Subtle bg particles | Hero bg accent (5% opacity) |
| `text-shimmer.tsx` | Animated text shimmer | "₹1,999" price callouts |
| `sphere-mask.tsx` | Hero mask effect | Optional hero treatment |
| `marquee.tsx` | Polished auto-scroll | Logo carousel (replaces existing) |

## Components to KEEP from Agent
- `accordion.tsx` (for FAQ)
- `button.tsx` (premium shadow stack)
- `flickering-grid.tsx` (subtle bg)
- `marquee.tsx` (or use Startup's)
- `hero-video-dialog.tsx` (for future process video)
- `feature-slideshow.tsx` (case study carousel)
- All `sections/`: hero, bento, cta, faq, footer, growth, navbar, pricing, quote, testimonial, company-showcase, feature
- `globals.css` animations (accordion, marquee, slide-down, slide-up, scaleIn/Out, fadeIn/Out, orbit, elliptical-orbit)

## Components to STRIP from Agent
- `globe.tsx` (cobe 3D — too heavy, not needed)
- `orbiting-circle.tsx` (AI agent visual)
- `code-block.tsx` + `shiki` dep (AI demo, not for us)
- `response-stream.tsx`, `reasoning.tsx` (AI streaming UI)
- `markdown.tsx`, `react-markdown`, `marked`, `remark-gfm` (overkill)
- `hero-video-section.tsx` (no video yet, add later)

## Brand application

Don't ship Agent's blue/dark scheme. Apply 24dev tokens:

| Agent default | 24dev override |
|---------------|----------------|
| primary blue | **lime `#0FFF00`** |
| background gray | **ivory `#FAF6E9`** |
| foreground black | **ink `#0F0F0F`** |
| Accent (border, badges) | **coral `#FF6B47`** |
| Heading font (Geist Sans) | **Unbounded** (existing) |
| Body font | **Geist** (existing) |

## Stripe DNA layer (from designlang extract)

Apply to Agent base:
- Heading weight **300 LIGHT** (not Agent's medium/bold)
- Letterspacing **-0.96px on h1, -0.72 on h2**
- Container max **1266px** (Agent uses 1280)
- Shadow opacity **0.06** (extra subtle)
- Easing `cubic-bezier(0.3, 0, 0.2, 1)` everywhere
- "you-only" voice (no "we")

## Phase 1 execution (first concrete sprint)

### Step 1 — Copy useful Agent files
```bash
AGENT=/Users/prabhas/24dev/docs/template-scout/agent/magicuidesign-agent-template-67c4ec6bf25256173c4d6a87d3033f21d3200443

# Copy section components (we'll refactor with our brand)
cp $AGENT/src/components/sections/{hero-section,bento-section,pricing-section,faq-section,testimonial-section,cta-section,footer-section,growth-section,company-showcase}.tsx \
   /Users/prabhas/24dev/components/sections/

# Copy useful UI components
cp $AGENT/src/components/ui/{accordion,flickering-grid,marquee,feature-slideshow,hero-video-dialog}.tsx \
   /Users/prabhas/24dev/components/ui/
```

### Step 2 — Copy MagicUI gems from Startup
```bash
STARTUP=/Users/prabhas/24dev/docs/template-scout/startup/dillionverma-startup-template-ff962ef6c74c2a07c06011ed74bcbb4e50ae6f02

mkdir -p /Users/prabhas/24dev/components/magicui
cp $STARTUP/components/magicui/{border-beam,particles,text-shimmer,sphere-mask}.tsx \
   /Users/prabhas/24dev/components/magicui/
```

### Step 3 — Install missing deps
```bash
cd /Users/prabhas/24dev
npm install @number-flow/react @radix-ui/react-accordion @radix-ui/react-navigation-menu @radix-ui/react-slot class-variance-authority next-themes tailwindcss-animate tw-animate-css
```

### Step 4 — Merge globals.css
- Take animations from Agent's `globals.css`
- Apply 24dev brand color CSS variables
- Add Stripe DNA letterspacing/weight tokens

### Step 5 — Refactor existing 24dev landing
- Hero: rebuild using Agent's structure + your draggable window deck
- Pricing: use Agent's pricing-section + 24dev tier data
- Bento: 6-card grid (24h delivery, free hosting, 100/100 Lighthouse, etc)
- Testimonials: keep your existing data, swap to Agent's component
- FAQ: Agent's accordion + your Q&A
- Footer: Agent's structure + your links

### Step 6 — Add MagicUI accents
- Border beam on primary CTA + featured pricing
- Particles in hero bg (subtle)
- Text shimmer on prices

### Step 7 — Stripe DNA polish
- Apply 300-weight headings
- Letterspacing tightening
- Subtle shadows
- Cubic-bezier easing on all transitions

## Files to NOT touch (Agent template overrides)
- Don't replace existing `app/admin/*` (Agency OS)
- Don't replace `app/api/webhooks/*`
- Don't replace `lib/db/*`
- Don't replace `proxy.ts`
- Don't replace `components/admin/*`
- Don't replace `components/atoms/PortfolioDeck.tsx` (keep your draggable deck)

## Success criteria

- [ ] Hero loads in <1s
- [ ] Looks "expensive" (friend test)
- [ ] Lighthouse 95+
- [ ] Mobile flawless
- [ ] All CTAs work → Razorpay links
- [ ] Border beam animated (subtle, not gimmicky)
- [ ] Brand colors locked (lime + ivory + ink + coral)
- [ ] Doesn't look like a MagicUI clone (24dev voice + Stripe weight)
