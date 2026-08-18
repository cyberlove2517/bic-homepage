import {
  IconActivation,
  IconAV,
  IconBranding,
  IconExhibition,
  IconHospitality,
  IconPlanning,
} from "../components/icons";

const services = [
  {
    icon: IconPlanning,
    title: "Event Planning & Management",
    text: "End-to-end direction — concept, budget, logistics, run-of-show — so nothing is left to chance on the day.",
  },
  {
    icon: IconExhibition,
    title: "Exhibition Design & Construction",
    text: "Pavilions, booths and builds engineered from empty floor to finished environment, in-house.",
  },
  {
    icon: IconAV,
    title: "Audio Visual & Technology",
    text: "Stage, light, sound and screen — technical execution with the discipline of a dress rehearsal.",
  },
  {
    icon: IconActivation,
    title: "Technology Activations",
    text: "Interactive installations and live demos that make audiences participants, not spectators.",
  },
  {
    icon: IconHospitality,
    title: "Hospitality & Protocols",
    text: "Guest experience, VIP handling and protocol managed to the standard your guests expect.",
  },
  {
    icon: IconBranding,
    title: "Branding & Experience Production",
    text: "Identity brought into physical space — every surface, sign and detail carrying the brand.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[var(--ink)] py-[clamp(6rem,12vw,10rem)]" aria-labelledby="services-heading">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-16">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">What we do</p>
          <h2
            id="services-heading"
            className="mt-5 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase leading-[1.02]"
          >
            Capabilities, under one roof
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-paper-75">
            Six disciplines, one accountable team. We take an event from first sketch to final
            light cue without handing it off.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-px bg-[var(--gray-30)] sm:grid-cols-2 lg:grid-cols-3" role="list">
          {services.map((s, i) => (
            <li key={s.title} className="reveal group relative bg-[var(--ink)]" data-reveal-delay={(i % 3) * 90}>
              <div className="flex h-full flex-col gap-8 p-8 transition-colors duration-500 group-hover:bg-[var(--lift)] sm:p-10">
                <div className="flex items-start justify-between">
                  <s.icon className="service-glyph h-14 w-14 text-paper-75 group-hover:text-[var(--paper)]" />
                  <span className="font-display text-sm font-bold tabular-nums text-paper-30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="font-display text-lg font-bold uppercase leading-snug tracking-[0.02em]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper-50">{s.text}</p>
                </div>
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--gray-50)] transition-all duration-500 group-hover:bg-[var(--paper)] group-hover:dot-spark"
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
