# SCREAM: The Complete Catch-Up
## Product Requirements Document

> A native-feel mobile web app that lets fans explore all six Scream movies before Scream 7 arrives. Rich animations, immersive sound design, and deep content for every film.

---

## 1. Vision & Goals

### 1.1 Problem
Scream 7 is coming. Fans need a quick, fun, beautifully designed way to revisit (or discover) all six films in the franchise. Existing resources are Wikipedia walls-of-text or scattered YouTube recaps. Nothing feels *crafted*.

### 1.2 Product
**SCREAM: The Complete Catch-Up** is a mobile-first progressive web app that presents each Scream film as an explorable, richly animated card experience. Think Apple TV+ marketing pages meets a horror movie wiki, with the tactile feel of a native app.

### 1.3 Success Metrics
- Sub-2-second first meaningful paint on 4G connections
- 60fps animations on mid-range devices (Pixel 6a, iPhone 12)
- Zero runtime API calls (all content pre-baked)
- PWA installable on iOS and Android
- Lighthouse Performance score > 90

---

## 2. Content Architecture

### 2.1 Movie Roster

| # | Title | Year | Director | IMDB ID |
|---|-------|------|----------|---------|
| 1 | Scream | 1996 | Wes Craven | tt0117571 |
| 2 | Scream 2 | 1997 | Wes Craven | tt0120082 |
| 3 | Scream 3 | 2000 | Wes Craven | tt0134084 |
| 4 | Scream 4 | 2011 | Wes Craven | tt1262416 |
| 5 | Scream (5) | 2022 | Matt Bettinelli-Olpin & Tyler Gillett | tt11245972 |
| 6 | Scream VI | 2023 | Matt Bettinelli-Olpin & Tyler Gillett | tt17663992 |

### 2.2 Per-Movie Content Sections

Each movie is an **explorable view** with tabbed sections:

#### Tab 1: Overview
- Hero poster image (high-res, pre-cached)
- Title, year, director, runtime, rating (MPAA + IMDB score)
- Tagline
- **Quick Take** -- 1-2 sentence spoiler-free hook

#### Tab 2: Cast & Characters
- Scrollable cast grid with:
  - Character name (e.g., "Sidney Prescott")
  - Actor name (e.g., "Neve Campbell")
  - Role type badge: `LEAD` / `SUPPORTING` / `GHOSTFACE` (revealed only in spoiler sections)
  - Actor headshot (pre-cached from TMDB)
- Recurring characters highlighted with a "Franchise Regular" badge

#### Tab 3: The Story (Spoiler-Free)
- 3-4 paragraph summary that sets the scene, introduces the stakes, and teases the mystery without revealing Ghostface's identity
- Written in an engaging, conversational tone -- not dry synopsis
- Includes character names with actor names in parentheses on first mention
- Key themes and tone descriptors

#### Tab 4: The Full Story (Spoilers)
- **Gated behind a spoiler warning** with a dramatic reveal animation
- Complete plot breakdown including:
  - Opening kill sequence
  - Investigation and misdirects
  - Ghostface reveal and motive
  - Final confrontation and resolution
  - Post-credits / sequel hooks
- 8-12 paragraphs, richly detailed
- Character names with actor names woven throughout

#### Tab 5: Legacy
- Box office numbers
- Critical reception snapshot
- Cultural impact notes (meta-commentary on horror tropes, etc.)
- Connection to other films in the franchise (timeline/continuity)

### 2.3 Content Data Source Strategy

**Primary:** TMDB API (The Movie Database) -- free, well-documented, excellent image CDN
- Endpoint: `https://api.themoviedb.org/3/movie/{id}`
- Cast: `https://api.themoviedb.org/3/movie/{id}/credits`
- Images: `https://image.tmdb.org/t/p/{size}/{path}`

**Secondary/Supplementary:** imdbapi.dev
- Endpoint: `https://imdbapi.dev/movie/{imdb_id}`
- Used for cross-referencing and additional metadata

**Tertiary:** Web research for summaries, cultural context, and editorial content

**Image Pipeline:**
- All poster images: download at build time, optimize with Sharp, serve as WebP + AVIF with LQIP (Low Quality Image Placeholder)
- All actor headshots: download at build time, crop to consistent aspect ratio, optimize
- Store in `/public/images/` with deterministic filenames
- **Zero runtime image fetches to external CDNs**

---

## 3. Design System

### 3.1 Typography

**Primary Font:** [Stack Sans](https://fonts.google.com/specimen/Stack+Sans+Text) from Google Fonts
- **Stack Sans Headline** -- Movie titles, section headers, hero text
- **Stack Sans Text** -- Body copy, summaries, UI labels
- **Stack Sans Notch** -- Accent/decorative use (pull quotes, Ghostface dialogue)

```
Font Scale (mobile):
  --fs-xs:    0.75rem  / 12px   (badges, captions)
  --fs-sm:    0.875rem / 14px   (metadata, labels)
  --fs-base:  1rem     / 16px   (body text)
  --fs-lg:    1.25rem  / 20px   (section titles)
  --fs-xl:    1.5rem   / 24px   (movie titles in list)
  --fs-2xl:   2rem     / 32px   (hero movie title)
  --fs-3xl:   2.5rem   / 40px   (splash/brand text)
```

### 3.2 Color System

#### Light Mode -- "Daylight Woodsboro"
```
  --bg-primary:      #FAFAF8      (warm off-white)
  --bg-secondary:    #F0EEEA      (card backgrounds)
  --bg-tertiary:     #E5E2DC      (pressed states)
  --text-primary:    #1A1A1A      (near-black)
  --text-secondary:  #5C5C5C      (muted labels)
  --accent:          #C41E1E      (Scream red -- blood)
  --accent-hover:    #A01818
  --accent-subtle:   #FDE8E8      (red tint for badges)
  --border:          #D4D0CA
  --shadow:          rgba(0,0,0,0.08)
```

#### Dark Mode -- "Night in Woodsboro"
```
  --bg-primary:      #0A0A0A      (near-black)
  --bg-secondary:    #161616      (card backgrounds)
  --bg-tertiary:     #222222      (pressed states)
  --text-primary:    #EDEDEB      (warm white)
  --text-secondary:  #9A9A9A      (muted labels)
  --accent:          #E63636      (brighter red for dark bg)
  --accent-hover:    #FF4D4D
  --accent-subtle:   #2A1010      (dark red tint)
  --border:          #2A2A2A
  --shadow:          rgba(0,0,0,0.4)
```

#### Semantic Colors
```
  --spoiler-gate:    #FFD700      (gold warning)
  --franchise-badge: #4A90D9      (blue for recurring chars)
  --ghostface-tag:   var(--accent) (red for killer reveal)
  --safe-badge:      #2D8F47      (green for spoiler-free)
```

### 3.3 Motion & Animation Specification

**Library:** [Motion](https://motion.dev) (v11+, formerly Framer Motion)

#### Global Motion Tokens
```
  --ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1)
  --ease-in-out:      cubic-bezier(0.65, 0, 0.35, 1)
  --duration-instant:  80ms
  --duration-fast:    150ms
  --duration-normal:  300ms
  --duration-slow:    500ms
  --duration-dramatic: 800ms
  --spring-snappy:    { stiffness: 400, damping: 30 }
  --spring-bouncy:    { stiffness: 300, damping: 20 }
  --spring-gentle:    { stiffness: 200, damping: 25 }
```

#### Animation Catalog

| Element | Animation | Duration | Easing | Details |
|---------|-----------|----------|--------|---------|
| **Page Transition** | Shared layout + crossfade | 400ms | ease-out-expo | Poster morphs from grid to hero |
| **Tab Switch** | Content slides L/R + fade | 300ms | spring-snappy | Direction matches tab position |
| **Card Press** | Scale to 0.97 + shadow reduce | 150ms | ease-out | Native iOS press-down feel |
| **Card Release** | Spring back to 1.0 | 300ms | spring-bouncy | Slight overshoot for delight |
| **Spoiler Reveal** | Blur(20px) -> blur(0) + scale | 800ms | ease-in-out | Dramatic content un-blur |
| **Cast Grid** | Staggered fade-up | 50ms stagger | spring-gentle | Each card enters with slight delay |
| **Bottom Sheet** | Slide up from bottom + backdrop | 400ms | spring-snappy | Native iOS sheet feel |
| **Pull-to-refresh** | Rubber band + spin | physics-based | spring | Overscroll resistance |
| **Poster Parallax** | translateY at 0.3x scroll rate | per-frame | linear | Subtle depth on scroll |
| **Ghostface Mask** | SVG path morph + glow pulse | 2000ms | ease-in-out | Idle animation on home screen |
| **Theme Toggle** | Circular reveal from toggle point | 500ms | ease-out-expo | Expanding circle clip-path |
| **Skeleton Loader** | Shimmer gradient sweep | 1500ms | linear | Left-to-right shine while loading |

#### WebGL Layer
**Library:** OGL (lightweight, ~25KB gzipped) or raw WebGL

Used for:
- **Background atmosphere:** Subtle fog/particle effect on home screen that shifts between films (warm amber for older films, cold blue for newer ones)
- **Spoiler reveal:** Glitch/static TV effect when unlocking spoiler content
- **Transition effect:** Knife-slash wipe transition between movies (optional, performance-gated)

Performance contract:
- WebGL canvas renders at device pixel ratio capped at 2x
- Falls back to CSS gradient animation on low-end devices
- `prefers-reduced-motion` disables WebGL entirely, uses simple fades

### 3.4 Interaction Sound Design

**Engine:** Web Audio API with pre-decoded AudioBuffer pool

#### Sound Palette

| Interaction | Sound | File | Duration |
|-------------|-------|------|----------|
| **Card tap** | Soft tactile click | `tap.wav` | 30ms |
| **Tab switch** | Quick woody tick | `tick.wav` | 40ms |
| **Spoiler unlock** | Eerie whoosh + static burst | `spoiler-reveal.wav` | 400ms |
| **Sheet open** | Rising tone blip | `sheet-up.wav` | 120ms |
| **Sheet close** | Falling tone blip | `sheet-down.wav` | 100ms |
| **Theme toggle** | Two-tone switch click | `toggle.wav` | 60ms |
| **Back navigation** | Soft reverse swoosh | `back.wav` | 80ms |
| **Error/warning** | Low buzz | `warn.wav` | 150ms |
| **Franchise badge** | Achievement chime | `badge.wav` | 200ms |
| **Phone ring** | Classic horror movie ring (Easter egg) | `ring.wav` | 1500ms |

**Implementation Notes:**
- All sounds generated procedurally at build time using Tone.js or pre-recorded and stored as base64-encoded WAV in a sound sprite
- Master volume control in settings
- Muted by default (respects mobile conventions), with a "Enable Sound" prompt on first interaction
- Sounds are 44.1kHz mono, 16-bit, kept under 10KB each
- Pre-decode all AudioBuffers on first user gesture
- `prefers-reduced-motion` also mutes sounds by default

### 3.5 Native Feel Specifications

#### Tap Feedback
```
Material Ripple:
  - Ripple origin: touch point coordinates
  - Ripple color: currentColor at 12% opacity
  - Ripple duration: 400ms ease-out
  - Scale: from 0 to covering element bounds
  - Containment: overflow hidden on parent

Press Animation:
  - Scale: 1.0 -> 0.97 on touchstart (150ms ease-out)
  - Scale: 0.97 -> 1.0 on touchend (300ms spring)
  - Background: shift to --bg-tertiary on press
  - Combine with haptic feedback where available
```

#### Haptic Feedback
```javascript
// Light tap
navigator.vibrate?.(10);
// Medium (tab switch)
navigator.vibrate?.(20);
// Heavy (spoiler reveal)
navigator.vibrate?.([30, 50, 30]);
```

#### Scroll Behavior
- Smooth momentum scrolling (`-webkit-overflow-scrolling: touch`)
- Overscroll rubber-banding on pull
- Scroll-linked header collapse (64px -> 44px) with title fade-in
- Sticky tab bar with blur backdrop (`backdrop-filter: blur(20px)`)

#### Safe Areas
```css
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
padding-right: env(safe-area-inset-right);
```

---

## 4. Technical Architecture

### 4.1 Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js 15 (App Router) | SSG for zero-runtime API calls, image optimization, PWA support |
| **Language** | TypeScript 5.x | Type safety for content schema, component props |
| **Styling** | Tailwind CSS 4 + CSS custom properties | Utility-first with design token integration |
| **Animation** | Motion (motion.dev) v11+ | Layout animations, shared element transitions, gesture handling |
| **WebGL** | OGL | Lightweight (25KB), good mobile perf, simple API |
| **Sound** | Howler.js + Web Audio API | 7KB, auto-handles mobile autoplay quirks, audio sprites |
| **Font** | Stack Sans (Google Fonts) | Variable font, optimized loading via `next/font` |
| **Images** | Sharp + next/image | Build-time optimization, AVIF/WebP, blur placeholders |
| **PWA** | next-pwa / Serwist | Service worker, offline support, install prompt |
| **Data** | Static JSON + TypeScript types | Content as code, type-checked at build time |
| **Deployment** | Vercel / Cloudflare Pages | Edge-optimized, automatic HTTPS, global CDN |

### 4.2 Project Structure

```
screams/
├── PRD.md                          # This document
├── CLAUDE.md                       # Agent instructions
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
│
├── content/
│   ├── movies.ts                   # Master movie data (typed)
│   ├── cast/
│   │   ├── scream-1996.ts
│   │   ├── scream-2-1997.ts
│   │   ├── scream-3-2000.ts
│   │   ├── scream-4-2011.ts
│   │   ├── scream-5-2022.ts
│   │   └── scream-vi-2023.ts
│   ├── summaries/
│   │   ├── scream-1996.ts          # { short, spoilerFree, full }
│   │   ├── scream-2-1997.ts
│   │   ├── scream-3-2000.ts
│   │   ├── scream-4-2011.ts
│   │   ├── scream-5-2022.ts
│   │   └── scream-vi-2023.ts
│   └── legacy/
│       ├── scream-1996.ts          # Box office, reception, impact
│       └── ...
│
├── public/
│   ├── images/
│   │   ├── posters/                # Pre-optimized movie posters
│   │   │   ├── scream-1996.webp
│   │   │   ├── scream-1996.avif
│   │   │   └── ...
│   │   ├── cast/                   # Actor headshots
│   │   │   ├── neve-campbell.webp
│   │   │   └── ...
│   │   └── misc/                   # Ghostface mask, backgrounds
│   ├── sounds/
│   │   ├── tap.wav
│   │   ├── tick.wav
│   │   ├── spoiler-reveal.wav
│   │   ├── sheet-up.wav
│   │   ├── sheet-down.wav
│   │   ├── toggle.wav
│   │   ├── back.wav
│   │   ├── warn.wav
│   │   ├── badge.wav
│   │   └── ring.wav
│   ├── manifest.json
│   └── icons/                      # PWA icons
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (font loading, theme)
│   │   ├── page.tsx                # Home -- movie poster grid
│   │   ├── movie/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx        # Movie detail (tabbed view)
│   │   │       └── loading.tsx     # Skeleton loader
│   │   └── globals.css             # Design tokens, base styles
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Ripple.tsx          # Material ripple effect
│   │   │   ├── Pressable.tsx       # Press-down animation wrapper
│   │   │   ├── BottomSheet.tsx     # Native-feel bottom sheet
│   │   │   ├── TabBar.tsx          # Animated tab switcher
│   │   │   ├── SpoilerGate.tsx     # Blur + unlock animation
│   │   │   ├── Badge.tsx           # Role/status badges
│   │   │   ├── Skeleton.tsx        # Shimmer loading skeleton
│   │   │   └── ThemeToggle.tsx     # Light/dark with circle reveal
│   │   │
│   │   ├── home/
│   │   │   ├── MovieGrid.tsx       # Poster grid with staggered entry
│   │   │   ├── MovieCard.tsx       # Individual poster card
│   │   │   ├── HomeHeader.tsx      # Brand header with Ghostface
│   │   │   └── AtmosphereCanvas.tsx # WebGL background
│   │   │
│   │   ├── movie/
│   │   │   ├── MovieHero.tsx       # Full-bleed poster + title
│   │   │   ├── OverviewTab.tsx     # Quick take + metadata
│   │   │   ├── CastTab.tsx         # Cast grid
│   │   │   ├── CastCard.tsx        # Individual cast member
│   │   │   ├── StoryTab.tsx        # Spoiler-free summary
│   │   │   ├── SpoilerTab.tsx      # Full plot with gate
│   │   │   └── LegacyTab.tsx       # Box office, cultural impact
│   │   │
│   │   └── layout/
│   │       ├── MobileNav.tsx       # Bottom navigation (if needed)
│   │       └── SafeArea.tsx        # Safe area inset wrapper
│   │
│   ├── hooks/
│   │   ├── useSound.ts            # Web Audio API hook
│   │   ├── useHaptic.ts           # Vibration API hook
│   │   ├── useTheme.ts            # Theme toggle with persistence
│   │   ├── useReducedMotion.ts    # prefers-reduced-motion hook
│   │   └── usePrefersColorScheme.ts # System theme detection
│   │
│   ├── lib/
│   │   ├── sounds.ts              # Sound sprite definitions
│   │   ├── animations.ts          # Shared motion variants
│   │   ├── webgl/
│   │   │   ├── atmosphere.ts      # Fog/particle shader
│   │   │   └── glitch.ts          # TV static shader
│   │   └── utils.ts               # Helpers
│   │
│   └── types/
│       ├── movie.ts               # Movie, Cast, Summary types
│       └── theme.ts               # Theme type definitions
│
├── scripts/
│   ├── fetch-content.ts           # TMDB API -> content/ files
│   ├── fetch-images.ts            # Download + optimize images
│   ├── generate-sounds.ts         # Procedural sound generation
│   └── validate-content.ts        # Ensure all content is complete
│
└── tests/
    ├── content.test.ts            # Content completeness checks
    └── accessibility.test.ts      # a11y automated tests
```

### 4.3 Content Data Types

```typescript
// types/movie.ts

export interface Movie {
  id: string;                       // e.g., "scream-1996"
  slug: string;                     // URL slug
  title: string;                    // "Scream"
  year: number;                     // 1996
  director: string;                 // "Wes Craven"
  runtime: number;                  // 111 (minutes)
  rating: string;                   // "R"
  imdbScore: number;               // 7.4
  imdbId: string;                  // "tt0117571"
  tmdbId: number;                  // 4232
  tagline: string;                 // "Someone has taken their love..."
  posterPath: string;              // "/images/posters/scream-1996.webp"
  posterBlurHash: string;          // LQIP base64
  franchiseOrder: number;          // 1-6
}

export interface CastMember {
  actorName: string;               // "Neve Campbell"
  characterName: string;           // "Sidney Prescott"
  role: 'lead' | 'supporting' | 'cameo';
  isGhostface: boolean;           // Only shown in spoiler tab
  isFranchiseRegular: boolean;    // Appears in 2+ films
  headshot: string;                // "/images/cast/neve-campbell.webp"
  headshotBlurHash: string;
}

export interface MovieSummaries {
  quickTake: string;               // 1-2 sentences, spoiler-free
  spoilerFree: string;             // 3-4 paragraphs, no reveals
  fullPlot: string;                // 8-12 paragraphs, full spoilers
}

export interface MovieLegacy {
  boxOffice: {
    budget: string;                // "$15 million"
    domestic: string;              // "$103 million"
    worldwide: string;             // "$173 million"
  };
  criticalReception: string;       // Paragraph on reviews
  culturalImpact: string;          // Paragraph on legacy
  franchiseConnections: string[];  // Bullet points
}

export interface MovieComplete {
  movie: Movie;
  cast: CastMember[];
  summaries: MovieSummaries;
  legacy: MovieLegacy;
}
```

---

## 5. Screen-by-Screen Specification

### 5.1 Home Screen -- "The Franchise"

```
┌─────────────────────────────────┐
│  ╔═══════════════════════════╗  │
│  ║   [Ghostface SVG Mask]    ║  │
│  ║                           ║  │
│  ║   SCREAM                  ║  │
│  ║   The Complete Catch-Up   ║  │
│  ║                           ║  │
│  ║   [🌙 Theme Toggle]      ║  │
│  ╚═══════════════════════════╝  │
│                                 │
│  ┌──────────┐  ┌──────────┐    │
│  │          │  │          │    │
│  │  SCREAM  │  │ SCREAM 2 │    │
│  │  (1996)  │  │  (1997)  │    │
│  │          │  │          │    │
│  │  ★ 7.4   │  │  ★ 6.2   │    │
│  └──────────┘  └──────────┘    │
│                                 │
│  ┌──────────┐  ┌──────────┐    │
│  │          │  │          │    │
│  │ SCREAM 3 │  │ SCREAM 4 │    │
│  │  (2000)  │  │  (2011)  │    │
│  │          │  │          │    │
│  │  ★ 5.5   │  │  ★ 6.2   │    │
│  └──────────┘  └──────────┘    │
│                                 │
│  ┌──────────┐  ┌──────────┐    │
│  │          │  │          │    │
│  │ SCREAM   │  │SCREAM VI │    │
│  │  (2022)  │  │  (2023)  │    │
│  │          │  │          │    │
│  │  ★ 6.4   │  │  ★ 6.3   │    │
│  └──────────┘  └──────────┘    │
│                                 │
│  ─────────────────────────────  │
│  "What's your favorite         │
│   scary movie?"                │
│  ─────────────────────────────  │
│                                 │
│       [Scream 7 Teaser]        │
│       Coming 2025              │
│                                 │
└─────────────────────────────────┘
```

**Behaviors:**
- WebGL atmospheric fog behind poster grid (performance-gated)
- Posters enter with staggered spring animation (50ms offset per card)
- Each poster has subtle parallax on scroll
- Tapping a poster: press-down scale (0.97), ripple, then shared element transition to movie detail
- Ghostface SVG has idle breathing/glow animation
- Theme toggle triggers circular reveal animation from toggle position
- Pull-to-refresh has custom rubber band with Ghostface mask icon
- Bottom of page has a Scream 7 teaser banner with pulsing "Coming Soon"

### 5.2 Movie Detail Screen

```
┌─────────────────────────────────┐
│  [← Back]              [⋮ More]│
│                                 │
│  ┌─────────────────────────────┐│
│  │                             ││
│  │      [POSTER IMAGE]        ││
│  │      (parallax scroll)     ││
│  │                             ││
│  │    S C R E A M              ││
│  │    1996 · R · 111min        ││
│  │    Dir. Wes Craven          ││
│  │    ★ 7.4/10                 ││
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ Overview│ Cast │Story│Spoil ││
│  │ ════════                    ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │                             ││
│  │  [Tab Content Area]         ││
│  │                             ││
│  │  Content slides left/right  ││
│  │  based on tab direction     ││
│  │                             ││
│  │                             ││
│  │                             ││
│  │                             ││
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
│  ┌──────────────────────────────┐
│  │ ← Prev Movie  Next Movie → ││
│  └──────────────────────────────┘
└─────────────────────────────────┘
```

**Tab Bar Behavior:**
- Sticky below header on scroll
- Active tab indicator slides with spring animation
- Tab switch: content area slides horizontally matching direction
- Tab text has color transition on active state
- Sound: `tick.wav` on tab change
- Haptic: light vibration on tab change

**Navigation:**
- Back button: slide-right exit transition + `back.wav`
- Poster shared element: morphs from grid position to hero position
- Swipe left/right on content area: switch tabs
- Bottom "Prev/Next Movie" bar: navigate between films in franchise order

### 5.3 Spoiler Gate

```
┌─────────────────────────────────┐
│                                 │
│  ┌─────────────────────────────┐│
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░ ││
│  │ ░░░░░░ BLURRED TEXT ░░░░░░ ││
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░ ││
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░ ││
│  │                             ││
│  │     ⚠  SPOILER WARNING      ││
│  │                             ││
│  │  This section reveals who   ││
│  │  is behind the Ghostface    ││
│  │  mask. Are you sure?        ││
│  │                             ││
│  │  ┌───────────────────────┐  ││
│  │  │   REVEAL THE KILLER   │  ││
│  │  └───────────────────────┘  ││
│  │                             ││
│  │  (tap to read at your       ││
│  │   own risk)                 ││
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

**Reveal Animation Sequence (800ms total):**
1. Button press: scale down + haptic heavy buzz
2. Glitch/static WebGL overlay flashes (200ms)
3. Sound: `spoiler-reveal.wav` plays
4. Blur filter animates from 20px to 0px
5. Content scales from 0.95 to 1.0
6. Red accent border pulses once

---

## 6. Accessibility

### 6.1 Requirements
- WCAG 2.1 AA compliance minimum
- All images have descriptive alt text
- Keyboard navigation for all interactive elements
- Focus indicators visible in both themes
- Screen reader announcements for tab switches
- `prefers-reduced-motion`: disable all animations, use simple cuts
- `prefers-color-scheme`: auto-detect system theme on first visit
- Spoiler gate is keyboard-accessible (Enter/Space to reveal)
- Color contrast ratios: minimum 4.5:1 for text, 3:1 for large text
- Touch targets: minimum 44x44px

### 6.2 Reduced Motion Behavior
When `prefers-reduced-motion: reduce` is active:
- All spring/physics animations become instant opacity transitions
- Page transitions become simple crossfades (200ms)
- WebGL canvas is hidden
- Parallax effects disabled
- Sound effects muted by default
- Spoiler reveal becomes a simple fade (no glitch effect)

---

## 7. Performance Budget

| Metric | Target | Strategy |
|--------|--------|----------|
| **First Contentful Paint** | < 1.2s | SSG, font preload, LQIP |
| **Largest Contentful Paint** | < 2.0s | Optimized poster images, priority hints |
| **Cumulative Layout Shift** | < 0.05 | Fixed aspect ratios, font-display: swap |
| **Total Blocking Time** | < 200ms | Lazy load WebGL, defer sounds |
| **JS Bundle (initial)** | < 100KB gz | Code split per route, tree shake |
| **Image total (all movies)** | < 2MB | AVIF primary, WebP fallback, aggressive optimization |
| **Sound sprites total** | < 50KB | Mono WAV, 44.1kHz, short durations |
| **WebGL shader** | < 5KB | Minimal fragment shaders |
| **Lighthouse Score** | > 90 | All categories |

---

## 8. Agent Orchestration Plan

This project is built by **5 specialized agents** working in coordination. Each agent has a clear scope, defined inputs/outputs, and handoff points.

### Agent 1: Content Researcher
**Scope:** Gather, write, and validate all movie content

**Tasks:**
1. Query TMDB API for each movie: metadata, cast, images
2. Cross-reference with IMDB data via imdbapi.dev
3. Write `quickTake` for each movie (1-2 sentences, spoiler-free, engaging)
4. Write `spoilerFree` summary for each movie (3-4 paragraphs, conversational tone, character names with actor names in parens)
5. Write `fullPlot` for each movie (8-12 paragraphs, complete spoilers, Ghostface reveal, all major beats)
6. Compile `legacy` data: box office numbers, critical reception, cultural impact, franchise connections
7. Write cast data: character name, actor name, role classification, franchise regular flags
8. Validate all content for completeness and accuracy

**Outputs:**
- `content/movies.ts` -- master movie metadata
- `content/cast/*.ts` -- per-movie cast data
- `content/summaries/*.ts` -- per-movie summaries
- `content/legacy/*.ts` -- per-movie legacy data

**Dependencies:** None (can start immediately)

### Agent 2: Asset Pipeline
**Scope:** Download, optimize, and prepare all static assets

**Tasks:**
1. Download high-res movie posters from TMDB (original + w780 size)
2. Download actor headshots from TMDB (w185 size)
3. Optimize all images: convert to WebP + AVIF, generate LQIP blur hashes
4. Generate procedural sound effects using Tone.js (or source royalty-free WAVs)
5. Create Ghostface SVG mask asset with animation-ready path data
6. Create PWA icons at all required sizes (192x192, 512x512, maskable)
7. Create favicon set (ico, svg, apple-touch-icon)
8. Validate all assets exist and are within size budgets

**Outputs:**
- `public/images/posters/*.{webp,avif}`
- `public/images/cast/*.webp`
- `public/images/misc/ghostface-mask.svg`
- `public/sounds/*.wav`
- `public/icons/*`
- `public/manifest.json`

**Dependencies:** Agent 1 (needs cast list for headshot downloads)

### Agent 3: Design System & Core UI
**Scope:** Build the foundational design system, theme engine, and reusable components

**Tasks:**
1. Initialize Next.js 15 project with TypeScript, Tailwind CSS 4, Motion
2. Configure `next/font` for Stack Sans (Headline, Text, Notch variants)
3. Implement CSS custom property design tokens (colors, typography, spacing, motion)
4. Build theme engine: `useTheme` hook, `ThemeProvider`, system detection, localStorage persistence
5. Build `Ripple` component (Material tap effect)
6. Build `Pressable` component (press-down scale animation wrapper)
7. Build `BottomSheet` component (spring-animated sheet with backdrop)
8. Build `TabBar` component (animated tab indicator, swipe support)
9. Build `SpoilerGate` component (blur + WebGL glitch reveal)
10. Build `Badge` component (role badges, franchise badges)
11. Build `Skeleton` component (shimmer loading state)
12. Build `ThemeToggle` component (circular reveal animation)
13. Build `SafeArea` layout wrapper
14. Implement `useSound` hook (Web Audio API, buffer pool, volume control)
15. Implement `useHaptic` hook (Vibration API wrapper)
16. Implement `useReducedMotion` hook
17. Define shared Motion animation variants in `lib/animations.ts`

**Outputs:**
- Full `src/components/ui/` directory
- `src/hooks/` directory
- `src/lib/animations.ts`
- `src/lib/sounds.ts`
- `src/app/globals.css` with design tokens
- `src/app/layout.tsx` with font + theme setup

**Dependencies:** None (can start immediately, works against mocked data)

### Agent 4: WebGL & Advanced Effects
**Scope:** Build the WebGL atmospheric layer and advanced visual effects

**Tasks:**
1. Set up OGL with React integration (canvas component, resize handling)
2. Write atmospheric fog/particle fragment shader for home screen
3. Implement color-shifting based on which movie is in viewport (warm -> cold)
4. Write TV static/glitch fragment shader for spoiler reveal
5. Build knife-slash transition shader (optional, performance-gated)
6. Implement performance detection: benchmark on mount, disable WebGL if < 30fps
7. Implement `prefers-reduced-motion` fallback (CSS gradients instead)
8. Build `AtmosphereCanvas` React component
9. Build `GlitchOverlay` React component
10. Test on mid-range devices, cap pixel ratio at 2x

**Outputs:**
- `src/lib/webgl/atmosphere.ts`
- `src/lib/webgl/glitch.ts`
- `src/components/home/AtmosphereCanvas.tsx`
- `src/components/movie/GlitchOverlay.tsx`

**Dependencies:** Agent 3 (needs theme tokens for color values)

### Agent 5: App Assembly & Integration
**Scope:** Wire everything together into the final application

**Tasks:**
1. Build Home page (`src/app/page.tsx`):
   - Movie poster grid with staggered animation
   - Ghostface header with idle animation
   - WebGL atmosphere background
   - Pull-to-refresh (PWA feel)
   - Scream 7 teaser footer
2. Build Movie Detail page (`src/app/movie/[slug]/page.tsx`):
   - Shared element poster transition from grid
   - Hero section with parallax
   - Tabbed content (Overview, Cast, Story, Spoilers, Legacy)
   - Tab swipe gestures
   - Prev/Next movie navigation
3. Build Overview tab content
4. Build Cast tab with grid layout and staggered entry
5. Build Story tab (spoiler-free summary)
6. Build Spoiler tab with gate + reveal animation
7. Build Legacy tab
8. Wire all sound effects to interactions
9. Wire haptic feedback to interactions
10. Implement page transitions (shared layout animation)
11. Add PWA manifest and service worker
12. Implement skeleton loading states
13. Test full flow: home -> movie -> tabs -> spoiler reveal -> next movie -> home
14. Performance audit and optimization pass
15. Accessibility audit and fixes
16. Cross-browser testing (Safari, Chrome, Firefox on mobile)

**Outputs:**
- Complete `src/app/` pages
- Complete `src/components/home/` and `src/components/movie/` directories
- PWA configuration
- Working, deployable application

**Dependencies:** Agents 1, 2, 3, 4 (needs content, assets, components, WebGL)

### Agent Execution Timeline

```
Phase 1 (Parallel):
  ├── Agent 1: Content Researcher ──────────────────────►
  ├── Agent 3: Design System & Core UI ─────────────────►
  │
Phase 2 (After Agent 1 delivers cast list):
  ├── Agent 2: Asset Pipeline ──────────────────────────►
  │
Phase 3 (After Agent 3 delivers theme tokens):
  ├── Agent 4: WebGL & Advanced Effects ────────────────►
  │
Phase 4 (After Agents 1-4 complete):
  └── Agent 5: App Assembly & Integration ──────────────►

Integration checkpoints:
  • After Phase 1: Content data types validated, design tokens finalized
  • After Phase 2: All static assets in place, image paths verified
  • After Phase 3: WebGL components render correctly with theme
  • After Phase 4: Full app assembled, end-to-end testing
```

---

## 9. Content Guide -- Tone & Voice

### Writing Style for Summaries
- **Quick Takes:** Punchy, intriguing, makes you want to read more. Like a friend telling you "oh you HAVE to see this one."
- **Spoiler-Free:** Engaging narrative that captures the movie's atmosphere. Present tense. Sets the scene vividly. Names characters with actors: "Sidney Prescott (Neve Campbell) is just trying to survive senior year..."
- **Full Plot:** Detailed and dramatic. Doesn't shy away from the horror. Covers every major plot beat. The reader should feel like they watched the movie.
- **Legacy:** Analytical but accessible. What made this movie matter? How did it change horror?

### Character Name Convention
First mention: `Sidney Prescott (Neve Campbell)`
Subsequent: `Sidney` or `Prescott` (whichever fits the tone)

---

## 10. Edge Cases & Error States

### Offline Behavior (PWA)
- All content and images cached via service worker
- App works fully offline after first visit
- No "offline" error states needed (no runtime API calls)

### Image Failures
- LQIP blur placeholder shown during lazy load
- If an image file is corrupted/missing at build time: build script fails with descriptive error
- Alt text always present as fallback

### WebGL Failure
- Feature detection before initializing WebGL context
- Graceful fallback to CSS gradient backgrounds
- No error state shown to user

### Theme Persistence
- Theme stored in `localStorage`
- On first visit: detect `prefers-color-scheme` from system
- Theme toggle is always accessible from home screen header

---

## 11. Future Considerations (Out of Scope for V1)

- **Scream 7 content:** Add when movie releases (content structure already supports it)
- **Quiz mode:** "Which Ghostface are you?" personality quiz
- **Timeline view:** Horizontal scrollable franchise timeline
- **Trivia cards:** Behind-the-scenes facts for each movie
- **Social sharing:** Share your favorite movie card as an image
- **Push notifications:** Notify when Scream 7 content is added
- **Soundtrack integration:** Embedded clips from Marco Beltrami's scores
- **Kill count tracker:** Interactive visualization of franchise body count
- **Connections map:** Visual graph of character relationships across films

---

## 12. Definition of Done

- [ ] All 6 movies have complete content (metadata, cast, all 3 summary tiers, legacy)
- [ ] All images pre-cached (posters, headshots) with optimized formats
- [ ] Home screen renders poster grid with staggered animation
- [ ] Movie detail screen has 5 working tabs with animated transitions
- [ ] Spoiler gate blocks full plot until user confirms
- [ ] Light and dark themes work correctly with circular reveal toggle
- [ ] Sound effects play on all specified interactions
- [ ] Haptic feedback fires on supported devices
- [ ] WebGL atmosphere renders on capable devices, falls back gracefully
- [ ] `prefers-reduced-motion` disables animations and sounds
- [ ] PWA installable with offline support
- [ ] Lighthouse Performance > 90
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Works on Safari iOS 16+, Chrome Android 10+, Firefox mobile
- [ ] All content is factually accurate and well-written
- [ ] Zero runtime API calls
- [ ] Total initial JS bundle < 100KB gzipped
