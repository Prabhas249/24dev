import { Navbar } from "@/components/sections/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { siteConfig } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "black",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      {/* <head>
        <Script src="https://unpkg.com/react-scan/dist/auto.global.js" />
      </head> */}

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} antialiased font-sans bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <LenisProvider>
            <div className="w-full relative">
              <Navbar />
              {children}
            </div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
