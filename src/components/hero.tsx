import Image from "next/image";

export default function Hero() {
  return (
    <section id="about" className="py-12 md:py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[174px_1fr] md:gap-9">
        <div className="-rotate-[1.8deg] inline-block bg-photo-frame border-[6px] border-b-[28px] border-photo-frame shadow-[0_4px_10px_rgba(0,0,0,0.12)] w-fit">
          <Image
            src="/andrea.jpeg"
            alt="Andrea Cotes Perdomo"
            width={160}
            height={160}
            className="block h-[160px] w-[160px]"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-6xl md:text-[64px] leading-none text-ink">
            Andrea Cotes Perdomo
          </h1>
          <p className="mt-3 font-sans text-xs uppercase tracking-[0.16em] text-ink-mute">
            PhD in Ecology · University of South-Eastern Norway
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            I am a Colombian biologist based in Norway, researching the
            seasonal ecology of ticks and the pathogens they transmit. My
            doctoral work at the University of South-Eastern Norway examines
            how shifting climate patterns influence pathogen prevalence in{" "}
            <i>Ixodes ricinus</i> populations across southern Norway. Earlier
            research in Colombia focused on the systematics of the genus{" "}
            <i>Amblyomma</i> and tick-borne pathogens of reptiles, amphibians,
            and domestic animals.
          </p>
        </div>
      </div>
    </section>
  );
}
