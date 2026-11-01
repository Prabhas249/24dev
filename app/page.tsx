import { Nav } from "@/components/atoms/Nav";
import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { LiveBuild } from "@/components/sections/LiveBuild";
import { Manifesto } from "@/components/sections/Manifesto";
import { FounderCompare } from "@/components/sections/FounderCompare";
import { Work } from "@/components/sections/Work";
import { SiteMosaic } from "@/components/sections/SiteMosaic";
import { PaymentProof } from "@/components/sections/PaymentProof";
import { Testimonials } from "@/components/sections/Testimonials";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto border-x border-line relative">
      {/* Agent-style inner vertical border lines */}
      <div className="block w-px h-full border-l border-line absolute top-0 left-6 z-10 pointer-events-none"></div>
      <div className="block w-px h-full border-r border-line absolute top-0 right-6 z-10 pointer-events-none"></div>
      <Nav />
      <main className="flex flex-col items-center justify-center divide-y divide-line min-h-screen w-full">
        <Hero />
        <LogoStrip />
        <LiveBuild />
        <Manifesto />
        <FounderCompare />
        <Work />
        <SiteMosaic />
        <PaymentProof />
        <Testimonials />
        <HowItWorks />
        <Pricing />
        <Faq />
        <FinalCta />
        <Footer />
      </main>
    </div>
  );
}
