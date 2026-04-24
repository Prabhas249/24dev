"use client";

import { useState, useMemo } from "react";
import { MessageSquare, CheckCircle2, XCircle, Sparkles, ExternalLink } from "lucide-react";
import { generateMockLeads, getTimeAgo, type MockLead } from "@/lib/mock-leads";
import { TIER_CONFIG } from "@/lib/db/tiers";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "new" | "escalated" | "qualified";

export function LeadsInbox() {
  const leads = useMemo(() => generateMockLeads(), []);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [selectedId, setSelectedId] = useState<string | null>(leads[0]?.id ?? null);

  const filtered = leads.filter((l) => {
    if (filter === "all") return true;
    if (filter === "new") return l.status === "new";
    if (filter === "escalated") return !!l.escalation_tag;
    if (filter === "qualified") return l.status === "qualified";
    return true;
  });

  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    escalated: leads.filter((l) => l.escalation_tag).length,
    qualified: leads.filter((l) => l.status === "qualified").length,
  };

  const selected = leads.find((l) => l.id === selectedId) ?? null;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Inbox list */}
      <div className="flex w-96 shrink-0 flex-col border-r border-neutral-800 bg-neutral-950">
        <div className="flex gap-1 border-b border-neutral-800 p-2">
          <FilterTabBtn label="All" count={counts.all} active={filter === "all"} onClick={() => setFilter("all")} />
          <FilterTabBtn label="New" count={counts.new} active={filter === "new"} onClick={() => setFilter("new")} />
          <FilterTabBtn
            label="Escalated"
            count={counts.escalated}
            active={filter === "escalated"}
            onClick={() => setFilter("escalated")}
            accent="amber"
          />
          <FilterTabBtn
            label="Qualified"
            count={counts.qualified}
            active={filter === "qualified"}
            onClick={() => setFilter("qualified")}
            accent="lime"
          />
        </div>

        <ul className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <li className="p-8 text-center text-sm text-neutral-600">No leads here.</li>
          ) : (
            filtered.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => setSelectedId(l.id)}
                  className={cn(
                    "flex w-full flex-col items-start gap-1 border-b border-neutral-900 px-4 py-3 text-left transition-colors hover:bg-neutral-900",
                    selectedId === l.id && "bg-neutral-900",
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-white">{l.name}</span>
                    <span className="shrink-0 text-[10px] text-neutral-500">
                      {getTimeAgo(l.last_message_at)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {l.escalation_tag && (
                      <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">
                        {l.escalation_tag}
                      </span>
                    )}
                    {l.tier_interest && (
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                          TIER_CONFIG[l.tier_interest].color,
                        )}
                      >
                        {TIER_CONFIG[l.tier_interest].publicPrice}
                      </span>
                    )}
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase",
                        l.status === "new" && "bg-lime-500/15 text-lime-400",
                        l.status === "qualified" && "bg-blue-500/15 text-blue-400",
                        l.status === "converted" && "bg-purple-500/15 text-purple-400",
                        l.status === "lost" && "bg-neutral-800 text-neutral-500",
                      )}
                    >
                      {l.status}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs text-neutral-400">{l.last_message}</p>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Lead detail */}
      {selected ? (
        <LeadDetail lead={selected} />
      ) : (
        <div className="flex flex-1 items-center justify-center text-sm text-neutral-600">
          Pick a lead to view the thread
        </div>
      )}
    </div>
  );
}

function FilterTabBtn({
  label,
  count,
  active,
  onClick,
  accent,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  accent?: "amber" | "lime";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
        active ? "bg-neutral-800 text-white" : "text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300",
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
          accent === "amber"
            ? "bg-amber-500/15 text-amber-400"
            : accent === "lime"
              ? "bg-lime-500/15 text-lime-400"
              : "bg-neutral-800 text-neutral-400",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function LeadDetail({ lead }: { lead: MockLead }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6 py-4">
        <div>
          <h2 className="font-semibold text-white">{lead.name}</h2>
          <p className="text-xs text-neutral-500">
            {lead.phone} · {lead.conversation_count} messages · {getTimeAgo(lead.last_message_at)}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-md border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800">
            <ExternalLink className="h-3.5 w-3.5" />
            AiSensy
          </button>
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-neutral-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Last message from lead
            </span>
          </div>
          <p className="text-sm text-neutral-200">{lead.last_message}</p>
          {lead.source_ad && (
            <p className="mt-3 text-[11px] text-neutral-500">Source ad: {lead.source_ad}</p>
          )}
        </section>

        {lead.bot_draft && (
          <section className="rounded-lg border border-lime-500/30 bg-lime-500/5 p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-lime-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
                  Claude draft reply
                </span>
                <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-[10px] text-neutral-500">
                  Mock — live W2
                </span>
              </div>
            </div>
            <p className="mb-4 text-sm text-neutral-200">{lead.bot_draft}</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded-md bg-lime-400 px-4 py-2 text-xs font-bold text-black hover:bg-lime-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Approve & send
              </button>
              <button className="rounded-md border border-neutral-700 px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800">
                Edit
              </button>
              <button className="flex items-center gap-1.5 rounded-md border border-neutral-700 px-4 py-2 text-xs text-neutral-500 hover:bg-neutral-800 hover:text-white">
                <XCircle className="h-3.5 w-3.5" />
                Reject
              </button>
            </div>
          </section>
        )}

        {!lead.bot_draft && lead.escalation_tag && (
          <section className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-400">
                No draft — {lead.escalation_tag} requires manual handling
              </span>
            </div>
            <p className="mt-2 text-xs text-neutral-400">
              Claude escalated this lead. Reply manually via AiSensy.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
