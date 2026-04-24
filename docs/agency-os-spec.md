# 24dev Agency OS — Internal Dashboard Spec

**Purpose:** Real-time operational control center for running 100+ Starter/Launch/Pro builds per month, tracking WhatsApp leads, payments, and ad performance.

**Access:** `/admin` route within existing 24dev.in Next.js app. Clerk-gated (owner + employee).

---

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 16 App Router (existing) | Already set up in /Users/prabhas/24dev |
| Auth | Clerk | Multi-user, role-based (owner/employee) |
| Database | Supabase Postgres | Free tier, real-time subscriptions out of box |
| ORM | Drizzle | Type-safe |
| UI | Tailwind + shadcn/ui | Already in design system |
| Kanban drag-drop | dnd-kit | Lightweight, works with React 19 |
| Real-time updates | Supabase Realtime | Auto-refresh on INSERT/UPDATE |
| Hosting | Vercel (existing) | Zero infra cost |

---

## Data models

### `projects` (active client builds)
```sql
id uuid primary key
client_name text
client_email text
client_phone text
business_name text
business_type text -- cafe, saas, consultant, etc.
tier text -- starter, launch, pro, signature
price int -- in paise (199900 for ₹1,999)
intake_at timestamp -- when intake form submitted (delivery clock start)
deadline_at timestamp -- auto-computed: intake_at + tier's delivery window
status text -- intake, building, review, deployed, handover, done
assignee_id uuid references users -- who's building it
claude_session_id text -- tag for which Claude session is on this
razorpay_order_id text
razorpay_payment_id text
vercel_deploy_url text
custom_domain text
revisions_used int default 0
notes text
created_at timestamp
updated_at timestamp
```

### `leads` (from AiSensy WhatsApp)
```sql
id uuid primary key
whatsapp_phone text
whatsapp_name text
source_ad text -- which ad creative drove this
tier_interest text -- starter, launch, pro (inferred from conversation)
status text -- new, qualified, lost, converted
escalation_tag text -- #launch, #custom-scope, #pro, #signature, #escalation, #unclear
assigned_to uuid
project_id uuid references projects -- if converted
aisensy_thread_id text
created_at timestamp
last_message_at timestamp
```

### `payments` (from Razorpay webhook)
```sql
id uuid primary key
razorpay_payment_id text unique
project_id uuid references projects
amount int -- in paise
tier text
status text -- captured, failed, refunded
captured_at timestamp
```

### `events` (audit log)
```sql
id uuid primary key
project_id uuid
event_type text -- payment_received, intake_submitted, build_started, deployed, handover_sent
user_id uuid
metadata jsonb
timestamp timestamp
```

### `ad_snapshots` (Meta ads daily rollup)
```sql
id uuid primary key
date date
ad_spend int -- in paise
impressions int
clicks int
leads int
conversions int
cpa int -- computed
roas numeric
campaign_id text
created_at timestamp
```

---

## Delivery windows (auto-compute `deadline_at`)

| Tier | Window | Formula |
|------|--------|---------|
| Starter | 6-12 hrs | intake_at + 12 hours (promise 12, aim 6-8) |
| Launch | 24 hrs | intake_at + 24 hours |
| Pro | 24 hrs | intake_at + 24 hours |
| Signature | 48-72 hrs | intake_at + 72 hours |

---

## Routes

| Route | Purpose |
|-------|---------|
| `/admin` | Main dashboard — stats + Kanban + urgent queue |
| `/admin/projects` | All projects, filterable by tier/status/date |
| `/admin/projects/[id]` | Full project detail + event log |
| `/admin/leads` | WhatsApp lead inbox (employee-focused) |
| `/admin/ads` | Meta ad performance dashboard |
| `/admin/revenue` | Financial view — daily/weekly/monthly (owner only) |
| `/admin/settings` | User management, webhook keys |

---

## Main dashboard (`/admin`) components

### Stats strip (top)
- **Today's revenue** — sum of payments.amount WHERE captured_at = today
- **WIP projects** — count WHERE status IN (intake, building, review)
- **⚠️ Overdue** — count WHERE deadline_at < now AND status != done
- **Today's leads** — count FROM leads WHERE created_at = today
- **WhatsApp queue** — count WHERE status = new AND assigned_to IS NULL

### Kanban board (center)
5 columns: **Intake → Building → Review → Deployed → Done**

Each project card shows:
- Client name + business
- Tier badge (₹2k / ₹5k / ₹15k / ₹25k color-coded)
- **Live countdown** (auto-refreshing every second)
  - Green: >6 hrs remaining
  - Amber: 2-6 hrs
  - Red: <2 hrs or overdue
- Assignee avatar
- Quick actions: Open → Mark complete → View chat

Drag-drop between columns = update status.

### Right sidebar
- **Recent payments** (last 10)
- **WhatsApp escalations** (from AiSensy — #pro, #escalation tags)
- **Ad performance today** (spend, CPA, leads)

---

## Integrations

### Razorpay webhook → `/api/webhooks/razorpay`
On `payment.captured`:
1. Create `projects` row (status = intake, waiting for form)
2. Create `payments` row
3. Trigger Typeform send to client
4. Post event

### AiSensy webhook → `/api/webhooks/aisensy`
On message received:
1. Upsert `leads` row
2. If bot escalation tag detected, set `escalation_tag`
3. Real-time push notification to assigned user

### Typeform webhook → `/api/webhooks/typeform`
On intake submitted:
1. Find `projects` row by email/phone
2. Set `intake_at` = now, compute `deadline_at`
3. Move project to Building column
4. Post event

### Meta Ads API sync (daily cron)
Cron at midnight:
1. Fetch yesterday's ad spend + leads + conversions
2. Insert into `ad_snapshots`
3. Update dashboard ad card

---

## Real-time subscriptions

Using Supabase `supabase.channel()`:
- `projects` table changes → update Kanban live
- `leads` new row → toast notification + badge bump
- `payments` new row → toast + revenue strip refresh

---

## Access control (Clerk roles)

| Role | Can see | Can do |
|------|---------|--------|
| **Owner (you)** | Everything | Full CRUD, revenue, settings |
| **Employee** | Leads, Intake queue, WhatsApp, Projects (no revenue) | Update lead status, move intake to building, reply chat |

---

## Build plan

### Day 1 (Saturday — 6 hrs)
- Set up Supabase project + schema
- Clerk auth + role setup (owner + employee)
- `/admin` route layout + sidebar nav
- Stats strip component
- Drizzle ORM + type generation

### Day 2 (Sunday — 6 hrs)
- Kanban board with dnd-kit
- Project detail page
- Countdown logic (client-side, refreshes every sec)
- Revenue page (owner-only)

### Day 3 (Monday morning — 4 hrs)
- Razorpay webhook handler
- AiSensy webhook handler
- Typeform webhook handler
- Real-time subscriptions
- Deploy to Vercel, test end-to-end

**Total: 16 hrs → ship v1 by Monday afternoon.**

---

## Future (post-v1, M3+)

- Mobile app (PWA first)
- Daily digest email for owner ("Yesterday: 4 Starters, 1 Launch, ₹15k")
- Client-facing portal (client sees their project status, revision requests)
- Automated Lighthouse QA on every deploy (red flag if perf < 90)
- SMS notifications for overdue deliveries
- Invoice generation + GST tax reports

---

## MVP cut (what NOT to build v1)

- Mobile responsive admin (desktop-first — you'll always be at your desk)
- Dark mode (one theme only v1)
- Complex permissions beyond owner/employee
- Reports/analytics beyond stats strip + revenue table
- Client portal (clients only see Typeform + WhatsApp + deploy URL)

Ship lean, iterate on real pain.
