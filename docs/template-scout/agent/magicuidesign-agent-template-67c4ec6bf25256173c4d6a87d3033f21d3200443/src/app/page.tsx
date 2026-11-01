import { HeroSection } from "@/components/sections/hero-section";
import { BlurReveal } from "@/components/scroll-reveal";
import { FloatingScreens } from "@/components/floating-screens";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full">
      <HeroSection />
      <section className="light-zone relative w-full bg-white overflow-hidden">
        <FloatingScreens />
        <div className="relative z-10 mx-auto max-w-2xl px-6 py-28 md:py-40 flex flex-col gap-10 md:gap-14 items-center text-center">

          <BlurReveal className="text-2xl md:text-4xl leading-[1.25] tracking-[-0.01em] text-balance">
            <p>Every once in a while, you decide to stop waiting.</p>
          </BlurReveal>

          <BlurReveal className="text-2xl md:text-4xl leading-[1.25] tracking-[-0.01em] text-balance space-y-2">
            <p>Not for the perfect agency.</p>
            <p>Not for a developer to reply.</p>
            <p>Not for three more weeks of revisions.</p>
          </BlurReveal>

          <BlurReveal
            highlight
            className="text-2xl md:text-4xl leading-[1.25] tracking-[-0.01em] text-balance"
          >
            <p>You decide to simply ship.</p>
          </BlurReveal>

          <BlurReveal className="flex flex-col items-center gap-2">
            <span className="text-[11px] md:text-xs font-medium uppercase tracking-[0.25em] text-[#737373]">
              Starting at
            </span>
            <span className="text-5xl md:text-7xl tracking-tight tabular-nums text-[#FF6B35]">
              ₹1,999
            </span>
          </BlurReveal>

        </div>
      </section>
    </main>
  );
}
