"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";

type TimeLeft = { hours: string; minutes: string; seconds: string };

function getTimeLeft(startTime: number): TimeLeft {
  const TOTAL_MS = 24 * 60 * 60 * 1000;
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, TOTAL_MS - elapsed);
  const hours = Math.floor(remaining / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function CountdownTimer() {
  const [startTime] = useState(() => Date.now());
  const [time, setTime] = useState<TimeLeft>(() => getTimeLeft(Date.now()));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setTime(getTimeLeft(startTime)), 1000);
    return () => clearInterval(id);
  }, [inView, startTime]);

  // Seconds progress 0→1 within the current minute (for orbital dot)
  const secondsNum = parseInt(time.seconds, 10);
  const progress = secondsNum / 60;

  return (
    <div ref={ref} className="relative flex items-center gap-4">
      {/* Orbital tick ring */}
      <div className="relative hidden sm:block h-[62px] w-[62px] shrink-0">
        {/* Outer ring with tick marks */}
        <svg
          viewBox="0 0 60 60"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          {/* Base ring */}
          <circle
            cx="30"
            cy="30"
            r="27"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-fog-dim/40"
          />
          {/* Tick marks (12 total) */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const inner = 24;
            const outer = i % 3 === 0 ? 18 : 21;
            return (
              <line
                key={i}
                x1={30 + Math.cos(angle) * inner}
                y1={30 + Math.sin(angle) * inner}
                x2={30 + Math.cos(angle) * outer}
                y2={30 + Math.sin(angle) * outer}
                stroke="currentColor"
                strokeWidth={i % 3 === 0 ? "1" : "0.5"}
                className={i % 3 === 0 ? "text-fog" : "text-fog-dim/60"}
                strokeLinecap="round"
              />
            );
          })}
          {/* Orbiting dot (sweeps with seconds) */}
          <motion.circle
            cx={30 + Math.cos((progress * 360 - 90) * (Math.PI / 180)) * 27}
            cy={30 + Math.sin((progress * 360 - 90) * (Math.PI / 180)) * 27}
            r="2"
            fill="#FF6B35"
            initial={false}
            animate={{
              cx: 30 + Math.cos((progress * 360 - 90) * (Math.PI / 180)) * 27,
              cy: 30 + Math.sin((progress * 360 - 90) * (Math.PI / 180)) * 27,
            }}
            transition={{ duration: 0.9, ease: "linear" }}
          />
        </svg>
        {/* Tiny center dot */}
        <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange" />
      </div>

      {/* Digits */}
      <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight tabular-nums flex items-baseline gap-1 text-fog">
        <TimeUnit value={time.hours} />
        <span className="text-orange">:</span>
        <TimeUnit value={time.minutes} />
        <span className="text-orange">:</span>
        <TimeUnit value={time.seconds} />
      </div>
    </div>
  );
}

function TimeUnit({ value }: { value: string }) {
  return (
    <div className="flex">
      {value.split("").map((char, i) => (
        <span key={i} className="relative inline-block w-[0.6em] text-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={`${i}-${char}`}
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {char}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </div>
  );
}
