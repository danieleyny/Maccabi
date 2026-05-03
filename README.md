# Novelution

A research administration platform site — Vite + React 19 + TypeScript, deployed to GitHub Pages with base path `/Novelution/`.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **framer-motion** for orchestrated animations and scroll reveals
- **lucide-react** for icons
- **clsx** for class composition
- **Plain CSS** with the design tokens in `src/styles/tokens.css` (no Tailwind, no CSS modules — colocated CSS files per component)
- Routes: `/` (home) and `/demo` (lazy-loaded, code-split)

## Structure

```
src/
  content/         # typed copy & data (no CMS)
  styles/          # tokens.css, base.css, motion.css
  hooks/           # useInView, useScrollSpy, useMagnetic, useReducedMotion, useCommandPalette, useScrolled
  components/
    layout/        # SiteHeader, SiteFooter, BrandLogo
    hero/          # Hero, HeroBackground, LiveSystemMock
    sections/      # ChallengeSection, LifecyclePipeline, WorkflowConsole, ModulesBento, WhyNovelution, ComparisonSplit, Testimonials, ModuleViz, ChallengeIcon
    primitives/    # Button, Chip, Card, Eyebrow, SectionHeading, HolographicBorder, Reveal, InViewRoot
    flourishes/    # CustomCursor, CommandPalette
  pages/           # Home, Demo
```

## Design system

All tokens defined as CSS custom properties on `:root` in `src/styles/tokens.css`:

- **Colors** — backgrounds, surfaces, borders, brand accents (cyan/blue/purple/teal/mint/warning/gold), text steps
- **Z-index scale** — `--z-base` (0), `--z-content` (10), `--z-overlay` (20), `--z-nav` (40), `--z-modal` (50)
- **Type scale** — fluid `clamp()` values from `--text-xs` to `--text-hero`
- **Spacing** — 4px base unit (`--space-1` … `--space-32`)
- **Radii** — 6 / 8 / 12 / 16 / 20 / 24 / pill
- **Motion** — `--ease-default`, `--ease-snap`, plus durations and stagger
- **Fonts** — Inter (body), Sora (display), JetBrains Mono (mono accent)

## Animations & accessibility

Decorative animations are gated by `IntersectionObserver` (via `InViewRoot` adding `.in-view`) so they pause off-screen, and disabled entirely under `prefers-reduced-motion: reduce`.

Custom cursor and magnetic effects only activate on `(hover: hover) and (pointer: fine)`.

Easter egg: press **N** (when no input is focused) for the command palette.

## Scripts

```bash
npm run dev       # local dev server
npm run build     # type-check + production build
npm run preview   # preview built bundle
npm run lint      # eslint
```

## Bundle

Production build: ~118kb gzipped main bundle, demo route lazy-split (~2kb).
