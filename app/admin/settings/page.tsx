import { Webhook, Zap, Users, Bell, Copy, Check, AlertCircle } from "lucide-react";

const INTEGRATIONS = [
  {
    name: "Razorpay",
    purpose: "Payment collection + webhook → auto-create projects",
    status: "connected",
    envKey: "RAZORPAY_KEY_ID",
  },
  {
    name: "Clerk",
    purpose: "Auth — you + employee sign-in",
    status: "connected",
    envKey: "CLERK_SECRET_KEY",
  },
  {
    name: "Supabase",
    purpose: "Postgres DB + real-time subscriptions",
    status: "pending",
    envKey: "DATABASE_URL",
  },
  {
    name: "AiSensy",
    purpose: "WhatsApp Business API + bot",
    status: "pending",
    envKey: "AISENSY_API_KEY",
  },
  {
    name: "Typeform",
    purpose: "Client intake form",
    status: "pending",
    envKey: "TYPEFORM_WEBHOOK_SECRET",
  },
  {
    name: "Meta Ads",
    purpose: "Creative performance + daily rollups",
    status: "pending",
    envKey: "META_ACCESS_TOKEN",
  },
  {
    name: "Claude API",
    purpose: "Co-pilot layer — drafts, briefs, alerts (W2)",
    status: "pending",
    envKey: "ANTHROPIC_API_KEY",
  },
  {
    name: "Vercel",
    purpose: "Deploy pipeline for client sites",
    status: "pending",
    envKey: "VERCEL_API_TOKEN",
  },
] as const;

const WEBHOOK_URLS = [
  { label: "Razorpay", url: "https://24dev.in/api/webhooks/razorpay" },
  { label: "Typeform", url: "https://24dev.in/api/webhooks/typeform" },
  { label: "AiSensy", url: "https://24dev.in/api/webhooks/aisensy" },
] as const;

export default function SettingsPage() {
  return (
    <>
      <header className="flex h-16 items-center border-b border-neutral-800 bg-neutral-950 px-6">
        <div>
          <h1 className="font-unbounded text-lg font-bold tracking-tight">Settings</h1>
          <p className="text-xs text-neutral-500">Integrations · webhooks · team · preferences</p>
        </div>
      </header>

      <div className="space-y-6 p-6">
        {/* Integrations grid */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-neutral-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Integrations
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {INTEGRATIONS.map((i) => (
              <div
                key={i.name}
                className="rounded-lg border border-neutral-800 bg-neutral-900 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-white">{i.name}</span>
                  {i.status === "connected" ? (
                    <span className="flex items-center gap-1 rounded-full bg-lime-500/15 px-2 py-0.5 text-[10px] font-bold text-lime-400">
                      <Check className="h-2.5 w-2.5" />
                      Live
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-neutral-800 px-2 py-0.5 text-[10px] font-bold text-neutral-500">
                      <AlertCircle className="h-2.5 w-2.5" />
                      Pending
                    </span>
                  )}
                </div>
                <p className="mb-2 text-xs text-neutral-500">{i.purpose}</p>
                <code className="text-[10px] text-neutral-600">{i.envKey}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Webhook URLs */}
        <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Webhook className="h-4 w-4 text-neutral-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Webhook endpoints
            </h2>
          </div>
          <p className="mb-4 text-xs text-neutral-500">
            Paste these into each service's webhook settings. Signature verification is automatic.
          </p>
          <ul className="space-y-2">
            {WEBHOOK_URLS.map((w) => (
              <li
                key={w.label}
                className="flex items-center justify-between gap-3 rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5"
              >
                <div>
                  <div className="text-sm font-medium text-white">{w.label}</div>
                  <code className="text-xs text-neutral-500">{w.url}</code>
                </div>
                <button
                  className="flex items-center gap-1.5 rounded-md border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
                  title="Copy URL (mock)"
                >
                  <Copy className="h-3 w-3" />
                  Copy
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Team */}
        <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-neutral-500" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Team
              </h2>
            </div>
            <button className="rounded-md bg-lime-400 px-3 py-1.5 text-xs font-bold text-black hover:bg-lime-300">
              + Invite
            </button>
          </div>
          <div className="space-y-2">
            <TeamRow name="You" email="prabhasraju1817@gmail.com" role="Owner" />
            <div className="rounded-md border border-dashed border-neutral-800 p-4 text-center text-xs text-neutral-600">
              Invite your employee to give them access to Leads + Projects (no Revenue)
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Bell className="h-4 w-4 text-neutral-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Notifications
            </h2>
          </div>
          <ul className="space-y-3 text-sm">
            <NotificationToggle label="Daily 9am brief on WhatsApp" subtitle="Yesterday's revenue, today's due, risks" />
            <NotificationToggle label="Overdue alert" subtitle="Ping when any project goes red" defaultOn />
            <NotificationToggle label="Ad creative fatigue" subtitle="When ROAS drops below 2x" defaultOn />
            <NotificationToggle label="High-intent lead" subtitle="Pro/Signature inquiries route to you directly" defaultOn />
            <NotificationToggle label="Payment received" subtitle="Every new Razorpay capture" />
          </ul>
        </section>
      </div>
    </>
  );
}

function TeamRow({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-medium text-white">{name}</div>
          <div className="text-xs text-neutral-500">{email}</div>
        </div>
      </div>
      <span className="rounded-full bg-lime-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-lime-400">
        {role}
      </span>
    </div>
  );
}

function NotificationToggle({
  label,
  subtitle,
  defaultOn,
}: {
  label: string;
  subtitle: string;
  defaultOn?: boolean;
}) {
  return (
    <li className="flex items-start justify-between gap-4">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-xs text-neutral-500">{subtitle}</div>
      </div>
      <div
        className={`mt-1 flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${defaultOn ? "bg-lime-400" : "bg-neutral-700"}`}
        role="switch"
        aria-checked={defaultOn}
      >
        <div
          className={`h-4 w-4 rounded-full bg-white transition-transform ${defaultOn ? "translate-x-4" : ""}`}
        />
      </div>
    </li>
  );
}
