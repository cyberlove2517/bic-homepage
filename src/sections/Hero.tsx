import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLink } from "../components/icons";

/**
 * Signature hero: a sealed wireframe crate in a dark room. Its edges draw in,
 * the lid opens, B·I·C rise out, and the brand dot escapes, arcs upward and
 * ignites as the "idea spark" — the literal moment of thinking outside the box.
 *
 * Default CSS state = final frame. GSAP only hides/replays when motion is OK,
 * so reduced-motion and no-JS both land on the resolved scene.
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
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.timeScale(0.85); // the reveal breathes ~15% slower — cinematic, not rushed

        // --- initial hidden states
        gsap.set(".hero-edge", { strokeDashoffset: 1 });
        gsap.set(".hero-letter", { attr: { y: 330 }, opacity: 0 });
        gsap.set(".hero-lid", { svgOrigin: "274 194", rotation: 0 });
        gsap.set(".hero-glow", { opacity: 0 });
        gsap.set(".hero-key", { opacity: 0 });
        // the dot begins as the period of the BIC. logo, NOT yet detached
        gsap.set(".hero-dot", { attr: { cx: 366, cy: 152 }, fill: "#8c8c8c", opacity: 0, scale: 0.4, svgOrigin: "366 152" });
        gsap.set(".hero-dot-glow", { opacity: 0, scale: 0.2, svgOrigin: "446 120" });
        gsap.set(".hero-shadow", { opacity: 0 });
        gsap.set(".hero-ui", { opacity: 0, y: 28 });
        gsap.set(".hero-title", { opacity: 0, y: 34 });
        gsap.set(".hero-cue", { opacity: 0 });

        // --- 1. darkness → the crate establishes itself under a restrained key light
        tl.to(".hero-key", { opacity: 0.55, duration: 1.6, ease: "sine.out" }, 0.1)
          .to(".hero-edge", { strokeDashoffset: 0, duration: 1.2, stagger: 0.07, ease: "power2.inOut" }, 0.2)
          .to(".hero-shadow", { opacity: 0.55, duration: 0.8 }, 1.0)

          // --- 2. the lid opens — boundaries separate
          .to(".hero-lid", { rotation: -96, duration: 1.15, ease: "power2.inOut" }, 1.4)
          .to(".hero-glow", { opacity: 0.9, duration: 0.9 }, 1.75)
          .to(".hero-lid", { opacity: 0.35, duration: 0.8 }, 2.3)

          // --- 3. the BIC logo emerges from inside the box
          .to(".hero-letter", { attr: { y: 158 }, opacity: 1, duration: 0.95, stagger: 0.16 }, 2.0)

          // --- 4. the dot completes the logo… then visibly DETACHES from it,
          //        travelling beyond the box boundary: the idea that got out
          .to(".hero-dot", { opacity: 1, scale: 1, duration: 0.25 }, 3.15)
          .to(".hero-dot", { attr: { cx: 392, cy: 84 }, duration: 0.34, ease: "power2.out" }, 3.55)
          .to(".hero-dot", { attr: { cx: 446, cy: 120 }, duration: 0.3, ease: "power1.in" }, 3.89)

          // --- 5. ignition — the dot becomes the idea spark (no lightbulb cliché)
          .to(".hero-dot", { fill: "#f2f2f2", duration: 0.2 }, 4.2)
          .to(".hero-dot-glow", { opacity: 0.85, scale: 1, duration: 0.55, ease: "expo.out" }, 4.2)
          .to(".hero-dot-glow", { opacity: 0.35, scale: 1.35, duration: 0.7, ease: "sine.out" }, 4.75)

          // --- 6. the concept is now clear WITHOUT words — a held beat…
          //        only then does the headline appear
          .to(".hero-title", { opacity: 1, y: 0, duration: 0.85 }, 5.0)

          // --- 7. supporting copy + CTAs follow
          .to(".hero-ui", { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, 5.35)
          .to(".hero-cue", { opacity: 1, duration: 0.8 }, 6.1);

        // --- ambient: the spark breathes, slowly, forever
        gsap.to(".hero-dot-glow", {
          opacity: 0.75,
          scale: 1.15,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 6.8,
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
        style={{ background: "radial-gradient(ellipse 90% 70% at 50% 38%, rgba(242,242,242,0.045), transparent 60%)" }}
        aria-hidden="true"
      />
      <div className="c-arc left-[-18rem] top-[-18rem] h-[36rem] w-[36rem] opacity-40" aria-hidden="true" />
      <div className="c-arc right-[-22rem] bottom-[-22rem] h-[44rem] w-[44rem] opacity-25" aria-hidden="true" />

      {/* ---- the box scene — the opening shot, framed tight on the crate ---- */}
      <svg
        viewBox="120 40 460 330"
        className="w-full max-w-[26rem] sm:max-w-[38rem] lg:max-w-[46rem]"
        role="img"
        aria-label="A wireframe crate opens and the letters B I C rise out of it; the brand dot detaches from the logo and ignites as a spark outside the box"
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

        {/* restrained directional key light, falling from upper left */}
        <rect className="hero-key" x="40" y="0" width="460" height="400" fill="url(#heroKey)" />

        {/* floor shadow */}
        <ellipse className="hero-shadow" cx="292" cy="352" rx="150" ry="12" fill="url(#heroGlow)" />

        {/* interior glow, revealed when the lid opens */}
        <circle className="hero-glow" cx="294" cy="252" r="120" fill="url(#heroGlow)" />

        {/* crate — lid (drawn first so walls overlay the hinge) */}
        <g className="hero-lid">
          <path className="hero-edge" pathLength={1} strokeDasharray={1} d="M210 194 L390 194 L364 168 L184 168 Z"
            fill="var(--lift)" fillOpacity="0.35" stroke="var(--paper-75)" strokeWidth="1.5" />
        </g>

        {/* crate — left wall + front wall + back edge */}
        <path className="hero-edge" pathLength={1} strokeDasharray={1} d="M210 194 L184 168 L184 288 L210 314"
          fill="none" stroke="var(--gray)" strokeWidth="1.5" />
        <path className="hero-edge" pathLength={1} strokeDasharray={1} d="M210 194 L390 194 L390 314 L210 314 Z"
          fill="var(--deep)" fillOpacity="0.6" stroke="var(--paper-75)" strokeWidth="1.5" />
        <path className="hero-edge" pathLength={1} strokeDasharray={1} d="M390 194 L364 168"
          fill="none" stroke="var(--gray)" strokeWidth="1.5" />
        <path className="hero-edge" pathLength={1} strokeDasharray={1} d="M390 314 L364 288 L184 288"
          fill="none" stroke="var(--gray-75)" strokeWidth="1.5" />

        {/* letters rising from inside */}
        <g className="font-display" fill="var(--paper)" fontWeight={900} fontSize="72" letterSpacing="-2">
          <text className="hero-letter" x="232" y="158">B</text>
          <text className="hero-letter" x="284" y="158">I</text>
          <text className="hero-letter" x="306" y="158">C</text>
        </g>

        {/* the brand dot — begins as the period of the logo, then detaches and
            settles OUTSIDE the box, ignited. Final (default) state shown here */}
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

      {/* scroll cue — hairline with dot (desktop only; collides with stacked CTAs on mobile) */}
      <div className="hero-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex" aria-hidden="true">
        <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.32em] text-gray-brand">Scroll</span>
        <span className="h-10 w-px bg-[var(--gray-50)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--gray)]" />
      </div>
    </section>
  );
}
