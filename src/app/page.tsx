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
    <main>
      <BirthdayCelebration />
      <Nav />

      <div className="mx-auto max-w-3xl px-4 md:px-0">
        <Hero />
        <EducationList />
        <PublicationList />
        <InterestList />
        <ContactList />

        <footer className="mt-8 mb-10 py-6 text-center font-display text-lg text-ink-mute">
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
