import { Plus, Sparkles, Clock, AlertTriangle } from "lucide-react";

type FrictionItem = {
  id: string;
  description: string;
  category: "client-comms" | "ops" | "qa" | "admin" | "ads";
  repeats: number;
  avgMinutes: number;
  lastDone: Date;
  automationCandidate: boolean;
  claudeSuggestion?: string;
};

const MOCK_FRICTION_LOG: FrictionItem[] = [
  {
    id: "f1",
    description: "Reply to 'when will my site be ready?' on WhatsApp",
    category: "client-comms",
    repeats: 47,
    avgMinutes: 2,
    lastDone: new Date(Date.now() - 20 * 60 * 1000),
    automationCandidate: true,
    claudeSuggestion:
      "Auto-respond with: 'Your deadline is [deadline]. Currently in [status] stage. You'll get a WhatsApp the moment it's live.' Save ~1.5 hrs/week.",
  },
  {
    id: "f2",
    description: "Draft handover email with deploy URL + login + 1-page guide",
    category: "client-comms",
    repeats: 23,
    avgMinutes: 8,
    lastDone: new Date(Date.now() - 2 * 60 * 60 * 1000),
    automationCandidate: true,
    claudeSuggestion:
      "Template the email. Claude fills [name] + [url] + [business] from project data. Save ~3 hrs/week.",
  },
  {
    id: "f3",
    description: "Run Lighthouse before shipping",
    category: "qa",
    repeats: 41,
    avgMinutes: 3,
    lastDone: new Date(Date.now() - 3 * 60 * 60 * 1000),
    automationCandidate: true,
    claudeSuggestion:
      "Trigger on Vercel deploy webhook. Fail if perf <90. Block handover until green. Save ~2 hrs/week.",
  },
  {
    id: "f4",
    description: "Check Razorpay dashboard for new payments",
    category: "admin",
    repeats: 28,
    avgMinutes: 4,
    lastDone: new Date(Date.now() - 4 * 60 * 60 * 1000),
    automationCandidate: true,
    claudeSuggestion:
      "Webhook already built. Delete this manual check — it's noise.",
  },
  {
    id: "f5",
    description: "Pause ad creative when CPA spikes",
    category: "ads",
    repeats: 12,
    avgMinutes: 3,
    lastDone: new Date(Date.now() - 12 * 60 * 60 * 1000),
    automationCandidate: true,
    claudeSuggestion:
      "Claude watches Meta API, pauses auto when CPA > 2x baseline for 4hrs. You approve each pause. Save ~40 min/week + catch issues faster.",
  },
  {
    id: "f6",
    description: "Explain tier difference to confused lead",
    category: "client-comms",
    repeats: 18,
    avgMinutes: 5,
    lastDone: new Date(Date.now() - 1 * 60 * 60 * 1000),
    automationCandidate: true,
    claudeSuggestion:
      "Bot FAQ flow in AiSensy. 90% of confusion is Starter vs Launch — bot explains clearly with pricing table.",
  },
  {
    id: "f7",
    description: "Type 'Send me your logo, brand colors, copy' to new client",
    category: "client-comms",
    repeats: 52,
    avgMinutes: 1,
    lastDone: new Date(Date.now() - 30 * 60 * 1000),
    automationCandidate: true,
    claudeSuggestion:
      "Already solved — Typeform intake covers this. Delete manual ask, just send Typeform link always.",
  },
];

const CATEGORY_COLORS = {
  "client-comms": "bg-lime-500/15 text-lime-400",
  ops: "bg-blue-500/15 text-blue-400",
  qa: "bg-purple-500/15 text-purple-400",
  admin: "bg-neutral-700 text-neutral-300",
  ads: "bg-amber-500/15 text-amber-400",
} as const;

function minsAgo(d: Date): string {
  const m = Math.floor((Date.now() - d.getTime()) / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function FrictionLogPage() {
  const totalTimePerWeek = MOCK_FRICTION_LOG.reduce(
    (sum, f) => sum + (f.repeats / 4) * f.avgMinutes,
    0,
  );
  const automationCandidates = MOCK_FRICTION_LOG.filter((f) => f.automationCandidate);

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6">
        <div>
          <h1 className="font-unbounded text-lg font-bold tracking-tight">Friction log</h1>
          <p className="text-xs text-neutral-500">
            Track every manual thing you do twice — Claude finds automation candidates
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-md bg-lime-400 px-3 py-1.5 text-xs font-bold text-black hover:bg-lime-300">
          <Plus className="h-3.5 w-3.5" />
          Log manual task
        </button>
      </header>

      <div className="space-y-5 p-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-neutral-500">
              Manual tasks tracked
            </div>
            <div className="font-unbounded text-xl font-bold text-white">
              {MOCK_FRICTION_LOG.length}
            </div>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-neutral-500">
              Weekly time spent
            </div>
            <div className="font-unbounded text-xl font-bold text-amber-400">
              {Math.round(totalTimePerWeek / 60)}h {Math.round(totalTimePerWeek % 60)}m
            </div>
          </div>
          <div className="rounded-lg border border-lime-500/30 bg-lime-500/5 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-lime-400">
              Automation candidates
            </div>
            <div className="font-unbounded text-xl font-bold text-lime-400">
              {automationCandidates.length}
            </div>
          </div>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime-400" />
          <div className="text-sm text-neutral-300">
            <strong className="text-white">How this works:</strong> Each time you do something manual twice,
            log it. Claude groups, counts, and proposes automations ranked by ROI.
            <span className="block mt-1 text-xs text-neutral-500">
              By M2 this informs your Weekend 2 automation build list. Real pain &gt; imagined pain.
            </span>
          </div>
        </div>

        {/* List */}
        <section className="rounded-lg border border-neutral-800 bg-neutral-900">
          <div className="border-b border-neutral-800 px-5 py-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Logged friction (ranked by time cost)
            </h3>
          </div>
          <ul className="divide-y divide-neutral-800">
            {MOCK_FRICTION_LOG.slice()
              .sort((a, b) => b.repeats * b.avgMinutes - a.repeats * a.avgMinutes)
              .map((f) => (
                <FrictionRow key={f.id} item={f} />
              ))}
          </ul>
        </section>
      </div>
    </>
  );
}

function FrictionRow({ item }: { item: FrictionItem }) {
  const weeklyMins = Math.round((item.repeats / 4) * item.avgMinutes);

  return (
    <li className="px-5 py-4">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${CATEGORY_COLORS[item.category]}`}>
              {item.category}
            </span>
            <span className="text-sm font-medium text-white">{item.description}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {item.repeats} times · ~{item.avgMinutes} min each · <strong className="text-neutral-400">{weeklyMins}m/week</strong>
            </span>
            <span>Last: {minsAgo(item.lastDone)}</span>
          </div>

          {item.automationCandidate && item.claudeSuggestion && (
            <div className="mt-3 flex items-start gap-2 rounded-md border border-lime-500/30 bg-lime-500/5 p-3">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-lime-400" />
              <div>
                <div className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-lime-400">
                  Claude suggestion
                </div>
                <p className="text-xs text-neutral-300">{item.claudeSuggestion}</p>
              </div>
            </div>
          )}

          {!item.automationCandidate && (
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-neutral-600">
              <AlertTriangle className="h-3 w-3" />
              Likely needs manual judgment — not a candidate
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button className="rounded-md border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800">
            Mark automated
          </button>
        </div>
      </div>
    </li>
  );
}
