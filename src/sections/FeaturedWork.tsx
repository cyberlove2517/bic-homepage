const works = [
  {
    file: "FILE 001",
    category: "Technology Activation",
    title: "The reveal people walked into",
    text: "A flagship car launch staged inside a tunnel of light — the audience didn't watch the moment, they stood in it.",
    img: "assets/recovered/photos/event-whatsapp-2026-06-17.webp",
    alt: "E-HS9 car launch inside a red LED tunnel, produced by BIC",
  },
  {
    file: "FILE 002",
    category: "Exhibition",
    title: "A market built from nothing",
    text: "An open-air souk environment — stalls, light and flow assembled from empty ground into a place people lingered.",
    img: "assets/recovered/photos/event-dsc02690.webp",
    alt: "Outdoor market environment with palm trees and string lights at dusk, built by BIC",
  },
  {
    file: "FILE 003",
    category: "Public Event",
    title: "A field of light at night",
    text: "A large-scale light installation for a public celebration — sculpture, colour and crowd management at city scale.",
    img: "assets/recovered/photos/event-dsc02832.webp",
    alt: "Illuminated cone-shaped light installations at night, installed by BIC",
  },
];

export default function FeaturedWork() {
  return (
    <section id="work" className="bg-deep py-[clamp(6rem,12vw,10rem)]" aria-labelledby="work-heading">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-16">
        <div className="reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Selected moments</p>
            <h2
              id="work-heading"
              className="mt-5 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase leading-[1.02]"
            >
              Work that left the box
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-paper-50">
            Real BIC project photography — the proof layer, shown in full colour.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {works.map((w, i) => (
            <article key={w.file} className="reveal group" data-reveal-delay={i * 110}>
              <div className="relative aspect-[4/5] overflow-hidden border border-hairline bg-[var(--ink)]">
                <img
                  src={w.img}
                  alt={w.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <span className="absolute left-5 top-5 text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-paper-75 [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
                  {w.file}
                </span>
                <span
                  className="absolute bottom-5 right-5 h-1.5 w-1.5 rounded-full bg-[var(--gray)] transition-colors duration-500 group-hover:bg-[var(--paper)] group-hover:dot-spark"
                  aria-hidden="true"
                />
                <span className="absolute bottom-5 left-5 font-display text-xs font-bold uppercase tracking-[0.22em] text-paper-75 [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
                  {w.category}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold uppercase leading-snug">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-50">{w.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
