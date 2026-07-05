"use client";

import { useEffect, useRef } from "react";

/**
 * Returns a stable getter for the current scrollY without triggering rerenders.
 * Consumers (like the R3F camera rig) read it inside their own useFrame loop.
 */
export function useScrollY() {
  const yRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      yRef.current = window.scrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return () => yRef.current;
}
