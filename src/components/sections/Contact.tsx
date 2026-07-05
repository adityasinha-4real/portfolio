"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CONTACT, IDENTITY } from "@/constants/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { ArrowUpRight, Github, Linkedin, MapPin, Send, Twitter, type LucideIcon } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative z-10">
      <div className="px-8 py-40">
        <div className="relative mx-auto max-w-[1600px]">
          {/* Decorative doodle arrow — headline to social icons */}
          <DoodleArrow
            d="M8 90 C 22 78, 6 58, 24 48 C 40 40, 30 22, 50 16 C 64 11, 68 20, 88 8"
            head="M74 5 L88 8 L82 22"
            className="pointer-events-none absolute right-[7%] top-[9%] hidden h-48 w-48 text-bone/30 lg:block"
          />

          <div className="flex items-start justify-between gap-6">
            <Reveal className="font-mono text-micro uppercase text-bone/60">
              {CONTACT.eyebrow}
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex items-center gap-4">
                <ChannelIcon icon={Github} href={IDENTITY.github} label="GitHub" index={0} />
                <ChannelIcon icon={Linkedin} href={IDENTITY.linkedin} label="LinkedIn" index={1} />
                <ChannelIcon icon={Twitter} href={IDENTITY.twitter} label="Twitter" index={2} />
              </div>
            </Reveal>
          </div>

          <h2 className="mt-8 max-w-none font-display font-light leading-[0.85]">
            {CONTACT.headline.map((line, i) => (
              <span key={i} className="block text-[clamp(4rem,14vw,17rem)]">
                <RevealText text={line} delay={i * 0.12} />
              </span>
            ))}
          </h2>

          <div className="mt-24 max-w-2xl">
            <Reveal>
              <p className="text-xl leading-relaxed text-bone/70">{CONTACT.copy}</p>
              <div className="mt-10">
                <MagneticButton
                  href={`mailto:${IDENTITY.email}`}
                  cursorLabel="Write"
                  className="text-3xl md:text-5xl !tracking-normal !text-bone"
                >
                  <span className="font-display font-light lowercase !normal-case">
                    {IDENTITY.email}
                  </span>
                  <ArrowUpRight size={28} strokeWidth={1} />
                </MagneticButton>
              </div>
              <div className="mt-6 flex items-center gap-2 font-mono text-micro uppercase text-bone/40">
                <MapPin size={12} />
                {IDENTITY.location}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Direct message form */}
      <div className="border-t border-bone/10 px-8 py-24">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-bone/40 via-bone/10 to-bone/5 p-px shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8),0_0_160px_-30px_rgba(244,241,234,0.2)]">
              <div className="rounded-[calc(1rem-1px)] bg-[#141311] p-10 sm:p-14">
                <div className="flex items-center gap-3 font-mono text-micro uppercase text-bone/40">
                  <motion.span
                    animate={{ opacity: [1, 0.25, 1], scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="h-1.5 w-1.5 rounded-full bg-rust"
                  />
                  Or, write directly
                </div>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Footer rail */}
      <footer className="border-t border-bone/10 px-8 py-8">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between font-mono text-micro uppercase text-bone/40">
          <div>© MMXXVI — {IDENTITY.name}</div>
          <div>From idea → model → product.</div>
          <WaveText text="End of transmission" />
        </div>
      </footer>
    </section>
  );
}

function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: "New portfolio inquiry",
          from_name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setValues({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "peer w-full border-b border-bone/15 bg-transparent py-3 font-display text-lg font-light text-bone outline-none transition-colors placeholder:text-bone/25 placeholder:transition-opacity placeholder:duration-[250ms] focus:border-bone/60 focus:placeholder:text-bone/10 focus-visible:border-bone/60";

  const underlineClass =
    "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-rust transition-transform duration-[250ms] ease-out peer-focus:scale-x-100 peer-focus-visible:scale-x-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label className="font-mono text-micro font-bold uppercase text-bone/70">Name</label>
          <div className="relative mt-2">
            <input
              required
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              placeholder="Your name"
              className={fieldClass}
            />
            <span aria-hidden className={underlineClass} />
          </div>
        </div>
        <div>
          <label className="font-mono text-micro font-bold uppercase text-bone/70">Email</label>
          <div className="relative mt-2">
            <input
              required
              type="email"
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              placeholder="you@domain.com"
              className={fieldClass}
            />
            <span aria-hidden className={underlineClass} />
          </div>
        </div>
      </div>

      <div>
        <label className="font-mono text-micro font-bold uppercase text-bone/70">Message</label>
        <div className="relative mt-2">
          <textarea
            required
            rows={4}
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            placeholder="What are you building?"
            className={`resize-none ${fieldClass}`}
          />
          <span aria-hidden className={underlineClass} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <MagneticButton
          type="submit"
          disabled={status === "sending"}
          cursorLabel="Send"
          className="rounded-lg bg-bone px-6 py-3 !text-ink transition-colors hover:bg-white disabled:opacity-50"
        >
          <span>{status === "sending" ? "Sending…" : "Send message"}</span>
          <Send size={14} />
        </MagneticButton>

        {status === "sent" && (
          <span className="font-mono text-micro uppercase text-bone/60">
            Sent — I&apos;ll reply soon.
          </span>
        )}
        {status === "error" && (
          <span className="font-mono text-micro uppercase text-rust">
            Something went wrong — email me directly instead.
          </span>
        )}
      </div>
    </form>
  );
}

function WaveText({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

function DoodleArrow({ d, head, className }: { d: string; head: string; className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d={d}
        transform="translate(0.8 0.6) rotate(0.6 50 50)"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d={head}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChannelIcon({
  icon: Icon,
  href,
  label,
  index = 0,
}: {
  icon: LucideIcon;
  href: string;
  label: string;
  index?: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Open"
      aria-label={label}
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 2.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.25,
      }}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-bone text-ink shadow-[0_0_24px_-4px_rgba(244,241,234,0.4)] transition-colors hover:bg-white"
    >
      <Icon size={22} strokeWidth={1.75} />
    </motion.a>
  );
}
