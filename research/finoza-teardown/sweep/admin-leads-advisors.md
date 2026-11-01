# Finoza admin CRM — deep sweep: ADVISORS + LEADS

Read-only pass on top of `docs/finoza/SPEC.md` and `docs/finoza/crawl.json` (29 Jul 2026
crawl). This file only adds detail not already in SPEC.md: exact colours (computed
`rgb()` from the live DOM), full dropdown option lists, badge class names, tab-by-tab
advisor detail content, and the two admin-leads pages that turned out to be broken/empty
in the demo data.

Screenshots: `docs/finoza/sweep/shots-admin/`. All captured logged in as
`support@finozacapital.co.in`, read-only (no submit/delete clicked).

Stack tell: badge/button classes are literally `badge bg-info`, `badge bg-success`,
`badge bg-warning`, `badge bg-secondary`, `btn btn-outline-primary` — this is a
**Bootstrap 5 admin theme** (looks like a ThemeForest "ArchitectUI"/"Datta Able"-family
kit), not a custom design system. Explains the identical rounded-pill badges, the
`data-bs-toggle="tab"` tab widgets, and the DataTables.js grid on `/lead/all`.

---

## Global chrome (present on every page)

Top bar, left to right:
- Black pill logo badge "DEMO"
- **Lead** search box — placeholder `Search Lead #`, magnifying-glass button (indigo `rgb(84,60,235)`-ish icon)
- **Advisor** search box — placeholder `Search Advisor #`, same search button
- Right side: 🌙 dark-mode toggle button (`bg: rgb(108,117,125)` grey circle), account dropdown "Capital Finoza / CRM Admin", and three notification pills:
  - **Message Inbox** — pill badge count **`8`**, `badge bg-info` → `rgb(22,170,255)` blue, white text
  - **Support Tickets** — pill badge **`New`**, `badge bg-success` → `rgb(58,196,125)` green, white text
  - **Open Messages** — pill badge **`512`**, `badge bg-warning` → `rgb(247,185,36)` amber, **dark** text (`rgb(33,37,41)`)
  - **Logout** button, solid dark-purple/navy `rgb(68,64,84)`, white text

Left sidebar order confirmed: DASHBOARD, ADVISORS (Advisors, All Advisors), LEADS
(Lead Overview, Lead Report & Filter, View All Lead, My Disbursement, Advisor
Disbursement, Payout Status, Lead Status), PAYOUTS, REPORTS, PRODUCTS, NOTIFICATIONS,
PROFESSIONAL EMAIL, EMPLOYEE MANAGEMENT, DATA SYNC, CRM SUPPORT, SERVICE PAYMENT,
IMAGE MANAGER, BLOG MANAGER, WEBSITE SETTINGS, MENU SETTINGS, PAGE SETTINGS,
CRM SETTINGS. Footer of the collapsed sidebar area has a small "🔂 CRM Changelogs" link.

Button colour palette used throughout (measured, not eyeballed):
| Label / role | Background | Text |
|---|---|---|
| Primary action (Login, View, Open Messages, Apply Filter, Download Excel) | `rgb(205,117,10)` burnt-orange | white |
| Secondary/gold (Login on advisor row, "512" badge) | `rgb(247,185,36)` amber | black/dark |
| Destructive (Reset, Delete Advisor, Delete Lead, Support Tickets badge) | `rgb(217,37,80)` crimson-pink | white |
| Info / primary-blue (Add Advisor, Update Status, Message Inbox badge, Under-Process badge) | `rgb(22,170,255)` blue | white |
| Success / green (badge bg-success, ACTIVE pill, "New" badge) | `rgb(58,196,125)` | white |
| Neutral/dark (Download CSV, Logout, breadcrumb icon) | `rgb(14,30,50)`–`rgb(68,64,84)` near-black navy | white |
| Secondary/grey (Pending badge, dark-mode toggle) | `rgb(108,117,125)` | white |

---

## 1. `/advisor/adv` — Advisor Overview (short list)

Breadcrumb: `🏠 / Dashboard / Advisor / Overview`. Header: **"Advisor Overview"**.

KPI strip (4 cards, no percentage bars on this page — those are dashboard-only):
- **Total** — big black number (88 at capture time) — sublabel "Total Advisors"
- **Active** — number in amber/gold — sublabel "Active Advisors"
- **In-Active** — number in red/crimson — sublabel "In-active Advisors"
- **Blocked** — number in red/crimson — sublabel "Blocked Advisors"

Section header: **"👤 Recent Advisors"** with a **"View All Advisors ›"** button (white/outline) top-right.

Table — plain HTML table, **no DataTables, no search box, no pagination** (30 rows
hardcoded as "recent"):
`Advisor Code | Joining Date | Advisor Name | Advisor Contact | Email Verify | Earning | Status | Action`
- Advisor Code format: `FC` + 8 digits, e.g. `FC08609010` — looks like a timestamp-ish serial, not sequential per row (out of chronological order across advisors, i.e. it's assigned once at signup, not row-order).
- Joining Date format: `DD-Mon-YYYY` (`28-Jul-2026`), with a small calendar glyph icon before it.
- Advisor Contact cell contains **two lines**: phone (with 📞 handset icon) and email (with ✉️ icon) stacked in the same cell.
- Email Verify column is an **icon-only** cell: green circular check ✅ if verified, red triangular ⚠️ if not — no text label at all.
- Earning column: currency always `₹ 0.00` in the demo data (every single advisor, no exceptions across 30 rows — payouts clearly aren't wired to real numbers here).
- Status column: small icon (two-tone green person-with-checkmark glyph), not a text pill on this table (contrast with `/advisor/all` which uses a text pill instead — see below).
- Action column: **two buttons per row** — `View` (burnt-orange `rgb(205,117,10)`) and `Login` (amber `rgb(247,185,36)`, black text) — "Login" impersonates as that advisor (log in as them), a common DSA-CRM pattern.
- One row was highlighted pale-blue (`FC08451713` / `ABHINASH KUMAR`) — likely a "just updated" or hover-state row, not a status color.

## 2. `/advisor/all` — All Advisors (the full list)

Breadcrumb identical. Header "Advisor Overview" again (same page shell, different route — this is the full-list variant of the page above; the sidebar highlights **"All Advisors"** as the active sub-item vs **"Advisors"** for `/advisor/adv`).

KPI strip: same 4 cards (**Total / Active / In-Active / Blocked**), values were **95** at this capture (vs 88 minutes earlier from `/advisor/adv` — the counts drift because this demo has other read-only crawlers hitting it concurrently / seed data changing).

Top-right: **"+ Add Advisor ▾"** button, solid blue `rgb(22,170,255)`, white text, chevron suggesting a dropdown (not expanded/clicked — read-only).

Table headers differ from `/advisor/adv` — this is a **different column set**, not just more rows:
`ID | Photo | Name | Mobile | Email | DOJ | Total Earning | Status`
- `ID` is `#95` down to `#66` — this is a raw sequential auto-increment primary key, separate from the `FC########` Advisor Code shown inline next to the name.
- `Photo` column: grey circular placeholder avatar with a small green "online" dot badge overlapping the bottom-right — every row has the same placeholder image (no real photos uploaded in the demo).
- `Name` cell shows **`FC08609010 - ABHINASH KUMAR`** on one line, then a grey `NA` on the second line (this second line is presumably "Company Name" — seen populated once, `Digi Tech Solutions`, for advisor #1/oldest row).
- `Total Earning`: rendered as a green **pill badge** `₹ 0.00` (`badge bg-success`), not plain text — every row.
- `Status`: rendered as a solid green **pill badge** `ACTIVE` (`badge bg-success`, uppercase) — text pill here, unlike the icon-only status on `/advisor/adv`.
- One advisor row (`#69 FC08S321587`) has a mobile number blank (phone icon with nothing after it) — an actual missing-data case worth handling in our UI (empty state per-field, not just per-table).
- Advisor Code format has a variant: normally `FC` + 8 digits, but two rows show `FC08S321587` / `FC08S513255` — an **`S` inserted into the numeric code** (likely "sub-advisor" marker). Confirms the Advisor/Sub-Advisor distinction is encoded **inside the code string itself**, not a separate column.

No search/pagination here either — same plain-table, no-DataTables pattern as `/advisor/adv`. Given 95+ advisors and no pagination, this table is unbounded-scroll (just keeps rendering rows down the page).

## 3. `/advisor/view/4` — View Advisor (full tab breakdown)

Breadcrumb: `🏠 / Dashboard / View Advisor /` (trailing slash, no advisor name in the crumb).
Page header **"📋 Advisor Details"**, top-right red **"Delete Advisor"** button (`rgb(217,37,80)`).

Tab bar (Bootstrap `nav-tabs`, pill-style buttons `btn-outline-primary` that fill solid navy `rgb(68,64,84)`/indigo when active): **Advisor Account · Basic Details · Contact Details · Bank Details · Advisor Password · Documents · Advisor Agreement**.

Below the tab panel, **identical on every tab** (doesn't re-render, it's a fixed section under the tabs, not per-tab content):
- 5 KPI mini-cards: **ALL LEADS** `291` / **IN PROCESS** `283` with a small circled sub-number `97` / **APPROVED** `0` circled `00` / **DOCS QUERY** `8` circled `03` / **REJECTED** `0` circled `00`. The circled numbers appear to be **this-month vs all-time** (or "new since last view") counts, distinct from the big number.
- **"📦 Demo DSA's Leads"** table with a `View All Leads ›` button, columns: `# | Lead Status | Added / Updated | Customer Info | Product | RM | Admin / Advisor | Actions`. Actions = `View Lead` (orange) + `Delete Lead` (crimson) per row.
- Footer stat row (5 cells): **Total Loan Disbursed** (`291 Leads`) · **Total Payout** (`Year 2026`) · **My Commission** (`0 %` in blue, "Average") · **Paid** (`₹ 0.00` green, `Year 2026`) · **Pending** (`₹ 0.00` amber, `Year 2026`).
- **"📦 Admin Disburse For Demo DSA's Leads"** — pale-yellow banner: **"No data available"**.

### Tab: Advisor Account (default/first tab)
Two radio groups: **Status*** — `Active / In-Active / Blocked` — and **Verify*** — `Verified / Not Verified`. Single **"💾 Update"** button (dark navy). No "New Password" fields visible on this tab despite the crawler's generic form-scrape showing a hidden `New Password` field name here — that field actually belongs to the **Advisor Password** tab (Bootstrap tabs share one `<form>` wrapper, which is why the raw crawl attributed it to the wrong tab).

### Tab: Basic Details
Read-only-looking grid, no visible Save button captured: `Advisor Code` (`FC08524097`) · `Email` (`demodsa@finozacapital.com`) · `Company Name` (`NA`) · `Dob` (blank) · `Aadhar` (blank) · `Pan` (blank), second row `Gender` (blank) · `Married` (blank).

### Tab: Contact Details
`First Name` (`Demo`) · `Last Name` (`DSA`) · `Mobile` (`7845124578`) · `Alternate Number` (`0`) · `Address Line 1` (`0`) · `Address Line 2` (`0`), second row `Landmark` (`0`) · `State` (blank) · `District` (`0`) · `City` (`0`).
Note the **placeholder convention**: empty fields render literal `"0"` rather than a blank/dash — this is a real Finoza quirk, not a screenshot artifact (confirmed via DOM text dump). Worth deciding explicitly whether our build shows blank, `—`, or `0` for unset fields.

### Tab: Bank Details
`Bank Name` (blank) · `Account Number` (blank) · `Account Holder Name` (`Demo DSA`) · `Ifsc Code` (blank) · `Upi` (blank) · `Account Type` (blank). Below: a **`Status`** text input showing `In-Active` (this looks like a stray/disabled input rather than a dropdown — same row height as a `<select>` but only one line, no arrow chrome visible).

### Tab: Advisor Password
Header **"Change advisor Password"**, note text: *"Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."* Fields: `New Password*`, `New Password Confirm*`, button **"💾 Change Password"** (dark navy).

### Tab: Documents
**Completely empty** — the tab-content panel renders with zero fields, zero upload widgets, zero placeholder text. Either no document-upload UI exists yet for this advisor, or it's conditionally hidden until some prerequisite is met.

### Tab: Advisor Agreement
**Also completely empty**, same as Documents — no PDF viewer, no e-sign status, nothing.

---

## 4. `/lead` — My Leads Overview (dashboard-style)

Breadcrumb: `🏠 / Dashboard / My Leads / Overview`. Header **"📋 My Leads Overview"**.
This is the **admin's own leads**, scoped narrower than `/advisor/view/4` (141 vs 291 — different advisor/admin bucket).

Same 5-KPI-card row as advisor view: **ALL LEADS 141 / IN PROCESS 135 (96) / APPROVED 0 (00) / DOCS QUERY 5 (04) / REJECTED 1 (00)**.

Table **"📦 Advisor's Leads"** (note: different title text from the advisor-view table, "Advisor's Leads" not "Demo DSA's Leads" — generic when viewed at the top My Leads level):
`# | Lead Status | Advisor | Updated / Added | Customer Info | Product | RM | Actions`
- **Advisor** column here shows `Name / FCcode` **and a `VIEW ADVISOR` button inline in the same cell**, plus WhatsApp 🟢 and phone 🔵 quick-contact icons — this column is richer than the same-named column elsewhere.
- One row (`#67`) is highlighted **pale yellow with a dashed border** and an ℹ️ info glyph next to the status pill — this looks like a genuine "flagged/needs attention" row style, distinct from the plain blue hover-highlight seen on `/advisor/adv`. That row also has real data: `Business Loan`, `₹220000.00`, customer `RINA DEBNATH` — the only non-zero loan amount seen anywhere in this whole sweep, and the only row with an Updated date (`26-Jul-2026`) far apart from its Added date (`25-Mar-2026`) — i.e. a lead that's been sitting for 4+ months.
- Status pill colours confirmed: `3 - UNDER-PROCESS` = blue (`bg-info`), `2 - ALLOCATED` = teal/cyan (`rgb(63,202,216)`), `0 - PENDING` = grey (`bg-secondary`).

## 5. `/lead/report` — Lead Report & Filters

Breadcrumb: `Dashboard / Lead / Report & Filters`. Header **"Lead Report & Filters"**.
**Pure filter form, zero results table/list rendered below it** — applying the filter presumably navigates elsewhere or AJAX-loads a table that isn't there until you click (not tested, read-only).

Fields (confirmed full option lists from the live DOM):
- **Lead Status** select — `All Status` then **18** numbered options `0 - Pending` through `17 - Issue Resolved` (see full canonical list in §8 below — this confirms the status set is 0–17, not 0–12 as previously documented).
- **Loan Type** select — `All Loans, 1 - Instant Loan, 2 - Personal Loan, 3 - Business Loan, 5 - Home Loan, 10 - Credit Card, 12 - Demat Account, 14 - Bank Account, 17 - Loan Against Shares, 18 - Kyc Loans`
- **Show Leads** select — `10 Leads, 50 Leads, 100 Leads, 500 Leads`
- **Start Date** / **End Date** — native `<input type=date>`, placeholder `dd/mm/yyyy`
- Buttons: **Apply Filter** (burnt-orange) / **Reset** (crimson)

## 6. `/lead/all` — Lead List (DataTables — appears BROKEN in this demo)

Breadcrumb: `Dashboard / Lead List / View`. Header **"🏛 Lead List View"**, card title **"📦 All Advisor's Leads"**.

This is the only page in the whole sweep built on a real **DataTables.js** grid (sortable
column arrows ↑↓ on every header, a `Search:` box, `First / Previous / Next / Last`
pagination controls). Buttons: **Download CSV** (near-black `rgb(14,30,50)`) and
**Download Excel** (burnt-orange).

Columns: `# | Status | Last Update | Advisor | Product | Amount | Customer | Mobile | Actions` (matches SPEC.md).

**Finding: the table never loads.** On every capture (both the original 29-Jul crawl and
this fresh sweep, several minutes apart, with 1.8s+ wait), the body permanently shows
**`Loading...`** and the footer reads **"Showing 0 to 0 of 0 entries"** — the DataTables
AJAX call appears to fail silently in this demo environment. This is either a genuinely
broken feature in Finoza's own demo, or it requires a POST/session state our crawler
didn't trigger. Flag as untested rather than assume the columns/behavior are real.

## 7. `/lead/my-disburse` and `/lead/disburse` — Disbursement summaries (empty demo data)

Both pages share one layout, titles **"Lead My Disburse"** (breadcrumb `Lead / My Disburse`)
and **"Lead Advisor Disburse"** (breadcrumb `Lead / Advisor Disburse`) respectively. A
small **`...`** overflow-menu glyph sits top-right of the header on both (never expanded — read-only).

5 stat cards, identical shape on both pages (only the labels swap "My" ↔ "Advisor"):
`Total Disbursed Amount` (`0 Leads`) · `My/Advisor Total Commission` (`Till Year 2026`) ·
`My/Advisor Total Commission Paid` (`₹ 0.00` green, `Till Year 2026`) ·
`My/Advisor Total Commission Pending` (`₹ 0.00` amber, `Till Year 2026`) ·
`My/Advisor Commission` (`0 %` blue, `Average`) — on `/lead/disburse` the last two cards
are relabelled `Advisor Commission Paid` / `Advisor Commission Pending` / `Advisor Commission %`.

Below: card **"📦 My/Advisor Disbursed - Leads"** with a pale-yellow banner
**"No data available"** — no table, no columns rendered at all (can't confirm column
set for these tables from this demo — zero disbursed leads exist in the seed data).

## 8. `/lead/payout-status` — Payout Status Guide (static reference page)

Breadcrumb: `Lead / ...` header simply **"Payout Status Guide"** (no card wrapper, sits directly on the grey canvas). This is a **legend page**, not a data table — 5 stacked full-width coloured banner blocks, each with a bold title-left / action-button-right header row, then a body row split into a status code+description (left) and a "Next Action" hint with a right-arrow icon and a blue link-styled sentence (right):

| Banner colour | Title | Code | Description | Next-Action button |
|---|---|---|---|---|
| Amber/gold `rgb(≈247,185,36)` | Brand Commission Generated | `[0] Payout Status` | "Loan is disbursed and Brand Commission has been generated for this lead." | **Generate Advisor Commission** (outline) |
| Blue (2 banners, same blue) | Advisor Commission Generated | `[1] Payout Status` | "CRM Admin has generated Advisor commission for this lead." | **Re-Check Brand Payout** (outline) |
| Blue | Brand Payout Received | `[2] Payout Status` | "Brand has released payout for this lead to registered payment method." | **Pay Advisor Commission** (outline) |
| Green | Advisor Payout Paid | `[3] Payout Status` | "CRM admin has paid advisor commission successfully to advisors registered payment method." | **Payout Completed** (outline) |
| Crimson/red | **Error** | `[4] Payout Status` | "Commission Generation Error" | *(no button)* |

This is a **separate 0–4 status machine from the lead status** (0–17) — payout status
tracks the money side of a disbursed lead independent of the lead's own status code.
Not mentioned anywhere in SPEC.md; worth its own `payout_status` enum/column in our schema.

## 9. `/lead/lead-status` — Lead Status Workflow Guide (the full 0–17 legend)

Header **"Lead Status Workflow Guide"** with an inline sub-tagline *"Track Your Lead
Progress From Initiation To Completion"*. A grey **"📊 Status Categories"** bar groups
the 18 codes into 6 category pill-badges: **INITIAL** (grey) **IN PROGRESS** (amber)
**ACTIVE** (orange) **PROCESSING** (blue) **COMPLETED** (green) **CLOSED** (crimson) —
and a right-aligned **"ℹ️ Quick Stats"** readout: *"Total Status Codes: 18 | Workflow
Steps: 18"*.

Each of the 18 rows is a numbered coloured circle icon + bold status name + a
`LEAD STATUS NUMBER - N` pill badge + a one-line summary + a longer description
sentence to the right. **Full canonical list (supersedes SPEC.md's 0–12 table):**

| # | Name | Circle colour | Summary | Description |
|---|---|---|---|---|
| 0 | Pending | grey | Lead started and waiting for details | Lead started and waiting for required details. |
| 1 | Submitted | dark amber/brown | Lead submitted for Internal Verification | All required details has been received and waiting Internal Verification. |
| 2 | Allocated | cyan | Lead Allocated to Employee | The lead has been allocated to an employee for further processing. |
| 3 | Under-Process | blue | Lead is under process from lender | The lead has been submitted to the lender and under process. |
| 4 | Approved | green | Loan approved by lender | The loan has been approved by lender and waiting disburse. |
| 5 | Archived | purple | Lead Archived for Financial Year | The lead has been archived for this financial year. |
| 6 | Rejected | crimson | Lead Rejected by Lender | Lead has been rejected by the lender, Check the note from lender for more details. |
| 7 | Docs Query - EA | amber | Employee has Query for Advisor | The employee handling the lead has raised a query for the Advisor. |
| 8 | Query Resolved - AE | amber | Advisor responded to Employee Query | The advisor has responded to the query raised by the employee. |
| 9 | Docs Query - LA | amber | Lender has Query for Advisor | The lender has a query for the Advisor regarding the lead. |
| 10 | Query Resolved - AL | amber | Advisor responded to Lender Query | The Advisor has addressed the query raised by the lender. |
| 11 | Blocked | crimson/pink | Lead Rejected by BI-V | Lead has been verified by BI-V and has been blocked. |
| 12 | Disbursed | green | Loan has been disbursed to customer account | The loan has been approved and funds have been disbursed to customer account. |
| 13 | Fake | crimson | Fake Lead Detected | BI-V model has identified this lead as possibly fraudulent or not genuine. Further manual actions is required to verify its authenticity. |
| 14 | Brand Disbursed | green | Loan has been disbursed to the Brand Admin account | The loan has been approved and funds have been disbursed to customer account. *(text identical to #12 — likely a copy-paste bug in Finoza's own copy)* |
| 15 | Un-Archived | purple | Lead Un-Archived for Financial Year | The lead has been un-archived for this financial year. |
| 16 | Lead Issue | dark/black | Lead has raised an issue | The lead is currently under dispute and requires resolution. |
| 17 | Issue Resolved | green | Lead issue has been resolved | The lead issue has been successfully resolved. |

Notable new information vs SPEC.md: **"BI-V"** appears twice (status 11 "Blocked" and
13 "Fake") as an automated fraud/verification model name ("Lead has been verified by
BI-V", "BI-V model has identified this lead as possibly fraudulent") — an ML/rules
fraud-check layer we hadn't previously seen referenced. Also new: status **14 "Brand
Disbursed"** is distinct from 12 "Disbursed" (money to the *brand's* account vs the
*customer's* account) and **15/16/17** (Un-Archived, Lead Issue, Issue Resolved) are a
dispute-reopening sub-flow layered on top of the terminal states.

## 10. `/lead/view/<token>` — Lead detail (checked 3 tokens: #364 Kyc Loans, #362 Kyc
Loans, #356 Instant Loan — all "3 - UNDER-PROCESS")

Breadcrumb and page **title is hardcoded to "Insta Loan"** regardless of the lead's
actual product — e.g. lead #364's product is **Kyc Loans**, yet the page title reads
**"Insta Loan Lead View"**, the breadcrumb says **"Insta Loan"**, and the bottom timeline
card is titled **"Insta Loan Journey"**. This is a real Finoza copy bug (or a
template that was never parameterised) — worth deciding explicitly whether we
show the actual product name in our equivalent header (we should).

Header strip (confirmed, matches SPEC.md): green dot • **Customer first name + "-"** •
**`#<LeadID>`** far right of the name. Then a 4-up row: 📄 **Product** icon + name
(`Kyc Loans` / `Instant Loan`) · 🟢 **Required Loan Amount** (`₹0.00` in every sample —
no real loan amounts flowed through in this demo except the one `#67` lead spotted on
`/lead` with `₹220000.00`) · 👤 **Advisor** (name, `(FCcode)`, phone) · 🔗 **Lead Status**
badge.

**Admin - Disbursed Details** and **Advisor - Disbursed Details** — both always
rendered as separate cards even when empty, each showing the same pale-yellow
**"No data available"** banner in all 3 samples (never populated pre-disbursal, as expected).

**Lead Details** grid — confirmed 10 fields exactly as SPEC.md lists, plus one
concrete convention: **empty numeric-ish fields render as `0`** (Customer Email `0`,
District `0`) exactly like the advisor Contact Details tab — but **empty text fields
render as a bare dash `-`** (Customer Surname is always `-` across all 3 leads, never
`0`). So the "empty" placeholder is field-type-dependent: numbers/codes → `0`, names →
`-`, whole sections → "No data available" banner. Three different empty-state
conventions on one page — pick one for our build rather than copying all three.

Buttons under the grid: **Copy Lead Details** (white/outline, clipboard icon) · **Show
Plan Text** (white/outline, expand icon).

**Lead Remarks**, two-column as documented:
- *Lead Management* (left): "Current Lead Status:" + badge (read-only display) ·
  **"Send Email to Advisor? *"** rendered not as a toggle but as an **inline pink/red
  banner**: *"Advisor has **Disabled** lead notifications for this lead."* (i.e. on
  these 3 leads the flag is already OFF and shown as a warning-style status line, not
  a live checkbox — the actual input control wasn't visible in the read-only DOM, it
  may appear only when actually changing status) · **"UPDATE LEAD STATUS *"** — a
  `Change Live Status` dropdown **plus a separate small numeric text box already
  pre-filled with the current numeric code** (`3`) beside it, with a pale-yellow hint
  line: *"Only select this option if you want to change lead status, else keep it
  default."* · **Lead Remark \*** textarea · blue **"Update Status"** button.
- *Conversation History* (right), dark-navy header bar: either a real threaded message
  (one sample: system message *"This lead has been forwarded form Lead ID #363 due to
  New RM"*, author shown as **"null null"** with an **EMPLOYEE** role badge and a
  time-stamped orange avatar circle with initial **"N"** — note "null null" as the
  author name is a genuine display bug, presumably a system/automated actor with no
  real name on the account) — or, when there's no history yet, a **centred empty
  state**: a speech-bubble "···" icon + **"No messages yet"** text, vertically centred
  in the panel (2 of 3 samples had this empty state — worth replicating exactly, it's
  a nicely done empty state).

**Lender Details** table — confirmed columns `Apply ID | Lender | Lender Name |
Applied Date | Status | --` (the SPEC's `--` sixth column really is a literal
placeholder header, not a typo — presumably an actions column that's blank when
there's nothing to action). All 3 samples had exactly **one row**: sequential-looking
`Apply ID` (391, 388, 381 — auto-increment across the whole leads table, not per-lead),
`Lender`/`Lender Name` blank, `Applied Date` = lead's creation timestamp, `Status` =
**"Pending"** plain text (not a coloured badge here, unlike the header Lead Status).

**Loan Journey timeline** ("`<Product> Journey`", e.g. "Insta Loan Journey" per the
hardcoded-title bug above) — vertical timeline with a left rail line and small dot
markers, entries in reverse-chronological (newest first) order showing time + status
name (all-caps) + a one-line system remark, e.g. `01:42 PM / UNDER-PROCESS / Lead
submitted to lender`, then `01:42 PM / PENDING / This lead has been forwarded form
Lead ID #363 due to New RM`. **Rendering bug spotted on all 3 samples**: this timeline
text renders in a very pale/washed-out grey (looks close to `#eee` on white),
borderline illegible against the white card background — likely a CSS variable that
isn't resolving correctly in this theme/browser combo. Worth a screenshot-diff check
before we copy the exact colour token; don't replicate the near-invisible contrast.

---

## GAPS vs our build (Finoza-observed only, no codebase read)

1. **Lead status is 0–17, not 0–12.** SPEC.md's original table stops at 12 (Disbursed).
   The live filter dropdown and the dedicated `/lead/lead-status` legend page confirm
   **18 codes**: add `13 Fake`, `14 Brand Disbursed`, `15 Un-Archived`, `16 Lead
   Issue`, `17 Issue Resolved`. 13/16/17 in particular describe a **post-resolution
   dispute loop** (issue raised → resolved) that doesn't exist in our 9-stage pipeline
   at all.
2. **A second, independent payout-status machine (0–4)** exists purely for the money
   side of a disbursed lead (`Brand Commission Generated → Advisor Commission
   Generated → Brand Payout Received → Advisor Payout Paid`, plus an `Error` state) —
   distinct from lead status. We have nothing equivalent; add a `payout_status` enum.
3. **Fraud/verification model referenced by name — "BI-V".** Statuses 11 (Blocked)
   and 13 (Fake) both cite an automated model called BI-V flagging/blocking leads.
   We have no automated fraud-check concept at all currently.
4. **Advisor Code encodes sub-advisor-ness in the string itself** (`FC08S321587` has
   an `S` inserted vs the normal `FC########` pattern) rather than a separate
   type/flag column. Decide whether we want a boolean column instead (cleaner) or to
   match their string convention (if any integration/export depends on parsing it).
5. **Three different "empty value" conventions on one page** (lead-view): numeric
   fields show `0`, name/text fields show `-`, whole missing sections show a
   pale-yellow "No data available" banner. Pick one consistent convention rather than
   copying all three.
6. **`/lead/all` (the DataTables "View All Lead" grid) never loaded in this demo** —
   permanently "Loading…" / "0 entries" on every attempt. Either their server-side
   DataTables endpoint is broken in this demo tenant, or it needs a request shape we
   didn't trigger read-only. Don't assume the column set works as shown; the columns
   themselves (`# | Status | Last Update | Advisor | Product | Amount | Customer |
   Mobile | Actions`) are still useful as a target, but the interaction (search, sort,
   paginate) is unverified.
7. **Lead-view page title/breadcrumb is hardcoded to "Insta Loan"** regardless of the
   lead's actual product (confirmed wrong on a Kyc Loans lead). Make sure our
   equivalent page title actually reflects the product.
8. **Two disbursement pages (`My Disburse`, `Advisor Disburse`) plus the Payout
   Status guide are basically three views onto the same underlying commission
   lifecycle** — `Total Disbursed Amount / Total Commission / Commission Paid /
   Commission Pending / Commission %`. We should model these 5 numbers once and
   present "my" vs "advisor" as a scope filter, not two separate pages/tables.
9. **The Advisor's own leads-table has a distinct richer "Advisor" column** on
   `/lead` (name + code + inline `VIEW ADVISOR` button + WhatsApp/phone quick-contact
   icons) vs the plainer `Advisor` column used on `/advisor/view/4`'s own leads table
   (name + code only, no quick-contact icons). If we reuse one "leads table" component
   everywhere, decide whether inline advisor quick-actions belong on all instances or
   just the top-level one.
10. **A visibly flagged/attention row style exists** (pale-yellow background + dashed
    border + ℹ️ icon next to the status badge) for at least one lead in the demo data
    (`#67`, sitting 4+ months since creation with an old timestamp) — this looks
    intentional (stale-lead flag) rather than incidental; worth deciding whether we
    want an equivalent "stale/needs attention" visual rule.
11. **"Documents" and "Advisor Agreement" advisor-detail tabs are completely empty**
    in this demo (no upload widget, no viewer, no placeholder copy) — can't confirm
    what these look like with real data; treat as unverified/未crawled rather than
    "Finoza has nothing here."
12. **Conversation History has a genuine polished empty state** ("···" bubble icon +
    "No messages yet", centred) worth copying exactly — and a display bug worth
    *not* copying: a system message's author rendered literally as **"null null"**
    with an EMPLOYEE role badge, i.e. their system/automated actor has no display-name
    fallback.
