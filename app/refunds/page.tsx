import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/sections/LegalLayout";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "How 24dev handles refunds. Fair, automatic, and written plainly. If we're late, 50% back.",
};

export default function RefundsPage() {
  return (
    <LegalLayout
      eyebrow="Refund Policy"
      title="Fair refunds, no fine print."
      subtitle="The rules for refunds at 24dev. Written so both sides know where we stand — before you pay, not after."
      lastUpdated="24 April 2026"
    >
      <LegalSection number="01" title="Before work starts">
        <p>
          <span className="text-fog">100% refund, no questions asked.</span>
        </p>
        <p>
          If you&apos;ve paid but we haven&apos;t started building (typically a
          window of 1–2 hours after payment), you get every rupee back.
          WhatsApp us within 2 hours of payment to cancel and we&apos;ll
          initiate the refund the same day.
        </p>
        <p className="mt-4">
          How "work has started": when we&apos;ve sent you a confirmation on
          WhatsApp that the build has begun, or when you see the first
          preview URL from us.
        </p>
      </LegalSection>

      <LegalSection number="02" title="After work has started">
        <p>
          <span className="text-fog">50% refund.</span>
        </p>
        <p>
          Once we&apos;ve started designing or writing code (typically within
          2 hours of payment), we retain 50% for work completed and refund
          the rest. You don&apos;t get the partial work — we&apos;re refunding for
          your change of mind, not selling you an incomplete site.
        </p>
        <p className="mt-4">
          If you&apos;ve blocked us from continuing (e.g., haven&apos;t
          responded for 7+ days, withheld required materials), we may treat
          the engagement as abandoned and retain the full payment. We&apos;ll
          warn you twice on WhatsApp before this.
        </p>
      </LegalSection>

      <LegalSection number="03" title="If we miss the delivery window">
        <p>
          <span className="text-fog">50% automatic refund.</span>
        </p>
        <p>
          Our brand promise is 24-hour delivery (or the tier&apos;s stated
          window). If we miss it — even by 10 minutes — we automatically
          process a 50% refund within 24 hours of missing the deadline. No
          request needed.
        </p>
        <p className="mt-4">
          The delivery clock starts when:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→</span> Payment is confirmed, AND
          </li>
          <li>
            <span className="text-fog">→</span> You&apos;ve provided all materials
            we need (copy, logo, references, domain decision).
          </li>
        </ul>
        <p className="mt-4">
          If the clock pauses because we&apos;re waiting on you, the missed
          deadline is adjusted accordingly. We&apos;ll always confirm pauses
          over WhatsApp so there&apos;s no dispute.
        </p>
        <p className="mt-4">
          Even with a 50% refund, you still get the completed website. We
          don&apos;t take it back — the refund is our accountability, not a
          trade.
        </p>
      </LegalSection>

      <LegalSection number="04" title="After delivery">
        <p>
          <span className="text-fog">No refund, but you still have revisions.</span>
        </p>
        <p>
          Once we&apos;ve delivered the final website (you&apos;ve got the
          live URL and it matches the scope), the engagement is complete. You
          can&apos;t refund the build, but:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→</span> Your tier&apos;s revisions are
            available for 14 days post-delivery.
          </li>
          <li>
            <span className="text-fog">→</span> Additional revisions can be
            purchased at ₹999 each.
          </li>
          <li>
            <span className="text-fog">→</span> Bugs or broken functionality that
            we caused are fixed free within 14 days (not refunded — fixed).
          </li>
        </ul>
        <p className="mt-4">
          If the delivered site doesn&apos;t match what was agreed during
          briefing, contact us. We&apos;ll either fix it within the revision
          window at no charge, or if the mismatch is severe, negotiate a
          goodwill refund.
        </p>
      </LegalSection>

      <LegalSection number="05" title="What's not refundable">
        <p>
          Certain items, once delivered, aren&apos;t eligible for refund:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→</span> Extra revisions already completed
            (₹999 each).
          </li>
          <li>
            <span className="text-fog">→</span> Copywriting add-ons already
            delivered.
          </li>
          <li>
            <span className="text-fog">→</span> Third-party costs we advance on
            your behalf (domain purchases, paid fonts, stock imagery).
          </li>
          <li>
            <span className="text-fog">→</span> Completed projects, including
            those delivered late with the 50% auto-refund already issued.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="06" title="How refunds are processed">
        <p>
          Refunds go back the way payment came in, via Razorpay:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→ UPI:</span> 1–3 business days.
          </li>
          <li>
            <span className="text-fog">→ Card:</span> 5–7 business days
            (depends on your bank).
          </li>
          <li>
            <span className="text-fog">→ Netbanking:</span> 3–5 business days.
          </li>
        </ul>
        <p className="mt-4">
          You&apos;ll get an email from Razorpay when the refund is initiated
          and when it reflects in your account. We&apos;ll update you over
          WhatsApp if there&apos;s any delay.
        </p>
        <p className="mt-4">
          Refund amounts are net of Razorpay&apos;s payment processing fee
          (~2%) in cases of before-work cancellation — this is a Razorpay
          rule, not ours. In late-delivery refunds, we absorb this fee.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Disputes">
        <p>
          If something&apos;s not right, talk to us first. WhatsApp resolves
          99% of concerns within a day. If we can&apos;t agree, see our{" "}
          <a href="/terms" className="text-orange hover:underline">
            Terms of Service
          </a>{" "}
          for dispute resolution — Bangalore courts, Indian law.
        </p>
      </LegalSection>

      <LegalSection number="08" title="Contact">
        <p>To request a refund or ask about this policy:</p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→ WhatsApp (fastest):</span>{" "}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange hover:underline"
            >
              +91 99999 99999
            </a>
          </li>
          <li>
            <span className="text-fog">→ Email:</span>{" "}
            <a href="mailto:hi@24dev.in" className="text-orange hover:underline">
              hi@24dev.in
            </a>
          </li>
        </ul>
        <p className="mt-4">
          We respond within 4 working hours on WhatsApp and within 24 hours
          over email.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
