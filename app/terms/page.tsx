import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/sections/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms under which 24dev delivers websites in 24 hours. Fixed price, clear scope, honest refunds.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Terms of Service"
      title="The deal, written plainly."
      subtitle="These are the terms under which we build your website. Written in English, not legalese. Read them once — they don't change."
      lastUpdated="24 April 2026"
    >
      <LegalSection number="01" title="What 24dev does">
        <p>
          24dev designs, builds, and deploys websites on a fixed-price,
          fixed-timeline basis. We offer three tiers on this site:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→ Starter ₹1,999:</span> single landing page,
            delivered in 6–12 hours.
          </li>
          <li>
            <span className="text-fog">→ Launch ₹4,999:</span> custom landing page,
            delivered in 24 hours.
          </li>
          <li>
            <span className="text-fog">→ Pro ₹9,999:</span> 3–5 page website,
            delivered in 24–36 hours.
          </li>
        </ul>
        <p className="mt-4">
          Larger builds (SaaS, multi-site systems, custom apps) are not
          available through this site. For those, contact us via{" "}
          <a
            href="https://24dev.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange hover:underline"
          >
            24dev.in
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="02" title="How to engage us">
        <ol className="mt-3 space-y-2 list-decimal pl-5">
          <li>
            You reach us via WhatsApp with your requirements.
          </li>
          <li>
            We confirm scope, send a written quote (matching the tier you
            picked or a custom add-on).
          </li>
          <li>
            You agree over WhatsApp (text reply counts as acceptance — we
            screenshot for records).
          </li>
          <li>
            We send a Razorpay payment link.
          </li>
          <li>
            You pay. Delivery clock starts.
          </li>
          <li>
            We build and deliver within the tier&apos;s stated window.
          </li>
        </ol>
      </LegalSection>

      <LegalSection number="03" title="Payment">
        <p>
          <span className="text-fog">100% upfront.</span> Payment is due before
          we begin work. We use Razorpay (UPI, card, netbanking, wallets).
          Prices are inclusive of applicable GST — you&apos;ll receive a
          GST-compliant invoice automatically.
        </p>
        <p className="mt-4">
          Prices on the site are in Indian Rupees (₹). For international
          clients, Razorpay also supports international cards; contact us for
          Stripe or PayPal options.
        </p>
        <p className="mt-4">
          We reserve the right to decline any project before payment. After
          payment, cancellation follows our{" "}
          <a href="/refunds" className="text-orange hover:underline">
            Refund Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="04" title="Delivery">
        <p>
          The delivery clock starts when:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→</span> Payment is confirmed, AND
          </li>
          <li>
            <span className="text-fog">→</span> You have provided all necessary
            materials (copy, logo, brand colors, reference links).
          </li>
        </ul>
        <p className="mt-4">
          If you&apos;re missing materials, we&apos;ll ask for them and pause
          the clock until received. We&apos;ll confirm the pause over WhatsApp.
        </p>
        <p className="mt-4">
          <span className="text-fog">If we miss the delivery window</span> (after
          the clock starts and materials are received), we automatically refund
          50% of your payment. See the{" "}
          <a href="/refunds" className="text-orange hover:underline">
            Refund Policy
          </a>{" "}
          for full details.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Revisions">
        <p>
          Each tier includes a fixed number of revisions:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→ Starter:</span> 1 revision round.
          </li>
          <li>
            <span className="text-fog">→ Launch:</span> 2 revision rounds.
          </li>
          <li>
            <span className="text-fog">→ Pro:</span> 3 revision rounds.
          </li>
        </ul>
        <p className="mt-4">
          A "revision round" is a set of adjustments you send in one message
          after delivery. Additional revisions are ₹999 each and delivered
          within 24 hours.
        </p>
        <p className="mt-4">
          Scope changes (adding new pages, features, or major redesign) are
          not revisions. We&apos;ll quote those separately as add-ons or a tier
          upgrade.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Ownership & IP">
        <p>
          <span className="text-fog">You own everything we deliver.</span>{" "}
          Specifically:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→</span> The full codebase (Next.js,
            React, Tailwind) via a GitHub repo transferred to you.
          </li>
          <li>
            <span className="text-fog">→</span> All design files (Figma if used).
          </li>
          <li>
            <span className="text-fog">→</span> Your domain (registered in your
            name) and Vercel hosting credentials.
          </li>
          <li>
            <span className="text-fog">→</span> All copy, images, and assets you
            provided (still yours — we don&apos;t claim rights).
          </li>
        </ul>
        <p className="mt-4">
          <span className="text-fog">We retain the right</span> to display your
          shipped website in our portfolio, case studies, and marketing
          materials. If you want to opt out, let us know on WhatsApp.
        </p>
        <p className="mt-4">
          We may use open-source components (React, Next.js, etc.) under their
          respective licenses. You accept these when using the delivered code.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Your responsibilities">
        <p>
          For us to deliver on time, you agree to:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→</span> Provide accurate project
            information (copy, logo, references) on request.
          </li>
          <li>
            <span className="text-fog">→</span> Respond to our questions within
            reasonable time (we&apos;ll wait up to 4 hours per reply during active
            build).
          </li>
          <li>
            <span className="text-fog">→</span> Only provide content you own or
            have the right to use. You&apos;re responsible for copyright or IP
            issues on supplied materials.
          </li>
          <li>
            <span className="text-fog">→</span> Not use the delivered website
            for illegal, harmful, or deceptive purposes.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="08" title="Warranties & limitation of liability">
        <p>
          We warrant that we&apos;ll build your website with reasonable skill and
          care, matching the tier you picked. The site will be functional,
          responsive, and deployable on Vercel.
        </p>
        <p className="mt-4">
          We don&apos;t warrant:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→</span> Specific business outcomes (sales,
            signups, traffic).
          </li>
          <li>
            <span className="text-fog">→</span> Compatibility with future browser
            or platform changes.
          </li>
          <li>
            <span className="text-fog">→</span> Ongoing uptime (depends on your
            hosting and domain).
          </li>
        </ul>
        <p className="mt-4">
          <span className="text-fog">Our maximum liability</span> for any claim
          is the amount you paid for the tier. We&apos;re not liable for indirect,
          incidental, or consequential damages (lost profits, business
          interruption, etc.).
        </p>
      </LegalSection>

      <LegalSection number="09" title="Termination">
        <p>
          Either party may terminate the engagement before payment with no
          obligation. After payment, termination follows the{" "}
          <a href="/refunds" className="text-orange hover:underline">
            Refund Policy
          </a>
          .
        </p>
        <p className="mt-4">
          We reserve the right to terminate and refund fully if: you&apos;re
          abusive in communication, provide fraudulent information, or ask us
          to build something illegal.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Governing law & disputes">
        <p>
          These terms are governed by the laws of India. Disputes are subject
          to the exclusive jurisdiction of the courts of Bangalore, Karnataka.
        </p>
        <p className="mt-4">
          Before any legal action, both parties will attempt good-faith
          resolution over WhatsApp or email within 30 days.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Changes to these terms">
        <p>
          We may update these terms. The version in effect when you pay is the
          one that applies to your project. Material changes will be noted at
          the top with a new "last updated" date.
        </p>
      </LegalSection>

      <LegalSection number="12" title="Contact">
        <p>Questions about these terms?</p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→ Email:</span>{" "}
            <a href="mailto:hi@24dev.in" className="text-orange hover:underline">
              hi@24dev.in
            </a>
          </li>
          <li>
            <span className="text-fog">→ WhatsApp:</span>{" "}
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
            <span className="text-fog">→ Studio:</span> Bangalore, Karnataka, India
          </li>
        </ul>
      </LegalSection>
    </LegalLayout>
  );
}
