import type { ReactNode } from "react";
import { Nav } from "@/components/atoms/Nav";
import { Footer } from "@/components/sections/Footer";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalLayout({
  eyebrow,
  title,
  subtitle,
  lastUpdated,
  children,
}: Props) {
  return (
    <>
      <Nav />
      <main className="bg-ink pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          {/* Eyebrow */}
          <div className="flex items-baseline justify-between border-b border-line pb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
              {eyebrow}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-dim">
              Last updated · {lastUpdated}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-14 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.88] tracking-[-0.04em] text-fog">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl font-[family-name:var(--font-accent)] italic text-[clamp(1.125rem,1.7vw,1.5rem)] leading-snug text-fog-muted">
            {subtitle}
          </p>

          {/* Content */}
          <div className="legal-body mt-14 space-y-12 md:mt-20">{children}</div>

          {/* Back to home */}
          <div className="mt-20 flex items-center justify-between border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-fog-dim">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-fog transition-colors hover:text-orange"
            >
              ← Back to 24dev
            </a>
            <span>Effective {lastUpdated}</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-[auto_1fr] md:gap-10">
      <div className="flex items-baseline gap-2 md:self-start md:pt-1">
        <span className="font-mono text-[11px] text-fog-dim shrink-0">
          {number}
        </span>
        <span
          className="hidden h-px w-4 bg-line-strong md:inline-block mt-[9px]"
          aria-hidden
        />
      </div>
      <div>
        <h2
          className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-black leading-tight tracking-[-0.03em] text-fog"
        >
          {title}
        </h2>
        <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-fog-muted">
          {children}
        </div>
      </div>
    </section>
  );
}
