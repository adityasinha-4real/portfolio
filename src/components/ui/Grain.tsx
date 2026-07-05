"use client";

/**
 * Film grain overlay using an animated SVG turbulence filter.
 * Very cheap: single fixed-position element with a repeating fractal noise pattern.
 */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] opacity-[0.06] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>")`,
        backgroundSize: "240px 240px",
      }}
    />
  );
}
