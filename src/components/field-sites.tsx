type FieldSite = {
  yearLabel: string;
  place: string;
  detail: string;
};

const summary: FieldSite[] = [
  {
    yearLabel: "2018 — 22",
    place: "Colombia",
    detail: "reptiles, horses, herpetofauna",
  },
  {
    yearLabel: "2023 →",
    place: "Southern Norway",
    detail: "Ixodes ricinus, TBEV, Borrelia",
  },
  {
    yearLabel: "2025",
    place: "Northern Norway",
    detail: "first Ixodes persulcatus report",
  },
];

export default function FieldSites() {
  return (
    <section id="fieldwork" className="py-10 md:py-12">
      <div className="relative pt-5">
        <span className="absolute left-0 top-0 h-0.5 w-16 bg-accent" />
        <h2 className="font-display text-[36px] leading-none text-ink">
          Field sites
        </h2>
        <p className="mt-1.5 font-sans text-xs uppercase tracking-[0.16em] text-label">
          where the ticks come from
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-7 md:grid-cols-[1.4fr_1fr]">
        <div className="relative border border-dashed border-rule p-4">
          <FieldMap />
          <span className="absolute bottom-1.5 right-2.5 font-display text-sm text-label -rotate-[1.5deg]">
            ~ not to scale ~
          </span>
        </div>

        <div>
          {summary.map((row, i) => (
            <div
              key={row.yearLabel}
              className={`grid grid-cols-[60px_1fr] items-baseline gap-3 py-2 ${
                i < summary.length - 1 ? "border-b border-rule" : ""
              }`}
            >
              <span className="whitespace-nowrap font-sans text-[11px] tracking-wider text-label">
                {row.yearLabel}
              </span>
              <div>
                <div className="font-serif text-sm text-ink">{row.place}</div>
                <div className="mt-0.5 font-sans text-[10px] italic text-ink-mute">
                  {row.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FieldMap() {
  return (
    <svg
      viewBox="0 0 400 280"
      role="img"
      aria-label="Map of field sites in Colombia and Norway"
      className="block h-auto w-full"
    >
      {/* Colombia */}
      <g transform="translate(40, 60)">
        <path
          d="M 40 0 Q 80 -5 110 10 L 125 30 Q 140 60 130 90 L 110 130 Q 95 160 75 165 L 50 160 L 35 140 Q 20 110 25 80 L 30 50 Q 30 20 40 0 Z"
          fill="rgba(180,140,80,0.08)"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="2 1.5"
          className="text-label"
        />
        <text
          x="78"
          y="100"
          fontFamily="var(--font-caveat)"
          fontSize="14"
          fontStyle="italic"
          className="fill-label"
        >
          Colombia
        </text>

        <circle cx="55" cy="25" r="4" className="fill-accent" />
        <text x="62" y="28" fontFamily="var(--font-caveat)" fontSize="11" className="fill-ink">
          Tayrona
        </text>

        <circle cx="68" cy="42" r="4" className="fill-accent" />
        <text x="75" y="45" fontFamily="var(--font-caveat)" fontSize="11" className="fill-ink">
          Magdalena
        </text>

        <circle cx="80" cy="75" r="4" className="fill-accent" />
        <text x="87" y="78" fontFamily="var(--font-caveat)" fontSize="11" className="fill-ink">
          San Juan de C.
        </text>
      </g>

      {/* Norway */}
      <g transform="translate(260, 10)">
        <path
          d="M 50 0 L 70 10 L 75 40 L 60 70 L 55 100 L 50 140 L 45 175 L 35 200 L 25 215 L 20 205 L 30 180 L 35 140 L 40 100 L 42 70 L 38 40 L 45 15 Z"
          fill="rgba(140,160,200,0.08)"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="2 1.5"
          className="text-label"
        />
        <text
          x="55"
          y="80"
          fontFamily="var(--font-caveat)"
          fontSize="14"
          fontStyle="italic"
          className="fill-label"
        >
          Norway
        </text>

        <circle cx="48" cy="160" r="4" className="fill-accent" />
        <text x="56" y="163" fontFamily="var(--font-caveat)" fontSize="11" className="fill-ink">
          Telemark
        </text>

        <circle cx="50" cy="180" r="4" className="fill-accent" />
        <text x="58" y="183" fontFamily="var(--font-caveat)" fontSize="11" className="fill-ink">
          Agder
        </text>

        <circle cx="35" cy="40" r="4" className="fill-accent" />
        <text x="-22" y="40" fontFamily="var(--font-caveat)" fontSize="11" className="fill-ink">
          N. Norway →
        </text>
      </g>

      {/* Arc Colombia → Norway */}
      <path
        d="M 130 90 Q 220 -30 305 90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        opacity="0.6"
        className="text-accent"
      />
      <text
        x="195"
        y="20"
        fontFamily="var(--font-caveat)"
        fontSize="13"
        fontStyle="italic"
        textAnchor="middle"
        className="fill-accent"
      >
        2023 →
      </text>
    </svg>
  );
}
