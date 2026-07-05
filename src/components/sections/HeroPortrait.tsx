"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const EASE = [0.65, 0, 0.35, 1] as const;

export function HeroPortrait() {
  const { x: mx, y: my } = useMouseParallax();
  const translateX = useTransform(mx, (v) => v * 14);
  const rotateY = useTransform(mx, (v) => v * 5);
  const rotateX = useTransform(my, (v) => v * -4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.3, delay: 0.5, ease: EASE }}
      style={{ perspective: 1200 }}
      className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px]"
    >
      {/* Ambient glow — reads through the glass margin and ties into the blob behind it */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,241,234,0.16) 0%, rgba(184,73,42,0.07) 45%, transparent 72%)",
        }}
      />

      {/* Floating + tilting glass card */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ x: translateX, rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative border border-bone/15 bg-bone/[0.04] p-3 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-bone/10 bg-ink">
          <Image
            src="/images/portfolio.png"
            alt="Portrait of Aditya Sinha"
            fill
            priority
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 420px"
            className="object-cover object-[78%_28%] contrast-[1.05] brightness-[0.96]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-bone/[0.05] via-transparent to-transparent" />
        </div>

        <div className="mt-3 flex items-center justify-between px-1 font-mono text-[9px] uppercase tracking-widest text-bone/50">
          <span>Ref-00 · Self</span>
          <span>Ind / MMXXVI</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
