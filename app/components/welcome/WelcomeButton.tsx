"use client";

import React, { KeyboardEvent, memo, useCallback } from "react";

interface WelcomeButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Primary CTA button for the welcome screen.
 * Fully keyboard-navigable and ARIA-annotated.
 */
const WelcomeButton = memo(function WelcomeButton({
  onClick,
  disabled = false,
}: WelcomeButtonProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!disabled) onClick();
      }
    },
    [onClick, disabled]
  );

  return (
    <button
      id="welcome-enter-btn"
      type="button"
      role="button"
      aria-label="Ingresar al catálogo de Sombras y Arena"
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={[
        // Layout
        "group relative mt-10 overflow-hidden",
        "px-10 py-4 rounded-full",
        // Typography
        "text-base font-semibold tracking-[0.2em] uppercase font-sans",
        // Color — rose palette matching catalog header
        "bg-rose-900 text-rose-50",
        "border border-rose-700/50",
        // Hover / focus states
        "hover:bg-rose-800 focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        // Transition
        "transition-all duration-300 ease-out",
        "shadow-lg shadow-rose-950/60 hover:shadow-rose-900/80 hover:shadow-xl",
        // Disabled
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      {/* Shimmer overlay on hover */}
      <span
        aria-hidden="true"
        className={[
          "absolute inset-0 -translate-x-full",
          "bg-gradient-to-r from-transparent via-rose-300/15 to-transparent",
          "group-hover:translate-x-full transition-transform duration-700 ease-in-out",
        ].join(" ")}
      />

      <span className="relative z-10 flex items-center gap-3">
        {/* Decorative line */}
        <span
          aria-hidden="true"
          className="block w-6 h-px bg-rose-400/70 group-hover:w-8 transition-all duration-300"
        />
        Ingresar al catálogo
        <span
          aria-hidden="true"
          className="block w-6 h-px bg-rose-400/70 group-hover:w-8 transition-all duration-300"
        />
      </span>
    </button>
  );
});

export default WelcomeButton;
