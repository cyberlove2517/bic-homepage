import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLink } from "../components/icons";

/**
 * Signature hero: a sealed wireframe crate in a dark room. Its edges draw in,
 * the lid opens, B·I·C rise out, and the brand dot escapes, arcs upward and
 * ignites as the "idea spark" — the literal moment of thinking outside the box.
 *
 * Default CSS/SVG markup = final frame (open crate + BIC + spark + copy).
 * GSAP only rewinds and plays when motion is allowed, so reduced-motion and
 * no-JS both land on the resolved scene.
 *
 * Motion engine: GSAP (not Remotion / Lottie). SVG transforms only.
 */
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
        // Kill any leftover tweens from React StrictMode double-mount
        gsap.killTweensOf([
          ".hero-edge",
          ".hero-lid-edge",
          ".hero-letter",
          ".hero-lid",
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

        // --- initial hidden / sealed states (from the final-frame markup)
        // pathLength=1 + dasharray=1 → dashoffset 1 hides the stroke fully
        gsap.set(".hero-edge, .hero-lid-edge", {
          strokeDashoffset: 1,
          opacity: 1,
        });
        gsap.set(".hero-letter", {
          attr: { y: 300 },
          opacity: 0,
        });
        // Hinge on the front top edge centre of the crate (SVG user units)
        // Using transformOrigin in px relative to the <g> bbox is unreliable;
        // svgOrigin pins the pivot in the SVG coordinate system.
        gsap.set(".hero-lid", {
          svgOrigin: "300 194",
          rotation: 0,
          opacity: 1,
          transformBox: "fill-box",
        });
        gsap.set(".hero-glow", { opacity: 0, scale: 0.6, svgOrigin: "294 252" });
        gsap.set(".hero-key", { opacity: 0 });
        // Dot begins as the period of "BIC." — inside the logo, not yet detached
        gsap.set(".hero-dot", {
          attr: { cx: 366, cy: 152 },
          fill: "#8c8c8c",
          opacity: 0,
          scale: 0.35,
          svgOrigin: "366 152",
        });
        gsap.set(".hero-dot-glow", {
          opacity: 0,
          scale: 0.15,
          svgOrigin: "446 120",
        });
        gsap.set(".hero-shadow", { opacity: 0 });
        gsap.set(".hero-ui", { opacity: 0, y: 24 });
        gsap.set(".hero-title", { opacity: 0, y: 28 });
        gsap.set(".hero-cue", { opacity: 0 });
        gsap.set(".hero-lid-fill", { opacity: 0.25 });

        // --- 1. darkness → crate establishes under a restrained key light
        tl.to(".hero-key", { opacity: 0.55, duration: 1.4, ease: "sine.out" }, 0.05)
          // body edges draw first (crate walls) — sealed box reads before lid moves
          .to(
            ".hero-edge",
            {
              strokeDashoffset: 0,
              duration: 1.15,
              stagger: 0.08,
              ease: "power2.inOut",
            },
            0.15,
          )
          .to(
            ".hero-lid-edge",
            {
              strokeDashoffset: 0,
              duration: 0.9,
              ease: "power2.inOut",
            },
            0.45,
          )
          .to(".hero-shadow", { opacity: 0.55, duration: 0.75 }, 0.9)
          .to(".hero-lid-fill", { opacity: 0.4, duration: 0.5 }, 0.7)

          // --- 2. lid opens — hinge on front edge, swings up/back toward viewer-left
          .to(
            ".hero-lid",
            {
              rotation: -108,
              duration: 1.2,
              ease: "power2.inOut",
            },
            1.35,
          )
          .to(".hero-glow", { opacity: 0.95, scale: 1, duration: 0.95, ease: "sine.out" }, 1.65)
          .to(".hero-lid-fill", { opacity: 0.12, duration: 0.7 }, 1.9)
          .to(".hero-lid", { opacity: 0.55, duration: 0.7 }, 2.15)

          // --- 3. BIC rises from inside the crate (clipped by box mouth)
          .to(
            ".hero-letter",
            {
              attr: { y: 158 },
              opacity: 1,
              duration: 0.95,
              stagger: 0.14,
              ease: "power3.out",
            },
            1.95,
          )

          // --- 4. brand dot completes the logo, then detaches outside the box
          .to(".hero-dot", { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(1.6)" }, 3.05)
          .to(
            ".hero-dot",
            { attr: { cx: 400, cy: 78 }, duration: 0.36, ease: "power2.out" },
            3.45,
          )
          .to(
            ".hero-dot",
            { attr: { cx: 446, cy: 120 }, duration: 0.32, ease: "power1.inOut" },
            3.81,
          )

          // --- 5. ignition — idea spark
          .to(".hero-dot", { fill: "#f2f2f2", duration: 0.22 }, 4.15)
          .to(
            ".hero-dot-glow",
            { opacity: 0.9, scale: 1, duration: 0.55, ease: "expo.out" },
            4.15,
          )
          .to(
            ".hero-dot-glow",
            { opacity: 0.38, scale: 1.4, duration: 0.7, ease: "sine.out" },
            4.7,
          )

          // --- 6. held beat, then headline
          .to(".hero-title", { opacity: 1, y: 0, duration: 0.85 }, 5.05)

          // --- 7. supporting copy + CTAs
          .to(".hero-ui", { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 5.4)
          .to(".hero-cue", { opacity: 1, duration: 0.75 }, 6.05);

        // ambient spark breath
        gsap.to(".hero-dot-glow", {
          opacity: 0.72,
          scale: 1.18,
          duration: 2.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 6.7,
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
      {/* cinematic vignette + faint C-arcs */}
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

      {/* ---- the box scene — final frame is the default painted state ---- */}
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

        {/* restrained directional key light */}
        <rect className="hero-key" x="40" y="0" width="460" height="400" fill="url(#heroKey)" />

        {/* floor shadow */}
        <ellipse className="hero-shadow" cx="292" cy="352" rx="150" ry="12" fill="url(#heroGlow)" />

        {/* interior glow, revealed when the lid opens */}
        <circle className="hero-glow" cx="294" cy="252" r="120" fill="url(#heroGlow)" />

        {/* crate — lid (drawn first so walls can sit under the hinge line) */}
        <g className="hero-lid">
          <path
            className="hero-lid-fill"
            d="M210 194 L390 194 L364 168 L184 168 Z"
            fill="var(--lift)"
            stroke="none"
          />
          <path
            className="hero-lid-edge"
            pathLength={1}
            strokeDasharray={1}
            d="M210 194 L390 194 L364 168 L184 168 Z"
            fill="none"
            stroke="var(--paper-75)"
            strokeWidth="1.6"
            strokeLinejoin="miter"
          />
        </g>

        {/* crate — walls (body edges, animated separately from the lid) */}
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

        {/* letters rising from inside the crate volume (GSAP drives y 300 → 158) */}
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

        {/* brand dot — default = ignited outside the box */}
        <circle className="hero-dot-glow" cx="446" cy="120" r="26" fill="url(#heroGlow)" />
        <circle className="hero-dot" cx="446" cy="120" r="7" fill="var(--paper)" />
      </svg>

      {/* ---- copy ---- */}
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
