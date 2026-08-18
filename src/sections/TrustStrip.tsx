const stats = [
  { value: "15+", label: "Years of experience" },
  { value: "1000+", label: "Successful events" },
  { value: "200+", label: "Happy clients" },
  { value: "3", label: "KSA · Jordan · Kuwait" },
];

/* Real client logos recovered from eventsbic.com — see asset-recovery-manifest.md */
const clients = [
  { name: "Riyadh Season", img: "assets/recovered/photos/thumb-booth-exhibition.webp" },
  { name: "BMW", img: "assets/recovered/photos/work-02.webp" },
  { name: "Geely", img: "assets/recovered/photos/work-03.webp" },
  { name: "Hongqi", img: "assets/recovered/photos/thumb-fashion-gala.webp" },
  { name: "Bank al Etihad", img: "assets/recovered/photos/work-01.webp" },
  { name: "Cenomi", img: "assets/recovered/photos/thumb-public-activities.webp" },
  { name: "Dar Al Omran", img: "assets/recovered/photos/work-06.webp" },
  { name: "Dunes Club Amman", img: "assets/recovered/photos/work-08.webp" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-hairline bg-[var(--ink)]" aria-label="BIC at a glance">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-16">
        <dl className="grid grid-cols-2 divide-x divide-hairline lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="reveal px-6 py-10 sm:px-10" data-reveal-delay={i * 80}>
              <dt className="order-2 mt-3 block text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gray-brand">
                {s.label}
              </dt>
              <dd className="order-1 font-display text-4xl font-black tabular-nums sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="reveal border-t border-hairline py-8">
          <p className="mb-6 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-gray-brand">
            Trusted by
          </p>
          <ul className="grid grid-cols-3 items-center gap-x-8 gap-y-6 sm:grid-cols-4 lg:grid-cols-8" role="list">
            {clients.map((c) => (
              <li key={c.name} className="flex items-center justify-center" title={c.name}>
                <img
                  src={c.img}
                  alt={`${c.name} — BIC client`}
                  loading="lazy"
                  className="max-h-11 w-auto max-w-full object-contain opacity-45 grayscale transition-all duration-500 hover:opacity-90 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
