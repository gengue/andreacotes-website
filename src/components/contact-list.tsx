import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";

type ContactLink = {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
};

const contactLinks: ContactLink[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/andrea-paola-cotes-perdomo-5a65a259/",
    icon: <Linkedin className="size-5" />,
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/andreacotes1",
    icon: <Twitter className="size-5" />,
  },
  {
    id: "researchgate",
    name: "Research Gate",
    url: "https://www.researchgate.net/profile/Andrea-Cotes-Perdomo",
    icon: (
      <Image
        src="/research_gate_logo.png"
        alt=""
        width={20}
        height={20}
        className="opacity-80"
      />
    ),
  },
];

export default function ContactList() {
  return (
    <section id="contact" className="py-10 md:py-12">
      <div className="relative pt-5">
        <span aria-hidden="true" className="absolute left-0 top-0 h-0.5 w-16 bg-accent" />
        <h2 className="font-display text-[36px] leading-none text-ink">
          Get in touch
        </h2>
      </div>

      <p className="mt-3 font-serif text-base text-ink-soft">
        Always glad to hear from collaborators, students, and anyone interested
        in ticks or what they carry.
      </p>

      <div className="mt-5 flex items-center gap-5">
        {contactLinks.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            target="_blank"
            referrerPolicy="no-referrer"
            aria-label={link.name}
            title={link.name}
            className="text-ink hover:text-accent transition-colors"
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </section>
  );
}
