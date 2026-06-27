"use client";

import React, { memo, useCallback } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import WelcomeButton from "./WelcomeButton";

// ─── Animation variants ───────────────────────────────────────────────────────

const DOOR_DURATION = 1.5;
const DOOR_EASE = [0.76, 0, 0.24, 1] as const; // custom cubic-bezier — cinematic

const leftVariants: Variants = {
  closed: { x: 0 },
  open: {
    x: "-100%",
    transition: { duration: DOOR_DURATION, ease: DOOR_EASE },
  },
};

const rightVariants: Variants = {
  closed: { x: 0 },
  open: {
    x: "100%",
    transition: { duration: DOOR_DURATION, ease: DOOR_EASE },
  },
};

// Content fades out slightly before the doors fully open.
const contentVariants: Variants = {
  visible: { opacity: 1, y: 0 },
  hidden: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface WelcomeDoorsProps {
  /** When true, animate both panels off-screen. */
  isOpen: boolean;
  /** Called when button is clicked — parent will flip isOpen. */
  onEnter: () => void;
  /** Called once the exit animation is complete. */
  onAnimationComplete?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

const WelcomeDoors = memo(function WelcomeDoors({
  isOpen,
  onEnter,
  onAnimationComplete,
}: WelcomeDoorsProps) {
  // Track when BOTH panels have finished so we only fire the callback once.
  const completedRef = React.useRef(0);

  const handlePanelComplete = useCallback(() => {
    if (!isOpen) return; // ignore the initial "closed→closed" render
    completedRef.current += 1;
    if (completedRef.current >= 2) {
      completedRef.current = 0;
      onAnimationComplete?.();
    }
  }, [isOpen, onAnimationComplete]);

  return (
    <AnimatePresence>
      {/* We keep the panels mounted until the parent unmounts this component */}
      <>
        {/* ── LEFT PANEL ─────────────────────────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          variants={leftVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          onAnimationComplete={handlePanelComplete}
          className="fixed inset-y-0 left-0 z-50 w-1/2 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1a0508 0%, #3b0a14 50%, #1a0508 100%)",
          }}
        >
          {/* Grain texture overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Vignette edge */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 100% 50%, transparent 60%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </motion.div>

        {/* ── RIGHT PANEL ────────────────────────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          variants={rightVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          onAnimationComplete={handlePanelComplete}
          className="fixed inset-y-0 right-0 z-50 w-1/2 overflow-hidden"
          style={{
            background:
              "linear-gradient(225deg, #1a0508 0%, #3b0a14 50%, #1a0508 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 0% 50%, transparent 60%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </motion.div>

        {/* ── WELCOME CONTENT (centered across both panels) ───────────────── */}
        <motion.div
          variants={contentVariants}
          initial="visible"
          animate={isOpen ? "hidden" : "visible"}
          className={[
            "fixed inset-0 z-[60]",
            "flex flex-col items-center justify-center",
            "pointer-events-none select-none",
            "px-6 text-center",
          ].join(" ")}
        >
          {/* Logo / icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            aria-hidden="true"
            className="mb-6 text-6xl brightness-0 invert"
          >
            🐓
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
            className="font-serif uppercase tracking-[0.25em] text-rose-50 drop-shadow-lg"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            Sombras y Arena
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            aria-hidden="true"
            className="my-5 w-24 h-px bg-rose-600/70 origin-center"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
            className="text-rose-300/80 font-sans tracking-widest uppercase text-sm"
          >
            Catálogo de ejemplares selectos
          </motion.p>

          {/* CTA — re-enable pointer events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
            className="pointer-events-auto"
          >
            <WelcomeButton onClick={onEnter} disabled={isOpen} />
          </motion.div>

          {/* Ambient glow behind content */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(136,19,55,0.18) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      </>
    </AnimatePresence>
  );
});

export default WelcomeDoors;
