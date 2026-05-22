import Image from "next/image";
import Link from "next/link";
import { AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";

const contactLinks = [
  {
    id: "linkedin",
    name: "Linkedin",
    url: "https://www.linkedin.com/in/andrea-paola-cotes-perdomo-5a65a259/",
    icon: <AiFillLinkedin className="text-4xl text-white" />,
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/andreacotes1",
    icon: <AiOutlineTwitter className="text-4xl text-sky-500" />,
  },
  {
    id: "researchgate",
    name: "Research Gate",
    url: "https://www.researchgate.net/profile/Andrea-Cotes-Perdomo",
    icon: (
      <Image
        className="relative"
        src="/research_gate_logo.png"
        alt="Research Gate logo"
        width={28}
        height={28}
      />
    ),
  },
];

export default function ContactList() {
  return (
    <div className="flex space-x-4 items-center justify-center mt-4">
      {contactLinks.map((link) => (
        <Link
          key={link.id}
          href={link.url}
          target="_blank"
          title={link.name}
          referrerPolicy="no-referrer"
          className="text-xl font-medium"
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
}
