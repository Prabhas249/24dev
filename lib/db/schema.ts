import { pgTable, uuid, text, integer, timestamp, jsonb, date, numeric, pgEnum, boolean } from "drizzle-orm/pg-core";

// -------- Enums --------

export const tierEnum = pgEnum("tier", ["starter", "launch", "pro", "signature"]);
export const projectStatusEnum = pgEnum("project_status", [
  "intake",
  "building",
  "review",
  "deployed",
  "handover",
  "blocked",
  "done",
]);
export const leadStatusEnum = pgEnum("lead_status", ["new", "qualified", "lost", "converted"]);
export const paymentStatusEnum = pgEnum("payment_status", ["captured", "failed", "refunded", "pending"]);

// -------- Tables --------

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),

  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone"),
  businessName: text("business_name"),
  businessType: text("business_type"),

  tier: tierEnum("tier").notNull(),
  price: integer("price").notNull(),

  intakeAt: timestamp("intake_at", { withTimezone: true }),
  deadlineAt: timestamp("deadline_at", { withTimezone: true }),
  pausedAt: timestamp("paused_at", { withTimezone: true }),
  totalPausedMs: integer("total_paused_ms").default(0).notNull(),

  status: projectStatusEnum("status").default("intake").notNull(),
  blockedReason: text("blocked_reason"),
  assigneeId: text("assignee_id"),
  claudeSessionId: text("claude_session_id"),

  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),

  vercelDeployUrl: text("vercel_deploy_url"),
  customDomain: text("custom_domain"),

  revisionsUsed: integer("revisions_used").default(0).notNull(),
  notes: text("notes"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),

  whatsappPhone: text("whatsapp_phone").notNull(),
  whatsappName: text("whatsapp_name"),
  sourceAd: text("source_ad"),
  tierInterest: tierEnum("tier_interest"),

  status: leadStatusEnum("status").default("new").notNull(),
  escalationTag: text("escalation_tag"),
  assignedTo: text("assigned_to"),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "set null" }),

  aisensyThreadId: text("aisensy_thread_id"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  lastMessageAt: timestamp("last_message_at", { withTimezone: true }),
});

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),

  razorpayPaymentId: text("razorpay_payment_id").notNull().unique(),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "set null" }),

  amount: integer("amount").notNull(),
  tier: tierEnum("tier"),
  status: paymentStatusEnum("status").default("pending").notNull(),

  capturedAt: timestamp("captured_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),

  projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }),
  eventType: text("event_type").notNull(),
  userId: text("user_id"),
  metadata: jsonb("metadata"),

  timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow().notNull(),
});

export const adSnapshots = pgTable("ad_snapshots", {
  id: uuid("id").primaryKey().defaultRandom(),

  date: date("date").notNull(),
  campaignId: text("campaign_id"),
  creativeId: text("creative_id"),

  adSpend: integer("ad_spend").default(0).notNull(),
  impressions: integer("impressions").default(0).notNull(),
  clicks: integer("clicks").default(0).notNull(),
  leadsCount: integer("leads_count").default(0).notNull(),
  conversions: integer("conversions").default(0).notNull(),
  cpa: integer("cpa").default(0).notNull(),
  roas: numeric("roas", { precision: 5, scale: 2 }).default("0"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const claudeActions = pgTable("claude_actions", {
  id: uuid("id").primaryKey().defaultRandom(),

  actionType: text("action_type").notNull(),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "set null" }),
  leadId: uuid("lead_id").references(() => leads.id, { onDelete: "set null" }),

  inputContext: jsonb("input_context"),
  output: jsonb("output"),

  status: text("status").default("draft").notNull(),
  userDecision: text("user_decision"),
  userEditedOutput: jsonb("user_edited_output"),

  outcome: jsonb("outcome"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  decidedAt: timestamp("decided_at", { withTimezone: true }),
});

export const manualTasks = pgTable("manual_tasks", {
  id: uuid("id").primaryKey().defaultRandom(),

  description: text("description").notNull(),
  durationMs: integer("duration_ms"),
  category: text("category"),
  automationCandidate: boolean("automation_candidate").default(false).notNull(),

  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// -------- Inferred types --------

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Event = typeof events.$inferSelect;
export type AdSnapshot = typeof adSnapshots.$inferSelect;
export type ClaudeAction = typeof claudeActions.$inferSelect;
export type ManualTask = typeof manualTasks.$inferSelect;
