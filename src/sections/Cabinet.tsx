import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLink } from "../components/icons";

/**
 * Experience Archive — a wall of premium modular drawers.
 *
 * Interaction model: a REAL physical filing drawer, not an accordion.
 * The grid stays spatially stable — an opened drawer projects OUT toward
 * the viewer on a GSAP timeline and overlays the drawers below it
 * (z-index), never pushing rows down or changing grid height.
 *
 * Timeline (per the approved interaction spec):
 *   0.00–0.15s  handle response
 *   0.10–0.55s  drawer face slides outward toward viewer
 *   0.35–0.70s  interior (tray + side walls) becomes visible
 *   0.48–0.80s  case cards stagger upward 10–30px
 *   0.65s+      cards interactive
 * Reversed on close. Only one drawer fully open at a time.
 *
 * Drawer faces are rebuilt in CSS from the client's wide-drawer asset
 * (form/material reference only — baked-in raster text is not copied).
 * All text is live HTML. Trays hold dossier cards with REAL recovered
 * BIC proof (see asset-recovery-manifest.md). Video opens in an
 * in-page lightbox, not a navigation away.
 */

type CaseFile = {
  code: string;
  title: string;
  location: string;
  category: string;
  img?: string; // recovered real BIC photo
  videoUrl?: string; // youtu.be link — opened in lightbox
};

type Drawer = {
  code: string;
  label: string;
  note: string;
  files: CaseFile[];
};

const R = "assets/recovered/photos";

const drawers: Drawer[] = [
  {
    code: "DRW-01",
    label: "Conferences & Summits",
    note: "Flagship stages, national moments",
    files: [
      {
        code: "CASE 024",
        title: "LEAP — flagship conference environment",
        location: "Riyadh, KSA",
        category: "Conference Production",
        videoUrl: "https://youtu.be/c1MK6QMV6is",
        img: `${R}/video-c1MK6QMV6is.jpg`,
      },
      {
        code: "CASE 019",
        title: "Etihad Carnival — main grounds",
        location: "Riyadh, KSA",
        category: "Public Activities",
        img: `${R}/event-whatsapp-2025-12-16.webp`,
      },
    ],
  },
  {
    code: "DRW-02",
    label: "Exhibitions & Pavilions",
    note: "From empty floor to environment",
    files: [
      {
        code: "CASE 017",
        title: "Outdoor souk — market build at dusk",
        location: "KSA",
        category: "Booth Design & Exhibition",
        img: `${R}/event-dsc02690.webp`,
      },
      {
        code: "CASE 011",
        title: "Pavilion series — concept to build",
        location: "KSA · Jordan",
        category: "Exhibition Construction",
      },
    ],
  },
  {
    code: "DRW-03",
    label: "Technology Activations",
    note: "Audiences become participants",
    files: [
      {
        code: "CASE 031",
        title: "E-HS9 launch — LED reveal tunnel",
        location: "Riyadh, KSA",
        category: "Technology Activation",
        img: `${R}/event-whatsapp-2026-06-17.webp`,
      },
      {
        code: "CASE 028",
        title: "Light installation field",
        location: "KSA",
        category: "Interactive Installation",
        img: `${R}/event-dsc02832.webp`,
      },
    ],
  },
  {
    code: "DRW-04",
    label: "Gala & Protocol",
    note: "Precision for the highest tables",
    files: [
      {
        code: "CASE 021",
        title: "Private gala — full room production",
        location: "KSA",
        category: "Fashion Shows & Gala Dinner",
        img: `${R}/event-untitled-20-24.webp`,
      },
      {
        code: "CASE 014",
        title: "VIP protocol programme",
        location: "Riyadh, KSA",
        category: "Hospitality & Protocol",
      },
    ],
  },
  {
    code: "DRW-05",
    label: "Brand Environments",
    note: "Identity made physical",
    files: [
      {
        code: "CASE 016",
        title: "Suwayda Park — entrance environment",
        location: "KSA",
        category: "Experience Production",
        img: `${R}/event-dsc09354.webp`,
      },
      {
        code: "CASE 009",
        title: "Ramadan theme — seasonal environment",
        location: "KSA",
        category: "Ramadan Theme",
      },
    ],
  },
  {
    code: "DRW-06",
    label: "Large-Scale Public Events",
    note: "City-scale, crowd-proven",
    files: [
      {
        code: "CASE 026",
        title: "Employee open day — grounds & crowd",
        location: "KSA",
        category: "Public Activities & Crowd Management",
      },
      {
        code: "CASE 013",
        title: "Car show — full site & stage",
        location: "KSA",
        category: "Car Show",
        img: `${R}/event-whatsapp-2026-06-17.webp`,
      },
    ],
  },
];

/* ---- dossier card — the reusable case-file component ---- */
function DossierCard({ f, onWatch }: { f: CaseFile; onWatch: (f: CaseFile) => void }) {
  return (
    <li data-card className="group/card flex items-stretch border border-hairline bg-[var(--ink)]">
      {/* thumbnail — real BIC photography, shown in full colour (proof layer) */}
      <span className="relative block h-auto w-24 flex-none overflow-hidden bg-lift sm:w-28" aria-hidden={!f.img}>
        {f.img ? (
          <img src={f.img} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <span className="relative block h-full min-h-[4.5rem] w-full">
            <span className="c-arc left-[-1.5rem] top-[-1.5rem] h-[4rem] w-[4rem] opacity-60" />
            <span className="absolute bottom-1.5 left-2 text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-paper-30">
              Awaiting still
            </span>
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1 px-3.5 py-3">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-gray-brand">{f.code}</span>
          <span className="truncate text-[0.625rem] uppercase tracking-[0.14em] text-paper-30">{f.category}</span>
        </span>
        <span className="mt-1 block truncate text-sm font-semibold">{f.title}</span>
        <span className="mt-0.5 block truncate text-xs text-paper-50">{f.location}</span>
      </span>
      {f.videoUrl && (
        <button
          type="button"
          onClick={() => onWatch(f)}
          className="flex flex-none cursor-pointer items-center gap-2 border-l border-hairline px-3 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-paper-75 transition-colors hover:bg-lift hover:text-[var(--paper)]"
          aria-label={`Watch video: ${f.title}`}
        >
          <span className="hidden sm:inline">Watch</span>
          <ArrowLink className="h-2.5 w-6" />
        </button>
      )}
    </li>
  );
}

/* ---- one physical drawer unit ---- */
function DrawerUnit({
  d,
  open,
  onToggle,
  onWatch,
}: {
  d: Drawer;
  open: boolean;
  onToggle: () => void;
  onWatch: (f: CaseFile) => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLSpanElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Build the open/close timeline once
  useEffect(() => {
    const body = bodyRef.current;
    const handle = handleRef.current;
    const tray = trayRef.current;
    if (!body || !handle || !tray) return;
    const cards = tray.querySelectorAll("[data-card]");

    // the tray starts folded up behind the drawer front, inside the cabinet
    gsap.set(tray, { autoAlpha: 0, rotateX: -72, transformOrigin: "top center" });
    gsap.set(cards, { autoAlpha: 0, y: 26 });

    const tl = gsap.timeline({ paused: true, defaults: { overwrite: "auto" } });
    tl.to(handle, { y: 3, duration: 0.15, ease: "power2.out" }, 0) // handle response 2–4px
      .to(handle, { y: 2, duration: 0.4, ease: "power2.inOut" }, 0.15)
      // the COMPLETE drawer translates forward toward the viewer
      .to(body, { y: 22, scale: 1.045, duration: 0.45, ease: "power3.out" }, 0.1)
      // perspective exposes the tray / side walls swinging out of the cabinet
      .to(tray, { autoAlpha: 1, rotateX: 0, duration: 0.4, ease: "power2.out" }, 0.35)
      // dossiers rise slightly from within
      .to(cards, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.08, ease: "power2.out" }, 0.48);
    tlRef.current = tl;
    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  // Play / reverse on state change; instant under reduced motion
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      tl.progress(open ? 1 : 0);
    } else if (open) {
      tl.timeScale(1).play();
    } else {
      tl.timeScale(1.35).reverse(); // drawers close a touch faster than they open
    }
  }, [open]);

  return (
    <div
      className="relative"
      style={{
        perspective: "1400px",
        zIndex: open ? 30 : undefined,
      }}
    >
      {/* the complete drawer — face + tray move toward the viewer as ONE body;
          the grid cell keeps its document-flow space, so nothing reflows */}
      <div ref={bodyRef} className="drawer-body relative will-change-transform">
      {/* drawer front — rebuilt in CSS from the wide-drawer reference asset */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`drawer-panel-${d.code}`}
        className="drawer-face group relative z-20 flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:px-6"
      >
        {/* corner rivets */}
        <span className="rivet left-1.5 top-1.5" aria-hidden="true" />
        <span className="rivet right-1.5 top-1.5" aria-hidden="true" />
        <span className="rivet bottom-1.5 left-1.5" aria-hidden="true" />
        <span className="rivet bottom-1.5 right-1.5" aria-hidden="true" />

        {/* engraved code + dot */}
        <span className="flex items-center gap-2 pl-1">
          <span className="font-display text-xs font-bold tabular-nums tracking-[0.08em] text-paper-50">{d.code}</span>
          <span
            className={`h-1 w-1 rounded-full transition-all duration-500 ${
              open ? "dot-spark bg-[var(--paper)]" : "bg-[var(--gray-75)]"
            }`}
            aria-hidden="true"
          />
        </span>

        {/* label holder */}
        <span className="label-holder mx-1 min-w-0 flex-1 px-4 py-2.5">
          <span className="block truncate font-display text-[0.8125rem] font-bold uppercase tracking-[0.06em] sm:text-base">
            {d.label}
          </span>
          <span className="mt-0.5 block truncate text-[0.6875rem] text-paper-50">{d.note}</span>
        </span>

        {/* pull handle */}
        <span ref={handleRef} className="drawer-handle mr-1 flex-none" aria-hidden="true">
          <span className="drawer-handle-bar" />
        </span>
        <span className="sr-only">{open ? `Close drawer ${d.label}` : `Open drawer ${d.label}`}</span>
      </button>

      {/* tray interior — absolute overlay: grid height never changes,
          the open drawer overlaps the one below it like a real pulled drawer */}
      <div
        ref={trayRef}
        id={`drawer-panel-${d.code}`}
        role="region"
        aria-label={`${d.label} case files`}
        aria-hidden={!open}
        className="drawer-tray-wrap absolute inset-x-0 top-full z-10 will-change-transform"
      >
        <div className="drawer-tray border border-t-0 border-hairline">
          <ul className="space-y-2.5 p-3 sm:p-4" role="list">
            {d.files.map((f) => (
              <DossierCard key={f.code} f={f} onWatch={onWatch} />
            ))}
          </ul>
          <p className="border-t border-hairline px-4 py-2.5 text-[0.625rem] uppercase tracking-[0.2em] text-paper-30">
            {d.code} · {d.files.length} records on file
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

/* ---- YouTube lightbox ---- */
function VideoLightbox({ file, onClose }: { file: CaseFile; onClose: () => void }) {
  const id = file.videoUrl?.split("/").pop() ?? "";
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${file.title}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl border border-hairline bg-deep shadow-[0_40px_90px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
          <p className="truncate text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-paper-75">
            {file.code} — {file.title}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer border border-hairline px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-paper-75 transition-colors hover:bg-lift hover:text-[var(--paper)]"
          >
            Close ✕
          </button>
        </div>
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={file.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default function Cabinet() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [watching, setWatching] = useState<CaseFile | null>(null);

  const toggle = useCallback((i: number) => {
    setOpenIdx((cur) => (cur === i ? null : i));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="archive"
      className="border-y border-hairline bg-[var(--ink)] py-[clamp(6rem,12vw,10rem)]"
      aria-labelledby="archive-heading"
    >
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-16">
        <div className="reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">The Experience Archive</p>
            <h2
              id="archive-heading"
              className="mt-5 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase leading-[1.02]"
            >
              Open a drawer
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-paper-75">
              Fifteen years of rooms, stages and moments — filed, numbered and kept.
              Pull a drawer to look inside.
            </p>
          </div>
          <p className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.22em] text-paper-30">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gray)]" aria-hidden="true" />
            Real project records — more being catalogued
          </p>
        </div>

        {/* the cabinet wall */}
        <div className="reveal mt-14 border border-hairline bg-deep p-3 sm:p-5" data-reveal-delay={120}>
          {/* name plate */}
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-gray-brand">
              BIC Archive — Case Files
            </span>
            <span className="flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.22em] text-paper-30">
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  openIdx !== null ? "dot-spark bg-[var(--paper)]" : "bg-[var(--gray)]"
                }`}
                aria-hidden="true"
              />
              {openIdx !== null ? `${drawers[openIdx].code} open` : "All drawers closed"}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-4 md:grid-cols-2">
            {drawers.map((d, i) => (
              <DrawerUnit
                key={d.code}
                d={d}
                open={openIdx === i}
                onToggle={() => toggle(i)}
                onWatch={setWatching}
              />
            ))}
          </div>
        </div>
      </div>

      {watching && <VideoLightbox file={watching} onClose={() => setWatching(null)} />}
    </section>
  );
}
