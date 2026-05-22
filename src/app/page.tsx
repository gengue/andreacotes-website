import { Montserrat } from "next/font/google";
import Link from "next/link";

import AboutMe from "@/components/about-me";
import BirthdayCelebration from "@/components/birthday-celebration";
import ContactList from "@/components/contact-list";
import EducationList from "@/components/education-list";
import InterestList from "@/components/interest-list";
import Nav from "@/components/nav";
import ProfileCard from "@/components/profile-card";
import PublicationList from "@/components/publication-list";

const font = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={font.className}>
      <BirthdayCelebration />
      <Nav />

      <section
        id="about"
        className="container mx-auto max-w-4xl px-4 py-12"
      >
        <div className="flex flex-col items-center justify-center md:flex-row">
          <div className="basis-2/5">
            <ProfileCard />
          </div>
          <div className="basis-3/5 p-4">
            <AboutMe />
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:gap-8">
          <EducationList />
          <InterestList />
        </div>
      </section>

      <section
        id="publications"
        className="container mx-auto max-w-4xl px-4 py-12"
      >
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
          Publications
        </h2>
        <PublicationList />
      </section>

      <section
        id="contact"
        className="container mx-auto min-h-[12rem] px-4 py-12"
      >
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight">
          Get in touch
        </h2>
        <p className="text-center text-lg text-muted-foreground">
          I would love to hear from you if you would like to collaborate or have
          questions!
        </p>
        <ContactList />
      </section>

      <footer className="my-8 text-center text-muted-foreground">
        Made with ❤ by my handsome husband{" "}
        <Link
          className="underline transition-colors hover:text-primary"
          href="https://www.genesisguerrero.com/"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          Genesis Guerrero
        </Link>
      </footer>
    </main>
  );
}