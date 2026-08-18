# Implementation Summary — Refinement Pass

Scope: interaction and art-direction refinement only. The approved structure —
hero, trust strip, services, process, archive, featured work, closing CTA, footer —
was **not** redesigned. Page hierarchy, navigation, section order, typography scale
and archive categories are unchanged.

## 1. Hero — cinematic impact increased

- **Box ~28% more visually dominant** (SVG max width 19–26rem → 23–32rem); headline
  clamp trimmed slightly (4.25rem → 3.9rem) so the scene still fits one viewport.
- **Reveal slowed ~15%** (`timeline.timeScale(0.85)`).
- **Distinct beat before the headline**: the headline is now its own timeline target —
  ignition → a held pause → headline lands → supporting copy follows.
- **The dot visibly separates from the logo and ends OUTSIDE the box**: it rises out of
  the crate, arcs past the "C" and settles clearly apart from the wordmark, where it
  ignites as the idea spark. No lightbulb imagery anywhere.
- The reduced-motion default frame now matches the animated end state exactly.
- Motion stays restrained and physically plausible (single lid rotation, eased arcs,
  one glow pulse, slow ambient breathing).

## 2. Services — glyph-forward hover

- Layout untouched; six disciplines unchanged.
- Custom isometric BIC glyphs in place (64×64 grid, 1.5px strokes, one brand dot each),
  icon presence increased (12 → 14 tailwind size units).
- **Hover animates the glyph and its dot only** — the glyph lifts/scales slightly and
  the dot pulses; the card itself never moves (subtle background shift only).
- Monochrome throughout.

## 3. Experience Archive — CRITICAL interaction change

The accordion behavior (row expands vertically, content appears underneath) was
**removed**. The interaction now simulates a real physical filing drawer:

- **Closed**: drawer sits aligned inside the two-column wall.
- **Hover**: handle/metal highlight shifts; drawer translates forward 3px (via the
  composable CSS `translate` property so it never fights GSAP's `transform`); cursor
  indicates interactivity.
- **Click**: GSAP timeline with perspective on the drawer unit —
  `0.00–0.15s` handle response → `0.10–0.55s` face slides outward toward the viewer
  → `0.35–0.70s` interior (tray + side walls) appears → `0.48–0.80s` case cards
  stagger upward 26px → cards interactive.
- **The grid is spatially stable**: the tray is an absolute overlay — grid height
  measured 352px before and after opening (672px on mobile). No layout shift.
- **Open drawers overlap the drawers below** by design (z-index 30 on the open unit),
  like a real pulled drawer. Closing reverses the sequence at 1.35× speed.
- Only one drawer fully open at a time (verified: opening DRW-02 closes DRW-01);
  `Esc` closes.
- Drawer hardware (rivets, label holder, pull handle, brushed-steel face, tray side
  walls) is reconstructed in CSS from the client's wide-drawer imagery as **form and
  material reference only** — all text (DRW numbers, category names, descriptors,
  project titles) is live HTML typography; no baked raster text is used.

## 4. Project content — real proof, in-page viewing

- Drawers continue to hold **real recovered BIC media only** (photos and the LEAP
  video thumbnail + link from eventsbic.com — see `asset-recovery-manifest.md`).
  Nothing fabricated; slots without recovered stills are marked "Awaiting still".
- **YouTube opens in an in-page lightbox** (autoplay embed, case-file title bar,
  backdrop, `Esc`/Close to dismiss) — visitors are no longer navigated away.

## 5. "Work That Left the Box" — photography un-filtered

- The heavy grayscale treatment on genuine project photography was **removed**, here
  and in archive dossier thumbnails. Real photos render in full colour; the noir feel
  now comes from typography, framing, numbering, hairlines and UI only.

## 6. General noir direction

Already aligned: deep blacks, silver/gray, hard radial key light, archival numbering
(DRW/CASE/FILE codes), restrained vignette, physical metal materials, subtle shadows.
No smoke, sepia, distressed type, steampunk or detective clichés. The recurring dot
motif (spark) ties hero → services → drawers → featured work together.

## 7. Team / Cast section — DEFERRED

The brief's noir "cast introduction" requires **real BIC personnel photography or
video**, which we do not have yet. No placeholder people were fabricated. When
portraits are supplied, the section slots between Featured Work and Closing CTA:
black-and-white stills, one small natural turn toward camera, name + role revealed
with title-card motion (no novelty typewriter font).

## 8. SEO / answer-engine groundwork (no visual impact)

- JSON-LD `Organization` structured data added to `index.html` (name, legal name,
  services, regions, real phone `+966 59 070 2450` recovered from the live site) so
  search and answer engines can digest BIC without deep-scraping — addressing the
  visibility gap without touching the front end.

## QA verification (all performed in a live browser)

| Check | Result |
|---|---|
| Drawer does not alter grid height when opened | PASS — 352px → 352px desktop, 672px → 672px mobile |
| No archive layout shift | PASS |
| Correct z-index overlap of open drawer | PASS — verified visually |
| Only one drawer open at a time | PASS — opening another closes the first |
| Esc closes drawer | PASS |
| Mobile (375×812) | PASS — no horizontal overflow, hero fits, drawer overlay works, scroll cue hidden on mobile |
| Reduced motion | PASS — hero final frame instantly; drawers open instantly, no tween |
| Real project links/media functional | PASS — lightbox plays the real BIC YouTube video in-page |
| Production build | PASS — `npm run build` clean |

## Outstanding replacements (client side)

1. **Final BIC logo lockup** — the live-site logo is the old purple/teal identity;
   the monochrome "BIC." wordmark here follows the new brand guide. Supply final SVG.
2. **Personnel photography/video** for the deferred Cast section.
3. **Higher-resolution project stills** to fill "Awaiting still" slots (DRW-02,
  DRW-04, DRW-05, DRW-06 second records) and replace the one gala photo whose
  provenance could not be verified (flagged in the manifest).
4. **Confirm metrics** — the live site claims "+350 clients / +580 events" while the
  brand guide states "15+ years / 1000+ / 200+" — guide numbers are used; confirm
  which set is canonical.

---

# Pass 4 — Signature interactions + Cast sequence

Scope: correct three signature interactions and add the missing cinematic cast
sequence. Architecture and art direction unchanged.

## 1. Hero — opening scene rescaled

- Box scale roughly **doubled**: the viewBox is now cropped tight on the crate
  (`120 40 460 330`) and display size raised (max 32rem → 46rem), putting the crate
  at ~2× its previous visual scale — the eye goes to the box first, with
  substantial negative space preserved.
- **Directional key light** added: a restrained gradient falls from upper left as
  the crate establishes itself out of darkness.
- Sequence now matches the approved beats: darkness → box establishes → lid opens →
  **BIC logo emerges from inside the box** → the dot completes the logo's period →
  **the dot visibly detaches from "BIC." and travels beyond the box boundary** →
  ignition → held beat → **only then** the headline → supporting copy + CTAs.
  No typography appears while the main animation is running — the concept reads
  before a single word.
- Reduced-motion default frame updated to the same end state.

## 2. BIC dot — connective character (audited)

- Hero idea trigger ✓ · service-glyph activation point (hover pulse) ✓ · process
  markers (the "Ignite" step sparks) ✓ · archive status indicators (nameplate +
  per-drawer dots) ✓ · eyebrow/section cue dots ✓ · **final CTA punctuation dot
  added** to "Every empty space is a box waiting to be opened". The dot never
  floats around the page — it appears only at meaningful interaction moments.

## 3. Archive — drawer mechanic corrected (again, decisively)

- Face + tray are now wrapped in a single `.drawer-body` that **translates forward
  toward the viewer as one physical object** (y +22, scale 1.045, perspective
  1400px) while the tray unfolds from −72° rotateX out of the cabinet — no layout
  expansion anywhere.
- Grid document-flow height unchanged when opening (352px → 352px desktop,
  672px → 672px mobile — measured). The other five faces stay spatially fixed;
  the open drawer overlaps the row beneath it by design; only one open at a time.

## 4. THE CAST BEHIND THE EXPERIENCE — added

- All **seven executive profiles recovered from eventsbic.com** and verified live
  (EN + /ar): Firas Hamdan (CEO), Sultan Abu Omar (COO), Salah Al-Qaisi (Branding
  Manager), Mustafa Agha (Development Manager), Abdullah Saif (Key Account
  Manager), Rayan Naser (Operational Officer), Rahaf Alotabi (Administrative
  Specialist).
- Six real portraits downloaded at best available resolution (326–742px).
  **Rahaf Alotabi's record on the live site carries only a placeholder silhouette
  (EN and /ar alike)** — per the no-fabricated-faces rule her frame shows an
  honest "Portrait being catalogued" treatment with accurate name and role; a real
  photo has been requested (flagged in the manifest).
- Art direction: high-contrast B&W, elegant 3:4 crop, edges falling into darkness,
  "CAST / 01–07" number plates with spark dot, eyebrow "PRINCIPAL PLAYERS / BIC
  CAST FILE", microcopy "THE PEOPLE BEHIND THE EXPERIENCE". No detective cosplay,
  no sepia, no wanted-poster gimmicks.
- Motion (~1.6s per person, staggered): off-axis crop (translate −4.5%, scale
  1.15) settles toward the viewer (scale 1.03) + a single studio light sweep —
  crop/scale/light only, no fabricated facial movement. Title card then reveals
  with a restrained mechanical rhythm in the site's own Archivo (no novelty
  typewriter font).
- Layout: cinematic horizontal scroll-snap sequence — large portraits on desktop,
  clean swipe on mobile (verified 375px, no page overflow). Section sits between
  the Archive and Work per the approved narrative; nav + footer links added.

## Pass 4 QA (live browser)

| Check | Result |
|---|---|
| Hero box dramatically larger; concept reads before headline | PASS — visual |
| Dot visibly detaches and travels outside box boundary | PASS — timeline + final frame |
| Archive drawer slides toward viewer; grid does not reflow | PASS — 352px → 352px measured |
| Seven real profiles recovered; identities/titles accurate | PASS — verified against live site |
| Cinematic B&W cast sequence exists (desktop + mobile swipe) | PASS — visual |
| No horizontal overflow at 375px | PASS |
| Reduced motion | PASS — hero + drawers + cast all land instantly |
| Production build | PASS — clean |

## Outstanding (client side) — updated

1. **A real portrait for Rahaf Alotabi** — live site has only a placeholder silhouette.
2. Final monochrome BIC logo lockup (SVG) — wordmark is code-rendered per brand guide.
3. Higher-resolution project stills for "Awaiting still" dossier slots + provenance
   check on the one gala photo (flagged).
4. Confirm canonical metrics (live site "+350/+580" vs brand guide "15+/1000+/200+").
