"use client";

import { useRef, MouseEvent, PropsWithChildren } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = PropsWithChildren<{
  href?: string;
  target?: string;
  download?: boolean | string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  cursorLabel?: string;
  className?: string;
  strength?: number;
}>;

export function MagneticButton({
  children,
  href,
  target,
  download,
  onClick,
  type = "button",
  disabled = false,
  cursorLabel = "Open",
  className = "",
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const shared = {
    "data-magnetic": "true",
    "data-cursor": cursorLabel,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className:
      "group relative inline-flex items-center gap-3 font-mono text-micro uppercase tracking-widest " +
      className,
  } as const;

  const inner = (
    <motion.span style={{ x: sx, y: sy }} className="flex items-center gap-3">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        download={download}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        {...shared}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      ref={ref as React.RefObject<HTMLButtonElement>}
      {...shared}
    >
      {inner}
    </button>
  );
}
