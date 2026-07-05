"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { IDENTITY } from "@/constants/data";
import { MagneticButton } from "@/components/ui/MagneticButton";

const LINKS = [
  { id: "top", label: "Intro" },
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "tech", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Signal" },
] as const;

const EXTERNAL_LINKS = [
  { label: "Resume", href: "https://adityasinha-4real.github.io/resume" },
  { label: "Gmail", href: `mailto:${IDENTITY.email}` },
  { label: "GitHub", href: IDENTITY.github },
  { label: "LinkedIn", href: IDENTITY.linkedin },
  { label: "Twitter / X", href: IDENTITY.twitter },
] as const;

export function Navigation() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.4, duration: 1, ease: [0.65, 0, 0.35, 1] }}
      className="fixed inset-x-4 top-4 z-[60] sm:inset-x-8 sm:top-6"
    >
      <div className="flex items-center justify-between rounded-full border border-bone/10 bg-ink/60 px-5 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-8 sm:py-4">
        <a
          href="#top"
          data-cursor="Top"
          className="font-mono text-micro uppercase tracking-widest text-bone/80 transition-colors hover:text-bone"
        >
          <AnimatedName text={IDENTITY.name} />
          <span className="mx-3 text-bone/30">/</span>
          <span className="text-bone/50">{IDENTITY.role}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="font-mono text-micro uppercase tracking-widest text-bone/60 transition-colors hover:text-bone"
            >
              <span className="mr-2 text-bone/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <LinksDropdown />
          <MagneticButton
            href="/resume.pdf"
            download="Aditya-Sinha-Resume.pdf"
            cursorLabel="Download"
            className="rounded-full bg-bone px-4 py-2.5 !text-ink transition-colors hover:bg-white"
          >
            <Download size={14} />
            <span>Resume</span>
          </MagneticButton>
        </div>
      </div>
    </motion.header>
  );
}

function AnimatedName({ text }: { text: string }) {
  const letters = text.split("");

  return (
    <span className="font-bold">
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.65, 0, 0.35, 1],
            delay: 2.6 + i * 0.035,
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

function LinksDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-cursor="Open"
        className="flex items-center gap-1.5 font-mono text-micro uppercase tracking-widest text-bone transition-colors hover:text-bone/80"
      >
        Links
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.65, 0, 0.35, 1] }}
            className="absolute right-0 top-full mt-3 w-48 overflow-hidden border border-bone/10 bg-ink/95 py-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            {EXTERNAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 font-mono text-micro uppercase tracking-widest text-bone/60 transition-colors hover:bg-bone/5 hover:text-bone"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
