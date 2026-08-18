import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLink } from "../components/icons";

/**
 * Signature hero: sealed wireframe crate → lid opens → B·I·C rises → brand dot
 * detaches and ignites as the idea spark.
 *
 * Motion: GSAP (not Remotion/Lottie). Default SVG markup = final frame so
 * reduced-motion / no-JS still show the resolved scene.
 *
 * Lid open uses path `d` morphing (not CSS rotation on <g>). CSS/svgOrigin
 * rotation was throwing the lid off-canvas under the viewBox transform.
 */

// Closed lid (top face of isometric crate)
const LID_CLOSED = "M210 194 L390 194 L364 168 L184 168 Z";
// Open lid — hinged on front edge (y=194), swung up/back so the far edge lifts
// and the panel reads as an open hatch above the crate mouth
const LID_OPEN = "M198 92 L382 92 L390 194 L210 194 Z";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cancelled = false;
    let ctx: gsap.Context | undefined;

    const start = () => {
      if (cancelled || !root.current) return;

      ctx = gsap.context(() => {
        gsap.killTweensOf([
          ".hero-edge",
          ".hero-lid-path",
          ".hero-letter",
          ".hero-glow",
          ".hero-key",
          ".hero-dot",
          ".hero-dot-glow",
          ".hero-shadow",
          ".hero-ui",
          ".hero-title",
          ".hero-cue",
        ]);

        const tl = gsap.timeline({
          defaults: { ease: "expo.out", overwrite: "auto" },
        });
        tl.timeScale(0.9);

        // Sealed start — body + lid strokes hidden via dashoffset
        gsap.set(".hero-edge", { strokeDashoffset: 1, opacity: 1 });
        gsap.set(".hero-lid-path", {
          attr: { d: LID_CLOSED },
          strokeDashoffset: 1,
          fillOpacity: 0.28,
          opacity: 1,
        });
        gsap.set(".hero-letter", { attr: { y: 300 }, opacity: 0 });
        gsap.set(".hero-glow", { opacity: 0, scale: 0.55, transformOrigin: "50% 50%" });
        gsap.set(".hero-key", { opacity: 0 });
        gsap.set(".hero-dot", {
          attr: { cx: 366, cy: 152 },
          fill: "#8c8c8c",
          opacity: 0,
          scale: 0.35,
          transformOrigin: "50% 50%",
        });
        gsap.set(".hero-dot-glow", {
          opacity: 0,
          scale: 0.15,
          transformOrigin: "50% 50%",
        });
        gsap.set(".hero-shadow", { opacity: 0 });
        gsap.set(".hero-ui", { opacity: 0, y: 24 });
        gsap.set(".hero-title", { opacity: 0, y: 28 });
        gsap.set(".hero-cue", { opacity: 0 });

        // 1. Key light + crate body draws sealed
        tl.to(".hero-key", { opacity: 0.55, duration: 1.35, ease: "sine.out" }, 0.05)
          .to(
            ".hero-edge",
            {
              strokeDashoffset: 0,
              duration: 1.1,
              stagger: 0.07,
              ease: "power2.inOut",
            },
            0.15,
          )
          .to(
            ".hero-lid-path",
            {
              strokeDashoffset: 0,
              duration: 0.85,
              ease: "power2.inOut",
            },
            0.4,
          )
          .to(".hero-shadow", { opacity: 0.55, duration: 0.7 }, 0.85)
          .to(".hero-lid-path", { fillOpacity: 0.42, duration: 0.45 }, 0.65)

          // 2. Lid opens — morph path from closed top face → upright hatch
          .to(
            ".hero-lid-path",
            {
              attr: { d: LID_OPEN },
              fillOpacity: 0.14,
              duration: 1.15,
              ease: "power2.inOut",
            },
            1.3,
          )
          .to(
            ".hero-glow",
            { opacity: 0.95, scale: 1, duration: 0.95, ease: "sine.out" },
            1.55,
          )

          // 3. BIC rises from inside the volume
          .to(
            ".hero-letter",
            {
              attr: { y: 158 },
              opacity: 1,
              duration: 0.95,
              stagger: 0.14,
              ease: "power3.out",
            },
            1.9,
          )

          // 4. Dot completes logo then leaves the box
          .to(
            ".hero-dot",
            { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(1.6)" },
            3.0,
          )
          .to(
            ".hero-dot",
            { attr: { cx: 400, cy: 78 }, duration: 0.36, ease: "power2.out" },
            3.4,
          )
          .to(
            ".hero-dot",
            { attr: { cx: 446, cy: 120 }, duration: 0.32, ease: "power1.inOut" },
            3.76,
          )

          // 5. Ignition
          .to(".hero-dot", { fill: "#f2f2f2", duration: 0.22 }, 4.1)
          .to(
            ".hero-dot-glow",
            { opacity: 0.9, scale: 1, duration: 0.55, ease: "expo.out" },
            4.1,
          )
          .to(
            ".hero-dot-glow",
            { opacity: 0.38, scale: 1.4, duration: 0.7, ease: "sine.out" },
            4.65,
          )

          // 6–7. Copy
          .to(".hero-title", { opacity: 1, y: 0, duration: 0.85 }, 5.0)
          .to(".hero-ui", { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 5.35)
          .to(".hero-cue", { opacity: 1, duration: 0.75 }, 6.0);

        gsap.to(".hero-dot-glow", {
          opacity: 0.72,
          scale: 1.18,
          duration: 2.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 6.6,
        });
      }, root);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(start).catch(start);
    } else {
      start();
    }

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-deep px-5 pt-24 pb-16"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 38%, rgba(242,242,242,0.045), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="c-arc left-[-18rem] top-[-18rem] h-[36rem] w-[36rem] opacity-40" aria-hidden="true" />
      <div className="c-arc right-[-22rem] bottom-[-22rem] h-[44rem] w-[44rem] opacity-25" aria-hidden="true" />

      <svg
        viewBox="120 40 460 330"
        className="hero-svg w-full max-w-[26rem] sm:max-w-[38rem] lg:max-w-[46rem]"
        role="img"
        aria-label="A wireframe crate opens and the letters B I C rise out of it; the brand dot detaches from the logo and ignites as a spark outside the box"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f2f2f2" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#f2f2f2" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="heroKey" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f2f2f2" stopOpacity="0.12" />
            <stop offset="45%" stopColor="#f2f2f2" stopOpacity="0.035" />
            <stop offset="100%" stopColor="#f2f2f2" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect className="hero-key" x="40" y="0" width="460" height="400" fill="url(#heroKey)" />
        <ellipse className="hero-shadow" cx="292" cy="352" rx="150" ry="12" fill="url(#heroGlow)" />
        <circle className="hero-glow" cx="294" cy="252" r="120" fill="url(#heroGlow)" />

        {/* Lid — single path, default = OPEN (final frame). GSAP morphs closed→open. */}
        <path
          className="hero-lid-path"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          d={LID_OPEN}
          fill="var(--lift)"
          fillOpacity={0.14}
          stroke="var(--paper-75)"
          strokeWidth="1.6"
          strokeLinejoin="miter"
        />

        {/* Crate body */}
        <path
          className="hero-edge"
          pathLength={1}
          strokeDasharray={1}
          d="M210 194 L184 168 L184 288 L210 314"
          fill="none"
          stroke="var(--gray)"
          strokeWidth="1.5"
        />
        <path
          className="hero-edge"
          pathLength={1}
          strokeDasharray={1}
          d="M210 194 L390 194 L390 314 L210 314 Z"
          fill="var(--deep)"
          fillOpacity="0.55"
          stroke="var(--paper-75)"
          strokeWidth="1.5"
        />
        <path
          className="hero-edge"
          pathLength={1}
          strokeDasharray={1}
          d="M390 194 L364 168"
          fill="none"
          stroke="var(--gray)"
          strokeWidth="1.5"
        />
        <path
          className="hero-edge"
          pathLength={1}
          strokeDasharray={1}
          d="M390 314 L364 288 L184 288"
          fill="none"
          stroke="var(--gray-75)"
          strokeWidth="1.5"
        />

        {/* Letters — default final y */}
        <g className="font-display" fill="var(--paper)" fontWeight={900} fontSize="72" letterSpacing="-2">
          <text className="hero-letter" x="232" y="158">
            B
          </text>
          <text className="hero-letter" x="284" y="158">
            I
          </text>
          <text className="hero-letter" x="306" y="158">
            C
          </text>
        </g>

        <circle className="hero-dot-glow" cx="446" cy="120" r="26" fill="url(#heroGlow)" />
        <circle className="hero-dot" cx="446" cy="120" r="7" fill="var(--paper)" />
      </svg>

      <div className="relative z-10 mt-2 flex max-w-3xl flex-col items-center text-center">
        <p className="hero-ui eyebrow">BIC Event Experience</p>
        <h1
          id="hero-heading"
          className="hero-title mt-5 font-display text-[clamp(2rem,4.6vw,3.9rem)] font-black uppercase leading-[0.98] tracking-[-0.01em]"
        >
          Thinking outside the box
          <span className="block text-paper-50">is where we start</span>
        </h1>
        <p className="hero-ui mt-5 max-w-xl text-base leading-relaxed text-paper-75 sm:text-lg">
          We don't just organize events. We turn ideas into environments, activations and
          experiences — planned today, built for tomorrow, remembered long after.
        </p>
        <div className="hero-ui mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <a href="#contact" className="btn-primary">
            Start a conversation
            <ArrowLink className="h-3 w-8" />
          </a>
          <a href="#archive" className="btn-ghost">
            Open the archive
          </a>
        </div>
      </div>

      <div
        className="hero-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden="true"
      >
        <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.32em] text-gray-brand">
          Scroll
        </span>
        <span className="h-10 w-px bg-[var(--gray-50)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--gray)]" />
      </div>
    </section>
  );
}
