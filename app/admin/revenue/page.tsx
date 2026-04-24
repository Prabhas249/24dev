import { GoalProgress } from "@/components/admin/GoalProgress";
import { DailyChart } from "@/components/admin/DailyChart";
import { ClaudeSuggestions } from "@/components/admin/ClaudeSuggestions";
import { generateDailyStats } from "@/lib/mock-insights";

export default function RevenuePage() {
  const dailyStats = generateDailyStats();

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6">
        <div>
          <h1 className="font-unbounded text-lg font-bold tracking-tight">
            Insights
          </h1>
          <p className="text-xs text-neutral-500">
            Goals · daily pace · Claude's read on the state of things
          </p>
        </div>
        <div className="text-xs text-amber-400">
          ⚠️ Mock data — will populate from real payments + ads once wired
        </div>
      </header>

      <div className="space-y-5 p-6">
        <GoalProgress dailyStats={dailyStats} />
        <DailyChart stats={dailyStats} />
        <ClaudeSuggestions />
      </div>
    </>
  );
}
