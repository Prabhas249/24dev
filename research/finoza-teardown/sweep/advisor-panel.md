# Finoza Capital — Advisor (DSA Partner) Panel — Deep Sweep

Read-only crawl of `https://finozacapital.com/dsa-panel` as the demo advisor.
Login used: `demodsa@finozacapital.com` / **`Demo@233454`** (the `admin@123` password given in the brief is stale/wrong — it returns "The password you enter is incorrect").

Screenshots: `docs/finoza/sweep/shots-advisor/*.png` (full-page). Raw extraction JSON: `sweep-data-1.json`, `sweep-myaccount.json`, `sweep-leads.json` in the same folder.

No forms were submitted, no Save/Update/Process Lead/Delete actions were clicked. All navigation was by URL or read-only tab/link clicks.

---

## 0. Global shell (present on every page)

**Top bar**: hamburger menu icon (collapses sidebar) · center "Search Lead #" box with a magnifier submit button (`name="LeadID"`, placeholder "Search Lead #") · bell icon (notification count badge) · user chip "Demo DSA / Advisor" with dropdown chevron.

**User dropdown** (top right) exposes: **View All Notifications**, **Logout** (both styled `btn-pill btn-shadow`, dark slate background `rgb(68,64,84)`, white text), and **Call Now** (outline-link style, `tel:+917618268130`).

**Left sidebar nav**, in order, each with an icon:
- DASHBOARD
- ADD NEW LEAD
- LEADS → **My Leads**, **Lead Report & Filter**
- TEAM → **My Team**, **Add New Team**, **All Advisor**
- MY PAYOUT → **Payout Overview**, **Payout Chart**
- REPORTS → **Report Overview**, **All Lead Report**, **Product Wise**
- MARKETING TOOLS
- PINCODE & COMPANY → **Pincode**, **Company**
- LENDER POLICY & DOCS
- SERVICE PAYMENT
- PRODUCT LIST
- MY PROFILE
- **LEAD UPDATE** ← this is a bell/notification-shaped nav item that routes to `/notifications` (not a distinct "lead update" feature — it's literally the notification inbox re-labelled in the sidebar)
- Social row: Facebook / Instagram / YouTube icons

**Sidebar support card** (bottom, orange/amber background block, sticky-ish):
- Small "DEMO" logo tile + **"Finoza Capital"** + **"Advisor Support"**
- Contact-card icon row: **support@finozacapital.com** / "24/7 Email Support"
- Phone icon row: **+917618268130** (listed twice) / "10:00 AM - 6:00 PM" / "Monday - Saturday"
- A floating **"🔂 CRM Changelogs"** pill link (top of every page, above the breadcrumb) → `/changelog`

**Footer** (on pages that scroll far enough to show it): `© Copyright 2023-24 Finoza Capital crm. All Rights Reserved. Last Updated : 6-Aug-2025 03:48PM` plus a small dark ribbon badge bottom-right reading `Finoza Capital crm Advisor Panel - V 4.0.1` — but this version string is inconsistent across pages (dashboard footer shows a different build/date than /team's footer), i.e. it looks like a hardcoded per-page string rather than a real build number.

**Badge colour semantics** (computed backgrounds, consistent site-wide):
| Text | Background | Meaning |
|---|---|---|
| `LIVE` | `#D92550` (red/pink) | product-tile "live" ribbon on Add-Lead tiles AND on lender cards |
| `ACTIVE` | `#3AC47D` (green) | product active / sub-advisor active |
| `0 - PENDING` | `#6C757D` (grey) | lead status |
| `1 - SUBMITTED` | `#CB710A` (burnt orange) | lead status |
| `2 - ALLOCATED` | `#3FCAD8` (teal) | lead status |
| `3 - UNDER-PROCESS` | `#16AAFF` (blue) | lead status — the overwhelming majority of demo leads sit here |
| `4 - APPROVED` / `12 - DISBURSED` | `#3AC47D` (green) | lead status |
| `5 - ARCHIVED` | `#794C8A` (purple) | lead status |
| `6 - REJECTED` / `11 - BLOCKED` / `13 - FAKE` | `#D92550` (red) | lead status |
| `7/8/9/10` (Docs Query / Query Resolved) | `#F7B924` (amber), dark text | lead status |
| Money amounts (`₹ 0.00`) | `#3AC47D` (green) | always green regardless of value |
| Commission `%` chips | `#16AAFF` (blue) | |

Note the same red `#D92550` is reused for both the marketing "LIVE" ribbon and the worst lead outcomes (Rejected/Blocked/Fake) — worth knowing if cloning, since it means "red" isn't a single semantic in this CRM.

---

## 1. Dashboard (`/dashboard`)

Title: "Finoza Capital crm - Advisor Dashboard". Breadcrumb: Dashboard.

- Two full-width promo/edu banner cards (illustration + copy), non-interactive marketing filler:
  - "Unsecured **vs** Secured Credit Card" (no CTA)
  - "Will my **credit score** decrease if I settle my loan?" with a **"Know More!"** button (dark navy pill).
- KPI strip (6 stat cells, plain text not cards): **Team Members** "7" / "All Sub-Advisor", **Total Leads** "291" / "All Leads till the date", **Approved Leads** "0" / "Total Approved Leads", **Total Logins** "291" / "Including Sub Advisors", **Loan Disbursed** "₹ 0.00" / "Total disburse loan amount", **Total Payout** "₹ 0.00" / "Commission Generated".
- **"Add New Leads"** panel: 9 product tiles (icon + name + red **LIVE** ribbon top-right corner of each tile): Kyc Loans, Instant Loan, Personal Loan, Business Loan, Credit Card, Bank Account, Demat Account, Home Loan, Loan Against Shares. Each tile is a link to `/lead/add-<slug>` (already captured per the brief).
- **"Quick Links"** — 3 orange-header mini-panels side by side:
  - **Leads**: My Leads · Lead Filters · All Leads
  - **Team**: My Team · Add New Team · All Advisors
  - **Reports**: Report Overview · All Lead Report · Product Wise
- **"Lead Analytics"** — 5 horizontal progress-bar stat blocks: `97.25%` "283 Leads In Process" (blue bar), `0%` "0 Leads Disbursed" (green), `0%` "0 Leads Approved" (green), `2.75%` "8 Leads Has Query" (amber), `0%` "0 Leads Has Rejected" (red).
- **"My Leads"** table (10 most recent, "View All Leads" button top-right):
  Columns: `# | Status | Last Updated | Customer | Product | Amount | RM | Lead Date | Actions`. Actions column = two pill buttons **View** (orange) and **Apply More** (orange), side by side. Customer cell shows name + WhatsApp-icon + mobile. RM cell shows RM name/company + phone, or blank `( #12 )` style placeholder when unassigned.
- **"My Sub Advisor Leads"** panel — "View All Leads" button, body: amber empty-state banner **"No data available"**.
- **"Team Members (Sub Advisors)"** table — "View All Members" button, columns `# | Name | Mobile | Email | DOJ | Commission | Total Earning | Status`, Commission shown as blue pill `0.00 %`, Total Earning green pill `₹ 0.00`, Status green pill `ACTIVE`.

Screenshot: `shots-advisor/dashboard.png`

---

## 2. Leads → My Leads (`/lead/all`)

Title: "Finoza Capital crm - Lead List". Breadcrumb: Lead List View.

- Header row: **"New Lead"** button (top right) → `/lead/add`.
- DataTable controls: "Show `10 25 50 100` entries" dropdown + free-text "Search:" box (standard DataTables chrome).
- Table columns: `# | Status | Date | Advisor | Product | Amount | Customer | Mobile | Actions`.
  - Status cell = coloured pill (see semantics table above).
  - Advisor cell = advisor code + name, e.g. "FC08524097 - Demo DSA".
  - Actions = **View** and **Edit** buttons (not "View"+"Apply More" like the dashboard widget — this list uses **Edit**, dashboard uses **Apply More**, worth noting as a naming inconsistency in the source CRM).
- Pagination footer: "Showing 1 to 10 of 291 entries" · Previous / numbered pages / … / 30 / Next.

Screenshot: `shots-advisor/lead_all.png`

---

## 3. Leads → Lead Report & Filter (`/lead/report`)

Title: "Finoza Capital crm - Lead". Breadcrumb: Lead Report & Filters.

A single filter bar, no results grid below it until "Apply Filter" is used (read-only, not clicked):
- **Lead Status** select — full option list: `All Status`, `0 - Pending`, `1 - Submitted`, `2 - Allocated`, `3 - Under-Process`, `4 - Approved`, `5 - Archived`, `6 - Rejected`, `7 - Docs Query - EA`, `8 - Query Resolved - AE`, `9 - Docs Query - LA`, `10 - Query Resolved - AL`, `11 - Blocked`, `12 - Disbursed`, `13 - Fake`, `14 - Brand Disbursed`, `15 - Un-Archived`, `16 - Lead Issue`, `17 - Issue Resolved`.
- **Loan Type** select — `All Loans`, `18 - Kyc Loans`, `1 - Instant Loan`, `2 - Personal Loan`, `3 - Business Loan`, `10 - Credit Card`, `14 - Bank Account`, `12 - Demat Account`, `5 - Home Loan`, `17 - Loan Against Shares`.
- **Show Leads** select — `10 Leads`, `50 Leads`, `100 Leads`, `500 Leads`.
- **Start Date** / **End Date** — native date pickers.
- Buttons: **Apply Filter** (orange/amber) and **Reset** (red/pink pill).

Screenshot: `shots-advisor/lead_report.png`

---

## 4. Leads → Team (`/lead/team`)

Title: "Finoza Capital crm - Lead List". Same list-view chrome as My Leads but scoped to leads submitted by the advisor's sub-advisors/team. In the demo account this is an **empty state**: banner text **"No data available"**, no table rendered at all (not even empty headers).

---

## 5. Team (`/team`, `/team/all`)

`/team` ("My Team", title "Finoza Capital crm - Sub Advisors"):
- 3 stat cards: **Impression** "0" / "Monthly Hits" `▲0%`, **Clicks** "0" / "CTR" `▲0%`, **Registration** "0" / "Sub Advisor" `▲0%` (green up-arrow on all three even at 0%).
- **"Build Your Team"** panel: copy "Share your invite link to BUILD your team." + a read-only text input pre-filled with the invite URL `https://finozacapital.com/dsa-panel/invite.php?ID=FC08524097` + an orange **copy-to-clipboard** icon button beside it.

`/team/all` ("All Advisor", title "Finoza Capital crm - All Sub Advisors"):
- **"Team Members (Sub Advisors)"** table, columns `ID | Name | Mobile | Email | DOJ | Commission | Total Earning | Status`. 7 rows in the demo data, all `Commission 0.00%`, `Total Earning ₹0.00`, `Status ACTIVE` (green pill). Same table as the dashboard widget, just unpaginated/full.

Screenshots: `shots-advisor/team.png`, `team_all.png`

---

## 6. My Payout (`/payout` = "Payout Overview", `/payment/chart` = "Payout Chart")

`/payout` (title "Finoza Capital crm - Payout"):
- 5 stat cards in a row: **Total Loan Disbursed** ₹0.00 / "291 Leads", **Total Payout** ₹0.00 / "Year 2026", **My Commission** 0% / "Average", **Paid** ₹0.00 / "Year 2026", **Pending** ₹0.00 / "Year 2026".
- **"My Payout"** panel with **"View All Payout"** button, body = empty-state banner **"No data available"**.

`/payment/chart` — **mislabelled route**: the sidebar calls this "Payout Chart" under MY PAYOUT, but the page that actually loads is titled **"Finoza Capital crm - Marketing"** and its content is the **eBooks section of Marketing Tools** (two rows of "View PDF in Browser" / "Download PDF" buttons). This looks like a genuine bug/leftover route collision in the source CRM rather than intentional — flagging it because a clone should probably NOT reproduce this mislabel, or should be aware "Payout Chart" has no real chart in this build.

Screenshot: `shots-advisor/payout.png`, `payment_chart.png`

---

## 7. Reports (`/report`, `/report/lead-wise`, `/report/product-wise`)

`/report` ("Report Overview"): four plain stat blocks — **Lead Status / Lead Analytics**: "Total Leads Including Sub Advisors — 291"; **Sub Advisors**: "Total Registered Sub Advisors — 7"; **Loan Disbursed**: "Total Loan Approved and Disbursed — 0"; **Total Payout**: "Total Lead Commission Paid — 0".

`/report/lead-wise` ("Report Lead Analytics"): a **"Lead Count By Status"** breakdown, each row = status code/name, one-line description, count, percentage:
- `0 / PENDING` — "Lead started and waiting for details" — 84 (28.87%)
- `1 / SUBMITTED` — "Lead submitted for Internal Verification" — 1 (0.34%)
- `2 / ALLOCATED` — "Lead Allocated to Employee" — 0 (0.00%)
- `3 / UNDER-PROCESS` — "Lead is under process from lender" — 198 (68.04%)
- `4 / APPROVED` — "Loan approved by lender" — 0 (0.00%)
- `5 / ARCHIVED` — "Lead Archived for Financial Year" — 0 (0.00%)
- `6 / REJECTED` — "Lead Rejected by Lender" — 0 (0.00%)
- `7 / DOCS QUERY - EA` — "Employee has Query for Advisor" — 5 (1.72%)
- `8 / QUERY RESOLVED - AE` — "Advisor responded to Employee Query" — 1 (0.34%)
- `9 / DOCS QUERY - LA` — "Lender has Query for Advisor" — 1 (0.34%)
- `10 / QUERY RESOLVED - AL` — "Advisor responded to Lender Query" — 1 (0.34%)
- `11 / BLOCKED` — "Lead Rejected by BI-V" — 0 (0.00%)
- `12 / DISBURSED` — "Loan has been disbursed to the customer account" — 0 (0.00%)
- `13 / FAKE` — "Fake Lead Detected" — 0 (0.00%)
- Followed by a "Lead Status Distribution (%)" chart section.

`/report/product-wise`: same visual pattern but bucketed by product: Kyc Loans 137 (47.08%), Instant Loan 95 (32.65%), Loan Against Shares 1 (0.34%), Demat Account 2 (0.69%), Bank Account 7 (2.41%), Personal Loan 18 (6.19%), Credit Card 19 (6.53%), Business Loan 9 (3.09%), Home Loan 3 (1.03%).

---

## 8. Marketing Tools (`/tools`)

Title "Finoza Capital crm - Marketing". One card per product (9 total, same product set as everywhere else), each with an **orange header bar** showing `#<id> <Product Name>` + green **ACTIVE** pill, body copy: *"Use the branded `<Product>` marketing material with videos, advertising banners, and PDF's to boost your lead conversion and reach more customer."*, then a mini-table:
`Content | File Type | Count | Action` — rows: **Videos**/YouTube/0, **Banners**/Images (png, jpg, jpeg)/0, **eBooks**/PDF's/0. All counts are 0 in the demo tenant and the Action column is empty (no download links currently attached).

Screenshot: `shots-advisor/tools.png`

---

## 9. Pincode & Company (`/loan-tools/pincode-search`, `/loan-tools/company-search`)

`/loan-tools/pincode-search` ("Pincode Data Search"): single required field **Pincode** (numeric text input) + **"🔍 Search Pincode"** button (amber/yellow).

`/loan-tools/company-search` ("Company Data"): copy "Enter a company name to find its corresponding code" + presumably a text field/search button (same minimal single-field pattern).

Both are utility lookup tools with no visible result table until searched (not triggered, read-only).

Screenshot: `shots-advisor/loan_tools_pincode_search.png`

---

## 10. Lender Policy & Docs (`/policy-docs`)

Title "Finoza Capital crm - Lender". Breadcrumb: Lender / Policy Docs. **This is NOT a lender-by-lender browsable library** — in the demo tenant it renders exactly **one** policy document, full text, no lender picker/dropdown/accordion found in the DOM:

> **#Lendingkart Business Loan Policy**
> Start login files for Business loan for Lendingkart finance Ltd
>
> **REQUIRED DOCS**
> 1. One year PDF banking.
> 2. Pan Card aadhar card.
> 3. Registration proof.
>
> **Loan cap 1 Laks to 35 Lakhs**
> Minimum 12 Lakhs sale yearly as per bank statement.
>
> 1. Minimum Vintage 7 month with Co applicant GST with Savings & current account And Udyam only Current account
> 2. Cibil 600 +
> 3. 1 Cibil accepted
> 4. Both rented accepted
> 5. Without gst return without ITR filling accepted
> 6. Pan India files acceptable
> 7. Age 18 + acceptable
> 8. Age 60+ acceptable with Co applicant
> 9. Business on saving account + Registration acceptable
> 10. Udyam certificate vintage one year and banking one year acceptable
>
> Only PDF format banking acceptable
>
> Without registration not accepted

This is a **freeform rich-text block**, not a structured field grid — headings/bold/numbered-list are just inline HTML inside one long article. If a clone is meant to show all ~17 lenders' policies here, this demo tenant only has this single one seeded; the per-lender eligibility text actually used operationally lives on the **Process Lead / "Choose a Bank"** screen (§13 below), which is far richer and is probably the real source of truth to clone.

Screenshot: `shots-advisor/policy_docs.png`

---

## 11. Product List (`/product`)

Title "Finoza Capital crm - Product". "Products Overview" grid of 9 cards, each: icon, `#<id> - <Name>`, short code + type line, green **ACTIVE** pill:
`#18 - Kyc Loans` (KYC - Loan), `#17 - Loan Against Shares` (LAS - Loan), `#14 - Bank Account` (BNK - Bank Account), `#12 - Demat Account` (DMT - Demat Account), `#10 - Credit Card` (CRD - Credit Card), `#5 - Home Loan` (HML - Loan), `#3 - Business Loan` (BNL - Loan), `#2 - Personal Loan` (PRL - Loan), `#1 - Instant Loan` (IPL - Loan).

Screenshot: `shots-advisor/product.png`

---

## 12. My Profile / My Account (`/my-account`) — all 6 tabs

Tabs (pill-style, active = solid indigo `#443ee0`-ish, inactive = plain link): **Basic Details**, **Contact Details**, **Bank Details**, **Upload Documents**, **Advisor Agreement**, **Update Password**. All tab panes are present in the DOM simultaneously (Bootstrap tab panels) — only visibility toggles.

**Basic Details**: Advisor Code (readonly, `FC08524097`), Email, Company Name, Dob (date picker), Aadhar, Pan, Gender (radio: Male/Female), Married (radio: Single/Married/Divorced/Widowed). Button: **Next**.

**Contact Details**: First Name, Last Name, Mobile, Alternate Number, Address Line 1, Address Line 2, Landmark, State (select, e.g. "Andaman & Nicobar Islands"), District (select), City. Button: **Next**.

**Bank Details**: Bank Name (select), Account Number, Account Holder Name (prefilled "Demo DSA"), Ifsc Code, Upi, Account Type (select — "Savings Account" seen), Status (radio: Active / **In-Active**, In-Active pre-selected in demo). Button: **Next**.

**Upload Documents**: Document Type (select "Select Document Type") + Select File ("Choose file" / "No file chosen") + **Upload** button. Below: 4 required-document tiles, each with a red **PENDING** pill and "Please upload document" placeholder text: **#1 Pan Card**, **#2 Aadhar Card**, **#3 Address Proof**, **#4 Cancel Cheque / Passbook**. Below that, an (empty in demo) table: `Document ID | File Format | Document Type | Date | Status | View`. Button: **Next**.

**Advisor Agreement** — the completion-checklist screen. It renders one amber row per unmet requirement, numbered 1–18, exact wording pattern:
- Field items: `"N - Please enter '<Field>' in '<Tab>' tab."` (18 confirmed for this demo advisor: Pan/Aadhar/Dob in Basic Details; Account Number/Ifsc Code/Account Type/Upi/Bank Name in Bank Details; Address Line 1/Address Line 2/Landmark/State Id/District Id/City in Contact Details; then 4 document items:)
- Document items: `"N - Please upload '<Doc Name>' in 'Documents' tab. Document Status: PENDING"` (Pan Card, Aadhar Card, Address Proof, Cancel Cheque / Passbook — each with its own inline red **PENDING** pill).

Below the checklist, static legal copy:
> "This is intended for advisors collaborating with us. Please find the attached PDF document containing the agreement. Kindly download the file, thoroughly read our **Terms & Conditions**, and understand the policies outlined within the agreement. By working as an advisor with Finoza Capital, you implicitly agree to comply with our terms and policies. Once you have reviewed the document, please proceed to sign it. Afterwards, send the signed agreement to **support@finozacapital.com**, making sure to include your Advisor Code in the Subject line. Thank you."

And the gating banner (red/pink alert box):
> **"Please fill all required fields in all tabs to download advisor agreement."**

i.e. the agreement PDF download is **hard-gated** behind 100% profile+document completion — there is no partial/preview download. This is the single most clone-worthy mechanic on this page.

**Update Password**: New Password, New Password Confirm, button **"Change Password"**.

Screenshots: `shots-advisor/myaccount_basic_details.png`, `myaccount_contact_details.png`, `myaccount_bank_details.png`, `myaccount_upload_documents.png`, `myaccount_advisor_agreement.png`, `myaccount_update_password.png`

---

## 13. Lead Update / "Process Lead" screen (`/lead/update/<token>`) — the important one

URL pattern observed: `/lead/update/<long base64-like token>`, page title format `#<LeadID> / <Product Name> Step - 2`.

**Layout**: breadcrumb → lead header bar (customer name **"View Lead"** button linking back to `/lead/view/<token>`) → contact/product summary bar (phone number, product pill) → **"Choose A Bank To Process The Application"** header bar → a green pill **"`<N>` LENDERS ARE AVAILABLE"** → a responsive grid of lender cards (6 per row at 1500px, wraps to 3 rows for 17 lenders).

**Loading behaviour worth noting for a clone**: the lender cards render as grey skeleton placeholders for several seconds after page load (this is an async/AJAX fetch, not part of the initial HTML) — a naive scrape/capture at `domcontentloaded` gets nothing; needs `networkidle` + an extra ~5s wait.

**Each lender card**:
- Unselected radio button, top-left (single-select — implies you can only push to one lender at a time from this screen)
- Lender logo image
- Top-right status ribbon: red **LIVE** badge normally, or a blue **"ALREADY APPLIED"** badge + light-blue card background + border when this lead has already been pushed to that lender
- Bullet list of eligibility criteria (see verbatim dump below) — inconsistent internal formatting (some use `Field : : value`, others `Field ; : value`, others plain sentences — this is literally free text entered per lender, not a structured schema)
- Lender name, bold, centered at card bottom
- If already-applied: an orange **"↠ Resume Application"** button replaces the criteria/name area

**Verbatim eligibility text captured for the "Kyc Loans" product (17 lenders, lead #364 and #360 — identical since it's product-level data, not lead-level)**:

1. **Money View** — "Salary or Self employed : : Monthly in hand salary > 13500 / CIBIL Score >= : 700 / Age Should be : : 21 and < 57 Years"
2. **Hero Fincorp** — "Age : : 21 to 58 years old / Minimum monthly income : : ₹15000 / Work Experience : : Salaried: 6 month Minimum // Self-employed: 2 years minimum / Credit Score : : 700+ above / Loan Amount : : Upto ₹5 lakh"
3. **Poonawala Fincorp Digital PL BL** — "Loan Amount : : Up to ₹75 Lakh / Age : : 21 to 65 years old / Location ; : All Pin Code Base / Profile ; : Salary & Self Employed / Credit Score : : 720+"
4. **Indusind Bank (digital)** — "Maximum : : 30000 / Maximum : : 2500000 / CIBIL : : 700+ / Interest Rates : 10.49% p.n. onwards : : Minimum income - Rs 21000 per month"
5. **InCred** — "CIBIL: 700+ : Customer Eligibility - Customers - Age 21 to 55 years : Product offered : term Loan from 50k to 10 Lac / Min income : 20,000 : Type Salaried & Self Employeds / Location ; : All Pin Code Base"
6. **Unity Small Finance Bank** — "Age : : Between 21 and 56 years / Minimum monthly income : : ₹20000+ for salaried & Self Employeds / CIBIL Score : : 700+ / Loan Amount : : 1 Lakh to 5 Lakh / Interest Rate : : 15.50% to 24.75% p.n"
7. **Prefr loan** — "CIBIL Score : 720+ / Age Between : 21 and 55 Years / Minimum Monthly Income ; : 15000+ / Bank Proof ; : 6-12 Month Bank Statements / Loan Amount : : 50k To 5 Lakh"
8. **Muthooth Fincorp EDI** — "Loan Amount : : 1 Lakh to 5 Lakh / Interest Rate : : 15.50% to 24.75% p.n / Age : : Between 21 and 56 years / Minimum monthly income : : ₹15000 for salaried & Self Employed / CIBIL Score : : 700+"
9. **Earlysalary/Fibe** — "Age ; : 21Y - 55 Years / Maximum Income ; : 15000+ / CIBIL Score : : 700+ / Profile ; : Salary & Self Employed"
10. **Payrupik** — "Loan Amount : : 1 Lakh to 5 Lakh / Age : : Between 21 and 55 years / CIBIL Score - : 700+ / Minimum monthly income : : ₹15000 / Interest Rates : : 10.49% p.n. onwards"
11. **Kissht** — "Loan Amount - 10k to 5 lacs : : interest rate and type - 14% - 33% (Type Reducing) : : Minimum income Rs 15000/- (Self declared) / Minimum Age - 21 years Maximum 59 years : : CIBIL Score - 700+ / Profile ; : Salary & Self Employed"
12. **Zype** — "Minimum : : 50000 / Maximum : : 500000 / CIBIL Score : : 700+ / Profile ; : Type Salary & Self Employed / Location ; : All Pin Code Base"
13. **BL - Flexi Loans** — "Loan Amount ; : ₹50K – ₹5 Lac / CIBIL Score ; : 700+ / Age ; : 21y - 55 Years / Profile ; : Salary & Self Employed / Location ; : All Pin Code Base"
14. **PFL BL** — "Cibil Score : 700+ / Age ; : 21Y- 55Years / All Location ; : Pin Code Base / Loan Offers ; : Customers eligibility"
15. **Smart Coin** — "Minimum: : 50000 / Maximum : : 750000+ / CIBIL Score : : 650+ / Profile ; : Salary or Self Employed"
16. **Indifi** — "Loan Amount ; : ₹50K – ₹10L / CIBIL Score ; : 700+ / Profile ; : Salary & Self Employed / Age ; : 21Y - 58 Years" — (this is the one shown as **ALREADY APPLIED / Resume Application** on lead #364)
17. **Protium** — "Age : : Between 23 and 60 years / Tenure Min - 12 Months and Max - 36 Month : : CIBIL Score - 700+ / Borrower Type : : Self Employed individuals, Proprietorship Firm, LLP Partnership Firm, Private limited co."

**"Instant Loan" product** (lead #356) shows a **different 16-lender set** with different criteria for the *same lender brands* (e.g. Kissht here: "Cibil Score : 720+ / Age Between : 23 and 55 Years / Minimum Monthly Income ; : Salary - NRI 25K / Self Employed INR 25K Salary Credit : Bank Account / Loan Amount : : 50k To 5 Lakh" — completely different numbers from the Kyc Loans Kissht card above). **This confirms eligibility criteria are stored per (lender × product), not per lender alone** — an important data-model detail for cloning. On lead #356, **Kissht** is the one marked "ALREADY APPLIED / Resume Application", matching what its `/lead/view/356` page shows in the Lender Details table.

Screenshots: `shots-advisor/lead_update_364.png` (Kyc Loans, 17 lenders, Indifi applied), `lead_update_356.png` (Instant Loan, 16 lenders, Kissht applied), `lead_update_360.png` (Kyc Loans, 17 lenders, Muthooth Fincorp EDI applied).

---

## 14. Lead View screen (`/lead/view/<token>`)

Title format: "`<Product>` Lead View". Sections top to bottom:
1. Optional black countdown banner (only seen while truly mid-process): **"⏳ Please wait until your application is processed. Next Update In `1d 9h 51m 26s`"** — a live JS countdown, not static text.
2. Header bar: customer name + `#<LeadID>`, **"Apply More"** button (amber).
3. Summary strip: **Product** (icon+name), **Relationship Manager (RM)** (name + email, may be blank if unassigned), **Lead Status** (coloured pill).
4. **"Disbursed Details"** panel — empty-state **"No data available"** for every non-disbursed lead.
5. **"Lead Details"** grid: Loan Requirement, Customer Name, Customer Surname, Customer Mobile, Customer Email, Pan Card, State, District, Pincode, Net Salary.
6. **"Lead Remarks"** two-column panel:
   - Left: **"Conversation History"** — a dated chat-style thread, each message shows initials avatar, sender name, an **EMPLOYEE**/similar role pill, message text, timestamp. Empty state when no messages: **"💬 No messages yet"**.
   - Right: **"Lead Remark"** textarea + green **"⊕ Add Remark"** button + a red instruction line **"(ONLY CHANGE IF YOU RESOLVED DOCS QUERY 7 or 9)"** + **"Current Status (`<code>`)"** select (same 17-item status list as the Lead Report filter) + two amber help boxes: *"Select ⇒ Query Resolved - 8 When you resolved 'Docs Query' raised by RM (Docs Query - 7)"* and *"Select ⇒ Query Resolved - 10 When you resolved 'Docs Query' raised by Lender (Docs Query - 9)"*.
7. **"Lender Details"** table: `Apply ID | Lender | Lender Name | Applied Date | Status | Resume`. Lender cell shows the lender's own logo/wordmark as a small pill; Resume cell = orange **"→ Resume Application"** button if status is Pending.
8. **"`<Product>` Journey"** — a vertical timeline (left rail line), each entry: status label (e.g. UNDER-PROCESS), description line (e.g. "Lead Submitted to Lender", "This lead has been forwarded from Lead ID #363 due to New RM", "Lead Started by Advisor"), timestamp + relative "N hour(s) ago".

Screenshots: `shots-advisor/lead_view_364.png`, `lead_view_356.png`, `lead_view_360.png`

---

## 15. Notifications (`/notifications`) and Changelog (`/changelog`)

`/notifications` ("All Notifications"): intro copy "All notifications including Lead Updates, Account Related update and transactions, and System update and Announcements" + a "Search Notification" box + three collapsible sections **Leads Notifications (`N`)**, **Account Notifications**, **System Notifications** (the latter two empty in this demo). Leads table: `# | From | Date & Time | Notification | Action`, Notification cell often has a highlighted amber sub-line for the actual remark text (e.g. "New Remark Added For Lead #260" with sub-banner "UNCOMMPLITE DOCOMENTS"), Action = blue **"View Lead"** pill button. The bell-icon dropdown tabs are **"Lead `<count>`"**, **"Account"**, **"System"**.

`/changelog` ("Advisor Notifications All" / "CRM Changelogs"): a simple reverse-chronological release log:
- **2024-03-02 — VERSION 3.5.1**: "Report page loading issue fixed.", "Team invite page issue fixed.", "Social media groups join links for WhatsApp & Telegram added.", "Dashboard marketing banners updated.", "DSA payout sheet updated -> payment/chart"
- **2024-03-31 — VERSION 4.0.0**: "[NEW] - New Products added - product", "[NEW] - Lender Policy added - policy-docs", "[NEW] - Advisor Training videos added - training", "[NEW] - Marketing tools added - tools", "[FIX] - Lead filter improved - lead/report", "[FIX] - Payout Fixed - payment", "[FIX] - Report filter added - report/product-wise"
- **02 March 2024 — VERSION 3.5**: "Initial CRM release."

Each version number rendered as a dark badge, each `path`-looking token (e.g. `payment/chart`, `policy-docs`) is literally inline plain text, not a link.

---

## 16. Flows likely missed if you only captured the 9 add-lead forms + a couple of screenshots

1. **The Process-Lead lender grid is the real product** — eligibility text is keyed by (lender, product), not just lender; a static "Lender Policy" page (§10) is a red herring/stub compared to this.
2. **Advisor Agreement's hard gate** (§12) — 18-point live checklist + all-or-nothing PDF gating is a distinct, reusable mechanic (progress-gated document unlock).
3. **`/payment/chart` route bug** — sidebar promises a payout chart, page silently serves Marketing eBooks instead. Don't clone this by accident; decide on purpose whether "Payout Chart" should be a real chart.
4. **"LEAD UPDATE" sidebar item is actually notifications**, not a separate lead-editing shortcut — naming trap.
5. **Dashboard "Apply More" vs My-Leads-list "Edit"** — two different action labels/behaviours for what may be the same underlying route; check whether they actually diverge before cloning one generic action.
6. **Lender criteria formatting is inconsistent free text** (`:`, `::`, `;`, `; :` mixed within the same card) — if cloning, decide whether to normalize into a real schema (min/max income, CIBIL, age range, tenure, profile type, geography) rather than copying the raw strings verbatim.
7. **Countdown banner on Lead View** ("Next Update In 1d 9h 51m 26s") is a live timer — only appears on some leads; worth understanding what sets/resets it before deciding if it's essential.
8. **Empty states are numerous and consistently styled** (amber `"No data available"` banner) across My Sub Advisor Leads, Lead → Team, My Payout, Disbursed Details, Account/System notification tabs — a single reusable empty-state component would cover all of them.
9. **Single-select radio per lender card** on Process Lead implies one lender push at a time, with a visually distinct "already applied" state (blue bg + badge + Resume button) rather than disabling the card — worth deciding if multi-apply should be allowed in a clone.
10. **Version/build strings are inconsistent** across footers (V 4.0.0 vs V 4.0.1 vs "CRM Version 4.1" on the login page) — cosmetic but a tell that these are hardcoded per-template, not sourced from one config.
