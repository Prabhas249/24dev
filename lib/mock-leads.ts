export type MockLead = {
  id: string;
  name: string;
  phone: string;
  tier_interest?: "starter" | "launch" | "pro" | "signature";
  status: "new" | "qualified" | "converted" | "lost";
  escalation_tag?: "#pro" | "#launch" | "#custom-scope" | "#escalation" | "#unclear" | "#signature";
  source_ad?: string;
  last_message: string;
  last_message_at: Date;
  bot_draft?: string;
  conversation_count: number;
};

const now = Date.now();
const MIN = 60 * 1000;
const HOUR = 60 * MIN;

export function generateMockLeads(): MockLead[] {
  return [
    {
      id: "l1",
      name: "Arjun K.",
      phone: "+919876543210",
      tier_interest: "pro",
      status: "new",
      escalation_tag: "#pro",
      source_ad: "Reel #1 — Speed demo",
      last_message: "Bro I need a full website with blog and case studies page too. Can you do that?",
      last_message_at: new Date(now - 4 * MIN),
      bot_draft: "Hey Arjun 🔥 yes — that's our Pro tier (₹14,999). 3-5 pages, CMS, blog. Delivered in 24h. Want the founder to reach out with scope?",
      conversation_count: 3,
    },
    {
      id: "l2",
      name: "Neha P.",
      phone: "+919812345678",
      tier_interest: "launch",
      status: "new",
      escalation_tag: "#custom-scope",
      source_ad: "Before/After carousel",
      last_message: "Can you integrate Instagram feed on the landing page?",
      last_message_at: new Date(now - 18 * MIN),
      bot_draft: "Yes, Instagram embed is included in Launch tier ₹4,999. Just share your IG handle when you fill the intake form 📱",
      conversation_count: 5,
    },
    {
      id: "l3",
      name: "Rohan M.",
      phone: "+919123456789",
      status: "converted",
      escalation_tag: "#escalation",
      last_message: "My site is showing an error when I click contact form — help!",
      last_message_at: new Date(now - 32 * MIN),
      bot_draft: undefined,
      conversation_count: 12,
    },
    {
      id: "l4",
      name: "Vikram S.",
      phone: "+919988776655",
      tier_interest: "starter",
      status: "new",
      source_ad: "Reel #2 — ₹1999 hook",
      last_message: "Kitna time lagega? Landing page chahiye for my restaurant.",
      last_message_at: new Date(now - 45 * MIN),
      bot_draft: "Same day delivery — 6-12 hours for Starter (₹1,999). Hum ghante count karte hain 🔥 Drop your restaurant name + colors + a reference site you like, I'll send Razorpay link 👇",
      conversation_count: 2,
    },
    {
      id: "l5",
      name: "Kavya R.",
      phone: "+919234567890",
      tier_interest: "starter",
      status: "qualified",
      source_ad: "Pricing static",
      last_message: "Paid on Razorpay. When do I get the form?",
      last_message_at: new Date(now - 1 * HOUR),
      bot_draft: "Just sent you the intake form 📋 Takes 2 min. Delivery clock starts when you submit. Link: [intake_form]",
      conversation_count: 4,
    },
    {
      id: "l6",
      name: "Anushka G.",
      phone: "+919111222333",
      tier_interest: "signature",
      status: "new",
      escalation_tag: "#signature",
      source_ad: "LinkedIn post",
      last_message: "We're a fintech startup, need a premium 5-page site with custom animations. Founder pls connect.",
      last_message_at: new Date(now - 2 * HOUR),
      bot_draft: undefined,
      conversation_count: 1,
    },
    {
      id: "l7",
      name: "Aditya B.",
      phone: "+919444555666",
      status: "lost",
      last_message: "Cost zyaada hai bro. Agar 1k mein ho jaaye toh bolo.",
      last_message_at: new Date(now - 4 * HOUR),
      bot_draft: "Prices locked 🙏 quality we ship at these rates is worth it. Starter at ₹1,999 is already 50% cheaper than Mumbai average — next cheapest with our design level is ₹6k+.",
      conversation_count: 2,
    },
    {
      id: "l8",
      name: "Sana T.",
      phone: "+919777888999",
      tier_interest: "launch",
      status: "new",
      source_ad: "Reel #3 — Portfolio grid",
      last_message: "Do you have examples of fitness brand sites?",
      last_message_at: new Date(now - 6 * HOUR),
      bot_draft: "Yep 💪 we shipped LeanFit and FitKraft recently. Drop you links: [portfolio_link]/fitness",
      conversation_count: 1,
    },
  ];
}

function formatMinsAgo(mins: number): string {
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 60 * 24) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / (60 * 24))}d ago`;
}

export function getTimeAgo(d: Date): string {
  const diffMins = Math.floor((Date.now() - d.getTime()) / (1000 * 60));
  return formatMinsAgo(diffMins);
}
