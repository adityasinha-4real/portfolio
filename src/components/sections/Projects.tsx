"use client";

import { motion, useScroll, useTransform, cubicBezier, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { PROJECTS } from "@/constants/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealText } from "@/components/ui/Reveal";

export function Projects() {
  return (
    <section id="projects" className="relative z-10">
      {/* Section chapter marker */}
      <div className="border-y border-bone/10 py-8">
        <Marquee
          items={[
            "STATUS: ONLINE",
            "GPU: CUDA",
            "LATENCY < 42ms",
            "BUILD 03",
            "TRAINING",
            "EPOCH 128",
            "FPS 60",
            "CONFIDENCE 98.7%",
            "VECTOR DB",
            "EMBEDDING",
            "STREAM ACTIVE",
            "v1.4.2",
            "READY",
          ]}
          speed={60}
        />
      </div>

      <div className="px-8 py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-24 flex items-end justify-between">
            <div>
              <Reveal className="font-mono text-micro uppercase text-bone/60">
                REF-03 · Archive
              </Reveal>
              <h2 className="mt-6 font-display text-editorial font-light">
                <RevealText text="Field notes." />
              </h2>
            </div>
            <div className="hidden font-mono text-micro uppercase text-bone/40 md:block">
              [ {PROJECTS.length.toString().padStart(2, "0")} entries ]
            </div>
          </div>

          <div className="space-y-40">
            {PROJECTS.map((p, i) => (
              <ProjectScene key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectScene({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null!);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  const flip = index % 2 === 1;

  return (
    <div ref={ref} className="grid grid-cols-12 gap-6">
      {/* Metadata rail */}
      <div className={`col-span-12 md:col-span-3 ${flip ? "md:order-last" : ""}`}>
        <Reveal>
          <div className="sticky top-32 space-y-6 font-mono text-micro uppercase text-bone/60">
            <div>
              <span className="text-bone/30">Index</span>
              <div className="mt-1 font-display text-6xl font-light text-bone">
                {project.index}
              </div>
            </div>
            <div>
              <span className="text-bone/30">Year</span>
              <div className="mt-1 text-bone">{project.year}</div>
            </div>
            <div>
              <span className="text-bone/30">Role</span>
              <div className="mt-1 text-bone">{project.role}</div>
            </div>
            <div>
              <span className="text-bone/30">Stack</span>
              <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-bone">
                {project.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Visual pane */}
      <div className={`col-span-12 md:col-span-5 ${flip ? "md:order-first" : ""}`}>
        <motion.div
          style={{ y, rotate }}
          className="relative aspect-[4/5] w-full overflow-hidden border border-bone/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-smoke via-ink to-black" />
          <ArchitectureFlow steps={project.architecture} scrollYProgress={scrollYProgress} />
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
               style={{
                 backgroundImage:
                   "linear-gradient(#f4f1ea 1px, transparent 1px), linear-gradient(90deg, #f4f1ea 1px, transparent 1px)",
                 backgroundSize: "48px 48px",
               }}
          />
          <div className="absolute inset-x-4 top-4 flex justify-between font-mono text-[10px] uppercase text-bone/50">
            <span>Ref-{project.index}</span>
            <span>{project.year}</span>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex justify-between font-mono text-[10px] uppercase text-bone/50">
            <span>{project.slug}</span>
            <span>▲ ARCH</span>
          </div>
        </motion.div>
      </div>

      {/* Copy pane */}
      <div className="col-span-12 md:col-span-4">
        <Reveal delay={0.05}>
          <div className="rounded-3xl border border-bone/10 bg-ink/95 p-8 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)] backdrop-blur-md">
            <div className="font-mono text-micro uppercase text-bone/50">{project.tagline}</div>
            <h3 className="mt-4 font-display text-title font-light leading-[0.95] text-bone">
              {project.title}
            </h3>
            <p className="mt-8 text-lg leading-relaxed text-bone/70">{project.description}</p>

            {(project.href || project.repo) && (
              <div className="mt-10 flex items-center gap-8">
                {project.href && (
                  <MagneticButton href={project.href} target="_blank" cursorLabel="Open">
                    <span>Live</span>
                    <ArrowUpRight size={14} />
                  </MagneticButton>
                )}
                {project.repo && (
                  <MagneticButton href={project.repo} target="_blank" cursorLabel="Repo">
                    <span>Source</span>
                    <ArrowUpRight size={14} />
                  </MagneticButton>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

const EASE = cubicBezier(0.65, 0, 0.35, 1);

// Data-driven flow diagram. Each project supplies an ordered list of levels —
// a level is either a single node label, or an array of parallel branch
// labels — laid out top-to-bottom and connected with a slow traveling pulse.
type ArchLevel = string | readonly string[];

function ArchitectureFlow({
  steps,
  scrollYProgress,
}: {
  steps: readonly ArchLevel[];
  scrollYProgress: MotionValue<number>;
}) {
  // Fades the whole diagram in once the card scrolls into its active range.
  const fade = useTransform(scrollYProgress, [0.05, 0.22], [0, 1], { ease: EASE });

  const cx = 50;
  const top = 12;
  const bottom = 88;
  const spread = 17;

  const levels = steps.map((s) => (Array.isArray(s) ? s : [s as string]));
  const levelGap = levels.length > 1 ? (bottom - top) / (levels.length - 1) : 0;

  const positions = levels.map((level, li) => {
    const y = top + li * levelGap;
    if (level.length === 1) return [{ x: cx, y, label: level[0] }];
    const span = spread * (level.length - 1);
    return level.map((label, ni) => ({ x: cx - span / 2 + ni * spread, y, label }));
  });

  const edges: { x1: number; y1: number; x2: number; y2: number; key: string; delay: number }[] = [];
  for (let li = 0; li < positions.length - 1; li++) {
    positions[li].forEach((a, ai) => {
      positions[li + 1].forEach((b, bi) => {
        edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, key: `${li}-${ai}-${bi}`, delay: li * 0.1 });
      });
    });
  }

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute inset-0 h-full w-full opacity-70"
      style={{ opacity: fade }}
      aria-hidden
    >
      {edges.map((e) => (
        <g key={e.key}>
          <line
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="#f4f1ea"
            strokeOpacity="0.15"
            strokeWidth="0.3"
          />
          {/* Slow flowing pulse along the connection */}
          <motion.line
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="#f4f1ea"
            strokeOpacity="0.55"
            strokeWidth="0.3"
            strokeLinecap="round"
            strokeDasharray="1.5 6"
            animate={{ strokeDashoffset: [0, -15] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: e.delay }}
          />
        </g>
      ))}

      {positions.map((level, li) =>
        level.map((node, ni) => (
          <FlowNode
            key={`${li}-${ni}`}
            label={node.label}
            x={node.x}
            y={node.y}
            index={li}
            labelPos={level.length > 1 ? "below" : "right"}
          />
        ))
      )}
    </motion.svg>
  );
}

function FlowNode({
  label,
  x,
  y,
  index,
  labelPos = "right",
}: {
  label: string;
  x: number;
  y: number;
  index: number;
  labelPos?: "right" | "below";
}) {
  const textProps =
    labelPos === "right"
      ? { x: x + 6, y, textAnchor: "start" as const, dominantBaseline: "middle" as const }
      : { x, y: y + 5.4, textAnchor: "middle" as const, dominantBaseline: "hanging" as const };

  return (
    <motion.g
      initial="rest"
      whileHover="hover"
      animate="rest"
      transition={{ delay: 0.15 + index * 0.06, duration: 0.3 }}
    >
      <motion.circle
        cx={x}
        cy={y}
        r={1.5}
        fill="#f4f1ea"
        variants={{ rest: { scale: 1, fill: "#f4f1ea" }, hover: { scale: 1.6, fill: "#b8492a" } }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r={3.4}
        fill="none"
        stroke="#f4f1ea"
        strokeWidth="0.2"
        variants={{ rest: { opacity: 0.25, scale: 1 }, hover: { opacity: 0.6, scale: 1.3 } }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.text
        {...textProps}
        fontSize={labelPos === "below" ? 2.2 : 2.6}
        fill="#f4f1ea"
        fontFamily="var(--font-mono)"
        variants={{ rest: { fillOpacity: 0.7 }, hover: { fillOpacity: 1 } }}
        style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
      >
        {label}
      </motion.text>
    </motion.g>
  );
}
