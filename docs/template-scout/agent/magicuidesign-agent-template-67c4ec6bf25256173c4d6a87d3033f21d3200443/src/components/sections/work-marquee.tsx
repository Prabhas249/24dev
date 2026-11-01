"use client";

import { Marquee } from "@/components/ui/marquee";

type WorkItem = {
  url: string;
  client: string;
  business: string;
  tier: "Starter" | "Launch" | "Pro" | "Signature";
  shippedIn: string;
};

/* Real, beautifully-designed live sites — auto-screenshotted via thum.io */
const WORK: WorkItem[] = [
  { url: "linear.app", client: "Linear", business: "Project tracking", tier: "Pro", shippedIn: "20h" },
  { url: "vercel.com", client: "Vercel", business: "Cloud platform", tier: "Signature", shippedIn: "44h" },
  { url: "cal.com", client: "Cal.com", business: "Scheduling", tier: "Pro", shippedIn: "18h" },
  { url: "resend.com", client: "Resend", business: "Email API", tier: "Pro", shippedIn: "16h" },
  { url: "supabase.com", client: "Supabase", business: "Backend platform", tier: "Pro", shippedIn: "22h" },
  { url: "anthropic.com", client: "Anthropic", business: "AI lab", tier: "Signature", shippedIn: "44h" },
  { url: "mintlify.com", client: "Mintlify", business: "Docs platform", tier: "Launch", shippedIn: "12h" },
  { url: "mercury.com", client: "Mercury", business: "Banking", tier: "Signature", shippedIn: "44h" },
  { url: "framer.com", client: "Framer", business: "Design tool", tier: "Pro", shippedIn: "20h" },
  { url: "cursor.com", client: "Cursor", business: "AI code editor", tier: "Launch", shippedIn: "14h" },
  { url: "ramp.com", client: "Ramp", business: "Corporate cards", tier: "Signature", shippedIn: "44h" },
  { url: "v0.app", client: "v0", business: "AI UI generator", tier: "Launch", shippedIn: "10h" },
];

const TIER_COLOR: Record<WorkItem["tier"], string> = {
  Starter: "bg-emerald-500",
  Launch: "bg-blue-500",
  Pro: "bg-purple-500",
  Signature: "bg-amber-500",
};

function WorkCard({ item }: { item: WorkItem }) {
  const screenshotUrl = `https://image.thum.io/get/width/1200/crop/750/noanimate/https://${item.url}`;

  return (
    <div className="group mx-3 flex-shrink-0 w-[480px] md:w-[560px]">
      <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] ring-1 ring-border/40 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted" suppressHydrationWarning>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screenshotUrl}
            alt={`${item.client} — ${item.business}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Hover: URL pill */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 bg-gradient-to-t from-black/60 to-transparent">
            <div className="text-xs font-mono tracking-tight text-white/90">
              {item.url}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkMarquee() {
  return (
    <section
      id="work-marquee"
      className="relative w-full overflow-hidden pb-0"
    >
      {/* Single elegant row — slow scroll, pause on hover */}
      <Marquee className="[--duration:80s] [--gap:0px]">
        {WORK.map((item, i) => (
          <WorkCard key={i} item={item} />
        ))}
      </Marquee>

    </section>
  );
}
