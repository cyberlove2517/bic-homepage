import { ArrowLink, BicLogo } from "../components/icons";

export default function Closing() {
  return (
    <>
      {/* Closing CTA — inverted paper moment (echoes brand guide p.12) */}
      <section
        id="contact"
        className="relative overflow-hidden bg-[var(--paper)] py-[clamp(6rem,12vw,10rem)] text-[var(--ink)]"
        aria-labelledby="contact-heading"
      >
        <div className="c-arc right-[-14rem] top-[-14rem] h-[30rem] w-[30rem] !border-[var(--ink-50)] opacity-25" aria-hidden="true" />
        <div className="c-arc right-[-10rem] top-[-10rem] h-[22rem] w-[22rem] !border-[var(--ink-50)] opacity-20" aria-hidden="true" />

        <div className="relative mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-16">
          <div className="reveal max-w-3xl">
            <p className="eyebrow !text-[var(--ink-75)]">Start a conversation</p>
            <h2
              id="contact-heading"
              className="mt-6 font-display text-[clamp(2.25rem,6vw,4.75rem)] font-black uppercase leading-[0.98] tracking-[-0.01em]"
            >
              Every empty space is a box waiting to be opened
              <span
                className="ml-3 inline-block h-[0.16em] w-[0.16em] rounded-full bg-[var(--ink)] align-baseline"
                aria-hidden="true"
              />
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--ink-75)] sm:text-lg">
              Tell us what you're planning. We'll show you what it could become.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:hello@eventsbic.com"
                className="inline-flex items-center gap-3 border border-[var(--ink)] bg-[var(--ink)] px-8 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[var(--paper)] transition-colors duration-300 hover:bg-transparent hover:text-[var(--ink)]"
              >
                Plan your event
                <ArrowLink className="h-3 w-8" />
              </a>
              <a
                href="https://www.eventsbic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[var(--ink-50)] px-8 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink)] transition-colors duration-300 hover:border-[var(--ink)]"
              >
                eventsbic.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep" aria-label="Footer">
        <div className="mx-auto max-w-[80rem] px-5 py-14 sm:px-8 lg:px-16">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <BicLogo className="text-3xl" />
              <p className="mt-2 text-[0.625rem] font-semibold uppercase tracking-[0.32em] text-gray-brand">
                Event Experience
              </p>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper-50">
                Planning today. Creating tomorrows. Delivering memories.
              </p>
            </div>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  ["Experience", "#services"],
                  ["Process", "#process"],
                  ["Archive", "#archive"],
                  ["Cast", "#cast"],
                  ["Work", "#work"],
                  ["Contact", "#contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-paper-50 transition-colors hover:text-[var(--paper)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="text-sm text-paper-50">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gray-brand">Regions</p>
              <p className="mt-2">KSA · Jordan · Kuwait</p>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-paper-30">
              © {new Date().getFullYear()} BIC Event Experience — Best Invention Company Ltd.
            </p>
            <p className="flex items-center gap-2 text-xs text-paper-30">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gray)]" aria-hidden="true" />
              Concept homepage — content placeholders in place
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
