"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE } from "@/constants/data";
import { Reveal, RevealText } from "@/components/ui/Reveal";

export function Experience() {
  const ref = useRef<HTMLElement>(null!);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section id="experience" ref={ref} className="relative z-10 px-8 py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-24">
          <Reveal className="font-mono text-micro uppercase text-bone/60">
            REF-05 · Chronology
          </Reveal>
          <h2 className="mt-6 max-w-3xl font-display text-editorial font-light">
            <RevealText text="A path, not a résumé." />
          </h2>
        </div>

        <div className="relative grid grid-cols-12 gap-6">
          {/* Vertical scroll-progress line */}
          <div className="col-span-1 hidden md:block">
            <div className="sticky top-32">
              <div className="relative h-[70vh] w-px overflow-hidden bg-bone/10">
                <motion.div
                  style={{ scaleY: lineScale, transformOrigin: "top" }}
                  className="absolute inset-0 bg-bone"
                />
              </div>
            </div>
          </div>

          {/* Entries */}
          <div className="col-span-12 md:col-span-11">
            <div className="mx-auto max-w-6xl rounded-3xl border border-bone/10 bg-ink/95 p-10 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-14">
              <div className="space-y-16">
                {EXPERIENCE.map((e, i) => (
                  <Entry key={i} entry={e} index={i} />
                ))}
              </div>
            </div>

            <div className="mt-10 space-y-10">
              <div className="mx-auto max-w-6xl rounded-3xl border border-bone/10 bg-ink/95 p-10 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-14">
                <Certifications />
              </div>
              <div className="mx-auto max-w-6xl rounded-3xl border border-bone/10 bg-ink/95 p-10 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-14">
                <Education />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <Reveal delay={0.1}>
      <div>
        <div className="mb-12 font-mono text-sm font-bold uppercase tracking-widest text-bone/50">
          Certifications
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <div key={c.href} className="group">
              <div className="flex items-start justify-between gap-4">
                <div className="font-display text-xl font-light leading-snug text-bone">
                  {c.title}
                </div>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Verify"
                  aria-label={`Verify ${c.title}`}
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-bone/15 text-bone/50 transition-colors hover:border-bone/40 hover:text-bone"
                >
                  <ArrowUpRight size={14} />
                </a>
              </div>
              <div className="mt-4 font-mono text-micro uppercase text-bone/50">{c.issuer}</div>
              <div className="mt-1 font-mono text-micro uppercase text-bone/40">
                Issued {c.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function Education() {
  return (
    <Reveal delay={0.1}>
      <div>
        <div className="mb-12 font-mono text-sm font-bold uppercase tracking-widest text-bone/50">
          Education
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:divide-x md:divide-bone/10">
          {EDUCATION.map((ed, i) => (
            <div key={i} className={i > 0 ? "md:pl-10" : ""}>
              <div className="font-display text-xl font-light leading-snug text-bone">
                {ed.degree}
              </div>
              <div className="mt-4 font-mono text-micro uppercase text-bone/50">
                {ed.institution}
              </div>
              <div className="mt-1 font-mono text-micro uppercase text-bone/40">{ed.years}</div>
              {"detail" in ed && ed.detail && (
                <div className="mt-1 font-mono text-micro uppercase text-bone/40">
                  {ed.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function Entry({
  entry,
  index,
}: {
  entry: (typeof EXPERIENCE)[number];
  index: number;
}) {
  return (
    <Reveal delay={index * 0.06}>
      <div className="grid grid-cols-12 items-baseline gap-6 border-t border-bone/10 pt-10">
        <div className="col-span-12 md:col-span-2">
          <div className="font-display text-4xl font-light text-bone">{entry.year}</div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-micro uppercase text-bone/50">{entry.org}</div>
          <div className="mt-2 font-display text-2xl font-light text-bone">{entry.role}</div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <p className="text-lg leading-relaxed text-bone/70">{renderCopy(entry.copy)}</p>
        </div>
      </div>
    </Reveal>
  );
}

function renderCopy(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-bone">
        {part}
      </strong>
    ) : (
      part
    )
  );
}
