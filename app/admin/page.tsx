import { StatsStrip } from "@/components/admin/StatsStrip";
import { KanbanBoard } from "@/components/admin/KanbanBoard";
import { RightSidebar } from "@/components/admin/RightSidebar";
import { MorningBrief } from "@/components/admin/MorningBrief";
import { OverdueBanner } from "@/components/admin/OverdueBanner";
import { generateMockProjects, MOCK_STATS } from "@/lib/mock";

export default function AdminDashboard() {
  // Using mock data until Supabase is wired.
  // TODO: Replace with `await db.select().from(projects)` once DATABASE_URL is configured.
  const projects = generateMockProjects();

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6">
        <div>
          <h1 className="font-unbounded text-lg font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-neutral-500">
            Live pipeline — drag cards · ⌘K to search anywhere
          </p>
        </div>
        <div className="text-xs text-amber-400">
          ⚠️ Mock data — wire Supabase credentials to go live
        </div>
      </header>

      <OverdueBanner projects={projects} />
      <MorningBrief projects={projects} />
      <StatsStrip stats={MOCK_STATS} />

      <div className="flex">
        <div className="flex-1 overflow-x-auto">
          <KanbanBoard initialProjects={projects} />
        </div>
        <RightSidebar />
      </div>
    </>
  );
}
