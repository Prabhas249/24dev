import { LeadsInbox } from "@/components/admin/LeadsInbox";

export default function LeadsPage() {
  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6">
        <div>
          <h1 className="font-unbounded text-lg font-bold tracking-tight">Leads</h1>
          <p className="text-xs text-neutral-500">
            WhatsApp inbox · Claude drafts replies · you approve & send
          </p>
        </div>
        <div className="text-xs text-amber-400">⚠️ Mock data — live via AiSensy W2</div>
      </header>

      <LeadsInbox />
    </>
  );
}
