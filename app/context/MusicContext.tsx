"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MusicContextValue {
  /** Start playback with a ~2 s fade-in. Safe to call multiple times. */
  play: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const MusicContext = createContext<MusicContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface MusicProviderProps {
  /** Path to the audio file (relative to /public). */
  src?: string;
  /** Fade-in duration in milliseconds. */
  fadeDurationMs?: number;
  children: React.ReactNode;
}

export function MusicProvider({
  src = "/m.mp3",
  fadeDurationMs = 2000,
  children,
}: MusicProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPlayingRef = useRef(false);

  // Initialise the audio element once on the client.
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [src]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isPlayingRef.current) return;
    isPlayingRef.current = true;

    // Clear any lingering fade interval.
    if (fadeIntervalRef.current !== null) {
      clearInterval(fadeIntervalRef.current);
    }

    audio.currentTime = 0;
    audio.volume = 0;
    audio.play().catch(() => {
      // Autoplay blocked — volume will still ramp if the browser allows it later.
    });

    // Smooth volume ramp: step every 50 ms over fadeDurationMs.
    const steps = fadeDurationMs / 50;
    const increment = 1 / steps;

    fadeIntervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const next = Math.min(audio.volume + increment, 1);
      audio.volume = next;

      if (next >= 1 && fadeIntervalRef.current !== null) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }, 50);
  }, [fadeDurationMs]);

  return (
    <MusicContext.Provider value={{ play }}>
      {children}
    </MusicContext.Provider>
  );
}

// ─── Internal export (consumed by hook) ───────────────────────────────────────

export { MusicContext };
