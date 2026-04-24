"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FolderKanban,
  MessagesSquare,
  Megaphone,
  Sparkles,
  Zap,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/leads", label: "Leads", icon: MessagesSquare },
  { href: "/admin/ads", label: "Ads", icon: Megaphone },
  { href: "/admin/revenue", label: "Insights", icon: Sparkles, ownerOnly: true },
  { href: "/admin/friction", label: "Friction log", icon: Zap },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-neutral-800 bg-neutral-950">
      <div className="flex h-16 items-center justify-between border-b border-neutral-800 px-5">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <div className="absolute h-2 w-2 rounded-full bg-lime-400" />
            <div className="absolute h-2 w-2 rounded-full bg-lime-400 animate-ping opacity-60" />
          </div>
          <span className="font-unbounded text-sm font-bold tracking-wider">
            24DEV · OS
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white",
              )}
            >
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r bg-lime-400" />
              )}
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-4 border-t border-neutral-900 pt-3">
          <div className="flex items-center justify-between rounded-md px-3 py-2 text-xs text-neutral-500">
            <span>Search</span>
            <kbd className="rounded border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 text-[10px] font-mono">
              ⌘K
            </kbd>
          </div>
        </div>
      </nav>

      <div className="border-t border-neutral-800 p-4">
        <div className="flex items-center gap-3">
          <UserButton
            appearance={{
              elements: { userButtonAvatarBox: "h-8 w-8" },
            }}
          />
          <div className="text-xs text-neutral-500">
            <div className="font-medium text-neutral-300">Signed in</div>
            <div>Owner</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
