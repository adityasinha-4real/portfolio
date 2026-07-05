"use client";

import { motion } from "framer-motion";

export function Marquee({
  items,
  speed = 40,
  direction = "left",
  textClassName = "font-display text-editorial font-light tracking-tight text-bone/90",
}: {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  textClassName?: string;
}) {
  const track = [...items, ...items, ...items];
  return (
    <div
      className="no-scrollbar relative flex overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        className="flex shrink-0 items-center gap-16 whitespace-nowrap"
        animate={{ x: direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {track.map((t, i) => (
          <span key={i} className={textClassName} style={{ lineHeight: 1.3 }}>
            {t}
            <span className="mx-8 inline-block h-2 w-2 rounded-full bg-rust align-middle" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
