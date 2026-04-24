"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { Project } from "@/lib/db/schema";
import { TIER_CONFIG, getRemainingMs, getUrgency, formatRemaining } from "@/lib/db/tiers";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | Project["status"];
type TierFilter = "all" | Project["tier"];

const STATUS_LABELS: Record<Project["status"], string> = {
  intake: "Intake",
  building: "Building",
  review: "Review",
  blocked: "Blocked",
  deployed: "Deployed",
  handover: "Handover",
  done: "Done",
};

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    return projects.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (tierFilter !== "all" && p.tier !== tierFilter) return false;
      if (s) {
        const hay = `${p.clientName} ${p.businessName ?? ""} ${p.clientEmail}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  }, [projects, search, statusFilter, tierFilter]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="search"
            placeholder="Search by client, business, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-neutral-800 bg-neutral-900 py-2 pl-10 pr-10 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-600"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              aria-label="Clear"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value as TierFilter)}
          className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white outline-none"
        >
          <option value="all">All tiers</option>
          {Object.entries(TIER_CONFIG).map(([key, cfg]) => (
            <option key={key} value={key}>
              {cfg.label} · {cfg.publicPrice}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white outline-none"
        >
          <option value="all">All status</option>
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-lg border border-neutral-800 bg-neutral-900">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-800 text-left text-[10px] uppercase tracking-wider text-neutral-500">
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Business</th>
              <th className="px-4 py-3 font-medium">Tier</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Deadline</th>
              <th className="px-4 py-3 text-right font-medium">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm text-neutral-600">
                  No projects match these filters.
                </td>
              </tr>
            ) : (
              filtered.map((p) => <ProjectRow key={p.id} project={p} />)
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-xs text-neutral-500">
        Showing {filtered.length} of {projects.length} projects
      </div>
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const tierCfg = TIER_CONFIG[project.tier];
  const remaining = getRemainingMs(project);
  const urgency = getUrgency(remaining);
  const isDone = project.status === "done";

  const urgencyDot =
    urgency === "overdue"
      ? "bg-red-500"
      : urgency === "red"
        ? "bg-red-400"
        : urgency === "amber"
          ? "bg-amber-400"
          : "bg-lime-400";

  return (
    <tr className="border-b border-neutral-800/50 text-sm last:border-0 hover:bg-neutral-800/30">
      <td className="px-4 py-3">
        <Link
          href={`/admin/projects/${project.id}`}
          className="font-medium text-white hover:text-lime-400"
        >
          {project.clientName}
        </Link>
        <div className="text-[11px] text-neutral-500">{project.clientEmail}</div>
      </td>
      <td className="px-4 py-3">
        <div className="text-neutral-300">{project.businessName ?? "—"}</div>
        <div className="text-[11px] text-neutral-500">{project.businessType ?? ""}</div>
      </td>
      <td className="px-4 py-3">
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            tierCfg.color,
          )}
        >
          {tierCfg.publicPrice}
        </span>
      </td>
      <td className="px-4 py-3 capitalize text-neutral-300">{project.status}</td>
      <td className="px-4 py-3 font-mono text-xs">
        {isDone ? (
          <span className="text-neutral-500">Done</span>
        ) : (
          <span className="flex items-center gap-1.5">
            <span className={cn("h-1.5 w-1.5 rounded-full", urgencyDot)} />
            <span
              className={cn(
                "font-medium",
                urgency === "overdue" || urgency === "red"
                  ? "text-red-400"
                  : urgency === "amber"
                    ? "text-amber-400"
                    : "text-lime-400",
              )}
            >
              {formatRemaining(remaining)}
            </span>
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        <span className="font-mono font-bold text-white">
          ₹{(project.price / 100).toLocaleString("en-IN")}
        </span>
      </td>
    </tr>
  );
}
