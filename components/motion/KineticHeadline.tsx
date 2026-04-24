"use client";

import { motion } from "motion/react";

type WordConfig =
  | string
  | {
      text: string;
      italic?: boolean;
      accent?: boolean;
      serif?: boolean;
      bold?: boolean;
      priceStyle?: boolean;
    };

type Props = {
  lines: WordConfig[][];
  className?: string;
  baseDelay?: number;
  wordStagger?: number;
  lineGap?: number;
};

export function KineticHeadline({
  lines,
  className = "",
  baseDelay = 0.1,
  wordStagger = 0.08,
  lineGap = 0.12,
}: Props) {
  let wordIndex = 0;

  return (
    <h1
      className={`font-display font-black leading-[0.88] tracking-[-0.035em] text-fog ${className}`}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((word, wi) => {
            const isObject = typeof word === "object";
            const text = isObject ? word.text : word;
            const italic = isObject && word.italic;
            const accent = isObject && word.accent;
            const serif = isObject && word.serif;
            const bold = isObject && word.bold;
            const priceStyle = isObject && word.priceStyle;
            const currentDelay = baseDelay + li * lineGap + wordIndex * wordStagger;
            wordIndex += 1;

            const classes = [
              "inline-block",
              priceStyle
                ? "font-[family-name:var(--font-price)] font-normal not-italic text-[1.18em] leading-[0.85] tracking-[-0.04em]"
                : "",
              bold && !priceStyle
                ? "font-display font-black not-italic text-[1.1em] tracking-[-0.05em]"
                : "",
              serif && !bold && !priceStyle
                ? "font-[family-name:var(--font-accent)] italic font-normal"
                : "",
              italic && !serif && !bold && !priceStyle ? "italic" : "",
              accent ? "text-orange" : "",
            ]
              .filter(Boolean)
              .join(" ");

            const render = priceStyle ? renderPrice(text) : text;

            return (
              <span
                key={`${li}-${wi}`}
                className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0"
              >
                <motion.span
                  className={classes}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    delay: currentDelay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {render}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function renderPrice(text: string) {
  // Handle ₹ symbol separately so we can scale/position it
  if (text.startsWith("₹")) {
    return (
      <>
        <span className="inline-block text-[0.72em] font-[family-name:var(--font-accent)] italic align-[0.14em] tracking-[0.02em] mr-[0.04em] opacity-90">
          ₹
        </span>
        <span>{text.slice(1)}</span>
      </>
    );
  }
  return text;
}
