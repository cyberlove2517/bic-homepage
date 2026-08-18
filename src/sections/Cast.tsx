import { useEffect, useRef, useState } from "react";

/**
 * THE CAST BEHIND THE EXPERIENCE — a cinematic cast-introduction sequence,
 * not a corporate team grid. Restrained 1940s/50s opening-credit feeling
 * interpreted through BIC's modern monochrome brand.
 *
 * Portraits are REAL personnel photography recovered from eventsbic.com
 * (see asset-recovery-manifest.md). No faces were generated or altered.
 * Each card plays a ~1.6s "screen test": an off-axis crop settles toward
 * the viewer through crop shift / scale / light sweep only — identity
 * fidelity over literal head movement — then the title card reveals with
 * a restrained mechanical rhythm in the site's own typeface.
 *
 * Rahaf Alotaibi's record on the live site carries no real portrait
 * (placeholder silhouette). Per the no-fabricated-faces rule her frame
 * is an honest "portrait being catalogued" treatment; name and role are
 * accurate.
 */

type CastMember = {
  name: string;
  role: string;
  img?: string;
};

const T = "assets/recovered/team";

const cast: CastMember[] = [
  { name: "FIRAS HAMDAN", role: "Chief Executive Officer", img: `${T}/firas-hamdan.webp` },
  { name: "SULTAN ABU OMAR", role: "Chief Operational Officer", img: `${T}/sultan-abu-omar.webp` },
  { name: "SALAH AL-QAISI", role: "Branding Manager", img: `${T}/salah-al-qaisi.webp` },
  { name: "MUSTAFA AGHA", role: "Development Manager", img: `${T}/mustafa-agha.webp` },
  { name: "ABDULLAH SAIF", role: "Key Account Manager", img: `${T}/abdullah-saif.webp` },
  { name: "RAYAN NASER", role: "Operational Officer", img: `${T}/rayan-naser.webp` },
  { name: "RAHAF ALOTABI", role: "Administrative Specialist" }, // portrait pending — see manifest
];

/* name reveal — mechanical rhythm in the site's own sans, no novelty font */
function CastName({ name, live, baseDelay }: { name: string; live: boolean; baseDelay: number }) {
  return (
    <span className="block font-display text-base font-bold uppercase tracking-[0.06em]" aria-label={name}>
      {name.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block transition-opacity duration-150"
          style={{
            opacity: live ? 1 : 0,
            transitionDelay: `${baseDelay + i * 0.038}s`,
          }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

function CastCard({ m, index, live }: { m: CastMember; index: number; live: boolean }) {
  const d = index * 0.14; // card stagger across the strip
  return (
    <li className="w-[15.5rem] flex-none snap-start sm:w-[17rem]" role="listitem">
      {/* portrait — elegant crop, high-contrast B&W, edges fall into darkness */}
      <div className="relative aspect-[3/4] overflow-hidden border border-hairline bg-deep">
        {m.img ? (
          <img
            src={m.img}
            alt={`${m.name}, ${m.role} — BIC Event Experience`}
            loading="lazy"
            className="h-full w-full object-cover [mask-image:radial-gradient(ellipse_88%_82%_at_50%_42%,black_58%,transparent_98%)]"
            style={{
              filter: "grayscale(1) contrast(1.18) brightness(0.94)",
              transform: live ? "translateX(0) scale(1.03)" : "translateX(-4.5%) scale(1.15)",
              transition: `transform 1.6s cubic-bezier(0.22,1,0.36,1) ${d}s, opacity 0.8s ease ${d}s`,
              opacity: live ? 1 : 0,
            }}
          />
        ) : (
          /* no real portrait exists on BIC sources — nothing is fabricated */
          <div
            className="relative flex h-full w-full items-center justify-center"
            style={{
              opacity: live ? 1 : 0,
              transition: `opacity 0.8s ease ${d}s`,
            }}
          >
            <span className="c-arc h-[9rem] w-[9rem] opacity-50" aria-hidden="true" />
            <span className="absolute bottom-5 px-4 text-center text-[0.5625rem] font-semibold uppercase tracking-[0.24em] text-paper-30">
              Portrait being catalogued
            </span>
          </div>
        )}

        {/* light sweep — a single studio key-light pass, then gone */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(242,242,242,0.14), transparent)",
            transform: live ? "translateX(260%)" : "translateX(-160%)",
            transition: `transform 1.3s cubic-bezier(0.4,0,0.2,1) ${d + 0.25}s`,
          }}
        />

        {/* cast number plate */}
        <span className="absolute left-4 top-4 flex items-center gap-2 text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-paper-75 [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
          <span
            className={`h-1 w-1 rounded-full transition-colors duration-700 ${
              live ? "dot-spark bg-[var(--paper)]" : "bg-[var(--gray-50)]"
            }`}
            aria-hidden="true"
          />
          Cast / {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* title card — opening credits, not an HR directory */}
      <div className="mt-4 border-l border-hairline pl-4">
        <CastName name={m.name} live={live} baseDelay={d + 0.55} />
        <span
          className="mt-1 block text-[0.6875rem] uppercase tracking-[0.18em] text-gray-brand transition-opacity duration-500"
          style={{
            opacity: live ? 1 : 0,
            transitionDelay: `${d + 0.55 + m.name.length * 0.038 + 0.15}s`,
          }}
        >
          {m.role}
        </span>
      </div>
    </li>
  );
}

export default function Cast() {
  const root = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={root}
      id="cast"
      className="bg-deep py-[clamp(6rem,12vw,10rem)]"
      aria-labelledby="cast-heading"
    >
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-16">
        <div className="reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Principal Players / BIC Cast File</p>
            <h2
              id="cast-heading"
              className="mt-5 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase leading-[1.02]"
            >
              The cast behind the experience
            </h2>
          </div>
          <p className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.22em] text-paper-30">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gray)]" aria-hidden="true" />
            The people behind the experience
          </p>
        </div>
      </div>

      {/* cinematic horizontal sequence — swipe on touch, scroll on desktop */}
      <div className="reveal mt-14" data-reveal-delay={120}>
        <ul
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-16 [scrollbar-width:thin]"
          role="list"
          aria-label="BIC executive team"
        >
          {cast.map((m, i) => (
            <CastCard key={m.name} m={m} index={i} live={live} />
          ))}
          {/* end spacer so the last card can rest comfortably */}
          <li className="w-2 flex-none" aria-hidden="true" />
        </ul>
      </div>
    </section>
  );
}
