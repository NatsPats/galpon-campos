"use client";

import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";

/**
 * Returns the MusicContext value.
 * Must be used inside a <MusicProvider>.
 */
export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used within a <MusicProvider>.");
  }
  return ctx;
}
