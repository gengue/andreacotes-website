import Image from "next/image";
import Link from "next/link";

import BirthdayCelebration from "@/components/birthday-celebration";
import ContactList from "@/components/contact-list";
import EducationList from "@/components/education-list";
import Hero from "@/components/hero";
import InterestList from "@/components/interest-list";
import Nav from "@/components/nav";
import PublicationList from "@/components/publication-list";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <BirthdayCelebration />
      <Nav />

      <Image
        src="/decorations/tick-vitruvian.png"
        alt=""
        aria-hidden
        width={501}
        height={498}
        className="pointer-events-none absolute right-[-40px] top-40 z-0 hidden h-auto w-[180px] rotate-[6deg] opacity-[0.18] dark:opacity-[0.28] lg:block xl:right-8 xl:w-[220px]"
      />

      <div className="relative mx-auto max-w-3xl px-4 md:px-0">
        <Hero />
        <EducationList />
        <PublicationList />
        <InterestList />
        <ContactList />

        <div className="mt-8 px-4 md:px-0">
          <Image
            src="/decorations/ticks-3-positions.png"
            alt=""
            aria-hidden
            width={782}
            height={319}
            className="pointer-events-none mx-auto block h-auto w-full max-w-2xl opacity-[0.50] dark:opacity-[0.65]"
          />
        </div>

        <footer className="mt-2 mb-10 py-6 text-center font-display text-lg text-ink-mute">
          Made with <span className="text-accent">♥</span> by my handsome husband{" "}
          <Link
            className="text-ink underline decoration-accent/50 hover:decoration-accent hover:text-accent transition-colors"
            href="https://www.genesisguerrero.com/"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            Genesis Guerrero
          </Link>
        </footer>
      </div>
    </main>
  );
}
