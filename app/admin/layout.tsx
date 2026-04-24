import type { Metadata } from "next";
import { Sidebar } from "@/components/admin/Sidebar";
import { CommandPalette } from "@/components/admin/CommandPalette";

export const metadata: Metadata = {
  title: "Agency OS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
      <CommandPalette />
    </div>
  );
}
