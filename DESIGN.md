# Design Brief

## Direction

Thrill World 3D — dark cinematic amusement park immersive marketing website with bold maximalism and electric interactivity.

## Tone

Thrilling, energetic yet refined; premium tech aesthetics meet carnival drama with electric accents and precision layering.

## Differentiation

Canvas particle field hero with rotating Ferris wheel silhouette, interactive park map with color-coded ride zones, and 3D tilt pricing cards; every scroll section triggers ambient motion and depth effects.

## Color Palette

| Token      | OKLCH             | Role                          |
| ---------- | ----------------- | ----------------------------- |
| background | 0.085 0 0         | Deep void, main page bg       |
| foreground | 0.95 0 0          | Text on background            |
| card       | 0.12 0 0          | Elevated card backgrounds     |
| primary    | 0.58 0.25 282     | Electric purple, CTAs         |
| secondary  | 0.15 0 0          | Subtle elevations             |
| accent     | 0.65 0.27 200     | Neon cyan, energy highlights  |
| muted      | 0.16 0 0          | Muted text, borders           |

## Typography

- Display: Space Grotesk — bold geometric headings, hero text, thrill meter labels
- Body: DM Sans — content paragraphs, card descriptions, UI labels
- Mono: JetBrains Mono — countdown timers, data displays
- Scale: hero `text-5xl md:text-7xl font-bold`, h2 `text-3xl md:text-5xl font-bold`, label `text-xs uppercase tracking-widest`, body `text-base`

## Elevation & Depth

Layered card hierarchy with cyan/purple glows; shadow elevation `0 20px 40px`, subtle borders on card edges, dark background creates depth separation.

## Structural Zones

| Zone       | Background      | Border            | Notes                                    |
| ---------- | --------------- | ----------------- | ---------------------------------------- |
| Hero       | bg-background   | none              | Canvas particles, Ferris wheel, glows    |
| Attraction | bg-card         | border-border     | Horizontal scroll, thrill meters         |
| Map        | bg-card         | border-accent/50  | Alternate bg-muted/20 for depth         |
| Pricing    | bg-background   | none              | 3D tilt cards, countdown timer          |
| Reviews    | bg-card         | border-border     | Masonry grid, marquee effect            |
| Footer     | bg-muted/20     | border-t          | Animated skyline silhouette             |

## Spacing & Rhythm

8px base grid; section gaps `py-20 md:py-32`; card padding `p-6 md:p-8`; icon-text pairs `gap-3`; alternating light/dark section backgrounds create visual rhythm.

## Component Patterns

- Buttons: `bg-primary text-primary-foreground rounded-lg px-6 py-3 font-semibold hover:shadow-glow-purple transition-smooth`
- Cards: `bg-card border border-border rounded-lg p-6 shadow-elevation`, outlined variant uses `border-2 border-accent bg-transparent`
- Badges: `bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-mono`

## Motion

- Entrance: Intersection Observer scroll triggers, fade-in + slide-up over 600ms
- Hover: `shadow-glow-cyan`, `scale-105` on cards, `text-glow-cyan` on icons
- Decorative: Particle drift (3s), float animation on hero elements (3s infinite), pulse-glow on accents (2s infinite)

## Constraints

- Max 5 colors (background, foreground, card, primary, accent); no full-page gradients
- Canvas particles rendered at 60fps, fade out beyond viewport
- 3D transforms CPU-light: `perspective(1000px) rotateX/Y` only on hover
- No bouncy animations; all motion uses `cubic-bezier(0.4, 0, 0.2, 1)`

## Signature Detail

Glowing text overlays (cyan/purple) on dark cards with soft halo effect, reinforced by matching box-shadow glows; creates immersive, premium amusement park energy without generic gradients.
