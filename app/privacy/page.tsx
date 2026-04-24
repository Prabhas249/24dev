import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/sections/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How 24dev collects, uses, and protects your personal data. Compliant with India's DPDP Act 2023.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Privacy Policy"
      title="Your data, in plain English."
      subtitle="We collect the minimum we need to ship your website and keep you informed. Nothing else. No selling, no tracking for ad networks."
      lastUpdated="24 April 2026"
    >
      <LegalSection number="01" title="What we collect">
        <p>
          When you engage 24dev, we collect only what's necessary to deliver
          the service. Specifically:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→ Contact details:</span> your name, WhatsApp
            number, and email address (provided during the initial chat or at
            checkout).
          </li>
          <li>
            <span className="text-fog">→ Project materials:</span> any copy, logo,
            brand assets, reference sites, or content you share with us to
            build the project.
          </li>
          <li>
            <span className="text-fog">→ Payment details:</span> processed entirely
            by Razorpay. We never see or store your card number, UPI ID, or
            banking credentials. We receive only the payment confirmation and
            your GST information (if you provide it).
          </li>
          <li>
            <span className="text-fog">→ WhatsApp conversation:</span> messages
            exchanged with us during briefing and delivery, used solely to
            scope and deliver your project.
          </li>
          <li>
            <span className="text-fog">→ Analytics:</span> anonymous traffic data
            (page views, country, device) via Vercel Analytics. No personal
            identifiers are collected.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="02" title="How we use it">
        <p>
          We use your data strictly for:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→</span> Scoping, building, and delivering
            your website.
          </li>
          <li>
            <span className="text-fog">→</span> Communicating with you over
            WhatsApp, email, or both, about the project.
          </li>
          <li>
            <span className="text-fog">→</span> Issuing GST-compliant invoices via
            Razorpay.
          </li>
          <li>
            <span className="text-fog">→</span> Meeting legal obligations under
            Indian law (including tax and accounting records).
          </li>
        </ul>
        <p className="mt-4">
          <span className="text-fog">We do not sell your data.</span> We do not
          use it for advertising, training AI models, or profiling. Your
          project materials stay yours.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Who we share it with">
        <p>
          Only the service providers we need to run 24dev:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→ Razorpay</span> — to process payments and
            generate invoices.
          </li>
          <li>
            <span className="text-fog">→ Vercel</span> — to host your website.
          </li>
          <li>
            <span className="text-fog">→ WhatsApp (Meta)</span> — for messaging
            you, per their own privacy terms.
          </li>
          <li>
            <span className="text-fog">→ GitHub</span> — we host your code
            repository and hand you ownership at delivery.
          </li>
        </ul>
        <p className="mt-4">
          We may disclose data if compelled by Indian law, court order, or to
          protect our rights. We'll tell you first unless legally prohibited.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Data retention">
        <p>
          We keep your data only as long as we need it:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→ Project files:</span> retained for 12
            months after delivery (for support, revisions, or your requests).
          </li>
          <li>
            <span className="text-fog">→ Invoices and tax records:</span> retained
            for 7 years, as required by Indian tax law.
          </li>
          <li>
            <span className="text-fog">→ WhatsApp history:</span> stored in our
            business inbox. You can request deletion anytime.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="05" title="Your rights">
        <p>
          Under India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act),
          you have the right to:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→ Access</span> your personal data we hold.
          </li>
          <li>
            <span className="text-fog">→ Correct</span> inaccurate or outdated
            information.
          </li>
          <li>
            <span className="text-fog">→ Erasure</span> of data (except where we&apos;re
            legally required to retain it).
          </li>
          <li>
            <span className="text-fog">→ Withdraw consent</span> for any optional
            processing.
          </li>
          <li>
            <span className="text-fog">→ Complain</span> to the Data Protection
            Board of India.
          </li>
        </ul>
        <p className="mt-4">
          To exercise any of these rights, WhatsApp or email us. We respond
          within 7 days.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Cookies & tracking">
        <p>
          24dev uses minimal cookies and storage:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→ Essential:</span> for navigation and
            session state on the site.
          </li>
          <li>
            <span className="text-fog">→ Analytics:</span> Vercel Analytics (no
            third-party sharing, no ad networks).
          </li>
        </ul>
        <p className="mt-4">
          We don&apos;t use Facebook Pixel, Google Analytics, or any advertising
          tracker. Your visit is your business.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Security">
        <p>
          We take reasonable technical measures to protect your data:
        </p>
        <ul className="mt-3 space-y-2 list-none pl-0">
          <li>
            <span className="text-fog">→</span> All payments processed over HTTPS
            via Razorpay (PCI-DSS compliant).
          </li>
          <li>
            <span className="text-fog">→</span> Project files stored in
            access-controlled cloud storage.
          </li>
          <li>
            <span className="text-fog">→</span> Credentials handed to you on
            delivery (you own everything).
          </li>
        </ul>
        <p className="mt-4">
          No internet transmission is 100% secure, but we act with reasonable
          care per Section 43A of the IT Act, 2000.
        </p>
      </LegalSection>

      <LegalSection number="08" title="Changes to this policy">
        <p>
          We may update this policy as our practices evolve or laws change.
          We&apos;ll post the update date at the top and, for material changes,
          ping existing clients on WhatsApp.
        </p>
      </LegalSection>

      <LegalSection number="09" title="Contact">
        <p>
          Privacy questions, data requests, or concerns? Reach us at:
        </p>
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
