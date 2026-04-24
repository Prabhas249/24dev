/**
 * Mock analytics data for Insights page.
 * Replace with real DB aggregations once Supabase is wired.
 */

export type DailyStat = {
  date: string; // ISO YYYY-MM-DD
  revenue: number; // in rupees
  clients: number;
  adSpend: number;
  cpa: number;
};

// Last 14 days of mock data — realistic M1 ramp
export function generateDailyStats(): DailyStat[] {
  const today = new Date();
  const stats: DailyStat[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    const baseRevenue = 8000 + Math.floor(Math.random() * 15000);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const revenue = isWeekend ? Math.floor(baseRevenue * 0.65) : baseRevenue;
    const clients = Math.ceil(revenue / 3250);

    stats.push({
      date: d.toISOString().split("T")[0],
      revenue,
      clients,
      adSpend: 3000,
      cpa: 350 + Math.floor(Math.random() * 150),
    });
  }
  return stats;
}

export const MONTH_GOAL = 300000; // ₹3L target net

export function computeMonthProgress(stats: DailyStat[]) {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysPassed = now.getDate();
  const daysRemaining = daysInMonth - daysPassed;

  const thisMonthStats = stats.filter((s) => s.date.startsWith(now.toISOString().slice(0, 7)));
  const collectedRevenue = thisMonthStats.reduce((sum, s) => sum + s.revenue, 0);
  const avgDailyRevenue = thisMonthStats.length > 0
    ? collectedRevenue / thisMonthStats.length
    : 0;
  const projectedMonthEnd = collectedRevenue + avgDailyRevenue * daysRemaining;

  return {
    daysInMonth,
    daysPassed,
    daysRemaining,
    collectedRevenue,
    avgDailyRevenue,
    projectedMonthEnd,
    pctOfGoal: (collectedRevenue / MONTH_GOAL) * 100,
    pctProjected: (projectedMonthEnd / MONTH_GOAL) * 100,
    onTrack: projectedMonthEnd >= MONTH_GOAL,
  };
}

export type ClaudeSuggestion = {
  id: string;
  type: "revenue" | "ads" | "mix" | "operational" | "strategic";
  severity: "high" | "medium" | "info";
  title: string;
  body: string;
  cta?: string;
};

export const MOCK_CLAUDE_SUGGESTIONS: ClaudeSuggestion[] = [
  {
    id: "s1",
    type: "mix",
    severity: "high",
    title: "Shift mix toward Launch tier",
    body: "Starter-heavy (78% last 7 days). At current pace you'll miss ₹3L by ~₹45k. Push 2 Launch creatives harder — ROAS 3.8x vs Starter 3.1x.",
    cta: "Review ad creatives",
  },
  {
    id: "s2",
    type: "ads",
    severity: "medium",
    title: "Creative #3 fatiguing",
    body: "CPA rose from ₹380 → ₹490 over 4 days. Replace or duplicate with new hook. Testimonial reels tend to convert 28% better after week 2.",
    cta: "Draft new creative brief",
  },
  {
    id: "s3",
    type: "revenue",
    severity: "info",
    title: "You're 8% ahead of pace",
    body: "₹48k collected by day 12 vs ₹44.4k target run-rate. Hold ad spend, maintain velocity. If M2 sustains, push to ₹3.5L goal.",
  },
  {
    id: "s4",
    type: "operational",
    severity: "medium",
    title: "3 client revisions pending 48hr+",
    body: "Riteesh, Priya, Kabir — chase once, close or refund partial. Open revisions erode your NPS and tie up build slots.",
    cta: "Draft nudge messages",
  },
  {
    id: "s5",
    type: "strategic",
    severity: "info",
    title: "Spark tier ready to launch",
    body: "You have 18 shipped sites + 5 testimonials. Enough proof. Post first Spark case study to LinkedIn — organic reach, zero ad cost.",
    cta: "Draft LinkedIn post",
  },
];
