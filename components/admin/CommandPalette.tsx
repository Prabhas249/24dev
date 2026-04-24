"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  MessagesSquare,
  Megaphone,
  Sparkles,
  Zap,
  Settings,
  Plus,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateMockProjects } from "@/lib/mock";
import { TIER_CONFIG } from "@/lib/db/tiers";

type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  group: "Navigate" | "Projects" | "Quick actions";
  keywords?: string;
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global ⌘K / Ctrl+K
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
      setQuery("");
      setSelectedIdx(0);
    }
  }, [open]);

  const items = useMemo<CommandItem[]>(() => {
    const nav: CommandItem[] = [
      {
        id: "nav-dashboard",
        label: "Dashboard",
        hint: "Kanban pipeline",
        icon: LayoutDashboard,
        action: () => router.push("/admin"),
        group: "Navigate",
        keywords: "home kanban pipeline",
      },
      {
        id: "nav-projects",
        label: "Projects",
        hint: "Filterable table",
        icon: FolderKanban,
        action: () => router.push("/admin/projects"),
        group: "Navigate",
      },
      {
        id: "nav-leads",
        label: "Leads",
        hint: "WhatsApp inbox",
        icon: MessagesSquare,
        action: () => router.push("/admin/leads"),
        group: "Navigate",
        keywords: "whatsapp chat inbox messages",
      },
      {
        id: "nav-ads",
        label: "Ads",
        hint: "Creative performance",
        icon: Megaphone,
        action: () => router.push("/admin/ads"),
        group: "Navigate",
        keywords: "meta facebook creative roas cpa",
      },
      {
        id: "nav-insights",
        label: "Insights",
        hint: "Goals, chart, suggestions",
        icon: Sparkles,
        action: () => router.push("/admin/revenue"),
        group: "Navigate",
        keywords: "revenue goals monthly",
      },
      {
        id: "nav-friction",
        label: "Friction log",
        hint: "Automation candidates",
        icon: Zap,
        action: () => router.push("/admin/friction"),
        group: "Navigate",
        keywords: "manual tasks repetitive",
      },
      {
        id: "nav-settings",
        label: "Settings",
        hint: "Integrations, team",
        icon: Settings,
        action: () => router.push("/admin/settings"),
        group: "Navigate",
      },
    ];

    const projectItems: CommandItem[] = generateMockProjects().map((p) => ({
      id: `proj-${p.id}`,
      label: p.clientName,
      hint: `${TIER_CONFIG[p.tier].label} · ${p.businessName ?? "—"}`,
      icon: FolderKanban,
      action: () => router.push(`/admin/projects/${p.id}`),
      group: "Projects",
      keywords: `${p.businessName} ${p.businessType} ${p.clientEmail}`,
    }));

    const actions: CommandItem[] = [
      {
        id: "act-new-project",
        label: "Log manual project",
        hint: "Add intake manually",
        icon: Plus,
        action: () => console.log("Create project (stub)"),
        group: "Quick actions",
      },
      {
        id: "act-new-friction",
        label: "Log friction item",
        hint: "Track a manual task",
        icon: Plus,
        action: () => router.push("/admin/friction"),
        group: "Quick actions",
      },
      {
        id: "act-settings",
        label: "Copy Razorpay webhook URL",
        hint: "https://24dev.in/api/webhooks/razorpay",
        icon: ArrowRight,
        action: () => {
          navigator.clipboard?.writeText("https://24dev.in/api/webhooks/razorpay");
        },
        group: "Quick actions",
      },
    ];

    return [...nav, ...projectItems, ...actions];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return items;
    return items.filter((i) => {
      const hay = `${i.label} ${i.hint ?? ""} ${i.keywords ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of filtered) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return map;
  }, [filtered]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[selectedIdx];
      if (item) {
        item.action();
        setOpen(false);
      }
    }
  }

  if (!open) return null;

  let flatIdx = 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-neutral-800 px-4">
          <Search className="h-4 w-4 text-neutral-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects, navigate, or run a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent py-4 text-sm text-white placeholder-neutral-500 outline-none"
          />
          <kbd className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] text-neutral-400">
            ESC
          </kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-600">
              No matches for "{query}"
            </div>
          ) : (
            Array.from(grouped.entries()).map(([group, groupItems]) => (
              <div key={group} className="mb-3">
                <div className="mb-1 px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  {group}
                </div>
                <ul>
                  {groupItems.map((item) => {
                    const currentIdx = flatIdx++;
                    const Icon = item.icon;
                    const isSelected = currentIdx === selectedIdx;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => {
                            item.action();
                            setOpen(false);
                          }}
                          onMouseEnter={() => setSelectedIdx(currentIdx)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors",
                            isSelected ? "bg-neutral-800" : "hover:bg-neutral-900",
                          )}
                        >
                          <Icon className={cn("h-4 w-4", isSelected ? "text-lime-400" : "text-neutral-500")} />
                          <div className="flex-1 text-sm text-white">{item.label}</div>
                          {item.hint && (
                            <div className="text-xs text-neutral-500">{item.hint}</div>
                          )}
                          {isSelected && (
                            <kbd className="rounded bg-neutral-700 px-1.5 py-0.5 text-[10px] text-neutral-300">
                              ↵
                            </kbd>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-neutral-800 bg-neutral-950 px-4 py-2 text-[11px] text-neutral-500">
          <div className="flex gap-3">
            <span>
              <kbd className="rounded bg-neutral-800 px-1 py-0.5">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="rounded bg-neutral-800 px-1 py-0.5">↵</kbd> select
            </span>
            <span>
              <kbd className="rounded bg-neutral-800 px-1 py-0.5">ESC</kbd> close
            </span>
          </div>
          <span>⌘K anywhere to open</span>
        </div>
      </div>
    </div>
  );
}
