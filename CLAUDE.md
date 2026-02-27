# CLAUDE.md -- Agent Instructions

## Project Overview
**SCREAM: The Complete Catch-Up** -- A native-feel mobile PWA covering all 6 Scream movies.
See `PRD.md` for full requirements.

## Tech Stack
- **Framework:** Next.js 15 (App Router, SSG)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4 + CSS custom properties
- **Animation:** Motion (motion.dev) -- import from `motion/react`
- **WebGL:** OGL (~30KB)
- **Sound:** Howler.js (~7KB)
- **Font:** Stack Sans (Text, Headline, Notch) via `next/font` or Google Fonts
- **Images:** Sharp + next/image, all pre-cached at build time

## Key Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Production build (SSG)
npm run lint         # ESLint
npm run typecheck    # TypeScript checking
```

## Architecture Rules
1. **Zero runtime API calls.** All content is static TypeScript files in `content/`.
2. **All images pre-cached.** Posters and headshots in `public/images/`.
3. **Mobile-first.** Design for 375px width, scale up.
4. **Performance budget:** <100KB initial JS (gzipped), <2MB total images.
5. **Accessibility:** WCAG 2.1 AA. All animations respect `prefers-reduced-motion`.
6. **Theme support:** Light ("Daylight Woodsboro") + Dark ("Night in Woodsboro") modes.

## File Conventions
- Content files: `content/{category}/{movie-slug}.ts`
- Components: `src/components/{domain}/{ComponentName}.tsx`
- Hooks: `src/hooks/use{Name}.ts`
- Movie slugs: `scream-1996`, `scream-2-1997`, `scream-3-2000`, `scream-4-2011`, `scream-5-2022`, `scream-vi-2023`

## Animation Guidelines
- Use Motion (motion.dev) for all UI animations
- Spring animations for interactive elements: `{ stiffness: 400, damping: 30 }`
- Page transitions use shared layout animation
- WebGL via OGL for atmospheric effects only (performance-gated)
- Always check `prefers-reduced-motion` and provide fallbacks

## Sound Guidelines
- Use Howler.js for all interaction sounds
- Sounds muted by default (mobile convention)
- Pre-decode all audio buffers on first user gesture
- All sound files in `public/sounds/`, under 10KB each
