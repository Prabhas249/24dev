# Finoza teardown — admin CRM (crawled 29 Jul 2026)

Source: `https://finozacapital.com/manage-dsa` · crawled read-only, 60 pages.
Raw data: `crawl.json` · full-page screenshots: `shots/` · URL list: `links.json`

Vocabulary note: Finoza says **Advisor / Sub-Advisor**. The industry term is
**DSA / Sub-DSA** (Direct Selling Agent). QCred's written scope says **Channel Partner**.
Same person, three names — pick one before UI copy is finalised.

---

## 1. Lead statuses — numeric codes, not free text

Finoza's `lead_status` is a **number 0–12** with a label. The number is shown to
users (`3 - UNDER-PROCESS`) and typed into the status box on the lead screen.

| Code | Label | Notes |
|---|---|---|
| 0 | Pending | just created |
| 1 | Submitted | sent onward |
| 2 | Allocated | assigned to an RM |
| 3 | Under-Process | with the lender |
| 4 | Approved | sanctioned |
| 5 | Archived | parked |
| 6 | Rejected | terminal |
| 7 | Docs Query - EA | Employee → Advisor query raised |
| 8 | Query Resolved - AE | Advisor → Employee response |
| 9 | Docs Query - LA | Lender → Advisor query raised |
| 10 | Query Resolved - AL | Advisor → Lender response |
| 11 | Blocked | terminal |
| 12 | Disbursed | terminal, triggers payout |

**The 7–10 block is the important bit.** Document queries are their own statuses
with an explicit direction (EA / AE / LA / AL), so a lead ping-ponging between
lender queries and advisor responses is visible in reporting. Our 9-stage
pipeline collapses all of that into "Documents pending".

## 2. Loan types (their product ids are sparse — 1,2,3,5,10,12,14,17,18)

`1 Instant Loan · 2 Personal Loan · 3 Business Loan · 5 Home Loan · 10 Credit Card ·
12 Demat Account · 14 Bank Account · 17 Loan Against Shares · 18 Kyc Loans`

Note they sell **non-loan products too** — demat and bank accounts. Worth asking
QCred whether they want the same.

## 3. Module map (sidebar)

```
DASHBOARD
ADVISORS      /advisor/adv · /advisor/all · /advisor/view/{id}
LEADS         /lead (overview) · /lead/report (filter) · /lead/all
              /lead/my-disburse · /lead/disburse · /lead/payout-status · /lead/lead-status
PAYOUTS       /payouts/my · /payouts/advisor
REPORTS       /reports · /reports/lead-wise · /reports/product-wise
PRODUCTS      /product
NOTIFICATIONS /notifications
PROF. EMAIL   /email/list · /email/create-email       (mailbox hosting — out of our scope)
EMPLOYEES     /employee
DATA SYNC     /data-sync
CRM SUPPORT   /support        (ticketing: Ticket ID, Issue Type, Title, Status, Created At)
SERVICE PAY   /payment        (their billing of the DSA — out of our scope)
IMAGE MANAGER /images
BLOG MANAGER  /blog · /blog/add-blog · /blog/catagory
WEBSITE PAGES /page/home-page, loan-rate, services, process, why-us, testimonials,
              loans, help, menu, about-us      (website CMS — qcred.in already has Sanity)
SETTINGS      /setting/payout-chart · contact-details · social-media · branding-banners
              theme-colors · branding · change-password · mobile-application · domain
              website · google
CHANGELOG     /changelog
```

## 4. Table columns (use these as our column sets)

- **Dashboard — Advisor's Leads:** `# | Lead Status | Advisor | Updated/Added | Customer Info | Product | RM | Actions`
- **All leads:** `# | Status | Last Update | Advisor | Product | Amount | Customer | Mobile | Actions`
- **Advisors:** `Advisor Code | Joining Date | Advisor Name | Advisor Contact | Email Verify | Earning | Status | Action`
- **Payouts:** `ID | Advisor ID | Amount | Bank ID | Mode | Reference | Employee ID | Type | Status | Date`
- **Employees:** `ID | Status | Product Info | First Name | Last Name | Email | Phone | Action`
- **Lender details (per lead):** `Apply ID | Lender | Lender Name | Applied Date | Status`

Dashboard KPIs: Total Advisors (incl. sub-advisors) · Total Leads · Loan Disbursed,
then four percentage bars: **In Process / Approved / Has Query / Rejected**.

## 5. Lead detail screen — the layout to match

Header strip: `Product · Required Loan Amount · Advisor (code + mobile) · Lead Status badge`

Then, in order:
1. **Admin — Disbursed Details** and **Advisor — Disbursed Details** (two separate blocks)
2. **Lead Details** — Customer Name, Customer **Surname**, Customer Mobile, Customer Email,
   **Pan Card**, **Aadhaar Card Front**, **Aadhaar Card Back**, State, **District**, Pincode
3. Buttons: `Copy Lead Details` · `Show Plan Text`
4. **Lead Remarks**, split two-up:
   - *Lead Management* (left): current status · **"Send Email to Advisor?"** · update-status
     dropdown **plus a numeric code box** · lead remark textarea · Update Status
   - *Conversation History* (right): threaded messages with author + **role badge** + time
5. **Lender Details** table — multiple lender applications per lead
6. **Loan Journey** — vertical timeline of status changes with timestamps

---

## 6. Gaps between Finoza and what we have built

| # | Finoza has | We have | Action |
|---|---|---|---|
| 1 | **Multiple lender applications per lead** (Apply ID, applied date, per-lender status) | a single `leads.lenderId` | **schema change** — add a `lead_applications` table |
| 2 | Numeric status codes 0–12 incl. 4 query states | 9 named stages, no codes | add `code` to `lead_statuses`, add the query states |
| 3 | Customer **surname**, **district**, Aadhaar front/back as fields | single `customerName`, no district | add columns |
| 4 | Admin vs Advisor disbursement recorded separately | one `disbursements` row | add a `side` column |
| 5 | "Send email to advisor?" per status update | share-with-partner flag | add notify-on-update |
| 6 | RM (relationship manager) column on every lead | `assignedTo` | same thing, rename in UI |
| 7 | Advisor **earning** shown on the advisor list | payouts joined separately | add to the partners table view |
| 8 | Support ticketing, professional email, service payment, website CMS, blog | — | **out of scope** — qcred.in already has Sanity; email hosting and their own billing are not our project |

## 7. Not yet crawled

The **advisor/sub-advisor portal** is a separate login. The 9 product-specific
application forms live there, not in the admin CRM — the admin lead pages only
carry search boxes. Advisor credentials still needed.
