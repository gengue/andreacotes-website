type Education = {
  id: number;
  institution: string;
  title: string;
  startYear: number;
  endYear: number | null;
};

const education: Education[] = [
  {
    id: 1,
    institution: "University of South-Eastern Norway",
    title: "Doctor of Philosophy in Ecology",
    startYear: 2023,
    endYear: 2026,
  },
  {
    id: 2,
    institution: "University of Valencia",
    title:
      "MSc Tropical Parasitic Diseases, Biological and Biomedical Sciences",
    startYear: 2020,
    endYear: 2021,
  },
  {
    id: 3,
    institution: "University of Magdalena",
    title: "Bachelor of Science in Biology",
    startYear: 2013,
    endYear: 2018,
  },
];

function formatRange(start: number, end: number | null): string {
  return `${start} — ${end ?? "Present"}`;
}

export default function EducationList() {
  return (
    <section id="education" className="py-10 md:py-12">
      <div className="relative pt-5">
        <span aria-hidden="true" className="absolute left-0 top-0 h-0.5 w-16 bg-accent" />
        <h2 className="font-display text-[36px] leading-none text-ink">
          Education
        </h2>
      </div>

      <div className="mt-5">
        {education.map((item, index) => (
          <div
            key={item.id}
            className={`grid grid-cols-[120px_1fr] gap-4 py-2.5 ${
              index < education.length - 1
                ? "border-b border-rule"
                : ""
            }`}
          >
            <span className="whitespace-nowrap font-sans text-xs tracking-wider text-label pt-1">
              {formatRange(item.startYear, item.endYear)}
            </span>
            <div>
              <div className="font-serif font-medium text-base text-ink">
                {item.institution}
              </div>
              <div className="font-sans text-[13px] text-ink-mute mt-0.5">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
