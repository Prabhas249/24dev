# 3 PM call — QCred walkthrough

**Keep this open on a second screen. Browser on the other.**
Live: https://qcred-crm.vercel.app · every password `qcred@123`

Have these tabs pre-opened **before** you dial, so you're never typing while he watches:

| Tab | URL | Logged in as |
|---|---|---|
| 1 | `/dashboard` | `9999900001` Super Admin |
| 2 | `/partners` | same |
| 3 | *(incognito)* `/login` | for the Maker/Checker switch |
| 4 | *(second incognito)* `/partner` | `9820011001` partner |

> Pre-opening tab 3 and 4 in **separate incognito windows** matters — logging out and back in mid-call kills momentum and looks unrehearsed.

---

## Opening — 60 seconds, set the frame

> "Before I show you — everything you're seeing is built and running live, with dummy data. Your coding framework document is fully implemented, not planned. What I want from this call is your feedback, because changes now are cheap and changes after the mobile apps are built cost three times as much."

**Why say this:** it frames the call as *him giving feedback*, not you presenting. That's what you actually need from him.

---

## 1 · Dashboard — 2 min

**Do:** land on `/dashboard`. Point at the four cards.

- Total leads **10** · Disbursed **₹72.00 L** · Active partners **6** · Payouts pending **₹82,080**
- Click the **₹82,080** figure → it opens the filtered payouts list

**Say:** "Every number on this screen is clickable and drills into the records behind it. The CRM you showed me had static numbers — you'd see a total and then go hunting for what made it up."

**Also point at:** the two alert strips — *1 partner application to review*, *2 payouts awaiting approval*. "The dashboard tells your team what needs action today, not just what happened."

---

## 2 · Leads — 4 min ⭐ *the strongest part, don't rush it*

**Do:** Tab 2 → `/leads`

- Show the search + status + product filters
- Point at the phone numbers — **click-to-call and WhatsApp icons on every row**

**Say:** "Your RM taps once to call or WhatsApp. On the old system they were copying numbers out."

**Do:** open any lead → scroll to the **lender applications** section

**Say this slowly, it's the bit that shows you understood his business:**
> "This is the part I changed from the reference CRM. A file doesn't go to one lender — it gets shopped around. So one lead here holds multiple applications. This customer was rejected by one lender and disbursed by another, and both records survive. On the old system you'd have lost one of them."

**Do:** click **Log in with lender** → show the lender list → point at the generated link

**Say:** "The link carries your DSA code and the lead reference, so the lender attributes the business back to QCred automatically."

> ⚠️ On the CRM side the button reads **"Log in with lender"**. The wording **"Apply more"** is on the *partner* side (step 6) — don't hunt for it here.

---

## 3 · Partners — 4 min ⭐ *this is the one he'll care most about*

**Do:** Tab 2 → `/partners`

Point at the codes on screen, read them out:

```
QC-MH-BH-01           Business Head, Maharashtra
QC-UP-CH-01           Cluster Head, Uttar Pradesh
QC-MH-MUM-SDA-0001    Sub-DSA, Mumbai
QC-KA-BLR-CON-0001    Connector, Bengaluru
```

**Say:** "These aren't typed in. The system generates them in the exact format from your document — state code, city code, partner type, and a sequence that runs per state-city-type combination. And codes are permanent — even if a partner exits, that number is never reissued, because otherwise your commission audit trail breaks."

**Do:** open `QC-MH-MUM-SDA-0001` → show the reporting line up to `QC-MH-BH-01`, and the connector reporting under him.

**Say:** "Four tiers, exactly as your document lays out."

---

## 4 · The §4 block — 2 min 🎯 *the moment that wins the call*

**Do:** `/partners` → open **Girish Hegde** (`QC-KA-BLR-CON-0001`, pending)

**Point at:** the governance panel — *"Training · Mandatory before code activation (§4) · **Pending**"*

**Say:** "Notice there is no Activate button. Your document says training is mandatory before code activation, so the system doesn't offer activation at all until it's recorded — and it tells you exactly what's blocking it."

**Then — the good bit. Do:** click **Mark training complete**

**Say:** "Watch." → the status flips to **Complete** and the **Activate** button *appears*.

> ✅ Verified working live at 2 pm today. The gate visibly opens on screen — this is the single most convincing moment in the demo.
>
> ⚠️ **You've just changed the demo data.** Tell me after the call and I'll reset it in 30 seconds. Or if he wants to see it blocked again, use `QC-MH-NAG-CON-0001` (Farhan) — uncertified for KYC, same idea.

> This proves you read his docx properly. If the call is running long, **cut something else, not this.**

---

## 5 · Maker vs Checker — 3 min

**Do:** Tab 3 incognito → sign in `9999900002` → `/leads`

**Say:** "This is a staff member. Look at the lead count — he sees only his own, not the whole book. That's not the menu hiding things; the database never sends him the others. He can't reach another RM's lead even by typing the address."

**Do:** sign in as `9999900003` (Checker) → `/payouts`

**Say:** "The Checker approves payouts but can't raise them. The Maker raises but can't approve. No single person moves money end to end — that's the control your lenders and auditors will ask about."

---

## 6 · Partner portal — 4 min

**Do:** Tab 4 → `/partner` as `9820011001`

- Dashboard with their own numbers, product quick-launch tiles
- `/partner/leads` → point at **Apply more** on each row *(this is where that wording lives)*
- `/partner/leads/new` → **change the product dropdown** → the form fields change with it
- `/partner/team` → their connector reporting under them
- `/partner/payouts` → what's paid, what's pending

**Say:** "Same platform, completely different view. And internal remarks your team writes are never visible here — that's enforced in the query, not just hidden on the page."

---

## 7 · Settings — 2 min, closing note

**Do:** `/settings`

**Say:** "The things you'll want to change, you change yourself — lead stages, the numbering format, lender policies, what each role can do. You don't come back to me for those."

---

# Questions he will ask — answers ready

**"When will the mobile apps be ready?"**
> ❌ Don't give a date on the call.
> ✅ "Once your feedback is in and the web platform is signed off, I'll give you a firm timeline for both apps. I don't want to commit to a date and then have your feedback change the screens the apps are built from."

**"Can the Business Head see only his own state?"**
> ✅ "Right now he sees the whole book. Your document mentions state-wise edit access — if you want him restricted to his state, that's a small change and best decided now, before we create real staff accounts."

**"Is it BH or SH in the codes?"**
> ✅ "Your document says SH in one section and BH in two others, so I used BH. It's a setting either way — one change and every future code follows. Just tell me which you want before the network grows."

**"When can my team start using it?"**
> ✅ "As soon as you give me the domain — `crm.qcred.in` or similar — and confirm I should create the database and document storage under a QCred-owned account. That's a short job once you decide."

**"Is our customer data safe?"**
> ✅ "Everything you're looking at is fictional demo data. No real customer information has ever touched my machine. When we go live, the database and document storage are created in QCred's own accounts, so your real data starts there and never has to be migrated."

**"Can you add [something new]?"**
> ⚠️ Don't say yes on the call. Say: "Let me look at it and come back to you — some things are configuration and take minutes, others are development. I'll tell you which it is." *(Protects you from scope creep on a live call.)*

---

# What YOU need to get from this call

Don't hang up without these. Say them as a checklist at the end:

- [ ] **Feedback deadline** — "when can I expect your written feedback?" *(nothing moves without it)*
- [ ] **Domain** — which subdomain, and who at their end can point the DNS
- [ ] **Go-ahead** to create the production database + storage under QCred ownership
- [ ] **BH or SH** decision
- [ ] **Business Head state-scoped access** — yes or no
- [ ] **Video scope agreed** — see below

---

# On the training videos — the position to take

He asked for "quick videos capturing screens for all the roles and functions".

**Say this:**
> "Happy to do those. One suggestion on timing — let's record them *after* your feedback is in. If I shoot them now and you ask for changes, every video has to be reshot. Once the screens are final I'll record a set covering the main roles and the core functions, and they'll drop straight into your training repository."

**Why it matters commercially:** "all roles and functions" taken literally is 11 roles across 14 modules — 50+ videos. Agreeing to *"the main roles and core functions"* keeps it at 12–15 clips, which is genuinely useful to them and finite for you.

**Don't mention money for these.** It's goodwill, it reduces their support calls, and it's portfolio material for 24dev. Just don't let it be unbounded.

---

# Traps — things NOT to say

| ❌ Don't say | ✅ Say instead |
|---|---|
| "It's 100% complete" | "The web platform is complete. The apps are the next milestone." |
| "The apps will take X weeks" | "I'll give you a firm timeline once feedback is locked." |
| "Yes I can add that" | "Let me check whether it's configuration or development." |
| "It's live" *(implies on their domain)* | "It's live for your review — going onto your domain is the next step." |
| Anything about Finoza by name | "the reference CRM you shared" |

**Last one matters** — never name their competitor's system as something you copied. You *studied* it and *improved on it*.

---

# If the call runs short on time

Cut in this order: **7 → 1 → 6 → 5**
Never cut: **3 and 4** *(his framework, and the §4 block — that's the trust-builder)*
