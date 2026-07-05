"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { HeroCanvas } from "@/components/canvas/HeroCanvas";
import { HeroPortrait } from "@/components/sections/HeroPortrait";
import { useScrollY } from "@/hooks/useScrollProgress";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { HERO, IDENTITY } from "@/constants/data";

export function Hero() {
  const scrollY = useScrollY();
  const { x: mx, y: my } = useMouseParallax();
  const textX = useTransform(mx, (v) => v * 5);
  const textY = useTransform(my, (v) => v * 3);
  const wordmarkLines = HERO.wordmark.split(" ");

  return (
    <>
      {/* Fixed background canvas — persists behind all sections */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <HeroCanvas scrollY={scrollY} />
      </div>

      <section
        id="top"
        className="relative z-10 flex min-h-screen flex-col justify-between px-8 pt-32 pb-10"
      >
        {/* Ref rail */}
        <div className="flex items-start justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.9 }}
            className="font-mono text-micro uppercase text-bone/60"
          >
            {HERO.eyebrow}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7, duration: 0.9 }}
            className="text-right font-mono text-micro uppercase text-bone/60"
          >
            <div>{IDENTITY.location}</div>
            <div className="mt-1 text-bone/40">69.37° S · 32.35° E</div>
          </motion.div>
        </div>

        {/* Name + portrait */}
        <div className="relative flex-1">
          <div className="grid grid-cols-12 items-center gap-y-16 lg:gap-x-12">
            {/* Text column */}
            <div className="col-span-12 lg:col-span-7">
              <motion.div style={{ x: textX, y: textY }}>
                <div className="flex items-center">
                  <motion.span
                    initial="rest"
                    whileHover="hover"
                    className="mr-6 hidden cursor-default font-mono text-micro uppercase text-bone/40 md:inline-flex"
                  >
                    {"[ YEET ]".split("").map((ch, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        variants={{
                          rest: { y: 0, rotate: 0, color: "#f4f1ea66" },
                          hover: {
                            y: [0, -7, 0],
                            rotate: [0, -10, 0],
                            color: ["#f4f1ea66", "#b8492a", "#f4f1ea66"],
                            transition: {
                              duration: 0.5,
                              delay: i * 0.025,
                              ease: "easeOut",
                            },
                          },
                        }}
                      >
                        {ch === " " ? " " : ch}
                      </motion.span>
                    ))}
                  </motion.span>
                </div>

                <h1 className="mt-4 font-display font-light">
                  {wordmarkLines.map((line, i) => (
                    <LineReveal key={line} text={line} delay={2.65 + i * 0.13} />
                  ))}
                </h1>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                  <div className="space-y-1 font-display text-title font-light text-bone">
                    {HERO.headline.map((line, i) => (
                      <ClipReveal key={line} delay={3.0 + i * 0.12}>
                        <span className="block">{line}</span>
                      </ClipReveal>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Portrait column */}
            <div className="col-span-12 flex justify-center lg:col-span-5 lg:justify-end">
              <HeroPortrait />
            </div>
          </div>
        </div>

        {/* Bottom rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.9 }}
          className="mt-16 flex items-end justify-between"
        >
          <div className="font-mono text-micro uppercase text-bone/50">
            <CursorCoords />
          </div>
          <div className="hidden font-mono text-micro uppercase text-bone/50 md:block">
            <ThunderText text="Scroll · Enter · Explore" />
          </div>
          <div className="font-mono text-micro uppercase text-bone/50">/ 06 chapters</div>
        </motion.div>
      </section>
    </>
  );
}

function ThunderText({ text }: { text: string }) {
  return (
    <motion.span
      animate={{
        opacity: [0.5, 1, 0.35, 1, 0.5, 0.5, 0.5, 0.5, 0.5],
        textShadow: [
          "0 0 0px rgba(244,241,234,0)",
          "0 0 14px rgba(244,241,234,0.9)",
          "0 0 0px rgba(244,241,234,0)",
          "0 0 18px rgba(244,241,234,1)",
          "0 0 0px rgba(244,241,234,0)",
          "0 0 0px rgba(244,241,234,0)",
          "0 0 0px rgba(244,241,234,0)",
          "0 0 0px rgba(244,241,234,0)",
          "0 0 0px rgba(244,241,234,0)",
        ],
      }}
      transition={{
        duration: 1.6,
        times: [0, 0.05, 0.1, 0.15, 0.2, 0.4, 0.6, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0.6,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.span>
  );
}

function CursorCoords() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span>
      X: {String(pos.x).padStart(4, "0")} · Y: {String(pos.y).padStart(4, "0")}
    </span>
  );
}

function LineReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) setWidth(textRef.current.getBoundingClientRect().width);
  }, []);

  return (
    <span className="relative block overflow-visible py-[0.05em] text-heroName">
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[3px] bg-bone"
        style={{ transformOrigin: "0% 50%" }}
        initial={{ scaleY: 0, opacity: 0.5, x: 0 }}
        animate={
          width > 0
            ? {
                scaleY: [0, 1, 1, 1],
                opacity: [0.5, 1, 1, 0],
                x: [0, 0, width + 10, width + 10],
              }
            : undefined
        }
        transition={{ duration: 1.6, delay, times: [0, 0.3, 0.7, 1], ease: [0.16, 1, 0.3, 1] }}
      />
      <span ref={textRef} className="inline-block">
        {text.split("").map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={width > 0 ? { opacity: 1 } : undefined}
            transition={{
              duration: 0.5,
              delay: delay + 0.55 + i * 0.032,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

function ClipReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="-mb-[0.15em] block overflow-hidden pb-[0.15em]">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
