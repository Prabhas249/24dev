import { IndianRupee, FolderKanban, Clock, MessagesSquare, Users } from "lucide-react";

type Stats = {
  revenueToday: number;
  activeProjects: number;
  overdueCount: number;
  leadsToday: number;
  whatsappQueue: number;
};

function formatINR(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}k`;
  return `₹${n}`;
}

export function StatsStrip({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-5 gap-3 border-b border-neutral-800 bg-neutral-950 px-6 py-4">
      <StatCard
        icon={IndianRupee}
        label="Revenue today"
        value={formatINR(stats.revenueToday)}
        accent="lime"
      />
      <StatCard
        icon={FolderKanban}
        label="Active projects"
        value={stats.activeProjects.toString()}
      />
      <StatCard
        icon={Clock}
        label="Overdue"
        value={stats.overdueCount.toString()}
        accent={stats.overdueCount > 0 ? "red" : undefined}
      />
      <StatCard
        icon={Users}
        label="Leads today"
        value={stats.leadsToday.toString()}
      />
      <StatCard
        icon={MessagesSquare}
        label="WhatsApp queue"
        value={stats.whatsappQueue.toString()}
        accent={stats.whatsappQueue > 5 ? "amber" : undefined}
      />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: "lime" | "red" | "amber";
}) {
  const accentClass =
    accent === "lime"
      ? "text-lime-400"
      : accent === "red"
        ? "text-red-400 animate-pulse"
        : accent === "amber"
          ? "text-amber-400"
          : "text-white";

  return (
    <div className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3">
      <Icon className="h-5 w-5 text-neutral-500" />
      <div className="min-w-0 flex-1">
        <div className="text-[11px] uppercase tracking-wider text-neutral-500">
          {label}
        </div>
        <div className={`font-unbounded text-xl font-bold ${accentClass}`}>
          {value}
        </div>
      </div>
    </div>
  );
}
