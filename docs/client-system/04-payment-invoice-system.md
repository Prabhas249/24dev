# 24dev — Payment & Invoice System (SOP)

> ⚠️ **WARNING — LEGAL / TAX DISCLAIMER**
> This document is an **operational SOP**, not legal or tax advice. GST rules, thresholds, mandatory fields, and invoice formats change and depend on your exact situation. **Before you issue your first invoice — and again the moment you register for GST — confirm your GST status, the exact required fields, your SAC/HSN code, place-of-supply handling, and reverse-charge rules with a qualified Chartered Accountant (CA).** Do not show a GSTIN or charge CGST/SGST/IGST until your CA confirms you are registered and obligated to do so. Charging "GST" while unregistered is illegal.

---

## 0. The 24dev Payment Model (at a glance)

- **Split:** 50% advance at booking + 50% balance on delivery.
- **Channel:** Razorpay Payment Links sent over WhatsApp.
- **Default flow:** **Two separate links** — one "Advance" link (50%) at booking, one "Balance" link (50%) on delivery. Simplest to reconcile, no partial-payment math, works on UPI.
- **Single-link alternative:** One link with Razorpay **Partial Payments** enabled and a minimum first payment set to 50%. Use only if you specifically want one link — note **partial payments do NOT work on UPI-only links**.

**Rule of thumb:** Use two links by default. The rest of this SOP assumes the two-link flow.

---

## 1. Razorpay — Create a 50% Advance Link (Dashboard, step-by-step)

Do this the moment a client says "yes" and the scope + price are agreed in chat.

1. Log in to the **Razorpay Dashboard**.
2. Go to **Payment Links** → click **+ Create Payment Link**.
3. **Amount:** enter the **50% advance** figure (e.g. ₹2,000 project → enter **₹1,000**).
4. **Customer details:** add the client's **name**, **WhatsApp number**, and **email** (email = where Razorpay sends the auto-receipt).
5. **Description / "For":** write a clear, specific line. This shows on the client's payment page and on Razorpay's records:
   - Example: `24dev — Starter Website (Rs 2,000) — 50% Advance`
   - Example: `24dev — Business Tier Rs 9,999 — 50% Advance (Booking)`
6. **Receipt / Reference ID (optional but do it):** enter your internal job code so payments map to a project, e.g. `JOB-0042-ADV`.
7. **Notes (optional):** add `Balance 50% due on delivery` so future-you knows this is a split.
8. **Expiry (optional):** set 48–72h to create urgency on hot leads.
9. Click **Create Payment Link**.
10. **Copy the short link** → paste into the WhatsApp message in §2 below.

### Creating the BALANCE link (on delivery)
Repeat steps 2–10, but:
- **Amount** = the remaining **50%**.
- **Description** = `24dev — <Tier> — 50% Balance (On Delivery)`.
- **Reference ID** = `JOB-0042-BAL`.
- Send only **after** the preview/staging site is approved and you're ready to hand over.

### (Optional) Single-link with Partial Payments
If you want ONE link instead of two:
1. Payment Links → **+ Create** → enter the **FULL** project amount.
2. Tick **Enable Partial Payments**.
3. Set **Minimum first payment** to the 50% figure (Dashboard accepts the amount; via API this is `first_min_partial_amount` in **paise** — e.g. ₹1,000 = `100000`).
4. Link stays `partially_paid` until fully settled; each payment gets its own `payment_id` under one `order_id`.
5. ⚠️ **Not supported on UPI-only links.** Most Indian shop owners pay by UPI — this is why two links is the safer default.

---

## 2. WhatsApp Scripts

> Copy-paste these. Replace the `[...]` placeholders. Keep links on their own line so WhatsApp makes them tappable. Light Hinglish is fine for Ad-1 shop owners; keep Ad-2 clients in clean English.

### 2a. Payment Request — Advance (send at booking)

**Plain / English (Ad 2 + general):**
```
Perfect, [Name] — locking your slot now. ✅

Here's a quick summary so we're aligned:
• Project: [Tier / scope, e.g. Business Website — 5 pages + copywriting]
• Total: ₹[total]
• Today (50% advance): ₹[advance]
• Balance (50% on delivery): ₹[balance]

To start, please pay the 50% advance here 👇
[Razorpay advance link]

The moment it's paid, your 24-hour clock starts and I begin building. You'll get a confirmation right after.
```

**Hinglish (Ad 1 shop owners):**
```
Bahut badhiya [Name] bhai/ji — aapka slot lock kar raha hoon. ✅

Quick summary:
• Aapki website: ₹2,000 (sab kuch included — domain, hosting, logo, copy)
• Aaj 50% advance: ₹1,000
• Delivery pe baaki 50%: ₹1,000

Shuru karne ke liye 50% advance yahan pay kijiye 👇
[Razorpay advance link]

Payment hote hi 24-ghante ka timer start aur main kaam shuru. Confirmation turant bhej dunga.
```

### 2b. Order Confirmation (send the instant advance is received)

```
Got it, [Name] — advance of ₹[advance] received. 🎉 You're officially booked.

📌 Your order
• Job ID: [JOB-0042]
• Project: [Tier / scope]
• Total: ₹[total] | Paid: ₹[advance] | Balance on delivery: ₹[balance]
• Delivery target: [date + time — e.g. by tomorrow 6 PM]
• Includes: [1 free revision / domain + lifetime hosting on your own account / starter logo]

Next, please send me:
1) Business name + tagline (if any)
2) Logo/photos (if you have them — optional)
3) What you want customers to DO (call / WhatsApp / buy / book)
4) Any site you like for reference

I'll share a preview link before final handover. Let's build something that brings you customers. 🚀
```

### 2c. Payment-Received — Advance (lightweight, if you want a separate "money received" note)

> Use this only if you'd rather keep "money received" separate from the order confirmation. Otherwise §2b already confirms receipt.

```
✅ Payment received — ₹[advance] (50% advance) for [Job ID / project]. Razorpay will email your receipt to [email]. Starting your build now!
```

### 2d. Payment Request — Balance (send when build is approved & ready to hand over)

```
[Name], your site is built and ready to go live. 🎉

Preview: [staging/preview link]

To release the final files + go live + hand over full ownership, here's the balance (50%) 👇
[Razorpay balance link]

As soon as it's paid I'll:
• Point your domain & publish
• Hand over hosting on YOUR account (lifetime, no renewals to me)
• Send your invoice + all logins
```

### 2e. Payment-Received — Balance + Handover (send when balance clears)

```
Paid in full — thank you, [Name]! ✅ You now own everything 100%.

📦 Handover pack:
• Live URL: [url]
• Hosting login (your account): [where/how]
• Domain: [registrar + renewal note — at-cost from year 2]
• Logo / brand files: [link]
• Invoice: [attached / link]
• Your 1 free revision is still available — just send changes.

If this site brings you even one new customer, that's the whole point. 🙌 A referral or a quick word-of-mouth would mean a lot.
```

---

## 3. Invoice Numbering (do this from day one)

Set up a single, **consecutive** running counter now so your books are audit-clean and you never have to retrofit when you register for GST.

**Rules (Rule 46(b) discipline — applies to both simple invoices and tax invoices):**
- **Consecutive** — no gaps, no random jumps. Every number used in sequence.
- **Unique within the financial year.**
- **Max 16 characters.** Only letters, numerals, hyphen `-` and slash `/`.
- **Reset/start a fresh series each new FY** (Indian FY starts **1 April**).
- You may run **parallel series** if you want (e.g. per ad line) — but keep each series unbroken.

**Recommended 24dev format:**
```
24DEV/26-27/0001
24DEV/26-27/0002
24DEV/26-27/0003
...
```
- `26-27` = FY 2026–27 (1 Apr 2026 → 31 Mar 2027). On 1 Apr 2027, switch to `24DEV/27-28/0001`.
- Keep the counter in your tracker/admin so the next number is always obvious.

> Note: the same invoice number stays with the project across both the advance and balance payments. Don't issue two different invoice numbers for one job — issue **one invoice** showing the split (or, if your CA prefers, a separate receipt per payment but a single tax/commercial invoice on completion). **Confirm this with your CA.**

---

## 4. INVOICE TEMPLATE — Variant A: NOT YET GST-REGISTERED (default while under ₹20L turnover)

> ⚠️ Use this variant **only while you are NOT registered for GST** (turnover under ₹20 lakh for pure services; ₹10 lakh in special-category states). **Do NOT show a GSTIN. Do NOT add CGST/SGST/IGST or any "tax" line. Do NOT write the words "Tax Invoice".** An unregistered supplier cannot legally charge or collect GST. This is a plain commercial document (a bill of supply / simple invoice). Confirm with your CA.

```
                          24dev
            Fast-Delivery Websites for Indian Businesses
        [Your Name / Proprietor]  •  [City, State]
        [WhatsApp / Phone]  •  [Email]  •  [Website]

-------------------------------------------------------------
                        INVOICE
-------------------------------------------------------------
Invoice No:   24DEV/26-27/0001
Invoice Date: [DD-MMM-YYYY]
Job ID:       JOB-0042

BILL TO
  Name:        [Client / Business Name]
  Address:     [Client address, City, State]
  Phone:       [Client phone]
  Email:       [Client email]

-------------------------------------------------------------
 #  Description                              Amount (₹)
-------------------------------------------------------------
 1  [Tier] Website — [scope, e.g.            [amount]
    5–7 pages + copywriting + CMS]
 2  Add-on: [e.g. Logo + Brand Kit]          [amount]
 3  Add-on: [e.g. Extra page x2]             [amount]
-------------------------------------------------------------
                              Subtotal:      [subtotal]
                              Discount:     -[discount]
-------------------------------------------------------------
                              TOTAL:        ₹[total]
-------------------------------------------------------------

PAYMENT STATUS
  50% Advance received [DD-MMM-YYYY]:        ₹[advance]
  50% Balance received [DD-MMM-YYYY]:        ₹[balance]
  -----------------------------------------------------
  AMOUNT PAID:                               ₹[total]
  BALANCE DUE:                               ₹0

Paid via Razorpay. Payment Ref(s): [payment_id(s)]

-------------------------------------------------------------
NOTE: Not registered under GST; GST not applicable.

WHAT'S INCLUDED / OWNERSHIP
  • Client owns 100% of website, code, domain & content.
  • Domain: setup + year 1 included; renewal at cost from year 2.
  • Hosting: deployed to client's OWN account — free for life,
    no renewals payable to 24dev.
  • Logo = starter brand kit. 1 free revision included.

Thank you for your business!
For questions: [WhatsApp / Email]
-------------------------------------------------------------
```

**Notes on Variant A:**
- The line **"Not registered under GST; GST not applicable."** is what keeps you honest and clear. Keep it on every invoice while unregistered.
- No GSTIN. No tax columns. No "Place of Supply / State Code" tax fields required (those are GST-invoice fields).
- You can still serve **clients in other states** while unregistered — for **services**, inter-state supply does NOT force GST registration. (Selling via an e-commerce operator, or reverse-charge situations, DO force registration regardless of turnover — flag any such case to your CA.)

---

## 5. INVOICE TEMPLATE — Variant B: GST-REGISTERED (use ONLY after you register)

> ⚠️ Use this variant **only after you are GST-registered and your CA confirms you must charge GST.** Web design SAC is commonly **998314** — **confirm the correct SAC and GST rate with your CA.** All fields below map to **Rule 46, CGST Rules 2017**. If recipient is **unregistered AND invoice value ≥ ₹50,000**, you must also capture the recipient's address, state, and state code.

**CGST/SGST vs IGST — which one:**
- **Same state** as you (intra-state) → split into **CGST + SGST** (each half the total rate; e.g. 18% → 9% CGST + 9% SGST).
- **Different state** (inter-state) → single **IGST** line at the full rate (e.g. 18% IGST).
- "Place of Supply" determines this — set it to the recipient's state for services. **Confirm edge cases with your CA.**

```
                          24dev
            Fast-Delivery Websites for Indian Businesses
        [Legal / Proprietor Name]
        [Full Registered Address, City, State – PIN]
        [WhatsApp / Phone]  •  [Email]  •  [Website]
        GSTIN: [your GSTIN]            State: [State] (Code: [NN])

-------------------------------------------------------------
                      TAX INVOICE
-------------------------------------------------------------
Invoice No:        24DEV/26-27/0001
Invoice Date:      [DD-MMM-YYYY]
Job ID:            JOB-0042
Reverse Charge:    No
Place of Supply:   [Recipient State] (State Code: [NN])

BILL TO
  Name:            [Client / Business Name]
  Address:         [Client address, City, State – PIN]
  GSTIN/UIN:       [Client GSTIN, or "Unregistered"]
  State:           [State] (Code: [NN])
  Phone / Email:   [client phone] / [client email]

-------------------------------------------------------------
 #  Description              SAC      Taxable Value (₹)
-------------------------------------------------------------
 1  [Tier] Website —        998314    [taxable value]
    [scope]
 2  Add-on: [logo, etc.]    998314    [taxable value]
-------------------------------------------------------------
                       Taxable Value:        [taxable_total]

   --- INTRA-STATE (same state) ---
                       CGST @ [r/2]%:        [cgst_amt]
                       SGST @ [r/2]%:        [sgst_amt]

   --- OR INTER-STATE (different state) ---
                       IGST @ [r]%:          [igst_amt]
-------------------------------------------------------------
                       INVOICE TOTAL:       ₹[grand_total]
-------------------------------------------------------------
   Amount in words: [Rupees ... only]

PAYMENT STATUS
  50% Advance received [DD-MMM-YYYY]:        ₹[advance]
  50% Balance received [DD-MMM-YYYY]:        ₹[balance]
  AMOUNT PAID:                               ₹[grand_total]
  BALANCE DUE:                               ₹0
  Paid via Razorpay. Payment Ref(s):        [payment_id(s)]

-------------------------------------------------------------
OWNERSHIP / INCLUSIONS
  • Client owns 100% of website, code, domain & content.
  • Domain: setup + year 1 included; renewal at cost year 2+.
  • Hosting: deployed to client's OWN account, free for life.
  • Logo = starter brand kit. 1 free revision included.

                                   For 24dev,

                                   ______________________
                                   Authorised Signatory
                                   (Signature / Digital Signature)
-------------------------------------------------------------
```

**Mandatory Rule-46 fields checklist (Variant B):**
- [ ] Supplier name, address & **GSTIN**
- [ ] Consecutive **serial/invoice number** (≤16 chars, FY-scoped)
- [ ] **Date of issue**
- [ ] Recipient name, address & GSTIN/UIN (+ address/state/code if unregistered AND value ≥ ₹50,000)
- [ ] **SAC code** (web design = **998314**, confirm with CA)
- [ ] Description of service
- [ ] **Taxable value** (after any discount)
- [ ] **Tax rate + amount**, split **CGST/SGST** (intra-state) or **IGST** (inter-state)
- [ ] **Place of supply** + state name
- [ ] **Reverse-charge** flag (Yes/No)
- [ ] **Signature / digital signature** of supplier or authorised rep

---

## 6. The ₹20 Lakh Line — When to Switch from Variant A to Variant B

- **Pure-services business** must register for GST once turnover crosses **₹20 lakh** (**₹10 lakh** in special-category states).
- **Below threshold → registration is optional.** Stay on **Variant A** (simple invoice, no GST, "GST not applicable" note).
- **Cross threshold → register, then switch to Variant B** (full Rule-46 tax invoices with GSTIN + CGST/SGST or IGST).
- **Triggers that force registration regardless of turnover:** selling through an **e-commerce operator**, or being liable under **reverse charge**. Inter-state **services** alone do **not** force registration. **Flag any of these to your CA immediately.**

**Action when you approach ₹20L:**
1. Talk to your CA **before** you cross the line.
2. Register for GST; get GSTIN.
3. Switch invoice template A → B from your registration date.
4. Keep the **same** consecutive numbering series running (don't reset mid-FY just because you registered).

---

## 7. Quick Operating Checklist (per job)

1. Scope + price agreed in WhatsApp.
2. Create **Advance** Razorpay link (50%). → §1
3. Send **Payment Request — Advance**. → §2a
4. On payment: send **Order Confirmation** + collect brand inputs. → §2b
5. Build. Share preview link.
6. On approval: create **Balance** link (50%), send **Payment Request — Balance**. → §1, §2d
7. On balance paid: **Handover** + issue invoice (Variant A or B). → §2e, §4/§5
8. Log invoice number in your FY counter (`24DEV/26-27/####`). → §3

---

*Last reviewed: [date]. Re-confirm all tax content with your CA before issuing — especially your GST status, SAC code, place-of-supply handling, and reverse-charge applicability.*
