# BSSI — Design Changelog

Running log of design/craft changes, newest first. Copy changes are tracked separately
against the client's RC-numbered PDFs in `content/`.

---

## v5 — Craft refinement pass (27 Jul 2026)

**Brief:** "make it more premium" — explicitly *not* an overhaul. Structure the client
already approved stays exactly as-is. Palette untouched (green stays on CTAs, per his call).
Two files changed: `src/app/page.tsx`, `src/components/ui.tsx`.

### What was actually wrong (measured, not taste)

| # | Defect | Evidence |
|---|--------|----------|
| 1 | Product cards had ragged bottom edges | Row 1 bottoms at 588 / 592 / 570px — three different heights in one row |
| 2 | Orphan product card | 10 products ÷ 3 columns = last row had 1 card stranded left, 2/3 of the row empty |
| 3 | Hero CTA notch read as a rendering seam | Fillet radius was 23px against a 32px cutout radius and a 40px card radius — three mismatched arcs meeting |
| 4 | Product photography looked like mixed stock | 6 cards are dark in-situ plant photos, 3 are white-background studio cutouts (CTL Sheets, CTL Coils, Sheets) |
| 5 | One section carried the whole page | The ink "Why BSSI" band was the only non-flat surface; six other sections were `#FAF7F2` on `#FAF7F2` |
| 6 | Inconsistent motion | Hover transitions used mixed durations and default easing across card types |

### Changes

**Grid integrity**
- `ProductCard`: added `h-full`. This was the root cause of #1 — the card was `flex flex-col`
  but never told to fill its stretched grid cell, so each card sized to its own content.
- `ProductCard`: "Explore this product" moved below a `border-t` hairline with `pt-4`.
  Pins every CTA to one baseline regardless of how long the caption runs.
- Products grid: `lg:last:col-start-2` centres the 10th card in the middle column instead
  of stranding it at the left edge. Only applies at `lg` — at `sm` the 2-column grid divides
  evenly into 10 and needs no correction.

**Hero notch**
- Fillet radius 23px → 32px, patch size `h-6 w-6` → `h-8 w-8`, offsets `-top-6/-right-6` →
  `-top-8/-right-8`. The concave fillets now match the cutout's own `rounded-tr-[2rem]`,
  so the arcs meet tangentially instead of stepping.
- Note for future edits: the fillet radius **must** equal the cutout's `rounded-tr` value or
  the seam comes straight back. Comment left in `page.tsx` at the notch.

**Photography unification**
- Product card images: `bg-cream` floor + a `from-ink/25` bottom gradient + a
  `ring-1 ring-inset ring-ink/[0.07]` edge. Gives the studio cutouts and the plant photos a
  shared base and a defined edge, so they stop reading as two different sourcing jobs.
- Same inset ring applied to the About section image.

**Surface depth**
- Both ink bands ("Why BSSI", bottom CTA) now use the existing `.grain` class plus an
  `accent/[0.14–0.16]` corner radial at `blur-[120px]`. Both were flat `bg-ink` before.
  Reuses what v3 already established — no new visual language.

**Typography**
- `SectionHead` h2: `sm:text-4xl` → `sm:text-[2.625rem]`, `leading-[1.08]`,
  `tracking-[-0.035em]`, `text-balance`.
- `SectionHead` sub: `max-w-2xl` + `text-pretty`, and it now honours `center`
  (previously the heading centred but the sub did not).
- Stat numbers, the "12+" badge and the process step numbers: `leading-none` +
  `tracking-[-0.04em]`, label gap opened from `mt-1.5` to `mt-3`.
- Product card titles: `tracking-[-0.025em]` + `text-balance`.

**Motion — one curve everywhere**
- Standardised on `cubic-bezier(0.22, 1, 0.36, 1)`, matching the `.reveal` / `.rise`
  keyframes already in `globals.css`.
- Card lift `-translate-y-1` → `-translate-y-1.5`, shadow → `0_24px_50px_-18px`.
- Image scale on hover `1.05` → `1.06` at 900ms (product/industry), 1.04 at 1200ms (About).
- Arrow slide `translate-x-1` → `translate-x-1.5` at 300ms.
- Transitions narrowed from `transition-all` to explicit property lists — `transition-all`
  was animating properties it had no business animating.

**Buttons**
- `OutlineButton`: `rounded-lg` → `rounded-full`, `px-5` → `px-6`, plus a hover background
  wash. Unifies with the pill language the navbar and hero CTAs already use.

### Verification
- Production build clean: 21/21 routes static, TypeScript passes.
- Regression-checked `/products`, `/about`, `/resources` — all three use the shared
  `SectionHead` / `OutlineButton` / `ProductCard`.
- Mobile 390px: `document.scrollWidth` == viewport (390) — no horizontal overflow.
  Nodes that measure past the viewport all sit inside `overflow-hidden` parents
  (marquee track, hero card).

### Deliberately NOT changed
- **Green vs red.** First viewport still has five WhatsApp-green elements against
  essentially zero `#DF2F00`. His call to keep it. Revisit only if the client reopens it.
- Section structure, section order, copy, palette, fonts.

---

## v4 — Motion pass (24 Jul 2026)
Vault components pulled in: TextAnimate hero H1, NumberTicker stats, shimmer CTAs,
BorderBeam, motion-based Reveal, Accordion FAQ. See `bharat_steel_client` memory.

## v3 — Premium redesign (24 Jul 2026)
Glass pill navbar, layered ink hero, red ticker marquee, scroll-reveal, rounded photo cards.

## v1–v2 — Initial build (23 Jul 2026)
21 routes, light industrial-editorial, WhatsApp-routed conversion throughout.
