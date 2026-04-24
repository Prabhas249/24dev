"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

type Portfolio = {
  id: string;
  url: string;
  title: string;
  tier: string;
  accent: string;
  shipped: string;
};

const portfolios: Portfolio[] = [
  { id: "linear", url: "linear.app", title: "Purpose-built for software teams.", tier: "Signature", accent: "#5E6AD2", shipped: "17h" },
  { id: "vercel", url: "vercel.com", title: "Develop. Preview. Ship.", tier: "Spark", accent: "#FF6B35", shipped: "1d" },
  { id: "stripe", url: "stripe.com", title: "Financial infrastructure.", tier: "Signature", accent: "#635BFF", shipped: "2d" },
  { id: "framer", url: "framer.com", title: "The internet is your canvas.", tier: "Pro", accent: "#0055FF", shipped: "3d" },
  { id: "notion", url: "notion.so", title: "One workspace. Every team.", tier: "Pro", accent: "#FFFFFF", shipped: "4d" },
  { id: "arc", url: "arc.net", title: "Browse the internet faster.", tier: "Launch", accent: "#FF6EC7", shipped: "5d" },
  { id: "raycast", url: "raycast.com", title: "A better way to launch.", tier: "Launch", accent: "#FF6363", shipped: "6d" },
  { id: "supabase", url: "supabase.com", title: "Build in a weekend.", tier: "Spark", accent: "#3ECF8E", shipped: "8d" },
  { id: "resend", url: "resend.com", title: "Email for developers.", tier: "Launch", accent: "#FAFAFA", shipped: "10d" },
  { id: "cal", url: "cal.com", title: "Scheduling infrastructure.", tier: "Pro", accent: "#F472B6", shipped: "12d" },
];

const thumb = (url: string, w = 760, h = 475) =>
  `https://image.thum.io/get/width/${w}/crop/${h}/allowJPG/wait/2/https://${url}`;

const CARD_WIDTH = 380;
const CARD_HEIGHT = 276; // chrome ~36 + aspect 16:10 of 380 ≈ 237 + 3 border

type Props = { constraintsRef?: RefObject<HTMLElement | null> };

export function PortfolioDeck({ constraintsRef }: Props) {
  const localRef = useRef<HTMLDivElement>(null);
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const [minimizeCount, setMinimizeCount] = useState<Record<string, number>>({});
  const [maxId, setMaxId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const handleClose = useCallback((id: string) => {
    setClosed((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const handleMinimize = useCallback((id: string) => {
    setMinimizeCount((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const handleMaximize = useCallback((id: string) => {
    setMaxId(id);
  }, []);

  const handleRestoreAll = useCallback(() => {
    setClosed(new Set());
  }, []);

  // ESC closes modal
  useEffect(() => {
    if (!maxId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMaxId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [maxId]);

  const visible = portfolios.filter((p) => !closed.has(p.id));
  const maxPortfolio = portfolios.find((p) => p.id === maxId) || null;

  return (
    <>
      {/* DESKTOP — draggable deck */}
      <div
        ref={localRef}
        className="relative hidden h-full w-full md:block"
      >
        <AnimatePresence>
          {visible.map((p, stackIndex) => (
            <DeckCard
              key={`${p.id}-${minimizeCount[p.id] || 0}`}
              portfolio={p}
              stackIndex={stackIndex}
              stackSize={visible.length}
              resetKey={minimizeCount[p.id] || 0}
              constraintsRef={constraintsRef || localRef}
              reducedMotion={!!reducedMotion}
              onClose={handleClose}
              onMinimize={handleMinimize}
              onMaximize={handleMaximize}
            />
          ))}
        </AnimatePresence>

        {closed.size > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleRestoreAll}
            className="absolute bottom-4 right-4 z-[300] cursor-pointer rounded-full border border-line-strong bg-ink-soft/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fog-muted backdrop-blur transition-colors hover:border-fog-dim hover:text-fog"
          >
            ↻ restore {closed.size}
          </motion.button>
        )}
      </div>

      {/* MOBILE — swipe carousel */}
      <div className="md:hidden -mx-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        <div className="flex gap-4 px-6 pb-4">
          {portfolios.map((p) => (
            <div key={p.id} className="snap-center shrink-0 w-[280px]">
              <MiniBrowser portfolio={p} readOnly />
            </div>
          ))}
        </div>
      </div>

      {/* MAXIMIZED MODAL */}
      <AnimatePresence>
        {maxPortfolio && (
          <MaximizedModal portfolio={maxPortfolio} onClose={() => setMaxId(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// DeckCard — single draggable card with stack positioning
// ─────────────────────────────────────────────────────────────

type DeckCardProps = {
  portfolio: Portfolio;
  stackIndex: number;
  stackSize: number;
  resetKey: number;
  constraintsRef: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
};

function DeckCard({
  portfolio,
  stackIndex,
  stackSize,
  resetKey,
  constraintsRef,
  reducedMotion,
  onClose,
  onMinimize,
  onMaximize,
}: DeckCardProps) {
  const i = stackIndex;
  const isTop = i === 0;
  const depth = Math.min(i, 6);

  const stackX = depth * -7;
  const stackY = depth * 12;
  const scale = 1 - depth * 0.025;
  const rot = ((i % 3) - 1) * 1.8;
  const baseOpacity =
    i === 0 ? 1 : i < 7 ? 0.92 - depth * 0.06 : 0.45;

  // Wobble only on initial mount for the top card
  const showWobble = isTop && resetKey === 0 && !reducedMotion;

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.02}
      dragMomentum={false}
      whileDrag={{
        scale: scale + 0.04,
        zIndex: 100,
        boxShadow: "0 60px 140px -20px rgba(0,0,0,0.9)",
      }}
      whileHover={{
        y: stackY - 4,
        zIndex: 70 + (stackSize - i),
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      }}
      initial={{
        opacity: 0,
        scale: 0.85,
        x: stackX + 30,
        y: stackY,
        rotate: rot,
      }}
      animate={{
        opacity: baseOpacity,
        scale,
        x: showWobble
          ? [stackX + 30, stackX, stackX, stackX - 10, stackX + 5, stackX]
          : [stackX + 30, stackX],
        y: stackY,
        rotate: showWobble ? [rot, rot, rot, rot - 4, rot + 2, rot] : [rot, rot],
      }}
      exit={{
        opacity: 0,
        scale: 0.75,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      transition={{
        delay: 0.7 + (stackSize - 1 - i) * 0.05,
        duration: showWobble ? 2.4 : 0.55,
        times: showWobble ? [0, 0.28, 0.58, 0.74, 0.88, 1] : [0, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: "absolute",
        right: "2%",
        top: "50%",
        marginTop: -(CARD_HEIGHT / 2),
        zIndex: 20 + (stackSize - i),
        transformOrigin: "center",
      }}
      className="cursor-grab touch-none select-none active:cursor-grabbing"
    >
      <MiniBrowser
        portfolio={portfolio}
        onClose={() => onClose(portfolio.id)}
        onMinimize={() => onMinimize(portfolio.id)}
        onMaximize={() => onMaximize(portfolio.id)}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// MiniBrowser — the visual card (chrome + screenshot)
// ─────────────────────────────────────────────────────────────

type MiniBrowserProps = {
  portfolio: Portfolio;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  readOnly?: boolean;
};

function MiniBrowser({
  portfolio: p,
  onClose,
  onMinimize,
  onMaximize,
  readOnly = false,
}: MiniBrowserProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-line-strong bg-ink-raised shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
      style={{ width: readOnly ? 280 : CARD_WIDTH }}
    >
      {/* Shipped tag */}
      <div
        className="pointer-events-none absolute -top-2.5 -right-2.5 z-10 rotate-[6deg] rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] backdrop-blur"
        style={{
          borderColor: `${p.accent}55`,
          backgroundColor: `${p.accent}15`,
          color: p.accent,
        }}
      >
        ↗ {p.shipped} ago
      </div>

      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-ink-soft px-3 py-2">
        <div className="flex gap-0.5">
          <TrafficLight
            color="#FF5F56"
            symbol="×"
            label="Close"
            onClick={onClose}
            readOnly={readOnly}
          />
          <TrafficLight
            color="#FFBD2E"
            symbol="−"
            label="Minimize"
            onClick={onMinimize}
            readOnly={readOnly}
          />
          <TrafficLight
            color="#27C93F"
            symbol="+"
            label="Maximize"
            onClick={onMaximize}
            readOnly={readOnly}
          />
        </div>
        <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-md border border-line bg-ink px-2 py-0.5">
          <span className="inline-block h-1 w-1 rounded-full bg-fog-dim" />
          <span className="truncate font-mono text-[10px] text-fog-muted">
            {p.url}
          </span>
        </div>
      </div>

      {/* Live screenshot */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#050505]">
        <img
          src={thumb(p.url, readOnly ? 400 : 500, readOnly ? 250 : 312)}
          alt={p.url}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute bottom-2 left-3 flex items-center gap-1.5 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-fog-dim backdrop-blur-sm">
          <span className="h-1 w-1 rounded-full" style={{ backgroundColor: p.accent }} />
          {p.tier}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TrafficLight — close/min/max button
// ─────────────────────────────────────────────────────────────

function TrafficLight({
  color,
  symbol,
  label,
  onClick,
  readOnly,
}: {
  color: string;
  symbol: string;
  label: string;
  onClick?: () => void;
  readOnly?: boolean;
}) {
  if (readOnly) {
    return (
      <span
        className="inline-flex h-5 w-5 items-center justify-center"
        aria-hidden
      >
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick?.();
      }}
      className="group relative inline-flex h-5 w-5 cursor-pointer items-center justify-center"
    >
      <span
        className="h-2.5 w-2.5 rounded-full transition group-hover:scale-110 group-hover:brightness-110"
        style={{ backgroundColor: color }}
      />
      <span className="pointer-events-none absolute text-[9px] font-bold leading-none text-black/70 opacity-0 transition group-hover:opacity-100">
        {symbol}
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// MaximizedModal — fullscreen site preview
// ─────────────────────────────────────────────────────────────

function MaximizedModal({
  portfolio,
  onClose,
}: {
  portfolio: Portfolio;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[500] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xl md:p-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.93, y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-line-strong bg-ink-raised shadow-[0_80px_200px_-20px_rgba(0,0,0,0.9)]"
      >
        {/* Chrome */}
        <div className="flex items-center gap-3 border-b border-line bg-ink-soft px-4 py-2.5">
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="group relative h-3.5 w-3.5 cursor-pointer rounded-full bg-[#FF5F56] hover:brightness-110"
            >
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[10px] font-bold leading-none text-black/70 opacity-0 group-hover:opacity-100">
                ×
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Minimize"
              className="h-3.5 w-3.5 cursor-pointer rounded-full bg-[#FFBD2E] hover:brightness-110"
            />
            <div className="h-3.5 w-3.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="ml-3 flex flex-1 items-center gap-1.5 rounded-md border border-line bg-ink px-3 py-1">
            <span className="inline-block h-1 w-1 rounded-full bg-fog-dim" />
            <span className="font-mono text-[11px] text-fog-muted">
              {portfolio.url}
            </span>
          </div>
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{
              borderColor: `${portfolio.accent}55`,
              color: portfolio.accent,
              backgroundColor: `${portfolio.accent}12`,
            }}
          >
            {portfolio.tier} tier
          </span>
        </div>

        {/* Large screenshot */}
        <div className="relative aspect-[16/10] bg-[#050505]">
          <img
            src={thumb(portfolio.url, 1400, 875)}
            alt={portfolio.url}
            draggable={false}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </motion.div>

      {/* hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-dim">
        esc · click outside · to close
      </div>
    </motion.div>
  );
}
