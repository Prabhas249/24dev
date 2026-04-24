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

  return (
    <div
      ref={ref}
      className="font-mono text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight tabular-nums flex items-baseline gap-1 text-fog"
    >
      <TimeUnit value={time.hours} />
      <span className="text-orange">:</span>
      <TimeUnit value={time.minutes} />
      <span className="text-orange">:</span>
      <TimeUnit value={time.seconds} />
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
