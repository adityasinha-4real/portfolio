"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const DEFAULT_SPRING = { stiffness: 50, damping: 18, mass: 0.6 };

/**
 * Smoothed, normalized (-1..1) mouse position for parallax effects.
 * No-ops on touch pointers and prefers-reduced-motion.
 */
export function useMouseParallax(spring = DEFAULT_SPRING) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return { x, y };
}
