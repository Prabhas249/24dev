import { AdsPerformance } from "@/components/admin/AdsPerformance";

export default function AdsPage() {
  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6">
        <div>
          <h1 className="font-unbounded text-lg font-bold tracking-tight">Ads</h1>
          <p className="text-xs text-neutral-500">
            Creative performance · fatigue detection · attribution
          </p>
        </div>
        <div className="text-xs text-amber-400">⚠️ Mock data — live via Meta API W3</div>
      </header>
      <div className="p-6">
        <AdsPerformance />
      </div>
    </>
  );
}
