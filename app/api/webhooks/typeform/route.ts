import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { db, projects, events } from "@/lib/db";
import { computeDeadline, type Tier } from "@/lib/db/tiers";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("typeform-signature");
  const body = await req.text();

  const secret = process.env.TYPEFORM_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "TYPEFORM_WEBHOOK_SECRET missing" }, { status: 500 });
  }

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const computed =
    "sha256=" + crypto.createHmac("sha256", secret).update(body).digest("base64");
  if (signature !== computed) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(body) as TypeformPayload;
  const formResponse = payload.form_response;
  const answers = formResponse?.answers ?? [];

  // Extract known fields (customize field refs to match your Typeform)
  const email = findAnswer(answers, "email")?.email;
  const phone = findAnswer(answers, "phone_number")?.phone_number;
  const businessName = findAnswer(answers, "business_name")?.text;
  const businessType = findAnswer(answers, "business_type")?.choice?.label;
  const notes = findAnswer(answers, "additional_notes")?.text;

  if (!email) {
    return NextResponse.json({ error: "No email in form" }, { status: 400 });
  }

  // Match to existing project by email
  const existing = await db.select().from(projects).where(eq(projects.clientEmail, email)).limit(1);
  if (!existing.length) {
    return NextResponse.json({ error: "No project found for this email — payment first" }, { status: 404 });
  }

  const project = existing[0];
  const now = new Date();
  const tier = project.tier as Tier;
  const newDeadline = computeDeadline(now, tier);

  await db
    .update(projects)
    .set({
      clientPhone: phone ?? project.clientPhone,
      businessName: businessName ?? project.businessName,
      businessType: businessType ?? project.businessType,
      notes: notes ?? project.notes,
      intakeAt: now,
      deadlineAt: newDeadline,
      status: "building",
      updatedAt: now,
    })
    .where(eq(projects.id, project.id));

  await db.insert(events).values({
    projectId: project.id,
    eventType: "intake_submitted",
    metadata: { typeform_response_id: formResponse?.token },
  });

  return NextResponse.json({ ok: true, projectId: project.id });
}

type TypeformAnswer = {
  field?: { ref?: string };
  email?: string;
  phone_number?: string;
  text?: string;
  choice?: { label?: string };
};

type TypeformPayload = {
  form_response?: {
    token?: string;
    answers?: TypeformAnswer[];
  };
};

function findAnswer(answers: TypeformAnswer[], fieldRef: string): TypeformAnswer | undefined {
  return answers.find((a) => a.field?.ref === fieldRef);
}
