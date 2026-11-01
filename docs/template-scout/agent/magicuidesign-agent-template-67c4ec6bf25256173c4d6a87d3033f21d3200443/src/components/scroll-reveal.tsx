"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";

/**
 * Paragraph-level scroll blur reveal — mirrors buildsomethingwonderful.com.
 * Each paragraph block sharpens once as it enters view and stays sharp.
 * (No re-blur on scroll back — too disorienting for readers.)
 */

export function BlurReveal({
  children,
  className = "",
  highlight,
}: {
  children: ReactNode;
  className?: string;
  highlight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  /* One-way: blur 10px → 0, then stay sharp */
  const blurPx = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const color = useTransform(
    scrollYProgress,
    [0, 1],
    highlight ? ["#cfd2d6", "#1d7dd8"] : ["#cfd2d6", "#171717"],
  );

  return (
    <motion.div
      ref={ref}
      style={{ filter, opacity, color }}
      className={`will-change-[filter,opacity] ${className}`}
    >
      {children}
    </motion.div>
  );
}
