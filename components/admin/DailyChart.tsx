import { cn } from "@/lib/utils";
import type { DailyStat } from "@/lib/mock-insights";

function formatShortDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function formatINR(n: number): string {
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}k`;
  return `₹${n}`;
}

export function DailyChart({ stats }: { stats: DailyStat[] }) {
  const max = Math.max(...stats.map((s) => s.revenue), 1);

  const totalRevenue = stats.reduce((sum, s) => sum + s.revenue, 0);
  const avgDaily = totalRevenue / stats.length;
  const totalClients = stats.reduce((sum, s) => sum + s.clients, 0);
  const avgCpa = Math.round(
    stats.reduce((sum, s) => sum + s.cpa, 0) / stats.length,
  );

  return (
    <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Last 14 days
          </h3>
          <p className="mt-0.5 text-xs text-neutral-500">
            Daily revenue — weekends typically dip
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5 text-right">
          <div>
            <div className="text-[10px] uppercase text-neutral-500">Avg / day</div>
            <div className="font-unbounded text-sm font-bold text-white">
              {formatINR(Math.round(avgDaily))}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-neutral-500">Clients</div>
            <div className="font-unbounded text-sm font-bold text-white">
              {totalClients}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-neutral-500">Avg CPA</div>
            <div
              className={cn(
                "font-unbounded text-sm font-bold",
                avgCpa < 400 ? "text-lime-400" : avgCpa < 500 ? "text-amber-400" : "text-red-400",
              )}
            >
              ₹{avgCpa}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-1.5" style={{ height: "180px" }}>
        {stats.map((s) => {
          const h = (s.revenue / max) * 100;
          const date = new Date(s.date);
          const isToday = s.date === new Date().toISOString().split("T")[0];
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;

          return (
            <div
              key={s.date}
              className="group relative flex flex-1 flex-col items-center justify-end"
            >
              <div
                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-[11px] opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
              >
                <div className="font-semibold text-white">{formatINR(s.revenue)}</div>
                <div className="text-neutral-500">
                  {s.clients} client{s.clients !== 1 ? "s" : ""} · CPA ₹{s.cpa}
                </div>
              </div>
              <div
                className={cn(
                  "w-full rounded-t transition-colors",
                  isToday
                    ? "bg-lime-400"
                    : isWeekend
                      ? "bg-neutral-700 group-hover:bg-neutral-600"
                      : "bg-lime-500/60 group-hover:bg-lime-500",
                )}
                style={{ height: `${h}%`, minHeight: "4px" }}
              />
              <div className="mt-1.5 text-[9px] text-neutral-600">
                {formatShortDate(s.date).split(" ")[0]}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
