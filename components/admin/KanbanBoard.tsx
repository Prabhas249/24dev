"use client";

import { useState, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { toast } from "sonner";
import type { Project } from "@/lib/db/schema";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

type ProjectStatus = Project["status"];

const EMPTY_STATES: Record<ProjectStatus, string> = {
  intake: "No new intakes — pixel's still warming up 🔥",
  building: "Nothing active. Go ship something.",
  review: "No reviews pending. Clear desk.",
  blocked: "Nothing blocked. Clean pipeline.",
  deployed: "No deploys yet today.",
  handover: "No handovers pending.",
  done: "Shipped today: 0. Go win one.",
};

function emptyStateFor(status: ProjectStatus): string {
  return EMPTY_STATES[status] ?? "Empty";
}

const COLUMNS: {
  id: ProjectStatus;
  label: string;
  helper: string;
  accent?: string;
}[] = [
  { id: "intake", label: "Intake", helper: "Awaiting brief" },
  { id: "building", label: "Building", helper: "Under construction" },
  { id: "review", label: "Review", helper: "Client approval pending" },
  { id: "blocked", label: "Blocked", helper: "Timer paused", accent: "amber" },
  { id: "deployed", label: "Deployed", helper: "Live, handover pending" },
  { id: "done", label: "Done", helper: "Completed" },
];

export function KanbanBoard({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const grouped = useMemo(() => {
    const map = new Map<ProjectStatus, Project[]>();
    for (const col of COLUMNS) map.set(col.id, []);
    for (const p of projects) {
      const bucket = map.get(p.status) ?? [];
      bucket.push(p);
      map.set(p.status, bucket);
    }
    return map;
  }, [projects]);

  const activeProject = projects.find((p) => p.id === activeId) ?? null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function resolveTargetColumn(overId: string, curr: Project[]): ProjectStatus | null {
    // Case 1: dropped onto a column header/empty area
    if (COLUMNS.some((c) => c.id === overId)) return overId as ProjectStatus;
    // Case 2: dropped onto another card — inherit that card's column
    const overProject = curr.find((p) => p.id === overId);
    if (overProject) return overProject.status;
    return null;
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    setProjects((curr) => {
      const target = resolveTargetColumn(overIdStr, curr);
      if (!target) return curr;

      const activeItem = curr.find((p) => p.id === activeIdStr);
      if (!activeItem) return curr;
      if (activeItem.status === target) return curr;
      return curr.map((p) =>
        p.id === activeIdStr ? { ...p, status: target } : p,
      );
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active } = event;
    if (!active) return;

    const moved = projects.find((p) => p.id === active.id);
    if (moved) {
      toast.success(`Moved ${moved.clientName} → ${moved.status}`, {
        description: "Will sync once DB is wired",
      });
    }
  }

  return (
    <div className="flex gap-3 overflow-x-auto p-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {COLUMNS.map((col) => {
          const items = grouped.get(col.id) ?? [];
          return (
            <KanbanColumn
              key={col.id}
              id={col.id}
              label={col.label}
              helper={col.helper}
              accent={col.accent}
              items={items}
            />
          );
        })}

        <DragOverlay>
          {activeProject ? <ProjectCard project={activeProject} isDragOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function KanbanColumn({
  id,
  label,
  helper,
  accent,
  items,
}: {
  id: ProjectStatus;
  label: string;
  helper: string;
  accent?: string;
  items: Project[];
}) {
  const { setNodeRef, isOver } = useSortable({ id, data: { type: "column" } });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex w-72 shrink-0 flex-col rounded-lg border border-neutral-800 bg-neutral-950/50",
        isOver && "ring-2 ring-lime-500/40",
      )}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 py-3">
        <div>
          <div
            className={cn(
              "text-xs font-bold uppercase tracking-wider",
              accent === "amber" ? "text-amber-400" : "text-neutral-300",
            )}
          >
            {label}
          </div>
          <div className="text-[11px] text-neutral-500">{helper}</div>
        </div>
        <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs font-bold text-neutral-400">
          {items.length}
        </span>
      </div>

      <SortableContext items={items.map((p) => p.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-1 flex-col gap-2 p-3">
          {items.length === 0 ? (
            <div className="rounded border border-dashed border-neutral-800 p-6 text-center text-xs text-neutral-600">
              {emptyStateFor(id)}
            </div>
          ) : (
            items.map((project) => <ProjectCard key={project.id} project={project} />)
          )}
        </div>
      </SortableContext>
    </div>
  );
}
