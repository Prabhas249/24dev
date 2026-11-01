"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { id: "work", name: "Work", href: "#work" },
  { id: "pricing", name: "Pricing", href: "#pricing" },
  { id: "process", name: "Process", href: "#process" },
  { id: "faq", name: "FAQ", href: "#faq" },
];

const INITIAL_WIDTH = "76rem";
const SCROLLED_WIDTH = "880px";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 200,
      staggerChildren: 0.03,
    },
  },
  exit: { opacity: 0, y: 100, transition: { duration: 0.1 } },
};

/* Sliding pill nav menu — pill indicator follows active link */
function NavMenu({
  activeSection,
  onClick,
}: {
  activeSection: string;
  onClick: (href: string) => void;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Update pill position when active section changes
  useEffect(() => {
    const navItem = ref.current?.querySelector(
      `[data-id="${activeSection}"]`,
    ) as HTMLElement | null;
    if (navItem) {
      setLeft(navItem.offsetLeft);
      setWidth(navItem.getBoundingClientRect().width);
      setIsReady(true);
    }
  }, [activeSection]);

  return (
    <div className="hidden md:block">
      <ul
        ref={ref}
        className="relative mx-auto flex w-fit h-11 items-center justify-center"
      >
        {NAV_LINKS.map((item) => (
          <li
            key={item.id}
            data-id={item.id}
            className={cn(
              "z-10 cursor-pointer h-full flex items-center justify-center px-4 text-[14px] font-medium transition-colors duration-200 tracking-tight",
              activeSection === item.id
                ? "text-fog"
                : "text-fog-muted hover:text-fog",
            )}
          >
            <a
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onClick(item.id);
              }}
            >
              {item.name}
            </a>
          </li>
        ))}
        {isReady && (
          <motion.li
            animate={{ left, width }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute inset-y-1.5 rounded-full bg-ink-soft border border-line"
          />
        )}
      </ul>
    </div>
  );
}

export function Nav() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(NAV_LINKS[0].id);
  const [isManualScroll, setIsManualScroll] = useState(false);

  /* Track active section on scroll */
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll) return;
      const sections = NAV_LINKS.map((l) => l.id);
      let closest = sections[0];
      let minDistance = Infinity;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100);
          if (distance < minDistance) {
            minDistance = distance;
            closest = section;
          }
        }
      }
      setActiveSection(closest);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScroll]);

  /* Track scroll for pill morph */
  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => setHasScrolled(latest > 10));
    return unsub;
  }, [scrollY]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setIsManualScroll(true);
    setActiveSection(id);
    const offset = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: offset, behavior: "smooth" });
    setTimeout(() => setIsManualScroll(false), 600);
  };

  const toggleDrawer = () => setIsDrawerOpen((v) => !v);

  return (
    <header
      className={cn(
        "sticky z-50 mx-4 flex justify-center transition-all duration-300 md:mx-0",
        hasScrolled ? "top-4" : "top-3 mx-0",
      )}
    >
      <motion.div
        initial={{ width: INITIAL_WIDTH }}
        animate={{ width: hasScrolled ? SCROLLED_WIDTH : INITIAL_WIDTH }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-full transition-all duration-300 xl:px-0",
            hasScrolled
              ? "px-2 border border-line bg-ink-raised/85 backdrop-blur-lg shadow-md"
              : "shadow-none px-7 bg-transparent",
          )}
        >
          <div className="flex h-[60px] items-center justify-between p-4">
            {/* Logo */}
            <Link href="/" className="group flex items-baseline gap-0 shrink-0">
              <span className="font-[family-name:var(--font-accent)] italic text-[28px] leading-[0.85] tracking-[-0.03em] text-fog group-hover:text-orange transition-colors">
                24
              </span>
              <span className="ml-1 font-body text-[15px] font-medium tracking-tight text-fog-muted leading-none">
                /dev
              </span>
              <span className="text-orange text-[16px] leading-none">.</span>
            </Link>

            {/* Sliding pill nav — center */}
            <NavMenu activeSection={activeSection} onClick={handleNavClick} />

            {/* Right cluster */}
            <div className="flex flex-row items-center gap-1 md:gap-3 shrink-0">
              <Link
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("pricing");
                }}
                className="hidden md:flex items-center justify-center text-sm font-medium tracking-wide rounded-full bg-fog text-ink h-9 px-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.18),0_3px_3px_-1.5px_rgba(15,15,15,0.10),0_1px_1px_rgba(15,15,15,0.08)] border border-white/[0.06] transition-all ease-stripe hover:scale-[1.03] hover:shadow-md active:scale-[0.97]"
              >
                Start at ₹1,999
              </Link>

              {/* Mobile hamburger */}
              <button
                className="md:hidden border border-line size-9 rounded-full cursor-pointer flex items-center justify-center text-fog hover:bg-ink-soft transition-colors"
                onClick={toggleDrawer}
                aria-label="Open menu"
              >
                {isDrawerOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              transition={{ duration: 0.2 }}
              onClick={toggleDrawer}
            />

            <motion.div
              className="fixed inset-x-0 w-[95%] mx-auto bottom-3 bg-ink-raised border border-line p-4 rounded-2xl shadow-xl z-50"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-baseline gap-0">
                    <span className="font-[family-name:var(--font-accent)] italic text-[28px] leading-[0.85] tracking-[-0.03em] text-fog">
                      24
                    </span>
                    <span className="ml-1 font-body text-[15px] font-medium tracking-tight text-fog-muted leading-none">
                      /dev
                    </span>
                    <span className="text-orange text-[16px] leading-none">.</span>
                  </Link>
                  <button
                    onClick={toggleDrawer}
                    className="border border-line rounded-full p-2 cursor-pointer hover:bg-ink-soft transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <ul className="flex flex-col text-sm border border-line rounded-md overflow-hidden">
                  {NAV_LINKS.map((item) => (
                    <li
                      key={item.id}
                      className="border-b border-line last:border-b-0"
                    >
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.id);
                          setIsDrawerOpen(false);
                        }}
                        className={cn(
                          "block p-3 transition-colors hover:bg-ink-soft",
                          activeSection === item.id
                            ? "text-fog font-medium"
                            : "text-fog-muted",
                        )}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("pricing");
                    setIsDrawerOpen(false);
                  }}
                  className="bg-fog h-10 flex items-center justify-center text-sm font-medium tracking-wide rounded-full text-ink w-full px-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.18),0_3px_3px_-1.5px_rgba(15,15,15,0.10)] border border-white/[0.06] transition-all ease-stripe active:scale-[0.97]"
                >
                  Start at ₹1,999
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
