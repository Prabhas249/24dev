"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

type PreviewItem = {
  url: string;
  title: string;
  accent: string;
};

export function HoverPreview({
  item,
  visible,
}: {
  item: PreviewItem | null;
  visible: boolean;
}) {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { damping: 28, stiffness: 200, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 200, mass: 0.4 });

  useEffect(() => {
    if (!visible) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handle = (e: MouseEvent) => {
      // offset card to the right + above cursor
      x.set(e.clientX + 28);
      y.set(e.clientY - 160);
    };

    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [visible, x, y]);

  return (
    <AnimatePresence>
      {visible && item && (
        <motion.div
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
          exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed top-0 left-0 z-[400] hidden md:block"
        >
          <div className="w-[480px] overflow-hidden rounded-xl border border-line-strong bg-ink-raised shadow-[0_60px_160px_-30px_rgba(0,0,0,0.95)]">
            {/* chrome */}
            <div className="flex items-center gap-2 border-b border-line bg-ink-soft px-3 py-2">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-[#FF5F56]" />
                <div className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
                <div className="h-2 w-2 rounded-full bg-[#27C93F]" />
              </div>
              <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-md border border-line bg-ink px-2 py-0.5">
                <span className="inline-block h-1 w-1 rounded-full" style={{ backgroundColor: item.accent }} />
                <span className="truncate font-mono text-[10px] text-fog-muted">{item.url}</span>
              </div>
            </div>
            <div className="relative aspect-[16/10] bg-[#050505]">
              <img
                src={`https://image.thum.io/get/width/720/crop/450/allowJPG/wait/2/https://${item.url}`}
                alt={item.url}
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
