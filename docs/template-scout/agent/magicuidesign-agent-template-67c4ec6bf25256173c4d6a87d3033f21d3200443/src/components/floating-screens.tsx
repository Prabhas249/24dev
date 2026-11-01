"use client";

import { motion } from "motion/react";

type Screen = {
  url: string;
  /* Positioning — percentages relative to the section */
  top: string;
  side: "left" | "right";
  offset: string; /* distance from edge */
  width: number;
  rotate: number;
  /* Float animation timing */
  duration: number;
  delay: number;
};

/* Small editorial scatter — like BSW's flowers, but website screenshots */
const SCREENS: Screen[] = [
  { url: "linear.app",    top: "8%",  side: "left",  offset: "3%",  width: 130, rotate: -7,  duration: 9,  delay: 0 },
  { url: "vercel.com",    top: "22%", side: "right", offset: "5%",  width: 110, rotate: 6,   duration: 11, delay: 0.6 },
  { url: "cal.com",       top: "40%", side: "left",  offset: "6%",  width: 120, rotate: 4,   duration: 10, delay: 1.2 },
  { url: "resend.com",    top: "55%", side: "right", offset: "3%",  width: 140, rotate: -5,  duration: 12, delay: 0.3 },
  { url: "framer.com",    top: "72%", side: "left",  offset: "4%",  width: 115, rotate: 8,   duration: 9.5, delay: 1.6 },
  { url: "mercury.com",   top: "86%", side: "right", offset: "6%",  width: 125, rotate: -4,  duration: 10.5, delay: 0.9 },
];

function thumb(url: string, w: number) {
  return `https://image.thum.io/get/width/${w * 2}/crop/${Math.round(w * 1.25)}/noanimate/https://${url}`;
}

export function FloatingScreens() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {SCREENS.map((s) => {
        const positionStyle = s.side === "left" ? { left: s.offset } : { right: s.offset };
        return (
          <motion.div
            key={s.url}
            initial={{ opacity: 0, y: 16, rotate: s.rotate }}
            whileInView={{ opacity: 1, y: 0, rotate: s.rotate }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: s.delay * 0.3 }}
            style={{ top: s.top, width: s.width, ...positionStyle }}
            className="absolute"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: s.delay,
              }}
              style={{ rotate: `${s.rotate}deg` }}
              className="origin-center rounded-md overflow-hidden border border-[#e0e0e0] shadow-[0_8px_24px_rgba(0,0,0,0.06)] bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumb(s.url, s.width)}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="block w-full h-auto"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
