import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, leads, type Lead } from "@/lib/db";

export const runtime = "nodejs";

/**
 * AiSensy webhook — receives new WhatsApp messages + lead events.
 * Route message content into `leads` table, tag escalations from bot.
 */
export async function POST(req: NextRequest) {
  const expectedSecret = process.env.AISENSY_WEBHOOK_SECRET;
  const providedSecret = req.headers.get("x-aisensy-signature");

  if (expectedSecret && providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = await req.json();

  const phone = payload.phone ?? payload.from;
  const name = payload.name ?? payload.contact_name;
  const sourceAd = payload.source_ad ?? payload.campaign;
  const messageText: string = payload.message ?? "";
  const threadId = payload.thread_id ?? payload.conversation_id;

  if (!phone) {
    return NextResponse.json({ error: "Missing phone" }, { status: 400 });
  }

  const now = new Date();
  const escalationTag = extractEscalationTag(messageText);

  // Upsert by phone
  const existing = await db.select().from(leads).where(eq(leads.whatsappPhone, phone)).limit(1);

  let result: Lead;
  if (existing.length) {
    const [updated] = await db
      .update(leads)
      .set({
        whatsappName: name ?? existing[0].whatsappName,
        sourceAd: sourceAd ?? existing[0].sourceAd,
        aisensyThreadId: threadId ?? existing[0].aisensyThreadId,
        escalationTag: escalationTag ?? existing[0].escalationTag,
        lastMessageAt: now,
      })
      .where(eq(leads.id, existing[0].id))
      .returning();
    result = updated;
  } else {
    const [created] = await db
      .insert(leads)
      .values({
        whatsappPhone: phone,
        whatsappName: name,
        sourceAd,
        aisensyThreadId: threadId,
        escalationTag,
        status: "new",
        lastMessageAt: now,
      })
      .returning();
    result = created;
  }

  return NextResponse.json({ ok: true, leadId: result.id });
}

function extractEscalationTag(message: string): string | null {
  const tags = ["#launch", "#pro", "#signature", "#custom-scope", "#escalation", "#unclear"];
  const lower = message.toLowerCase();
  for (const tag of tags) {
    if (lower.includes(tag)) return tag;
  }
  return null;
}
