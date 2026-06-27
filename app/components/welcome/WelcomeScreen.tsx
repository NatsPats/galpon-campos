"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type Easing, motion } from "framer-motion";
import WelcomeDoors from "./WelcomeDoors";
import { useMusic } from "../../hooks/useMusic";

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "galpon-entered";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WelcomeScreenProps {
  children: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Orchestrates the welcome experience:
 * - First visit  → shows WelcomeDoors overlay, catalog hidden beneath.
 * - Return visit → renders children directly (no overlay).
 */
const WelcomeScreen = memo(function WelcomeScreen({
  children,
}: WelcomeScreenProps) {
  const music = useMusic();

  // null = SSR / not yet checked; true = already visited; false = first visit
  const [alreadyEntered, setAlreadyEntered] = useState<boolean | null>(null);

  // Whether the doors are currently animating open.
  const [isOpen, setIsOpen] = useState(false);

  // Whether to fully unmount the overlay (after animation ends).
  const [overlayDone, setOverlayDone] = useState(false);

  // Always start with false on client to show the welcome screen every time.
  useEffect(() => {
    setAlreadyEntered(false);
  }, []);

  // Called when user clicks "Ingresar al catálogo".
  const handleEnter = useCallback(() => {
    music.play();
    setIsOpen(true);
  }, [music]);

  // Called when the split-door animation finishes.
  const handleAnimationComplete = useCallback(() => {
    setAlreadyEntered(true);
    setOverlayDone(true);
  }, []);

  // Catalog opacity: invisible while overlay is active, fades in as doors open.
  const catalogVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 1.2,
          ease: "easeOut" as Easing,
          delay: 0.5,
        },
      },
    }),
    []
  );

  // ── SSR guard: render nothing until we know whether to show the welcome ──
  if (alreadyEntered === null) {
    return null;
  }

  // ── Return visit: skip overlay entirely ──────────────────────────────────
  if (alreadyEntered && overlayDone) {
    return <>{children}</>;
  }

  // ── Already entered (localStorage set) but overlay not yet toggled off ───
  // (Handles the case where alreadyEntered is true from localStorage read)
  if (alreadyEntered) {
    return <>{children}</>;
  }

  // ── First visit: overlay + catalog underneath ─────────────────────────────
  return (
    <>
      {/* Catalog — rendered beneath the overlay, fades in as doors open */}
      <motion.div
        aria-hidden={!isOpen}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={catalogVariants}
      >
        {children}
      </motion.div>

      {/* Welcome overlay — unmounted after animation finishes */}
      {!overlayDone && (
        <WelcomeDoors
          isOpen={isOpen}
          onEnter={handleEnter}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </>
  );
});

export default WelcomeScreen;
