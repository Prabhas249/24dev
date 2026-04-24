export type AdCreative = {
  id: string;
  name: string;
  type: "reel" | "carousel" | "static" | "testimonial";
  launchedAt: Date;
  thumbnail: string; // emoji placeholder
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
  revenue: number;
  status: "active" | "paused" | "fatigued";
  targetTier: "starter" | "launch" | "pro" | "signature" | "mixed";
};

const now = Date.now();
const DAY = 24 * 60 * 60 * 1000;

export function generateMockAds(): AdCreative[] {
  return [
    {
      id: "c1",
      name: "Speed demo — 15s Reel",
      type: "reel",
      launchedAt: new Date(now - 22 * DAY),
      thumbnail: "⚡",
      spend: 18500,
      impressions: 420000,
      clicks: 8900,
      leads: 51,
      conversions: 38,
      revenue: 98000,
      status: "active",
      targetTier: "starter",
    },
    {
      id: "c2",
      name: "Before/After carousel",
      type: "carousel",
      launchedAt: new Date(now - 18 * DAY),
      thumbnail: "🎨",
      spend: 14200,
      impressions: 280000,
      clicks: 6100,
      leads: 34,
      conversions: 24,
      revenue: 120000,
      status: "active",
      targetTier: "launch",
    },
    {
      id: "c3",
      name: "Testimonial — Vivek raw iPhone",
      type: "testimonial",
      launchedAt: new Date(now - 10 * DAY),
      thumbnail: "📱",
      spend: 11800,
      impressions: 195000,
      clicks: 4800,
      leads: 28,
      conversions: 21,
      revenue: 84000,
      status: "fatigued",
      targetTier: "mixed",
    },
    {
      id: "c4",
      name: "₹4,999 hook — static",
      type: "static",
      launchedAt: new Date(now - 8 * DAY),
      thumbnail: "💰",
      spend: 9500,
      impressions: 160000,
      clicks: 3200,
      leads: 19,
      conversions: 11,
      revenue: 55000,
      status: "active",
      targetTier: "launch",
    },
    {
      id: "c5",
      name: "Still waiting on dev? — pain",
      type: "reel",
      launchedAt: new Date(now - 5 * DAY),
      thumbnail: "😤",
      spend: 6200,
      impressions: 98000,
      clicks: 2100,
      leads: 14,
      conversions: 9,
      revenue: 34000,
      status: "active",
      targetTier: "starter",
    },
    {
      id: "c6",
      name: "Founder's day in life",
      type: "reel",
      launchedAt: new Date(now - 2 * DAY),
      thumbnail: "🎥",
      spend: 1800,
      impressions: 22000,
      clicks: 380,
      leads: 4,
      conversions: 1,
      revenue: 14999,
      status: "active",
      targetTier: "pro",
    },
  ];
}

export function computeCpa(c: AdCreative): number {
  return c.conversions > 0 ? Math.round(c.spend / c.conversions) : 0;
}

export function computeRoas(c: AdCreative): number {
  return c.spend > 0 ? Number((c.revenue / c.spend).toFixed(2)) : 0;
}

export function computeCtr(c: AdCreative): number {
  return c.impressions > 0 ? Number(((c.clicks / c.impressions) * 100).toFixed(2)) : 0;
}
