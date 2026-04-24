"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, AlertCircle, CheckCircle2 } from "lucide-react";
import type { Project } from "@/lib/db/schema";
import { TIER_CONFIG, getRemainingMs, getUrgency, formatRemaining, type Urgency } from "@/lib/db/tiers";
import { cn } from "@/lib/utils";

const URGENCY_STYLES: Record<Urgency, { dot: string; ring: string; text: string }> = {
  green: {
    dot: "bg-lime-400",
    ring: "ring-lime-500/30",
    text: "text-lime-400",
  },
  amber: {
    dot: "bg-amber-400",
    ring: "ring-amber-500/40",
    text: "text-amber-400",
  },
  red: {
    dot: "bg-red-400 animate-pulse",
    ring: "ring-red-500/50",
    text: "text-red-400",
  },
  overdue: {
    dot: "bg-red-500 animate-pulse",
    ring: "ring-red-500",
    text: "text-red-500",
  },
};

export function ProjectCard({ project, isDragOverlay = false }: { project: Project; isDragOverlay?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const tierCfg = TIER_CONFIG[project.tier];
  const [remaining, setRemaining] = useState(() => getRemainingMs(project));

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemainingMs(project)), 1000);
    return () => clearInterval(id);
  }, [project]);

  const urgency = getUrgency(remaining);
  const urgencyStyle = URGENCY_STYLES[urgency];
  const isDone = project.status === "done";
  const isBlocked = project.status === "blocked";
  const showCountdown = !isDone && project.deadlineAt;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-lg border border-neutral-800 bg-neutral-900 transition-all hover:-translate-y-0.5 hover:border-neutral-700 hover:shadow-lg",
        isDragging && "opacity-40",
        isDragOverlay && "shadow-2xl ring-2 ring-lime-500/50",
        !isDone && !isBlocked && `ring-1 ${urgencyStyle.ring}`,
        isBlocked && "border-amber-900/50",
      )}
    >
      <Link href={`/admin/projects/${project.id}`} className="block p-3 text-sm">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              tierCfg.color,
            )}
          >
            {tierCfg.publicPrice}
          </span>
        </div>

        <div className="mb-1 font-semibold text-white">{project.clientName}</div>
        <div className="mb-2 line-clamp-1 text-xs text-neutral-500">
          {project.businessName} · {project.businessType}
        </div>

        {showCountdown && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className={cn("h-1.5 w-1.5 rounded-full", urgencyStyle.dot)} />
            <span className={cn("font-mono font-medium", urgencyStyle.text)}>
              {formatRemaining(remaining)}
            </span>
          </div>
        )}

        {isBlocked && project.blockedReason && (
          <div className="mt-2 flex items-start gap-1.5 rounded border border-amber-900/40 bg-amber-950/30 px-2 py-1 text-[11px] text-amber-300">
            <AlertCircle className="mt-0.5 h-3 w-3 flex-shrink-0" />
            <span className="line-clamp-2">{project.blockedReason}</span>
          </div>
        )}

        {isDone && (
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <CheckCircle2 className="h-3.5 w-3.5 text-lime-500" />
            Delivered
          </div>
        )}
      </Link>

      <button
        {...attributes}
        {...listeners}
        onClick={(e) => e.preventDefault()}
        className="absolute right-2 top-2 cursor-grab rounded p-1 opacity-0 transition-opacity hover:bg-neutral-800 group-hover:opacity-100 active:cursor-grabbing"
        aria-label="Drag to move"
      >
        <GripVertical className="h-4 w-4 text-neutral-500" />
      </button>
    </div>
  );
}
