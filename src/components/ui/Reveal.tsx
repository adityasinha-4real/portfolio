"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.1,
        ease: [0.65, 0, 0.35, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <RevealWord key={i} delay={delay + i * stagger}>
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </RevealWord>
      ))}
    </span>
  );
}

function RevealWord({
  children,
  delay,
}: {
  children: ReactNode;
  delay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [settled, setSettled] = useState(false);

  return (
    <span
      ref={ref}
      className={`inline-block ${settled ? "overflow-visible" : "overflow-hidden"}`}
    >
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : {}}
        onAnimationComplete={() => setSettled(true)}
        transition={{
          duration: 0.9,
          ease: [0.65, 0, 0.35, 1],
          delay,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
