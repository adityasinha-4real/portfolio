"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });
  const [expanded, setExpanded] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.classList.add("has-cursor");
    setMounted(true);

    const move = (e: MouseEvent) => {
      let cx = e.clientX;
      let cy = e.clientY;

      // Magnetic pull toward data-magnetic elements
      const el = targetRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const centerX = r.left + r.width / 2;
        const centerY = r.top + r.height / 2;
        cx = centerX + (cx - centerX) * 0.35;
        cy = centerY + (cy - centerY) * 0.35;
      }
      x.set(cx);
      y.set(cy);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [data-cursor], [role='button'], input, textarea, [data-magnetic]"
      ) as HTMLElement | null;
      if (interactive) {
        setExpanded(true);
        setLabel(interactive.dataset.cursor ?? null);
        if (interactive.hasAttribute("data-magnetic")) {
          targetRef.current = interactive;
        } else {
          targetRef.current = null;
        }
      } else {
        setExpanded(false);
        setLabel(null);
        targetRef.current = null;
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width: expanded ? 64 : 10,
            height: expanded ? 64 : 10,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          className="flex items-center justify-center rounded-full border border-bone bg-bone/0"
        >
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-bone">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
      {/* Precise dot layer */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[91]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="h-[3px] w-[3px] rounded-full bg-bone mix-blend-difference" />
      </motion.div>
    </>
  );
}
