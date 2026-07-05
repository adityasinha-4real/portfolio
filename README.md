# STRUCTURED — Portfolio

A cinematic interactive portfolio for an AI/ML engineer & full-stack developer.
Editorial monochrome direction. Scroll-driven camera. Custom GLSL. Film grain.
Built with Next.js 15, React 19, R3F, Framer Motion, GSAP-ready, Lenis smooth scroll.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**, strict mode
- **TailwindCSS** with editorial type scale
- **@react-three/fiber** + **@react-three/drei** + **three.js**
- **Framer Motion** for UI motion, custom cursor, magnetic buttons
- **Lenis** smooth scrolling
- **GSAP** included (ready for advanced scroll timelines)
- **Custom GLSL** shaders (fresnel + simplex noise displacement)

## Setup

```bash
pnpm install     # or npm / yarn / bun
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

```bash
vercel
```

Zero config. All heavy assets are in-code (shaders, particles). No external CDN
dependencies.

## What's implemented

- **Loader** — particle assembly + wordmark clip reveal
- **Hero** — fixed R3F canvas, shader figure, particle field, scroll+mouse camera rig
- **About** — editorial two-column with pillars and parallax marker
- **Projects** — sticky metadata rail, parallax visuals with generated architecture glyphs, per-project metrics
- **Tech** — interactive SVG constellation with hover state and workflow bridges
- **Experience** — scroll-driven timeline with progress line
- **Contact** — colossal close, channel grid, running marquee
- **Cursor** — custom cursor with expansion, magnetic targets, and labels
- **Grain** — SVG turbulence overlay
- **Navigation** — minimalist top nav with numbered chapters

## Customize

- **Content**: `src/constants/data.ts` — every string, project, metric, and link
  in one place. Change `IDENTITY.name`, `email`, socials, and the `PROJECTS`
  array to your real work.
- **Palette**: `tailwind.config.ts` — `ink`, `bone`, `smoke`, `ash`, `rust`
- **Type scale**: `tailwind.config.ts` — `colossal`, `editorial`, `title`, `micro`
- **Fonts**: `src/app/layout.tsx` — swap Fraunces / Inter / JetBrains Mono for
  your chosen faces
- **3D figure**: `src/components/canvas/HeroFigure.tsx` — the shader, geometry,
  and rotation live here
- **Shader**: `src/shaders/figure.vert.ts` and `figure.frag.ts` — displacement,
  fresnel, color mixing
- **Camera path**: `src/components/canvas/CameraRig.tsx` — `CAMERA_KEYFRAMES`
  drives the scroll-controlled camera through six positions
- **Loading time**: `src/components/loader/Loader.tsx` — `DURATION_MS`

## Extending

- **New sections**: add to `src/components/sections/`, mount from
  `src/app/page.tsx`, and register an id + a link in
  `src/components/ui/Navigation.tsx`. Add a keyframe to `CAMERA_KEYFRAMES` if you
  want the camera to visit a new position.
- **Real 3D per project**: replace `ArchitectureGlyph` in
  `src/components/sections/Projects.tsx` with a per-project R3F scene.
- **Sound**: cursor and magnetic interactions have architecture hooks (`data-cursor`,
  `data-magnetic`) — attach `use-sound` calls to enter/leave.
- **CMS**: point `src/constants/data.ts` at Sanity, Contentlayer, or MDX. The
  types will guide you.

## Performance

- R3F canvas is single, fixed, and persistent — no re-mounts between sections
- DPR capped at 1.75 (1.4 on mobile)
- Simplex noise implemented in GLSL, not JS
- Particle field is a single `BufferGeometry` — one draw call
- Lenis is disabled under `prefers-reduced-motion`
- Grain is a static SVG data-URL, not an animated shader

Target: 60fps on modern hardware, Lighthouse ≥ 90.

## Accessibility

- Semantic sections and headings
- Reduced-motion honored (Lenis disabled, animation durations collapsed)
- Custom cursor only on `pointer: fine`
- Focus styles inherit from browser defaults (extend as needed)
- Keyboard nav on all links

## License

MIT — do what you like. If you use it, drop a link.
