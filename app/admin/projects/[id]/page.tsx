import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageSquare, ExternalLink } from "lucide-react";
import { generateMockProjects } from "@/lib/mock";
import { TIER_CONFIG, formatRemaining, getRemainingMs, getUrgency } from "@/lib/db/tiers";
import { EventTimeline } from "@/components/admin/EventTimeline";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = generateMockProjects().find((p) => p.id === id);

  if (!project) notFound();

  const tierCfg = TIER_CONFIG[project.tier];
  const remaining = getRemainingMs(project);
  const urgency = getUrgency(remaining);
  const isDone = project.status === "done";

  return (
    <>
      <header className="flex h-16 items-center gap-3 border-b border-neutral-800 bg-neutral-950 px-6">
        <Link
          href="/admin"
          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="font-unbounded text-lg font-bold tracking-tight">
            {project.clientName}
          </h1>
          <p className="text-xs text-neutral-500">
            {project.businessName} · {project.businessType}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${tierCfg.color}`}
        >
          {tierCfg.label} · {tierCfg.publicPrice}
        </span>
      </header>

      <div className="grid grid-cols-3 gap-6 p-6">
        <section className="col-span-2 space-y-6">
          <Card title="Status">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="mb-1 text-xs uppercase text-neutral-500">Stage</div>
                <div className="font-medium capitalize text-white">{project.status}</div>
              </div>
              <div>
                <div className="mb-1 text-xs uppercase text-neutral-500">Deadline</div>
                <div className="font-mono font-medium text-white">
                  {isDone ? "—" : formatRemaining(remaining)}
                  {!isDone && (
                    <span
                      className={`ml-2 inline-block h-2 w-2 rounded-full ${
                        urgency === "green"
                          ? "bg-lime-400"
                          : urgency === "amber"
                            ? "bg-amber-400"
                            : "bg-red-500"
                      }`}
                    />
                  )}
                </div>
              </div>
              <div>
                <div className="mb-1 text-xs uppercase text-neutral-500">Revisions</div>
                <div className="font-medium text-white">{project.revisionsUsed} / tier</div>
              </div>
            </div>
          </Card>

          <Card title="Client contact">
            <dl className="space-y-2 text-sm">
              <Row label="Name">{project.clientName}</Row>
              <Row label="Email">{project.clientEmail}</Row>
              <Row label="Phone">{project.clientPhone ?? "—"}</Row>
              <Row label="Business">{project.businessName ?? "—"}</Row>
            </dl>
            <div className="mt-4 flex gap-2">
              <button className="flex items-center gap-1.5 rounded-md bg-lime-400 px-3 py-1.5 text-xs font-bold text-black hover:bg-lime-300">
                <MessageSquare className="h-3.5 w-3.5" />
                Open WhatsApp
              </button>
              {project.vercelDeployUrl && (
                <a
                  href={project.vercelDeployUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-md border border-neutral-700 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View site
                </a>
              )}
            </div>
          </Card>

          <Card title="Event log">
            <EventTimeline project={project} />
          </Card>
        </section>

        <aside className="space-y-6">
          <Card title="Payment">
            <dl className="space-y-2 text-sm">
              <Row label="Razorpay ID">
                <code className="text-xs">{project.razorpayPaymentId ?? "—"}</code>
              </Row>
              <Row label="Amount">{tierCfg.publicPrice}</Row>
              <Row label="Status">Captured</Row>
            </dl>
          </Card>

          <Card title="Claude session">
            <dl className="space-y-2 text-sm">
              <Row label="Session">
                <code className="text-xs">{project.claudeSessionId ?? "—"}</code>
              </Row>
              <Row label="Assignee">{project.assigneeId ?? "—"}</Row>
            </dl>
          </Card>

          {project.notes && (
            <Card title="Notes">
              <p className="text-sm text-neutral-300">{project.notes}</p>
            </Card>
          )}
        </aside>
      </div>
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="text-right text-white">{children}</dd>
    </div>
  );
}
