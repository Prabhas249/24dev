"use client";

import { motion } from "motion/react";

/**
 * Hand-drawn SVG flourishes that animate in on scroll.
 * Purely decorative — add to key editorial moments for craft feel.
 */

// ─────────────────────────────────────────────────────────────
// SquiggleUnderline — under a word or phrase
// ─────────────────────────────────────────────────────────────

export function SquiggleUnderline({
  className = "",
  color = "#FF6B35",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 18"
      fill="none"
      className={className}
      aria-hidden
      preserveAspectRatio="none"
    >
      <motion.path
        d="M3 11 Q 20 2, 40 8 T 80 9 T 120 6 T 160 10 T 200 7 Q 210 6, 217 9"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// AsteriskStar — editorial asterisk mark
// ─────────────────────────────────────────────────────────────

export function AsteriskStar({
  className = "",
  size = 32,
  color = "#FF6B35",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      style={{ width: size, height: size }}
      aria-hidden
      initial={{ rotate: 0, opacity: 0 }}
      whileInView={{ rotate: 180, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 360, scale: 1.1 }}
    >
      <g transform="translate(20,20)">
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="-14"
            x2="0"
            y2="-4"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${i * 45})`}
          />
        ))}
        <circle cx="0" cy="0" r="2" fill={color} />
      </g>
    </motion.svg>
  );
}

// ─────────────────────────────────────────────────────────────
// ArrowSquiggle — hand-drawn curved arrow pointing down-right
// ─────────────────────────────────────────────────────────────

export function ArrowSquiggle({
  className = "",
  color = "#FF6B35",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      className={className}
      aria-hidden
    >
      <motion.path
        d="M10 10 Q 50 5, 55 35 Q 60 55, 85 65"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M78 58 L 85 65 L 77 72"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Signature — a handwritten-style "24dev" scribble
// ─────────────────────────────────────────────────────────────

export function Signature({
  className = "",
  color = "#0F0F0F",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 180 48"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* 2 */}
      <motion.path
        d="M8 16 Q 14 6, 24 10 Q 30 14, 26 22 Q 22 28, 10 38 L 30 38"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* 4 */}
      <motion.path
        d="M50 8 L 50 30 L 68 30 M 62 10 L 62 42"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* / dev flourish */}
      <motion.path
        d="M78 40 L 92 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* dev */}
      <motion.path
        d="M100 20 Q 106 14, 112 20 Q 112 30, 100 30 L 112 30 M 120 14 L 120 34 L 128 30 L 124 22 L 128 14 M 136 14 Q 140 28, 144 20 Q 148 28, 152 14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.0, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* dot accent */}
      <motion.circle
        cx="160"
        cy="32"
        r="2.5"
        fill="#FF6B35"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.3, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
