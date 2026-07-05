"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION_MS = 2200;

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = performance.now();
    let raf = 0;

    const tick = () => {
      const elapsed = performance.now() - startedAt.current;
      const p = Math.min(1, elapsed / DURATION_MS);
      // ease-out cubic to hit 100 with weight
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 320);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink text-bone"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.87, 0, 0.13, 1] },
          }}
          aria-hidden
        >
          {/* Top rail */}
          <div className="absolute inset-x-8 top-8 flex justify-between font-mono text-micro uppercase text-ash">
            <span>Ref-00 · Boot</span>
            <span>{Math.round(progress * 100).toString().padStart(3, "0")}</span>
          </div>

          {/* Center wordmark */}
          <div className="relative flex h-full items-center justify-center">
            <ParticleAssembly progress={progress} />
            <div className="absolute inset-0 flex items-center justify-center">
              <RevealMark progress={progress} />
            </div>
          </div>

          {/* Bottom rail */}
          <div className="absolute inset-x-8 bottom-8">
            <div className="flex justify-between font-mono text-micro uppercase text-ash">
              <span>Preloading assets</span>
              <span>Aditya Sinha / MMXXVI</span>
            </div>
            <div className="mt-3 h-px w-full bg-bone/10">
              <motion.div
                className="h-full bg-bone"
                style={{ width: `${progress * 100}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RevealMark({ progress }: { progress: number }) {
  const clip = Math.max(0, 1 - progress) * 100;
  return (
    <div
      style={{ clipPath: `inset(0 0 ${clip}% 0)` }}
      className="font-display text-editorial font-light tracking-tight text-bone"
    >
      ADITYA SINHA
    </div>
  );
}

function ParticleAssembly({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<
    { x: number; y: number; tx: number; ty: number; r: number; a: number }[]
  >([]);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const progressRef = useRef(0);

  progressRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      sizeRef.current = { w, h, dpr };

      // Distribute particles: assemble toward a horizontal band across the wordmark
      const count = Math.min(360, Math.floor((w * h) / 12000));
      const bandY = h / 2;
      const bandW = Math.min(w * 0.7, 900);
      const startX = (w - bandW) / 2;

      particlesRef.current = new Array(count).fill(0).map(() => {
        const tx = startX + Math.random() * bandW;
        const ty = bandY + (Math.random() - 0.5) * 6;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          tx,
          ty,
          r: Math.random() * 1.4 + 0.3,
          a: Math.random() * 0.4 + 0.2,
        };
      });
    };

    setup();
    window.addEventListener("resize", setup);

    const draw = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      const p = progressRef.current;
      const ease = 1 - Math.pow(1 - p, 3);

      for (const pt of particlesRef.current) {
        const cx = pt.x + (pt.tx - pt.x) * ease;
        const cy = pt.y + (pt.ty - pt.y) * ease;
        ctx.beginPath();
        ctx.fillStyle = `rgba(244, 241, 234, ${pt.a * (0.6 + ease * 0.4)})`;
        ctx.arc(cx, cy, pt.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
