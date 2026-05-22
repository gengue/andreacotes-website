import Image from "next/image";

export default function Hero() {
  return (
    <section id="about" className="py-12 md:py-16">
      <p className="font-display text-lg text-label">
        — fieldwork log · entry no. 042
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[160px_1fr] md:gap-9">
        <div className="-rotate-[1.8deg] inline-block border-[6px] border-photo-frame shadow-[0_4px_10px_rgba(0,0,0,0.12)] w-fit">
          <Image
            src="/andrea.jpeg"
            alt="Andrea Cotes Perdomo"
            width={150}
            height={184}
            className="block object-cover h-[184px] w-[150px]"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-6xl md:text-[64px] leading-none text-ink">
            Andrea Cotes Perdomo
          </h1>
          <p className="mt-3 font-sans text-xs uppercase tracking-[0.16em] text-ink-mute">
            PhD ecology · ticks &amp; climate · Colombia → Norway
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            Started with ticks on lizards in Magdalena. Now: how do seasons
            shift the bugs — and the bacteria they carry — as the Nordic spring
            keeps arriving earlier?{" "}
            <span className="font-display text-[17px] text-accent">
              ↙ that&apos;s the whole thesis
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
