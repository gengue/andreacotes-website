import Nav from "./../components/Nav";
import EducationList from "./../components/EducationList";
import PublicationList from "./../components/PublicationList";
import ProfileCard from "./../components/ProfileCard";
import InterestList from "./../components/InterestList";
import ContactList from "./../components/ContactList";
import AboutMe from "./../components/AboutMe";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const font = Montserrat({
	subsets: ["latin"],
});

export default function Home() {
	return (
		<main className={`${font.className}`}>
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
			<footer className="text-center text-slate-700 dark:text-slate-400 my-4">
				Made with ❤ by my handsome husband{" "}
				<Link
					className="underline hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
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