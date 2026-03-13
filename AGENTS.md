# AGENTS.md

This file provides guidance for Cursor when working with code in this repository.

## Project

React + TypeScript interactive presentation on AI Harness Engineering, built for projector display. Frontend-only, no backend, no router. Vite dev server runs on default port 5173.

## Commands

```
pnpm dev        # start dev server
pnpm build      # type-check + production build
pnpm lint       # ESLint
pnpm format     # Prettier (also runs on afterFileEdit via .cursor/hooks)
```

## Architecture

The presentation is a flat array of slide components managed by a single index counter. Navigation (arrow keys, spacebar, nav buttons) is handled globally in `usePresentation`.

**Key files:**

- `src/slides/index.ts` — ordered array of all slide `ComponentType`s; add slides here
- `src/hooks/usePresentation.ts` — keyboard + navigation state
- `src/App.tsx` — renders current slide, overlays nav buttons and progress bar

**Slide structure:** each slide lives in `src/slides/<NN>-<topic>/`. Slides are self-contained: one `.tsx` + one co-located `.css`. No slide imports another slide.

**Adding a slide:**

1. Create `src/slides/<NN>-<topic>/YourSlide.tsx` + `YourSlide.css`
2. Export a named function component (no default exports)
3. Import and append it in `src/slides/index.ts`

## Conventions

- Named exports only (no default exports except `App`)
- Types use `import { type X }` (verbatimModuleSyntax is enabled)
- CSS custom properties from `index.css` (`--bg`, `--accent`, `--text-muted`, `--font-mono`, etc.) — use these instead of hardcoded colors
- Interactive slides use local `useState`; no global state beyond slide index
- Slides use `<SlideLayout>` + `<SlideTitle>` for consistent padding/typography
- Sizes use `clamp(min, vw, max)` so slides scale on any projector resolution
