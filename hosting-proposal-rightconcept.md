# Website Hosting & Deployment
### Proposal for Right Concept — prepared by 24dev
*1 August 2026*

---

## 1. What this proposes

Right Concept **owns** the hosting infrastructure. 24dev **operates** it.

- The Cloudflare account is created by, and registered to, **Right Concept**
- The GitHub organisation is owned by **Right Concept**
- 24dev is added as a **team member** — access that Right Concept grants, and can revoke at any time
- Every website, domain and deployment sits inside Right Concept's own account

**If this arrangement ends at any point,** Right Concept changes one password. Nothing moves, nothing is migrated, no site goes offline, and no data is held by anyone else. There is no lock-in by design.

This is the core of the proposal. Everything below is detail.

---

## 2. Why this came up

The websites 24dev builds are **modern framework applications** (Next.js / React), not WordPress.

This is a deliberate choice — it is why these sites load faster, score better in Google's Core Web Vitals, and rank better for local search terms.

It also means they **cannot run on standard shared hosting.** Shared hosting runs PHP. These sites need a JavaScript runtime and a build step. This is not a limitation of Hostinger — Hostinger is very good at what it is built for. It is simply a different category of hosting.

So the question is not "which host is cheaper." It is **"which host can run these sites at all."**

---

## 3. Honest cost comparison

### Hostinger (current)

| Plan | Introductory price | Notes |
|---|---|---|
| Premium | ₹139/month | Multiple websites on one plan |
| Business | ₹199/month | Adds CDN and priority support |
| Cloud Professional | ₹849/month | Up to 300 websites |

**Important and in Hostinger's favour:** one plan hosts many websites. Ten sites do **not** cost ten times as much. Renewal rates are higher than the introductory rates shown.

### Cloudflare

| Item | Cost |
|---|---|
| Pages (hosting) | **₹0** |
| Bandwidth | **₹0 — unlimited, at every tier** |
| Builds | 500/month included free |
| SSL certificates | ₹0 |
| Global CDN | ₹0 |
| DDoS protection | ₹0 (enterprise-grade) |
| Team members | ₹0 |

### For 5–10 websites

| | Hostinger | Cloudflare |
|---|---|---|
| Monthly cost | ₹199–₹849 depending on plan | **₹0** |
| Annual cost | ₹2,400–₹10,200 | **₹0** |

**Being straight about this:** the saving is real but modest — a few thousand rupees a year. **Cost is not the main reason to move.** The reasons below are.

---

## 4. The reasons that actually matter

### It can run the sites

Shared hosting cannot execute a Next.js build. On Cloudflare it runs natively. This is the deciding factor — the rest is improvement, this is capability.

### Speed

| | Hostinger | Cloudflare |
|---|---|---|
| Delivery | From one datacentre | 330+ cities worldwide, several in India |
| A Chennai visitor | Served from the origin server | Served from a nearby Indian city |

For local-search businesses — which is most of these clients — page speed directly affects Google ranking. A buyer in Coimbatore searching "SS pipe supplier" gets a faster page, and Google notices.

### Bandwidth and traffic

Cloudflare does **not meter bandwidth at any tier.** Shared hosting advertises "unlimited" bandwidth but enforces CPU and resource limits — a site that suddenly gets traffic can be throttled or suspended.

**Realistic traffic expectations for a B2B manufacturer website:**

| Scenario | Monthly visits | Hostinger | Cloudflare |
|---|---|---|---|
| Newly launched | 200 – 1,000 | Fine | Fine |
| Established, ranking locally | 2,000 – 10,000 | Fine | Fine |
| Ranking well / running ads | 20,000 – 50,000 | CPU limits may throttle | Fine |
| Viral post or campaign spike | 100,000+ | Likely suspended | Fine |

*These are industry-typical ranges for B2B manufacturer sites, offered as planning estimates — not measurements of any specific Right Concept client.*

The point is not that today's traffic is a problem. It is that **success becomes a problem** on shared hosting, and never does on Cloudflare.

### Deployment

| | Hostinger | Cloudflare |
|---|---|---|
| Publishing a change | Manual file upload via FTP | Automatic |
| Time to go live | Manual, whenever someone is free | ~60 seconds, automatic |
| Record of changes | None | Every change logged and reversible |
| Rollback if something breaks | Restore from backup | One click, instant |

### Security

Free SSL on both. Cloudflare additionally provides enterprise-grade DDoS protection and a web application firewall at no cost — the same infrastructure protecting major global platforms.

---

## 5. What Right Concept does, and what 24dev does

**Right Concept**

- Creates and owns the Cloudflare and GitHub accounts
- Owns all domains, as now
- Adds 24dev as a team member
- Can review, audit or revoke access at any time

**24dev**

- Connects domains and configures DNS
- Sets up and maintains the deployment pipeline
- Monitors uptime and resolves issues
- Manages SSL and build configuration
- Hands over full source code on project completion, as agreed

---

## 6. Content updates

These sites are **CMS-ready.** A content management system can be added so your team edits text, prices and images directly, without a developer — changes publish automatically in about a minute.

*This is available as a separate piece of work, scoped when required. It is not included in hosting.*

---

## 7. Migration

No downtime, no risk to any live site.

1. Right Concept creates the Cloudflare account and adds 24dev
2. 24dev deploys the site and provides a test URL
3. Right Concept reviews it fully
4. **Only after approval,** the domain is pointed across
5. The switch is a DNS change — the existing site stays live throughout and is only replaced once the new one is confirmed working

If anything is wrong at any stage, we stop. The current site is untouched until the final step.

---

## 8. Commercial terms

No charge for hosting management for the **first three months**, so the arrangement can be judged on results rather than promises.

After that, a small monthly maintenance retainer — scoped to the number of sites — covering uptime monitoring, deployments, SSL, and support response.

Hosting costs on Cloudflare remain **₹0** regardless.

---

## 9. Recommendation

**For any website 24dev builds: Cloudflare.** Shared hosting cannot run these applications, so this is a technical requirement rather than a preference.

**For existing WordPress websites: keep them on Hostinger.** It is well suited to them and there is no reason to move them.

The two are not in competition. They are for different types of website, and Right Concept can reasonably use both.

---

**Prepared by 24dev**

Happy to walk through any of this on a call.
