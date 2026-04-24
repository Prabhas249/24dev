import { ProjectsTable } from "@/components/admin/ProjectsTable";
import { generateMockProjects } from "@/lib/mock";

export default function ProjectsListPage() {
  const projects = generateMockProjects();

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6">
        <div>
          <h1 className="font-unbounded text-lg font-bold tracking-tight">Projects</h1>
          <p className="text-xs text-neutral-500">All projects · filter by tier, status, or search</p>
        </div>
        <div className="text-xs text-neutral-500">{projects.length} total</div>
      </header>

      <div className="p-6">
        <ProjectsTable projects={projects} />
      </div>
    </>
  );
}
