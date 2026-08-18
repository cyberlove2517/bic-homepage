# BIC Event Experience — Concept Homepage

A concept-level, premium homepage for **BIC Event Experience** built around one idea:
**"Thinking Outside the Box."** A sealed crate opens, **B·I·C** rise out of it, and the
brand dot escapes the box and ignites as the recurring *idea spark* — the moment of an
idea getting out. From there the page moves between two worlds: **The Future** (what we
can build for you) and **The Archive** (fifteen years of proof, filed in physical drawers).

Visual discipline: sophisticated cinematic noir — deep blacks, silver/gray, hard light,
archival numbering, physical materials. LA Noire restraint applied to a premium
event-production company. Genuine project photography is the proof layer and is always
shown in full colour.

## Run it

```bash
npm install
npm run dev        # development server
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Stack

- **Vite + React 19 + TypeScript** (homepage only, single route)
- **Tailwind CSS 4** — layout, spacing, monochrome design tokens
- **GSAP** — hero unboxing timeline + the physical archive-drawer timelines
- **Archivo** (Google Fonts) standing in for the brand's BT Swis721
- Monochrome palette only: `#1E1E1E` ink / `#8C8C8C` gray / `#F2F2F2` paper + opacity steps

## Structure

```
src/
  sections/
    Hero.tsx         # unboxing animation: crate → lid → B·I·C → dot escapes & ignites
    TrustStrip.tsx   # real client logos recovered from eventsbic.com
    Services.tsx     # six disciplines, custom isometric glyph set
    Process.tsx      # "How a thought becomes a room" — four movements
    Cabinet.tsx      # THE ARCHIVE — wall of physical filing drawers (see below)
    Cast.tsx         # THE CAST — cinematic B&W executive cast sequence (real portraits)
    FeaturedWork.tsx # "Work that left the box" — real photos, full colour
    ClosingCta.tsx   # closing invitation
    Footer.tsx
  components/icons.tsx  # BIC monoline icon family (isometric blueprint style)
  index.css             # design tokens, drawer hardware CSS, noir texture
public/assets/
  recovered/         # REAL BIC media recovered from eventsbic.com (see manifest)
    team/            # executive portraits for the Cast section
  custom/icons/      # standalone SVG exports of the six service glyphs
```

## The Archive interaction

Drawers behave like **real physical filing drawers**, not an accordion:

- The wall grid never changes height — an opened drawer projects **out toward the
  viewer** on a GSAP timeline (handle responds → face slides out → interior appears →
  dossiers rise) and overlays the drawers below it via z-index.
- Only one drawer fully open at a time; closing reverses the sequence; `Esc` closes.
- Video case files open in an **in-page lightbox** (YouTube embed), never a navigation away.
- `prefers-reduced-motion`: the hero lands on its final frame instantly and drawers
  open/close with no animation.

## Swapping in final assets

| What | Where |
|---|---|
| Service glyphs | `src/components/icons.tsx` (React) and `public/assets/custom/icons/` (standalone SVG) |
| Archive drawer content | the `drawers` array in `src/sections/Cabinet.tsx` — each file: `code`, `title`, `location`, `category`, optional `img`, optional `videoUrl` (youtu.be link; opens in lightbox) |
| Cast members / portraits | the `cast` array in `src/sections/Cast.tsx` + `public/assets/recovered/team/` (Rahaf Alotabi's real portrait pending — drop it in and add `img` to her entry) |
| Featured work photos | the `works` array in `src/sections/FeaturedWork.tsx` |
| Client logos | `public/assets/recovered/logos/` + `src/sections/TrustStrip.tsx` |
| Project photos | `public/assets/recovered/photos/` |
| SEO/GEO structured data | JSON-LD block in `index.html` |

## Documents

- `PRODUCT.md` — product framing, audience, user journey
- `DESIGN.md` — art direction, tokens, motion principles
- `icon-prompts.md` — generation prompts for the custom glyph family
- `asset-recovery-manifest.md` — every recovered asset, provenance, and replacement flags
- `IMPLEMENTATION-SUMMARY.md` — what was preserved / replaced / recovered in the
  refinement pass, plus outstanding client-side replacements
