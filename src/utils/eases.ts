export const EASE = {
  premium: [0.65, 0, 0.35, 1] as const,
  cinema: [0.87, 0, 0.13, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutQuint: [0.83, 0, 0.17, 1] as const,
};

export const cn = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(" ");
