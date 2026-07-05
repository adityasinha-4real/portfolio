"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ABOUT, BEYOND } from "@/constants/data";
import { RevealText, Reveal } from "@/components/ui/Reveal";

export function About() {
  const ref = useRef<HTMLElement>(null!);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-10 min-h-screen px-8 py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Section marker */}
        <div className="mb-24 flex items-center justify-between">
          <Reveal className="font-mono text-micro uppercase text-bone/60">
            {ABOUT.section}
          </Reveal>
          <motion.div style={{ y }} className="font-mono text-micro uppercase text-bone/30">
            ▲ figure /01
          </motion.div>
        </div>

        <div className="grid grid-cols-12 items-start gap-6">
          {/* Headline */}
          <h2 className="col-span-12 max-w-2xl font-display text-editorial font-light leading-[0.9] md:col-span-6 md:col-start-1">
            {ABOUT.title.split("\n").map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <RevealText text={line} delay={i * 0.1} />
              </span>
            ))}
          </h2>

          {/* Pillars */}
          <div className="col-span-12 mt-10 md:col-span-5 md:col-start-8 md:mt-0">
            <div className="rounded-3xl border border-bone/10 bg-ink/95 p-8 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-10">
              {ABOUT.pillars.map((p, i) => (
                <Pillar key={p.code} pillar={p} index={i} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6">
          {/* Paragraphs */}
          <div className="col-span-12 max-w-md space-y-8 md:col-span-6 md:col-start-1">
            {ABOUT.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-xl leading-relaxed text-bone/75">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Beyond engineering */}
        <div className="mt-32 border-t border-bone/10 pt-16">
          <div className="mx-auto max-w-6xl rounded-3xl border border-bone/10 bg-[#141311] p-10 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)] sm:p-14">
            <div className="grid grid-cols-12 items-center gap-6">
              <div className="col-span-12 md:col-span-5 md:col-start-1">
                <Reveal className="font-mono text-micro uppercase text-bone/40">
                  {BEYOND.label}
                </Reveal>
                <p className="mt-8 max-w-2xl font-display text-2xl font-light italic leading-relaxed text-bone/70">
                  {BEYOND.lines.map((line, i) =>
                    line === "" ? (
                      <br key={i} />
                    ) : (
                      <span key={i} className="block">
                        <RevealText text={line} delay={0.03 * i} />
                      </span>
                    )
                  )}
                </p>
              </div>

              <div className="col-span-12 mt-10 md:col-span-6 md:col-start-7 md:mt-0">
                <Reveal delay={0.15}>
                  <div className="relative overflow-hidden rounded-2xl border border-bone/15 bg-bone/[0.04] p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md">
                    <img
                      src="/images/tactics.png"
                      alt="Tactical analysis"
                      className="h-auto w-full rounded-xl border border-bone/10"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-bone/[0.08] via-transparent to-transparent" />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillar({
  pillar,
  index,
}: {
  pillar: { code: string; label: string; copy: string };
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <div className="group border-t border-bone/10 py-6 transition-colors hover:border-bone/40">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-micro uppercase text-bone/40">{pillar.code}</span>
          <span className="font-display text-2xl font-light text-bone">{pillar.label}</span>
        </div>
        <p className="mt-3 pl-9 text-sm leading-relaxed text-bone/60">{pillar.copy}</p>
      </div>
    </Reveal>
  );
}
