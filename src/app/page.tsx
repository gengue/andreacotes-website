import Nav from "./../components/Nav";
import EducationList from "./../components/EducationList";
import PublicationList from "./../components/PublicationList";
import ProfileCard from "./../components/ProfileCard";
import InterestList from "./../components/InterestList";
import ContactList from "./../components/ContactList";
import { Lato } from "next/font/google";
import Link from "next/link";

const roboto = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

function AboutMe() {
  return (
    <div className="relative basis-1/2">
      <h1 className="text-3xl text-center my-4 font-bold">About me</h1>
      <p className="my-2">
        I&apos;m Andrea, a Colombian Biologist based in Norway. I am
        currently....bla bla
      </p>
      <p className="my-2">
        My research centers on questions related to landscape ecology,
        ecophysiology, and climate change effects, often using lungless
        Plethodontid salamanders as a model system. I have a broad interest in
        many ecological questions and organisms and seek to conduct sound and
        interesting science
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className={`${roboto.className} text-white`}>
      <Nav />
      <section id="about" className="mt-4 mb-8 container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-center items-center mb-2">
          <div className="basis-2/5">
            <ProfileCard />
          </div>
          <div className="basis-3/5 p-4">
            <AboutMe />
          </div>
        </div>
        <div className="mt-4 md:mt-10 flex flex-col md:flex-row justify-center p-4 ">
          <EducationList />
          <InterestList />
        </div>
      </section>
      <section id="publications" className="mb-8 container mx-auto max-w-4xl">
        <h2 className="text-3xl text-center my-8 w-full font-bold">
          Publications
        </h2>
        <PublicationList />
      </section>
      <section id="contact" className="mb-8 container mx-auto min-h-[12rem]">
        <h2 className="text-3xl text-center my-8 w-full font-bold">
          Get in touch
        </h2>
        <p className="my-2 text-lg text-center">
          I would love to hear from you if you would like to collaborate or have
          questions!
        </p>
        <ContactList />
      </section>
      <footer className="text-center text-slate-400 my-4">
        Made with ❤️ by my handsome husband{" "}
        <Link
          className="underline hover:text-emerald-400"
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
