const interests = [
  "parasitology",
  "ticks and tick-borne diseases",
  "molecular biology",
  "dogs (heavy emphasis on dogs)",
  "yoga",
];

function joinSentence(parts: string[]): string {
  if (parts.length <= 1) return parts.join("");
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}.`;
}

export default function InterestList() {
  return (
    <section id="off-the-clock" className="py-8 md:py-10">
      <div className="relative pt-4">
        <span className="absolute left-0 top-0 h-0.5 w-16 bg-accent" />
        <h2 className="font-display text-[28px] leading-none text-ink">
          Off the clock
        </h2>
      </div>
      <p className="mt-3 font-serif text-[15px] leading-relaxed text-ink-soft">
        Besides ticks: {joinSentence(interests)}
      </p>
    </section>
  );
}
