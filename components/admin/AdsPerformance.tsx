import { ArrowUpRight, AlertTriangle, Pause, Play } from "lucide-react";
import { generateMockAds, computeCpa, computeRoas, computeCtr, type AdCreative } from "@/lib/mock-ads";
import { cn } from "@/lib/utils";

function formatINR(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}k`;
  return `₹${n}`;
}

function daysAgo(d: Date): string {
  const days = Math.floor((Date.now() - d.getTime()) / (24 * 60 * 60 * 1000));
  if (days === 0) return "today";
  if (days === 1) return "1 day";
  return `${days} days`;
}

export function AdsPerformance() {
  const ads = generateMockAds();

  const totalSpend = ads.reduce((sum, a) => sum + a.spend, 0);
  const totalRevenue = ads.reduce((sum, a) => sum + a.revenue, 0);
  const totalLeads = ads.reduce((sum, a) => sum + a.leads, 0);
  const totalConversions = ads.reduce((sum, a) => sum + a.conversions, 0);
  const blendedRoas = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : "0";
  const blendedCpa = totalConversions > 0 ? Math.round(totalSpend / totalConversions) : 0;

  return (
    <div className="space-y-5">
      {/* Totals row */}
      <div className="grid grid-cols-4 gap-3">
        <TotalCard label="Total spend" value={formatINR(totalSpend)} />
        <TotalCard label="Blended ROAS" value={`${blendedRoas}x`} accent="lime" />
        <TotalCard label="Blended CPA" value={`₹${blendedCpa}`} accent={blendedCpa < 500 ? "lime" : "amber"} />
        <TotalCard label="Total leads" value={totalLeads.toString()} />
      </div>

      {/* Creatives list */}
      <section className="rounded-lg border border-neutral-800 bg-neutral-900">
        <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Creatives · last 30 days</h3>
            <p className="text-xs text-neutral-500">Ranked by ROAS — fatigue flagged automatically</p>
          </div>
          <button className="rounded-md bg-lime-400 px-3 py-1.5 text-xs font-bold text-black hover:bg-lime-300">
            + New creative
          </button>
        </div>
        <ul className="divide-y divide-neutral-800">
          {ads
            .slice()
            .sort((a, b) => computeRoas(b) - computeRoas(a))
            .map((ad) => (
              <AdRow key={ad.id} ad={ad} />
            ))}
        </ul>
      </section>
    </div>
  );
}

function TotalCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "lime" | "amber" | "red";
}) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3">
      <div className="text-[11px] uppercase tracking-wider text-neutral-500">{label}</div>
      <div
        className={cn(
          "font-unbounded text-xl font-bold",
          accent === "lime" && "text-lime-400",
          accent === "amber" && "text-amber-400",
          accent === "red" && "text-red-400",
          !accent && "text-white",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function AdRow({ ad }: { ad: AdCreative }) {
  const roas = computeRoas(ad);
  const cpa = computeCpa(ad);
  const ctr = computeCtr(ad);

  const isFatigued = ad.status === "fatigued";
  const isPaused = ad.status === "paused";

  return (
    <li
      className={cn(
        "flex items-center gap-4 px-5 py-4",
        isFatigued && "bg-amber-500/5",
        isPaused && "opacity-50",
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-2xl">
        {ad.thumbnail}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-2">
          <span className="truncate font-semibold text-white">{ad.name}</span>
          <span className="rounded-full bg-neutral-800 px-1.5 py-0.5 text-[10px] uppercase text-neutral-400">
            {ad.type}
          </span>
          {isFatigued && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">
              <AlertTriangle className="h-2.5 w-2.5" />
              Fatigued
            </span>
          )}
        </div>
        <div className="text-xs text-neutral-500">
          Running {daysAgo(ad.launchedAt)} · targeting {ad.targetTier}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6 text-right">
        <Stat label="Spend" value={formatINR(ad.spend)} />
        <Stat label="CTR" value={`${ctr}%`} />
        <Stat label="Leads" value={ad.leads.toString()} />
        <Stat
          label="CPA"
          value={`₹${cpa}`}
          accent={cpa > 500 ? "amber" : cpa > 700 ? "red" : undefined}
        />
        <Stat
          label="ROAS"
          value={`${roas}x`}
          accent={roas >= 3 ? "lime" : roas >= 2 ? "amber" : "red"}
        />
      </div>

      <div className="flex gap-1">
        <button
          className="rounded p-2 text-neutral-500 hover:bg-neutral-800 hover:text-white"
          aria-label={isPaused ? "Resume" : "Pause"}
          title={isPaused ? "Resume creative" : "Pause creative"}
        >
          {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
        <button
          className="rounded p-2 text-neutral-500 hover:bg-neutral-800 hover:text-white"
          aria-label="Open in Meta"
          title="Open in Meta Ads Manager"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </li>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "lime" | "amber" | "red";
}) {
  return (
    <div>
      <div className="text-[10px] uppercase text-neutral-500">{label}</div>
      <div
        className={cn(
          "font-mono text-sm font-bold",
          accent === "lime" && "text-lime-400",
          accent === "amber" && "text-amber-400",
          accent === "red" && "text-red-400",
          !accent && "text-white",
        )}
      >
        {value}
      </div>
    </div>
  );
}
