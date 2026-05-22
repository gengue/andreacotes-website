import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactLinks = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/andrea-paola-cotes-perdomo-5a65a259/",
    icon: <Linkedin className="size-6" />,
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/andreacotes1",
    icon: <Twitter className="size-6" />,
  },
  {
    id: "researchgate",
    name: "Research Gate",
    url: "https://www.researchgate.net/profile/Andrea-Cotes-Perdomo",
    icon: (
      <Image
        src="/research_gate_logo.png"
        alt="Research Gate logo"
        width={24}
        height={24}
      />
    ),
  },
];

export default function ContactList() {
  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      {contactLinks.map((link) => (
        <Button
          key={link.id}
          asChild
          variant="outline"
          size="icon"
          aria-label={link.name}
        >
          <Link
            href={link.url}
            target="_blank"
            referrerPolicy="no-referrer"
            title={link.name}
          >
            {link.icon}
          </Link>
        </Button>
      ))}
    </div>
  );
}
