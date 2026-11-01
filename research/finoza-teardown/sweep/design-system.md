# Finoza Capital CRM — Design System Teardown

Extracted read-only from the live demo (admin `manage-dsa` + advisor `dsa-panel`), 29 Jul 2026.
All values below are **real computed styles** pulled via `getComputedStyle()` in a headless
Chrome session, not estimated from screenshots. Raw dumps: `computed-styles.json`,
`status-circles.json` (this folder). Screenshots: `shots-design/`.

Under the hood this is a stock **ArchitectUI (Reactstrap) admin template** —
`.app-container.app-theme-white`, `.app-sidebar`, `react-vertical-timeline-component` for
the "Loan Journey", DataTables.js for every list view, Pe7-style icon font. Almost nothing has
been re-skinned beyond the two "Theme Colors" hex fields and a logo swap. Good to know: we are
not competing with a bespoke design, we're competing with an unmodified open-source admin kit.

---

## 1. Colour palette (real hex, converted from computed rgb)

| Role | Hex | rgb() as computed | Where seen |
|---|---|---|---|
| Page / content background | `#F1F4F6` | rgb(241,244,246) | `.app-container` wrapper behind all cards |
| Card / sidebar background | `#FFFFFF` | rgb(255,255,255) | every `.card`, sidebar, header |
| Header (topbar) background | `#FAFBFC` | rgb(250,251,252) | fixed top nav, 75px tall |
| Body text | `#495057` | rgb(73,80,87) | default text colour |
| Muted / table cell text | `#6C757D` | rgb(108,117,125) | table `td`, secondary buttons, "0-PENDING" badge bg |
| Card border tint | `rgba(26,54,126,.125)` | — | 12.5%-opacity **navy** (#1A367E) — the only navy anywhere, and it's invisible |
| Brand orange (secondary, saved) | `#CE4909` | — | value stored in Theme Colors settings |
| Brand orange (as rendered) | `#CD750A` | rgb(205,117,10) | solid "View Lead" / primary buttons — doesn't exactly match the saved hex |
| Sidebar link / accent orange | `#CB710A` | rgb(203,113,10) | uppercase nav labels, "ACTIVE" category pill |
| Primary dark (saved) | `#393A3A` | — | Theme Colors "Primary Color" |
| Sidebar active item / "dark" buttons | `#444054` | rgb(68,64,84) | active sidebar li, Logout button, dark-outline buttons — a dark plum-navy, not the saved `#393A3A` |
| Info blue | `#16AAFF` | rgb(22,170,255) | "Under-Process" badge, "In Process" KPI %, info progress bar |
| Success green | `#3AC47D` | rgb(58,196,125) | "Approved"/"Disbursed" badges, success KPI, ACTIVE status pill |
| Warning amber | `#F7B924` | rgb(247,185,36) | "Has Query" KPI, query-state badges, "Open Tickets" |
| Warning amber text-on-amber | `#856404` / `#634E0E` | rgb(133,100,4) / rgb(99,74,14) | text on the cream "No data available" box and query pills |
| Danger red/pink | `#D92550` | rgb(217,37,80) | "Rejected"/"Blocked"/"Fake" badges, danger KPI, "Closed Tickets" |
| Cyan (Allocated status) | `#3FCAD8` | rgb(63,202,216) | "2-ALLOCATED" badge, commission-% pill |
| Purple (Archived status) | `#794C8A` | rgb(121,76,138) | "5-ARCHIVED" / "15-UN-ARCHIVED" |
| Table border / progress track | `#E9ECEF` | rgb(233,236,239) | table row dividers, empty progress-bar track |

**Theme Colors setting page** (`/setting/theme-colors`) is the only customisation surface: two
raw hex inputs (Primary `#393A3A`, Secondary `#CE4909`) plus a Light/Dark select. It doesn't
even round-trip faithfully — the buttons on screen render `#CD750A`, not the saved `#CE4909`.
There's no way to touch the status-badge colours, the info/success/danger palette, or spacing.

---

## 2. Status → colour table

The CRM has **18 numbered lead statuses** (0–17), the richest single piece of domain logic in
the product. Captured in full from the built-in `/lead/lead-status` legend page (`shots-design/admin_leadStatus.png`) cross-checked against live badge computed styles.

| # | Label | Category | Badge bg | Badge text |
|---|---|---|---|---|
| 0 | Pending | Initial | `#6C757D` (gray) | white |
| 1 | Submitted | In Progress | `#CB710A` (orange) | white |
| 2 | Allocated | Active | `#3FCAD8` (cyan) | white |
| 3 | Under-Process | Processing | `#16AAFF` (blue) | white |
| 4 | Approved | Completed | `#3AC47D` (green) | white |
| 5 | Archived | Closed | `#794C8A` (purple) | white |
| 6 | Rejected | Closed | `#D92550` (pink/red) | white |
| 7 | Docs Query - EA | Processing (query) | `#F7B924` (amber) | `#856404` dark-amber |
| 8 | Query Resolved - AE | Processing (query) | `#F7B924` (amber) | `#856404` dark-amber |
| 9 | Docs Query - LA | Processing (query) | `#F7B924` (amber) | `#856404` dark-amber |
| 10 | Query Resolved - AL | Processing (query) | `#F7B924` (amber) | `#856404` dark-amber |
| 11 | Blocked | Closed | `#D92550` (pink/red) | white |
| 12 | Disbursed | Completed | `#3AC47D` (green) | white |
| 13 | Fake | Closed | `#D92550` (pink/red) | white |
| 14 | Brand Disbursed | Completed | `#3AC47D` (green) | white |
| 15 | Un-Archived | Closed | `#794C8A` (purple) | white |
| 16 | Lead Issue | Closed | dark gray/black | white |
| 17 | Issue Resolved | Completed | `#3AC47D`-family (teal-green) | white |

**The flaw**: statuses 7–10 (the whole document-query ping-pong that Finoza's own SPEC calls
its most valuable feature) are all rendered in the *identical* amber, and 6/11/13 (Rejected /
Blocked / Fake — three legally/operationally different outcomes) all share the same red. Colour
carries zero information once you're inside a category — you must read the tiny text.

Badge anatomy (all statuses): `border-radius: 4px`, `padding: 5px 10px`, `font-size: 10.56px`
(0.66rem — genuinely tiny), `font-weight: 700`, `text-transform: uppercase`. Fully-round count
badges (e.g. unread "8") use `border-radius: 800px` instead.

Other one-off badges seen: green `0 UNREAD` pill, red `LIVE` ribbon badge on advisor product
tiles (`bg #D92550`, `border-radius 4px`), green `ACTIVE` employee/advisor-status pill, cyan
`0.00 %` commission pill on the team table.

---

## 3. Typography

- **Font family (everywhere, no exceptions found):** the browser default stack —
  `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", …`
  There is **no custom webfont loaded anywhere** in the product. `<html>` itself has no
  font-family rule set and falls back to `Times` if `<body>`'s rule is ever skipped.
- **Root sizing:** the template scales the root to `14.08px` (88% of 16px) — i.e. Bootstrap's
  `$font-size-base` was set to `0.88rem`. Line-height is a flat `1.5` (`21.12px`).
- **Section/card titles** ("Lead Management", "Conversation History"): `17.6px / 600 / 1.0`.
  Barely larger than body text — there is almost no type-scale step between a section heading
  and a table cell.
- **Table headers:** `14.08px / 700`, no letter-spacing, sentence case (not uppercase).
- **Badges:** `10.56px / 700 / uppercase`.
- **Buttons:** `12.8px / 500`, no uppercase.
- **KPI hero numbers** (dashboard %, counts): `25.6px–28.8px / 700`, coloured per status
  (see palette above), font-family unchanged from body stack.
- **Breadcrumb / muted labels:** same `14.08px / 400`, colour `#495057`.

Net effect: a **two-weight, one-family, three-size** typographic system (400 / 500 / 700 at
~10.5 / 12.8 / 14 / 17.6 / 26px). Nothing about the type feels designed — it's Bootstrap defaults
with a smaller base size.

---

## 4. Spacing & shape

| Token | Value |
|---|---|
| Card border-radius | `4px` |
| Card border | `1px solid rgba(26,54,126,.125)` (a barely-visible navy tint) |
| Card box-shadow | effectively none (`0 0 0 0`) — cards read as flat rectangles separated only by the `#F1F4F6` gutter |
| Card bottom margin (gap between stacked cards) | `24px` |
| Button border-radius | `3.2–4px` (buttons), `50px` (a couple of pill-shaped ones e.g. Logout) |
| Button padding | ranges `4px 8px` (dense table-row buttons) → `8px 12px` (toolbar buttons) — inconsistent scale, no clear sm/md/lg system |
| Table header height | `37px` |
| Table row height | `37px` — same as the header; very cramped for rows containing a name + WhatsApp/phone icons + two timestamps |
| Table cell padding | `8px` flat, all sides |
| Table border | `1px solid #E9ECEF`, bottom-only |
| Header (topbar) height | `75px`, drop-shadow: layered soft shadow (`0 7.5px 35px rgba(4,9,20,.03)` × 3 stacked) |
| Sidebar shadow | `7px 0 60px rgba(0,0,0,.05)` — soft right-edge glow, no hard border |
| Progress bar track height | thin (`.progress-bar-xs`), track colour `#E9ECEF` |

---

## 5. Layout

- **Sidebar:** fixed, `280px` wide, white background, does **not collapse to icons** — on
  narrow viewports it just gets a scrollbar (confirmed: `advisor_all.png` shows a sidebar
  scrollbar cutting off "CRM SETTINGS" sub-items). No responsive/collapsed rail mode exists.
- **Header:** fixed, `75px`, spans full width right of the sidebar; contains two always-visible
  global search boxes ("Search Lead #", "Search Advisor #") plus account menu — no hamburger,
  no visible breadcrumb — search-only nav.
- **Content max-width:** none — cards stretch to fill the remaining viewport width edge-to-edge
  (e.g. `1672px` wide card at a `1600px` viewport). On wide monitors this makes tables and forms
  sprawl uncomfortably (see `admin_advisorAll.png`: a name/mobile/email/DOJ/earning/status row
  stretched across the full width with huge empty gutters between short-text columns).
- **KPI grid:** dashboard/report top strip is a simple 4-up flex/grid of equal-width stat cards,
  no responsive column collapse tested but likely stacks at mobile widths (Bootstrap grid).
- **Advisor dashboard** additionally carries two full-width **stock-illustration ad banners**
  ("Unsecured vs Secured Credit Card", "Will my credit score decrease…") above the KPI strip —
  marketing content embedded inside the product's primary dashboard real estate.

---

## 6. Component inventory

**KPI / stat tile** — white card, small gray label + sublabel, one large bold coloured number
(26–29px), optionally a thin horizontal progress bar underneath tied to the same colour. Used
identically on Dashboard, Advisor Overview, Payouts, Report Overview.

**Data table** (DataTables.js) — sentence-case bold headers with tiny sort carets (▲▼) baked
into every header cell; `Show [N] entries` control top-left, `Search:` box top-right,
`Showing X to Y of Z entries` + `First/Previous/Next/Last` text-button pagination bottom-right.
Every list (leads, advisors, payouts, employees) uses this exact chrome. Loading state is a
single literal `Loading…` text row — no skeleton, no spinner.

**Filter/search bar** — the global top-nav has two persistent free-text boxes (Lead #, Advisor
#) with a small indigo circular search-icon button; separate from the per-table DataTables
search box. Two different search UIs coexist on every page.

**Status badge** — see palette section; also used as a "Send Email to Advisor?" pill-style
warning banner (pink background, same shape language as a badge but full-width).

**Lead detail header strip** — icon-badge row: circular colored icon (product/loan-amount/
advisor/status), label above value, laid out horizontally with dividers. Reused verbatim across
every lead-type detail page (Kyc Loans, Instant Loan, Business Loan, …).

**Lead Remarks split-panel** — a two-column pattern unique to lead detail: left = "Lead
Management" form (current-status badge, a "Send Email to Advisor?" warning strip, a status
`<select>` **plus a raw numeric status-code box** sitting next to it, a remark textarea, submit
button); right = "Conversation History", a **dark near-black card header** ("Conversation
History" in white text) containing threaded messages — avatar circle with initial, name, a
role badge (`EMPLOYEE`/`ADVISOR`), timestamp, message bubble on cream background.

**Lender Details table** — a data table variant with a **dark (near-black) header row**
instead of the usual light gray header — the only place in the product this happens, so it
reads as a one-off rather than a deliberate "important table" convention.

**Loan Journey timeline** — `react-vertical-timeline-component`, default/unthemed: colored dot
icon per event, connecting vertical line, timestamp + status + remark text. In the live capture
this rendered almost **illegible** — very low-contrast gray-on-white text, official library
defaults never restyled to match the rest of the product.

**Empty-state box** — a flat cream/beige (`#FDF3D7`-ish) full-width bar with dark-amber text
reading "No data available". Used for benign empty states (e.g. "Admin - Disbursed Details" on
a lead that simply hasn't disbursed yet) — visually it reads as a warning, not neutral info.

**Notifications inbox** — three stacked panels (Leads / Account / System), each with a card
header showing a count `(172)` and a green `0 UNREAD` pill; rows are a plain table (# / From /
Date / Notification / Action) with a solid blue pill "View Lead" button per row.

**Support ticket stats** — three solid-fill (no white background) colored blocks side by side:
orange "Total Tickets", green "Open Tickets", pink "Closed Tickets" — the one place flat
solid-color KPI tiles are used instead of the white-card KPI pattern, another inconsistency.

**Theme Colors settings form** — label + native `<input type=color>` swatch + paired hex text
input, repeated for Primary/Secondary, plus a Theme Type `<select>` (Light/Dark). No live
preview, no palette beyond two colours.

**Product picker grid (advisor side)** — 6–9 equal icon tiles (radio-selectable), each with a
flat vector illustration, product name, and a red `LIVE` ribbon badge top-right. Same tile
component reused for both the dashboard "Add New Leads" quick-launch grid and the dedicated
"Select Product" page.

**Login screen** — 50/50 split: left half a warm-orange-tinted stock photo with a semi-transparent
dark caption card ("Finoza Capital – DSA Panel" / marketing copy); right half a plain white form
— pill-shaped black "DEMO" logo badge, a dark pill tab labeled "DSA LOGIN"/"CRM ADMIN", Email +
Password fields, "Keep me logged in" checkbox, solid-orange "Login" + dark "Register New
Account" buttons side by side, "Reset" link, CRM version number bottom-left.

**Team / advisor table row** — avatar placeholder circle (generic silhouette, small green
online-dot), ID, name, mobile (click-to-call icon), email, DOJ, a solid-color "Total Earning"
pill (green), a solid-color status pill (green "ACTIVE"). Same row anatomy for Advisors,
Employees, and Team Members lists.

---

## 7. Interaction details

- **Row hover/selection:** visited/selected table rows get a flat light-blue highlight
  (visible in `dashboard.png` row #363 and `advisor_all.png` row #92) — no transition, no border
  accent, just a background swap.
- **Active nav state:** sidebar item gets a solid dark (`#444054`-ish) background block with
  white text and bold weight; inactive items are plain orange text on white, no background.
- **Focus rings:** no custom focus styling observed on any input — likely relying on unstyled
  browser default outlines (i.e. essentially invisible on this design, a real accessibility gap).
- **Loading state:** literal `Loading…` text inside the table body before the DataTables ajax
  call resolves — a visible content flash/jump on every list page load.
- **Pagination:** classic DataTables `First / Previous / Next / Last` text buttons in bordered
  gray boxes; per-column sort uses tiny up/down carets crammed next to the header label, easy to
  miss at 14px.
- **Search boxes:** unstyled Bootstrap `<input>` — no leading icon, no clear/reset affordance,
  no debounce indicator.
- **Buttons vs. "colored text pretending to be a button":** several nav actions ("Message
  Inbox", "Support Tickets", "View All Leads") render as *just colored text*, no visible
  border/fill/background — indistinguishable at a glance from a plain label until hovered.

---

## 8. What's dated / bad — and what a modern version should do instead

1. **No brand typeface anywhere** — pure system-font stack, scaled to a slightly-too-small
   88% base. It reads as an unstyled admin template, not a lending brand. → **Use Geist
   everywhere**, set a real modular type scale (e.g. 12/14/16/20/28/36), and never dip below
   13px for body text or 11px for badges (their 10.56px badge text is borderline unreadable).

2. **Status colour system collapses under its own complexity** — 18 statuses map down to
   essentially 6 colours, with 3 legally-distinct terminal outcomes (Rejected/Blocked/Fake) and
   4 different query-direction states each sharing one colour. → Give every status its own hex
   from an extended qualitative palette (not just Bootstrap's 4 semantic colours), and put the
   status **name**, not just colour, at a legible size — never rely on colour alone for an
   18-way distinction.

3. **Empty ≠ warning.** Cream/amber "No data available" boxes for completely normal empty
   states (a lead that hasn't disbursed yet) train the user to distrust every warning colour on
   the screen. → Neutral gray empty-state treatment (icon + one line of muted text), reserve
   amber/red strictly for things that need action.

4. **Inconsistent "important" signaling** — a dark table header shows up exactly once (Lender
   Details), a dark card header shows up exactly once (Conversation History), flat solid-color
   KPI tiles show up exactly once (Support), and the vertical-timeline component is left in
   its unthemed, nearly-illegible default state. Every one of these reads as "we didn't get to
   this screen yet" rather than a deliberate hierarchy. → Pick ONE elevated-surface treatment
   (e.g. navy `#0B3B78` header bar with white text) and reuse it everywhere something is
   genuinely primary — timeline included, themed to match, never left at library defaults.

5. **The theme customizer is cosmetic, not systemic** — two hex fields that don't even
   round-trip to the actual rendered button colour. → If we ship a white-label color picker,
   drive it from real design tokens (CSS variables) so changing "primary" actually recolors
   every primary button/badge/link consistently — no hand-authored hex drift.

6. **Density without hierarchy** — 37px table rows, 4px card radius, near-invisible card
   borders/shadows, and section titles barely bigger than body text combine to make every
   screen look like a flat wall of gray text. → More generous row height (44–48px) on data
   tables that carry avatars/icons, visible (not near-transparent) card borders or a real soft
   shadow, and a section-title step that's actually 1.4×+ the body size.

7. **No focus states, no keyboard affordances** — likely relying on unstyled browser defaults.
   → Ship visible focus rings (navy outline) and hover states with a subtle transition on every
   interactive element — this is free professionalism most competitors skip.

8. **Marketing banners inside the working dashboard** (stock-illustration credit-card ads) —
   cheapens the primary screen a DSA/employee looks at all day. → Keep the dashboard 100%
   operational; if cross-sell content is wanted, give it its own dedicated, clearly-labeled slot.

---

## RECOMMENDATIONS FOR OURS

Brand: navy **#0B3B78** + green **#068A3E**, font **Geist**, light UI.

**Copy directly (these patterns are genuinely good, keep them):**
- The **numeric-coded status system** (0–17) is a real strength — keep numeric codes in the
  data model even if we simplify the UI labels, since ops/support teams reference "status 3"
  verbally. Surface the code as a small monospace suffix next to the label, not as a second
  editable input box (their "type the number into a text box next to the dropdown" pattern is a
  bug-magnet, don't copy the *mechanism*, only the *concept*).
- **KPI tile + inline progress bar** tied to the same semantic colour — simple, scannable,
  worth keeping as our dashboard's top strip.
- **Two-column lead detail** (form on the left, conversation thread on the right) is the right
  information architecture — keep it, just theme both sides consistently.
- **DataTables-style list chrome** (entries-per-page, inline search, pagination) is a known,
  learnable pattern for ops users who live in spreadsheets all day — don't over-modernize this
  into an infinite-scroll feed; DSAs want to count rows and export CSV.
- **Global lead/advisor quick-search in the topbar** — genuinely useful for a support agent on
  the phone; keep it, but make it one unified search rather than their two separate boxes.

**Improve:**
- Replace the 6-colour Bootstrap semantic set with a **12–18 colour qualitative status
  palette** anchored to our navy/green brand (green family for the 3 "completed" states, a
  distinct amber-family *per query direction*, a genuinely different red for
  fraud/blocked vs. plain rejected).
- Elevate our **navy `#0B3B78`** to do the job Finoza's invisible `rgba(26,54,126,.125)` card
  border was gesturing at but never committed to — use it as: active sidebar item, primary
  section headers (Conversation History-style dark bars), primary buttons. Reserve **green
  `#068A3E`** purely for positive/completed states (Approved, Disbursed, Active) so it stays
  meaningful and isn't diluted as a generic "go" button color.
- Real type scale in Geist: e.g. 12 (badge) / 13 (table) / 14 (body) / 16 (card title) /
  20 (page title) / 28+ (KPI number), with badges at minimum 11–12px and uppercase reserved for
  short labels only (their 3-word status pills that wrap awkwardly should go sentence-case).
  Test at real device widths — Finoza's edge-to-edge 1600px+ cards showed how bad "no
  max-width" looks on wide monitors; cap content at ~1440px and let the gutter breathe.
  Increase table row height to 44–48px for anything with an avatar/status/icon in the row.
- Give empty states a **neutral** gray/navy-tint treatment distinct from warning amber, and
  restyle the loan-journey timeline (or replace the library) so it's legible and on-brand rather
  than left at its unstyled default.
- Make every clickable element look clickable — no borderless colored text masquerading as a
  button; use a real ghost/tertiary button style everywhere they used "just colored text".

**Discard entirely:**
- The marketing ad banners baked into the operational dashboard.
- The "type the raw status number into a text box next to the status dropdown" UI for
  updating lead status — a real usability/data-integrity risk (typo → wrong status).
- The two-hex-field "theme customizer" as a design system stand-in — if we offer white-label
  theming, do it with a proper token set, not two orphaned inputs that don't match what
  actually renders.
- Reliance on system fonts / no explicit `font-family` on `<html>` — always declare Geist
  explicitly at the root, with a real fallback stack, so nothing ever silently drops to Times.
