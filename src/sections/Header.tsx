import { useEffect, useState } from "react";
import { BicLogo } from "../components/icons";

const links = [
  { label: "Experience", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Archive", href: "#archive" },
  { label: "Cast", href: "#cast" },
  { label: "Work", href: "#work" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-[var(--ink)]/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[80rem] items-center justify-between px-5 sm:px-8 lg:px-16">
        <a href="#top" className="flex flex-col gap-1" aria-label="BIC Event Experience — home">
          <BicLogo className="text-2xl" />
          <span className="text-[0.5rem] font-semibold uppercase tracking-[0.32em] text-gray-brand">
            Event Experience
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-paper-75 transition-colors hover:text-[var(--paper)]"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-ghost !px-5 !py-3">
            Get in touch
          </a>
        </nav>

        <button
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-px w-6 bg-[var(--paper)] transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-[var(--paper)] transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-hairline bg-[var(--ink)] px-5 py-6 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold uppercase tracking-[0.22em] text-paper-75"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary !px-5 !py-3">
                Get in touch
              </a>
            </li>
          </ul>
        </nav>
      )}
      <div className={`h-px bg-[var(--gray-30)] transition-opacity ${scrolled ? "opacity-100" : "opacity-0"}`} />
    </header>
  );
}
