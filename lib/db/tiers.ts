import type { Project } from "./schema";

export const TIER_CONFIG = {
  starter: {
    price: 199900,
    label: "Starter",
    publicPrice: "₹1,999",
    slaHours: 12,
    color: "bg-lime-400 text-black",
    shortColor: "lime",
  },
  launch: {
    price: 499900,
    label: "Launch",
    publicPrice: "₹4,999",
    slaHours: 24,
    color: "bg-blue-400 text-black",
    shortColor: "blue",
  },
  pro: {
    price: 1499900,
    label: "Pro",
    publicPrice: "₹14,999",
    slaHours: 24,
    color: "bg-purple-400 text-black",
    shortColor: "purple",
  },
  signature: {
    price: 2499900,
    label: "Signature",
    publicPrice: "₹24,999",
    slaHours: 72,
    color: "bg-amber-400 text-black",
    shortColor: "amber",
  },
} as const;

export type Tier = keyof typeof TIER_CONFIG;

export function computeDeadline(intakeAt: Date, tier: Tier): Date {
  const slaHours = TIER_CONFIG[tier].slaHours;
  return new Date(intakeAt.getTime() + slaHours * 60 * 60 * 1000);
}

/**
 * Returns ms remaining until deadline, accounting for pause time.
 * Negative means overdue.
 */
export function getRemainingMs(project: Pick<Project, "deadlineAt" | "totalPausedMs" | "pausedAt" | "status">): number {
  if (!project.deadlineAt) return Infinity;

  const now = Date.now();
  const deadline = project.deadlineAt.getTime();
  const pausedBuffer = project.totalPausedMs ?? 0;

  // If currently paused (blocked or review), stop the clock
  if (project.pausedAt && (project.status === "blocked" || project.status === "review")) {
    const currentPause = now - project.pausedAt.getTime();
    return deadline - now + pausedBuffer + currentPause;
  }

  return deadline - now + pausedBuffer;
}

export type Urgency = "green" | "amber" | "red" | "overdue";

export function getUrgency(remainingMs: number): Urgency {
  if (remainingMs < 0) return "overdue";
  const hours = remainingMs / (60 * 60 * 1000);
  if (hours < 2) return "red";
  if (hours < 6) return "amber";
  return "green";
}

export function formatRemaining(remainingMs: number): string {
  if (remainingMs < 0) {
    const overdueMs = Math.abs(remainingMs);
    const h = Math.floor(overdueMs / (60 * 60 * 1000));
    const m = Math.floor((overdueMs % (60 * 60 * 1000)) / (60 * 1000));
    return `${h}h ${m}m overdue`;
  }
  const h = Math.floor(remainingMs / (60 * 60 * 1000));
  const m = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
  return `${h}h ${m}m`;
}
