# 24dev.in Redesign Plan v1 — Stripe-inspired

**Started:** 2026-04-26
**Goal:** Ship Stripe-tier landing page in 4-5 days using designlang Stripe extract as DNA reference.
**Tech:** Next.js 16 + Tailwind v4 + Framer Motion + Lenis + custom snippets

---

## 🧬 Source DNA — Stripe (extracted via designlang)

**Extract location:** [docs/design-extracts/stripe-extract/](docs/design-extracts/stripe-extract/)

### Stripe's actual design tokens
| Token | Value |
|-------|-------|
| Primary color | `#533afd` (signature purple) |
| Secondary | `#e8e9ff` (light purple wash) |
| Accent | `#ffe0d1` (warm peach) |
| Foreground | `#000000` |
| Background | `#ffffff` |
| Neutrals | `#50617a`, `#64748d`, `#101010`, `#f2f7fe` |

### Stripe's typography
- Font: `sohne-var` (proprietary — we substitute)
- Heading weight: **300 LIGHT** (counter-intuitive but premium)
- H1: 48px / lh 49.44 / -0.96 letterspacing
- H2: 36px / lh 41.4 / -0.72
- H3: 34px / lh 35.7 / -0.68
- H4: 28px / lh 29.96 / -0.28
- Body: 16px

### Stripe's spacing + shape
- Tight spacing scale: 32, 40, 48, 52, 56, 64, 72, 112, 340px
- Container: 1266px max
- Radii: 1, 4, 8, 16, 100px (full)
- Shadows: ULTRA subtle (0.06 opacity on md)
- Transition curve: `cubic-bezier(0.3, 0, 0.2, 1)` — Stripe's signature easing

### Stripe's voice
- "you-only" pronoun posture (NOT "we" → "you" — JUST "you")
- Sentence case headings, balanced length
- Primary CTA verbs: action-oriented, short
- Neutral tone (not corporate, not casual)

### Stripe's components inventory
- 183 card instances · 78 buttons · 3 button variants (primary, secondary, link)
- Patterns: buttons, cards, links, navigation, footer, modals, dropdowns, badges, progressBars, switches

---

## 🎨 24dev brand mapping (NOT a Stripe clone — our identity)

**Don't copy Stripe's colors.** Take their structural choices, apply our identity:

| 24dev token | Value | Inspired by Stripe pattern |
|-------------|-------|---------------------------|
| `color.brand.primary` | `#0FFF00` (lime, your existing) | High-contrast accent like Stripe's purple |
| `color.brand.dark` | `#0F0F0F` (ink, existing) | Deep neutral grounding |
| `color.brand.cream` | `#FAF6E9` (ivory) | Warm neutral background |
| `color.surface.fog` | `#E8E5DA` | Subtle off-white |
| `color.accent.coral` | `#FF6B47` | Warm pop (matches Stripe's accent strategy) |
| Heading weight | **300-400 LIGHT** ⭐ | Borrow Stripe's premium-light feel |
| Heading scale | Same Stripe ratios (48/36/28/22) | Proven hierarchy |
| Container | 1266px | Same as Stripe |
| Radii | Same scale (1, 4, 8, 16, full) | Tight Stripe-inspired |
| Shadow opacity | 0.06 (sub-subtle) | Premium polish |
| Easing | `cubic-bezier(0.3, 0, 0.2, 1)` | Steal this, it's perfect |
| Voice | "you" only | Steal directly |

---

## 📐 8-Section landing page architecture

### §1 Nav (sticky, slim)
- Logo (24dev wordmark with pulsing lime dot)
- Center: minimal nav (Work · Pricing · How · FAQ)
- Right: CTA "Start at ₹1,999" (primary lime button)
- Backdrop blur on scroll
- 64px tall, 1266px container

### §2 Hero
- **Layout: 2-column 60/40** (left text + CTAs, right interactive widget)
- **Left:**
  - Eyebrow: "🟢 4 sites shipped today" (live counter from Agency OS API)
  - Headline (Unbounded LIGHT 80px desktop / 48px mobile):
    *"Designed. Built. Live. In 24 hours."*
  - Subhead (Geist 20px):
    *"Beautifully crafted websites for Indian founders. From ₹1,999. No calls. No back-and-forth."*
  - 2 CTAs: 
    - Primary: `Start at ₹1,999 →` (lime, large)
    - Ghost: `See work` (border)
  - Trust strip below: *"Live before dinner. Hosting free for life."*
- **Right:**
  - Your existing **draggable window deck** (already built in `components/atoms/PortfolioDeck.tsx`)
  - 3 stacked browser windows showing real shipped sites
  - User can drag, traffic-light-buttons work
- **Background:** subtle gradient mesh (lime → ivory → coral, blurred 200px) — your version of Stripe's wave

### §3 Live counter strip (Stripe-inspired metric block)
- Single line of giant numbers, like Stripe's "US$1.9tn":
  *"247 sites shipped this month · ₹4.92L revenue today · 19 minutes avg delivery"*
- Numbers animate up (count-up.js or custom)
- This is your version of Stripe's GDP counter

### §4 Logo carousel (social proof)
- Auto-scroll Marquee (your existing component ✓)
- Indian founder logos: 12-20 visible
- Subhead above: *"Trusted by Indian founders building real businesses"*
- Grayscale logos, hover → color

### §5 Bento grid (Stripe-style features)
6 cards in mixed sizes (2-row × 3-col):

| Card | Size | Content |
|------|------|---------|
| **24-hour delivery** | LARGE (2 col span) | Live countdown widget + "Live by 7pm tonight" |
| Free hosting | MD | Vercel logo + "deploy to your own account" |
| 100/100 Lighthouse | MD | Score visual (4 circles in row) |
| Razorpay built-in | SM | Payment animation |
| Mobile perfect | SM | Phone frame mockup |
| Zero meetings | MD | Chat bubble illustration ("It's all WhatsApp.") |

**Each card has hover: subtle lift + scale 1.02 + shadow expand.**
**Click → modal opens** (Stripe pattern: don't lose homepage focus)

### §6 Process (4-step visual teardown)
*"How we ship in 24 hours"*

1. **You order** → Razorpay payment + 2-min Typeform
2. **We start the clock** → countdown begins, Claude + craftsman start building
3. **You review** → preview link via WhatsApp, 1 revision included
4. **You're live** → deployed to your Vercel, hosting free forever

Each step: number badge + heading + 1-line + tiny screenshot/animation
Animated reveal on scroll (stagger 100ms)

### §7 Pricing (4-tier comparison)
Already have `components/sections/Pricing.tsx` — refresh with:
- Highlight Launch ₹4,999 as "MOST CHOSEN"
- Each card: tier name + price + 6 features + "Buy now" → Razorpay link
- Hover: lift 4px + lime border glow
- Bottom: "Need a custom Spark MVP? ₹49,999 → talk to founder"

### §8 Testimonials
- 3-column quotes
- Real client photos in **circular frames** (your version of Stripe's parallelogram)
- Quote · name · business · *"Live in X hours"* metric per testimonial
- Subtle scroll-triggered reveal

### §9 FAQ
- Already have `components/sections/Faq.tsx`
- Refresh with 8-10 questions clients actually ask:
  - "What do I send you?"
  - "Can you write copy?"
  - "What if I don't like it?"
  - "How does free hosting work?"
  - "Custom domain?"
  - "Refund policy?"
  - "Can you do my SaaS app?"
  - "What about updates after?"

### §10 Final CTA strip
- Massive kinetic text (your `kinetic-typography.md` skill):
  *"Your website. Live before dinner."*
- Single CTA below: `Start at ₹1,999 →`
- Footer follows

### §11 Footer
- Multi-column (Stripe pattern):
  - Product (Tiers, Work, Process, Pricing)
  - Resources (FAQ, Blog, Refund policy, Terms)
  - Company (About, Contact, Hire us)
  - Connect (Instagram, X, LinkedIn, WhatsApp)
- Bottom row: copyright + tiny ISO logo

---

## 🎬 Motion language (steal from Stripe + transcript lessons)

### Easing
- Default: `cubic-bezier(0.3, 0, 0.2, 1)` (Stripe's signature)
- Springy moments: `framer-motion spring(stiffness: 200, damping: 25)`
- Hover: 200ms transition

### Scroll behaviors
- Lenis (already installed) for smooth scroll
- Section reveals: Framer Motion `whileInView` with viewport `once: true`
- Stagger children by 80ms
- No parallax (Stripe doesn't use it — keeps it clean)

### Micro-interactions
- Buttons: scale 0.98 on press, lift on hover
- Cards: 4px lift + shadow expand on hover
- Live counters: count-up animation, Lenis-aware
- Wave background: animate via SVG `<animate>` or Three.js (decide based on perf)

### Performance budget
- LCP < 1.5s
- Total page weight < 800kb (excluding hero video if any)
- Lighthouse 95+ all categories
- No CLS (set explicit dimensions)

---

## 🛠 Implementation phases

### Phase 0 (DONE) — Stripe extract via designlang
- ✅ Extract Stripe DNA into `/docs/design-extracts/stripe-extract/`
- ✅ Tokens, Tailwind config, MCP server, agent rules

### Phase 1 (Day 1, 4-6 hr) — Token system + base layout
- [ ] Apply 24dev token system in `globals.css` (mapping Stripe extract → our colors)
- [ ] Update Tailwind config with Stripe-inspired typography scale (LIGHT weights, tight letterspacing)
- [ ] Refactor `layout.tsx` to use new tokens
- [ ] Set up **wave background SVG component** (`components/atoms/WaveBg.tsx`)
- [ ] User-provided template/border integrated

### Phase 2 (Day 1 cont, 4-6 hr) — Hero
- [ ] Rebuild Hero with 60/40 layout
- [ ] Wire live counter (placeholder API call, real data once Agency OS DB live)
- [ ] Integrate existing PortfolioDeck on right
- [ ] Add wave gradient background
- [ ] CTAs with Razorpay link integration

### Phase 3 (Day 2, 4-6 hr) — Live counter + logos + bento
- [ ] Section 3 metric strip with count-up animation
- [ ] Marquee logo carousel
- [ ] Bento grid (6 cards) with modal click-to-expand pattern
- [ ] Hover states + 200ms transitions

### Phase 4 (Day 3, 4-6 hr) — Process + pricing + testimonials
- [ ] 4-step process section with scroll-triggered stagger reveal
- [ ] Refresh Pricing component with new tier highlighting
- [ ] Testimonials with circular frames
- [ ] Final CTA with kinetic typography

### Phase 5 (Day 4, 3-4 hr) — Polish + perf + mobile
- [ ] Mobile responsive pass (640/768/1024 breakpoints)
- [ ] Lighthouse audit + fixes
- [ ] Browser testing (Safari, Firefox, Chrome)
- [ ] Add explicit dimensions to prevent CLS
- [ ] Image optimization (next/image with priority)

### Phase 6 (Day 5, 2-3 hr) — Deploy + share
- [ ] Deploy to staging Vercel
- [ ] Share preview with friends for feedback
- [ ] Fix critical issues
- [ ] Push to production

---

## 🎯 Success criteria (don't ship until)

- [ ] Lighthouse 95+ (perf · a11y · best-practices · seo)
- [ ] LCP < 1.5s
- [ ] No console errors
- [ ] Mobile experience as good as desktop
- [ ] All CTAs go to working Razorpay links
- [ ] Hero feels as "considered" as Stripe (not AI-generic)
- [ ] At least 1 friend says "this looks expensive"

---

## 🚫 What we WON'T copy from Stripe

- Their purple — we own lime
- Their custom font (sohne-var, proprietary) — use Unbounded + Geist (existing)
- Their parallelogram framing — use circular/diagonal differently
- Enterprise tone — we're warm Indian founder
- "Show enterprise logos" pretense — we're Indian SMB-first

---

## 📋 Designlang assets we use

From `/docs/design-extracts/stripe-extract/`:

| File | Use |
|------|-----|
| `stripe-com-DESIGN.md` | Reference for design decisions |
| `stripe-com-design-tokens.json` | DTCG token structure to mirror for 24dev |
| `stripe-com-tailwind.config.js` | Tailwind structure reference (typography, spacing scale) |
| `stripe-com-shadcn-theme.css` | If we ever add shadcn |
| `stripe-com-mcp.json` | Future: install in Cursor for live Stripe ref |
| `.claude/skills/designlang/SKILL.md` | Install as Claude skill for ongoing design extraction |

---

## 🔄 Designlang as ongoing tool

**Install for future use:**
```bash
# Run on any inspiration site
npx designlang https://linear.app
npx designlang https://vercel.com

# Generate Cursor rules from extraction
npx designlang https://stripe.com --emit-agent-rules

# Run local studio
npx designlang studio
```

**Future use cases:**
- Extract design from any client's competitor → match aesthetic
- Build snippet library by extracting Linear, Vercel, Cluely, basement.studio
- CI: lint our own tokens against extracted reference
- MCP: agents can query design DNA in real-time

---

## 🎬 Key philosophical anchors (from Stripe Head of Design transcript)

1. **"Your website is your manifesto"** — every pixel signals our quality bar
2. **"Fight the gravitational pull to mediocrity"** — never accept "good enough"
3. **MVQP not MVP** — Minimum Viable QUALITY Product
4. **Show, don't tell** — bento with modals > new pages
5. **Code prototype > Figma frame** — we live in browsers, not files
6. **"Walk the store" weekly** — open 24dev.in fresh every Sunday

---

## 🚀 Next concrete action

1. User sends border/template → integrate into Phase 1 token setup
2. Begin Phase 1: token system + globals.css refactor
3. Build wave background component
4. Hero rebuild

**ETA to ship v1:** 4-5 working days. By end of week.
