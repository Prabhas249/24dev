import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { db, payments, projects, events } from "@/lib/db";
import { TIER_CONFIG, computeDeadline, type Tier } from "@/lib/db/tiers";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-razorpay-signature");
  const body = await req.text();

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "RAZORPAY_WEBHOOK_SECRET missing" }, { status: 500 });
  }

  // Verify signature
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  if (signature !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(body);
  const event = payload.event;
  const paymentEntity = payload.payload?.payment?.entity;

  if (event !== "payment.captured") {
    return NextResponse.json({ ok: true, ignored: event });
  }

  // Map amount → tier (Razorpay amount is in paise)
  const amount = paymentEntity.amount as number;
  const tier = resolveTierFromAmount(amount);
  const now = new Date();
  const deadline = tier ? computeDeadline(now, tier) : null;

  // Create project
  const [project] = await db
    .insert(projects)
    .values({
      clientName: paymentEntity.notes?.client_name ?? paymentEntity.email ?? "Unknown",
      clientEmail: paymentEntity.email ?? "",
      clientPhone: paymentEntity.contact ?? null,
      tier: tier ?? "starter",
      price: amount,
      intakeAt: now,
      deadlineAt: deadline,
      status: "intake",
      razorpayOrderId: paymentEntity.order_id,
      razorpayPaymentId: paymentEntity.id,
    })
    .returning();

  // Record payment
  await db.insert(payments).values({
    razorpayPaymentId: paymentEntity.id,
    projectId: project.id,
    amount,
    tier: tier ?? "starter",
    status: "captured",
    capturedAt: now,
  });

  // Audit log
  await db.insert(events).values({
    projectId: project.id,
    eventType: "payment_received",
    metadata: { razorpay_payment_id: paymentEntity.id, amount },
  });

  return NextResponse.json({ ok: true, projectId: project.id });
}

function resolveTierFromAmount(amount: number): Tier | null {
  for (const [tier, cfg] of Object.entries(TIER_CONFIG)) {
    if (cfg.price === amount) return tier as Tier;
  }
  return null;
}
