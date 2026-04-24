import { Target, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MONTH_GOAL, computeMonthProgress, type DailyStat } from "@/lib/mock-insights";

function formatINR(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}k`;
  return `₹${n}`;
}

export function GoalProgress({ dailyStats }: { dailyStats: DailyStat[] }) {
  const p = computeMonthProgress(dailyStats);

  return (
    <section className="rounded-lg border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-900/50 p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Target className="h-4 w-4 text-lime-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              This month · April 2026
            </span>
          </div>
          <div className="font-unbounded text-3xl font-bold text-white">
            {formatINR(p.collectedRevenue)}
            <span className="ml-3 text-base font-normal text-neutral-500">
              / {formatINR(MONTH_GOAL)}
            </span>
          </div>
          <div className="mt-1 text-xs text-neutral-500">
            Day {p.daysPassed} of {p.daysInMonth} · {p.daysRemaining} days left
          </div>
        </div>

        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold",
            p.onTrack
              ? "bg-lime-500/10 text-lime-400"
              : "bg-red-500/10 text-red-400",
          )}
        >
          {p.onTrack ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {p.onTrack ? "On track" : "Behind pace"}
        </div>
      </div>

      <div className="mb-4">
        <div className="relative h-3 overflow-hidden rounded-full bg-neutral-800">
          <div
            className="absolute left-0 top-0 h-full bg-lime-400 transition-all"
            style={{ width: `${Math.min(p.pctOfGoal, 100)}%` }}
          />
          <div
            className="absolute top-0 h-full border-r-2 border-dashed border-neutral-500"
            style={{ left: `${(p.daysPassed / p.daysInMonth) * 100}%` }}
            title={`Day ${p.daysPassed} (pace marker)`}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] text-neutral-500">
          <span>{p.pctOfGoal.toFixed(1)}% achieved</span>
          <span>Pace marker · {((p.daysPassed / p.daysInMonth) * 100).toFixed(0)}%</span>
          <span>Projected: {p.pctProjected.toFixed(1)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-neutral-800 pt-4 text-sm">
        <div>
          <div className="text-xs uppercase text-neutral-500">Avg / day</div>
          <div className="font-unbounded text-lg font-bold text-white">
            {formatINR(Math.round(p.avgDailyRevenue))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase text-neutral-500">Needed / day</div>
          <div className="font-unbounded text-lg font-bold text-white">
            {formatINR(
              Math.max(
                0,
                Math.ceil((MONTH_GOAL - p.collectedRevenue) / Math.max(p.daysRemaining, 1)),
              ),
            )}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase text-neutral-500">Projected end</div>
          <div
            className={cn(
              "font-unbounded text-lg font-bold",
              p.onTrack ? "text-lime-400" : "text-red-400",
            )}
          >
            {formatINR(Math.round(p.projectedMonthEnd))}
          </div>
        </div>
      </div>
    </section>
  );
}
