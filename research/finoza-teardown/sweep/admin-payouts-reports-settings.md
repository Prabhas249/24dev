# Finoza admin CRM — sweep: Payouts, Reports, Products, Employees, Notifications, Settings

Crawled read-only, 29 Jul 2026. Login: `https://finozacapital.com/manage-dsa/login` as
`support@finozacapital.co.in` (CRM Admin / DEMO tenant "Capital Finoza"). Fresh full-page
screenshots in `sweep/shots-admin2/`. Raw structured extraction (badges/tables/selects with
computed colors) in `sweep/admin2-raw.json`. Cross-reference with the earlier general crawl
at `docs/finoza/crawl.json` and `docs/finoza/SPEC.md` — this sweep goes deeper on the same
pages, especially the payout-chart mechanism and status badge colors.

Global chrome on every admin page: top bar has a **"Search Lead #"** box (with search icon)
and a **"Search Advisor #"** box, plus a user menu (**DEMO** avatar → "Capital Finoza / CRM
Admin", dropdown has 🌙 theme toggle, **Logout**, **Message Inbox**, **Support Tickets**,
**Open Messages**). Sidebar order: DASHBOARD, ADVISORS, LEADS, PAYOUTS, REPORTS, PRODUCTS,
NOTIFICATIONS, PROFESSIONAL EMAIL, EMPLOYEE MANAGEMENT, DATA SYNC, CRM SUPPORT, SERVICE
PAYMENT, IMAGE MANAGER, BLOG MANAGER, WEBSITE SETTINGS, MENU SETTINGS, PAGE SETTINGS, CRM
SETTINGS (→ Payout Chart / Contact Details / Social Media Links), then a standalone **CRM
Changelogs** button pinned at the sidebar bottom. Note: there is no top-level "SETTINGS"
item — everything the task calls `/setting/*` lives under the **CRM SETTINGS** collapsible
group, and only 3 of its children showed as sidebar links (Payout Chart, Contact Details,
Social Media Links); branding/theme-colors/mobile-application are reachable only by direct
URL, not from the visible sidebar.

---

## 1. PAYOUTS → My Payouts (`/payouts/my`)

Breadcrumb: `Dashboard / My Payouts`. Page title "My Payouts".

**4 KPI cells** in one white card, two-column layout:
- **Total Payout Amount** (sublabel "All Advisors") — `₹ 0.00` in green
- **Paid** (sublabel "records") — `₹ 0.00` in green
- **Total Records** (sublabel "All Payouts") — `0` in dark navy
- **Unpaid** (sublabel "records") — `₹ 0.00` in red

**"Payment Details" table** (DataTable, id `datatable-1`), columns exactly:
`ID | Advisor ID | Amount | Bank ID | Mode | Reference | Employee ID | Type | Status | Date`
— every column header has sort arrows (↑↓ from DataTables).

- **Show entries** dropdown: options `10 / 25 / 50 / 100` (default 10)
- **Search:** free-text box, top right of the table
- Footer: `Showing 0 to 0 of 0 entries` with **Previous** / **Next** pagination buttons
- Current demo data: **table is completely empty** — "No data available in table" for both
  My Payouts and Advisor Payouts. No payout rows exist anywhere in this demo tenant, so the
  actual **Mode / Type / Bank ID / Reference / Employee ID** values could not be observed
  directly from data — only inferred from column names and the wider CRM vocabulary:
  - **Mode** — almost certainly the payment rail (Bank Transfer / UPI / Cheque / Cash) — this
    is a payout-specific field, separate from lead payment mode.
  - **Type** — likely payout category (e.g. Commission / Bonus / Adjustment / Advisor vs
    Sub-Advisor payout) — cannot confirm exact values without data.
  - **Bank ID** — a foreign key to the advisor's registered bank account record (not a raw
    account number shown in the payout row).
  - **Employee ID** — the CRM admin/employee who processed or approved the payout (i.e. who
    ran the payout batch), distinct from Advisor ID (the recipient).
  - **Reference** — a UTR / transaction reference string for the transfer.
  - **Status** — presumably Paid / Unpaid / Pending given the two KPI buckets above.

## 2. PAYOUTS → Advisor Payouts (`/payouts/advisor`)

Identical structure/columns/KPIs to My Payouts (same DataTable, same 4 KPI cells, same empty
state). Breadcrumb `Dashboard / Advisor Payouts`. The only difference from My Payouts appears
to be **scope** — "My Payouts" = payouts for the logged-in advisor/admin's own book, "Advisor
Payouts" = a global/all-advisors view — both are currently showing the same all-zero totals
in this demo tenant, so the scoping difference could not be confirmed with real data.

**Conclusion for payouts:** the CRM does NOT appear to auto-compute payout amounts from a
commission-rate engine inside these two pages — there is no visible "calculate payout" or
"generate payout" button, no rate/percentage column, and no per-lead commission breakdown on
this page. Payout rows look like they'd be created by an external/manual process (an admin
records a payment: advisor, amount, bank, mode, reference, who processed it) rather than
computed live from the payout chart. This matches finding #3 below (payout chart = a
downloadable, manually-edited PDF, not structured rate data).

## 3. REPORTS (`/reports` — "Report Overview")

Breadcrumb: `Dashboard / Report / Overview`. Two cards side by side:

- **"Lead Status"** card — a pie chart with legend: **In Process** (blue) / **Approved**
  (green) / **Query** (yellow) / **Rejected** (pink-red) / **Disbursed** (purple). This is a
  *collapsed* 5-bucket view of the full 14-code status list (see below).
- **"Lead Analytics"** card — 4 stat rows, each with a bold label, a grey sublabel, and a
  large navy number on the right:
  - **Total Leads** — sublabel "Including Sun Advisors" — `362`
  - **Sub Advisors** — sublabel "Total Registered Sub Advisors" — `95`
  - **Loan Disbursed** — sublabel "Total Loan Approved and Disbursed" — *(blank — no value
    rendered in this demo, likely 0 or ₹ not yet formatted)*
  - **Total Payout** — sublabel "Total Lead Commission Paid" — *(blank, same as above)*

  Note the sublabel explicitly calls the payout figure **"Total Lead Commission Paid"** —
  confirms payouts are conceptually "commission" tied to leads/disbursements, reinforcing
  that the payout chart (rates) and the payout ledger (actual paid amounts) are two separate
  things in this product.

Sidebar sub-nav for Reports (visible once expanded): **Report Overview** / **All Lead
Report** / **Product Wise**.

## 4. REPORTS → Lead-wise (`/reports/lead-wise`, labelled "All Lead Report" in the sidebar)

Breadcrumb: `Dashboard / Report / Lead Analytics`. Two cards:

**"Lead Count By Status"** — one row per status code, each row = colored code badge + plain-
English description + big number + a black percentage pill. This is the definitive status
list with exact colors (computed CSS `background-color`, from live badges):

| Code / Label (badge text) | Description shown | Count (demo) | % | Badge bg-color class | RGB |
|---|---|---|---|---|---|
| 0 / PENDING | Lead started and waiting for details | 105 | 29.01% | `bg-secondary` | rgb(108,117,125) grey |
| 1 / SUBMITTED | Lead submitted for Internal Verification | 4 | 1.10% | `bg-primary` | rgb(203,113,10) **burnt orange**, not blue |
| 2 / ALLOCATED | Lead Allocated to Employee | 1 | 0.28% | `bg-mint` | rgb(63,202,216) teal/cyan |
| 3 / UNDER-PROCESS | Lead is under process from lender | 241 | 66.57% | `bg-info` | rgb(22,170,255) blue |
| 4 / APPROVED | Loan approved by lender | 0 | 0.00% | `bg-success` | rgb(58,196,125) green |
| 5 / ARCHIVED | Lead Archived for Financial Year | 0 | 0.00% | `bg-alternate` | rgb(121,76,138) purple |
| 6 / REJECTED | Lead Rejected by Lender | 1 | 0.28% | `bg-danger` | rgb(217,37,80) pink-red |
| 7 / DOCS QUERY - EA | Employee has Query for Advisor | 6 | 1.66% | `bg-warning` | rgb(247,185,36) amber |
| 8 / QUERY RESOLVED - AE | Advisor responded to Employee Query | 2 | 0.55% | `bg-warning` | amber (same as 7) |
| 9 / DOCS QUERY - LA | Lender has Query for Advisor | 1 | 0.28% | `bg-warning` | amber |
| 10 / QUERY RESOLVED - AL | Advisor responded to Lender Query | 1 | 0.28% | `bg-warning` | amber |
| 11 / BLOCKED | Lead Rejected by BI-V | 0 | 0.00% | `bg-danger` | red (same as 6) |
| 12 / DISBURSED | Loan has been disbursed to the customer account | 0 | 0.00% | `bg-success` | green (same as 4) |
| 13 / FAKE | Fake Lead Detected | 0 | 0.00% | `bg-danger` | red |

Notes vs the earlier SPEC.md table: this sweep found **code 13 = "Fake"** ("Fake Lead
Detected"), which the earlier crawl's 0–12 table did not include — the real range is **0–13**,
14 statuses total. All four query states (7/8/9/10) share the identical amber `bg-warning`
color — they're only distinguished by badge text, not color. Rejected(6)/Blocked(11)/Fake(13)
all share the same red `bg-danger`. Approved(4)/Disbursed(12) share the same green
`bg-success`.

**"Lead Status Distribution (%)"** card — same data as a pie chart, legend lists all codes
(Pending/Submitted/Allocated/Under-Process/Approved/Archived/Rejected/Docs Query-EA/Query
Resolved-AE/Docs Query-LA/... truncated in the legend box, chart itself only visually renders
the non-zero slices).

## 5. REPORTS → Product-wise (`/reports/product-wise`)

Breadcrumb: `Dashboard / Report / Lead Analytics` (same page title as lead-wise, just a
different sidebar-selected report). "Lead Count By Status" card reused, but now broken down
**by product** instead of by status code — same row layout (icon + product name + count +
black % pill):

| Product | Count | % |
|---|---|---|
| Personal Loan | 25 | 6.91% |
| Business Loan | 13 | 3.59% |
| Home Loan | 4 | 1.10% |
| Credit Card | 21 | 5.80% |
| Instant Loan | 117 | 32.32% |
| Demat Account | 2 | 0.55% |
| Bank Account | 12 | 3.31% |
| Loan Against Shares | 1 | 0.28% |
| Kyc Loans | 167 | 46.13% (sums slightly over 100% across the two reports — Kyc Loans is clearly the dominant volume product) |

Matching pie chart "Lead Status Distribution (%)" with one color per product.

Reports overall: **no date-range filter, no lender/advisor filter, and no export/download
button found on any of the three report pages** — these are read-only dashboards, not report
builders. Filtering is entirely by navigating between the 3 fixed sub-pages (Overview /
All Lead / Product Wise).

## 6. PRODUCTS (`/product`)

Breadcrumb: `Dashboard / Product`. Single card **"Products Overview"**. Products render as a
responsive grid of cards, 4 per row, each card = icon + `#<id> - <Name>` (bold, navy) + a
short code line `<CODE> - <Category>` + an **ACTIVE** pill badge (green) top-right. No click-
through to a product detail/edit page was found (no `<a href="/product/...">` links exist —
cards are static display, not links), so per-product settings (if any exist) are not exposed
in this view.

| # | Name | Code - Category | Status |
|---|---|---|---|
| 1 | Instant Loan | IPL - Loan | ACTIVE |
| 2 | Personal Loan | PRL - Loan | ACTIVE |
| 3 | Business Loan | BNL - Loan | ACTIVE |
| 5 | Home Loan | HML - Loan | ACTIVE |
| 10 | Credit Card | CRD - Credit Card | ACTIVE |
| 12 | Demat Account | DMT - Demat Account | ACTIVE |
| 14 | Bank Account | BNK - Bank Account | ACTIVE |
| 17 | Loan Against Shares | LAS - Loan | ACTIVE |
| 18 | Kyc Loans | KYC - Loan | ACTIVE |

IDs are sparse (1,2,3,5,10,12,14,17,18 — 4,6-9,11,13,15,16 don't exist/are hidden), confirming
SPEC.md. Category field distinguishes "Loan" vs "Credit Card" vs "Demat Account" vs "Bank
Account" — i.e. category ≠ always "Loan", it's a product-type taxonomy of its own.

## 7. EMPLOYEE MANAGEMENT (`/employee`)

Breadcrumb: `Dashboard / Employee Management / Data`. Card **"View Employee Data"**, plain
table (not paginated/DataTable — no Show-entries or Search box present, just one flat list).

Columns: `ID | Status | Product Info | First Name | Last Name | Email | Phone | Action`

- **Status** — green **ACTIVE** text badge (no background fill, just colored text, color
  rgb(40,167,69))
- **Product Info** — showed a broken image icon + "N/A" for every row in this demo — appears
  to be meant to show which product(s)/loan lines an employee (RM) is responsible for, but
  it's unpopulated here
- **Action** → **Edit** button per row

Clicking **Edit** (read-only exploration — not saved) turns First Name / Last Name / Email /
Phone into inline text inputs and swaps the row's action to **Save** / **Cancel** buttons.
No additional hidden fields (no role, no permissions, no RM-territory assignment) were
revealed by opening edit mode — the editable surface for an employee is limited to those 4
contact fields; Status and Product Info are not editable inline here.

## 8. NOTIFICATIONS (`/notifications`)

Breadcrumb: `Dashboard / Notifications / All`. Header: bell icon + **"All Notifications"** +
subtext "All notifications including Lead Updates, Account Related update and transactions,
and System update and Announcements". A **"Search Notification"** free-text box sits above
the list (right-aligned "Search...").

Three collapsible sections, each its own card:
1. **Leads Notifications (172)** with a green **"0 UNREAD"** pill badge top-right of that
   section. Table columns: `# | From | Date & Time | Notification | Action`. Every row so
   far: `From` = advisor name + code, e.g. `avdhesh jain (#FC08207540)`; `Notification` text
   = `New Lead Assigned #<leadId>` (blue link); `Action` = blue **"View Lead"** button.
   Unread rows are highlighted with a light-green row background (first 2 rows in the sweep
   had `29-Jul-2026`/`27-Jul-2026` timestamps and a mint-green row tint vs white for older
   rows — visual "new" indicator even though the badge says 0 unread).
2. **Account Notifications** — section present but empty in this demo.
3. **System Notifications** — section present but empty in this demo.

172 total lead notifications, no visible pagination/Show-N control on this table (renders as
one long scroll, unlike the payouts DataTables).

## 9. SETTINGS → Payout Chart (`/setting/payout-chart`) — the key page

Breadcrumb: `Dashboard / Setting / Application`. Heading **"Advisor - Payout Chart"**.

Explainer text (verbatim): *"Please download the DSA-Payout.docs file and edit the advisor
commission and convert it to PDF and reupload it. This will be visible to all the advisor
under. My Payout -> Payout Chart menu - (https://finozacapital.com/dsa-panel/payment/chart)"*

**This settles item #5 the user flagged as especially important: commission rates are NOT
configured as structured data/fields in this CRM at all.** The mechanism is:

1. Admin clicks **"Download Document"** (orange button) → downloads a `.docs`/Word template.
2. Admin manually edits commission numbers in that Word doc **outside the CRM**.
3. Admin converts the edited doc to PDF.
4. Admin re-uploads the PDF via a **"Select Payout Chart (PDF)"** file input (`Choose file` +
   **Upload** button).
5. The uploaded PDF is what advisors see on their own panel (`My Payout -> Payout Chart`).

There are **two independently-uploaded PDF documents**, shown side by side as embedded PDF
viewers (with page-nav arrows, zoom %, print, download, and a **Delete** button each):

- **Left doc, "DSA-PAY..." (DSA Payout)** — a bank/NBFC commission-rate table, 17 pages, with
  columns `S.NO | BANK & NBFC NAME - Jan 2026 | DSA PAYOUT`. Sample rows visible: `Aditya
  Birla (BL-OD)` → `1.6`, `Axis Bank` → `3.15`, `Bajaj Finserv` → `2.6`, `Bandhan Bank` →
  `2.925`, `Cholamandalam (BL-OD)` → `2.475`, etc. — i.e. **commission is a flat percentage
  (or points) per lender/scheme name**, not per product, not per advisor tier. Some rows have
  qualifiers baked into the lender-name string itself, e.g. `"AXIS FINANCE - 90% OF FEES"`,
  `"CHOICE INDIA (AS PER SLAB)"`, `"CREDABLE - 65% OF PROCESSING FEE"` — so the rate isn't
  even a clean single numeric column in all cases; it's a free-text payout scheme per lender.
- **Right doc, "INSURAN..." (Insurance)** — 1 page, columns `Insurance Co Name | DSA PAYOUT`,
  a flat percentage per insurer: Ageas Federal 58.5%, Shriram Life 53.2%, Pramerica Life
  49.4%, GoDigit 53.2%, Birla 45.6%, HDFC Life 38.0%, Bajaj 45.6%, Tata 34.2%, iPRu 34.2%,
  Axis Max 49.4%, Generali Central 49.4%, Health insurance 34.2%, All General 0.0%, Loan
  Protector 45.6%.

So: **commission/payout rates are configured per lender/insurer (a static, manually-curated
document), not per product, not per advisor, not per advisor tier, and not through any form
UI in the admin CRM.** There is no rate table, no percentage input field, and no per-advisor
override anywhere in the app itself — it's 100% "upload a PDF, humans read it." The
"Payments" module (My Payouts / Advisor Payouts) is a separate, apparently-manual payout
ledger that doesn't reference this PDF programmatically.

## 10. SETTINGS → Contact Details (`/setting/contact-details`)

Breadcrumb: `Dashboard / Setting / Contact Details`. Heading **"CRM - Contact Details & Social
Media"**, subtext: *"This contact details are used throughout the CRM as a primary
contacts. Please use the core settings to update the contact details."*

Two info cards side by side:
- **Primary Contact** (yellow "IMPORTANT!" banner: *"Primary contact are used as admin
  contacts, All CRM admin email notifications, CRM Plan, and all other information will be
  sent to primary contacts."*) — fields: Admin Full Name, Admin Email, Admin Mobile. Button:
  **Edit Primary Contact**.
- **CRM Contacts** (blue "IMPORTANT!" banner: *"CRM contacts are used throughout the crm in
  all email templates notifications to all advisors, Support Section on advisor panel and
  default RM in lead assignments."*) — fields: Support Email, Support Number 1, Support
  Number 2. (No visible edit button captured for this card in the sweep.)

Below that, individually-editable orange/blue tiles each with their own **Edit ...** button:
**Support Email**, **Support Numbers**, **Office Address** (`Faridabad, Haryana Delhi NCR -
India`), **Project Name & Details** (Project Name / Slogan / Description — currently all
"Finoza Capital" + a canned description), **WhatsApp Group Link** ("Join Group" button, value
`404` i.e. unset), **Telegram Group Link** (same, `404`).

**Social Media Links** section — 6 colored tiles (brand colors): Facebook (blue,
`facebook.com/finoza-capital/`), Instagram (magenta, `instagram.com/finoza-capital_official/`),
Twitter (light blue, value `404` = unset), YouTube (red, `youtube.com`), Telegram (blue,
value `404`), WhatsApp (green, value `0`) — single **Edit Social Media Links** button covers
all six.

## 11. SETTINGS → Branding (`/setting/branding`)

Breadcrumb: `Dashboard / Setting / Branding`. Heading **"CRM - Logo Branding"**.

Two upload widgets: **Upload Logo** (PNG/JPG/JPEG, max 2MB, must be exactly 300×150px) and a
second **Upload Logo** block for the icon (must be exactly 192×192px) — both with `Choose
file` + **Upload**.

Two small tables show the currently-active logo/icon:
- `# | Logo-Image | Logo-Size | Action` → Main Logo, 300px×150px, **Download**
- `# | Icon-Image | Icon-Size | Action` → Icons, 192px×192px, **Download**

**"Uploaded Logos"** section — 5 logo variants each with a filename/path text box + individual
**Download** button: `icon.png`, `logo-f.png`, `logo-inverse.png`, `logo-mw.png`, `logo-s.png`
(all under `../public/images/...`) — i.e. the CRM auto-generates multiple logo variants
(full, inverse, mobile-width, small) from the one uploaded master.

**"Generated Icons"** table — 24 rows, columns `Preview | Filename | Size (WxH) | File Size |
Full Path | Action`, auto-generated favicon/app-icon set for every platform: `android-icon-*`
(36/48/72/96/144/192px), `apple-icon-*` (57/60/72/76/114/120/144/152/180px, plus
`apple-icon-precomposed.png` and `apple-icon.png`), `favicon-*` (16/32/96px), `ms-icon-*`
(70/144/150/310px) — each with its own **Download** button (green outline). This confirms the
CRM has a full PWA/favicon-generation pipeline baked in — one master upload cascades to the
entire icon set automatically.

## 12. SETTINGS → Theme Colors (`/setting/theme-colors`)

Breadcrumb: `Dashboard / Setting / Theme Colors`. Heading **"Theme Colors - Customize Your
Colors"**, subtext "Update your theme's primary and secondary colors below."

Fields, exactly 5:
- **Primary Color:** — native color-swatch picker, currently near-black
- **Primary Color Hex:** — text input, value `#393A3A`
- **Secondary Color:** — native color-swatch picker, currently burnt-orange
- **Secondary Color Hex:** — text input, value `#CE4909`
- **Theme Type:** — `<select>` with exactly 2 options: **Dark**, **Light** (currently set to
  Dark)

Single **Save Changes** button. This is the entire theming surface — no accent/tertiary
color, no per-page override, no dark/light auto toggle beyond this one Theme Type dropdown.

## 13. SETTINGS → Mobile Application (`/setting/mobile-application`)

Breadcrumb: `Dashboard / Setting / Application`. Heading **"Mobile - Application"**, with
marketing copy about a Loan CRM Android/iOS app for loan officers/mortgage brokers (generic
boilerplate text, not tenant-specific). Illustration graphic on the right. Three buttons:
**Download Android App**, **Download iOS App**, **Download APK** (with a small gear icon) —
no version numbers, no QR code, no deep-link config fields on this page.

## 14. CHANGELOG (`/changelog`)

Sidebar entry point is the standalone **"CRM Changelogs"** button. Heading **"Finoza Capital
- Manage CRM Changelogs"**. A vertical feed of version cards, each with a megaphone icon, a
date, a black **VERSION** tag, and a blue version-number pill, then a bullet list of
`[Update] / [Fixed] / [Add]` entries (some entries hyperlink straight to the relevant admin
route, e.g. `setting/change-password`, `advisor/adv`):

| Date | Version | Highlights |
|---|---|---|
| 2024-07-15 | 2.0.3 | Dashboard Lead view update; Lead Overview updated + bug fixed; View All leads issue fixed; Notification added → `notifications`; Advisor view updated with Disburse and Leads |
| 2024-07-11 | 2.0.2 | Update Password added to CRM Admin → `setting/change-password` |
| 2024-05-20 | 2.0.1 | Advisor View added → `advisor/adv`; Advisor Express view added |

## 15. CRM SUPPORT (`/support`)

Breadcrumb: `Dashboard / CRM / Support`. Top-right **"+ Add Ticket"** button (orange).

**"Tickets Statistics"** — 3 colored stat tiles: **Total Tickets** (orange, value `0`),
**Open Tickets** (green, no value shown/0), **Closed Tickets** (pink-red, no value
shown/0).

**"View Tickets"** table, columns: `Ticket ID | Issue Type | Title | Status | Created At` —
empty in this demo (no tickets exist).

## 16. DATA SYNC (`/data-sync`)

Navigating here immediately shows a **full-screen modal/interstitial**, not a normal page:
gradient background, white card, spinner, heading **"Data Sync in Process"**, subtext "Please
Wait...", a line **"Total records found & updated: 0"**, a progress bar, and **"Redirecting
in 3 seconds"** — it's a one-shot sync trigger + auto-redirect (landed back on
`/manage-dsa/dashboard` after the countdown), not a page with persistent controls, filters,
or a sync-history table. Nothing configurable was found here.

---

## Cross-cutting notes for the QCred clone

1. **Payout/commission config is a manual PDF-upload workflow, not a rules engine.** If
   QCred wants a "real" per-lender/per-product commission table with live calculation, that
   is new scope beyond what Finoza's admin CRM does — Finoza's admin literally edits a Word
   doc offline and re-uploads a PDF for advisors to read.
2. **The payout ledger (My Payouts / Advisor Payouts) is separate from the payout chart PDF**
   and looks like a manually-entered record of payments made (ID, Advisor ID, Amount, Bank
   ID, Mode, Reference, Employee ID, Type, Status, Date) — there's no visible "auto-generate
   payout from disbursed lead" button.
3. **Status codes are 0–13 (14 total)**, not 0–12 as in the earlier SPEC.md — add code **13 /
   FAKE** ("Fake Lead Detected") to the schema.
4. Status badge colors collapse to essentially **5 real colors** across 14 codes: grey
   (Pending), burnt-orange (Submitted), teal (Allocated), blue (Under-Process), green
   (Approved/Disbursed), purple (Archived), red (Rejected/Blocked/Fake), amber (all 4 query
   states share one color). Worth deciding whether QCred wants that many codes visually
   distinguishable or is fine collapsing statuses into fewer colors like Finoza does.
5. Reports have **zero filter/export affordances** — no date range, no advisor filter, no
   CSV/PDF export button anywhere in Reports. If QCred's brief implies "reporting", Finoza's
   bar here is very low (three static breakdowns: by status, by status again, by product).
6. Employee edit surface is thin — only First/Last Name, Email, Phone are editable inline;
   no role/permission/territory fields exposed in the UI at all.
7. Products are a **static, non-clickable catalogue** in the admin (no per-product edit page
   was reachable) — any per-product settings (if they exist) live elsewhere, not surfaced
   here.

## Files
- Screenshots: `/Users/prabhas/24dev/clients/qcred-crm/docs/finoza/sweep/shots-admin2/*.png`
  (one per page, plus `product_detail.png` attempt and `employee_edit_open.png`)
- Raw structured JSON (tables/selects/badges with computed CSS colors):
  `/Users/prabhas/24dev/clients/qcred-crm/docs/finoza/sweep/admin2-raw.json`
- Crawler script used: `/Users/prabhas/dev/.pw-runner/finoza-admin2.js`
