import Link from "next/link";
import { MessagesSquare, IndianRupee, Megaphone, ArrowUpRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data until wired
const MOCK_ESCALATIONS = [
  { id: "e1", name: "Arjun K.", tag: "#pro", preview: "Want multi-page site with blog...", mins: 4 },
  { id: "e2", name: "Neha P.", tag: "#custom-scope", preview: "Can you add Instagram feed...", mins: 18 },
  { id: "e3", name: "Rohan M.", tag: "#escalation", preview: "My site is showing an error...", mins: 32 },
];

const MOCK_RECENT_PAYMENTS = [
  { id: "p1", name: "Vivek Menon", tier: "Starter", amount: 1999, minsAgo: 2 },
  { id: "p2", name: "Aarav Patel", tier: "Pro", amount: 14999, minsAgo: 27 },
  { id: "p3", name: "Priya Sharma", tier: "Starter", amount: 1999, minsAgo: 56 },
  { id: "p4", name: "Kabir Reddy", tier: "Starter", amount: 1999, minsAgo: 120 },
];

const MOCK_ADS = {
  spend: 3000,
  cpa: 412,
  roas: 3.4,
  leads: 31,
  creativeFatigued: "Reel #3",
};

export function RightSidebar() {
  return (
    <aside className="flex w-80 shrink-0 flex-col gap-3 border-l border-neutral-800 bg-neutral-950/50 p-4">
      <EscalationsCard />
      <PaymentsCard />
      <AdsCard />
      <DailyAgendaCard />
    </aside>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  count,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  count?: number;
  color?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className={cn("h-3.5 w-3.5", color ?? "text-neutral-500")} />
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          {title}
        </span>
      </div>
      {count !== undefined && (
        <span className="rounded-full bg-neutral-800 px-1.5 py-0.5 text-[10px] font-bold text-neutral-400">
          {count}
        </span>
      )}
    </div>
  );
}

function EscalationsCard() {
  return (
    <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <SectionHeader
        icon={MessagesSquare}
        title="WhatsApp escalations"
        count={MOCK_ESCALATIONS.length}
        color="text-lime-400"
      />
      <ul className="space-y-2">
        {MOCK_ESCALATIONS.map((e) => (
          <li key={e.id}>
            <Link
              href={`/admin/leads#${e.id}`}
              className="group block rounded-md p-2 transition-colors hover:bg-neutral-800/50"
            >
              <div className="mb-0.5 flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-white">{e.name}</span>
                <span className="text-[10px] font-mono text-neutral-500">
                  {e.mins}m ago
                </span>
              </div>
              <div className="mb-1 flex items-center gap-1.5">
                <span className="rounded-full bg-lime-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-lime-400">
                  {e.tag}
                </span>
              </div>
              <p className="line-clamp-1 text-xs text-neutral-500">{e.preview}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PaymentsCard() {
  return (
    <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <SectionHeader icon={IndianRupee} title="Recent payments" />
      <ul className="space-y-2">
        {MOCK_RECENT_PAYMENTS.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between gap-2 rounded-md p-2 text-sm"
          >
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm text-white">{p.name}</div>
              <div className="text-[10px] text-neutral-500">
                {p.tier} · {formatMinsAgo(p.minsAgo)}
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-lime-400">
              ₹{p.amount.toLocaleString("en-IN")}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AdsCard() {
  return (
    <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <SectionHeader icon={Megaphone} title="Today's ads" />
      <dl className="grid grid-cols-3 gap-2 text-center">
        <StatMini label="Spend" value={`₹${MOCK_ADS.spend.toLocaleString("en-IN")}`} />
        <StatMini label="CPA" value={`₹${MOCK_ADS.cpa}`} />
        <StatMini label="ROAS" value={`${MOCK_ADS.roas}x`} accent="lime" />
      </dl>
      <div className="mt-3 flex items-start gap-1.5 rounded border border-amber-900/40 bg-amber-950/20 px-2 py-1.5 text-[11px] text-amber-300">
        <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0" />
        <span>{MOCK_ADS.creativeFatigued} fatigue flagged — review</span>
      </div>
    </section>
  );
}

function DailyAgendaCard() {
  return (
    <section className="rounded-lg border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-900/50 p-4">
      <SectionHeader icon={ArrowUpRight} title="Today's agenda" color="text-lime-400" />
      <ul className="space-y-1.5 text-xs">
        <li className="flex gap-2 text-neutral-300">
          <span className="text-lime-400">›</span>
          <span>3 Starter builds due before 8pm</span>
        </li>
        <li className="flex gap-2 text-neutral-300">
          <span className="text-amber-400">›</span>
          <span>Riteesh Launch review — 4h to deadline</span>
        </li>
        <li className="flex gap-2 text-neutral-300">
          <span className="text-neutral-500">›</span>
          <span>11 new leads to triage (3 high-intent)</span>
        </li>
        <li className="flex gap-2 text-neutral-300">
          <span className="text-neutral-500">›</span>
          <span>Creative #3 needs refresh</span>
        </li>
      </ul>
      <p className="mt-3 text-[10px] text-neutral-600">
        Claude co-pilot arrives Weekend 2 — this list will auto-generate
      </p>
    </section>
  );
}

function StatMini({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "lime";
}) {
  return (
    <div>
      <div className="text-[10px] uppercase text-neutral-500">{label}</div>
      <div
        className={cn(
          "font-unbounded text-sm font-bold",
          accent === "lime" ? "text-lime-400" : "text-white",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function formatMinsAgo(mins: number): string {
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}
