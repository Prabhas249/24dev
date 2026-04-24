import {
  IndianRupee,
  FileText,
  Hammer,
  Eye,
  CheckCircle2,
  MessageSquare,
  AlertTriangle,
  Rocket,
  Sparkles,
} from "lucide-react";
import type { Project } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

type MockEvent = {
  id: string;
  type:
    | "payment_received"
    | "intake_submitted"
    | "build_started"
    | "review_requested"
    | "deployed"
    | "handover_sent"
    | "client_message"
    | "blocked"
    | "claude_action";
  title: string;
  body?: string;
  actor?: string;
  timestamp: Date;
};

function generateMockEvents(project: Project): MockEvent[] {
  const base = project.createdAt?.getTime() ?? Date.now();
  const HOUR = 60 * 60 * 1000;

  const events: MockEvent[] = [
    {
      id: "e1",
      type: "payment_received",
      title: "Payment received",
      body: `₹${(project.price / 100).toLocaleString("en-IN")} via Razorpay · ${project.razorpayPaymentId}`,
      actor: "Razorpay webhook",
      timestamp: new Date(base),
    },
    {
      id: "e2",
      type: "intake_submitted",
      title: "Intake form submitted",
      body: `Business type: ${project.businessType ?? "—"} · Deadline clock started`,
      actor: "Client",
      timestamp: new Date(base + 15 * 60 * 1000),
    },
    {
      id: "e3",
      type: "claude_action",
      title: "Claude drafted project plan",
      body: "5 sections proposed · design language: minimal + warm · awaiting founder review",
      actor: "Claude co-pilot",
      timestamp: new Date(base + 20 * 60 * 1000),
    },
    {
      id: "e4",
      type: "build_started",
      title: "Build started",
      body: `Claude session spawned · working from snippet library`,
      actor: "You",
      timestamp: new Date(base + 25 * 60 * 1000),
    },
  ];

  if (project.status === "review" || project.status === "deployed" || project.status === "done") {
    events.push({
      id: "e5",
      type: "review_requested",
      title: "Preview deployed · client notified",
      body: project.vercelDeployUrl ?? "Preview link sent via WhatsApp",
      actor: "Vercel + AiSensy",
      timestamp: new Date(base + 2 * HOUR),
    });
  }

  if (project.status === "blocked") {
    events.push({
      id: "e6",
      type: "blocked",
      title: "Blocked",
      body: project.blockedReason ?? "Waiting on client",
      actor: "You",
      timestamp: new Date(base + 1.5 * HOUR),
    });
  }

  if (project.status === "deployed" || project.status === "done") {
    events.push({
      id: "e7",
      type: "deployed",
      title: "Deployed to client's Vercel",
      body: "Lighthouse: 98 perf · 100 a11y · 100 SEO",
      actor: "Vercel deploy",
      timestamp: new Date(base + 3 * HOUR),
    });
  }

  if (project.status === "done") {
    events.push({
      id: "e8",
      type: "handover_sent",
      title: "Handover message sent",
      body: "Client acknowledged · project marked Done",
      actor: "You",
      timestamp: new Date(base + 4 * HOUR),
    });
  }

  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

const ICON_MAP = {
  payment_received: { icon: IndianRupee, color: "text-lime-400 bg-lime-500/15" },
  intake_submitted: { icon: FileText, color: "text-blue-400 bg-blue-500/15" },
  build_started: { icon: Hammer, color: "text-purple-400 bg-purple-500/15" },
  review_requested: { icon: Eye, color: "text-amber-400 bg-amber-500/15" },
  deployed: { icon: Rocket, color: "text-lime-400 bg-lime-500/15" },
  handover_sent: { icon: CheckCircle2, color: "text-lime-400 bg-lime-500/15" },
  client_message: { icon: MessageSquare, color: "text-neutral-300 bg-neutral-800" },
  blocked: { icon: AlertTriangle, color: "text-amber-400 bg-amber-500/15" },
  claude_action: { icon: Sparkles, color: "text-lime-400 bg-lime-500/15" },
} as const;

function timeAgo(d: Date): string {
  const mins = Math.floor((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function EventTimeline({ project }: { project: Project }) {
  const events = generateMockEvents(project);

  return (
    <ul className="space-y-4">
      {events.map((event, idx) => {
        const { icon: Icon, color } = ICON_MAP[event.type];
        const isLast = idx === events.length - 1;

        return (
          <li key={event.id} className="relative flex gap-3">
            {!isLast && (
              <div className="absolute left-3.5 top-8 bottom-0 w-px bg-neutral-800" />
            )}
            <div
              className={cn(
                "relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full",
                color,
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1 pb-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-semibold text-white">{event.title}</span>
                <span className="shrink-0 font-mono text-[11px] text-neutral-500">
                  {timeAgo(event.timestamp)}
                </span>
              </div>
              {event.body && (
                <p className="mt-0.5 text-xs text-neutral-400">{event.body}</p>
              )}
              {event.actor && (
                <p className="mt-0.5 text-[10px] text-neutral-600">via {event.actor}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
