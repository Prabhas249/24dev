import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/db/schema";
import { getRemainingMs, getUrgency, formatRemaining } from "@/lib/db/tiers";

export function OverdueBanner({ projects }: { projects: Project[] }) {
  const overdue = projects.filter(
    (p) => p.status !== "done" && getUrgency(getRemainingMs(p)) === "overdue",
  );

  if (overdue.length === 0) return null;

  const first = overdue[0];
  const remaining = getRemainingMs(first);

  return (
    <div className="flex items-center gap-3 border-b border-red-500/40 bg-red-500/10 px-6 py-2.5">
      <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-400 animate-pulse" />
      <div className="flex-1 text-sm">
        <strong className="text-red-300">
          {overdue.length} project{overdue.length > 1 ? "s" : ""} overdue:
        </strong>{" "}
        <span className="text-neutral-300">
          {first.clientName} · {formatRemaining(remaining)}
          {overdue.length > 1 && ` + ${overdue.length - 1} more`}
        </span>
      </div>
      <Link
        href={`/admin/projects/${first.id}`}
        className="flex items-center gap-1 rounded-md bg-red-500/20 px-3 py-1 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/30"
      >
        Handle now
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
