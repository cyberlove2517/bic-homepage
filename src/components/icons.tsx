/**
 * BIC Monoline icon family v2 — isometric blueprint style.
 * Style source: client's custom icon sheet (style reference, not used as raster).
 * Contract: 64x64 grid, isometric projection, hairline strokes (1.5px),
 * monochrome currentColor, exactly one solid brand dot per icon.
 * Standalone copies live in public/assets/custom/icons/.
 */

type IconProps = { className?: string };

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

/** 01 — Event Planning & Management: isometric control board + clock */
export function IconPlanning({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M10 18 L34 8 L54 16 L30 26 Z" {...s} />
      <path d="M10 18 L30 26 L30 48 L10 40 Z" {...s} />
      <path d="M30 26 L54 16 L54 38 L30 48 Z" {...s} />
      <path d="M15 24 L25 28 M15 30 L25 34 M15 36 L22 39" {...s} strokeOpacity="0.6" />
      <circle cx="43" cy="30" r="7" {...s} />
      <path d="M43 26 L43 30 L46 32" {...s} />
      <circle cx="50" cy="12" r="2.2" fill="currentColor" className="icon-dot" />
    </svg>
  );
}

/** 02 — Exhibition Design & Construction: isometric booth frame */
export function IconExhibition({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M12 44 L12 24 L32 14 L52 24 L52 44" {...s} />
      <path d="M12 24 L32 34 L52 24 M32 34 L32 54" {...s} />
      <path d="M12 44 L32 54 L52 44" {...s} />
      <path d="M20 40 L20 29 L28 33 L28 44" {...s} strokeOpacity="0.6" />
      <path d="M36 44 L36 33 L44 29 L44 40" {...s} strokeOpacity="0.6" />
      <circle cx="32" cy="10" r="2.2" fill="currentColor" className="icon-dot" />
    </svg>
  );
}

/** 03 — Audio Visual & Technology: isometric LED wall + sound arcs */
export function IconAV({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M8 22 L30 12 L46 18 L24 28 Z" {...s} />
      <path d="M8 22 L24 28 L24 46 L8 40 Z" {...s} />
      <path d="M24 28 L46 18 L46 36 L24 46 Z" {...s} />
      <path d="M28 30 L42 24 M28 35 L42 29 M28 40 L42 34" {...s} strokeOpacity="0.6" />
      <path d="M50 26 a7 7 0 0 1 0 10 M54 22 a12 12 0 0 1 0 18" {...s} />
      <circle cx="50" cy="31" r="2.2" fill="currentColor" className="icon-dot" />
    </svg>
  );
}

/** 04 — Technology Activations: sensor pedestal emitting a field */
export function IconActivation({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M22 40 L32 36 L42 40 L32 44 Z" {...s} />
      <path d="M22 40 L32 44 L32 54 L22 50 Z" {...s} />
      <path d="M32 44 L42 40 L42 50 L32 54 Z" {...s} />
      <path d="M32 36 L32 26" {...s} />
      <circle cx="32" cy="22" r="4" {...s} />
      <path d="M40 14 a12 12 0 0 1 0 14 M46 10 a18 18 0 0 1 0 22" {...s} strokeOpacity="0.7" />
      <path d="M24 14 a12 12 0 0 0 0 14" {...s} strokeOpacity="0.35" />
      <circle cx="32" cy="22" r="2" fill="currentColor" className="icon-dot" />
    </svg>
  );
}

/** 05 — Hospitality & Protocol: red-carpet stair + doorway */
export function IconHospitality({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M30 12 L48 18 L48 44 L30 38 Z" {...s} />
      <path d="M30 12 L14 20 L14 46 L30 38" {...s} />
      <path d="M35 22 L43 24.5 L43 40 L35 37.5 Z" {...s} strokeOpacity="0.6" />
      <path d="M14 46 L26 52 L48 44 M26 52 L26 56 L52 47" {...s} />
      <path d="M20 49 L32 45 M26 52.5 L38 48" {...s} strokeOpacity="0.5" />
      <circle cx="39" cy="30" r="2.2" fill="currentColor" className="icon-dot" />
    </svg>
  );
}

/** 06 — Branding & Experience Design: layered brand frames + reveal ramp */
export function IconBranding({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M12 18 L30 12 L30 34 L12 40 Z" {...s} />
      <path d="M22 26 L42 20 L42 44 L22 50 Z" {...s} />
      <path d="M34 30 L52 25 L52 45 L34 50 Z" {...s} strokeOpacity="0.6" />
      <path d="M10 52 L54 40 M10 56 L54 44" {...s} strokeOpacity="0.5" />
      <path d="M17 24 L25 22 M17 29 L25 27" {...s} strokeOpacity="0.6" />
      <circle cx="52" cy="21" r="2.2" fill="currentColor" className="icon-dot" />
    </svg>
  );
}

/** BIC wordmark — faithful to the brand guide: heavy grotesk + gray dot. */
export function BicLogo({ className, dotClassName }: { className?: string; dotClassName?: string }) {
  return (
    <span className={`inline-flex items-baseline leading-none ${className ?? ""}`}>
      <span className="font-display font-black tracking-[-0.02em]">BIC</span>
      <span
        className={`inline-block rounded-full ${dotClassName ?? "bg-[var(--gray)]"}`}
        style={{ width: "0.18em", height: "0.18em", marginLeft: "0.08em" }}
        aria-hidden="true"
      />
    </span>
  );
}

/** Small arrow used on links/CTAs — line with dot terminal. */
export function ArrowLink({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 12" className={className} aria-hidden="true">
      <line x1="0" y1="6" x2="26" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 1.5 27 6l-5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="29.5" cy="6" r="2" fill="currentColor" />
    </svg>
  );
}
