# Aditya Sinha — Portfolio

A cinematic, editorial-monochrome portfolio for an AI/ML engineer, backend developer, and data scientist. Scroll-driven 3D camera, custom GLSL shaders, film grain, and magnetic UI — built to feel like a designed object, not a template.

**Repo:** [github.com/adityasinha-4real/portfolio](https://github.com/adityasinha-4real/portfolio)

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**, strict mode
- **Tailwind CSS** with a custom editorial type scale
- **@react-three/fiber** + **@react-three/drei** + **three.js** for the 3D hero
- **Framer Motion** for UI motion, custom cursor, and magnetic buttons
- **Lenis** smooth scrolling
- **GSAP** included for advanced scroll timelines
- Custom **GLSL** shaders (fresnel + simplex noise displacement)
- **lucide-react** icons

## Sections

- **Loader** — particle assembly + wordmark clip reveal on first load
- **Hero** — fixed R3F canvas behind a scroll+mouse-driven camera, shader figure, particle field, and portrait
- **About** — editorial two-column layout with pillars and a parallax marker
- **Projects** — sticky metadata rail, parallax visuals, generated architecture diagrams, per-project metrics
- **Tech** — interactive SVG constellation of the stack with hover states
- **Experience** — scroll-driven timeline with a progress line
- **Contact** — large closing statement, social channel grid, and a working contact form (Web3Forms)
- **Navigation** — top nav with a resume download button and a links dropdown (email, GitHub, LinkedIn, X, hosted resume)
- **Cursor** — custom cursor with magnetic targets and contextual labels
- **Grain** — SVG turbulence overlay for texture

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL of the deployed site, used for metadata |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Access key for [Web3Forms](https://web3forms.com), powers the contact form |

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | Type-check with `tsc --noEmit` |

## Deploy (Vercel)

Import this repo at [vercel.com/new](https://vercel.com/new), add the environment variables above, and deploy. No extra config needed — all heavy assets (shaders, particles) are generated in-code, no external CDN dependencies.

## Customize

- **Content**: [src/constants/data.ts](src/constants/data.ts) — identity, hero copy, projects, tech list, experience, education, certifications, and contact copy all live here
- **Palette**: [tailwind.config.ts](tailwind.config.ts) — `ink`, `bone`, `smoke`, `ash`, `rust`
- **Type scale**: [tailwind.config.ts](tailwind.config.ts) — `colossal`, `editorial`, `title`, `micro`
- **Fonts**: [src/app/layout.tsx](src/app/layout.tsx) — Fraunces / Inter / JetBrains Mono
- **3D hero**: [src/components/canvas/HeroCanvas.tsx](src/components/canvas/HeroCanvas.tsx), [HeroFigure.tsx](src/components/canvas/HeroFigure.tsx), and [CameraRig.tsx](src/components/canvas/CameraRig.tsx) (`CAMERA_KEYFRAMES`)
- **Shaders**: [src/shaders/figure.vert.ts](src/shaders/figure.vert.ts) and [figure.frag.ts](src/shaders/figure.frag.ts)
- **Loader timing**: [src/components/loader/Loader.tsx](src/components/loader/Loader.tsx) — `DURATION_MS`
- **Resume**: replace [public/resume.pdf](public/resume.pdf); the nav download button and the hosted-resume link in the Links dropdown are both wired in [src/components/ui/Navigation.tsx](src/components/ui/Navigation.tsx)

## Extending

- **New sections**: add to `src/components/sections/`, mount from `src/app/page.tsx`, and register a link in `src/components/ui/Navigation.tsx`. Add a keyframe to `CAMERA_KEYFRAMES` if the camera should visit a new position.
- **Per-project 3D**: replace the generated `ArchitectureFlow` diagram in `src/components/sections/Projects.tsx` with a bespoke R3F scene.
- **Sound**: cursor and magnetic interactions expose hooks (`data-cursor`, `data-magnetic`) for `use-sound` calls on enter/leave.
- **CMS**: point `src/constants/data.ts` at Sanity, Contentlayer, or MDX — the existing types guide the shape.

## Performance

- Single, fixed, persistent R3F canvas — no re-mounts between sections
- DPR capped at 1.75 (1.4 on mobile)
- Simplex noise implemented in GLSL, not JS
- Particle field is a single `BufferGeometry` — one draw call
- Lenis disabled under `prefers-reduced-motion`
- Grain is a static SVG data-URL, not an animated shader

## Accessibility

- Semantic sections and headings
- Reduced-motion honored (Lenis disabled, animation durations collapsed)
- Custom cursor only on `pointer: fine`
- Keyboard navigation on all links

## License

MIT
