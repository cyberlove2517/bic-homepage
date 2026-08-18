# DESIGN.md — BIC Event Experience · Homepage Design System

Extracted from *bic branding.pdf* (17 pp) and extended for the web. Where the guide is silent, decisions follow the guide's own behavior on its website reference page (p.12).

---

## 1. Brand atmosphere

Modern noir. A dark room with one precise light source. Architectural, cinematic, restrained. Everything monochrome; drama comes from **contrast, scale, spacing, and motion** — never from color.

## 2. Color

Strictly the guide's palette, with its opacity system as the tonal scale.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#1E1E1E` | Page base (the "room") |
| `--ink-75` | `rgba(30,30,30,.75)` | — (light-mode surfaces only) |
| `--gray` | `#8C8C8C` | Secondary text, lines, dot, drawer metal |
| `--gray-75/50/30` | opacity steps | Hairlines, muted labels, inactive states |
| `--paper` | `#F2F2F2` | Primary text, logo, high-contrast moments |
| `--paper-75/50/30` | opacity steps | Body copy (75), captions (50), ghosts (30) |
| `--deep` | `#121212` | Section alternation, cabinet interior |
| `--lift` | `#2A2A2A` | Card faces, drawer fronts |

Rules:
- No hue anywhere. No gradients with color. Light effects are white/gray glows only, used sparingly (the spark, under-drawer shadows).
- One inverted (paper) section maximum — used for the "Why BIC" moment inside Services, echoing guide p.12.

## 3. Typography

The guide's typeface is **BT Swis721** (Helvetica-class grotesk, Bold + Roman). Web stand-ins:

- **Display / logo / headlines:** `Archivo` 800–900, uppercase, tight leading (0.95–1.05), tracking ≈ −0.01em. Scale: hero clamp(2.75rem→6.5rem), H2 clamp(2rem→3.5rem), H3 1.25rem.
- **Body:** `Archivo` 400/500, 1rem–1.125rem, line-height 1.6, `--paper-75`.
- **Labels / eyebrows / stats / buttons:** `Archivo` 600, uppercase, letter-spacing 0.22em–0.32em, 0.6875–0.8125rem, `--gray`.
- **Numerals:** tabular for stats; oversized (clamp 3–5rem) in 800.

Type rules: headlines max 3 lines; body max 65ch; never center body copy; eyebrows always paired with a hairline + dot (brand motif).

## 4. Layout rhythm & spacing

- Max content width `80rem`; gutters `clamp(1.25rem, 4vw, 4rem)`.
- 8px base grid; section padding `clamp(6rem, 12vw, 10rem)` vertical.
- Sections alternate `--ink` / `--deep`; transitions are straight hairlines (`--gray-30`), no curves, no waves.
- Generous emptiness is the luxury: nothing touches an edge it doesn't own.

## 5. Brand motifs (use consistently)

1. **The Dot** — the logo's period. Signature element:
   - terminates eyebrows and hairlines (a line that ends in a dot);
   - is the hero spark that escapes the box;
   - pulses on the active archive drawer;
   - marks the final "Ignite" step of the process timeline.
   - It glows only when it "activates" something. One glow per viewport, never two.
2. **The C-Arc** — large concentric arcs derived from the logo's C, rendered at 8–15% opacity, bleeding off-section. Used in featured-work placeholders, the inverted panel, and the closing CTA.
3. **The Rule** — 1px horizontal/vertical hairlines with dot terminals, echoing the guide's badges and email signature.
4. **Case-file numbering** — `FILE 001`, `DRW-03`, `15+` — the archive/catalog language that makes the noir cabinet coherent.

## 6. Buttons

- **Primary:** paper fill, ink text, uppercase micro-label, 0 radius (architectural), hairline paper border. Hover: inverts to transparent + paper text; the trailing dot in the label travels 4px. Focus: 2px paper outline offset 3px.
- **Secondary (ghost):** transparent, `--gray-75` 1px border, paper text. Hover: border brightens to paper.
- All buttons ≥ 44px touch height; no pills, no shadows, no gradients.

## 7. Cards & panels

- Service cards: `--lift` face, 1px `--gray-30` border, 0 radius, icon top-left, index number top-right (`01`–`06`). Hover: border → `--gray-75`, icon dot ignites, card lifts 2px. No shadows except a soft 24px black blur on hover.
- Cabinet drawers: matte `--lift` fronts, brushed-metal pull (horizontal bar), engraved label + file number. Open state: drawer translates toward viewer on Z (or slides down on mobile), interior `--deep`, contents fade up staggered.

## 8. Cabinet (Experience Archive) behavior

- Desktop: a 2-column × 3-row cabinet. Activating a drawer opens it with a 0.7s cubic-bezier(0.22,1,0.36,1) slide; interior reveals 2–3 case cards (thumbnail placeholder, title, category, year, YouTube link slot). One drawer open at a time; activating another closes the first (accordion logic).
- Mobile: drawers become a vertical stack of full-width accordions; same content, no Z-motion.
- Keyboard: each drawer is a `<button aria-expanded>`; contents reachable via Tab; `Esc` closes.
- Reduced motion: instant open/close, no travel.

## 9. Animation philosophy

Motion = transformation, not decoration. Premium = slow, heavy, precise.

- **Durations:** micro 0.2–0.35s; reveals 0.6–0.9s; hero sequence ≈ 4.5s total.
- **Easing:** `cubic-bezier(0.22,1,0.36,1)` (expo-out) for entrances; `power2.inOut` for the box mechanics.
- **Hero sequence:** dark scene → box edges draw in (1s) → lid lifts & walls fold down (1.2s) → B·I·C rise from inside with stagger (0.9s) → dot detaches, travels along a curved path, ignites into a spark with one soft pulse (0.8s) → headline/subline/CTAs fade-rise (0.6s). After the intro, the spark breathes at 4s intervals — the only ambient motion.
- **Scroll:** reveals trigger at 15% viewport entry, fade + 24px rise, once. No parallax on text; at most a 4% image drift inside masked frames.
- **Reduced motion:** the entire hero collapses to its final state; scroll reveals become instant; spark is static.
- Nothing loops fast; nothing bounces; nothing slides horizontally into view.

## 10. Icon style rules

Custom family, drawn at 48×48, stroke 2px, `--paper`:
- Monoline, geometric, architectural (straights + perfect arcs only).
- Each icon contains exactly **one dot** (the brand dot) placed where an idea "ignites".
- No filled shapes except the dot; no rounded-blob generic icons; consistent 4px terminal caps.
- Interim icons are coded inline SVG. Regeneration prompts live in `icon-prompts.md`.

## 11. Image treatment

- Until photography arrives: placeholders are dark tonal panels (`--deep`→`--lift` vertical wash) with the C-arc motif, a case-file number, and a category label — intentional, not broken.
- Real photos later: desaturated to −60%, contrast +10%, slight black lift; always masked in straight-edged frames; never bordered with color.

## 12. Do / Don't

**Do** — honor the 3-color palette and its opacity steps; let space carry the design; use the dot meaningfully; keep type bold, uppercase, and disciplined; number things like case files.

**Don't** — add color or gradients; use glassmorphism, pills, or soft shadows as defaults; animate more than one element per beat; use stock-style icon packs; center long copy; stack cards inside cards; neon, glow-everything, or cyberpunk cues.

## 13. Accessibility & quality floor

- Body text ≥ 4.5:1 on its surface (paper-75 on ink = 11+ ✓).
- All interactive elements: visible focus ring (paper, offset), keyboard operable, ARIA-labeled.
- `prefers-reduced-motion`: full static fallback (hero resolves to final frame).
- Semantic landmarks: `header / main / section[aria-labelledby] / footer`; one `h1`.
- Tap targets ≥ 44px; cabinet usable on a 360px viewport.
