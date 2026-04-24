import { Sparkles, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/db/schema";
import { getRemainingMs, getUrgency } from "@/lib/db/tiers";

export function MorningBrief({ projects }: { projects: Project[] }) {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 4 ? "Still up"
      : hour < 12 ? "Good morning"
      : hour < 17 ? "Good afternoon"
      : hour < 21 ? "Good evening"
      : "Late night";

  const activeCount = projects.filter(
    (p) => p.status !== "done" && p.status !== "handover",
  ).length;

  const atRisk = projects.filter((p) => {
    if (p.status === "done" || p.status === "blocked") return false;
    const ms = getRemainingMs(p);
    const urgency = getUrgency(ms);
    return urgency === "red" || urgency === "amber" || urgency === "overdue";
  });

  const overdueCount = projects.filter((p) => {
    if (p.status === "done") return false;
    return getUrgency(getRemainingMs(p)) === "overdue";
  }).length;

  return (
    <section className="border-b border-neutral-800 bg-gradient-to-r from-lime-500/5 via-neutral-950 to-neutral-950 px-6 py-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-lime-400/20">
          <Sparkles className="h-4 w-4 text-lime-400" />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400">
              Claude brief · {now.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })}
            </span>
            <span className="rounded-full bg-neutral-800 px-1.5 py-0.5 text-[9px] text-neutral-500">
              mock · live W2
            </span>
          </div>
          <p className="text-sm text-neutral-200">
            <strong>{greeting}, Prabhas.</strong>{" "}
            {overdueCount > 0 ? (
              <>
                <span className="text-red-400">{overdueCount} project overdue</span> —
                handle first.{" "}
              </>
            ) : null}
            {atRisk.length > 0 ? (
              <>
                {atRisk.length - overdueCount} at risk in next 6h (
                {atRisk
                  .filter((p) => getUrgency(getRemainingMs(p)) !== "overdue")
                  .slice(0, 2)
                  .map((p) => p.clientName)
                  .join(", ")}
                ).{" "}
              </>
            ) : null}
            {activeCount} active builds. Yesterday shipped 4, today on track for 5. Ad
            creative #3 fatigue flagged — review when you have 10 min.
          </p>
          <div className="mt-3 flex gap-2">
            <button className="flex items-center gap-1 rounded-md bg-lime-400 px-3 py-1.5 text-xs font-bold text-black hover:bg-lime-300">
              Open at-risk projects
              <ArrowRight className="h-3 w-3" />
            </button>
            <button className="rounded-md border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800">
              Full brief
            </button>
            <button className="ml-auto rounded-md px-2 py-1.5 text-xs text-neutral-500 hover:text-white">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
