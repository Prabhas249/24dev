import type { Metadata } from "next";
import { Unbounded, Instrument_Serif, DM_Serif_Display, Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-price",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "24dev — Designed. Built. Live. In 24 hours.",
    template: "%s · 24dev",
  },
  description:
    "Beautifully crafted websites, designed, built, and shipped in 24 hours. No calls, no back-and-forth. Fixed price from ₹1,999.",
  metadataBase: new URL("https://24dev.in"),
  openGraph: {
    title: "24dev — Designed. Built. Live. In 24 hours.",
    description:
      "Beautifully crafted websites in 24 hours. Fixed price from ₹1,999.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${unbounded.variable} ${instrumentSerif.variable} ${dmSerif.variable} ${geist.variable} ${geistMono.variable} antialiased`}
      >
        <head>
          <link rel="preconnect" href="https://image.thum.io" />
          <link rel="dns-prefetch" href="https://image.thum.io" />
        </head>
        <body className="grain min-h-screen bg-ink text-fog">
          <ScrollProgressBar />
          <LenisProvider>{children}</LenisProvider>
          <Toaster position="bottom-right" theme="light" />
        </body>
      </html>
    </ClerkProvider>
  );
}
