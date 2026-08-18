const steps = [
  {
    n: "01",
    title: "Listen",
    text: "Every brief starts as a sealed box — ambitions, constraints, audience. We open it carefully and listen for the idea inside.",
  },
  {
    n: "02",
    title: "Design",
    text: "The idea takes shape: spatial concepts, technical drawings, guest journeys. Creativity with an engineer's signature on it.",
  },
  {
    n: "03",
    title: "Build",
    text: "Fabrication, logistics, AV, rehearsal. The invisible 90% of an event, executed until it looks effortless.",
  },
  {
    n: "04",
    title: "Ignite",
    text: "Doors open. The idea leaves the box and becomes an experience people carry out with them.",
    ignite: true,
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-deep py-[clamp(6rem,12vw,10rem)]" aria-labelledby="process-heading">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div className="reveal">
            <p className="eyebrow">From idea to experience</p>
            <h2
              id="process-heading"
              className="mt-5 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase leading-[1.02]"
            >
              How a thought<br />becomes a room
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-paper-75">
              Our process is the quiet machinery behind the magic — four movements,
              one direction: out of the box.
            </p>
            <div className="relative mt-10 hidden lg:block" aria-hidden="true">
              <div className="c-arc left-[-8rem] top-[-6rem] h-[20rem] w-[20rem] opacity-30" />
            </div>
          </div>

          <ol className="relative border-l border-hairline pl-8 sm:pl-12" role="list">
            {steps.map((s, i) => (
              <li key={s.n} className="reveal relative pb-14 last:pb-0" data-reveal-delay={i * 100}>
                <span
                  className={`absolute -left-[37px] top-1.5 h-2 w-2 rounded-full sm:-left-[53px] ${
                    s.ignite ? "bg-[var(--paper)] dot-spark" : "bg-[var(--gray)]"
                  }`}
                  aria-hidden="true"
                />
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-sm font-bold tabular-nums text-paper-30">{s.n}</span>
                  <h3 className="font-display text-2xl font-black uppercase tracking-[0.01em] sm:text-3xl">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-50 sm:text-base">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
