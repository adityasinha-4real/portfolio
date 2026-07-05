"use client";

import { Reveal, RevealText } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { TECH } from "@/constants/data";

const NAMES = TECH.map((t) => t.name);
const CHUNK = Math.ceil(NAMES.length / 3);
const ROW_1 = NAMES.slice(0, CHUNK);
const ROW_2 = NAMES.slice(CHUNK, CHUNK * 2);
const ROW_3 = NAMES.slice(CHUNK * 2);

const ROW_TEXT = "font-display text-title font-light tracking-tight text-bone/85";

export function Tech() {
  return (
    <section id="tech" className="relative z-10 min-h-screen px-8 py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16">
          <Reveal className="font-mono text-micro uppercase text-bone/60">
            REF-04 · Constellation
          </Reveal>
          <h2 className="mt-6 max-w-4xl font-display text-editorial font-light">
            <RevealText text="A stack that talks" />
            <br />
            <RevealText text="to itself." delay={0.15} />
          </h2>
        </div>

        <Reveal>
          <div className="space-y-10 border-y border-bone/10 py-16">
            <Marquee items={ROW_1} speed={34} direction="left" textClassName={ROW_TEXT} />
            <Marquee items={ROW_2} speed={40} direction="right" textClassName={ROW_TEXT} />
            <Marquee items={ROW_3} speed={28} direction="left" textClassName={ROW_TEXT} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
